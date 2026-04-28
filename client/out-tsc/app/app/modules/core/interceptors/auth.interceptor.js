import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
export const authInterceptor = (req, next) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const token = auth.getToken();
    if (token) {
        req = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
        });
    }
    return next(req).pipe(catchError((err) => {
        if (err.status === 401) {
            auth.logout();
            router.navigate(['/login']);
        }
        return throwError(() => err);
    }));
};
