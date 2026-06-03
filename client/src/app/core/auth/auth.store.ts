// use of this file is:
// Core auth store file. It owns session state used by guards, interceptors, and navigation.
import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

import { AuthResult, AuthUser } from '../services/auth.service';

type AuthStatus = 'anonymous' | 'authenticated';

// use of this is:
// Shape of the auth store. Token is used by interceptors, user is used by UI/guards, and status keeps auth state explicit.
interface AuthState {
  token: string | null;
  user: AuthUser | null;
  status: AuthStatus;
}

// use of this is:
// Storage keys are kept in one place so login/logout/read logic always touches the same browser storage entries.
const tokenKey = 'auth_token';
const userKey = 'auth_user';

// use of this is:
// Reads the saved user safely from localStorage; if stored JSON is broken we return null instead of crashing startup.
function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(userKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// use of this is:
// Builds initial store state from localStorage so page refresh keeps the current session when a token exists.
function readInitialState(): AuthState {
  const token = localStorage.getItem(tokenKey);
  const user = readStoredUser();

  return {
    token,
    user,
    status: token ? 'authenticated' : 'anonymous',
  };
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(readInitialState()),
  withComputed((store) => ({
    // use of this is:
    // Guards and templates use this boolean instead of checking token null values everywhere.
    isAuthenticated: computed(() => !!store.token()),

    // use of this is:
    // Gives route guards and menus the current role as a simple signal.
    role: computed(() => store.user()?.role ?? null),

    // use of this is:
    // Converts backend role keys into readable labels for the header/sidebar.
    roleLabel: computed(() => {
      const role = store.user()?.role;
      if (!role) return 'User';

      const labels: Record<string, string> = {
        super_admin: 'Super Admin',
        admin: 'Admin',
        instructor: 'Instructor',
        student: 'Student',
      };

      return labels[role] ?? role;
    }),

    // use of this is:
    // Controls whether the Users page is visible for roles allowed to view user management.
    canAccessUsersPage: computed(() => {
      const role = store.user()?.role;
      return role === 'super_admin' || role === 'admin';
    }),

    // use of this is:
    // Separates user create/update/delete permission from general users-page visibility.
    canDoUserCUD: computed(() => {
      const user = store.user();
      return user?.role === 'super_admin' || (user?.role === 'admin' && user?.canManageUsers === true);
    }),

    // use of this is:
    // Course builder/material management is allowed only for admin-level and instructor users.
    canManageCourseContent: computed(() => {
      const role = store.user()?.role;
      return role === 'super_admin' || role === 'admin' || role === 'instructor';
    }),

    // use of this is:
    // Hides learner/instructor navigation sections from super/admin shells when needed.
    showNavBeyondSaAdmin: computed(() => {
      const role = store.user()?.role;
      return role === 'instructor' || role === 'student';
    }),
  })),
  withMethods((store) => ({
    // use of this is:
    // Saves a successful login response in localStorage and updates all auth signals immediately.
    setSession(result: AuthResult): void {
      localStorage.setItem(tokenKey, result.access_token);
      localStorage.setItem(userKey, JSON.stringify(result.user));
      patchState(store, {
        token: result.access_token,
        user: result.user,
        status: 'authenticated',
      });
    },

    // use of this is:
    // Updates the logged-in user profile/permissions without replacing the access token.
    setUser(user: AuthUser): void {
      localStorage.setItem(userKey, JSON.stringify(user));
      patchState(store, { user, status: store.token() ? 'authenticated' : store.status() });
    },

    // use of this is:
    // Clears browser session data and moves the app back to anonymous state during logout or auth failure.
    clearSession(): void {
      localStorage.removeItem(tokenKey);
      localStorage.removeItem(userKey);
      patchState(store, { token: null, user: null, status: 'anonymous' });
    },
  })),
);
