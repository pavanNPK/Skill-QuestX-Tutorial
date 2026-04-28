import type { NextFunction, Response } from 'express';
import jwt = require('jsonwebtoken');
import { env } from '../config/env';
import type { AuthRequest } from '../types/request';
import { forbidden, unauthorized } from '../utils/http-error';
import { services } from '../services';

interface JwtPayload {
  sub: string;
  email: string;
}

export async function authenticate(req: AuthRequest, _res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) throw unauthorized('Unauthorized');

    const payload = jwt.verify(token, env.jwtSecret) as JwtPayload;
    const user = await services.userService.findById(payload.sub);
    if (!user) throw unauthorized('Unauthorized');
    if (user.isActive === false) throw unauthorized('Your account has been deactivated. Please contact your administrator to reactivate your account.');

    req.user = {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role ?? 'student',
      profileImageUrl: user.profileImageUrl ?? null,
      canManageUsers: user.role === 'admin' && user.canManageUsers === true ? true : undefined,
    };
    next();
  } catch (error) {
    next(error);
  }
}

export function requireRoles(...roles: string[]) {
  return (req: AuthRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) return next(unauthorized('Unauthorized'));
    if (!roles.includes(req.user.role)) return next(forbidden('Forbidden resource'));
    next();
  };
}
