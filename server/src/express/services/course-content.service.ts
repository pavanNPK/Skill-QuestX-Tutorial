import { randomUUID } from 'crypto';
import { inflateRawSync } from 'zlib';
import { Types } from 'mongoose';
import { ROLES } from '../constants/roles';
import { ContentAssetModel, type ContentAssetType } from '../models/content-asset.model';
import {
  CourseContentModel,
  type ContentBlock,
  type ContentBlockType,
  type ContentLesson,
  type ContentModule,
  type ContentSnapshot,
} from '../models/course-content.model';
import { badRequest, forbidden } from '../utils/http-error';
import type { AuthUser } from '../types/request';
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
    const contents = await CourseContentModel.find({ courseId: { $in: courseIds } }).lean().exec();
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

    console.info('[CourseContent Service] Available courses result', {
      userId: user.id,
      role: user.role,
      assignedOrEnrolledCourseCount: courses.length,
      contentDocumentCount: contents.length,
      returnedCourseCount: availableCourses.length,
      courses: availableCourses.map((course: any) => ({
        id: course.id,
        title: course.title,
        status: course.status,
        modules: course.moduleCount,
        lessons: course.lessonCount,
        canManage: course.canManage,
      })),
    });

    return availableCourses;
  }

  async getContent(courseId: string, user: AuthUser) {
    const course = await this.requireCourse(courseId);
    const canManage = this.canManage(user, course);
    if (!canManage && !(await this.canReadPublished(user, courseId))) {
      throw forbidden('You do not have access to this course content.');
    }

    const content = await CourseContentModel.findOne({ courseId: new Types.ObjectId(courseId) }).lean().exec();
    if (!content) {
      if (canManage) {
        return this.toResponse(courseId, this.emptySnapshot(course.name, course.description ?? ''), 'draft', canManage, 'draft', null, null);
      }
      throw forbidden('Course content is not published.');
    }

    if (canManage) {
      return this.toResponse(courseId, content.draft, content.status, true, 'draft', content.publishedAt ?? null, (content as any).updatedAt ?? null);
    }
    if (content.status !== 'published' || !content.published) {
      throw forbidden('Course content is not published.');
    }
    return this.toResponse(courseId, content.published, content.status, false, 'published', content.publishedAt ?? null, (content as any).updatedAt ?? null);
  }

  async saveDraft(courseId: string, body: unknown, user: AuthUser) {
    const course = await this.requireCourse(courseId);
    this.requireManage(user, course);
    const draft = this.normalizeSnapshot(body, course.name, course.description ?? '');
    const existing = await CourseContentModel.findOne({ courseId: new Types.ObjectId(courseId) }).exec();
    if (!existing) {
      const created = await CourseContentModel.create({
        courseId: new Types.ObjectId(courseId),
        draft,
        published: null,
        status: 'draft',
        createdBy: new Types.ObjectId(user.id),
        updatedBy: new Types.ObjectId(user.id),
      });
      return this.toResponse(courseId, created.draft, created.status, true, 'draft', created.publishedAt, (created as any).updatedAt);
    }
    existing.draft = draft as any;
    existing.status = existing.published ? existing.status : 'draft';
    existing.updatedBy = new Types.ObjectId(user.id);
    await existing.save();
    return this.toResponse(courseId, existing.draft, existing.status, true, 'draft', existing.publishedAt, (existing as any).updatedAt);
  }

  async importWorkbookDraft(courseId: string, file: Express.Multer.File, user: AuthUser) {
    const course = await this.requireCourse(courseId);
    this.requireManage(user, course);
    if (!file?.buffer?.length) throw badRequest('No workbook uploaded.');
    if (!/\.xlsx$/i.test(file.originalname)) throw badRequest('Bulk upload supports Excel .xlsx files only.');

    const workbook = this.parseXlsxWorkbook(file.buffer);
    const snapshot = this.workbookToSnapshot(workbook, course.name, course.description ?? '');
    return this.saveDraft(courseId, snapshot, user);
  }

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

  async unpublish(courseId: string, user: AuthUser) {
    const course = await this.requireCourse(courseId);
    this.requireManage(user, course);
    const existing = await CourseContentModel.findOne({ courseId: new Types.ObjectId(courseId) }).exec();
    if (!existing) throw badRequest('Course content not found.');
    existing.status = 'unpublished';
    await existing.save();
    return this.toResponse(courseId, existing.draft, existing.status, true, 'draft', existing.publishedAt, (existing as any).updatedAt);
  }

  async saveAsset(courseId: string, file: Express.Multer.File, user: AuthUser) {
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
    if (user.role === ROLES.SUPER_ADMIN || user.role === ROLES.ADMIN) {
      return this.courseService.findAll();
    }
    if (user.role === ROLES.INSTRUCTOR) {
      return this.courseService.findByInstructorId(user.id);
    }
    const courseIds = await this.batchService.getCourseIdsForStudent(user.id);
    if (!courseIds.length) return [];
    const courses = await Promise.all(courseIds.map((id) => this.courseService.findById(id)));
    return courses.filter(Boolean) as CourseLean[];
  }

  private async requireCourse(courseId: string): Promise<CourseLean> {
    if (!Types.ObjectId.isValid(courseId)) throw badRequest('Invalid course id.');
    const course = await this.courseService.findById(courseId);
    if (!course) throw badRequest('Course not found.');
    return course;
  }

  private canManage(user: AuthUser, course: CourseLean): boolean {
    if (user.role === ROLES.SUPER_ADMIN || user.role === ROLES.ADMIN) return true;
    if (user.role !== ROLES.INSTRUCTOR) return false;
    return (course.instructorIds ?? []).some((id) => id.toString() === user.id);
  }

  private requireManage(user: AuthUser, course: CourseLean): void {
    if (!this.canManage(user, course)) {
      throw forbidden('You do not have permission to manage this course content.');
    }
  }

  private async canReadPublished(user: AuthUser, courseId: string): Promise<boolean> {
    if (user.role !== ROLES.STUDENT) return false;
    return this.batchService.isStudentInCourse(user.id, courseId);
  }

  private normalizeSnapshot(input: any, fallbackTitle: string, fallbackDescription: string): ContentSnapshot {
    const source = input?.draft ?? input;
    const title = this.cleanString(source?.title) || fallbackTitle;
    const description = this.cleanString(source?.description) || fallbackDescription || '';
    const modules = Array.isArray(source?.modules) ? source.modules.map((module: any) => this.normalizeModule(module)) : [];
    return { title, description, modules };
  }

  private normalizeModule(module: any): ContentModule {
    return {
      id: this.cleanString(module?.id) || randomUUID(),
      title: this.cleanString(module?.title) || 'Untitled Module',
      summary: this.cleanString(module?.summary),
      lessons: Array.isArray(module?.lessons) ? module.lessons.map((lesson: any) => this.normalizeLesson(lesson)) : [],
    };
  }

  private normalizeLesson(lesson: any): ContentLesson {
    return {
      id: this.cleanString(lesson?.id) || randomUUID(),
      title: this.cleanString(lesson?.title) || 'Untitled Lesson',
      summary: this.cleanString(lesson?.summary),
      durationMinutes: Number.isFinite(Number(lesson?.durationMinutes)) ? Number(lesson.durationMinutes) : 0,
      blocks: Array.isArray(lesson?.blocks) ? lesson.blocks.map((block: any) => this.normalizeBlock(block)) : [],
    };
  }

  private normalizeBlock(block: any): ContentBlock {
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
    return items.map((item) => ({
      text: this.cleanString(item?.text ?? item) || '',
      children: Array.isArray(item?.children) ? this.normalizeBullets(item.children) : [],
    }));
  }

  private cleanString(value: unknown): string {
    return typeof value === 'string' ? value.trim() : '';
  }

  private workbookToSnapshot(workbook: WorkbookSheets, fallbackTitle: string, fallbackDescription: string): ContentSnapshot {
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
      const id = this.cleanString(row.index_id);
      if (!id) throw badRequest('Indexes sheet has a row without index_id.');
      if (indexIds.has(id)) throw badRequest(`Duplicate index_id: ${id}`);
      indexIds.add(id);
    });

    slideRows.forEach((row) => {
      const id = this.cleanString(row.slide_id);
      const indexId = this.cleanString(row.index_id);
      if (!id) throw badRequest('Slides sheet has a row without slide_id.');
      if (slideIds.has(id)) throw badRequest(`Duplicate slide_id: ${id}`);
      if (!indexIds.has(indexId)) throw badRequest(`Slides sheet references unknown index_id: ${indexId}`);
      slideIds.add(id);
      slidesByIndex.set(indexId, [...(slidesByIndex.get(indexId) ?? []), row]);
    });

    blockRows.forEach((row) => {
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
      block.items = this.cleanString(row.text)
        .split(/\r?\n/)
        .map((text) => text.trim())
        .filter(Boolean)
        .map((text) => ({ text }));
      block.text = '';
    }

    if (requestedType === 'nested_bullet_list') {
      block.items = this.parseBulkNestedItems(this.cleanString(row.text));
      block.text = '';
    }

    if (requestedType === 'table') {
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
    return [...rows].sort((a, b) => Number(a[orderKey] || 0) - Number(b[orderKey] || 0));
  }

  private parseXlsxWorkbook(buffer: Buffer): WorkbookSheets {
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
    const file = files.get(path);
    if (!file) throw badRequest(`Workbook is missing ${path}.`);
    return file.toString('utf8');
  }

  private parseSharedStrings(xml: string): string[] {
    return [...xml.matchAll(/<si\b[^>]*>([\s\S]*?)<\/si>/g)].map((match) => {
      return [...match[1].matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)].map((textMatch) => this.xmlDecode(textMatch[1])).join('');
    });
  }

  private parseWorksheet(xml: string, sharedStrings: string[]): string[][] {
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
    const headers = (rows[0] ?? []).map((header) => this.cleanString(header));
    if (!headers.length) return [];
    return rows.slice(1)
      .map((row) => Object.fromEntries(headers.map((header, index) => [header, this.cleanString(row[index] ?? '')])))
      .filter((row) => Object.values(row).some(Boolean));
  }

  private columnIndex(columnName: string): number {
    return columnName.split('').reduce((sum, char) => sum * 26 + char.charCodeAt(0) - 64, 0) - 1;
  }

  private xmlDecode(value: string): string {
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
    return { title, description, modules: [] };
  }

  private toResponse(courseId: string, snapshot: ContentSnapshot, status: string, canManage: boolean, mode: 'draft' | 'published', publishedAt: Date | null, updatedAt: Date | null) {
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
    const lowerName = originalName.toLowerCase();
    if (mimetype.includes('pdf') || lowerName.endsWith('.pdf')) return 'pdf';
    if (mimetype.includes('presentation') || lowerName.endsWith('.ppt') || lowerName.endsWith('.pptx')) return 'ppt';
    if (mimetype.includes('word') || lowerName.endsWith('.doc') || lowerName.endsWith('.docx')) return 'doc';
    if (mimetype.startsWith('image/')) return 'image';
    if (mimetype.startsWith('video/')) return 'video';
    return 'other';
  }
}
