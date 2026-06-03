/** Route file: declares URL, HTTP method, preHandler auth hooks, DTO schema validation, and controller handler. */
import type { FastifyPluginAsync } from 'fastify';

import { courseContentController } from '../../controller/controllers/course-content.controller';
import { courseIdParamsSchema, looseObjectBodySchema } from '../dto/shared.schemas';

export const courseContentRoutes: FastifyPluginAsync = async (app) => {
  // use of this hook is:
  // Log every course-content request before it reaches validation/controller logic.
  // This helps debug upload/import/save flows without putting logs inside every handler.
  app.addHook('onRequest', async (request) => {
    request.log.info({ method: request.method, url: request.url }, 'course-content request');
  });

  // use of this route is:
  // Return course-content cards available for the logged-in user.
  // preHandler: app.authenticate verifies JWT and attaches request.user.
  // handler: controller reads request.user and calls CourseContentService.
  app.get('/content/available', {
    preHandler: [app.authenticate],
    handler: courseContentController.getAvailableCourses,
  });

  // use of this route is:
  // Load one course's content by :courseId.
  // preHandler: blocks unauthenticated requests before the controller runs.
  // schema.params: validates that route params contain courseId.
  // handler: controller extracts courseId and authenticated user, then calls service.getContent().
  app.get('/:courseId/content', {
    preHandler: [app.authenticate],
    schema: { params: courseIdParamsSchema },
    handler: courseContentController.getContent,
  });

  // use of this route is:
  // Save imported/editor JSON into the course draft.
  // preHandler: comes from auth.middleware.ts and verifies the bearer JWT.
  // schema: comes from dto/shared.schemas.ts and validates params/body before controller.
  // handler: points to controller.saveDraft, which calls services.courseContentService.saveDraft().
  app.post('/:courseId/content/import', {
    preHandler: [app.authenticate],
    schema: { params: courseIdParamsSchema, body: looseObjectBodySchema },
    handler: courseContentController.saveDraft,
  });

  // use of this route is:
  // Accept XLSX upload and import workbook rows into draft modules/lessons/blocks.
  // schema only validates params because multipart file validation happens in controller upload helpers.
  app.post('/:courseId/content/import-workbook', {
    preHandler: [app.authenticate],
    schema: { params: courseIdParamsSchema },
    handler: courseContentController.importWorkbook,
  });

  // use of this route is:
  // Save editor changes to existing draft content.
  // PATCH and POST import share the same controller method because both update draft snapshot.
  app.patch('/:courseId/content', {
    preHandler: [app.authenticate],
    schema: { params: courseIdParamsSchema, body: looseObjectBodySchema },
    handler: courseContentController.saveDraft,
  });

  // use of this route is:
  // Upload a material asset and save metadata against a course.
  // File size/path validation happens in controller/upload utility.
  app.post('/:courseId/content/assets', {
    preHandler: [app.authenticate],
    schema: { params: courseIdParamsSchema },
    handler: courseContentController.uploadAsset,
  });

  // use of this route is:
  // Publish current draft so students can see it.
  app.post('/:courseId/content/publish', {
    preHandler: [app.authenticate],
    schema: { params: courseIdParamsSchema },
    handler: courseContentController.publish,
  });

  // use of this route is:
  // Hide published content from students without deleting manager draft content.
  app.post('/:courseId/content/unpublish', {
    preHandler: [app.authenticate],
    schema: { params: courseIdParamsSchema },
    handler: courseContentController.unpublish,
  });
};
