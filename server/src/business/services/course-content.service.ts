/** Service file: contains business rules and database coordination; controllers call these methods after route validation. */
import { randomUUID } from 'crypto';
import { inflateRawSync } from 'zlib';
import { Types } from 'mongoose';
import { ROLES } from '../../core/constants/roles';
import { ContentAssetModel, type ContentAssetType } from '../../data/models/content-asset.model';
import {
  CourseContentModel,
  type ContentBlock,
  type ContentBlockType,
  type ContentLesson,
  type ContentModule,
  type ContentSnapshot,
} from '../../data/models/course-content.model';
import { badRequest, forbidden } from '../../core/utils/http-error';
import type { AuthUser } from '../../core/types/request';
import type { UploadedFile } from '../../core/types/uploaded-file';
import type { BatchService } from './batch.service';
import type { CourseLean, CourseService } from './course.service';

const blockTypes = new Set<ContentBlockType>([
  'heading',
  'paragraph',
  'bullet_list',
  'nested_bullet_list',
  'image',
  'document',
  'video',
  'link',
  'assignment_note',
  'table',
]);

const bulkBlockTypes = new Set<ContentBlockType>([
  'heading',
  'paragraph',
  'bullet_list',
  'nested_bullet_list',
  'assignment_note',
  'table',
]);

interface WorkbookSheets {
  [sheetName: string]: Record<string, string>[];
}

export class CourseContentService {
  constructor(
    private readonly courseService: CourseService,
    private readonly batchService: BatchService,
  ) {}

  async getAvailableCourses(user: AuthUser) {
    const courses = await this.getCoursesForUser(user);
    const courseIds = courses.map((course) => course._id);
    if (!courseIds.length) return [];

    // Course cards need title/description/counts only. Excluding blocks prevents the list API
    // from loading every paragraph/table/video block for every course.
    const contents = await CourseContentModel.find({ courseId: { $in: courseIds } })
      .select('courseId status publishedAt updatedAt draft.title draft.description draft.modules.id draft.modules.lessons.id published.title published.description published.modules.id published.modules.lessons.id')
      .lean()
      .exec();
    const contentByCourseId = new Map(contents.map((content: any) => [content.courseId.toString(), content]));
    const availableCourses = courses
      .map((course) => {
        const content = contentByCourseId.get(course._id.toString());
        if (user.role === ROLES.STUDENT && content?.status !== 'published') return null;
        const snapshot = this.canManage(user, course) ? content?.draft : content?.published;
        return {
          id: course._id.toString(),
          name: course.name,
          title: snapshot?.title ?? course.name,
          description: snapshot?.description ?? course.description ?? '',
          author: course.author ?? '',
          thumbnail: course.thumbnail ?? '',
          accentColor: course.accentColor ?? '#5B4BC4',
          status: content?.status ?? 'draft',
          canManage: this.canManage(user, course),
          moduleCount: snapshot?.modules?.length ?? 0,
          lessonCount: snapshot?.modules?.reduce((sum: number, module: any) => sum + (module.lessons?.length ?? 0), 0) ?? 0,
        };
      })
      .filter(Boolean);

    return availableCourses;
  }

  /**
   * Loads one course's content for the current user.
   * Managers receive the editable draft; students receive only the published snapshot.
   */
  async getContent(courseId: string, user: AuthUser) {
    // Validate id before creating ObjectIds for parallel database lookups.
    if (!Types.ObjectId.isValid(courseId)) throw badRequest('Invalid course id.');
    const objectCourseId = new Types.ObjectId(courseId);
    // Course and content are independent reads, so load both in parallel to reduce latency.
    const [course, content] = await Promise.all([
      this.courseService.findById(courseId),
      CourseContentModel.findOne({ courseId: objectCourseId }).lean().exec(),
    ]);
    if (!course) throw badRequest('Course not found.');
    // Managers can edit/read drafts; students must be enrolled and can only read published content.
    const canManage = this.canManage(user, course);
    if (!canManage && !(await this.canReadPublished(user, courseId))) {
      throw forbidden('You do not have access to this course content.');
    }

    if (!content) {
      if (canManage) {
        // Managers need an editable empty state even before content has been saved.
        return this.toResponse(courseId, this.emptySnapshot(course.name, course.description ?? ''), 'draft', canManage, 'draft', null, null);
      }
      throw forbidden('Course content is not published.');
    }

    if (canManage) {
      // Editors always work against draft content so unpublished changes are not shown to students.
      return this.toResponse(courseId, content.draft, content.status, true, 'draft', content.publishedAt ?? null, (content as any).updatedAt ?? null);
    }
    if (content.status !== 'published' || !content.published) {
      throw forbidden('Course content is not published.');
    }
    // Students receive the frozen published snapshot, not the editable draft.
    return this.toResponse(courseId, content.published, content.status, false, 'published', content.publishedAt ?? null, (content as any).updatedAt ?? null);
  }

