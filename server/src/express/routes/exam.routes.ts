import { Router } from 'express';
import multer = require('multer');
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../middleware/async-handler';
import { services } from '../services';
import type { AuthRequest } from '../types/request';

const docUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 20 },
});

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

  router.get('/manage', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    res.json(await services.examService.getManagedExams(req.user!));
  }));

  router.get('/manage/all', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    res.json(await services.examService.getManagedExams(req.user!));
  }));

  router.post('/manage', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    res.json(await services.examService.create(req.body, req.user!));
  }));

  router.post('/manage/import-docx', authenticate, docUpload.array('files', 20), asyncHandler(async (req: AuthRequest, res) => {
    res.json(await services.examService.importDocx((req.files ?? []) as Express.Multer.File[], req.user!));
  }));

  router.put('/manage/:examId', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    res.json(await services.examService.update(String(req.params.examId), req.body, req.user!));
  }));

  router.delete('/manage/:examId', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    res.json(await services.examService.delete(String(req.params.examId), req.user!));
  }));

  router.get('/:examId', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    res.json(await services.examService.getExam(String(req.params.examId)));
  }));

  router.post('/:examId/submit', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    res.json(await services.examService.submit(String(req.params.examId), req.body, req.user!));
  }));

  return router;
}
