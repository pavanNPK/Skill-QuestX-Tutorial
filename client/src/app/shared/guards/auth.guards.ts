// use of this file is:
// Shared guard file. It protects routes using app state and role/session rules.
import { CanActivateChildFn, CanActivateFn, CanMatchFn, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStore } from '../../core/auth/auth.store';


// use of this is:
// Shared auth check used by canActivate, canActivateChild, and canMatch.
const checkAuth = (url: string): boolean | UrlTree => {
  const authStore = inject(AuthStore);
  return authStore.isAuthenticated();
}

// use of this is:
// Protects the already-matched app shell route.
export const authGuard: CanActivateFn = (route, state) => {
    return checkAuth(state.url);
  };

// use of this is:
// Protects child routes under the app shell.
export const authChildGuard: CanActivateChildFn = (childRoute, state) => {
    return checkAuth(state.url);
  };
  
  // use of this is:
  // Prevents protected lazy feature bundles from loading for anonymous users.
  export const authLoadGuard: CanMatchFn = (route, segments) => {
    const url = `/${segments.map(s => s.path).join('/')}`;
    // Public routes can match without session state.
    if (url === '/login' || url === '/register' || url === '/reset-password' || url === '/access-denied' || url === '/privacy-policy' || url === '/terms-and-conditions') {
      return true;
    }
    return checkAuth(url);
  };
