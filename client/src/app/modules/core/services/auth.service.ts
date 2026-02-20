import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneCountry?: string;
  phoneNumber?: string;
  underGraduate?: string;
  /** Base64 data URL of compressed profile image */
  profileImageUrl?: string;
  /** URL path to uploaded resume (from /upload/resume endpoint) */
  resumeUrl?: string;
  skills?: string[];
}

export interface UploadResumeResponse {
  message: string;
  filename: string;
  url: string;
  size: number;
}

/** SA/A only: add Admin or Instructor. Omit password to send set-password email. */
export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  /** Optional. If omitted, user gets set-password email and must set password before login. */
  password?: string;
  role: 'admin' | 'instructor';
  phoneCountry?: string;
  phoneNumber?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  role: string;
}

/** Public registration is for students only. For Add User (SA/A) use this dropdown: Admin, Instructor. */
export const ADD_USER_ROLES = [
  { value: 'admin', label: 'Admin' },
  { value: 'instructor', label: 'Instructor' },
] as const;

export interface AuthResult {
  access_token: string;
  user: AuthUser;
}

export type CreateUserResult = AuthResult | { message: string; user: AuthUser };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly apiUrl = environment.apiUrl;
  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'auth_user';

  readonly currentUser = signal<AuthUser | null>(this.getStoredUser());

  private getStoredUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem(this.userKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /** True for Super Admin and Admin (can access Add Users). */
  canAccessAddUsers(): boolean {
    const role = this.currentUser()?.role;
    return role === 'super_admin' || role === 'admin';
  }

  /** Human-readable role for UI. */
  roleLabel(): string {
    const role = this.currentUser()?.role;
    if (!role) return 'User';
    const map: Record<string, string> = {
      super_admin: 'Super Admin',
      admin: 'Admin',
      instructor: 'Instructor',
      student: 'Student',
    };
    return map[role] ?? role;
  }

  /** Returns roles the current user can add (SA: Admin + Instructor; Admin: Instructor only). */
  getAddableRoles(): Array<{ value: string; label: string }> {
    const role = this.currentUser()?.role;
    if (role === 'super_admin') {
      return [
        { value: 'admin', label: 'Admin' },
        { value: 'instructor', label: 'Instructor' },
      ];
    }
    if (role === 'admin') {
      return [{ value: 'instructor', label: 'Instructor' }];
    }
    return [];
  }

  /** Check if current user is Super Admin. */
  isSuperAdmin(): boolean {
    return this.currentUser()?.role === 'super_admin';
  }

  /** Check if current user is Admin. */
  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }

  login(body: LoginRequest): Observable<AuthResult> {
    return this.http.post<AuthResult>(`${this.apiUrl}/auth/login`, body).pipe(
      tap((res) => {
        localStorage.setItem(this.tokenKey, res.access_token);
        localStorage.setItem(this.userKey, JSON.stringify(res.user));
        this.currentUser.set(res.user);
      })
    );
  }

  register(body: RegisterRequest): Observable<AuthResult> {
    return this.http.post<AuthResult>(`${this.apiUrl}/auth/register`, body).pipe(
      tap((res) => {
        localStorage.setItem(this.tokenKey, res.access_token);
        localStorage.setItem(this.userKey, JSON.stringify(res.user));
        this.currentUser.set(res.user);
      })
    );
  }

  /** SA or Admin only: create Admin or Instructor. Omit password to send set-password email. */
  createUser(body: CreateUserRequest): Observable<CreateUserResult> {
    return this.http.post<CreateUserResult>(`${this.apiUrl}/auth/create-user`, body);
  }

  /** SA or Admin only: list Admins and Instructors. */
  listUsers(): Observable<{ users: AuthUser[] }> {
    return this.http.get<{ users: AuthUser[] }>(`${this.apiUrl}/auth/users`);
  }

  /** Set password using token from invite email (no auth). */
  setPassword(token: string, newPassword: string): Observable<{ message: string; user: AuthUser }> {
    return this.http.post<{ message: string; user: AuthUser }>(`${this.apiUrl}/auth/set-password`, {
      token,
      newPassword,
    });
  }

  sendOtp(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/auth/send-otp`, { email });
  }

  verifyOtp(email: string, otp: string): Observable<{ valid: boolean }> {
    return this.http.post<{ valid: boolean }>(`${this.apiUrl}/auth/verify-otp`, { email, otp });
  }

  /** Forgot password: send OTP only if account exists. Returns message and sent flag. */
  forgotPasswordSendOtp(email: string): Observable<{ message: string; sent: boolean }> {
    return this.http.post<{ message: string; sent: boolean }>(`${this.apiUrl}/auth/forgot-password/send-otp`, { email });
  }

  /** Reset password after OTP verified. */
  resetPassword(email: string, otp: string, newPassword: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/auth/forgot-password/reset`, {
      email,
      otp,
      newPassword,
    });
  }

  /** Validate JWT and refresh current user from server. Call on app init when token exists. */
  getMe(): Observable<AuthUser> {
    return this.http.get<{ user: AuthUser }>(`${this.apiUrl}/auth/me`).pipe(
      tap((res) => {
        this.currentUser.set(res.user);
        localStorage.setItem(this.userKey, JSON.stringify(res.user));
      }),
      map((res) => res.user)
    );
  }

  /** Upload resume file and get URL. Public endpoint (for registration). */
  uploadResume(file: File): Observable<UploadResumeResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadResumeResponse>(`${this.apiUrl}/upload/resume`, formData);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
