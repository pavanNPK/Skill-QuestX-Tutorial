// use of this file is:
// Shared guard file. It protects routes using app state and role/session rules.
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

// use of this is:
// Allow only Super Admin and Admin users to access user-management routes.
// Instructors can use other app areas but should not load the Users feature.
export const usersPageGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.canAccessUsersPage()) {
    return true;
  }
  return router.createUrlTree(['/access-denied']);
};
