import { Router } from 'express';
import { authenticate, requireRoles } from '../middleware/auth.middleware';
import { asyncHandler } from '../middleware/async-handler';
import { services } from '../services';
import type { AuthRequest } from '../types/request';

export function taskRoutes(): Router {
  const router = Router();
  router.use(authenticate);

  router.post('/', requireRoles('instructor', 'super_admin', 'admin'), asyncHandler(async (req: AuthRequest, res) => {
    res.json(await services.taskService.create(req.body, req.user!.id));
  }));

  router.post('/:id/submit', requireRoles('student'), asyncHandler(async (req: AuthRequest, res) => {
    res.json(await services.taskService.submit(String(req.params.id), req.user!.id, req.body));
  }));

  return router;
}