  /**
   * Saves course content into the draft snapshot.
   * The route passes `courseId` from params, `body` from DTO-validated JSON, and `user` from JWT auth.
   */
  async saveDraft(courseId: string, body: unknown, user: AuthUser) {
    // Step 1: load and validate the course id.
    const course = await this.requireCourse(courseId);
    // Step 2: enforce edit permission before touching draft data.
    this.requireManage(user, course);
    // Step 3: normalize raw client data into the exact nested snapshot shape stored in Mongo.
    const draft = this.normalizeSnapshot(body, course.name, course.description ?? '');
    // Step 4: check whether this course already has a content document.
    const existing = await CourseContentModel.findOne({ courseId: new Types.ObjectId(courseId) }).exec();
    if (!existing) {
      // First save creates the content document with only a draft; published remains null until publish().
      const created = await CourseContentModel.create({
        courseId: new Types.ObjectId(courseId),
        draft,
        published: null,
        status: 'draft',
        createdBy: new Types.ObjectId(user.id),
        updatedBy: new Types.ObjectId(user.id),
      });
      // Return a stable API DTO instead of the raw Mongoose document.
      return this.toResponse(courseId, created.draft, created.status, true, 'draft', created.publishedAt, (created as any).updatedAt);
    }
    // Existing content keeps its published snapshot and replaces only the draft snapshot.
    existing.draft = draft as any;
    // If content was already published, keep that status; otherwise it remains a draft.
    existing.status = existing.published ? existing.status : 'draft';
    existing.updatedBy = new Types.ObjectId(user.id);
    await existing.save();
    // The client receives the same response shape for create and update paths.
    return this.toResponse(courseId, existing.draft, existing.status, true, 'draft', existing.publishedAt, (existing as any).updatedAt);
  }

  /** Imports workbook rows, merges them into the existing draft, then saves through saveDraft(). */
  async importWorkbookDraft(courseId: string, file: UploadedFile, user: AuthUser) {
    const course = await this.requireCourse(courseId);
    this.requireManage(user, course);
    if (!file?.buffer?.length) throw badRequest('No workbook uploaded.');
    if (!/\.xlsx$/i.test(file.originalname)) throw badRequest('Bulk upload supports Excel .xlsx files only.');

    const workbook = this.parseXlsxWorkbook(file.buffer);
    const importedSnapshot = this.workbookToSnapshot(workbook, course.name, course.description ?? '');
    const existing = await CourseContentModel.findOne({ courseId: new Types.ObjectId(courseId) }).lean().exec();
    const baseSnapshot = existing?.draft
      ? this.normalizeSnapshot(existing.draft, course.name, course.description ?? '')
      : this.emptySnapshot(course.name, course.description ?? '');
    const snapshot = this.mergeImportedModules(baseSnapshot, importedSnapshot);
    return this.saveDraft(courseId, snapshot, user);
  }

  /** Publishes the current draft by copying it into the published snapshot. */
  async publish(courseId: string, user: AuthUser) {
    const course = await this.requireCourse(courseId);
    this.requireManage(user, course);
    const existing = await CourseContentModel.findOne({ courseId: new Types.ObjectId(courseId) }).exec();
    if (!existing) throw badRequest('Save or import draft content before publishing.');
    existing.published = existing.draft as any;
    existing.status = 'published';
    existing.publishedBy = new Types.ObjectId(user.id);
    existing.publishedAt = new Date();
    await existing.save();
    return this.toResponse(courseId, existing.draft, existing.status, true, 'draft', existing.publishedAt, (existing as any).updatedAt);
  }

