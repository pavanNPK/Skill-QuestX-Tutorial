import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { Router } from 'express';
import multer = require('multer');
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../middleware/async-handler';
import { services } from '../services';
import type { AuthRequest } from '../types/request';

const uploadsDir = join(process.cwd(), 'uploads', 'content');
if (!existsSync(uploadsDir)) mkdirSync(uploadsDir, { recursive: true });

const allowedMimes = new Set([
  'application/pdf',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
  'image/webp',
  'video/mp4',
]);

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, _file, cb) => {
      const courseDir = join(uploadsDir, String(req.params.courseId));
      if (!existsSync(courseDir)) mkdirSync(courseDir, { recursive: true });
      cb(null, courseDir);
    },
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `content-${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (allowedMimes.has(file.mimetype)) cb(null, true);
    else cb(new Error('Invalid file type. Allowed: PDF, PPT, PPTX, DOC, DOCX, PNG, JPG, WEBP, MP4.'));
  },
});

export function courseContentRoutes(): Router {
  const router = Router();

  router.use((req, res, next) => {
    const startedAt = Date.now();
    console.info('[CourseContent Route] Incoming', {
      method: req.method,
      route: `/api/courses${req.originalUrl.replace(/^\/api\/courses/, '')}`,
      originalUrl: req.originalUrl,
    });

    res.on('finish', () => {
      const authReq = req as AuthRequest;
      console.info('[CourseContent Route] Completed', {
        method: req.method,
        route: `/api/courses${req.originalUrl.replace(/^\/api\/courses/, '')}`,
        statusCode: res.statusCode,
        durationMs: Date.now() - startedAt,
        userId: authReq.user?.id,
        role: authReq.user?.role,
      });
    });

    next();
  });

  router.get('/content/available', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    res.json(await services.courseContentService.getAvailableCourses(req.user!));
  }));

  router.get('/:courseId/content', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    res.json(await services.courseContentService.getContent(String(req.params.courseId), req.user!));
  }));

  router.post('/:courseId/content/import', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    res.json(await services.courseContentService.saveDraft(String(req.params.courseId), req.body, req.user!));
  }));

  router.patch('/:courseId/content', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    res.json(await services.courseContentService.saveDraft(String(req.params.courseId), req.body, req.user!));
  }));

  router.post('/:courseId/content/assets', authenticate, upload.single('file'), asyncHandler(async (req: AuthRequest, res) => {
    if (!req.file) {
      res.status(400).json({ statusCode: 400, message: 'No file uploaded' });
      return;
    }
    res.json(await services.courseContentService.saveAsset(String(req.params.courseId), req.file, req.user!));
  }));

  router.post('/:courseId/content/publish', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    res.json(await services.courseContentService.publish(String(req.params.courseId), req.user!));
  }));

  router.post('/:courseId/content/unpublish', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    res.json(await services.courseContentService.unpublish(String(req.params.courseId), req.user!));
  }));

  return router;
}
