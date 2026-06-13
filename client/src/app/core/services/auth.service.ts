// use of this file is:
// Core service file. It provides app-wide API/state helpers shared by multiple features.
import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, finalize, map, shareReplay, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthStore } from '../auth/auth.store';

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

/** Course option for assigning instructor (Add User). */
export interface CourseOption {
  id: string;
  name: string;
}

/** Full course for Popular Courses list (from GET /courses). */
export interface CourseForDisplay {
  id: string;
  name: string;
  title?: string;
  description: string;
  author: string;
  createdBy?: string | null;
  price: number;
  discount: number;
  ratingAverage: number;
  ratingCount: number;
  thumbnail: string;
  accentColor: string;
  unavailable?: boolean;
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
  /** When role is instructor, course IDs to assign (enroll SA-selected courses). */
  courseIds?: string[];
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName?: string | null;
  name: string;
  role: string;
  isActive?: boolean;
  phoneNumber?: string | null;
  dateOfBirth?: string | null;
  nationality?: string | null;
  address?: string | null;
  /** When set, show this image as avatar; otherwise show initials. */
  profileImageUrl?: string | null;
  /** Optional cover image shown on the profile settings hero. */
  coverImageUrl?: string | null;
  /** For role=admin: true when SA has granted head permission (can add users and set status). */
  canManageUsers?: boolean;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  nationality?: string;
  address?: string;
  profileImageUrl?: string;
  coverImageUrl?: string;
}

/** Instructor with course/batch counts (Admin & SA views). */
export interface InstructorWithStats extends AuthUser {
  courseCount: number;
  batchCount: number;
}

/** Batch with students (SA view). */
export interface BatchWithStudents {
  batchId: string;
  batchName: string;
  courseName: string;
  students: AuthUser[];
}

/** Course with batches (SA view). */
export interface CourseWithBatches {
  courseId: string;
  courseName: string;
  batches: BatchWithStudents[];
}

