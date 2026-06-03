/** Route file: declares URL, HTTP method, preHandler auth hooks, DTO schema validation, and controller handler. */
import type { FastifyPluginAsync } from 'fastify';

import { uploadController } from '../../controller/controllers/upload.controller';

export const uploadRoutes: FastifyPluginAsync = async (app) => {
  // use of this route is:
  // Upload a resume during registration before the user has a JWT.
  // No JSON schema is used because multipart validation happens in upload utilities.
  app.post('/resume', uploadController.uploadResume);
};
