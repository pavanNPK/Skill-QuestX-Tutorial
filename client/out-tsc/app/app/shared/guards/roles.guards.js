import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/core/services/auth.service';
/** Allow only SA and Admin to access the Users page. Instructor sees all other screens but not Users. */
export const usersPageGuard = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if (auth.canAccessUsersPage()) {
        return true;
    }
    return router.createUrlTree(['/access-denied']);
};
