import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

import { AuthResult, AuthUser } from '../services/auth.service';

type AuthStatus = 'anonymous' | 'authenticated';

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  status: AuthStatus;
}

const tokenKey = 'auth_token';
const userKey = 'auth_user';

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(userKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

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
    isAuthenticated: computed(() => !!store.token()),
    role: computed(() => store.user()?.role ?? null),
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
    canAccessUsersPage: computed(() => {
      const role = store.user()?.role;
      return role === 'super_admin' || role === 'admin';
    }),
    canDoUserCUD: computed(() => {
      const user = store.user();
      return user?.role === 'super_admin' || (user?.role === 'admin' && user?.canManageUsers === true);
    }),
    canManageCourseContent: computed(() => {
      const role = store.user()?.role;
      return role === 'super_admin' || role === 'admin' || role === 'instructor';
    }),
    showNavBeyondSaAdmin: computed(() => {
      const role = store.user()?.role;
      return role === 'instructor' || role === 'student';
    }),
  })),
  withMethods((store) => ({
    setSession(result: AuthResult): void {
      localStorage.setItem(tokenKey, result.access_token);
      localStorage.setItem(userKey, JSON.stringify(result.user));
      patchState(store, {
        token: result.access_token,
        user: result.user,
        status: 'authenticated',
      });
    },
    setUser(user: AuthUser): void {
      localStorage.setItem(userKey, JSON.stringify(user));
      patchState(store, { user, status: store.token() ? 'authenticated' : store.status() });
    },
    clearSession(): void {
      localStorage.removeItem(tokenKey);
      localStorage.removeItem(userKey);
      patchState(store, { token: null, user: null, status: 'anonymous' });
    },
  })),
);
