import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../modules/core/services/auth.service';

/** Allow only SA, Admin, or Instructor to access the Users page. */
export const usersPageGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.canAccessUsersPage()) {
    return true;
  }
  return router.createUrlTree(['/access-denied']);
};
