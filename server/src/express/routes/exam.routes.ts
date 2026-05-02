import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../middleware/async-handler';
import { services } from '../services';
import type { AuthRequest } from '../types/request';

export function examRoutes(): Router {
  const router = Router();

  router.use((_req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
  });

  router.get('/available', authenticate, asyncHandler(async (_req: AuthRequest, res) => {
    res.json(await services.examService.getAvailableExams());
  }));

  router.get('/:examId', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    res.json(await services.examService.getExam(String(req.params.examId)));
  }));

  router.post('/:examId/submit', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    res.json(await services.examService.submit(String(req.params.examId), req.body, req.user!));
  }));

  return router;
}
