/** Core type file: defines shared TypeScript contracts used across routes, controllers, middleware, and services. */
import type { FastifyRequest } from 'fastify';
import type { AuthUser } from './request';

export type AuthenticatedRequest = FastifyRequest & {
  // use of this is:
  // Controllers use this type after authenticate has guaranteed request.user exists.
  user: AuthUser;
};

declare module 'fastify' {
  interface FastifyRequest {
    // auth.middleware.ts decorates this property after JWT verification.
    user?: AuthUser;
  }

  interface FastifyInstance {
    // Reusable route preHandler that authenticates a bearer JWT.
    authenticate(request: FastifyRequest): Promise<void>;
    // Reusable route preHandler factory that checks allowed user roles.
    requireRoles(...roles: string[]): (request: FastifyRequest) => Promise<void>;
  }
}
