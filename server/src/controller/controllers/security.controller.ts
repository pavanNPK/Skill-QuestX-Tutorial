/** Controller file: translates Fastify requests into service method calls and returns API DTOs. */
import type { FastifyReply } from 'fastify';

import { env } from '../../core/config/env';
import { csrfCookieOptions, issueCsrfToken } from '../../presentation/middlewares/csrf.middleware';

export class SecurityController {
  // use of this is:
  // Creates a CSRF token and sends it both as a cookie and JSON response.
  // The frontend can read the JSON token and send it in x-csrf-token for unsafe requests.
  async getCsrfToken(reply: FastifyReply) {
    // issueCsrfToken creates a random server-trustable token.
    const token = issueCsrfToken();
    // The cookie gives csrf.middleware.ts something to compare against the request header.
    reply.setCookie('sqx_csrf', token, csrfCookieOptions(env.nodeEnv));
    return { csrfToken: token };
  }
}

export const securityController = new SecurityController();
