/** Middleware file: registers Fastify hooks and decorators that run before route handlers. */
import { randomBytes, timingSafeEqual } from 'crypto';
import fp = require('fastify-plugin');
import type { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { forbidden } from '../../core/utils/http-error';

const csrfCookieName = 'sqx_csrf';
const csrfHeaderName = 'x-csrf-token';
const safeMethods = new Set(['GET', 'HEAD', 'OPTIONS']);

const csrfPlugin: FastifyPluginAsync = async (app) => {
  // use of this hook is:
  // preHandler runs before controllers on every route after this plugin is registered.
  // Bearer-token API requests are not CSRF-prone because browsers do not attach bearer
  // tokens automatically. Cookie-authenticated unsafe requests must prove same-origin
  // access by echoing the CSRF cookie value in the x-csrf-token header.
  app.addHook('preHandler', async (request) => {
    // GET/HEAD/OPTIONS do not mutate state, so CSRF protection is not required.
    if (safeMethods.has(request.method)) return;
    // Authorization bearer token requests are protected by explicit JS-controlled headers.
    if (hasBearerToken(request)) return;
    // If there are no cookies, browser auto-credential CSRF is not in play.
    if (!request.headers.cookie) return;

    // Cookie token is issued by SecurityController.getCsrfToken.
    const cookieToken = request.cookies[csrfCookieName];
    // Header token is sent by the frontend for unsafe cookie-authenticated requests.
    const headerToken = request.headers[csrfHeaderName];
    // Fastify headers can be string or string[]; use the first value if multiple are sent.
    const candidate = Array.isArray(headerToken) ? headerToken[0] : headerToken;

    // Both values must exist and match in constant time before the request can mutate data.
    if (!cookieToken || !candidate || !sameToken(cookieToken, candidate)) {
      throw forbidden('Invalid CSRF token');
    }
  });
};

// use of this is:
// Creates a random token that cannot be guessed by another site.
export function issueCsrfToken(): string {
  return randomBytes(32).toString('base64url');
}

// use of this is:
// Defines how the CSRF token cookie is stored in the browser.
export function csrfCookieOptions(nodeEnv: string) {
  return {
    // Cookie is valid for the whole API/site.
    path: '/',
    // Strict same-site policy blocks most cross-site cookie sending.
    sameSite: 'strict' as const,
    // Production cookies must travel only over HTTPS.
    secure: nodeEnv === 'production',
    // httpOnly is false because the frontend must read and echo the token header.
    httpOnly: false,
  };
}

function hasBearerToken(request: FastifyRequest): boolean {
  // Bearer presence means this API request is authenticated through Authorization header.
  return request.headers.authorization?.startsWith('Bearer ') === true;
}

function sameToken(a: string, b: string): boolean {
  // Convert to buffers so timingSafeEqual can compare without leaking mismatch position.
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  // timingSafeEqual requires equal length buffers.
  return left.length === right.length && timingSafeEqual(left, right);
}

// use of this export is:
// Registers the CSRF preHandler as a named Fastify plugin in build-app.ts.
export const csrfPluginRegistration = fp(csrfPlugin, { name: 'csrf-plugin' });
