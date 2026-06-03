/** Middleware file: registers Fastify hooks and decorators that run before route handlers. */
import fp = require('fastify-plugin');
import jwt = require('jsonwebtoken');
import type { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { env } from '../../core/config/env';
import { services } from '../../business/services';
import { forbidden, unauthorized } from '../../core/utils/http-error';

interface JwtPayload {
  // sub stores the Mongo user id because JWT subject is the standard place for principal id.
  sub: string;
  // email is kept for traceability, but database lookup still uses sub as the trusted id.
  email: string;
}

const authPlugin: FastifyPluginAsync = async (app) => {
  // use of this is:
  // decorateRequest tells Fastify that request.user can exist on incoming requests.
  // It starts empty and is populated only after app.authenticate verifies a valid JWT.
  app.decorateRequest('user');

  // use of this is:
  // app.authenticate is a reusable preHandler hook used in route files.
  // It validates the bearer token, loads the fresh user document, rejects inactive users,
  // and attaches a safe AuthUser object to request.user for controllers/services.
  app.decorate('authenticate', async (request: FastifyRequest): Promise<void> => {
    // Authorization header must be exactly a bearer token for API authentication.
    const token = extractBearerToken(request.headers.authorization);
    if (!token) throw unauthorized('Unauthorized');

    // jwt.verify checks signature and expiry using the configured JWT secret.
    const payload = jwt.verify(token, env.jwtSecret) as JwtPayload;
    // Load user from MongoDB so disabled/deleted accounts cannot keep using old tokens.
    const user = await services.userService.findById(payload.sub);

    if (!user) throw unauthorized('Unauthorized');
    if (user.isActive === false) {
      throw unauthorized('Your account has been deactivated. Please contact your administrator to reactivate your account.');
    }

    // Routes use this sanitized user object instead of the full database document.
    // Password hash, OTP fields, reset tokens, and other private fields are never attached.
    request.user = {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role ?? 'student',
      profileImageUrl: user.profileImageUrl ?? null,
      canManageUsers: user.role === 'admin' && user.canManageUsers === true ? true : undefined,
    };
  });

  // use of this is:
  // app.requireRoles builds a route-level authorization hook.
  // Route files call it beside each protected route so allowed roles are visible where the URL is declared.
  app.decorate('requireRoles', (...roles: string[]) => {
    return async (request: FastifyRequest): Promise<void> => {
      // If authenticate did not run or failed, there is no user to authorize.
      if (!request.user) throw unauthorized('Unauthorized');
      // User role must be one of the explicitly allowed roles for this endpoint.
      if (!roles.includes(request.user.role)) throw forbidden('Forbidden resource');
    };
  });
};

function extractBearerToken(header: string | undefined): string | null {
  // Only "Bearer <token>" is accepted; cookies or raw tokens are intentionally not accepted here.
  if (!header?.startsWith('Bearer ')) return null;
  // Trim prevents whitespace-only tokens from passing the prefix check.
  return header.slice(7).trim() || null;
}

// use of this export is:
// fastify-plugin keeps decorators available to later registered plugins and names the plugin for Fastify.
export const authPluginRegistration = fp(authPlugin, { name: 'auth-plugin' });
