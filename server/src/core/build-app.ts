/** Core app builder: creates the Fastify instance, registers security middleware, and mounts route plugins. */
import fastify, { type FastifyInstance } from 'fastify';

import './types/fastify-auth';
import { env } from './config/env';
import { HttpError } from './utils/http-error';
import { authPluginRegistration } from '../presentation/middlewares/auth.middleware';
import { csrfPluginRegistration } from '../presentation/middlewares/csrf.middleware';
import { securityPluginRegistration } from '../presentation/middlewares/security.middleware';
import { authRoutes } from '../presentation/routes/auth.routes';
import { courseContentRoutes } from '../presentation/routes/course-content.routes';
import { courseRoutes } from '../presentation/routes/course.routes';
import { examRoutes } from '../presentation/routes/exam.routes';
import { materialDraftRoutes } from '../presentation/routes/material-draft.routes';
import { notificationRoutes } from '../presentation/routes/notification.routes';
import { securityRoutes } from '../presentation/routes/security.routes';
import { taskRoutes } from '../presentation/routes/task.routes';
import { uploadRoutes } from '../presentation/routes/upload.routes';

export async function buildApp(): Promise<FastifyInstance> {
  // use of this is:
  // Build and return a configured Fastify app without listening on a port.
  // This makes startup, tests, and route-registration checks use the same application factory.

  // The Fastify instance is the only HTTP boundary. Domain services stay framework-free.
  const app = fastify({
    logger: {
      level: env.nodeEnv === 'production' ? 'info' : 'debug',
      // Redaction prevents accidental leakage of tokens and passwords in structured logs.
      redact: ['req.headers.authorization', 'request.headers.authorization', 'body.password', 'body.newPassword', 'body.currentPassword'],
    },
    // JSON payloads are capped globally; multipart routes define their own file limits.
    bodyLimit: 2 * 1024 * 1024,
    // Trust proxy headers only in production where a reverse proxy is expected.
    trustProxy: env.nodeEnv === 'production',
    ajv: {
      customOptions: {
        // Unknown DTO fields are stripped only on strict schemas. Flexible editor/import
        // routes opt into additionalProperties so their dynamic bodies are preserved.
        removeAdditional: true,
        // Coercion is disabled so clients must send the exact expected JSON types.
        coerceTypes: false,
        allErrors: false,
      },
    },
  });

  // use of this is:
  // Convert all thrown errors into one stable JSON response format.
  // All thrown domain errors and Fastify validation errors become stable JSON responses.
  app.setErrorHandler((error, request, reply) => {
    // HttpError is thrown by our own services/controllers for known API failures.
    if (error instanceof HttpError) {
      return reply.status(error.status).send({ statusCode: error.status, message: error.message });
    }

    // Fastify/AJV errors include statusCode/message; clamp status into valid HTTP range.
    if ((error as any).statusCode && (error as any).message) {
      const statusCode = Math.min(Math.max(Number((error as any).statusCode), 400), 599);
      return reply.status(statusCode).send({ statusCode, message: (error as any).message });
    }

    // Unknown errors are logged internally but exposed as a generic 500 response.
    request.log.error({ error }, 'Unhandled server error');
    return reply.status(500).send({ statusCode: 500, message: 'Internal server error' });
  });

  // use of this is:
  // Return a predictable JSON 404 instead of Fastify's default not-found body.
  app.setNotFoundHandler((request, reply) => {
    reply.status(404).send({ statusCode: 404, message: `Cannot ${request.method} ${request.url}` });
  });

  // use of this is:
  // Register cross-cutting plugins before routes so routes can use their decorators and protections.
  // Security plugins register before routes so every route inherits the same boundary rules.
  await app.register(securityPluginRegistration);
  await app.register(csrfPluginRegistration);
  await app.register(authPluginRegistration);

  // use of this is:
  // Mount all API groups under /api while keeping each feature route file focused on its own prefix.
  // API route groups are isolated plugins. Prefixes mirror the existing Angular API URLs.
  await app.register(async (api) => {
    // /api/auth handles login, registration, user administration, and profile/session endpoints.
    await api.register(authRoutes, { prefix: '/auth' });
    // /api/courses has both public course listing and protected course-content endpoints.
    await api.register(courseContentRoutes, { prefix: '/courses' });
    await api.register(courseRoutes, { prefix: '/courses' });
    // /api/exams handles exam management, import, retrieval, and submissions.
    await api.register(examRoutes, { prefix: '/exams' });
    // /api/material-drafts handles the new standalone upload/review/submit material flow.
    await api.register(materialDraftRoutes, { prefix: '/material-drafts' });
    // /api/tasks handles task creation and student submissions.
    await api.register(taskRoutes, { prefix: '/tasks' });
    // /api/notifications handles notification list/read and push subscription endpoints.
    await api.register(notificationRoutes, { prefix: '/notifications' });
    // /api/security exposes CSRF token support endpoints.
    await api.register(securityRoutes, { prefix: '/security' });
    // /api/upload handles public resume upload.
    await api.register(uploadRoutes, { prefix: '/upload' });
  }, { prefix: '/api' });

  // Return app to bootstrap/tests after all plugins and routes are registered.
  return app;
}
