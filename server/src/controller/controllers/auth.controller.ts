/** Controller file: translates Fastify requests into service method calls and returns API DTOs. */
import type { FastifyRequest } from 'fastify';

import { services } from '../../business/services';
import type { AuthenticatedRequest } from '../../core/types/fastify-auth';
import { appCache } from '../../core/cache/app-cache';

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
    const result = await services.authService.createUser(request.body as any, (request as AuthenticatedRequest).user);
    await this.invalidateUserAdminCaches();
    return result;
  }

  // use of this is:
  // Changes the logged-in user's password after checking the current password.
  async changePassword(request: FastifyRequest) {
    // currentPassword is needed for re-authentication; newPassword is saved only after hashing.
    const body = request.body as any;
    const userId = (request as AuthenticatedRequest).user.id;
    const result = await services.authService.changePassword(userId, body.currentPassword, body.newPassword);
    await appCache.delete(`auth:user:${userId}`);
    return result;
  }

  // use of this is:
  // Updates profile fields that a normal user is allowed to edit from the UI.
  async updateProfile(request: FastifyRequest) {
    // We pick allowed fields explicitly so clients cannot mass-assign protected fields like role/isActive.
    const body = request.body as any;
    const userId = (request as AuthenticatedRequest).user.id;
    const user = await services.authService.updateProfile(userId, {
      firstName: body.firstName,
      lastName: body.lastName,
      displayName: body.displayName,
      phoneNumber: body.phoneNumber,
      dateOfBirth: body.dateOfBirth,
      nationality: body.nationality,
      address: body.address,
      profileImageUrl: body.profileImageUrl,
      coverImageUrl: body.coverImageUrl,
    });
    await appCache.delete(`auth:user:${userId}`);
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
      displayName: u.displayName ?? null,
      name: u.displayName || `${u.firstName} ${u.lastName}`.trim(),
      role: u.role ?? 'student',
      profileImageUrl: u.profileImageUrl ?? null,
      coverImageUrl: u.coverImageUrl ?? null,
      phoneNumber: u.phoneNumber ?? null,
      dateOfBirth: u.dateOfBirth ?? null,
      nationality: u.nationality ?? null,
      address: u.address ?? null,
    };
    // canManageUsers is only meaningful for admin users, so omit it for all other roles.
    if (u.role === 'admin' && u.canManageUsers === true) user.canManageUsers = true;
    return { user };
  }

  // use of this is:
  // Lists courses that admins can assign while creating/updating users.
  async listCourses() {
    // No request object is needed because role access was already checked in the route.
    return appCache.getOrSet('auth:courses:list', 15000, () => services.authService.listCourses());
  }

  // use of this is:
  // Creates a course from the admin user-management workflow.
  async createCourse(request: FastifyRequest) {
    // Trim avoids saving whitespace-only course names; fallback keeps the old UI behavior.
    const body = request.body as any;
    const result = await services.authService.createCourse(body.name?.trim() || 'New Course', (request as AuthenticatedRequest).user);
    await Promise.all([
      appCache.delete('auth:courses:list'),
      appCache.delete('courses:list:public'),
      appCache.deleteByPrefix('course-content:available:'),
      this.invalidateUserAdminCaches(),
    ]);
    return result;
  }

  // use of this is:
  // Lists users visible to the logged-in admin/super-admin.
  async listUsers(request: FastifyRequest) {
    // Service applies role-specific filtering, so the controller does not leak all users by mistake.
    const user = (request as AuthenticatedRequest).user;
    return appCache.getOrSet(`auth:users:list:${user.id}:${user.role}`, 10000, () => services.authService.listUsers(user));
  }

  // use of this is:
  // Activates or deactivates another user from the admin screen.
  async setUserStatus(request: FastifyRequest) {
    // params.id comes from /users/:id/status and is validated by setUserStatusSchema.
    const params = request.params as { id: string };
    // Only exact true activates; every other valid boolean value deactivates.
    const body = request.body as any;
    const result = await services.authService.setUserStatus(params.id, body.active === true, (request as AuthenticatedRequest).user);
    await Promise.all([
      appCache.delete(`auth:user:${params.id}`),
      this.invalidateUserAdminCaches(),
    ]);
    return result;
  }

  // use of this is:
  // Grants or removes the admin-head permission, which only super admins can change.
  async setHeadPermission(request: FastifyRequest) {
    // params.id chooses the target admin; body.head is the requested permission state.
    const params = request.params as { id: string };
    const body = request.body as any;
    const result = await services.authService.setHeadPermission(params.id, body.head === true, (request as AuthenticatedRequest).user);
    await Promise.all([
      appCache.delete(`auth:user:${params.id}`),
      this.invalidateUserAdminCaches(),
    ]);
    return result;
  }

  private async invalidateUserAdminCaches(): Promise<void> {
    await Promise.all([
      appCache.deleteByPrefix('auth:users:list:'),
      appCache.deleteByPrefix('course-content:available:'),
    ]);
  }
}

export const authController = new AuthController();
