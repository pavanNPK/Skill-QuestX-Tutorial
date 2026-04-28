import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import * as i0 from "@angular/core";
import * as i1 from "primeng/carousel";
import * as i2 from "primeng/api";
import * as i3 from "primeng/button";
import * as i4 from "@angular/common";
const _forTrack0 = ($index, $item) => $item.title;
const _forTrack1 = ($index, $item) => $item.subject;
const _forTrack2 = ($index, $item) => $item.id;
const _forTrack3 = ($index, $item) => $item.name;
function DashboardComponent_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4)(1, "div", 65);
    i0.ɵɵelement(2, "i");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 66)(4, "div", 67);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 68);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 69);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 70)(11, "span");
    i0.ɵɵtext(12, "View");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(13, "i", 71);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const card_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("color", card_r1.color)("background-color", card_r1.bg);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(card_r1.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(card_r1.count);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(card_r1.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(card_r1.subtitle);
} }
function DashboardComponent_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 72)(1, "div", 73)(2, "span", 74);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2", 75);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 76);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "button", 77);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 78);
    i0.ɵɵelement(10, "div", 79);
    i0.ɵɵelementStart(11, "div", 80);
    i0.ɵɵelement(12, "i", 81);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const banner_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("background", "linear-gradient(135deg, " + banner_r2.color + " 0%, " + ctx_r2.adjustColor(banner_r2.color, -30) + " 100%)");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(banner_r2.subtitle);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(banner_r2.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(banner_r2.description);
    i0.ɵɵadvance();
    i0.ɵɵproperty("label", banner_r2.buttonText);
} }
function DashboardComponent_For_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14)(1, "div", 82);
    i0.ɵɵelement(2, "i");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 83)(4, "h4", 84);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 85);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 86)(9, "span", 87);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 88);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const exam_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background-color", exam_r4.color + "20")("color", exam_r4.color);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(exam_r4.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(exam_r4.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(exam_r4.date);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("color", exam_r4.color);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(exam_r4.grade);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", exam_r4.score, "/", exam_r4.total);
} }
function DashboardComponent_For_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16)(1, "div", 89)(2, "h4", 90);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 91);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 92)(7, "div", 93);
    i0.ɵɵelement(8, "div", 94);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 95);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const project_r5 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(project_r5.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Due: ", project_r5.dueDate);
    i0.ɵɵadvance(3);
    i0.ɵɵstyleProp("width", project_r5.progress, "%")("background-color", project_r5.statusColor);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background-color", project_r5.statusColor + "20")("color", project_r5.statusColor);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", project_r5.status, " ");
} }
function DashboardComponent_For_65_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36)(1, "div", 96);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 97);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 98);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const task_r6 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r6.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r6.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r6.timeline);
} }
function DashboardComponent_For_110_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 99);
    i0.ɵɵlistener("click", function DashboardComponent_For_110_Template_div_click_0_listener() { const day_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.selectDay(day_r8)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r8 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("empty", !day_r8)("active", day_r8 === ctx_r2.selectedDay)("today", ctx_r2.isToday(day_r8));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", day_r8 || "", " ");
} }
function DashboardComponent_For_115_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 101)(1, "div", 107);
    i0.ɵɵelement(2, "i", 108);
    i0.ɵɵelementEnd()();
} }
function DashboardComponent_For_115_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 100);
    i0.ɵɵconditionalCreate(1, DashboardComponent_For_115_Conditional_1_Template, 3, 0, "div", 101);
    i0.ɵɵelementStart(2, "h4", 102);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 103);
    i0.ɵɵelement(5, "i", 104);
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 103);
    i0.ɵɵelement(9, "i", 105);
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 103);
    i0.ɵɵelement(13, "i", 106);
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const job_r9 = ctx.$implicit;
    i0.ɵɵclassProp("locked", job_r9.locked);
    i0.ɵɵadvance();
    i0.ɵɵconditional(job_r9.locked ? 1 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(job_r9.title);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Location: ", job_r9.location);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Type: ", job_r9.type);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Website: ", job_r9.website);
} }
function DashboardComponent_For_124_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 116);
} }
function DashboardComponent_For_124_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 117);
} }
function DashboardComponent_For_124_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 118);
} }
function DashboardComponent_For_124_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64)(1, "div", 109);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 110);
    i0.ɵɵelement(4, "img", 111);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 112)(6, "h4", 113);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 114);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 115);
    i0.ɵɵconditionalCreate(11, DashboardComponent_For_124_Conditional_11_Template, 1, 0, "i", 116);
    i0.ɵɵconditionalCreate(12, DashboardComponent_For_124_Conditional_12_Template, 1, 0, "i", 117);
    i0.ɵɵconditionalCreate(13, DashboardComponent_For_124_Conditional_13_Template, 1, 0, "i", 118);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const student_r10 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵclassProp("top-3", student_r10.rank <= 3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(student_r10.rank);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", student_r10.image, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(student_r10.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", student_r10.score, " pts");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(student_r10.trend === "up" ? 11 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(student_r10.trend === "down" ? 12 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(student_r10.trend === "neutral" ? 13 : -1);
} }
export class DashboardComponent {
    currentDate = new Date();
    selectedDay = null;
    currentMonth = '';
    currentYear = 0;
    calendarDays = [];
    // Mock Data for Top Students
    students = [
        { name: 'Josh Anderson', rank: 1, score: 980, image: 'assets/images/avatar-1.jpg', trend: 'up' },
        { name: 'Sarah Williams', rank: 2, score: 950, image: 'assets/images/avatar-2.jpg', trend: 'up' },
        { name: 'Michael Brown', rank: 3, score: 920, image: 'assets/images/avatar-3.jpg', trend: 'down' },
        { name: 'Emily Davis', rank: 4, score: 890, image: 'assets/images/avatar-1.jpg', trend: 'neutral' }
    ];
    // Mock Data for Exam Results
    examResults = [
        { subject: 'Advanced UI Design', score: 85, total: 100, grade: 'A', date: 'Feb 10, 2025', icon: 'pi pi-palette', color: '#5B4BC4' },
        { subject: 'Python Basics', score: 92, total: 100, grade: 'A+', date: 'Feb 05, 2025', icon: 'pi pi-code', color: '#F59E0B' },
        { subject: 'Data Structures', score: 78, total: 100, grade: 'B+', date: 'Jan 28, 2025', icon: 'pi pi-database', color: '#10B981' }
    ];
    // Mock Data for Active Projects
    activeProjects = [
        { title: 'E-commerce App Design', dueDate: 'Feb 25, 2025', progress: 75, status: 'In Progress', statusColor: '#3B82F6' },
        { title: 'Python Web Scraper', dueDate: 'Feb 28, 2025', progress: 40, status: 'Pending', statusColor: '#F59E0B' },
        { title: 'Portfolio Website', dueDate: 'Mar 05, 2025', progress: 90, status: 'Review', statusColor: '#8B5CF6' }
    ];
    courseOverview = [
        { title: 'Total Courses', count: 12, subtitle: 'Total Courses Total Courses', icon: 'pi pi-briefcase', color: '#F97316', bg: '#FFF7ED' },
        { title: 'Completed Courses', count: 22, subtitle: 'Total Courses Total Courses', icon: 'pi pi-check-circle', color: '#10B981', bg: '#ECFDF5' },
        { title: 'In Progress', count: 3, subtitle: 'Total Courses Total Courses', icon: 'pi pi-spinner', color: '#3B82F6', bg: '#EFF6FF' },
        { title: 'Upcoming Classes', count: 2, subtitle: 'Total Courses Total Courses', icon: 'pi pi-video', color: '#8B5CF6', bg: '#F5F3FF' }
    ];
    dashboardBanners = [
        {
            title: 'Unlock Your Potential',
            subtitle: 'Premium Course',
            description: 'Master UI/UX Design with our advanced comprehensive course.',
            image: 'assets/images/banner-ui.png', // Placeholder, using CSS gradient mostly
            color: '#5B4BC4',
            buttonText: 'Explore Now'
        },
        {
            title: 'Python for Data Science',
            subtitle: 'Trending Now',
            description: 'Learn data analysis, visualization and machine learning.',
            image: 'assets/images/banner-python.png',
            color: '#F59E0B', // Orange/Amber
            buttonText: 'Start Learning'
        },
        {
            title: 'Full Stack Development',
            subtitle: 'Best Seller',
            description: 'Become a full stack developer with the MERN stack.',
            image: 'assets/images/banner-web.png',
            color: '#10B981', // Emerald
            buttonText: 'Join Class'
        }
    ];
    tasks = [
        {
            id: 1,
            name: 'Task 1 - Programming with Python',
            timeline: '21/02/2023 12:00 PM'
        },
        {
            id: 2,
            name: 'Task 2 - Introduction with flow structures in python language',
            timeline: '31/02/2023 12:00 PM'
        },
        {
            id: 3,
            name: 'Task 3 - Basic Functions in Python language',
            timeline: '05/03/2023 12:00 PM'
        },
        {
            id: 4,
            name: 'Task 4 - Loop Concepts in Python',
            timeline: '05/03/2023 12:00 PM'
        },
        {
            id: 5,
            name: 'Task 4 - GUI Development with Tkinter',
            timeline: '10/03/2023 12:00 PM'
        },
        {
            id: 6,
            name: 'Task 5 - Object-Oriented Programming (Classes and Objects)',
            timeline: '15/03/2023 12:00 PM'
        }
    ];
    jobs = [
        {
            title: 'GUI Freelancer at Tohands',
            location: 'Bangalore',
            type: 'Contract/ Freelance',
            website: 'www.smart.tohands.in/',
            icon: 'pi-briefcase',
            locked: true
        },
        {
            title: 'Design Engineer at OIZOM',
            location: 'Remote',
            type: 'Contract/ Freelance',
            website: 'www.oizom.in/',
            icon: 'pi-briefcase'
        },
        {
            title: 'Software Engineer at Alias & Cat',
            location: 'Remote',
            type: 'Contract/ Freelance',
            website: 'www.alias&cat.in/',
            icon: 'pi-briefcase'
        }
    ];
    courseProgress = 80;
    completedTasks = 12;
    unfinishedTasks = 3;
    ngOnInit() {
        this.selectedDay = this.currentDate.getDate();
        this.updateCalendar();
    }
    updateCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        this.currentYear = year;
        this.currentMonth = this.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        this.calendarDays = [];
        // Add empty cells for days before the first day
        for (let i = 0; i < firstDay; i++) {
            this.calendarDays.push(null);
        }
        // Add the days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            this.calendarDays.push(day);
        }
    }
    previousMonth() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
        this.updateCalendar();
    }
    nextMonth() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
        this.updateCalendar();
    }
    selectDay(day) {
        if (day) {
            this.selectedDay = day;
        }
    }
    isToday(day) {
        if (!day)
            return false;
        const today = new Date();
        return day === today.getDate() &&
            this.currentDate.getMonth() === today.getMonth() &&
            this.currentDate.getFullYear() === today.getFullYear();
    }
    get progressPercentage() {
        return (this.completedTasks / (this.completedTasks + this.unfinishedTasks)) * 100;
    }
    // Helper to darken/lighten hex color for gradient
    adjustColor(color, amount) {
        return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
    }
    static ɵfac = function DashboardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardComponent, selectors: [["sqx-dashboard"]], decls: 125, vars: 13, consts: [[1, "dashboard-container"], [1, "dashboard-content"], [1, "main-area"], [1, "overview-grid"], [1, "premium-summary-card"], [1, "banner-carousel-section"], [3, "value", "numVisible", "numScroll", "circular", "autoplayInterval", "showIndicators"], ["pTemplate", "item"], [1, "extensions-grid"], [1, "extension-card"], [1, "card-header"], [1, "section-title"], [1, "view-all-btn"], [1, "exam-list"], [1, "exam-item"], [1, "project-list"], [1, "project-item"], [1, "feedbacks-section"], [1, "feedbacks-card"], [1, "feedback-item"], [1, "feedback-header"], [1, "author-info"], ["src", "/assets/images/avatar-2.jpg", "alt", "Author", "onError", "this.src='/assets/images/default-avatar.png'", 1, "author-avatar"], [1, "feedback-author"], [1, "feedback-role"], [1, "feedback-rating"], [1, "pi", "pi-star-fill"], [1, "pi", "pi-star"], [1, "feedback-text"], [1, "tasks-section"], [1, "tasks-table"], [1, "table-header"], [1, "th", "th-num"], [1, "th", "th-name"], [1, "th", "th-timeline"], [1, "table-body"], [1, "table-row"], [1, "sidebar-area"], [1, "progress-card"], [1, "progress-chart"], ["viewBox", "0 0 200 200", 1, "donut-chart"], ["cx", "100", "cy", "100", "r", "80", "fill", "none", "stroke", "#F3F4F6", "stroke-width", "15"], ["cx", "100", "cy", "100", "r", "80", "fill", "none", "stroke-width", "15", "stroke-linecap", "round", "transform", "rotate(-90 100 100)"], ["x", "100", "y", "100", "dy", ".3em", "text-anchor", "middle", "font-size", "28", "font-weight", "700", "fill", "#1f2937"], [1, "progress-legend"], [1, "legend-item"], [1, "legend-dot", 2, "background-color", "var(--sqx-color-primary)"], [1, "legend-dot", 2, "background-color", "#F3F4F6"], [1, "calendar-widget"], [1, "calendar-header"], [1, "calendar-nav", 3, "click"], [1, "pi", "pi-angle-left"], [1, "calendar-month"], [1, "pi", "pi-angle-right"], [1, "calendar-grid"], [1, "calendar-day-label"], [1, "calendar-day", 3, "empty", "active", "today"], [1, "job-board-widget"], [1, "widget-title"], [1, "job-card", 3, "locked"], [1, "students-widget"], [1, "widget-header"], [1, "view-all-text"], [1, "student-list"], [1, "student-item"], [1, "card-icon-wrapper"], [1, "card-content"], [1, "card-count"], [1, "card-title"], [1, "card-subtitle"], [1, "card-action"], [1, "pi", "pi-arrow-right"], [1, "premium-banner"], [1, "banner-content"], [1, "banner-subtitle"], [1, "banner-title"], [1, "banner-desc"], ["pButton", "", 1, "banner-btn", "p-button-raised", "p-button-rounded", 3, "label"], [1, "banner-visual"], [1, "circle-shape"], [1, "glass-card"], [1, "pi", "pi-bolt", 2, "font-size", "2rem", "color", "white"], [1, "exam-icon"], [1, "exam-details"], [1, "exam-subject"], [1, "exam-date"], [1, "exam-score"], [1, "grade"], [1, "score-text"], [1, "project-info"], [1, "project-title"], [1, "project-due"], [1, "project-status"], [1, "progress-bar"], [1, "fill"], [1, "status-badge"], [1, "td", "td-num"], [1, "td", "td-name"], [1, "td", "td-timeline"], [1, "calendar-day", 3, "click"], [1, "job-card"], [1, "lock-overlay"], [1, "job-title"], [1, "job-detail"], [1, "pi", "pi-map-marker"], [1, "pi", "pi-briefcase"], [1, "pi", "pi-globe"], [1, "lock-icon-wrapper"], [1, "pi", "pi-lock"], [1, "rank-badge"], [1, "student-avatar"], ["alt", "Student", "onError", "this.src='/assets/images/default-avatar.png'", 3, "src"], [1, "student-info"], [1, "student-name"], [1, "student-points"], [1, "student-trend"], [1, "pi", "pi-arrow-up", 2, "color", "#10B981"], [1, "pi", "pi-arrow-down", 2, "color", "#EF4444"], [1, "pi", "pi-minus", 2, "color", "#9CA3AF"]], template: function DashboardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
            i0.ɵɵrepeaterCreate(4, DashboardComponent_For_5_Template, 14, 9, "div", 4, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div", 5)(7, "p-carousel", 6);
            i0.ɵɵtemplate(8, DashboardComponent_ng_template_8_Template, 13, 6, "ng-template", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 8)(10, "div", 9)(11, "div", 10)(12, "h3", 11);
            i0.ɵɵtext(13, "Recent Exam Results");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "button", 12);
            i0.ɵɵtext(15, "View All");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "div", 13);
            i0.ɵɵrepeaterCreate(17, DashboardComponent_For_18_Template, 13, 13, "div", 14, _forTrack1);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "div", 9)(20, "div", 10)(21, "h3", 11);
            i0.ɵɵtext(22, "Active Projects");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "button", 12);
            i0.ɵɵtext(24, "View All");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "div", 15);
            i0.ɵɵrepeaterCreate(26, DashboardComponent_For_27_Template, 11, 11, "div", 16, _forTrack0);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(28, "div", 17)(29, "div", 18)(30, "div", 10)(31, "h3", 11);
            i0.ɵɵtext(32, "Feedbacks");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "button", 12);
            i0.ɵɵtext(34, "View All");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(35, "div", 19)(36, "div", 20)(37, "div", 21);
            i0.ɵɵelement(38, "img", 22);
            i0.ɵɵelementStart(39, "div")(40, "h4", 23);
            i0.ɵɵtext(41, "Charil Polamraju");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "span", 24);
            i0.ɵɵtext(43, "Student");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(44, "div", 25);
            i0.ɵɵelement(45, "i", 26)(46, "i", 26)(47, "i", 26)(48, "i", 26)(49, "i", 27);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "p", 28);
            i0.ɵɵtext(51, " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. ");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(52, "div", 29)(53, "h3", 11);
            i0.ɵɵtext(54, "Tasks");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "div", 30)(56, "div", 31)(57, "div", 32);
            i0.ɵɵtext(58, "#");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "div", 33);
            i0.ɵɵtext(60, "Task Name");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(61, "div", 34);
            i0.ɵɵtext(62, "Timeline");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(63, "div", 35);
            i0.ɵɵrepeaterCreate(64, DashboardComponent_For_65_Template, 7, 3, "div", 36, _forTrack2);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(66, "div", 37)(67, "div", 38)(68, "h3", 11);
            i0.ɵɵtext(69, "Course Progress");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "div", 39);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(71, "svg", 40);
            i0.ɵɵelement(72, "circle", 41)(73, "circle", 42);
            i0.ɵɵelementStart(74, "text", 43);
            i0.ɵɵtext(75);
            i0.ɵɵpipe(76, "number");
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(77, "div", 44)(78, "div", 45);
            i0.ɵɵelement(79, "span", 46);
            i0.ɵɵelementStart(80, "span");
            i0.ɵɵtext(81, "Completed");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(82, "div", 45);
            i0.ɵɵelement(83, "span", 47);
            i0.ɵɵelementStart(84, "span");
            i0.ɵɵtext(85, "Remaining");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(86, "div", 48)(87, "div", 49)(88, "button", 50);
            i0.ɵɵlistener("click", function DashboardComponent_Template_button_click_88_listener() { return ctx.previousMonth(); });
            i0.ɵɵelement(89, "i", 51);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(90, "span", 52);
            i0.ɵɵtext(91);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(92, "button", 50);
            i0.ɵɵlistener("click", function DashboardComponent_Template_button_click_92_listener() { return ctx.nextMonth(); });
            i0.ɵɵelement(93, "i", 53);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(94, "div", 54)(95, "div", 55);
            i0.ɵɵtext(96, "Su");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(97, "div", 55);
            i0.ɵɵtext(98, "Mo");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(99, "div", 55);
            i0.ɵɵtext(100, "Tu");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(101, "div", 55);
            i0.ɵɵtext(102, "We");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(103, "div", 55);
            i0.ɵɵtext(104, "Th");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(105, "div", 55);
            i0.ɵɵtext(106, "Fr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(107, "div", 55);
            i0.ɵɵtext(108, "Sa");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(109, DashboardComponent_For_110_Template, 2, 7, "div", 56, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(111, "div", 57)(112, "h3", 58);
            i0.ɵɵtext(113, "Job-Board \uD83D\uDE80");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(114, DashboardComponent_For_115_Template, 16, 7, "div", 59, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(116, "div", 60)(117, "div", 61)(118, "h3", 58);
            i0.ɵɵtext(119, "Top Students");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(120, "span", 62);
            i0.ɵɵtext(121, "View All");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(122, "div", 63);
            i0.ɵɵrepeaterCreate(123, DashboardComponent_For_124_Template, 14, 9, "div", 64, _forTrack3);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵrepeater(ctx.courseOverview);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("value", ctx.dashboardBanners)("numVisible", 1)("numScroll", 1)("circular", true)("autoplayInterval", 5000)("showIndicators", false);
            i0.ɵɵadvance(10);
            i0.ɵɵrepeater(ctx.examResults);
            i0.ɵɵadvance(9);
            i0.ɵɵrepeater(ctx.activeProjects);
            i0.ɵɵadvance(38);
            i0.ɵɵrepeater(ctx.tasks);
            i0.ɵɵadvance(9);
            i0.ɵɵattribute("stroke", "var(--sqx-color-primary)")("stroke-dasharray", ctx.progressPercentage * 5.027 + " 502.7");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(76, 10, ctx.progressPercentage, "1.0-0"), "%");
            i0.ɵɵadvance(16);
            i0.ɵɵtextInterpolate(ctx.currentMonth);
            i0.ɵɵadvance(18);
            i0.ɵɵrepeater(ctx.calendarDays);
            i0.ɵɵadvance(5);
            i0.ɵɵrepeater(ctx.jobs);
            i0.ɵɵadvance(9);
            i0.ɵɵrepeater(ctx.students);
        } }, dependencies: [CommonModule, CarouselModule, i1.Carousel, i2.PrimeTemplate, ButtonModule, i3.ButtonDirective, i4.DecimalPipe], styles: [".dashboard-container[_ngcontent-%COMP%] {\n    padding: var(--sqx-space-8);\n    // max-width: 1600px;\n}\n\n.dashboard-header[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: var(--sqx-space-8);\n\n    .page-title {\n        font-size: 32px;\n        font-weight: 700;\n        color: var(--sqx-color-text);\n        margin: 0;\n    }\n}\n\n.notification-btn[_ngcontent-%COMP%] {\n    position: relative;\n    padding: 12px;\n    border-radius: 50%;\n    border: none;\n    background: white;\n    cursor: pointer;\n    transition: all 0.2s ease;\n\n    i {\n        font-size: 20px;\n        color: var(--sqx-color-text);\n    }\n\n    &:hover {\n        background: #F9FAFB;\n    }\n\n    .badge {\n        position: absolute;\n        top: 6px;\n        right: 6px;\n        background: var(--sqx-color-danger);\n        color: white;\n        font-size: 10px;\n        font-weight: 600;\n        padding: 2px 5px;\n        border-radius: 10px;\n        min-width: 16px;\n        text-align: center;\n    }\n}\n\n.dashboard-content[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr 340px; // Slightly wider sidebar for calendar\n    gap: var(--sqx-space-6);\n}\n\n.main-area[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: var(--sqx-space-6);\n    min-width: 0; // Fix for grid overflow/overlap issues\n}\n\n//[_ngcontent-%COMP%]   Course[_ngcontent-%COMP%]   Overview[_ngcontent-%COMP%]   Grid\n.overview-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    gap: var(--sqx-space-5);\n}\n\n//[_ngcontent-%COMP%]   Extensions[_ngcontent-%COMP%]   Grid[_ngcontent-%COMP%]   (Exams & Projects)\n.extensions-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: var(--sqx-space-6);\n    margin-bottom: var(--sqx-space-6);\n}\n\n.extension-card[_ngcontent-%COMP%] {\n    background: white;\n    padding: var(--sqx-space-6);\n    border-radius: var(--sqx-radius-lg);\n\n    .card-header {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        margin-bottom: 1.5rem;\n\n        .section-title {\n            margin: 0;\n            font-size: 18px;\n        }\n\n        .view-all-btn {\n            background: transparent;\n            border: none;\n            color: var(--primary-color);\n            font-weight: 600;\n            cursor: pointer;\n            font-size: 13px;\n        }\n    }\n}\n\n//[_ngcontent-%COMP%]   Exam[_ngcontent-%COMP%]   List[_ngcontent-%COMP%]   Styles\n.exam-list[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n\n    .exam-item {\n        display: flex;\n        align-items: center;\n        padding: 12px;\n        border-radius: 12px;\n        background: #F9FAFB;\n        transition: transform 0.2s;\n\n        &:hover {\n            transform: translateX(5px);\n        }\n\n        .exam-icon {\n            width: 40px;\n            height: 40px;\n            border-radius: 10px;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            margin-right: 1rem;\n\n            i {\n                font-size: 18px;\n            }\n        }\n\n        .exam-details {\n            flex: 1;\n\n            .exam-subject {\n                font-size: 14px;\n                font-weight: 600;\n                color: var(--sqx-color-text);\n                margin: 0 0 4px 0;\n            }\n\n            .exam-date {\n                font-size: 12px;\n                color: var(--sqx-color-muted);\n            }\n        }\n\n        .exam-score {\n            text-align: right;\n\n            .grade {\n                display: block;\n                font-size: 16px;\n                font-weight: 700;\n            }\n\n            .score-text {\n                font-size: 12px;\n                color: var(--sqx-color-muted);\n            }\n        }\n    }\n}\n\n//[_ngcontent-%COMP%]   Project[_ngcontent-%COMP%]   List[_ngcontent-%COMP%]   Styles\n.project-list[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 1.25rem;\n\n    .project-item {\n        .project-info {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            margin-bottom: 8px;\n\n            .project-title {\n                font-size: 14px;\n                font-weight: 600;\n                color: var(--sqx-color-text);\n                margin: 0;\n            }\n\n            .project-due {\n                font-size: 11px;\n                color: var(--sqx-color-muted);\n            }\n        }\n\n        .project-status {\n            display: flex;\n            align-items: center;\n            gap: 1rem;\n\n            .progress-bar {\n                flex: 1;\n                height: 6px;\n                background: #F3F4F6;\n                border-radius: 3px;\n                overflow: hidden;\n\n                .fill {\n                    height: 100%;\n                    border-radius: 3px;\n                }\n            }\n\n            .status-badge {\n                font-size: 10px;\n                font-weight: 600;\n                padding: 4px 8px;\n                border-radius: 12px;\n                text-transform: uppercase;\n            }\n        }\n    }\n}\n\n\n.premium-summary-card[_ngcontent-%COMP%] {\n    background: white;\n    border-radius: 20px;\n    padding: 1.5rem;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    min-height: 160px;\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);\n    transition: all 0.3s ease;\n    cursor: pointer;\n    position: relative;\n    overflow: hidden;\n\n    &:hover {\n        transform: translateY(-5px);\n        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);\n\n        .card-action {\n            color: var(--primary-color);\n        }\n    }\n\n    .card-icon-wrapper {\n        width: 48px;\n        height: 48px;\n        border-radius: 12px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        margin-bottom: 1rem;\n\n        i {\n            font-size: 20px;\n            font-weight: bold;\n        }\n    }\n\n    .card-content {\n        .card-count {\n            font-size: 28px;\n            font-weight: 800;\n            color: var(--sqx-color-text);\n            line-height: 1;\n            margin-bottom: 4px;\n        }\n\n        .card-title {\n            font-size: 14px;\n            font-weight: 600;\n            color: var(--sqx-color-text);\n            margin-bottom: 4px;\n        }\n\n        .card-subtitle {\n            font-size: 11px;\n            color: var(--sqx-color-muted);\n        }\n    }\n\n    .card-action {\n        position: absolute;\n        top: 1.5rem;\n        right: 1.5rem;\n        display: flex;\n        align-items: center;\n        gap: 4px;\n        font-size: 12px;\n        font-weight: 600;\n        color: var(--sqx-color-muted);\n        transition: color 0.2s;\n\n        i {\n            font-size: 10px;\n        }\n    }\n}\n\n.info-card[_ngcontent-%COMP%] {\n    padding: var(--sqx-space-6);\n    border-radius: 8px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--sqx-space-4);\n\n    &.card-purple {\n        background-color: var(--sqx-color-card-purple);\n    }\n\n    &.card-yellow {\n        background-color: var(--sqx-color-card-yellow);\n    }\n\n    &.card-violet {\n        background-color: var(--sqx-color-card-violet);\n    }\n\n    .card-icon {\n        width: 44px;\n        height: 44px;\n        border-radius: 10px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n\n        i {\n            font-size: 20px;\n            color: white;\n        }\n    }\n\n    .card-title {\n        font-size: 18px;\n        font-weight: 600;\n        color: var(--sqx-color-text);\n        margin: 0;\n        text-align: left;\n        flex: 1;\n    }\n}\n\n//[_ngcontent-%COMP%]   Feedbacks[_ngcontent-%COMP%]   Section[_ngcontent-%COMP%]   (Full Width)\n.feedbacks-section[_ngcontent-%COMP%] {\n    width: 100%;\n}\n\n.feedbacks-card[_ngcontent-%COMP%] {\n    background: white;\n    padding: var(--sqx-space-6);\n    border-radius: var(--sqx-radius-lg);\n\n    .card-header {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        margin-bottom: var(--sqx-space-5);\n\n        .section-title {\n            margin: 0;\n        }\n\n        .view-all-btn {\n            background: transparent;\n            border: none;\n            color: var(--primary-color);\n            font-weight: 600;\n            cursor: pointer;\n            font-size: 14px;\n        }\n    }\n}\n\n.feedback-item[_ngcontent-%COMP%] {\n    background: #F9FAFB;\n    padding: 1.5rem;\n    border-radius: 12px;\n\n    .feedback-header {\n        display: flex;\n        justify-content: space-between;\n        align-items: flex-start;\n        margin-bottom: 1rem;\n\n        .author-info {\n            display: flex;\n            align-items: center;\n            gap: 1rem;\n\n            .author-avatar {\n                width: 48px;\n                height: 48px;\n                border-radius: 50%;\n                object-fit: cover;\n            }\n\n            .feedback-author {\n                font-size: 16px;\n                font-weight: 700;\n                color: var(--sqx-color-text);\n                margin: 0 0 4px 0;\n            }\n\n            .feedback-role {\n                font-size: 13px;\n                color: var(--sqx-color-muted);\n            }\n        }\n\n        .feedback-rating {\n            color: #FFC107;\n            font-size: 14px;\n            display: flex;\n            gap: 2px;\n        }\n    }\n\n    .feedback-text {\n        font-size: 15px;\n        line-height: 1.6;\n        color: var(--sqx-color-text-light);\n        margin: 0;\n    }\n}\n\n//[_ngcontent-%COMP%]   Tasks[_ngcontent-%COMP%]   Section\n.tasks-section[_ngcontent-%COMP%] {\n    background: white;\n    padding: var(--sqx-space-6);\n    border-radius: var(--sqx-radius-lg);\n}\n\n.section-title[_ngcontent-%COMP%] {\n    font-size: 20px;\n    font-weight: 600;\n    color: var(--sqx-color-text);\n    margin: 0 0 var(--sqx-space-5) 0;\n}\n\n.tasks-table[_ngcontent-%COMP%] {\n    border: 1px solid var(--sqx-color-border);\n    border-radius: var(--sqx-radius-md);\n    overflow: hidden;\n}\n\n.table-header[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 60px 1fr 200px;\n    background: #F9FAFB;\n    border-bottom: 1px solid var(--sqx-color-border);\n}\n\n.th[_ngcontent-%COMP%] {\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 600;\n    color: var(--sqx-color-text);\n    text-align: left;\n\n    &.th-num {\n        text-align: center;\n    }\n}\n\n.table-body[_ngcontent-%COMP%] {\n    .table-row {\n        display: grid;\n        grid-template-columns: 60px 1fr 200px;\n        border-bottom: 1px solid var(--sqx-color-border);\n\n        &:last-child {\n            border-bottom: none;\n        }\n\n        &:hover {\n            background: #F9FAFB;\n        }\n    }\n}\n\n.td[_ngcontent-%COMP%] {\n    padding: 14px 16px;\n    font-size: 14px;\n    color: var(--sqx-color-text);\n\n    &.td-num {\n        text-align: center;\n        font-weight: 600;\n    }\n}\n\n//[_ngcontent-%COMP%]   Sidebar[_ngcontent-%COMP%]   Area\n.sidebar-area[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: var(--sqx-space-6);\n}\n\n//[_ngcontent-%COMP%]   Sidebar[_ngcontent-%COMP%]   Widgets\n.progress-card[_ngcontent-%COMP%], \n.calendar-widget[_ngcontent-%COMP%], \n.job-board-widget[_ngcontent-%COMP%] {\n    background: white;\n    padding: var(--sqx-space-5);\n    border-radius: var(--sqx-radius-lg);\n}\n\n//[_ngcontent-%COMP%]   Progress[_ngcontent-%COMP%]   Chart[_ngcontent-%COMP%]   (Adapted for sidebar)\n.progress-chart[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: var(--sqx-space-6);\n    padding: 1rem 0;\n}\n\n.donut-chart[_ngcontent-%COMP%] {\n    width: 160px;\n    height: 160px;\n}\n\n.progress-legend[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    justify-content: center;\n    gap: var(--sqx-space-4);\n    width: 100%;\n}\n\n.legend-item[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: var(--sqx-space-2);\n    font-size: 13px;\n    color: var(--sqx-color-text);\n}\n\n.legend-dot[_ngcontent-%COMP%] {\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n}\n\n//[_ngcontent-%COMP%]   Calendar[_ngcontent-%COMP%]   Widget[_ngcontent-%COMP%]   (Improved Design)\n.calendar-widget[_ngcontent-%COMP%] {\n    .calendar-header {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        margin-bottom: 1rem;\n        padding: 0 0.5rem;\n    }\n\n    .calendar-month {\n        font-size: 16px;\n        font-weight: 700;\n        color: var(--sqx-color-text);\n    }\n\n    .calendar-nav {\n        background: transparent;\n        border: 1px solid #E5E7EB;\n        border-radius: 6px;\n        width: 28px;\n        height: 28px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        cursor: pointer;\n\n        &:hover {\n            background: #F9FAFB;\n        }\n\n        i {\n            font-size: 12px;\n            color: #6B7280;\n        }\n    }\n\n    .calendar-grid {\n        display: grid;\n        grid-template-columns: repeat(7, 1fr);\n        row-gap: 8px;\n    }\n\n    .calendar-day-label {\n        text-align: center;\n        font-size: 12px;\n        font-weight: 600;\n        color: #9CA3AF;\n        padding-bottom: 8px;\n    }\n\n    .calendar-day {\n        aspect-ratio: 1;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 13px;\n        color: var(--sqx-color-text);\n        border-radius: 50%; // Rounded\n        cursor: pointer;\n        transition: all 0.2s ease;\n        margin: auto; // Center in grid cell\n        width: 32px;\n        height: 32px;\n\n        &:hover:not(.empty) {\n            background: #F3F4F6;\n        }\n\n        &.active {\n            background: var(--sqx-color-primary);\n            color: white;\n            font-weight: 600;\n            box-shadow: 0 2px 8px rgba(108, 92, 231, 0.4);\n        }\n\n        &.today:not(.active) {\n            border: 1px solid var(--sqx-color-primary);\n            color: var(--sqx-color-primary);\n        }\n\n        &.empty {\n            pointer-events: none;\n        }\n    }\n}\n\n\n//[_ngcontent-%COMP%]   Job[_ngcontent-%COMP%]   Board\n.widget-title[_ngcontent-%COMP%] {\n    font-size: 18px;\n    font-weight: 700;\n    color: var(--sqx-color-text);\n    margin: 0 0 var(--sqx-space-5) 0;\n}\n\n.job-card[_ngcontent-%COMP%] {\n    padding: var(--sqx-space-4);\n    background: #F9FAFB;\n    border-radius: var(--sqx-radius-md);\n    margin-bottom: var(--sqx-space-3);\n    position: relative;\n\n    &:last-child {\n        margin-bottom: 0;\n    }\n\n    .job-title {\n        font-size: 14px;\n        font-weight: 600;\n        color: var(--sqx-color-text);\n        margin: 0 0 var(--sqx-space-3) 0;\n    }\n\n    .job-detail {\n        display: flex;\n        align-items: center;\n        gap: var(--sqx-space-2);\n        font-size: 12px;\n        color: var(--sqx-color-text-light);\n        margin-bottom: 6px;\n\n        &:last-child {\n            margin-bottom: 0;\n        }\n\n        i {\n            font-size: 12px;\n            color: var(--sqx-color-muted);\n        }\n    }\n\n    // Locked State Styles\n    &.locked {\n        overflow: hidden;\n\n        // Blur overlay\n        .lock-overlay {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            background: rgba(255, 255, 255, 0.85);\n            backdrop-filter: blur(2px);\n            z-index: 10;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            border-radius: var(--sqx-radius-md);\n        }\n\n        .lock-icon-wrapper {\n            width: 40px;\n            height: 40px;\n            background: white;\n            border-radius: 50%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n\n            i {\n                font-size: 18px;\n                color: var(--sqx-color-text);\n            }\n        }\n    }\n}\n\n//[_ngcontent-%COMP%]   Sidebar[_ngcontent-%COMP%]   Common[_ngcontent-%COMP%]   Widget[_ngcontent-%COMP%]   Styles\n.students-widget[_ngcontent-%COMP%] {\n    background: white;\n    padding: var(--sqx-space-5);\n    border-radius: var(--sqx-radius-lg);\n}\n\n.widget-header[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 1rem;\n\n    .widget-title {\n        margin: 0;\n        font-size: 18px;\n    }\n\n    .icon-action-btn {\n        background: transparent;\n        border: none;\n        color: var(--sqx-color-muted);\n        cursor: pointer;\n        padding: 4px;\n\n        &:hover {\n            color: var(--sqx-color-text);\n        }\n    }\n\n    .view-all-text {\n        font-size: 12px;\n        color: var(--primary-color);\n        font-weight: 600;\n        cursor: pointer;\n    }\n}\n\n//[_ngcontent-%COMP%]   Students[_ngcontent-%COMP%]   Widget\n.student-list[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n\n    .student-item {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        padding: 8px;\n        border-radius: 12px;\n        background: #F9FAFB;\n        transition: transform 0.2s;\n\n        &:hover {\n            transform: translateX(3px);\n        }\n\n        .rank-badge {\n            width: 24px;\n            height: 24px;\n            border-radius: 50%;\n            background: #E5E7EB;\n            color: #6B7280;\n            font-size: 12px;\n            font-weight: 700;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n\n            &.top-3 {\n                background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%);\n                color: white;\n                box-shadow: 0 2px 5px rgba(245, 158, 11, 0.3);\n            }\n        }\n\n        .student-avatar {\n            width: 36px;\n            height: 36px;\n            border-radius: 50%;\n            overflow: hidden;\n\n            img {\n                width: 100%;\n                height: 100%;\n                object-fit: cover;\n            }\n        }\n\n        .student-info {\n            flex: 1;\n\n            .student-name {\n                font-size: 14px;\n                font-weight: 600;\n                margin: 0;\n                color: var(--sqx-color-text);\n            }\n\n            .student-points {\n                font-size: 11px;\n                color: var(--primary-color);\n                font-weight: 600;\n            }\n        }\n\n        .student-trend {\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            width: 24px;\n\n            i {\n                font-size: 12px;\n            }\n        }\n    }\n}\n\n\n//[_ngcontent-%COMP%]   Responsive[_ngcontent-%COMP%]   Design\n@media[_ngcontent-%COMP%]   (max-width[_ngcontent-%COMP%]: 1200px) {\n    .dashboard-content {\n        grid-template-columns: 1fr;\n    }\n\n    .sidebar-area {\n        grid-template-columns: repeat(2, 1fr);\n        display: grid;\n\n        .progress-card {\n            height: auto;\n        }\n    }\n}\n\n@media (max-width: 1400px) {\n    .overview-grid[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(2, 1fr);\n    }\n\n    .extensions-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n    }\n}\n\n@media (max-width: 768px) {\n    .overview-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n    }\n}\n\n//[_ngcontent-%COMP%]   Premium[_ngcontent-%COMP%]   Banner[_ngcontent-%COMP%]   Carousel\n.banner-carousel-section[_ngcontent-%COMP%] {\n    margin-bottom: var(--sqx-space-6);\n    border-radius: 24px;\n    overflow: hidden;\n    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\n}\n\n.premium-banner[_ngcontent-%COMP%] {\n    height: 240px;\n    border-radius: 24px;\n    padding: 2.5rem;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    color: white;\n    position: relative;\n    overflow: hidden;\n\n    .banner-content {\n        z-index: 2;\n        max-width: 60%;\n\n        .banner-subtitle {\n            text-transform: uppercase;\n            letter-spacing: 1px;\n            font-size: 12px;\n            font-weight: 700;\n            background: rgba(255, 255, 255, 0.2);\n            padding: 4px 10px;\n            border-radius: 20px;\n            display: inline-block;\n            margin-bottom: 1rem;\n            backdrop-filter: blur(10px);\n        }\n\n        .banner-title {\n            font-size: 32px;\n            font-weight: 800;\n            line-height: 1.2;\n            margin: 0 0 10px 0;\n            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n        }\n\n        .banner-desc {\n            font-size: 16px;\n            opacity: 0.9;\n            margin: 0 0 1.5rem 0;\n            font-weight: 500;\n        }\n\n        .banner-btn {\n            background: white !important;\n            color: var(--sqx-color-text) !important;\n            border: none;\n            font-weight: 700;\n            padding: 10px 24px;\n            transition: transform 0.2s ease;\n\n            &:hover {\n                transform: translateY(-2px);\n                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);\n            }\n        }\n    }\n\n    .banner-visual {\n        position: absolute;\n        right: 0;\n        top: 0;\n        width: 40%;\n        height: 100%;\n        pointer-events: none;\n\n        // Decorative abstract shapes\n        .circle-shape {\n            position: absolute;\n            top: -50px;\n            right: -50px;\n            width: 300px;\n            height: 300px;\n            border-radius: 50%;\n            background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);\n        }\n\n        .glass-card {\n            position: absolute;\n            bottom: 40px;\n            right: 60px;\n            width: 80px;\n            height: 80px;\n            background: rgba(255, 255, 255, 0.1);\n            backdrop-filter: blur(10px);\n            border-radius: 20px;\n            border: 1px solid rgba(255, 255, 255, 0.2);\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            transform: rotate(-10deg);\n            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);\n        }\n    }\n}\n\n//   Override   PrimeNG   carousel   button   styles   if   needed\n[_nghost-%COMP%]     .p-carousel .p-carousel-indicators {\n    display: none; // Hiding indicators as requested for cleaner look, or style them\n}\n\n[_nghost-%COMP%]     .p-carousel-prev, \n[_nghost-%COMP%]     .p-carousel-next {\n    color: white;\n    background: rgba(0, 0, 0, 0.1);\n    width: 2rem;\n    height: 2rem;\n    border-radius: 50%;\n\n    &:hover {\n        background: rgba(0, 0, 0, 0.3);\n    }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardComponent, [{
        type: Component,
        args: [{ selector: 'sqx-dashboard', standalone: true, imports: [CommonModule, CarouselModule, ButtonModule], template: "<div class=\"dashboard-container\">\n  <div class=\"dashboard-content\">\n    <!-- Main Content Area -->\n    <div class=\"main-area\">\n      <!-- Course Overview Section -->\n      <div class=\"overview-grid\">\n        @for (card of courseOverview; track card.title) {\n        <div class=\"premium-summary-card\">\n          <div class=\"card-icon-wrapper\" [style.color]=\"card.color\" [style.background-color]=\"card.bg\">\n            <i [class]=\"card.icon\"></i>\n          </div>\n          <div class=\"card-content\">\n            <div class=\"card-count\">{{card.count}}</div>\n            <div class=\"card-title\">{{card.title}}</div>\n            <div class=\"card-subtitle\">{{card.subtitle}}</div>\n          </div>\n          <div class=\"card-action\">\n            <span>View</span>\n            <i class=\"pi pi-arrow-right\"></i>\n          </div>\n        </div>\n        }\n      </div>\n\n      <!-- Premium Banner Carousel -->\n      <div class=\"banner-carousel-section\">\n        <p-carousel [value]=\"dashboardBanners\" [numVisible]=\"1\" [numScroll]=\"1\" [circular]=\"true\"\n          [autoplayInterval]=\"5000\" [showIndicators]=\"false\">\n          <ng-template let-banner pTemplate=\"item\">\n            <div class=\"premium-banner\"\n              [style.background]=\"'linear-gradient(135deg, ' + banner.color + ' 0%, ' + adjustColor(banner.color, -30) + ' 100%)'\">\n              <div class=\"banner-content\">\n                <span class=\"banner-subtitle\">{{banner.subtitle}}</span>\n                <h2 class=\"banner-title\">{{banner.title}}</h2>\n                <p class=\"banner-desc\">{{banner.description}}</p>\n                <button pButton [label]=\"banner.buttonText\"\n                  class=\"banner-btn p-button-raised p-button-rounded\"></button>\n              </div>\n              <div class=\"banner-visual\">\n                <!-- abstract shapes or illustration placeholder -->\n                <div class=\"circle-shape\"></div>\n                <div class=\"glass-card\">\n                  <i class=\"pi pi-bolt\" style=\"font-size: 2rem; color: white;\"></i>\n                </div>\n              </div>\n            </div>\n          </ng-template>\n        </p-carousel>\n      </div>\n\n      <!-- Extensions Grid (Exams & Projects) -->\n      <div class=\"extensions-grid\">\n        <!-- Recent Exam Results -->\n        <div class=\"extension-card\">\n          <div class=\"card-header\">\n            <h3 class=\"section-title\">Recent Exam Results</h3>\n            <button class=\"view-all-btn\">View All</button>\n          </div>\n          <div class=\"exam-list\">\n            @for (exam of examResults; track exam.subject) {\n            <div class=\"exam-item\">\n              <div class=\"exam-icon\" [style.background-color]=\"exam.color + '20'\" [style.color]=\"exam.color\">\n                <i [class]=\"exam.icon\"></i>\n              </div>\n              <div class=\"exam-details\">\n                <h4 class=\"exam-subject\">{{exam.subject}}</h4>\n                <span class=\"exam-date\">{{exam.date}}</span>\n              </div>\n              <div class=\"exam-score\">\n                <span class=\"grade\" [style.color]=\"exam.color\">{{exam.grade}}</span>\n                <span class=\"score-text\">{{exam.score}}/{{exam.total}}</span>\n              </div>\n            </div>\n            }\n          </div>\n        </div>\n\n        <!-- Active Projects -->\n        <div class=\"extension-card\">\n          <div class=\"card-header\">\n            <h3 class=\"section-title\">Active Projects</h3>\n            <button class=\"view-all-btn\">View All</button>\n          </div>\n          <div class=\"project-list\">\n            @for (project of activeProjects; track project.title) {\n            <div class=\"project-item\">\n              <div class=\"project-info\">\n                <h4 class=\"project-title\">{{project.title}}</h4>\n                <span class=\"project-due\">Due: {{project.dueDate}}</span>\n              </div>\n              <div class=\"project-status\">\n                <div class=\"progress-bar\">\n                  <div class=\"fill\" [style.width.%]=\"project.progress\" [style.background-color]=\"project.statusColor\">\n                  </div>\n                </div>\n                <span class=\"status-badge\" [style.background-color]=\"project.statusColor + '20'\"\n                  [style.color]=\"project.statusColor\">\n                  {{project.status}}\n                </span>\n              </div>\n            </div>\n            }\n          </div>\n        </div>\n      </div>\n\n      <!-- Feedbacks (Full Width) -->\n      <div class=\"feedbacks-section\">\n        <div class=\"feedbacks-card\">\n          <div class=\"card-header\">\n            <h3 class=\"section-title\">Feedbacks</h3>\n            <button class=\"view-all-btn\">View All</button>\n          </div>\n          <div class=\"feedback-item\">\n            <div class=\"feedback-header\">\n              <div class=\"author-info\">\n                <img src=\"/assets/images/avatar-2.jpg\" alt=\"Author\" class=\"author-avatar\"\n                  onError=\"this.src='/assets/images/default-avatar.png'\">\n                <div>\n                  <h4 class=\"feedback-author\">Charil Polamraju</h4>\n                  <span class=\"feedback-role\">Student</span>\n                </div>\n              </div>\n              <div class=\"feedback-rating\">\n                <i class=\"pi pi-star-fill\"></i>\n                <i class=\"pi pi-star-fill\"></i>\n                <i class=\"pi pi-star-fill\"></i>\n                <i class=\"pi pi-star-fill\"></i>\n                <i class=\"pi pi-star\"></i>\n              </div>\n            </div>\n            <p class=\"feedback-text\">\n              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.\n              Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula\n              consectetur, ultrices mauris. Maecenas vitae mattis tellus.\n            </p>\n          </div>\n        </div>\n      </div>\n\n      <!-- Tasks Table -->\n      <div class=\"tasks-section\">\n        <h3 class=\"section-title\">Tasks</h3>\n        <div class=\"tasks-table\">\n          <div class=\"table-header\">\n            <div class=\"th th-num\">#</div>\n            <div class=\"th th-name\">Task Name</div>\n            <div class=\"th th-timeline\">Timeline</div>\n          </div>\n          <div class=\"table-body\">\n            @for (task of tasks; track task.id) {\n            <div class=\"table-row\">\n              <div class=\"td td-num\">{{ task.id }}</div>\n              <div class=\"td td-name\">{{ task.name }}</div>\n              <div class=\"td td-timeline\">{{ task.timeline }}</div>\n            </div>\n            }\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Sidebar Area -->\n    <div class=\"sidebar-area\">\n      <!-- Course Progress -->\n      <div class=\"progress-card\">\n        <h3 class=\"section-title\">Course Progress</h3>\n        <div class=\"progress-chart\">\n          <svg viewBox=\"0 0 200 200\" class=\"donut-chart\">\n            <circle cx=\"100\" cy=\"100\" r=\"80\" fill=\"none\" stroke=\"#F3F4F6\" stroke-width=\"15\"></circle>\n            <circle cx=\"100\" cy=\"100\" r=\"80\" fill=\"none\" [attr.stroke]=\"'var(--sqx-color-primary)'\" stroke-width=\"15\"\n              [attr.stroke-dasharray]=\"(progressPercentage * 5.027) + ' 502.7'\" stroke-linecap=\"round\"\n              transform=\"rotate(-90 100 100)\"></circle>\n            <text x=\"100\" y=\"100\" dy=\".3em\" text-anchor=\"middle\" font-size=\"28\" font-weight=\"700\"\n              fill=\"#1f2937\">{{progressPercentage | number:'1.0-0'}}%</text>\n          </svg>\n          <div class=\"progress-legend\">\n            <div class=\"legend-item\">\n              <span class=\"legend-dot\" style=\"background-color: var(--sqx-color-primary)\"></span>\n              <span>Completed</span>\n            </div>\n            <div class=\"legend-item\">\n              <span class=\"legend-dot\" style=\"background-color: #F3F4F6\"></span>\n              <span>Remaining</span>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Calendar Widget -->\n      <div class=\"calendar-widget\">\n        <div class=\"calendar-header\">\n          <button class=\"calendar-nav\" (click)=\"previousMonth()\"><i class=\"pi pi-angle-left\"></i></button>\n          <span class=\"calendar-month\">{{ currentMonth }}</span>\n          <button class=\"calendar-nav\" (click)=\"nextMonth()\"><i class=\"pi pi-angle-right\"></i></button>\n        </div>\n        <div class=\"calendar-grid\">\n          <div class=\"calendar-day-label\">Su</div>\n          <div class=\"calendar-day-label\">Mo</div>\n          <div class=\"calendar-day-label\">Tu</div>\n          <div class=\"calendar-day-label\">We</div>\n          <div class=\"calendar-day-label\">Th</div>\n          <div class=\"calendar-day-label\">Fr</div>\n          <div class=\"calendar-day-label\">Sa</div>\n\n          @for (day of calendarDays; track $index) {\n          <div class=\"calendar-day\" [class.empty]=\"!day\" [class.active]=\"day === selectedDay\"\n            [class.today]=\"isToday(day)\" (click)=\"selectDay(day)\">\n            {{ day || '' }}\n          </div>\n          }\n        </div>\n      </div>\n\n      <!-- Job Board -->\n      <div class=\"job-board-widget\">\n        <h3 class=\"widget-title\">Job-Board \uD83D\uDE80</h3>\n        @for (job of jobs; track job.title) {\n        <div class=\"job-card\" [class.locked]=\"job.locked\">\n          @if (job.locked) {\n          <div class=\"lock-overlay\">\n            <div class=\"lock-icon-wrapper\">\n              <i class=\"pi pi-lock\"></i>\n            </div>\n          </div>\n          }\n          <h4 class=\"job-title\">{{ job.title }}</h4>\n          <div class=\"job-detail\">\n            <i class=\"pi pi-map-marker\"></i>\n            <span>Location: {{ job.location }}</span>\n          </div>\n          <div class=\"job-detail\">\n            <i class=\"pi pi-briefcase\"></i>\n            <span>Type: {{ job.type }}</span>\n          </div>\n          <div class=\"job-detail\">\n            <i class=\"pi pi-globe\"></i>\n            <span>Website: {{ job.website }}</span>\n          </div>\n        </div>\n        }\n      </div>\n\n      <!-- Top Students -->\n      <div class=\"students-widget\">\n        <div class=\"widget-header\">\n          <h3 class=\"widget-title\">Top Students</h3>\n          <span class=\"view-all-text\">View All</span>\n        </div>\n        <div class=\"student-list\">\n          @for (student of students; track student.name) {\n          <div class=\"student-item\">\n            <div class=\"rank-badge\" [class.top-3]=\"student.rank <= 3\">{{student.rank}}</div>\n            <div class=\"student-avatar\">\n              <img [src]=\"student.image\" alt=\"Student\" onError=\"this.src='/assets/images/default-avatar.png'\">\n            </div>\n            <div class=\"student-info\">\n              <h4 class=\"student-name\">{{student.name}}</h4>\n              <span class=\"student-points\">{{student.score}} pts</span>\n            </div>\n            <div class=\"student-trend\">\n              @if(student.trend === 'up') { <i class=\"pi pi-arrow-up\" style=\"color: #10B981\"></i> }\n              @if(student.trend === 'down') { <i class=\"pi pi-arrow-down\" style=\"color: #EF4444\"></i> }\n              @if(student.trend === 'neutral') { <i class=\"pi pi-minus\" style=\"color: #9CA3AF\"></i> }\n            </div>\n          </div>\n          }\n        </div>\n      </div>\n    </div>\n  </div>\n</div>", styles: [".dashboard-container {\n    padding: var(--sqx-space-8);\n    // max-width: 1600px;\n}\n\n.dashboard-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: var(--sqx-space-8);\n\n    .page-title {\n        font-size: 32px;\n        font-weight: 700;\n        color: var(--sqx-color-text);\n        margin: 0;\n    }\n}\n\n.notification-btn {\n    position: relative;\n    padding: 12px;\n    border-radius: 50%;\n    border: none;\n    background: white;\n    cursor: pointer;\n    transition: all 0.2s ease;\n\n    i {\n        font-size: 20px;\n        color: var(--sqx-color-text);\n    }\n\n    &:hover {\n        background: #F9FAFB;\n    }\n\n    .badge {\n        position: absolute;\n        top: 6px;\n        right: 6px;\n        background: var(--sqx-color-danger);\n        color: white;\n        font-size: 10px;\n        font-weight: 600;\n        padding: 2px 5px;\n        border-radius: 10px;\n        min-width: 16px;\n        text-align: center;\n    }\n}\n\n.dashboard-content {\n    display: grid;\n    grid-template-columns: 1fr 340px; // Slightly wider sidebar for calendar\n    gap: var(--sqx-space-6);\n}\n\n.main-area {\n    display: flex;\n    flex-direction: column;\n    gap: var(--sqx-space-6);\n    min-width: 0; // Fix for grid overflow/overlap issues\n}\n\n// Course Overview Grid\n.overview-grid {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    gap: var(--sqx-space-5);\n}\n\n// Extensions Grid (Exams & Projects)\n.extensions-grid {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: var(--sqx-space-6);\n    margin-bottom: var(--sqx-space-6);\n}\n\n.extension-card {\n    background: white;\n    padding: var(--sqx-space-6);\n    border-radius: var(--sqx-radius-lg);\n\n    .card-header {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        margin-bottom: 1.5rem;\n\n        .section-title {\n            margin: 0;\n            font-size: 18px;\n        }\n\n        .view-all-btn {\n            background: transparent;\n            border: none;\n            color: var(--primary-color);\n            font-weight: 600;\n            cursor: pointer;\n            font-size: 13px;\n        }\n    }\n}\n\n// Exam List Styles\n.exam-list {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n\n    .exam-item {\n        display: flex;\n        align-items: center;\n        padding: 12px;\n        border-radius: 12px;\n        background: #F9FAFB;\n        transition: transform 0.2s;\n\n        &:hover {\n            transform: translateX(5px);\n        }\n\n        .exam-icon {\n            width: 40px;\n            height: 40px;\n            border-radius: 10px;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            margin-right: 1rem;\n\n            i {\n                font-size: 18px;\n            }\n        }\n\n        .exam-details {\n            flex: 1;\n\n            .exam-subject {\n                font-size: 14px;\n                font-weight: 600;\n                color: var(--sqx-color-text);\n                margin: 0 0 4px 0;\n            }\n\n            .exam-date {\n                font-size: 12px;\n                color: var(--sqx-color-muted);\n            }\n        }\n\n        .exam-score {\n            text-align: right;\n\n            .grade {\n                display: block;\n                font-size: 16px;\n                font-weight: 700;\n            }\n\n            .score-text {\n                font-size: 12px;\n                color: var(--sqx-color-muted);\n            }\n        }\n    }\n}\n\n// Project List Styles\n.project-list {\n    display: flex;\n    flex-direction: column;\n    gap: 1.25rem;\n\n    .project-item {\n        .project-info {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            margin-bottom: 8px;\n\n            .project-title {\n                font-size: 14px;\n                font-weight: 600;\n                color: var(--sqx-color-text);\n                margin: 0;\n            }\n\n            .project-due {\n                font-size: 11px;\n                color: var(--sqx-color-muted);\n            }\n        }\n\n        .project-status {\n            display: flex;\n            align-items: center;\n            gap: 1rem;\n\n            .progress-bar {\n                flex: 1;\n                height: 6px;\n                background: #F3F4F6;\n                border-radius: 3px;\n                overflow: hidden;\n\n                .fill {\n                    height: 100%;\n                    border-radius: 3px;\n                }\n            }\n\n            .status-badge {\n                font-size: 10px;\n                font-weight: 600;\n                padding: 4px 8px;\n                border-radius: 12px;\n                text-transform: uppercase;\n            }\n        }\n    }\n}\n\n\n.premium-summary-card {\n    background: white;\n    border-radius: 20px;\n    padding: 1.5rem;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    min-height: 160px;\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);\n    transition: all 0.3s ease;\n    cursor: pointer;\n    position: relative;\n    overflow: hidden;\n\n    &:hover {\n        transform: translateY(-5px);\n        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);\n\n        .card-action {\n            color: var(--primary-color);\n        }\n    }\n\n    .card-icon-wrapper {\n        width: 48px;\n        height: 48px;\n        border-radius: 12px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        margin-bottom: 1rem;\n\n        i {\n            font-size: 20px;\n            font-weight: bold;\n        }\n    }\n\n    .card-content {\n        .card-count {\n            font-size: 28px;\n            font-weight: 800;\n            color: var(--sqx-color-text);\n            line-height: 1;\n            margin-bottom: 4px;\n        }\n\n        .card-title {\n            font-size: 14px;\n            font-weight: 600;\n            color: var(--sqx-color-text);\n            margin-bottom: 4px;\n        }\n\n        .card-subtitle {\n            font-size: 11px;\n            color: var(--sqx-color-muted);\n        }\n    }\n\n    .card-action {\n        position: absolute;\n        top: 1.5rem;\n        right: 1.5rem;\n        display: flex;\n        align-items: center;\n        gap: 4px;\n        font-size: 12px;\n        font-weight: 600;\n        color: var(--sqx-color-muted);\n        transition: color 0.2s;\n\n        i {\n            font-size: 10px;\n        }\n    }\n}\n\n.info-card {\n    padding: var(--sqx-space-6);\n    border-radius: 8px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--sqx-space-4);\n\n    &.card-purple {\n        background-color: var(--sqx-color-card-purple);\n    }\n\n    &.card-yellow {\n        background-color: var(--sqx-color-card-yellow);\n    }\n\n    &.card-violet {\n        background-color: var(--sqx-color-card-violet);\n    }\n\n    .card-icon {\n        width: 44px;\n        height: 44px;\n        border-radius: 10px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n\n        i {\n            font-size: 20px;\n            color: white;\n        }\n    }\n\n    .card-title {\n        font-size: 18px;\n        font-weight: 600;\n        color: var(--sqx-color-text);\n        margin: 0;\n        text-align: left;\n        flex: 1;\n    }\n}\n\n// Feedbacks Section (Full Width)\n.feedbacks-section {\n    width: 100%;\n}\n\n.feedbacks-card {\n    background: white;\n    padding: var(--sqx-space-6);\n    border-radius: var(--sqx-radius-lg);\n\n    .card-header {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        margin-bottom: var(--sqx-space-5);\n\n        .section-title {\n            margin: 0;\n        }\n\n        .view-all-btn {\n            background: transparent;\n            border: none;\n            color: var(--primary-color);\n            font-weight: 600;\n            cursor: pointer;\n            font-size: 14px;\n        }\n    }\n}\n\n.feedback-item {\n    background: #F9FAFB;\n    padding: 1.5rem;\n    border-radius: 12px;\n\n    .feedback-header {\n        display: flex;\n        justify-content: space-between;\n        align-items: flex-start;\n        margin-bottom: 1rem;\n\n        .author-info {\n            display: flex;\n            align-items: center;\n            gap: 1rem;\n\n            .author-avatar {\n                width: 48px;\n                height: 48px;\n                border-radius: 50%;\n                object-fit: cover;\n            }\n\n            .feedback-author {\n                font-size: 16px;\n                font-weight: 700;\n                color: var(--sqx-color-text);\n                margin: 0 0 4px 0;\n            }\n\n            .feedback-role {\n                font-size: 13px;\n                color: var(--sqx-color-muted);\n            }\n        }\n\n        .feedback-rating {\n            color: #FFC107;\n            font-size: 14px;\n            display: flex;\n            gap: 2px;\n        }\n    }\n\n    .feedback-text {\n        font-size: 15px;\n        line-height: 1.6;\n        color: var(--sqx-color-text-light);\n        margin: 0;\n    }\n}\n\n// Tasks Section\n.tasks-section {\n    background: white;\n    padding: var(--sqx-space-6);\n    border-radius: var(--sqx-radius-lg);\n}\n\n.section-title {\n    font-size: 20px;\n    font-weight: 600;\n    color: var(--sqx-color-text);\n    margin: 0 0 var(--sqx-space-5) 0;\n}\n\n.tasks-table {\n    border: 1px solid var(--sqx-color-border);\n    border-radius: var(--sqx-radius-md);\n    overflow: hidden;\n}\n\n.table-header {\n    display: grid;\n    grid-template-columns: 60px 1fr 200px;\n    background: #F9FAFB;\n    border-bottom: 1px solid var(--sqx-color-border);\n}\n\n.th {\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 600;\n    color: var(--sqx-color-text);\n    text-align: left;\n\n    &.th-num {\n        text-align: center;\n    }\n}\n\n.table-body {\n    .table-row {\n        display: grid;\n        grid-template-columns: 60px 1fr 200px;\n        border-bottom: 1px solid var(--sqx-color-border);\n\n        &:last-child {\n            border-bottom: none;\n        }\n\n        &:hover {\n            background: #F9FAFB;\n        }\n    }\n}\n\n.td {\n    padding: 14px 16px;\n    font-size: 14px;\n    color: var(--sqx-color-text);\n\n    &.td-num {\n        text-align: center;\n        font-weight: 600;\n    }\n}\n\n// Sidebar Area\n.sidebar-area {\n    display: flex;\n    flex-direction: column;\n    gap: var(--sqx-space-6);\n}\n\n// Sidebar Widgets\n.progress-card,\n.calendar-widget,\n.job-board-widget {\n    background: white;\n    padding: var(--sqx-space-5);\n    border-radius: var(--sqx-radius-lg);\n}\n\n// Progress Chart (Adapted for sidebar)\n.progress-chart {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: var(--sqx-space-6);\n    padding: 1rem 0;\n}\n\n.donut-chart {\n    width: 160px;\n    height: 160px;\n}\n\n.progress-legend {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    justify-content: center;\n    gap: var(--sqx-space-4);\n    width: 100%;\n}\n\n.legend-item {\n    display: flex;\n    align-items: center;\n    gap: var(--sqx-space-2);\n    font-size: 13px;\n    color: var(--sqx-color-text);\n}\n\n.legend-dot {\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n}\n\n// Calendar Widget (Improved Design)\n.calendar-widget {\n    .calendar-header {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        margin-bottom: 1rem;\n        padding: 0 0.5rem;\n    }\n\n    .calendar-month {\n        font-size: 16px;\n        font-weight: 700;\n        color: var(--sqx-color-text);\n    }\n\n    .calendar-nav {\n        background: transparent;\n        border: 1px solid #E5E7EB;\n        border-radius: 6px;\n        width: 28px;\n        height: 28px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        cursor: pointer;\n\n        &:hover {\n            background: #F9FAFB;\n        }\n\n        i {\n            font-size: 12px;\n            color: #6B7280;\n        }\n    }\n\n    .calendar-grid {\n        display: grid;\n        grid-template-columns: repeat(7, 1fr);\n        row-gap: 8px;\n    }\n\n    .calendar-day-label {\n        text-align: center;\n        font-size: 12px;\n        font-weight: 600;\n        color: #9CA3AF;\n        padding-bottom: 8px;\n    }\n\n    .calendar-day {\n        aspect-ratio: 1;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 13px;\n        color: var(--sqx-color-text);\n        border-radius: 50%; // Rounded\n        cursor: pointer;\n        transition: all 0.2s ease;\n        margin: auto; // Center in grid cell\n        width: 32px;\n        height: 32px;\n\n        &:hover:not(.empty) {\n            background: #F3F4F6;\n        }\n\n        &.active {\n            background: var(--sqx-color-primary);\n            color: white;\n            font-weight: 600;\n            box-shadow: 0 2px 8px rgba(108, 92, 231, 0.4);\n        }\n\n        &.today:not(.active) {\n            border: 1px solid var(--sqx-color-primary);\n            color: var(--sqx-color-primary);\n        }\n\n        &.empty {\n            pointer-events: none;\n        }\n    }\n}\n\n\n// Job Board\n.widget-title {\n    font-size: 18px;\n    font-weight: 700;\n    color: var(--sqx-color-text);\n    margin: 0 0 var(--sqx-space-5) 0;\n}\n\n.job-card {\n    padding: var(--sqx-space-4);\n    background: #F9FAFB;\n    border-radius: var(--sqx-radius-md);\n    margin-bottom: var(--sqx-space-3);\n    position: relative;\n\n    &:last-child {\n        margin-bottom: 0;\n    }\n\n    .job-title {\n        font-size: 14px;\n        font-weight: 600;\n        color: var(--sqx-color-text);\n        margin: 0 0 var(--sqx-space-3) 0;\n    }\n\n    .job-detail {\n        display: flex;\n        align-items: center;\n        gap: var(--sqx-space-2);\n        font-size: 12px;\n        color: var(--sqx-color-text-light);\n        margin-bottom: 6px;\n\n        &:last-child {\n            margin-bottom: 0;\n        }\n\n        i {\n            font-size: 12px;\n            color: var(--sqx-color-muted);\n        }\n    }\n\n    // Locked State Styles\n    &.locked {\n        overflow: hidden;\n\n        // Blur overlay\n        .lock-overlay {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            background: rgba(255, 255, 255, 0.85);\n            backdrop-filter: blur(2px);\n            z-index: 10;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            border-radius: var(--sqx-radius-md);\n        }\n\n        .lock-icon-wrapper {\n            width: 40px;\n            height: 40px;\n            background: white;\n            border-radius: 50%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n\n            i {\n                font-size: 18px;\n                color: var(--sqx-color-text);\n            }\n        }\n    }\n}\n\n// Sidebar Common Widget Styles\n.students-widget {\n    background: white;\n    padding: var(--sqx-space-5);\n    border-radius: var(--sqx-radius-lg);\n}\n\n.widget-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 1rem;\n\n    .widget-title {\n        margin: 0;\n        font-size: 18px;\n    }\n\n    .icon-action-btn {\n        background: transparent;\n        border: none;\n        color: var(--sqx-color-muted);\n        cursor: pointer;\n        padding: 4px;\n\n        &:hover {\n            color: var(--sqx-color-text);\n        }\n    }\n\n    .view-all-text {\n        font-size: 12px;\n        color: var(--primary-color);\n        font-weight: 600;\n        cursor: pointer;\n    }\n}\n\n// Students Widget\n.student-list {\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n\n    .student-item {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        padding: 8px;\n        border-radius: 12px;\n        background: #F9FAFB;\n        transition: transform 0.2s;\n\n        &:hover {\n            transform: translateX(3px);\n        }\n\n        .rank-badge {\n            width: 24px;\n            height: 24px;\n            border-radius: 50%;\n            background: #E5E7EB;\n            color: #6B7280;\n            font-size: 12px;\n            font-weight: 700;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n\n            &.top-3 {\n                background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%);\n                color: white;\n                box-shadow: 0 2px 5px rgba(245, 158, 11, 0.3);\n            }\n        }\n\n        .student-avatar {\n            width: 36px;\n            height: 36px;\n            border-radius: 50%;\n            overflow: hidden;\n\n            img {\n                width: 100%;\n                height: 100%;\n                object-fit: cover;\n            }\n        }\n\n        .student-info {\n            flex: 1;\n\n            .student-name {\n                font-size: 14px;\n                font-weight: 600;\n                margin: 0;\n                color: var(--sqx-color-text);\n            }\n\n            .student-points {\n                font-size: 11px;\n                color: var(--primary-color);\n                font-weight: 600;\n            }\n        }\n\n        .student-trend {\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            width: 24px;\n\n            i {\n                font-size: 12px;\n            }\n        }\n    }\n}\n\n\n// Responsive Design\n@media (max-width: 1200px) {\n    .dashboard-content {\n        grid-template-columns: 1fr;\n    }\n\n    .sidebar-area {\n        grid-template-columns: repeat(2, 1fr);\n        display: grid;\n\n        .progress-card {\n            height: auto;\n        }\n    }\n}\n\n@media (max-width: 1400px) {\n    .overview-grid {\n        grid-template-columns: repeat(2, 1fr);\n    }\n\n    .extensions-grid {\n        grid-template-columns: 1fr;\n    }\n}\n\n@media (max-width: 768px) {\n    .overview-grid {\n        grid-template-columns: 1fr;\n    }\n}\n\n// Premium Banner Carousel\n.banner-carousel-section {\n    margin-bottom: var(--sqx-space-6);\n    border-radius: 24px;\n    overflow: hidden;\n    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\n}\n\n.premium-banner {\n    height: 240px;\n    border-radius: 24px;\n    padding: 2.5rem;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    color: white;\n    position: relative;\n    overflow: hidden;\n\n    .banner-content {\n        z-index: 2;\n        max-width: 60%;\n\n        .banner-subtitle {\n            text-transform: uppercase;\n            letter-spacing: 1px;\n            font-size: 12px;\n            font-weight: 700;\n            background: rgba(255, 255, 255, 0.2);\n            padding: 4px 10px;\n            border-radius: 20px;\n            display: inline-block;\n            margin-bottom: 1rem;\n            backdrop-filter: blur(10px);\n        }\n\n        .banner-title {\n            font-size: 32px;\n            font-weight: 800;\n            line-height: 1.2;\n            margin: 0 0 10px 0;\n            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n        }\n\n        .banner-desc {\n            font-size: 16px;\n            opacity: 0.9;\n            margin: 0 0 1.5rem 0;\n            font-weight: 500;\n        }\n\n        .banner-btn {\n            background: white !important;\n            color: var(--sqx-color-text) !important;\n            border: none;\n            font-weight: 700;\n            padding: 10px 24px;\n            transition: transform 0.2s ease;\n\n            &:hover {\n                transform: translateY(-2px);\n                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);\n            }\n        }\n    }\n\n    .banner-visual {\n        position: absolute;\n        right: 0;\n        top: 0;\n        width: 40%;\n        height: 100%;\n        pointer-events: none;\n\n        // Decorative abstract shapes\n        .circle-shape {\n            position: absolute;\n            top: -50px;\n            right: -50px;\n            width: 300px;\n            height: 300px;\n            border-radius: 50%;\n            background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);\n        }\n\n        .glass-card {\n            position: absolute;\n            bottom: 40px;\n            right: 60px;\n            width: 80px;\n            height: 80px;\n            background: rgba(255, 255, 255, 0.1);\n            backdrop-filter: blur(10px);\n            border-radius: 20px;\n            border: 1px solid rgba(255, 255, 255, 0.2);\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            transform: rotate(-10deg);\n            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);\n        }\n    }\n}\n\n// Override PrimeNG carousel button styles if needed\n:host ::ng-deep .p-carousel .p-carousel-indicators {\n    display: none; // Hiding indicators as requested for cleaner look, or style them\n}\n\n:host ::ng-deep .p-carousel-prev,\n:host ::ng-deep .p-carousel-next {\n    color: white;\n    background: rgba(0, 0, 0, 0.1);\n    width: 2rem;\n    height: 2rem;\n    border-radius: 50%;\n\n    &:hover {\n        background: rgba(0, 0, 0, 0.3);\n    }\n}"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/modules/dashboard/dashboard.component.ts", lineNumber: 72 }); })();
