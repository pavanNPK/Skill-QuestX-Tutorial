/** Controller file: translates Fastify requests into service method calls and returns API DTOs. */
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { FastifyRequest } from 'fastify';

import { services } from '../../business/services';
import { badRequest } from '../../core/utils/http-error';
import type { AuthenticatedRequest } from '../../core/types/fastify-auth';
import { fileToBuffer, requireMultipartFile, saveMultipartFile } from '../../core/utils/upload';

const uploadsDir = join(process.cwd(), 'uploads', 'content');
if (!existsSync(uploadsDir)) mkdirSync(uploadsDir, { recursive: true });

export class CourseContentController {
  /** Returns the course-content cards the authenticated user is allowed to see. */
  async getAvailableCourses(request: FastifyRequest) {
    // request.user is available because the route preHandler ran app.authenticate first.
    return services.courseContentService.getAvailableCourses((request as AuthenticatedRequest).user);
  }

  /** Loads either draft or published content depending on the authenticated user's role. */
  async getContent(request: FastifyRequest) {
    // Fastify stores route params on request.params; schema validation already checked shape.
    const params = request.params as { courseId: string };
    // The service decides whether this user gets draft content or published content.
    return services.courseContentService.getContent(params.courseId, (request as AuthenticatedRequest).user);
  }

  /** Saves editor/imported JSON as the course draft; publish status is handled in the service. */
  async saveDraft(request: FastifyRequest) {
    // courseId comes from URL path: /:courseId/content/import or /:courseId/content.
    const params = request.params as { courseId: string };
    // request.body is the client JSON payload; DTO schema rejects invalid/non-object bodies before this.
    // request.user is the sanitized JWT user created by auth middleware.
    return services.courseContentService.saveDraft(params.courseId, request.body, (request as AuthenticatedRequest).user);
  }

  /** Reads an uploaded workbook into memory because the parser needs the full XLSX buffer. */
  async importWorkbook(request: FastifyRequest) {
    const params = request.params as { courseId: string };
    // request.file() reads the multipart file part registered by @fastify/multipart.
    const part = await requireMultipartFile(await request.file(), 'No workbook uploaded');
    // Convert XLSX upload into a buffer so CourseContentService can parse workbook XML.
    const file = await fileToBuffer(part, 10 * 1024 * 1024, /\.xlsx$/i);
    return services.courseContentService.importWorkbookDraft(params.courseId, file, (request as AuthenticatedRequest).user);
  }

  /** Streams a content asset to disk and then stores its metadata in MongoDB. */
  async uploadAsset(request: FastifyRequest) {
    const params = request.params as { courseId: string };
    const part = await requireMultipartFile(await request.file(), 'No file uploaded');
    // Store course assets under uploads/content/<courseId> so public URLs are predictable.
    const courseDir = join(uploadsDir, params.courseId);
    // Stream to disk instead of buffering large videos/documents in memory.
    const file = await saveMultipartFile(part, courseDir, 'content', 100 * 1024 * 1024);
    if (!file.filename) throw badRequest('No file uploaded');
    // Service persists metadata and verifies manage permission.
    return services.courseContentService.saveAsset(params.courseId, file, (request as AuthenticatedRequest).user);
  }

  /** Copies the current draft snapshot into the published snapshot. */
  async publish(request: FastifyRequest) {
    const params = request.params as { courseId: string };
    // Service checks manager permissions and updates publish fields.
    return services.courseContentService.publish(params.courseId, (request as AuthenticatedRequest).user);
  }

  /** Marks published content unavailable while keeping the draft editable. */
  async unpublish(request: FastifyRequest) {
    const params = request.params as { courseId: string };
    // Service keeps draft data but changes status to unpublished.
    return services.courseContentService.unpublish(params.courseId, (request as AuthenticatedRequest).user);
  }
}

export const courseContentController = new CourseContentController();
