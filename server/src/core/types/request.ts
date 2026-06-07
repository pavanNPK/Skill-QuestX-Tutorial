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
  displayName?: string | null;
  // Role controls route authorization and UI permissions.
  role: string;
  // Optional profile image URL shown by Angular.
  profileImageUrl?: string | null;
  coverImageUrl?: string | null;
  phoneNumber?: string | null;
  dateOfBirth?: string | null;
  nationality?: string | null;
  address?: string | null;
  // Optional admin-head permission used only for admin users.
  canManageUsers?: boolean;
}
