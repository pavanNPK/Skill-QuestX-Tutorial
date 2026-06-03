/** Controller file: translates Fastify requests into service method calls and returns API DTOs. */
import type { FastifyRequest } from 'fastify';

import { services } from '../../business/services';
import type { AuthenticatedRequest } from '../../core/types/fastify-auth';

export class TaskController {
  // use of this is:
  // Creates a task from the instructor/admin task form.
  async create(request: FastifyRequest) {
    // request.body contains task data; request.user.id records who created the task.
    return services.taskService.create(request.body as any, (request as AuthenticatedRequest).user.id);
  }

  // use of this is:
  // Saves a student's submission for one task.
  async submit(request: FastifyRequest) {
    // params.id comes from /:id/submit and points to the task being answered.
    const params = request.params as { id: string };
    // Service stores submission data against both task id and authenticated student id.
    return services.taskService.submit(params.id, (request as AuthenticatedRequest).user.id, request.body as any);
  }
}

export const taskController = new TaskController();
