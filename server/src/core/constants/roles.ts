/** Core constants file: keeps shared immutable values in one place instead of scattering magic strings. */
export const ROLES = {
  // Highest platform role with full administrative permission.
  SUPER_ADMIN: 'super_admin',
  // Admin role for operational user/course management.
  ADMIN: 'admin',
  // Instructor role for course/exam/task management.
  INSTRUCTOR: 'instructor',
  // Student role for learning and submissions.
  STUDENT: 'student',
} as const;

// use of this is:
// Role type stays in sync with ROLES values without repeating string unions manually.
export type Role = (typeof ROLES)[keyof typeof ROLES];

// use of this is:
// Defines roles that can be created through registration/admin flows.
export const REGISTRABLE_ROLES: Role[] = [ROLES.ADMIN, ROLES.INSTRUCTOR, ROLES.STUDENT];

// use of this is:
// Small guard for validating arbitrary role strings before saving users.
export function isRegistrableRole(role: string): boolean {
  return REGISTRABLE_ROLES.includes(role as Role);
}