  /** Unpublishes content without deleting the draft, so managers can revise and publish again. */
  async unpublish(courseId: string, user: AuthUser) {
    const course = await this.requireCourse(courseId);
    this.requireManage(user, course);
    const existing = await CourseContentModel.findOne({ courseId: new Types.ObjectId(courseId) }).exec();
    if (!existing) throw badRequest('Course content not found.');
    existing.status = 'unpublished';
    await existing.save();
    return this.toResponse(courseId, existing.draft, existing.status, true, 'draft', existing.publishedAt, (existing as any).updatedAt);
  }

  /** Stores uploaded file metadata after the controller has streamed the file to disk. */
  async saveAsset(courseId: string, file: UploadedFile, user: AuthUser) {
    const course = await this.requireCourse(courseId);
    this.requireManage(user, course);
    const type = this.assetType(file.mimetype, file.originalname);
    const asset = await ContentAssetModel.create({
      courseId: new Types.ObjectId(courseId),
      uploadedBy: new Types.ObjectId(user.id),
      originalName: file.originalname,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      url: `/uploads/content/${courseId}/${file.filename}`,
      type,
    });
    return {
      id: asset._id.toString(),
      courseId,
      originalName: asset.originalName,
      filename: asset.filename,
      mimetype: asset.mimetype,
      size: asset.size,
      url: asset.url,
      type: asset.type,
    };
  }

  private async getCoursesForUser(user: AuthUser): Promise<CourseLean[]> {
    // use of this is:
    // Resolve the course list a user can see before building content cards.
    if (user.role === ROLES.SUPER_ADMIN || user.role === ROLES.ADMIN) {
      return this.courseService.findAll();
    }
    if (user.role === ROLES.INSTRUCTOR) {
      return this.courseService.findByInstructorId(user.id);
    }
    const courseIds = await this.batchService.getCourseIdsForStudent(user.id);
    if (!courseIds.length) return [];
    return this.courseService.findByIds(courseIds);
  }

  private async requireCourse(courseId: string): Promise<CourseLean> {
    // use of this is:
    // Validate course id and fail early when the course does not exist.
    if (!Types.ObjectId.isValid(courseId)) throw badRequest('Invalid course id.');
    const course = await this.courseService.findById(courseId);
    if (!course) throw badRequest('Course not found.');
    return course;
  }

  private canManage(user: AuthUser, course: CourseLean): boolean {
    // use of this is:
    // Central yes/no permission check for course-content management.
    if (user.role === ROLES.SUPER_ADMIN || user.role === ROLES.ADMIN) return true;
    if (user.role !== ROLES.INSTRUCTOR) return false;
    return (course.instructorIds ?? []).some((id) => id.toString() === user.id);
  }

  private requireManage(user: AuthUser, course: CourseLean): void {
    // This is the write-protection gate for draft/import/publish/upload operations.
    // If it throws, the service stops immediately and the database is not changed.
    if (!this.canManage(user, course)) {
      throw forbidden('You do not have permission to manage this course content.');
    }
  }

  private async canReadPublished(user: AuthUser, courseId: string): Promise<boolean> {
    // use of this is:
    // Students can read published content only when enrolled in a batch for that course.
    if (user.role !== ROLES.STUDENT) return false;
    return this.batchService.isStudentInCourse(user.id, courseId);
  }

  private normalizeSnapshot(input: any, fallbackTitle: string, fallbackDescription: string): ContentSnapshot {
    // Clients may submit either the whole response object or the inner draft object.
    const source = input?.draft ?? input;
    // Fallbacks keep brand-new course content usable even when the payload omits title/description.
    const title = this.cleanString(source?.title) || fallbackTitle;
    const description = this.cleanString(source?.description) || fallbackDescription || '';
    // Every nested module/lesson/block is normalized so Mongo stores predictable ids and fields.
    const modules = Array.isArray(source?.modules) ? source.modules.map((module: any) => this.normalizeModule(module)) : [];
    return { title, description, modules };
  }

  private normalizeModule(module: any): ContentModule {
    // use of this is:
    // Convert raw module JSON into a predictable ContentModule shape.
    return {
      id: this.cleanString(module?.id) || randomUUID(),
      title: this.cleanString(module?.title) || 'Untitled Module',
      summary: this.cleanString(module?.summary),
      lessons: Array.isArray(module?.lessons) ? module.lessons.map((lesson: any) => this.normalizeLesson(lesson)) : [],
    };
  }

