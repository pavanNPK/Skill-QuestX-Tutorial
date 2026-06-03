/** Route file: declares URL, HTTP method, preHandler auth hooks, DTO schema validation, and controller handler. */
import type { FastifyPluginAsync } from 'fastify';

import { securityController } from '../../controller/controllers/security.controller';

export const securityRoutes: FastifyPluginAsync = async (app) => {
  // use of this route is:
  // The CSRF token endpoint creates a token cookie and returns the same token in JSON.
  // The inline handler passes FastifyReply to the controller because setting cookies needs reply.
  app.get('/csrf-token', async (_request, reply) => securityController.getCsrfToken(reply));
};
