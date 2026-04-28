import { Router } from 'express';
import { authenticate, requireRoles } from '../middleware/auth.middleware';
import { asyncHandler } from '../middleware/async-handler';
import { services } from '../services';
import type { AuthRequest } from '../types/request';

export function authRoutes(): Router {
  const router = Router();
  const auth = services.authService;

  router.post('/login', asyncHandler(async (req, res) => res.json(await auth.login(req.body))));
  router.post('/register', asyncHandler(async (req, res) => res.json(await auth.register(req.body))));
  router.post('/send-otp', asyncHandler(async (req, res) => res.json(await auth.sendOtp(req.body.email))));
  router.post('/verify-otp', asyncHandler(async (req, res) => res.json(await auth.verifyOtp(req.body.email, req.body.otp))));
  router.post('/forgot-password/send-otp', asyncHandler(async (req, res) => res.json(await auth.sendOtpForForgotPassword(req.body.email))));
  router.post('/forgot-password/reset', asyncHandler(async (req, res) => res.json(await auth.resetPassword(req.body.email, req.body.otp, req.body.newPassword))));
  router.post('/set-password', asyncHandler(async (req, res) => res.json(await auth.setPassword(req.body.token, req.body.newPassword))));

  router.post('/create-user', authenticate, requireRoles('super_admin', 'admin'), asyncHandler(async (req: AuthRequest, res) => {
    res.json(await auth.createUser(req.body, req.user!));
  }));

  router.patch('/change-password', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    res.json(await auth.changePassword(req.user!.id, req.body.currentPassword, req.body.newPassword));
  }));

  router.patch('/profile', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    const user = await auth.updateProfile(req.user!.id, { firstName: req.body.firstName, lastName: req.body.lastName });
    res.json({ user });
  }));

  router.get('/me', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    const u = req.user!;
    const user: Record<string, unknown> = {
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      name: `${u.firstName} ${u.lastName}`.trim(),
      role: u.role ?? 'student',
      profileImageUrl: u.profileImageUrl ?? null,
    };
    if (u.role === 'admin' && u.canManageUsers === true) user.canManageUsers = true;
    res.json({ user });
  }));

  router.get('/courses', authenticate, requireRoles('super_admin', 'admin'), asyncHandler(async (_req, res) => {
    res.json(await auth.listCourses());
  }));

  router.post('/courses', authenticate, requireRoles('super_admin', 'admin'), asyncHandler(async (req: AuthRequest, res) => {
    res.json(await auth.createCourse(req.body.name?.trim() || 'New Course', req.user!));
  }));

  router.get('/users', authenticate, requireRoles('super_admin', 'admin'), asyncHandler(async (req: AuthRequest, res) => {
    res.json(await auth.listUsers(req.user!));
  }));

  router.patch('/users/:id/status', authenticate, requireRoles('super_admin', 'admin'), asyncHandler(async (req: AuthRequest, res) => {
    res.json(await auth.setUserStatus(String(req.params.id), req.body.active === true, req.user!));
  }));

  router.patch('/users/:id/head', authenticate, requireRoles('super_admin'), asyncHandler(async (req: AuthRequest, res) => {
    res.json(await auth.setHeadPermission(String(req.params.id), req.body.head === true, req.user!));
  }));

  return router;
}