  private mergeImportedModules(base: ContentSnapshot, imported: ContentSnapshot): ContentSnapshot {
    // use of this is:
    // Merge workbook-imported modules into the existing draft without deleting unrelated modules.
    const importedById = new Map(imported.modules.map((module) => [module.id, module]));
    const mergedModules = base.modules.map((module) => importedById.get(module.id) ?? module);
    const existingIds = new Set(mergedModules.map((module) => module.id));
    imported.modules.forEach((module) => {
      if (!existingIds.has(module.id)) mergedModules.push(module);
    });

    return {
      title: base.title || imported.title,
      description: base.description || imported.description || '',
      modules: mergedModules,
    };
  }

  private normalizeLesson(lesson: any): ContentLesson {
    // use of this is:
    // Convert raw lesson JSON into a predictable ContentLesson shape.
    return {
      id: this.cleanString(lesson?.id) || randomUUID(),
      title: this.cleanString(lesson?.title) || 'Untitled Lesson',
      summary: this.cleanString(lesson?.summary),
      durationMinutes: Number.isFinite(Number(lesson?.durationMinutes)) ? Number(lesson.durationMinutes) : 0,
      blocks: Array.isArray(lesson?.blocks) ? lesson.blocks.map((block: any) => this.normalizeBlock(block)) : [],
    };
  }

  private normalizeBlock(block: any): ContentBlock {
    // use of this is:
    // Convert raw block JSON into one supported content block type.
    const type = blockTypes.has(block?.type) ? block.type : 'paragraph';
    return {
      id: this.cleanString(block?.id) || randomUUID(),
      type,
      title: this.cleanString(block?.title),
      text: this.cleanString(block?.text),
      url: this.cleanString(block?.url),
      assetId: this.cleanString(block?.assetId),
      items: Array.isArray(block?.items) ? this.normalizeBullets(block.items) : [],
      columns: Array.isArray(block?.columns) ? block.columns.map((column: unknown) => this.cleanString(column)) : [],
      rows: Array.isArray(block?.rows)
        ? block.rows.map((row: unknown) => Array.isArray(row) ? row.map((cell: unknown) => this.cleanString(cell)) : [])
        : [],
    };
  }

  private normalizeBullets(items: any[]): any[] {
    // use of this is:
    // Normalize bullet items recursively so nested lists always have text/children fields.
    return items.map((item) => ({
      text: this.cleanString(item?.text ?? item) || '',
      children: Array.isArray(item?.children) ? this.normalizeBullets(item.children) : [],
    }));
  }

  private cleanString(value: unknown): string {
    // use of this is:
    // Safely trim strings and turn non-strings into empty strings.
    return typeof value === 'string' ? value.trim() : '';
  }

