import { CanActivateChildFn, CanActivateFn, CanMatchFn, UrlTree } from '@angular/router';


// Helper function to handle authentication checks with localStorage safety
const checkAuth = (url: string): boolean | UrlTree => {
  try {
    const token = localStorage.getItem('auth_token');
    return !!token;
  } catch {
    return false;
  }
}
// Protects main routes
export const authGuard: CanActivateFn = (route, state) => {
    console.log('Auth Guard checking:', state.url);
    return checkAuth(state.url);
  };

// Protects child routes
export const authChildGuard: CanActivateChildFn = (childRoute, state) => {
    return checkAuth(state.url);
  };
  
  // Prevents unauthorized module loading
  export const authLoadGuard: CanMatchFn = (route, segments) => {
    const url = `/${segments.map(s => s.path).join('/')}`;
    console.log('Auth Load Guard checking:', url);
    // Skip auth check for public routes
    if (url === '/login' || url === '/register' || url === '/reset-password' || url === '/access-denied' || url === '/privacy-policy' || url === '/terms-and-conditions') {
      return true;
    }
    return checkAuth(url);
  };
