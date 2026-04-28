import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import * as i0 from "@angular/core";
/** Public registration is for students only. For Add User (SA/A) use this dropdown: Admin, Instructor. */
export const ADD_USER_ROLES = [
    { value: 'admin', label: 'Admin' },
    { value: 'instructor', label: 'Instructor' },
];
export class AuthService {
    http = inject(HttpClient);
    router = inject(Router);
    apiUrl = environment.apiUrl;
    tokenKey = 'auth_token';
    userKey = 'auth_user';
    currentUser = signal(this.getStoredUser(), ...(ngDevMode ? [{ debugName: "currentUser" }] : []));
    getStoredUser() {
        try {
            const raw = localStorage.getItem(this.userKey);
            return raw ? JSON.parse(raw) : null;
        }
        catch {
            return null;
        }
    }
    getToken() {
        return localStorage.getItem(this.tokenKey);
    }
    isAuthenticated() {
        return !!this.getToken();
    }
    /** True for Super Admin and Admin (can add/invite users when SA grants head option). */
    canAccessAddUsers() {
        const role = this.currentUser()?.role;
        return role === 'super_admin' || role === 'admin';
    }
    /** True for SA and Admin only (can view Users page). Instructor sees all other screens but not Users. */
    canAccessUsersPage() {
        const role = this.currentUser()?.role;
        return role === 'super_admin' || role === 'admin';
    }
    /** True for SA, or for Admin when SA has granted head (canManageUsers). Enables Add User form and Activate/Deactivate. */
    canDoUserCUD() {
        const u = this.currentUser();
        return u?.role === 'super_admin' || (u?.role === 'admin' && u?.canManageUsers === true);
    }
    /** True for users allowed to manage course learning content. */
    canManageCourseContent() {
        const role = this.currentUser()?.role;
        return role === 'super_admin' || role === 'admin' || role === 'instructor';
    }
    /** SA & Admin see only Dashboard, Courses, Batches, Users. Instructor & Student see Materials, Classes, Tasks, Exams, Projects too. */
    showNavBeyondSaAdmin() {
        const role = this.currentUser()?.role;
        return role === 'instructor' || role === 'student';
    }
    /** Human-readable role for UI. */
    roleLabel() {
        const role = this.currentUser()?.role;
        if (!role)
            return 'User';
        const map = {
            super_admin: 'Super Admin',
            admin: 'Admin',
            instructor: 'Instructor',
            student: 'Student',
        };
        return map[role] ?? role;
    }
    /** Returns roles the current user can add (SA: Admin + Instructor; Admin: Instructor only). */
    getAddableRoles() {
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
    isSuperAdmin() {
        return this.currentUser()?.role === 'super_admin';
    }
    /** Check if current user is Admin. */
    isAdmin() {
        return this.currentUser()?.role === 'admin';
    }
    login(body) {
        return this.http.post(`${this.apiUrl}/auth/login`, body).pipe(tap((res) => {
            localStorage.setItem(this.tokenKey, res.access_token);
            localStorage.setItem(this.userKey, JSON.stringify(res.user));
            this.currentUser.set(res.user);
        }));
    }
    register(body) {
        return this.http.post(`${this.apiUrl}/auth/register`, body).pipe(tap((res) => {
            localStorage.setItem(this.tokenKey, res.access_token);
            localStorage.setItem(this.userKey, JSON.stringify(res.user));
            this.currentUser.set(res.user);
        }));
    }
    /** SA or Admin only: create Admin or Instructor. Omit password to send set-password email. */
    createUser(body) {
        return this.http.post(`${this.apiUrl}/auth/create-user`, body);
    }
    /** SA / Admin / Instructor: list users (role-based payload). */
    listUsers() {
        return this.http.get(`${this.apiUrl}/auth/users`);
    }
    /** SA or Admin: set user active status (SA: any user; Admin: instructor/student only). */
    setUserStatus(userId, active) {
        return this.http.patch(`${this.apiUrl}/auth/users/${userId}/status`, { active });
    }
    /** SA only: grant or revoke head permission for an Admin. That Admin can then add users and set user status. */
    setHeadPermission(userId, head) {
        return this.http.patch(`${this.apiUrl}/auth/users/${userId}/head`, { head });
    }
    /** SA and Admin: list courses (for assigning instructors on Add User). Returns at least id, name. */
    listCourses() {
        return this.http.get(`${this.apiUrl}/auth/courses`);
    }
    /** All authenticated users: list courses with full data (Popular Courses). */
    listCoursesForDisplay() {
        return this.http.get(`${this.apiUrl}/courses`);
    }
    /** Set password using token from invite email (no auth). */
    setPassword(token, newPassword) {
        return this.http.post(`${this.apiUrl}/auth/set-password`, {
            token,
            newPassword,
        });
    }
    sendOtp(email) {
        return this.http.post(`${this.apiUrl}/auth/send-otp`, { email });
    }
    verifyOtp(email, otp) {
        return this.http.post(`${this.apiUrl}/auth/verify-otp`, { email, otp });
    }
    /** Forgot password: send OTP only if account exists. Returns message and sent flag. */
    forgotPasswordSendOtp(email) {
        return this.http.post(`${this.apiUrl}/auth/forgot-password/send-otp`, { email });
    }
    /** Reset password after OTP verified. */
    resetPassword(email, otp, newPassword) {
        return this.http.post(`${this.apiUrl}/auth/forgot-password/reset`, {
            email,
            otp,
            newPassword,
        });
    }
    /** Authenticated user: change password (current + new). Server returns message; client should logout or re-login. */
    changePassword(currentPassword, newPassword) {
        return this.http.patch(`${this.apiUrl}/auth/change-password`, {
            currentPassword,
            newPassword,
        });
    }
    /** Authenticated user: update own profile (firstName, lastName only). Role and email/username are read-only. Refreshes stored user. */
    updateProfile(payload) {
        return this.http.patch(`${this.apiUrl}/auth/profile`, payload).pipe(tap((res) => {
            this.currentUser.set(res.user);
            localStorage.setItem(this.userKey, JSON.stringify(res.user));
        }), map((res) => res.user));
    }
    /** Validate JWT and refresh current user from server. Call on app init when token exists. */
    getMe() {
        return this.http.get(`${this.apiUrl}/auth/me`).pipe(tap((res) => {
            this.currentUser.set(res.user);
            localStorage.setItem(this.userKey, JSON.stringify(res.user));
        }), map((res) => res.user));
    }
    /** Upload resume file and get URL. Public endpoint (for registration). */
    uploadResume(file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(`${this.apiUrl}/upload/resume`, formData);
    }
    logout() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
        this.currentUser.set(null);
        this.router.navigate(['/login']);
    }
    static ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
