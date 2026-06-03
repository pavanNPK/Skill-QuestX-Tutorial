/** Middleware file: registers Fastify hooks and decorators that run before route handlers. */
import fp = require('fastify-plugin');
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import formbody from '@fastify/formbody';
import helmet from '@fastify/helmet';
import multipart from '@fastify/multipart';
import rateLimit from '@fastify/rate-limit';
import staticFiles from '@fastify/static';
import type { FastifyPluginAsync } from 'fastify';
import path = require('path');

import { env } from '../../core/config/env';

const securityPlugin: FastifyPluginAsync = async (app) => {
  // use of this is:
  // Cookie parsing is required for request.cookies in the CSRF guard and token endpoint.
  await app.register(cookie);

  // use of this is:
  // Helmet adds defensive headers such as frame, MIME sniffing, and referrer controls.
  await app.register(helmet, {
    global: true,
    // CSP is enabled in production; development stays easier for local Angular tooling.
    contentSecurityPolicy: env.nodeEnv === 'production',
  });

  // use of this is:
  // CORS is locked to the configured Angular origin; unknown browser origins are rejected.
  await app.register(cors, {
    origin: (origin, cb) => {
      // Allow same-origin/non-browser requests where origin is missing.
      if (!origin || origin === env.clientUrl) {
        cb(null, true);
        return;
      }
      // Reject every other browser origin.
      cb(new Error('Origin is not allowed'), false);
    },
    // credentials true allows cookies when the frontend intentionally uses them.
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  // use of this is:
  // Global rate limiting protects the API from noisy clients and basic abuse.
  await app.register(rateLimit, {
    max: 120,
    timeWindow: '1 minute',
    // Local development should not be blocked by repeated testing.
    allowList: ['127.0.0.1', '::1'],
  });

  // use of this is:
  // URL-encoded forms are accepted for compatibility, but use the same 2MB body cap.
  await app.register(formbody, { bodyLimit: 2 * 1024 * 1024 });

  // use of this is:
  // Multipart is registered globally so controllers can call request.file().
  // Each upload route still applies its own stricter file type and size checks.
  await app.register(multipart, {
    limits: {
      fileSize: 100 * 1024 * 1024,
      files: 20,
    },
  });

  // use of this is:
  // Static uploads are served outside /api and receive short-lived cache headers.
  await app.register(staticFiles, {
    root: path.join(process.cwd(), 'uploads'),
    prefix: '/uploads/',
    decorateReply: false,
    setHeaders: (res) => {
      // Uploaded assets can be cached briefly without making updates stale for too long.
      res.setHeader('Cache-Control', 'public, max-age=3600');
    },
  });
};

// use of this export is:
// build-app.ts registers this before route plugins so all routes inherit security setup.
export const securityPluginRegistration = fp(securityPlugin, { name: 'security-plugin' });