  private workbookToSnapshot(workbook: WorkbookSheets, fallbackTitle: string, fallbackDescription: string): ContentSnapshot {
    // use of this is:
    // Convert parsed workbook sheets into the same ContentSnapshot shape used by the editor.
    const indexRows = workbook.Indexes ?? [];
    const slideRows = workbook.Slides ?? [];
    const blockRows = workbook.Blocks ?? [];
    if (!indexRows.length) throw badRequest('Indexes sheet has no data rows.');
    if (!slideRows.length) throw badRequest('Slides sheet has no data rows.');

    const indexIds = new Set<string>();
    const slideIds = new Set<string>();
    const slidesByIndex = new Map<string, Record<string, string>[]>();
    const blocksBySlide = new Map<string, Record<string, string>[]>();

    indexRows.forEach((row) => {
      // Index rows become top-level modules; ids must be unique for merging and ordering.
      const id = this.cleanString(row.index_id);
      if (!id) throw badRequest('Indexes sheet has a row without index_id.');
      if (indexIds.has(id)) throw badRequest(`Duplicate index_id: ${id}`);
      indexIds.add(id);
    });

    slideRows.forEach((row) => {
      // Slide rows become lessons and must point at an existing index/module.
      const id = this.cleanString(row.slide_id);
      const indexId = this.cleanString(row.index_id);
      if (!id) throw badRequest('Slides sheet has a row without slide_id.');
      if (slideIds.has(id)) throw badRequest(`Duplicate slide_id: ${id}`);
      if (!indexIds.has(indexId)) throw badRequest(`Slides sheet references unknown index_id: ${indexId}`);
      slideIds.add(id);
      slidesByIndex.set(indexId, [...(slidesByIndex.get(indexId) ?? []), row]);
    });

    blockRows.forEach((row) => {
      // Block rows become lesson content blocks and must point at an existing slide/lesson.
      const id = this.cleanString(row.block_id);
      const slideId = this.cleanString(row.slide_id);
      if (!id) throw badRequest('Blocks sheet has a row without block_id.');
      if (!slideIds.has(slideId)) throw badRequest(`Blocks sheet references unknown slide_id: ${slideId}`);
      blocksBySlide.set(slideId, [...(blocksBySlide.get(slideId) ?? []), row]);
    });

    const modules: ContentModule[] = this.sortRows(indexRows, 'index_order').map((indexRow, indexIndex) => {
      const indexId = this.cleanString(indexRow.index_id);
      const lessons: ContentLesson[] = this.sortRows(slidesByIndex.get(indexId) ?? [], 'slide_order').map((slideRow, slideIndex) => {
        const slideId = this.cleanString(slideRow.slide_id);
        const blocks: ContentBlock[] = this.sortRows(blocksBySlide.get(slideId) ?? [], 'block_order').map((blockRow) => this.bulkBlockToContentBlock(blockRow));
        return {
          id: slideId || randomUUID(),
          title: this.cleanString(slideRow.slide_title) || `Slide ${slideIndex + 1}`,
          summary: this.cleanString(slideRow.slide_summary),
          durationMinutes: 0,
          blocks,
        };
      });
      return {
        id: indexId || randomUUID(),
        title: this.cleanString(indexRow.index_title) || `Index ${indexIndex + 1}`,
        summary: this.cleanString(indexRow.index_summary),
        lessons,
      };
    });

    return {
      title: fallbackTitle,
      description: fallbackDescription,
      modules,
    };
  }

  private bulkBlockToContentBlock(row: Record<string, string>): ContentBlock {
    // use of this is:
    // Convert one workbook Blocks row into a ContentBlock.
    const requestedType = this.cleanString(row.block_type) as ContentBlockType;
    if (!bulkBlockTypes.has(requestedType)) throw badRequest(`Unsupported block_type: ${requestedType}`);
    const block: ContentBlock = {
      id: this.cleanString(row.block_id) || randomUUID(),
      type: requestedType,
      title: this.cleanString(row.block_title),
      text: this.cleanString(row.text),
      items: [],
      columns: [],
      rows: [],
    };

    if (requestedType === 'bullet_list') {
      // Bullet list text is split by lines into individual bullet items.
      block.items = this.cleanString(row.text)
        .split(/\r?\n/)
        .map((text) => text.trim())
        .filter(Boolean)
        .map((text) => ({ text }));
      block.text = '';
    }

    if (requestedType === 'nested_bullet_list') {
      // Nested bullet list uses indentation to build parent/child items.
      block.items = this.parseBulkNestedItems(this.cleanString(row.text));
      block.text = '';
    }

    if (requestedType === 'table') {
      // Table columns are pipe-separated and rows are newline + pipe separated.
      block.columns = this.cleanString(row.columns).split('|').map((column) => column.trim()).filter(Boolean);
      block.rows = this.cleanString(row.rows)
        .split(/\r?\n/)
        .map((tableRow) => tableRow.split('|').map((cell) => cell.trim()))
        .filter((tableRow) => tableRow.some(Boolean));
      block.text = '';
      if (!block.columns.length) throw badRequest(`Table block ${block.id} is missing columns.`);
    }

    return block;
  }

  private parseBulkNestedItems(value: string): any[] {
    // use of this is:
    // Converts indented workbook text into nested bullet item objects.
    const roots: any[] = [];
    const stack: Array<{ level: number; item: any }> = [];
    value.split(/\r?\n/).forEach((rawLine) => {
      if (!rawLine.trim()) return;
      const level = Math.floor((rawLine.match(/^\s*/)?.[0] ?? '').replace(/\t/g, '  ').length / 2);
      const item = { text: rawLine.trim(), children: [] };
      while (stack.length && stack[stack.length - 1].level >= level) stack.pop();
      const parent = stack[stack.length - 1]?.item;
      if (parent) parent.children.push(item);
      else roots.push(item);
      stack.push({ level, item });
    });
    return roots;
  }

