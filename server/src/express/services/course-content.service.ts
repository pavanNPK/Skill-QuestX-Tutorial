import { randomUUID } from 'crypto';
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
