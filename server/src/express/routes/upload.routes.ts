import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { Router } from 'express';
import multer = require('multer');
import { badRequest } from '../utils/http-error';
import { services } from '../services';

const uploadsDir = join(process.cwd(), 'uploads');
const resumesDir = join(uploadsDir, 'resumes');
if (!existsSync(uploadsDir)) mkdirSync(uploadsDir, { recursive: true });
if (!existsSync(resumesDir)) mkdirSync(resumesDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, resumesDir),
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `resume-${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowedMimes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    if (allowedMimes.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Invalid file type. Only PDF, DOC, DOCX, XLS, XLSX allowed.'));
  },
});

export function uploadRoutes(): Router {
  const router = Router();
  router.post('/resume', upload.single('file'), (req, res, next) => {
    try {
      if (!req.file) throw badRequest('No file uploaded');
      res.json({
        message: 'Resume uploaded successfully',
        filename: req.file.filename,
        url: services.uploadService.getResumeUrl(req.file.filename),
        size: req.file.size,
      });
    } catch (error) {
      next(error);
    }
  });
  return router;
}
