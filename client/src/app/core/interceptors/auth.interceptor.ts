// use of this file is:
// Core interceptor file. It runs on HTTP requests/responses before feature code receives them.
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  // use of this is:
  // Attach JWT to API requests and clear the session when the backend returns 401.
  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.getToken();
  if (token) {
    // clone is required because Angular HttpRequest is immutable.
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        // Backend says token/session is invalid, so clear local state and send user to login.
        auth.logout();
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