/** Role-based users list response. */
export type ListUsersResponse =
  | { view: 'sa'; admins: AuthUser[]; instructors: InstructorWithStats[]; students: AuthUser[]; batchesByCourse: CourseWithBatches[] }
  | { view: 'admin'; instructors: InstructorWithStats[]; students: AuthUser[] }
  | { view: 'instructor'; students: AuthUser[] };

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
  private authStore = inject(AuthStore);
  private readonly apiUrl = environment.apiUrl;
  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'auth_user';
  private meRequest$?: Observable<AuthUser>;

  readonly currentUser = signal<AuthUser | null>(this.getStoredUser());

  // use of this is:
  // Reads the saved user from localStorage during app startup so the UI can render session state immediately.
  private getStoredUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem(this.userKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  // use of this is:
  // Returns JWT token used by auth.interceptor.ts to attach Authorization header.
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // use of this is:
  // Quick local check used by guards and UI before calling protected APIs.
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /** True for Super Admin and Admin (can add/invite users when SA grants head option). */
  canAccessAddUsers(): boolean {
    const role = this.currentUser()?.role;
    return role === 'super_admin' || role === 'admin';
  }

  /** True for SA and Admin only (can view Users page). Instructor sees all other screens but not Users. */
  canAccessUsersPage(): boolean {
    const role = this.currentUser()?.role;
    return role === 'super_admin' || role === 'admin';
  }

  /** True for SA, or for Admin when SA has granted head (canManageUsers). Enables Add User form and Activate/Deactivate. */
  canDoUserCUD(): boolean {
    const u = this.currentUser();
    return u?.role === 'super_admin' || (u?.role === 'admin' && u?.canManageUsers === true);
  }

  /** True for users allowed to manage course learning content. */
  canManageCourseContent(): boolean {
    const role = this.currentUser()?.role;
    return role === 'super_admin' || role === 'admin' || role === 'instructor';
  }

  /** SA & Admin see only Dashboard, Courses, Batches, Users. Instructor & Student see Materials, Classes, Tasks, Exams, Projects too. */
  showNavBeyondSaAdmin(): boolean {
    const role = this.currentUser()?.role;
    return role === 'instructor' || role === 'student';
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
    // use of this is:
    // Calls backend login, stores token/user locally, and syncs AuthStore for guards/navigation.
    return this.http.post<AuthResult>(`${this.apiUrl}/auth/login`, body).pipe(
      tap((res) => {
        localStorage.setItem(this.tokenKey, res.access_token);
        localStorage.setItem(this.userKey, JSON.stringify(res.user));
        this.currentUser.set(res.user);
        this.authStore.setSession(res);
      })
    );
  }

  register(body: RegisterRequest): Observable<AuthResult> {
    // use of this is:
    // Registers a student account and stores the returned session just like login().
    return this.http.post<AuthResult>(`${this.apiUrl}/auth/register`, body).pipe(
      tap((res) => {
        localStorage.setItem(this.tokenKey, res.access_token);
        localStorage.setItem(this.userKey, JSON.stringify(res.user));
        this.currentUser.set(res.user);
        this.authStore.setSession(res);
      })
    );
  }

  /** SA or Admin only: create Admin or Instructor. Omit password to send set-password email. */
  createUser(body: CreateUserRequest): Observable<CreateUserResult> {
    // use of this is:
    // Admin/Super Admin creates staff users through backend role checks.
    return this.http.post<CreateUserResult>(`${this.apiUrl}/auth/create-user`, body);
  }

  /** SA / Admin / Instructor: list users (role-based payload). */
  listUsers(): Observable<ListUsersResponse> {
    // use of this is:
    // Loads role-specific user-management data for the Users feature.
    return this.http.get<ListUsersResponse>(`${this.apiUrl}/auth/users`);
  }

  /** SA or Admin: set user active status (SA: any user; Admin: instructor/student only). */
  setUserStatus(userId: string, active: boolean): Observable<{ user: AuthUser }> {
    // use of this is:
    // Activates or deactivates a user from the admin screen.
    return this.http.patch<{ user: AuthUser }>(`${this.apiUrl}/auth/users/${userId}/status`, { active });
  }

  /** SA only: grant or revoke head permission for an Admin. That Admin can then add users and set user status. */
  setHeadPermission(userId: string, head: boolean): Observable<{ user: AuthUser }> {
    // use of this is:
    // Super Admin grants/revokes admin-head permission.
    return this.http.patch<{ user: AuthUser }>(`${this.apiUrl}/auth/users/${userId}/head`, { head });
  }

  /** SA and Admin: list courses (for assigning instructors on Add User). Returns at least id, name. */
  listCourses(): Observable<CourseOption[]> {
    // use of this is:
    // Loads compact course options for assigning instructors while creating users.
    return this.http.get<CourseOption[]>(`${this.apiUrl}/auth/courses`);
  }

  /** All authenticated users: list courses with full data (Popular Courses). */
  listCoursesForDisplay(): Observable<CourseForDisplay[]> {
    // use of this is:
    // Loads public/full course cards for course listing screens.
    return this.http.get<CourseForDisplay[]>(`${this.apiUrl}/courses`);
  }

  /** Set password using token from invite email (no auth). */
  setPassword(token: string, newPassword: string): Observable<{ message: string; user: AuthUser }> {
    // use of this is:
    // Completes invite flow by setting password with a token from email.
    return this.http.post<{ message: string; user: AuthUser }>(`${this.apiUrl}/auth/set-password`, {
      token,
      newPassword,
    });
  }

  sendOtp(email: string): Observable<{ message: string }> {
    // use of this is:
    // Requests OTP for email verification flows.
    return this.http.post<{ message: string }>(`${this.apiUrl}/auth/send-otp`, { email });
  }

  verifyOtp(email: string, otp: string): Observable<{ valid: boolean }> {
    // use of this is:
    // Verifies the OTP code before registration/reset steps continue.
    return this.http.post<{ valid: boolean }>(`${this.apiUrl}/auth/verify-otp`, { email, otp });
  }

  /** Forgot password: send OTP only if account exists. Returns message and sent flag. */
  forgotPasswordSendOtp(email: string): Observable<{ message: string; sent: boolean }> {
    // use of this is:
    // Starts forgot-password flow by asking backend to email a reset OTP.
    return this.http.post<{ message: string; sent: boolean }>(`${this.apiUrl}/auth/forgot-password/send-otp`, { email });
  }

  /** Reset password after OTP verified. */
  resetPassword(email: string, otp: string, newPassword: string): Observable<{ message: string }> {
    // use of this is:
    // Finishes forgot-password flow after OTP validation.
    return this.http.post<{ message: string }>(`${this.apiUrl}/auth/forgot-password/reset`, {
      email,
      otp,
      newPassword,
    });
  }

  /** Authenticated user: change password (current + new). Server returns message; client should logout or re-login. */
  changePassword(currentPassword: string, newPassword: string): Observable<{ message: string }> {
    // use of this is:
    // Authenticated password change from profile/settings.
    return this.http.patch<{ message: string }>(`${this.apiUrl}/auth/change-password`, {
      currentPassword,
      newPassword,
    });
  }

  /** Authenticated user: update safe profile fields. Role and email/username are read-only. Refreshes stored user. */
  updateProfile(payload: UpdateProfileRequest): Observable<AuthUser> {
    // use of this is:
    // Updates allowed profile fields and refreshes both localStorage and AuthStore.
    return this.http.patch<{ user: AuthUser }>(`${this.apiUrl}/auth/profile`, payload).pipe(
      tap((res) => {
        this.currentUser.set(res.user);
        localStorage.setItem(this.userKey, JSON.stringify(res.user));
        this.authStore.setUser(res.user);
      }),
      map((res) => res.user)
    );
  }

  /** Validate JWT and refresh current user from server. Call on app init when token exists. */
  getMe(): Observable<AuthUser> {
    // use of this is:
    // Validates token on app startup and refreshes the current user from backend.
    if (this.meRequest$) return this.meRequest$;

    this.meRequest$ = this.http.get<{ user: AuthUser }>(`${this.apiUrl}/auth/me`).pipe(
      tap((res) => {
        this.currentUser.set(res.user);
        localStorage.setItem(this.userKey, JSON.stringify(res.user));
        this.authStore.setUser(res.user);
      }),
      map((res) => res.user),
      shareReplay({ bufferSize: 1, refCount: true }),
      finalize(() => { this.meRequest$ = undefined; }),
    );
    return this.meRequest$;
  }

  /** Upload resume file and get URL. Public endpoint (for registration). */
  uploadResume(file: File): Observable<UploadResumeResponse> {
    // use of this is:
    // Uploads resume before registration submit and returns the stored file URL.
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadResumeResponse>(`${this.apiUrl}/upload/resume`, formData);
  }

  logout(): void {
    // use of this is:
    // Clears local session state and redirects to login after user logout or 401.
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUser.set(null);
    this.authStore.clearSession();
    this.router.navigate(['/login']);
  }
}
