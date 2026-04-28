import type { Request } from 'express';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  profileImageUrl?: string | null;
  canManageUsers?: boolean;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}
