import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { TooltipModule } from 'primeng/tooltip';
import { DrawerModule } from 'primeng/drawer';
import { BadgeModule } from 'primeng/badge';
import { HeaderService } from '../../services/header.service';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import * as i0 from "@angular/core";
import * as i1 from "primeng/tooltip";
import * as i2 from "primeng/drawer";
import * as i3 from "primeng/api";
const _forTrack0 = ($index, $item) => $item.label;
const _forTrack1 = ($index, $item) => $item.id;
function HeaderComponent_For_8_Conditional_1_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i");
} if (rf & 2) {
    const crumb_r1 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵclassMap(crumb_r1.icon);
} }
function HeaderComponent_For_8_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 15);
    i0.ɵɵconditionalCreate(1, HeaderComponent_For_8_Conditional_1_Conditional_1_Template, 1, 2, "i", 19);
    i0.ɵɵelementStart(2, "span", 20);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const crumb_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("routerLink", crumb_r1.url)("pTooltip", crumb_r1.title || crumb_r1.label);
    i0.ɵɵadvance();
    i0.ɵɵconditional(crumb_r1.icon ? 1 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(crumb_r1.label);
} }
function HeaderComponent_For_8_Conditional_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i");
} if (rf & 2) {
    const crumb_r1 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵclassMap(crumb_r1.icon);
} }
function HeaderComponent_For_8_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 21);
    i0.ɵɵlistener("click", function HeaderComponent_For_8_Conditional_2_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r2); const crumb_r1 = i0.ɵɵnextContext().$implicit; return i0.ɵɵresetView(crumb_r1.command()); });
    i0.ɵɵconditionalCreate(1, HeaderComponent_For_8_Conditional_2_Conditional_1_Template, 1, 2, "i", 19);
    i0.ɵɵelementStart(2, "span", 20);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const crumb_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("pTooltip", crumb_r1.title || crumb_r1.label);
    i0.ɵɵadvance();
    i0.ɵɵconditional(crumb_r1.icon ? 1 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(crumb_r1.label);
} }
function HeaderComponent_For_8_Conditional_3_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i");
} if (rf & 2) {
    const crumb_r1 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵclassMap(crumb_r1.icon);
} }
function HeaderComponent_For_8_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 17);
    i0.ɵɵconditionalCreate(1, HeaderComponent_For_8_Conditional_3_Conditional_1_Template, 1, 2, "i", 19);
    i0.ɵɵelementStart(2, "span", 20);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const crumb_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("pTooltip", crumb_r1.title || crumb_r1.label);
    i0.ɵɵadvance();
    i0.ɵɵconditional(crumb_r1.icon ? 1 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(crumb_r1.label);
} }
function HeaderComponent_For_8_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 18);
} }
function HeaderComponent_For_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 6);
    i0.ɵɵconditionalCreate(1, HeaderComponent_For_8_Conditional_1_Template, 4, 4, "a", 15);
    i0.ɵɵconditionalCreate(2, HeaderComponent_For_8_Conditional_2_Template, 4, 3, "a", 16);
    i0.ɵɵconditionalCreate(3, HeaderComponent_For_8_Conditional_3_Template, 4, 3, "span", 17);
    i0.ɵɵconditionalCreate(4, HeaderComponent_For_8_Conditional_4_Template, 1, 0, "i", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const crumb_r1 = ctx.$implicit;
    const ɵ$index_14_r3 = ctx.$index;
    const ɵ$count_14_r4 = ctx.$count;
    i0.ɵɵadvance();
    i0.ɵɵconditional(crumb_r1.url && !(ɵ$index_14_r3 === ɵ$count_14_r4 - 1) ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(crumb_r1.command && !(ɵ$index_14_r3 === ɵ$count_14_r4 - 1) ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!crumb_r1.url && !crumb_r1.command || ɵ$index_14_r3 === ɵ$count_14_r4 - 1 ? 3 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!(ɵ$index_14_r3 === ɵ$count_14_r4 - 1) ? 4 : -1);
} }
function HeaderComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r4.unreadCount());
} }
function HeaderComponent_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22)(1, "h3");
    i0.ɵɵtext(2, "Notifications");
    i0.ɵɵelementEnd()();
} }
function HeaderComponent_ng_template_15_For_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 27);
} }
function HeaderComponent_ng_template_15_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵlistener("click", function HeaderComponent_ng_template_15_For_2_Template_div_click_0_listener() { const notification_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r4 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r4.markAsRead(notification_r7)); });
    i0.ɵɵconditionalCreate(1, HeaderComponent_ng_template_15_For_2_Conditional_1_Template, 1, 0, "div", 27);
    i0.ɵɵelementStart(2, "div", 28)(3, "h4", 29);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 30);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 31);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const notification_r7 = ctx.$implicit;
    i0.ɵɵclassProp("unread", !notification_r7.read);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!notification_r7.read ? 1 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(notification_r7.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(notification_r7.message);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(notification_r7.time);
} }
function HeaderComponent_ng_template_15_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵelement(1, "i", 32);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No notifications");
    i0.ɵɵelementEnd()();
} }
function HeaderComponent_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵrepeaterCreate(1, HeaderComponent_ng_template_15_For_2_Template, 9, 6, "div", 24, _forTrack1);
    i0.ɵɵconditionalCreate(3, HeaderComponent_ng_template_15_Conditional_3_Template, 4, 0, "div", 25);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r4.notifications);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r4.notifications.length === 0 ? 3 : -1);
} }
function HeaderComponent_ng_template_16_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 33)(1, "button", 34);
    i0.ɵɵlistener("click", function HeaderComponent_ng_template_16_Conditional_0_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r8); const ctx_r4 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r4.markAllAsRead()); });
    i0.ɵɵelement(2, "i", 35);
    i0.ɵɵtext(3, " Mark all as read ");
    i0.ɵɵelementEnd()();
} }
function HeaderComponent_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, HeaderComponent_ng_template_16_Conditional_0_Template, 4, 0, "div", 33);
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r4.unreadCount() > 0 ? 0 : -1);
} }
export class HeaderComponent {
    pageTitle = '';
    breadcrumbs = [];
    // Notification Logic
    showDrawer = signal(false, ...(ngDevMode ? [{ debugName: "showDrawer" }] : []));
    notifications = [];
    unreadCount = signal(0, ...(ngDevMode ? [{ debugName: "unreadCount" }] : []));
    router = inject(Router);
    headerService = inject(HeaderService);
    notificationService = inject(NotificationService);
    auth = inject(AuthService);
    constructor() { }
    ngOnInit() {
        // Check for overridden breadcrumbs first
        this.headerService.breadcrumbs$.subscribe(crumbs => {
            if (crumbs.length > 0) {
                this.breadcrumbs = crumbs;
            }
            else {
                // Fallback to Router Logic using current URL (safeguard)
                this.updateFromRouter(this.router.url);
            }
        });
        this.headerService.title$.subscribe(title => {
            if (title)
                this.pageTitle = title;
        });
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd), map(() => this.router.url))
            .subscribe((url) => {
            // On navigation, reset overrides and update from router
            this.headerService.reset();
            this.updateFromRouter(url);
        });
        // Initial load
        this.updateFromRouter(this.router.url);
        this.loadNotifications();
    }
    formatTimeAgo(createdAt) {
        const date = new Date(createdAt);
        const now = new Date();
        const sec = Math.floor((now.getTime() - date.getTime()) / 1000);
        if (sec < 60)
            return 'Just now';
        const min = Math.floor(sec / 60);
        if (min < 60)
            return `${min} minute${min !== 1 ? 's' : ''} ago`;
        const hr = Math.floor(min / 60);
        if (hr < 24)
            return `${hr} hour${hr !== 1 ? 's' : ''} ago`;
        const day = Math.floor(hr / 24);
        if (day < 7)
            return `${day} day${day !== 1 ? 's' : ''} ago`;
        return date.toLocaleDateString();
    }
    loadNotifications() {
        if (!this.auth.isAuthenticated())
            return;
        this.notificationService.getNotifications().subscribe({
            next: (res) => {
                this.notifications = res.notifications.map((n) => ({
                    id: n.id,
                    title: n.title,
                    message: n.message || '',
                    time: this.formatTimeAgo(n.createdAt),
                    read: n.read,
                    link: n.link ?? null,
                }));
                this.unreadCount.set(res.unreadCount);
            },
            error: () => { },
        });
    }
    updateFromRouter(url) {
        const info = this.getPageInfo(url);
        // Only set if not already set by service (though we reset service on nav, so this is safe)
        // Assuming headerService has these methods or they are placeholders for future implementation
        // For now, we'll just assign directly as the service reset should handle it.
        this.pageTitle = info.title;
        this.breadcrumbs = info.breadcrumbs;
    }
    getPageInfo(url) {
        let title = 'Dashboard';
        let breadcrumbs = [];
        // Default Home
        const home = { label: 'Home', icon: 'pi pi-home', url: '/dashboard' };
        // When adding new app routes: add a case here with title and breadcrumbs so the header shows the component name and breadcrumbs.
        if (url.includes('/dashboard')) {
            title = 'Dashboard';
            breadcrumbs = [];
        }
        else if (url.includes('/profile-settings')) {
            title = 'Profile Settings';
            breadcrumbs = [{ label: 'Profile Settings', url: '/profile-settings' }];
        }
        else if (url.includes('/change-password')) {
            title = 'Change Password';
            breadcrumbs = [{ label: 'Change Password', url: '/change-password' }];
        }
        else if (url.includes('/courses')) {
            title = 'My Course Syllabus';
            breadcrumbs = [{ label: 'My Course Syllabus', url: '/courses' }];
        }
        else if (url.includes('/materials')) {
            title = 'Materials';
            breadcrumbs = [{ label: 'Materials', url: '/materials' }];
        }
        else if (url.includes('/classes/recorded')) {
            title = 'Recorded Classes';
            breadcrumbs = [{ label: 'Classes' }, { label: 'Recorded Classes', url: '/classes/recorded' }];
        }
        else if (url.includes('/classes/live')) {
            title = 'Live Stream';
            breadcrumbs = [{ label: 'Classes' }, { label: 'Live Stream', url: '/classes/live' }];
        }
        else if (url.includes('/tasks')) {
            title = 'Tasks';
            breadcrumbs = [{ label: 'Tasks', url: '/tasks' }];
        }
        else if (url.includes('/batches/')) {
            // Batch detail page
            title = 'Batch Details';
            breadcrumbs = [{ label: 'Batches', url: '/batches' }, { label: 'Batch Details' }];
        }
        else if (url.includes('/batches')) {
            title = 'Batches';
            breadcrumbs = [{ label: 'Batches', url: '/batches' }];
        }
        else if (url.includes('/exams/assessment')) {
            title = 'Online Assessment';
            breadcrumbs = [{ label: 'Exams' }, { label: 'Online Assessment' }];
        }
        else if (url.includes('/exams/docs')) {
            title = 'Exam Documents';
            breadcrumbs = [{ label: 'Exams' }, { label: 'Exam Documents' }];
        }
        else if (url.includes('/projects')) {
            title = 'Projects';
            breadcrumbs = [{ label: 'Projects', url: '/projects' }];
        }
        else if (url.includes('/add-users')) {
            title = 'Users';
            breadcrumbs = [{ label: 'Users', url: '/add-users' }];
        }
        // Don't add home if it's dashboard (optional preference, but keeping consistent)
        // The logic above already sets breadcrumbs to empty for dashboard.
        // If breadcrumbs are not empty, prepend home.
        if (breadcrumbs.length > 0) {
            return { title, breadcrumbs: [home, ...breadcrumbs] };
        }
        return { title, breadcrumbs: [] };
    }
    // Notification Methods
    openNotifications() {
        this.loadNotifications();
        this.showDrawer.set(true);
    }
    closeDrawer() {
        this.showDrawer.set(false);
    }
    markAllAsRead() {
        this.notificationService.markAllAsRead().subscribe({
            next: () => {
                this.notifications = this.notifications.map((n) => ({ ...n, read: true }));
                this.unreadCount.set(0);
            },
        });
    }
    markAsRead(notification) {
        if (notification.read)
            return;
        this.notificationService.markAsRead(notification.id).subscribe({
            next: () => {
                this.notifications = this.notifications.map((n) => n.id === notification.id ? { ...n, read: true } : n);
                this.unreadCount.update((c) => Math.max(0, c - 1));
            },
        });
    }
    static ɵfac = function HeaderComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HeaderComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HeaderComponent, selectors: [["sqx-header"]], decls: 17, vars: 4, consts: [[1, "app-header"], [1, "header-content"], [1, "header-left"], [1, "title-section"], [1, "page-title"], [1, "breadcrumbs"], [1, "breadcrumb-item"], [1, "header-right"], [1, "notification-btn", 3, "click"], [1, "pi", "pi-bell"], [1, "badge"], ["position", "right", 3, "visibleChange", "onHide", "visible", "showCloseIcon"], ["pTemplate", "header"], ["pTemplate", "content"], ["pTemplate", "footer"], ["tooltipPosition", "bottom", 1, "breadcrumb-link", 3, "routerLink", "pTooltip"], ["tooltipPosition", "bottom", 1, "breadcrumb-link", "clickable", 3, "pTooltip"], ["tooltipPosition", "bottom", 1, "breadcrumb-current", 3, "pTooltip"], [1, "pi", "pi-chevron-right", "breadcrumb-separator"], [3, "class"], [1, "crumb-text"], ["tooltipPosition", "bottom", 1, "breadcrumb-link", "clickable", 3, "click", "pTooltip"], [1, "drawer-header"], [1, "notifications-list"], [1, "notification-item", 3, "unread"], [1, "empty-state"], [1, "notification-item", 3, "click"], [1, "notification-indicator"], [1, "notification-content"], [1, "notification-title"], [1, "notification-message"], [1, "notification-time"], [1, "pi", "pi-inbox"], [1, "drawer-footer"], [1, "mark-all-btn", 3, "click"], [1, "pi", "pi-check-circle"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4);
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "nav", 5);
            i0.ɵɵrepeaterCreate(7, HeaderComponent_For_8_Template, 5, 4, "span", 6, _forTrack0);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(9, "div", 7)(10, "button", 8);
            i0.ɵɵlistener("click", function HeaderComponent_Template_button_click_10_listener() { return ctx.openNotifications(); });
            i0.ɵɵelement(11, "i", 9);
            i0.ɵɵconditionalCreate(12, HeaderComponent_Conditional_12_Template, 2, 1, "span", 10);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(13, "p-drawer", 11);
            i0.ɵɵlistener("visibleChange", function HeaderComponent_Template_p_drawer_visibleChange_13_listener($event) { return ctx.showDrawer.set($event); })("onHide", function HeaderComponent_Template_p_drawer_onHide_13_listener() { return ctx.closeDrawer(); });
            i0.ɵɵtemplate(14, HeaderComponent_ng_template_14_Template, 3, 0, "ng-template", 12)(15, HeaderComponent_ng_template_15_Template, 4, 1, "ng-template", 13)(16, HeaderComponent_ng_template_16_Template, 1, 1, "ng-template", 14);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.pageTitle);
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.breadcrumbs);
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.unreadCount() > 0 ? 12 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("visible", ctx.showDrawer())("showCloseIcon", true);
        } }, dependencies: [CommonModule, RouterLink, TooltipModule, i1.Tooltip, DrawerModule, i2.Drawer, i3.PrimeTemplate, BadgeModule], styles: [".app-header[_ngcontent-%COMP%] {\n    background: #F5F5F5;\n    border-bottom: 1px solid var(--sqx-color-primary);\n    position: sticky;\n    top: 0;\n    z-index: 50;\n}\n\n.header-content[_ngcontent-%COMP%] {\n    height: 64px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 0 var(--sqx-space-6);\n}\n\n.header-left[_ngcontent-%COMP%] {\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: var(--sqx-space-4);\n}\n\n.title-section[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 2px; // Increased space between breadcrumbs and title\n}\n\n.page-title[_ngcontent-%COMP%] {\n    font-size: 24px;\n    font-weight: 700;\n    color: var(--sqx-color-text);\n    margin: 0;\n    line-height: 1.2;\n}\n\n//[_ngcontent-%COMP%]   Breadcrumbs\n.breadcrumbs[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 14px;\n    color: var(--sqx-color-text-light);\n    flex-wrap: wrap; // Allow wrap on very small screens, or ellipsis? User implies ellipsis.\n\n    .breadcrumb-item {\n        display: flex;\n        align-items: center;\n        gap: 8px;\n        min-width: 0; // For flex item truncation\n    }\n\n    .breadcrumb-link,\n    .breadcrumb-current {\n        display: flex;\n        align-items: center;\n        gap: 6px;\n        text-decoration: none;\n        color: inherit;\n        transition: color 0.2s;\n\n        &.clickable {\n            cursor: pointer;\n\n            &:hover {\n                color: var(--primary-color);\n            }\n        }\n\n        .crumb-text {\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            max-width: 250px; // Default max width\n            display: inline-block;\n            vertical-align: middle;\n\n            @media (max-width: 768px) {\n                max-width: 150px;\n            }\n        }\n    }\n\n    .breadcrumb-link:hover {\n        color: var(--primary-color);\n    }\n\n    .breadcrumb-current {\n        font-weight: 500;\n        color: var(--sqx-color-text);\n    }\n\n    .breadcrumb-separator {\n        font-size: 10px;\n        color: #9CA3AF;\n        flex-shrink: 0;\n    }\n}\n\n.header-right[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: var(--sqx-space-3);\n}\n\n.notification-btn[_ngcontent-%COMP%] {\n    position: relative;\n    width: 40px;\n    height: 40px;\n    border-radius: 50%;\n    border: none;\n    background: white;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    transition: all 0.2s ease;\n\n    i {\n        font-size: 20px;\n        color: var(--sqx-color-text);\n    }\n\n    &:hover {\n        background: var(--sqx-color-bg);\n    }\n\n    .badge {\n        position: absolute;\n        top: 6px;\n        right: 6px;\n        background: var(--sqx-color-danger);\n        color: white;\n        font-size: 10px;\n        font-weight: 600;\n        padding: 2px 5px;\n        border-radius: 10px;\n        min-width: 16px;\n        text-align: center;\n    }\n}\n\n//[_ngcontent-%COMP%]   Notification[_ngcontent-%COMP%]   Drawer[_ngcontent-%COMP%]   Styles\n[_ngcontent-%COMP%]  .p-drawer {\n    .p-drawer-header {\n        padding: 0 !important;\n        border-bottom: 1px solid var(--sqx-color-border);\n\n        .p-drawer-title {\n            padding: var(--sqx-space-4) var(--sqx-space-5);\n            flex: 1;\n        }\n\n        .p-drawer-close-button {\n            margin: 0;\n            padding: var(--sqx-space-4) var(--sqx-space-5);\n        }\n    }\n\n    .p-drawer-content {\n        padding: 0 !important;\n    }\n\n    .drawer-header {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        width: 100%;\n        padding: 0;\n\n        h3 {\n            font-size: 20px;\n            font-weight: 700;\n            color: var(--sqx-color-text);\n            margin: 0;\n            padding: var(--sqx-space-4) var(--sqx-space-5);\n        }\n    }\n\n    .drawer-footer {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        padding: 0;\n        border-top: 1px solid var(--sqx-color-border);\n        background: white;\n\n        .mark-all-btn {\n            width: 100%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            gap: 8px;\n            padding: 16px;\n            border: none;\n            background: var(--sqx-color-primary);\n            color: white;\n            font-size: 14px;\n            font-weight: 600;\n            cursor: pointer;\n            border-radius: var(--sqx-radius-md);\n            transition: all 0.2s ease;\n\n            i {\n                font-size: 16px;\n            }\n\n            &:hover {\n                background: #5b4cdb;\n            }\n        }\n    }\n\n    .notifications-list {\n        display: flex;\n        flex-direction: column;\n        gap: var(--sqx-space-2);\n        padding: var(--sqx-space-4);\n    }\n\n    .notification-item {\n        position: relative;\n        padding: var(--sqx-space-4);\n        border-radius: var(--sqx-radius-md);\n        cursor: pointer;\n        transition: all 0.2s ease;\n        border: 1px solid transparent;\n\n        &.unread {\n            background: #f3f4ff;\n            border-color: var(--sqx-color-primary);\n\n            .notification-indicator {\n                display: block;\n            }\n        }\n\n        &:hover {\n            background: var(--sqx-color-bg);\n        }\n\n        .notification-indicator {\n            display: none;\n            position: absolute;\n            right: 12px;\n            top: 12px;\n            width: 8px;\n            height: 8px;\n            border-radius: 50%;\n            background: var(--sqx-color-primary);\n        }\n\n        .notification-content {\n            display: flex;\n            flex-direction: column;\n            gap: 6px;\n            padding-right: 20px;\n        }\n\n        .notification-title {\n            font-size: 15px;\n            font-weight: 600;\n            color: var(--sqx-color-text);\n            margin: 0;\n        }\n\n        .notification-message {\n            font-size: 14px;\n            line-height: 1.5;\n            color: var(--sqx-color-text-light);\n            margin: 0;\n        }\n\n        .notification-time {\n            font-size: 12px;\n            color: var(--sqx-color-muted);\n        }\n    }\n\n    .empty-state {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: center;\n        padding: var(--sqx-space-8);\n        text-align: center;\n\n        i {\n            font-size: 48px;\n            color: var(--sqx-color-muted);\n            margin-bottom: var(--sqx-space-4);\n        }\n\n        p {\n            font-size: 14px;\n            color: var(--sqx-color-text-light);\n            margin: 0;\n        }\n    }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HeaderComponent, [{
        type: Component,
        args: [{ selector: 'sqx-header', standalone: true, imports: [CommonModule, RouterLink, TooltipModule, DrawerModule, BadgeModule], template: "<header class=\"app-header\">\n    <div class=\"header-content\">\n        <div class=\"header-left\">\n            <div class=\"title-section\">\n                <h1 class=\"page-title\">{{ pageTitle }}</h1>\n                <nav class=\"breadcrumbs\">\n                    @for (crumb of breadcrumbs; track crumb.label; let last = $last) {\n                    <span class=\"breadcrumb-item\">\n                        <!-- If URL exists, routerLink -->\n                        @if (crumb.url && !last) {\n                        <a [routerLink]=\"crumb.url\" class=\"breadcrumb-link\" [pTooltip]=\"crumb.title || crumb.label\"\n                            tooltipPosition=\"bottom\">\n                            @if (crumb.icon) { <i [class]=\"crumb.icon\"></i> }\n                            <span class=\"crumb-text\">{{ crumb.label }}</span>\n                        </a>\n                        }\n                        <!-- If Command exists (internal nav), click handler -->\n                        @if (crumb.command && !last) {\n                        <a (click)=\"crumb.command()\" class=\"breadcrumb-link clickable\"\n                            [pTooltip]=\"crumb.title || crumb.label\" tooltipPosition=\"bottom\">\n                            @if (crumb.icon) { <i [class]=\"crumb.icon\"></i> }\n                            <span class=\"crumb-text\">{{ crumb.label }}</span>\n                        </a>\n                        }\n                        <!-- If neither or last, just text -->\n                        @if ((!crumb.url && !crumb.command) || last) {\n                        <span class=\"breadcrumb-current\" [pTooltip]=\"crumb.title || crumb.label\"\n                            tooltipPosition=\"bottom\">\n                            @if (crumb.icon) { <i [class]=\"crumb.icon\"></i> }\n                            <span class=\"crumb-text\">{{ crumb.label }}</span>\n                        </span>\n                        }\n\n                        @if (!last) {\n                        <i class=\"pi pi-chevron-right breadcrumb-separator\"></i>\n                        }\n                    </span>\n                    }\n                </nav>\n            </div>\n        </div>\n\n        <div class=\"header-right\">\n            <button class=\"notification-btn\" (click)=\"openNotifications()\">\n                <i class=\"pi pi-bell\"></i>\n                @if (unreadCount() > 0) {\n                <span class=\"badge\">{{ unreadCount() }}</span>\n                }\n            </button>\n        </div>\n    </div>\n</header>\n\n<!-- Notification Drawer -->\n<p-drawer [visible]=\"showDrawer()\" (visibleChange)=\"showDrawer.set($event)\" position=\"right\" [showCloseIcon]=\"true\" (onHide)=\"closeDrawer()\">\n    <ng-template pTemplate=\"header\">\n        <div class=\"drawer-header\">\n            <h3>Notifications</h3>\n        </div>\n    </ng-template>\n\n    <ng-template pTemplate=\"content\">\n        <div class=\"notifications-list\">\n            @for (notification of notifications; track notification.id) {\n            <div class=\"notification-item\" [class.unread]=\"!notification.read\" (click)=\"markAsRead(notification)\">\n                @if (!notification.read) {\n                <div class=\"notification-indicator\"></div>\n                }\n                <div class=\"notification-content\">\n                    <h4 class=\"notification-title\">{{ notification.title }}</h4>\n                    <p class=\"notification-message\">{{ notification.message }}</p>\n                    <span class=\"notification-time\">{{ notification.time }}</span>\n                </div>\n            </div>\n            }\n\n            @if (notifications.length === 0) {\n            <div class=\"empty-state\">\n                <i class=\"pi pi-inbox\"></i>\n                <p>No notifications</p>\n            </div>\n            }\n        </div>\n    </ng-template>\n\n    <ng-template pTemplate=\"footer\">\n        @if (unreadCount() > 0) {\n        <div class=\"drawer-footer\">\n            <button class=\"mark-all-btn\" (click)=\"markAllAsRead()\">\n                <i class=\"pi pi-check-circle\"></i>\n                Mark all as read\n            </button>\n        </div>\n        }\n    </ng-template>\n</p-drawer>", styles: [".app-header {\n    background: #F5F5F5;\n    border-bottom: 1px solid var(--sqx-color-primary);\n    position: sticky;\n    top: 0;\n    z-index: 50;\n}\n\n.header-content {\n    height: 64px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 0 var(--sqx-space-6);\n}\n\n.header-left {\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: var(--sqx-space-4);\n}\n\n.title-section {\n    display: flex;\n    flex-direction: column;\n    gap: 2px; // Increased space between breadcrumbs and title\n}\n\n.page-title {\n    font-size: 24px;\n    font-weight: 700;\n    color: var(--sqx-color-text);\n    margin: 0;\n    line-height: 1.2;\n}\n\n// Breadcrumbs\n.breadcrumbs {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 14px;\n    color: var(--sqx-color-text-light);\n    flex-wrap: wrap; // Allow wrap on very small screens, or ellipsis? User implies ellipsis.\n\n    .breadcrumb-item {\n        display: flex;\n        align-items: center;\n        gap: 8px;\n        min-width: 0; // For flex item truncation\n    }\n\n    .breadcrumb-link,\n    .breadcrumb-current {\n        display: flex;\n        align-items: center;\n        gap: 6px;\n        text-decoration: none;\n        color: inherit;\n        transition: color 0.2s;\n\n        &.clickable {\n            cursor: pointer;\n\n            &:hover {\n                color: var(--primary-color);\n            }\n        }\n\n        .crumb-text {\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            max-width: 250px; // Default max width\n            display: inline-block;\n            vertical-align: middle;\n\n            @media (max-width: 768px) {\n                max-width: 150px;\n            }\n        }\n    }\n\n    .breadcrumb-link:hover {\n        color: var(--primary-color);\n    }\n\n    .breadcrumb-current {\n        font-weight: 500;\n        color: var(--sqx-color-text);\n    }\n\n    .breadcrumb-separator {\n        font-size: 10px;\n        color: #9CA3AF;\n        flex-shrink: 0;\n    }\n}\n\n.header-right {\n    display: flex;\n    align-items: center;\n    gap: var(--sqx-space-3);\n}\n\n.notification-btn {\n    position: relative;\n    width: 40px;\n    height: 40px;\n    border-radius: 50%;\n    border: none;\n    background: white;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    transition: all 0.2s ease;\n\n    i {\n        font-size: 20px;\n        color: var(--sqx-color-text);\n    }\n\n    &:hover {\n        background: var(--sqx-color-bg);\n    }\n\n    .badge {\n        position: absolute;\n        top: 6px;\n        right: 6px;\n        background: var(--sqx-color-danger);\n        color: white;\n        font-size: 10px;\n        font-weight: 600;\n        padding: 2px 5px;\n        border-radius: 10px;\n        min-width: 16px;\n        text-align: center;\n    }\n}\n\n// Notification Drawer Styles\n::ng-deep .p-drawer {\n    .p-drawer-header {\n        padding: 0 !important;\n        border-bottom: 1px solid var(--sqx-color-border);\n\n        .p-drawer-title {\n            padding: var(--sqx-space-4) var(--sqx-space-5);\n            flex: 1;\n        }\n\n        .p-drawer-close-button {\n            margin: 0;\n            padding: var(--sqx-space-4) var(--sqx-space-5);\n        }\n    }\n\n    .p-drawer-content {\n        padding: 0 !important;\n    }\n\n    .drawer-header {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        width: 100%;\n        padding: 0;\n\n        h3 {\n            font-size: 20px;\n            font-weight: 700;\n            color: var(--sqx-color-text);\n            margin: 0;\n            padding: var(--sqx-space-4) var(--sqx-space-5);\n        }\n    }\n\n    .drawer-footer {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        padding: 0;\n        border-top: 1px solid var(--sqx-color-border);\n        background: white;\n\n        .mark-all-btn {\n            width: 100%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            gap: 8px;\n            padding: 16px;\n            border: none;\n            background: var(--sqx-color-primary);\n            color: white;\n            font-size: 14px;\n            font-weight: 600;\n            cursor: pointer;\n            border-radius: var(--sqx-radius-md);\n            transition: all 0.2s ease;\n\n            i {\n                font-size: 16px;\n            }\n\n            &:hover {\n                background: #5b4cdb;\n            }\n        }\n    }\n\n    .notifications-list {\n        display: flex;\n        flex-direction: column;\n        gap: var(--sqx-space-2);\n        padding: var(--sqx-space-4);\n    }\n\n    .notification-item {\n        position: relative;\n        padding: var(--sqx-space-4);\n        border-radius: var(--sqx-radius-md);\n        cursor: pointer;\n        transition: all 0.2s ease;\n        border: 1px solid transparent;\n\n        &.unread {\n            background: #f3f4ff;\n            border-color: var(--sqx-color-primary);\n\n            .notification-indicator {\n                display: block;\n            }\n        }\n\n        &:hover {\n            background: var(--sqx-color-bg);\n        }\n\n        .notification-indicator {\n            display: none;\n            position: absolute;\n            right: 12px;\n            top: 12px;\n            width: 8px;\n            height: 8px;\n            border-radius: 50%;\n            background: var(--sqx-color-primary);\n        }\n\n        .notification-content {\n            display: flex;\n            flex-direction: column;\n            gap: 6px;\n            padding-right: 20px;\n        }\n\n        .notification-title {\n            font-size: 15px;\n            font-weight: 600;\n            color: var(--sqx-color-text);\n            margin: 0;\n        }\n\n        .notification-message {\n            font-size: 14px;\n            line-height: 1.5;\n            color: var(--sqx-color-text-light);\n            margin: 0;\n        }\n\n        .notification-time {\n            font-size: 12px;\n            color: var(--sqx-color-muted);\n        }\n    }\n\n    .empty-state {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: center;\n        padding: var(--sqx-space-8);\n        text-align: center;\n\n        i {\n            font-size: 48px;\n            color: var(--sqx-color-muted);\n            margin-bottom: var(--sqx-space-4);\n        }\n\n        p {\n            font-size: 14px;\n            color: var(--sqx-color-text-light);\n            margin: 0;\n        }\n    }\n}"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HeaderComponent, { className: "HeaderComponent", filePath: "src/app/modules/core/components/header/header.ts", lineNumber: 28 }); })();
