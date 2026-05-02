import express = require('express');
import path = require('path');
const cors = require('cors') as any;
import { env } from './config/env';
import { authRoutes } from './routes/auth.routes';
import { courseRoutes } from './routes/course.routes';
import { courseContentRoutes } from './routes/course-content.routes';
import { examRoutes } from './routes/exam.routes';
import { notificationRoutes } from './routes/notification.routes';
import { taskRoutes } from './routes/task.routes';
import { uploadRoutes } from './routes/upload.routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

export function createExpressApp(): express.Express {
  const app = express();

  app.use(cors({ origin: env.clientUrl, credentials: true }));
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  const api = express.Router();
  api.use('/auth', authRoutes());
  api.use('/courses', courseContentRoutes());
  api.use('/courses', courseRoutes());
  api.use('/exams', examRoutes());
  api.use('/tasks', taskRoutes());
  api.use('/notifications', notificationRoutes());
  api.use('/upload', uploadRoutes());

  app.use('/api', api);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
