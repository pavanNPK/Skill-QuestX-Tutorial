export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  INSTRUCTOR: 'instructor',
  STUDENT: 'student',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const REGISTRABLE_ROLES: Role[] = [ROLES.ADMIN, ROLES.INSTRUCTOR, ROLES.STUDENT];

export function isRegistrableRole(role: string): boolean {
  return REGISTRABLE_ROLES.includes(role as Role);
}
