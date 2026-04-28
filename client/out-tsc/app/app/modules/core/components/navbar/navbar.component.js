import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PopoverModule } from 'primeng/popover';
import { AuthService } from '../../services/auth.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import * as i0 from "@angular/core";
import * as i1 from "primeng/popover";
function NavbarComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 10);
    i0.ɵɵelement(1, "i", 42);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Materials");
    i0.ɵɵelementEnd()();
} }
function NavbarComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 43)(1, "div", 44);
    i0.ɵɵlistener("click", function NavbarComponent_Conditional_14_Template_div_click_1_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggleClassesDropdown()); });
    i0.ɵɵelementStart(2, "div", 45);
    i0.ɵɵelement(3, "i", 46);
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "Classes");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(6, "i", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 48)(8, "a", 49);
    i0.ɵɵelement(9, "i", 50);
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11, "Recorded");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "a", 51);
    i0.ɵɵelement(13, "i", 46);
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15, "Live Stream");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("open", ctx_r2.classesDropdownOpen());
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r2.isActive("/classes"));
} }
function NavbarComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 12);
    i0.ɵɵelement(1, "i", 52);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Tasks");
    i0.ɵɵelementEnd()();
} }
function NavbarComponent_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 15);
    i0.ɵɵelement(1, "i", 53);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Users");
    i0.ɵɵelementEnd()();
} }
function NavbarComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 43)(1, "div", 44);
    i0.ɵɵlistener("click", function NavbarComponent_Conditional_21_Template_div_click_1_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggleExamsDropdown()); });
    i0.ɵɵelementStart(2, "div", 45);
    i0.ɵɵelement(3, "i", 54);
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "Exams");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(6, "i", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 48)(8, "a", 55);
    i0.ɵɵelement(9, "i", 56);
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11, "Online");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "a", 57);
    i0.ɵɵelement(13, "i", 58);
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15, "Documents");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("open", ctx_r2.examsDropdownOpen());
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r2.isActive("/exams"));
} }
function NavbarComponent_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 16);
    i0.ɵɵelement(1, "i", 59);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Projects");
    i0.ɵɵelementEnd()();
} }
function NavbarComponent_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 20);
    i0.ɵɵpipe(1, "safeUrl");
} if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", i0.ɵɵpipeBind1(1, 1, (tmp_2_0 = ctx_r2.auth.currentUser()) == null ? null : tmp_2_0.profileImageUrl), i0.ɵɵsanitizeUrl);
} }
function NavbarComponent_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.userInitials());
} }
function NavbarComponent_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 20);
    i0.ɵɵpipe(1, "safeUrl");
} if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", i0.ɵɵpipeBind1(1, 1, (tmp_2_0 = ctx_r2.auth.currentUser()) == null ? null : tmp_2_0.profileImageUrl), i0.ɵɵsanitizeUrl);
} }
function NavbarComponent_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 29);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.userInitials());
} }
export class NavbarComponent {
    router = inject(Router);
    auth = inject(AuthService);
    classesDropdownOpen = signal(false, ...(ngDevMode ? [{ debugName: "classesDropdownOpen" }] : []));
    examsDropdownOpen = signal(false, ...(ngDevMode ? [{ debugName: "examsDropdownOpen" }] : []));
    toggleClassesDropdown() {
        this.classesDropdownOpen.update((val) => !val);
    }
    toggleExamsDropdown() {
        this.examsDropdownOpen.update((val) => !val);
    }
    isActive(route) {
        return this.router.url.startsWith(route);
    }
    /** Avatar rule: show profile image when profileImageUrl is set; otherwise show user initials (e.g. "JD"). */
    userInitials() {
        const u = this.auth.currentUser();
        if (!u?.firstName && !u?.lastName)
            return (u?.name?.slice(0, 2) ?? 'U').toUpperCase();
        const f = (u.firstName ?? '').trim().charAt(0);
        const l = (u.lastName ?? '').trim().charAt(0);
        return (f + l).toUpperCase() || (u.name?.slice(0, 2) ?? 'U').toUpperCase();
    }
    showProfileMenu() {
        // Popover will handle showing
    }
    goToProfile() {
        this.router.navigate(['/profile-settings']);
    }
    changePassword() {
        this.router.navigate(['/change-password']);
    }
    userPreferences() {
        this.router.navigate(['/profile-settings']);
    }
    logout() {
        this.auth.logout();
    }
    static ɵfac = function NavbarComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NavbarComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NavbarComponent, selectors: [["sqx-navbar"]], decls: 65, vars: 14, consts: [["op", ""], [1, "sidebar"], [1, "sidebar-header"], [1, "logo"], ["src", "/core/logo_white.svg", "alt", "SkillQuestX", 1, "logo-img"], [1, "sidebar-nav"], ["routerLink", "/dashboard", "routerLinkActive", "active", 1, "nav-item"], [1, "pi", "pi-th-large"], ["routerLink", "/courses", "routerLinkActive", "active", 1, "nav-item"], [1, "pi", "pi-book"], ["routerLink", "/materials", "routerLinkActive", "active", 1, "nav-item"], [1, "nav-item", "dropdown", 3, "open"], ["routerLink", "/tasks", "routerLinkActive", "active", 1, "nav-item"], ["routerLink", "/batches", "routerLinkActive", "active", 1, "nav-item"], [1, "pi", "pi-users"], ["routerLink", "/add-users", "routerLinkActive", "active", 1, "nav-item"], ["routerLink", "/projects", "routerLinkActive", "active", 1, "nav-item"], [1, "sidebar-footer"], [1, "user-profile", 3, "click"], [1, "user-avatar"], ["alt", "User", 3, "src"], [1, "user-avatar-initials"], [1, "user-info"], [1, "user-name"], [1, "user-role"], [3, "dismissable"], [1, "profile-menu"], [1, "menu-header"], [1, "header-avatar"], [1, "header-avatar-initials"], [1, "header-info"], [1, "header-name"], [1, "header-email"], [1, "header-designation"], [1, "menu-items"], [1, "menu-item", 3, "click"], [1, "pi", "pi-user"], [1, "pi", "pi-lock"], [1, "pi", "pi-cog"], [1, "menu-footer"], [1, "logout-menu-btn", 3, "click"], [1, "pi", "pi-sign-out"], [1, "pi", "pi-file"], [1, "nav-item", "dropdown"], [1, "nav-item-header", 3, "click"], [1, "nav-item-content"], [1, "pi", "pi-video"], [1, "pi", "pi-chevron-down", "dropdown-icon"], [1, "dropdown-menu"], ["routerLink", "/classes/recorded", "routerLinkActive", "active", 1, "dropdown-item"], [1, "pi", "pi-play-circle"], ["routerLink", "/classes/live", "routerLinkActive", "active", 1, "dropdown-item"], [1, "pi", "pi-check-square"], [1, "pi", "pi-user-plus"], [1, "pi", "pi-file-edit"], ["routerLink", "/exams/assessment", "routerLinkActive", "active", 1, "dropdown-item"], [1, "pi", "pi-list-check"], ["routerLink", "/exams/docs", "routerLinkActive", "active", 1, "dropdown-item"], [1, "pi", "pi-file-pdf"], [1, "pi", "pi-briefcase"]], template: function NavbarComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "aside", 1)(1, "div", 2)(2, "div", 3);
            i0.ɵɵelement(3, "img", 4);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(4, "nav", 5)(5, "a", 6);
            i0.ɵɵelement(6, "i", 7);
            i0.ɵɵelementStart(7, "span");
            i0.ɵɵtext(8, "Dashboard");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "a", 8);
            i0.ɵɵelement(10, "i", 9);
            i0.ɵɵelementStart(11, "span");
            i0.ɵɵtext(12, "Courses");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(13, NavbarComponent_Conditional_13_Template, 4, 0, "a", 10);
            i0.ɵɵconditionalCreate(14, NavbarComponent_Conditional_14_Template, 16, 4, "div", 11);
            i0.ɵɵconditionalCreate(15, NavbarComponent_Conditional_15_Template, 4, 0, "a", 12);
            i0.ɵɵelementStart(16, "a", 13);
            i0.ɵɵelement(17, "i", 14);
            i0.ɵɵelementStart(18, "span");
            i0.ɵɵtext(19, "Batches");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(20, NavbarComponent_Conditional_20_Template, 4, 0, "a", 15);
            i0.ɵɵconditionalCreate(21, NavbarComponent_Conditional_21_Template, 16, 4, "div", 11);
            i0.ɵɵconditionalCreate(22, NavbarComponent_Conditional_22_Template, 4, 0, "a", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div", 17)(24, "div", 18);
            i0.ɵɵlistener("click", function NavbarComponent_Template_div_click_24_listener($event) { i0.ɵɵrestoreView(_r1); const op_r5 = i0.ɵɵreference(34); return i0.ɵɵresetView(op_r5.toggle($event)); });
            i0.ɵɵelementStart(25, "div", 19);
            i0.ɵɵconditionalCreate(26, NavbarComponent_Conditional_26_Template, 2, 3, "img", 20)(27, NavbarComponent_Conditional_27_Template, 2, 1, "span", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "div", 22)(29, "span", 23);
            i0.ɵɵtext(30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "span", 24);
            i0.ɵɵtext(32);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(33, "p-popover", 25, 0)(35, "div", 26)(36, "div", 27)(37, "div", 28);
            i0.ɵɵconditionalCreate(38, NavbarComponent_Conditional_38_Template, 2, 3, "img", 20)(39, NavbarComponent_Conditional_39_Template, 2, 1, "span", 29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "div", 30)(41, "h4", 31);
            i0.ɵɵtext(42);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "p", 32);
            i0.ɵɵtext(44);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "p", 33);
            i0.ɵɵtext(46);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(47, "div", 34)(48, "button", 35);
            i0.ɵɵlistener("click", function NavbarComponent_Template_button_click_48_listener() { i0.ɵɵrestoreView(_r1); const op_r5 = i0.ɵɵreference(34); ctx.goToProfile(); return i0.ɵɵresetView(op_r5.hide()); });
            i0.ɵɵelement(49, "i", 36);
            i0.ɵɵelementStart(50, "span");
            i0.ɵɵtext(51, "Profile Settings");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(52, "button", 35);
            i0.ɵɵlistener("click", function NavbarComponent_Template_button_click_52_listener() { i0.ɵɵrestoreView(_r1); const op_r5 = i0.ɵɵreference(34); ctx.changePassword(); return i0.ɵɵresetView(op_r5.hide()); });
            i0.ɵɵelement(53, "i", 37);
            i0.ɵɵelementStart(54, "span");
            i0.ɵɵtext(55, "Change Password");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(56, "button", 35);
            i0.ɵɵlistener("click", function NavbarComponent_Template_button_click_56_listener() { i0.ɵɵrestoreView(_r1); const op_r5 = i0.ɵɵreference(34); ctx.userPreferences(); return i0.ɵɵresetView(op_r5.hide()); });
            i0.ɵɵelement(57, "i", 38);
            i0.ɵɵelementStart(58, "span");
            i0.ɵɵtext(59, "User Preferences");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(60, "div", 39)(61, "button", 40);
            i0.ɵɵlistener("click", function NavbarComponent_Template_button_click_61_listener() { i0.ɵɵrestoreView(_r1); const op_r5 = i0.ɵɵreference(34); ctx.logout(); return i0.ɵɵresetView(op_r5.hide()); });
            i0.ɵɵelement(62, "i", 41);
            i0.ɵɵelementStart(63, "span");
            i0.ɵɵtext(64, "Logout");
            i0.ɵɵelementEnd()()()()()()();
        } if (rf & 2) {
            let tmp_7_0;
            let tmp_8_0;
            let tmp_11_0;
            let tmp_12_0;
            let tmp_13_0;
            i0.ɵɵadvance(13);
            i0.ɵɵconditional(ctx.auth.showNavBeyondSaAdmin() ? 13 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.auth.showNavBeyondSaAdmin() ? 14 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.auth.showNavBeyondSaAdmin() ? 15 : -1);
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.auth.canAccessUsersPage() ? 20 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.auth.showNavBeyondSaAdmin() ? 21 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.auth.showNavBeyondSaAdmin() ? 22 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(((tmp_7_0 = ctx.auth.currentUser()) == null ? null : tmp_7_0.profileImageUrl) ? 26 : 27);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(((tmp_8_0 = ctx.auth.currentUser()) == null ? null : tmp_8_0.name) ?? "User");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.auth.roleLabel());
            i0.ɵɵadvance();
            i0.ɵɵproperty("dismissable", true);
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(((tmp_11_0 = ctx.auth.currentUser()) == null ? null : tmp_11_0.profileImageUrl) ? 38 : 39);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(((tmp_12_0 = ctx.auth.currentUser()) == null ? null : tmp_12_0.name) ?? "User");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(((tmp_13_0 = ctx.auth.currentUser()) == null ? null : tmp_13_0.email) ?? "");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.auth.roleLabel());
        } }, dependencies: [RouterLink, RouterLinkActive, PopoverModule, i1.Popover, SafeUrlPipe], styles: ["//[_ngcontent-%COMP%]   Sidebar[_ngcontent-%COMP%]   Styling\n.sidebar[_ngcontent-%COMP%] {\n    width: 220px;\n    background: var(--sqx-color-sidebar-bg);\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n    color: var(--sqx-color-sidebar-text);\n    flex-shrink: 0;\n    position: fixed;\n    left: 0;\n    top: 0;\n    z-index: 100;\n}\n\n//[_ngcontent-%COMP%]   Profile[_ngcontent-%COMP%]   Menu[_ngcontent-%COMP%]   Popover[_ngcontent-%COMP%]   Styles\n[_ngcontent-%COMP%]  .p-popover {\n    .profile-menu {\n        width: 300px;\n        padding: 0;\n    }\n\n    .menu-header {\n        padding: var(--sqx-space-5);\n        border-bottom: 1px solid var(--sqx-color-border);\n        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        gap: var(--sqx-space-3);\n\n        .header-avatar {\n            width: 60px;\n            height: 60px;\n            min-width: 60px;\n            border-radius: 50%;\n            overflow: hidden;\n            border: 3px solid white;\n            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            background: linear-gradient(135deg, var(--sqx-color-primary) 0%, var(--sqx-color-primary-dark) 100%);\n\n            img {\n                width: 100%;\n                height: 100%;\n                object-fit: cover;\n            }\n        }\n\n        .header-avatar-initials {\n            font-size: 1.25rem;\n            font-weight: 600;\n            color: #ffffff;\n            letter-spacing: 0.02em;\n        }\n\n        .header-info {\n            text-align: center;\n        }\n\n        .header-name {\n            font-size: 16px;\n            font-weight: 700;\n            color: white;\n            margin: 0 0 4px 0;\n        }\n\n        .header-email {\n            font-size: 13px;\n            color: rgba(255, 255, 255, 0.9);\n            margin: 0 0 2px 0;\n        }\n\n        .header-designation {\n            font-size: 12px;\n            color: rgba(255, 255, 255, 0.8);\n            padding: 4px 12px;\n            background: rgba(255, 255, 255, 0.2);\n            border-radius: 12px;\n            display: inline-block;\n            margin: 4px 0 0 0;\n        }\n    }\n\n    .menu-items {\n        padding: var(--sqx-space-3) 0;\n    }\n\n    .menu-item {\n        width: 100%;\n        display: flex;\n        align-items: center;\n        gap: var(--sqx-space-3);\n        padding: 12px var(--sqx-space-5);\n        border: none;\n        background: transparent;\n        color: var(--sqx-color-text);\n        font-size: 14px;\n        font-weight: 500;\n        cursor: pointer;\n        transition: all 0.2s ease;\n        text-align: left;\n\n        i {\n            font-size: 18px;\n            color: var(--sqx-color-primary);\n            width: 20px;\n        }\n\n        &:hover {\n            background: #f5f5f5;\n        }\n    }\n\n    .menu-footer {\n        padding: var(--sqx-space-3);\n        border-top: 1px solid var(--sqx-color-border);\n        background: #fafafa;\n    }\n\n    .logout-menu-btn {\n        width: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        gap: var(--sqx-space-2);\n        padding: 10px 16px;\n        border: 1px solid var(--sqx-color-danger);\n        background: white;\n        color: var(--sqx-color-danger);\n        font-size: 14px;\n        font-weight: 600;\n        cursor: pointer;\n        border-radius: var(--sqx-radius-md);\n        transition: all 0.2s ease;\n\n        i {\n            font-size: 16px;\n        }\n\n        &:hover {\n            background: var(--sqx-color-danger);\n            color: white;\n        }\n    }\n}\n\n.sidebar-header[_ngcontent-%COMP%] {\n    padding: var(--sqx-space-6) var(--sqx-space-4);\n    border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n}\n\n.logo[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    .logo-img {\n        width: 100%;\n        height: auto;\n        max-height: 50px;\n        object-fit: contain;\n    }\n}\n\n//[_ngcontent-%COMP%]   Navigation[_ngcontent-%COMP%]   Styling\n.sidebar-nav[_ngcontent-%COMP%] {\n    flex: 1;\n    padding: var(--sqx-space-4);\n    overflow-y: auto;\n    display: flex;\n    flex-direction: column;\n    gap: var(--sqx-space-1);\n\n    &::-webkit-scrollbar {\n        width: 6px;\n    }\n\n    &::-webkit-scrollbar-thumb {\n        background: rgba(255, 255, 255, 0.2);\n        border-radius: 3px;\n    }\n}\n\n.nav-item[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: var(--sqx-space-3);\n    padding: 12px 16px;\n    border-radius: var(--sqx-radius-md);\n    color: var(--sqx-color-sidebar-text);\n    text-decoration: none;\n    font-size: 15px;\n    font-weight: 500;\n    cursor: pointer;\n    transition: all 0.2s ease;\n\n    i {\n        font-size: 18px;\n        width: 20px;\n        text-align: center;\n    }\n\n    &:hover {\n        background: var(--sqx-color-sidebar-hover);\n    }\n\n    &.active {\n        background: var(--sqx-color-sidebar-active);\n        font-weight: 600;\n    }\n}\n\n//[_ngcontent-%COMP%]   Dropdown[_ngcontent-%COMP%]   Styling\n.dropdown[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0;\n    padding: 0;\n\n    &:hover {\n        background: transparent;\n    }\n}\n\n.nav-item-header[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 12px 16px;\n    border-radius: var(--sqx-radius-md);\n    cursor: pointer;\n    transition: all 0.2s ease;\n    width: 100%;\n\n    &:hover {\n        background: var(--sqx-color-sidebar-hover);\n    }\n\n    &.active {\n        background: var(--sqx-color-sidebar-active);\n        font-weight: 600;\n    }\n}\n\n.nav-item-content[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: var(--sqx-space-3);\n    font-size: 15px;\n    font-weight: 500;\n\n    i {\n        font-size: 18px;\n        width: 20px;\n        text-align: center;\n    }\n}\n\n.dropdown-icon[_ngcontent-%COMP%] {\n    font-size: 14px;\n    transition: transform 0.3s ease;\n}\n\n.dropdown.open[_ngcontent-%COMP%] {\n    .dropdown-icon {\n        transform: rotate(180deg);\n    }\n\n    .dropdown-menu {\n        max-height: 200px;\n        opacity: 1;\n        margin-top: var(--sqx-space-1);\n    }\n}\n\n.dropdown-menu[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    padding-left: var(--sqx-space-4);\n    max-height: 0;\n    opacity: 0;\n    overflow: hidden;\n    transition: all 0.3s ease;\n}\n\n.dropdown-item[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: var(--sqx-space-3);\n    padding: 10px 16px;\n    border-radius: var(--sqx-radius-sm);\n    color: var(--sqx-color-sidebar-text);\n    text-decoration: none;\n    font-size: 14px;\n    font-weight: 400;\n    cursor: pointer;\n    transition: all 0.2s ease;\n\n    i {\n        font-size: 16px;\n        width: 18px;\n        text-align: center;\n    }\n\n    &:hover {\n        background: var(--sqx-color-sidebar-hover);\n    }\n\n    &.active {\n        background: var(--sqx-color-sidebar-active);\n        font-weight: 500;\n    }\n}\n\n//[_ngcontent-%COMP%]   Sidebar[_ngcontent-%COMP%]   Footer\n.sidebar-footer[_ngcontent-%COMP%] {\n    // padding: var(--sqx-space-4);\n    border-top: 1px solid rgba(255, 255, 255, 0.1);\n}\n\n.user-profile[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: var(--sqx-space-3);\n    padding: var(--sqx-space-3);\n    // border-radius: var(--sqx-radius-md);\n    cursor: pointer;\n    transition: all 0.2s ease;\n\n    &:hover {\n        background: rgba(255, 255, 255, 0.1);\n    }\n}\n\n.user-avatar[_ngcontent-%COMP%] {\n    width: 48px;\n    height: 48px;\n    min-width: 48px;\n    border-radius: 50%;\n    overflow: hidden;\n    background: linear-gradient(135deg, var(--sqx-color-primary) 0%, var(--sqx-color-primary-dark) 100%);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    img {\n        width: 100%;\n        height: 100%;\n        object-fit: cover;\n    }\n}\n\n.user-avatar-initials[_ngcontent-%COMP%] {\n    font-size: 1rem;\n    font-weight: 600;\n    color: #ffffff;\n    letter-spacing: 0.02em;\n}\n\n.user-info[_ngcontent-%COMP%] {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n}\n\n.user-name[_ngcontent-%COMP%] {\n    font-size: 14px;\n    font-weight: 600;\n    color: white;\n    display: block;\n}\n\n.user-role[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 400;\n    color: rgba(255, 255, 255, 0.7);\n    display: block;\n}\n\n.logout-btn[_ngcontent-%COMP%] {\n    width: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: var(--sqx-space-2);\n    padding: 10px;\n    border-radius: var(--sqx-radius-md);\n    background: rgba(255, 255, 255, 0.1);\n    border: none;\n    color: white;\n    font-size: 14px;\n    font-weight: 500;\n    cursor: pointer;\n    transition: all 0.2s ease;\n\n    &:hover {\n        background: rgba(255, 255, 255, 0.15);\n    }\n\n    i {\n        font-size: 16px;\n    }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NavbarComponent, [{
        type: Component,
        args: [{ selector: 'sqx-navbar', standalone: true, imports: [RouterLink, RouterLinkActive, PopoverModule, SafeUrlPipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<aside class=\"sidebar\">\n  <!-- Logo Section -->\n  <div class=\"sidebar-header\">\n    <div class=\"logo\">\n      <img src=\"/core/logo_white.svg\" alt=\"SkillQuestX\" class=\"logo-img\" />\n    </div>\n  </div>\n\n  <!-- Navigation Items -->\n  <nav class=\"sidebar-nav\">\n    <!-- Dashboard -->\n    <a routerLink=\"/dashboard\" routerLinkActive=\"active\" class=\"nav-item\">\n      <i class=\"pi pi-th-large\"></i>\n      <span>Dashboard</span>\n    </a>\n\n    <!-- Courses -->\n    <a routerLink=\"/courses\" routerLinkActive=\"active\" class=\"nav-item\">\n      <i class=\"pi pi-book\"></i>\n      <span>Courses</span>\n    </a>\n\n    <!-- Materials (Instructor, Student only) -->\n    @if (auth.showNavBeyondSaAdmin()) {\n    <a routerLink=\"/materials\" routerLinkActive=\"active\" class=\"nav-item\">\n      <i class=\"pi pi-file\"></i>\n      <span>Materials</span>\n    </a>\n    }\n\n    <!-- Classes Dropdown (Instructor, Student only) -->\n    @if (auth.showNavBeyondSaAdmin()) {\n    <div class=\"nav-item dropdown\" [class.open]=\"classesDropdownOpen()\">\n      <div class=\"nav-item-header\" (click)=\"toggleClassesDropdown()\" [class.active]=\"isActive('/classes')\">\n        <div class=\"nav-item-content\">\n          <i class=\"pi pi-video\"></i>\n          <span>Classes</span>\n        </div>\n        <i class=\"pi pi-chevron-down dropdown-icon\"></i>\n      </div>\n      <div class=\"dropdown-menu\">\n        <a routerLink=\"/classes/recorded\" routerLinkActive=\"active\" class=\"dropdown-item\">\n          <i class=\"pi pi-play-circle\"></i>\n          <span>Recorded</span>\n        </a>\n        <a routerLink=\"/classes/live\" routerLinkActive=\"active\" class=\"dropdown-item\">\n          <i class=\"pi pi-video\"></i>\n          <span>Live Stream</span>\n        </a>\n      </div>\n    </div>\n    }\n\n    <!-- Tasks (Instructor, Student only) -->\n    @if (auth.showNavBeyondSaAdmin()) {\n    <a routerLink=\"/tasks\" routerLinkActive=\"active\" class=\"nav-item\">\n      <i class=\"pi pi-check-square\"></i>\n      <span>Tasks</span>\n    </a>\n    }\n\n    <!-- Batches -->\n    <a routerLink=\"/batches\" routerLinkActive=\"active\" class=\"nav-item\">\n      <i class=\"pi pi-users\"></i>\n      <span>Batches</span>\n    </a>\n\n    <!-- Users (SA, Admin only) -->\n    @if (auth.canAccessUsersPage()) {\n    <a routerLink=\"/add-users\" routerLinkActive=\"active\" class=\"nav-item\">\n      <i class=\"pi pi-user-plus\"></i>\n      <span>Users</span>\n    </a>\n    }\n\n    <!-- Exams Dropdown (Instructor, Student only) -->\n    @if (auth.showNavBeyondSaAdmin()) {\n    <div class=\"nav-item dropdown\" [class.open]=\"examsDropdownOpen()\">\n      <div class=\"nav-item-header\" (click)=\"toggleExamsDropdown()\" [class.active]=\"isActive('/exams')\">\n        <div class=\"nav-item-content\">\n          <i class=\"pi pi-file-edit\"></i>\n          <span>Exams</span>\n        </div>\n        <i class=\"pi pi-chevron-down dropdown-icon\"></i>\n      </div>\n      <div class=\"dropdown-menu\">\n        <a routerLink=\"/exams/assessment\" routerLinkActive=\"active\" class=\"dropdown-item\">\n          <i class=\"pi pi-list-check\"></i>\n          <span>Online</span>\n        </a>\n        <a routerLink=\"/exams/docs\" routerLinkActive=\"active\" class=\"dropdown-item\">\n          <i class=\"pi pi-file-pdf\"></i>\n          <span>Documents</span>\n        </a>\n      </div>\n    </div>\n    }\n\n    <!-- Projects (Instructor, Student only) -->\n    @if (auth.showNavBeyondSaAdmin()) {\n    <a routerLink=\"/projects\" routerLinkActive=\"active\" class=\"nav-item\">\n      <i class=\"pi pi-briefcase\"></i>\n      <span>Projects</span>\n    </a>\n    }\n  </nav>\n\n  <!-- User Profile Section: show profile image when set, else initials -->\n  <div class=\"sidebar-footer\">\n    <div class=\"user-profile\" (click)=\"op.toggle($event)\">\n      <div class=\"user-avatar\">\n        @if (auth.currentUser()?.profileImageUrl) {\n          <img [src]=\"auth.currentUser()?.profileImageUrl | safeUrl\" alt=\"User\" />\n        } @else {\n          <span class=\"user-avatar-initials\">{{ userInitials() }}</span>\n        }\n      </div>\n      <div class=\"user-info\">\n        <span class=\"user-name\">{{ auth.currentUser()?.name ?? 'User' }}</span>\n        <span class=\"user-role\">{{ auth.roleLabel() }}</span>\n      </div>\n    </div>\n\n    <p-popover #op [dismissable]=\"true\">\n      <div class=\"profile-menu\">\n        <!-- Menu Header -->\n        <div class=\"menu-header\">\n          <div class=\"header-avatar\">\n            @if (auth.currentUser()?.profileImageUrl) {\n              <img [src]=\"auth.currentUser()?.profileImageUrl | safeUrl\" alt=\"User\" />\n            } @else {\n              <span class=\"header-avatar-initials\">{{ userInitials() }}</span>\n            }\n          </div>\n          <div class=\"header-info\">\n            <h4 class=\"header-name\">{{ auth.currentUser()?.name ?? 'User' }}</h4>\n            <p class=\"header-email\">{{ auth.currentUser()?.email ?? '' }}</p>\n            <p class=\"header-designation\">{{ auth.roleLabel() }}</p>\n          </div>\n        </div>\n\n        <!-- Menu Items -->\n        <div class=\"menu-items\">\n          <button class=\"menu-item\" (click)=\"goToProfile(); op.hide()\">\n            <i class=\"pi pi-user\"></i>\n            <span>Profile Settings</span>\n          </button>\n          <button class=\"menu-item\" (click)=\"changePassword(); op.hide()\">\n            <i class=\"pi pi-lock\"></i>\n            <span>Change Password</span>\n          </button>\n          <button class=\"menu-item\" (click)=\"userPreferences(); op.hide()\">\n            <i class=\"pi pi-cog\"></i>\n            <span>User Preferences</span>\n          </button>\n        </div>\n\n        <!-- Menu Footer -->\n        <div class=\"menu-footer\">\n          <button class=\"logout-menu-btn\" (click)=\"logout(); op.hide()\">\n            <i class=\"pi pi-sign-out\"></i>\n            <span>Logout</span>\n          </button>\n        </div>\n      </div>\n    </p-popover>\n  </div>\n</aside>", styles: ["// Sidebar Styling\n.sidebar {\n    width: 220px;\n    background: var(--sqx-color-sidebar-bg);\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n    color: var(--sqx-color-sidebar-text);\n    flex-shrink: 0;\n    position: fixed;\n    left: 0;\n    top: 0;\n    z-index: 100;\n}\n\n// Profile Menu Popover Styles\n::ng-deep .p-popover {\n    .profile-menu {\n        width: 300px;\n        padding: 0;\n    }\n\n    .menu-header {\n        padding: var(--sqx-space-5);\n        border-bottom: 1px solid var(--sqx-color-border);\n        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        gap: var(--sqx-space-3);\n\n        .header-avatar {\n            width: 60px;\n            height: 60px;\n            min-width: 60px;\n            border-radius: 50%;\n            overflow: hidden;\n            border: 3px solid white;\n            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            background: linear-gradient(135deg, var(--sqx-color-primary) 0%, var(--sqx-color-primary-dark) 100%);\n\n            img {\n                width: 100%;\n                height: 100%;\n                object-fit: cover;\n            }\n        }\n\n        .header-avatar-initials {\n            font-size: 1.25rem;\n            font-weight: 600;\n            color: #ffffff;\n            letter-spacing: 0.02em;\n        }\n\n        .header-info {\n            text-align: center;\n        }\n\n        .header-name {\n            font-size: 16px;\n            font-weight: 700;\n            color: white;\n            margin: 0 0 4px 0;\n        }\n\n        .header-email {\n            font-size: 13px;\n            color: rgba(255, 255, 255, 0.9);\n            margin: 0 0 2px 0;\n        }\n\n        .header-designation {\n            font-size: 12px;\n            color: rgba(255, 255, 255, 0.8);\n            padding: 4px 12px;\n            background: rgba(255, 255, 255, 0.2);\n            border-radius: 12px;\n            display: inline-block;\n            margin: 4px 0 0 0;\n        }\n    }\n\n    .menu-items {\n        padding: var(--sqx-space-3) 0;\n    }\n\n    .menu-item {\n        width: 100%;\n        display: flex;\n        align-items: center;\n        gap: var(--sqx-space-3);\n        padding: 12px var(--sqx-space-5);\n        border: none;\n        background: transparent;\n        color: var(--sqx-color-text);\n        font-size: 14px;\n        font-weight: 500;\n        cursor: pointer;\n        transition: all 0.2s ease;\n        text-align: left;\n\n        i {\n            font-size: 18px;\n            color: var(--sqx-color-primary);\n            width: 20px;\n        }\n\n        &:hover {\n            background: #f5f5f5;\n        }\n    }\n\n    .menu-footer {\n        padding: var(--sqx-space-3);\n        border-top: 1px solid var(--sqx-color-border);\n        background: #fafafa;\n    }\n\n    .logout-menu-btn {\n        width: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        gap: var(--sqx-space-2);\n        padding: 10px 16px;\n        border: 1px solid var(--sqx-color-danger);\n        background: white;\n        color: var(--sqx-color-danger);\n        font-size: 14px;\n        font-weight: 600;\n        cursor: pointer;\n        border-radius: var(--sqx-radius-md);\n        transition: all 0.2s ease;\n\n        i {\n            font-size: 16px;\n        }\n\n        &:hover {\n            background: var(--sqx-color-danger);\n            color: white;\n        }\n    }\n}\n\n.sidebar-header {\n    padding: var(--sqx-space-6) var(--sqx-space-4);\n    border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n}\n\n.logo {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    .logo-img {\n        width: 100%;\n        height: auto;\n        max-height: 50px;\n        object-fit: contain;\n    }\n}\n\n// Navigation Styling\n.sidebar-nav {\n    flex: 1;\n    padding: var(--sqx-space-4);\n    overflow-y: auto;\n    display: flex;\n    flex-direction: column;\n    gap: var(--sqx-space-1);\n\n    &::-webkit-scrollbar {\n        width: 6px;\n    }\n\n    &::-webkit-scrollbar-thumb {\n        background: rgba(255, 255, 255, 0.2);\n        border-radius: 3px;\n    }\n}\n\n.nav-item {\n    display: flex;\n    align-items: center;\n    gap: var(--sqx-space-3);\n    padding: 12px 16px;\n    border-radius: var(--sqx-radius-md);\n    color: var(--sqx-color-sidebar-text);\n    text-decoration: none;\n    font-size: 15px;\n    font-weight: 500;\n    cursor: pointer;\n    transition: all 0.2s ease;\n\n    i {\n        font-size: 18px;\n        width: 20px;\n        text-align: center;\n    }\n\n    &:hover {\n        background: var(--sqx-color-sidebar-hover);\n    }\n\n    &.active {\n        background: var(--sqx-color-sidebar-active);\n        font-weight: 600;\n    }\n}\n\n// Dropdown Styling\n.dropdown {\n    flex-direction: column;\n    gap: 0;\n    padding: 0;\n\n    &:hover {\n        background: transparent;\n    }\n}\n\n.nav-item-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 12px 16px;\n    border-radius: var(--sqx-radius-md);\n    cursor: pointer;\n    transition: all 0.2s ease;\n    width: 100%;\n\n    &:hover {\n        background: var(--sqx-color-sidebar-hover);\n    }\n\n    &.active {\n        background: var(--sqx-color-sidebar-active);\n        font-weight: 600;\n    }\n}\n\n.nav-item-content {\n    display: flex;\n    align-items: center;\n    gap: var(--sqx-space-3);\n    font-size: 15px;\n    font-weight: 500;\n\n    i {\n        font-size: 18px;\n        width: 20px;\n        text-align: center;\n    }\n}\n\n.dropdown-icon {\n    font-size: 14px;\n    transition: transform 0.3s ease;\n}\n\n.dropdown.open {\n    .dropdown-icon {\n        transform: rotate(180deg);\n    }\n\n    .dropdown-menu {\n        max-height: 200px;\n        opacity: 1;\n        margin-top: var(--sqx-space-1);\n    }\n}\n\n.dropdown-menu {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    padding-left: var(--sqx-space-4);\n    max-height: 0;\n    opacity: 0;\n    overflow: hidden;\n    transition: all 0.3s ease;\n}\n\n.dropdown-item {\n    display: flex;\n    align-items: center;\n    gap: var(--sqx-space-3);\n    padding: 10px 16px;\n    border-radius: var(--sqx-radius-sm);\n    color: var(--sqx-color-sidebar-text);\n    text-decoration: none;\n    font-size: 14px;\n    font-weight: 400;\n    cursor: pointer;\n    transition: all 0.2s ease;\n\n    i {\n        font-size: 16px;\n        width: 18px;\n        text-align: center;\n    }\n\n    &:hover {\n        background: var(--sqx-color-sidebar-hover);\n    }\n\n    &.active {\n        background: var(--sqx-color-sidebar-active);\n        font-weight: 500;\n    }\n}\n\n// Sidebar Footer\n.sidebar-footer {\n    // padding: var(--sqx-space-4);\n    border-top: 1px solid rgba(255, 255, 255, 0.1);\n}\n\n.user-profile {\n    display: flex;\n    align-items: center;\n    gap: var(--sqx-space-3);\n    padding: var(--sqx-space-3);\n    // border-radius: var(--sqx-radius-md);\n    cursor: pointer;\n    transition: all 0.2s ease;\n\n    &:hover {\n        background: rgba(255, 255, 255, 0.1);\n    }\n}\n\n.user-avatar {\n    width: 48px;\n    height: 48px;\n    min-width: 48px;\n    border-radius: 50%;\n    overflow: hidden;\n    background: linear-gradient(135deg, var(--sqx-color-primary) 0%, var(--sqx-color-primary-dark) 100%);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    img {\n        width: 100%;\n        height: 100%;\n        object-fit: cover;\n    }\n}\n\n.user-avatar-initials {\n    font-size: 1rem;\n    font-weight: 600;\n    color: #ffffff;\n    letter-spacing: 0.02em;\n}\n\n.user-info {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n}\n\n.user-name {\n    font-size: 14px;\n    font-weight: 600;\n    color: white;\n    display: block;\n}\n\n.user-role {\n    font-size: 12px;\n    font-weight: 400;\n    color: rgba(255, 255, 255, 0.7);\n    display: block;\n}\n\n.logout-btn {\n    width: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: var(--sqx-space-2);\n    padding: 10px;\n    border-radius: var(--sqx-radius-md);\n    background: rgba(255, 255, 255, 0.1);\n    border: none;\n    color: white;\n    font-size: 14px;\n    font-weight: 500;\n    cursor: pointer;\n    transition: all 0.2s ease;\n\n    &:hover {\n        background: rgba(255, 255, 255, 0.15);\n    }\n\n    i {\n        font-size: 16px;\n    }\n}"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NavbarComponent, { className: "NavbarComponent", filePath: "src/app/modules/core/components/navbar/navbar.component.ts", lineNumber: 15 }); })();
