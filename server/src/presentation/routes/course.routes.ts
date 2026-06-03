/** Route file: declares URL, HTTP method, preHandler auth hooks, DTO schema validation, and controller handler. */
import type { FastifyPluginAsync } from 'fastify';

import { courseController } from '../../controller/controllers/course.controller';

export const courseRoutes: FastifyPluginAsync = async (app) => {
  // use of this route is:
  // Return public course cards for the course listing page.
  // No preHandler is used because browsing available courses does not require login.
  // handler points directly to CourseController.listCourses, which maps Mongo documents to DTOs.
  app.get('/', courseController.listCourses);
};