  private sortRows(rows: Record<string, string>[], orderKey: string): Record<string, string>[] {
    // use of this is:
    // Preserve workbook display order using numeric order columns.
    return [...rows].sort((a, b) => Number(a[orderKey] || 0) - Number(b[orderKey] || 0));
  }

  private parseXlsxWorkbook(buffer: Buffer): WorkbookSheets {
    // use of this is:
    // Reads workbook XML files from the XLSX zip and converts sheets into row objects.
    const files = this.unzipXlsx(buffer);
    const workbookXml = this.readZipText(files, 'xl/workbook.xml');
    const workbookRelsXml = this.readZipText(files, 'xl/_rels/workbook.xml.rels');
    const sharedStrings = files.has('xl/sharedStrings.xml') ? this.parseSharedStrings(this.readZipText(files, 'xl/sharedStrings.xml')) : [];
    const relTargets = new Map<string, string>();
    for (const rel of workbookRelsXml.matchAll(/<Relationship\b[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"/g)) {
      relTargets.set(rel[1], rel[2]);
    }

    const workbook: WorkbookSheets = {};
    for (const sheet of workbookXml.matchAll(/<sheet\b[^>]*name="([^"]+)"[^>]*(?:r:id|id)="([^"]+)"/g)) {
      const sheetName = this.xmlDecode(sheet[1]);
      const relId = sheet[2];
      const target = relTargets.get(relId);
      if (!target) continue;
      const normalizedTarget = target.replace(/^\//, '');
      const path = normalizedTarget.startsWith('xl/') ? normalizedTarget : `xl/${normalizedTarget}`;
      const rows = this.parseWorksheet(this.readZipText(files, path), sharedStrings);
      workbook[sheetName] = this.sheetRowsToObjects(rows);
    }
    return workbook;
  }

  private unzipXlsx(buffer: Buffer): Map<string, Buffer> {
    // use of this is:
    // Minimal XLSX unzipper used to avoid a large dependency for simple workbook imports.
    const files = new Map<string, Buffer>();
    let eocdOffset = -1;
    for (let i = buffer.length - 22; i >= Math.max(0, buffer.length - 70000); i--) {
      if (buffer.readUInt32LE(i) === 0x06054b50) {
        eocdOffset = i;
        break;
      }
    }
    if (eocdOffset < 0) throw badRequest('Invalid .xlsx file.');
    const entryCount = buffer.readUInt16LE(eocdOffset + 10);
    const centralOffset = buffer.readUInt32LE(eocdOffset + 16);
    let ptr = centralOffset;
    for (let i = 0; i < entryCount; i++) {
      if (buffer.readUInt32LE(ptr) !== 0x02014b50) throw badRequest('Invalid .xlsx central directory.');
      const method = buffer.readUInt16LE(ptr + 10);
      const compressedSize = buffer.readUInt32LE(ptr + 20);
      const fileNameLength = buffer.readUInt16LE(ptr + 28);
      const extraLength = buffer.readUInt16LE(ptr + 30);
      const commentLength = buffer.readUInt16LE(ptr + 32);
      const localOffset = buffer.readUInt32LE(ptr + 42);
      const fileName = buffer.slice(ptr + 46, ptr + 46 + fileNameLength).toString('utf8');
      if (buffer.readUInt32LE(localOffset) !== 0x04034b50) throw badRequest('Invalid .xlsx local file header.');
      const localNameLength = buffer.readUInt16LE(localOffset + 26);
      const localExtraLength = buffer.readUInt16LE(localOffset + 28);
      const dataStart = localOffset + 30 + localNameLength + localExtraLength;
      const compressed = buffer.slice(dataStart, dataStart + compressedSize);
      if (method === 0) files.set(fileName, compressed);
      else if (method === 8) files.set(fileName, inflateRawSync(compressed));
      ptr += 46 + fileNameLength + extraLength + commentLength;
    }
    return files;
  }

  private readZipText(files: Map<string, Buffer>, path: string): string {
    // use of this is:
    // Read required workbook XML files and throw a clear import error if missing.
    const file = files.get(path);
    if (!file) throw badRequest(`Workbook is missing ${path}.`);
    return file.toString('utf8');
  }

  private parseSharedStrings(xml: string): string[] {
    // use of this is:
    // XLSX stores repeated strings in sharedStrings.xml; this returns the lookup table.
    return [...xml.matchAll(/<si\b[^>]*>([\s\S]*?)<\/si>/g)].map((match) => {
      return [...match[1].matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)].map((textMatch) => this.xmlDecode(textMatch[1])).join('');
    });
  }

  private parseWorksheet(xml: string, sharedStrings: string[]): string[][] {
    // use of this is:
    // Convert worksheet XML cells into a two-dimensional string table.
    const rows: string[][] = [];
    for (const rowMatch of xml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)) {
      const row: string[] = [];
      for (const cellMatch of rowMatch[1].matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
        const attrs = cellMatch[1];
        const body = cellMatch[2];
        const ref = attrs.match(/\br="([A-Z]+)\d+"/)?.[1] ?? 'A';
        const columnIndex = this.columnIndex(ref);
        const type = attrs.match(/\bt="([^"]+)"/)?.[1] ?? '';
        let value = '';
        if (type === 'inlineStr') {
          value = [...body.matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)].map((match) => this.xmlDecode(match[1])).join('');
        } else {
          const rawValue = this.xmlDecode(body.match(/<v>([\s\S]*?)<\/v>/)?.[1] ?? '');
          value = type === 's' ? sharedStrings[Number(rawValue)] ?? '' : rawValue;
        }
        row[columnIndex] = value;
      }
      rows.push(row.map((value) => value ?? ''));
    }
    return rows;
  }

  private sheetRowsToObjects(rows: string[][]): Record<string, string>[] {
    // use of this is:
    // Convert first-row headers and following rows into objects like { index_id: "..." }.
    const headers = (rows[0] ?? []).map((header) => this.cleanString(header));
    if (!headers.length) return [];
    return rows.slice(1)
      .map((row) => Object.fromEntries(headers.map((header, index) => [header, this.cleanString(row[index] ?? '')])))
      .filter((row) => Object.values(row).some(Boolean));
  }

  private columnIndex(columnName: string): number {
    // use of this is:
    // Convert Excel column names like A, B, AA into zero-based array indexes.
    return columnName.split('').reduce((sum, char) => sum * 26 + char.charCodeAt(0) - 64, 0) - 1;
  }

  private xmlDecode(value: string): string {
    // use of this is:
    // Decode XML entities found in worksheet text nodes.
    return value
      .replace(/&#10;/g, '\n')
      .replace(/&#xA;/gi, '\n')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
  }

  private emptySnapshot(title: string, description: string): ContentSnapshot {
    // use of this is:
    // Create a blank content document when a course has no saved draft/published content yet.
    return { title, description, modules: [] };
  }

  private toResponse(courseId: string, snapshot: ContentSnapshot, status: string, canManage: boolean, mode: 'draft' | 'published', publishedAt: Date | null, updatedAt: Date | null) {
    // This mapper hides Mongo internals and gives Angular one stable DTO for draft and published views.
    return {
      courseId,
      status,
      mode,
      canManage,
      publishedAt,
      updatedAt,
      title: snapshot.title,
      description: snapshot.description ?? '',
      modules: snapshot.modules ?? [],
    };
  }

  private assetType(mimetype: string, originalName: string): ContentAssetType {
    // use of this is:
    // Classify uploaded assets for frontend icons/filtering using MIME type and extension fallback.
    const lowerName = originalName.toLowerCase();
    if (mimetype.includes('pdf') || lowerName.endsWith('.pdf')) return 'pdf';
    if (mimetype.includes('presentation') || lowerName.endsWith('.ppt') || lowerName.endsWith('.pptx')) return 'ppt';
    if (mimetype.includes('word') || lowerName.endsWith('.doc') || lowerName.endsWith('.docx')) return 'doc';
    if (mimetype.startsWith('image/')) return 'image';
    if (mimetype.startsWith('video/')) return 'video';
    return 'other';
  }
}
