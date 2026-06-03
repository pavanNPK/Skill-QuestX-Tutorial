/** Controller file: translates Fastify requests into service method calls and returns API DTOs. */
import type { FastifyRequest } from 'fastify';

import { services } from '../../business/services';
import type { AuthenticatedRequest } from '../../core/types/fastify-auth';

export class AuthController {
  // use of this is:
  // Login is the controller method for POST /api/auth/login.
  // The route schema has already checked that body.email and body.password are valid strings.
  // The controller does not check passwords itself; it delegates that sensitive logic to AuthService.
  async login(request: FastifyRequest) {
    // request.body contains the validated login DTO sent by Angular.
    // Returning the service result lets Fastify serialize { token, user } as JSON.
    return services.authService.login(request.body as any);
  }

  // use of this is:
  // Register creates a normal student account from the public registration form.
  // AuthService owns duplicate-email checks, OTP verification rules, hashing, and token issuing.
  async register(request: FastifyRequest) {
    // request.body is already size-limited and validated by registerSchema in auth.routes.ts.
    return services.authService.register(request.body as any);
  }

  // use of this is:
  // Sends an OTP email for flows where the frontend needs to prove email ownership.
  async sendOtp(request: FastifyRequest) {
    // We pass only the email instead of the full body because the service only needs one value here.
    return services.authService.sendOtp((request.body as any).email);
  }

  // use of this is:
  // Verifies that the OTP belongs to the email and is not expired.
  // This endpoint only validates the OTP; password changes happen in resetPassword().
  async verifyOtp(request: FastifyRequest) {
    // body is narrowed locally so each value used by the service is clear.
    const body = request.body as any;
    return services.authService.verifyOtp(body.email, body.otp);
  }

  // use of this is:
  // Sends a forgot-password OTP after AuthService verifies the account exists and can reset password.
  async forgotPasswordSendOtp(request: FastifyRequest) {
    // Keeping the controller thin prevents account-state rules from being duplicated in routes.
    return services.authService.sendOtpForForgotPassword((request.body as any).email);
  }

  // use of this is:
  // Resets the password after validating email + OTP + new password through the service.
  async resetPassword(request: FastifyRequest) {
    // These three fields are validated by resetPasswordSchema before the handler is called.
    const body = request.body as any;
    return services.authService.resetPassword(body.email, body.otp, body.newPassword);
  }

  // use of this is:
  // Lets invited admin/instructor users set their password from a one-time email token.
  async setPassword(request: FastifyRequest) {
    // token proves the invite; newPassword is hashed inside AuthService, never in the controller.
    const body = request.body as any;
    return services.authService.setPassword(body.token, body.newPassword);
  }

  // use of this is:
  // Creates an admin/instructor account from the admin panel.
  // The route preHandler runs app.authenticate and app.requireRoles before this method.
  async createUser(request: FastifyRequest) {
    // request.user comes from auth.middleware.ts after JWT verification.
    // AuthService uses it to decide whether this creator can create the requested role.
    return services.authService.createUser(request.body as any, (request as AuthenticatedRequest).user);
  }

  // use of this is:
  // Changes the logged-in user's password after checking the current password.
  async changePassword(request: FastifyRequest) {
    // currentPassword is needed for re-authentication; newPassword is saved only after hashing.
    const body = request.body as any;
    return services.authService.changePassword((request as AuthenticatedRequest).user.id, body.currentPassword, body.newPassword);
  }

  // use of this is:
  // Updates profile fields that a normal user is allowed to edit from the UI.
  async updateProfile(request: FastifyRequest) {
    // We pick allowed fields explicitly so clients cannot mass-assign protected fields like role/isActive.
    const body = request.body as any;
    const user = await services.authService.updateProfile((request as AuthenticatedRequest).user.id, {
      firstName: body.firstName,
      lastName: body.lastName,
    });
    // API response keeps the existing Angular contract: { user: ... }.
    return { user };
  }

  // use of this is:
  // Returns the current authenticated user without exposing the full Mongo user document.
  async me(request: FastifyRequest) {
    // request.user is a safe JWT-derived object created by app.authenticate.
    const u = (request as AuthenticatedRequest).user;
    // Only send fields the frontend needs; never return password hashes or reset tokens.
    const user: Record<string, unknown> = {
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      name: `${u.firstName} ${u.lastName}`.trim(),
      role: u.role ?? 'student',
      profileImageUrl: u.profileImageUrl ?? null,
    };
    // canManageUsers is only meaningful for admin users, so omit it for all other roles.
    if (u.role === 'admin' && u.canManageUsers === true) user.canManageUsers = true;
    return { user };
  }

  // use of this is:
  // Lists courses that admins can assign while creating/updating users.
  async listCourses() {
    // No request object is needed because role access was already checked in the route.
    return services.authService.listCourses();
  }

  // use of this is:
  // Creates a course from the admin user-management workflow.
  async createCourse(request: FastifyRequest) {
    // Trim avoids saving whitespace-only course names; fallback keeps the old UI behavior.
    const body = request.body as any;
    return services.authService.createCourse(body.name?.trim() || 'New Course', (request as AuthenticatedRequest).user);
  }

  // use of this is:
  // Lists users visible to the logged-in admin/super-admin.
  async listUsers(request: FastifyRequest) {
    // Service applies role-specific filtering, so the controller does not leak all users by mistake.
    return services.authService.listUsers((request as AuthenticatedRequest).user);
  }

  // use of this is:
  // Activates or deactivates another user from the admin screen.
  async setUserStatus(request: FastifyRequest) {
    // params.id comes from /users/:id/status and is validated by setUserStatusSchema.
    const params = request.params as { id: string };
    // Only exact true activates; every other valid boolean value deactivates.
    const body = request.body as any;
    return services.authService.setUserStatus(params.id, body.active === true, (request as AuthenticatedRequest).user);
  }

  // use of this is:
  // Grants or removes the admin-head permission, which only super admins can change.
  async setHeadPermission(request: FastifyRequest) {
    // params.id chooses the target admin; body.head is the requested permission state.
    const params = request.params as { id: string };
    const body = request.body as any;
    return services.authService.setHeadPermission(params.id, body.head === true, (request as AuthenticatedRequest).user);
  }
}

export const authController = new AuthController();
