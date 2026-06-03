/** Route file: declares URL, HTTP method, preHandler auth hooks, DTO schema validation, and controller handler. */
import type { FastifyPluginAsync } from 'fastify';

import { taskController } from '../../controller/controllers/task.controller';
import { idParamsSchema, looseObjectBodySchema } from '../dto/shared.schemas';

export const taskRoutes: FastifyPluginAsync = async (app) => {
  // use of this hook is:
  // All task routes require a JWT, so this plugin-level preHandler authenticates every route below.
  // Route-specific preHandlers still run after this for role checks.
  app.addHook('preHandler', app.authenticate);

  // use of this route is:
  // Create a task from instructor/admin screens.
  // requireRoles allows only task managers; schema validates the JSON body; handler calls controller.create.
  app.post('/', {
    preHandler: [app.requireRoles('instructor', 'super_admin', 'admin')],
    schema: { body: looseObjectBodySchema },
    handler: taskController.create,
  });

  // use of this route is:
  // Submit a student's answer/work for one task.
  // requireRoles keeps staff from accidentally using the student submission endpoint.
  app.post('/:id/submit', {
    preHandler: [app.requireRoles('student')],
    schema: { params: idParamsSchema, body: looseObjectBodySchema },
    handler: taskController.submit,
  });
};
