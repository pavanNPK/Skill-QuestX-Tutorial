/** Route file: declares URL, HTTP method, preHandler auth hooks, DTO schema validation, and controller handler. */
import type { FastifyPluginAsync } from 'fastify';

import { authController } from '../../controller/controllers/auth.controller';
import {
  changePasswordSchema,
  createCourseSchema,
  createUserSchema,
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  setHeadPermissionSchema,
  setPasswordSchema,
  setUserStatusSchema,
  updateProfileSchema,
  verifyOtpSchema,
} from '../dto/auth.schemas';

export const authRoutes: FastifyPluginAsync = async (app) => {
  // Auth endpoints are sensitive, so this route-level rate limit is tighter than the global API limit.
  const sensitiveRateLimit = { max: 10, timeWindow: '1 minute' };

  // use of these public routes is:
  // schema comes from dto/auth.schemas.ts and Fastify validates request body before controller runs.
  // config.rateLimit protects OTP/login/reset endpoints from brute-force and spam attempts.
  // There is no preHandler because these flows happen before the user has a JWT.
  app.post('/login', { config: { rateLimit: sensitiveRateLimit }, schema: loginSchema }, authController.login);
  app.post('/register', { config: { rateLimit: sensitiveRateLimit }, schema: registerSchema }, authController.register);
  app.post('/send-otp', { config: { rateLimit: sensitiveRateLimit }, schema: emailSchema }, authController.sendOtp);
  app.post('/verify-otp', { config: { rateLimit: sensitiveRateLimit }, schema: verifyOtpSchema }, authController.verifyOtp);
  app.post('/forgot-password/send-otp', { config: { rateLimit: sensitiveRateLimit }, schema: emailSchema }, authController.forgotPasswordSendOtp);
  app.post('/forgot-password/reset', { config: { rateLimit: sensitiveRateLimit }, schema: resetPasswordSchema }, authController.resetPassword);
  app.post('/set-password', { config: { rateLimit: sensitiveRateLimit }, schema: setPasswordSchema }, authController.setPassword);

  // use of this route is:
  // Create staff/admin users from protected admin screens.
  // preHandler is Fastify's middleware hook: app.authenticate verifies JWT; app.requireRoles checks authorization.
  // schema validates the create-user body; handler calls AuthController.createUser.
  app.post('/create-user', {
    preHandler: [app.authenticate, app.requireRoles('super_admin', 'admin')],
    schema: createUserSchema,
    handler: authController.createUser,
  });

  // use of this route is:
  // Change the current user's password.
  // authenticate is required because the server needs request.user.id for the target account.
  app.patch('/change-password', {
    preHandler: [app.authenticate],
    schema: changePasswordSchema,
    handler: authController.changePassword,
  });

  // use of this route is:
  // Update only safe profile fields for the logged-in user.
  // updateProfileSchema rejects extra protected fields before the controller can see them.
  app.patch('/profile', {
    preHandler: [app.authenticate],
    schema: updateProfileSchema,
    handler: authController.updateProfile,
  });

  // use of this route is:
  // Return the current session user to Angular after page refresh.
  // No schema is needed because GET /me has no body or params.
  app.get('/me', {
    preHandler: [app.authenticate],
    handler: authController.me,
  });

  // use of this route is:
  // List courses that admins can assign while creating users.
  // requireRoles keeps this administrative lookup unavailable to students.
  app.get('/courses', {
    preHandler: [app.authenticate, app.requireRoles('super_admin', 'admin')],
    handler: authController.listCourses,
  });

  // use of this route is:
  // Create a course from the admin area.
  // createCourseSchema validates body.name before AuthController.createCourse runs.
  app.post('/courses', {
    preHandler: [app.authenticate, app.requireRoles('super_admin', 'admin')],
    schema: createCourseSchema,
    handler: authController.createCourse,
  });

  // use of this route is:
  // List users for admin management, scoped further inside AuthService by role.
  app.get('/users', {
    preHandler: [app.authenticate, app.requireRoles('super_admin', 'admin')],
    handler: authController.listUsers,
  });

  // use of this route is:
  // Activate/deactivate a user account.
  // schema validates both params.id and body.active before the controller runs.
  app.patch('/users/:id/status', {
    preHandler: [app.authenticate, app.requireRoles('super_admin', 'admin')],
    schema: setUserStatusSchema,
    handler: authController.setUserStatus,
  });

  // use of this route is:
  // Grant/revoke admin-head permission.
  // Only super_admin can call this because it changes elevated admin authority.
  app.patch('/users/:id/head', {
    preHandler: [app.authenticate, app.requireRoles('super_admin')],
    schema: setHeadPermissionSchema,
    handler: authController.setHeadPermission,
  });
};
