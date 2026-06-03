/** Core type file: defines shared TypeScript contracts used across routes, controllers, middleware, and services. */
export interface AuthUser {
  // Mongo user id as a string so controllers do not depend on Mongoose ObjectId.
  id: string;
  // Email from the authenticated account.
  email: string;
  // First name shown in UI/session response.
  firstName: string;
  // Last name shown in UI/session response.
  lastName: string;
  // Role controls route authorization and UI permissions.
  role: string;
  // Optional profile image URL shown by Angular.
  profileImageUrl?: string | null;
  // Optional admin-head permission used only for admin users.
  canManageUsers?: boolean;
}
