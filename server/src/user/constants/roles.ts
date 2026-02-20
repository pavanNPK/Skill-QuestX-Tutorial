/** Role values stored in DB. Super Admin (SA) is created by script only, not via API. */
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  INSTRUCTOR: 'instructor',
  STUDENT: 'student',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

/** Roles allowed in registration (public = student only) and in create-user by SA/A (admin, instructor). */
export const REGISTRABLE_ROLES: Role[] = [ROLES.ADMIN, ROLES.INSTRUCTOR, ROLES.STUDENT];

/** Roles that SA/A can create via create-user. Students use public /register only. */
export const CREATABLE_BY_SA_ROLES: Role[] = [ROLES.ADMIN, ROLES.INSTRUCTOR];

export function isRegistrableRole(role: string): boolean {
  return REGISTRABLE_ROLES.includes(role as Role);
}
