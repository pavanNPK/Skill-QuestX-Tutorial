import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AuthService } from '../../core/services/auth.service';
import { CourseContentService } from '../../core/services/course-content.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/button";
import * as i4 from "primeng/api";
import * as i5 from "primeng/tooltip";
import * as i6 from "primeng/carousel";
import * as i7 from "primeng/inputtext";
import * as i8 from "primeng/iconfield";
import * as i9 from "primeng/inputicon";
const _forTrack0 = ($index, $item) => $item.name;
function CoursesListComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 28);
    i0.ɵɵlistener("click", function CoursesListComponent_Conditional_8_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.navigateToAddCourse()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", !ctx_r1.canAddCourse())("pTooltip", ctx_r1.canAddCourse() ? "" : "Head permission required to add courses");
} }
function CoursesListComponent_For_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22)(1, "div", 13)(2, "div", 29);
    i0.ɵɵelement(3, "i", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 31);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 14);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 32)(9, "div", 33);
    i0.ɵɵelement(10, "div", 34);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 16);
    i0.ɵɵelement(12, "span", 35);
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 17);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 18);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 19);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 20)(22, "button", 36);
    i0.ɵɵelement(23, "i", 37);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "button", 38);
    i0.ɵɵelement(25, "i", 39);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const myCourse_r3 = ctx.$implicit;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(myCourse_r3.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(myCourse_r3.instructor);
    i0.ɵɵadvance(3);
    i0.ɵɵstyleProp("width", myCourse_r3.progress, "%")("background-color", myCourse_r3.progressColor);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("in-progress", myCourse_r3.status === "In Progress");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(myCourse_r3.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(myCourse_r3.startDate);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(myCourse_r3.endDate);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(myCourse_r3.nextLiveClass);
} }
function CoursesListComponent_ng_template_42_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 49);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const course_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("By ", course_r4.author);
} }
function CoursesListComponent_ng_template_42_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 55);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const course_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("(", course_r4.ratingCount, " rating", course_r4.ratingCount === 1 ? "" : "s", ")");
} }
function CoursesListComponent_ng_template_42_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 59);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const course_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("$", course_r4.price);
} }
function CoursesListComponent_ng_template_42_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 60)(1, "span");
    i0.ɵɵtext(2, "Get Course");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "i", 24);
    i0.ɵɵelementEnd();
} }
function CoursesListComponent_ng_template_42_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 61)(1, "span");
    i0.ɵɵtext(2, "Unavailable");
    i0.ɵɵelementEnd()();
} }
function CoursesListComponent_ng_template_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40)(1, "div", 41)(2, "span", 42);
    i0.ɵɵtext(3, "Popular in week");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 43);
    i0.ɵɵelement(5, "i", 44);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 45);
    i0.ɵɵelement(7, "div", 46);
    i0.ɵɵelementStart(8, "div", 47)(9, "h3", 48);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(11, CoursesListComponent_ng_template_42_Conditional_11_Template, 2, 1, "p", 49);
    i0.ɵɵelementStart(12, "p", 50);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelement(14, "div", 51);
    i0.ɵɵelementStart(15, "div", 52)(16, "div", 53);
    i0.ɵɵelement(17, "i", 54);
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(20, CoursesListComponent_ng_template_42_Conditional_20_Template, 2, 2, "span", 55);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 56)(22, "div", 57)(23, "span", 58);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(25, CoursesListComponent_ng_template_42_Conditional_25_Template, 2, 1, "span", 59);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(26, CoursesListComponent_ng_template_42_Conditional_26_Template, 4, 0, "button", 60);
    i0.ɵɵconditionalCreate(27, CoursesListComponent_ng_template_42_Conditional_27_Template, 3, 0, "button", 61);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const course_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵstyleProp("background-color", course_r4.accentColor || "#FFC107");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(course_r4.title);
    i0.ɵɵadvance();
    i0.ɵɵconditional(course_r4.author ? 11 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(course_r4.description);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(course_r4.ratingAverage ?? 4.2);
    i0.ɵɵadvance();
    i0.ɵɵconditional(course_r4.ratingCount != null && course_r4.ratingCount > 0 ? 20 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("$", ctx_r1.calculateDiscountedPrice(course_r4.price, course_r4.discount));
    i0.ɵɵadvance();
    i0.ɵɵconditional(course_r4.discount ? 25 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!course_r4.unavailable ? 26 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(course_r4.unavailable ? 27 : -1);
} }
export class CoursesListComponent {
    router;
    auth = inject(AuthService);
    courseContent = inject(CourseContentService);
    searchQuery = '';
    /** Static fallback when API fails or user not logged in. */
    staticCourses = [
        {
            id: 1,
            title: 'Program Overview',
            description: 'Medical Coding is a core healthcare profession that involves translating clinical documentation such as diagnoses, procedures, and services into standardized medical codes.',
            thumbnail: 'assets/images/medical-coding.jpg',
            price: 150.00,
            discount: 33,
            accentColor: '#5B4BC4'
        },
        {
            id: 2,
            title: 'Course Highlights',
            description: 'Comprehensive coverage of ICD-10-CM, ICD-10-PCS, CPT, and HCPCS Level II coding systems with trainer-led live sessions.',
            thumbnail: 'assets/images/course-highlights.jpg',
            price: 150.00,
            discount: 20,
            accentColor: '#f59e0b'
        },
        {
            id: 3,
            title: 'Who Should Enroll',
            description: 'Life Science graduates, Pharmacy, Nursing, Allied Health professionals, and those transitioning into healthcare IT and RCM roles.',
            thumbnail: 'assets/images/who-enroll.jpg',
            price: 150.00,
            discount: 0,
            accentColor: '#10b981'
        },
        {
            id: 4,
            title: 'Curriculum Summary',
            description: 'Healthcare fundamentals, medical terminology, anatomy, diagnosis coding using ICD-10-CM, inpatient procedure coding using ICD-10-PCS.',
            thumbnail: 'assets/images/curriculum.jpg',
            price: 150.00,
            discount: 15,
            accentColor: '#3b82f6'
        },
        {
            id: 5,
            title: 'Certification Prepared',
            description: 'CPC – Certified Professional Coder (AAPC), CIC – Certified Inpatient Coder, CCS – Certified Coding Specialist (AHIMA).',
            thumbnail: 'assets/images/certification.jpg',
            price: 150.00,
            discount: 0,
            accentColor: '#8b5cf6'
        },
        {
            id: 6,
            title: 'Career Opportunities',
            description: 'Medical Coder, Inpatient/Outpatient Coder, Coding Auditor, Medical Billing Analyst, AR Analyst, Clinical Documentation Specialist.',
            thumbnail: 'assets/images/career.jpg',
            price: 150.00,
            discount: 25,
            accentColor: '#ec4899'
        },
        {
            id: 7,
            title: 'Specialty & Advanced Training',
            description: 'Inpatient DRG Coding, DRG Validation, Clinical Documentation Improvement (CDI), Ambulatory & Outpatient Coding, E&M Coding.',
            thumbnail: 'assets/images/specialty.jpg',
            price: 150.00,
            discount: 10,
            accentColor: '#14b8a6'
        },
        {
            id: 8,
            title: 'Coding Best Practices & Tips',
            description: 'Code strictly from provider documentation, ensure proper linkage between diagnosis and procedures for medical necessity.',
            thumbnail: 'assets/images/best-practices.jpg',
            price: 150.00,
            discount: 0,
            accentColor: '#f97316'
        },
        {
            id: 9,
            title: 'CMS & Industry Updates',
            description: 'Latest CMS ICD-10-CM and ICD-10-PCS guideline updates, OPPS and APC fundamentals, Medicare compliance requirements.',
            thumbnail: 'assets/images/cms-updates.jpg',
            price: 150.00,
            discount: 20,
            accentColor: '#ef4444'
        }
    ];
    /** Populated from API (GET /courses) or static fallback. */
    courses = [];
    myCourses = [
        {
            name: 'UI/UX Design',
            instructor: 'John Doe',
            progress: 50,
            progressColor: '#3B82F6',
            status: 'In Progress',
            startDate: 'Jan 10, 2025',
            endDate: 'Mar 15, 25',
            nextLiveClass: 'Feb 5, 2025'
        },
        {
            name: 'UI/UX Design',
            instructor: 'John Doe',
            progress: 15,
            progressColor: '#3B82F6',
            status: 'In Progress',
            startDate: 'Jan 10, 2025',
            endDate: 'Mar 15, 25',
            nextLiveClass: 'Feb 5, 2025'
        }
    ];
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
        this.courses = this.staticCourses.slice();
        this.courseContent.getAvailableCourses().subscribe({
            next: (list) => {
                if (!list.length)
                    return;
                this.courses = list.map((c) => ({
                    id: c.id,
                    title: c.title ?? c.name,
                    description: c.description ?? '',
                    thumbnail: c.thumbnail ?? '',
                    price: 0,
                    discount: 0,
                    accentColor: c.accentColor ?? '#5B4BC4',
                    author: c.author,
                    ratingAverage: 0,
                    ratingCount: 0,
                }));
            },
            error: () => this.loadDisplayCoursesFallback(),
        });
    }
    loadDisplayCoursesFallback() {
        this.auth.listCoursesForDisplay().subscribe({
            next: (list) => {
                this.courses = list.map((c) => ({
                    id: c.id,
                    title: c.title ?? c.name,
                    description: c.description ?? '',
                    thumbnail: c.thumbnail ?? '',
                    price: c.price ?? 0,
                    discount: c.discount ?? 0,
                    accentColor: c.accentColor ?? '#5B4BC4',
                    author: c.author,
                    ratingAverage: c.ratingAverage ?? 0,
                    ratingCount: c.ratingCount ?? 0,
                }));
            },
            error: () => {
                this.courses = this.staticCourses.slice();
            },
        });
    }
    /** Show Add New Course button only for SA and Admin (hidden for Instructor and Student). */
    showAddCourseButton() {
        return this.auth.canManageCourseContent();
    }
    /** SA/Admin/Instructor can manage course content. */
    canAddCourse() {
        return this.auth.canManageCourseContent();
    }
    navigateToAddCourse() {
        if (!this.canAddCourse())
            return;
        this.router.navigate(['/courses/add']);
    }
    calculateDiscountedPrice(price, discount) {
        if (!discount || discount <= 0)
            return price.toFixed(2);
        const discounted = price - (price * (discount / 100));
        return discounted.toFixed(2);
    }
    static ɵfac = function CoursesListComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CoursesListComponent)(i0.ɵɵdirectiveInject(i1.Router)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CoursesListComponent, selectors: [["app-courses-list"]], decls: 43, vars: 6, consts: [[1, "courses-container"], [1, "courses-header"], [1, "header-left"], [1, "search-field"], [1, "w-full"], [1, "pi", "pi-search"], ["pInputText", "", "type", "text", "placeholder", "Search by course name", "id", "course-search", 1, "w-full", 3, "ngModelChange", "ngModel"], [1, "header-actions"], ["pButton", "", "label", "Add New Course", "icon", "pi pi-plus", 3, "disabled", "pTooltip"], [1, "section-header"], [1, "section-title"], [1, "my-courses-list"], [1, "list-header"], [1, "col", "col-name"], [1, "col", "col-instructor"], [1, "col", "col-progress"], [1, "col", "col-status"], [1, "col", "col-start"], [1, "col", "col-end"], [1, "col", "col-next"], [1, "col", "col-actions"], [1, "list-body"], [1, "list-row"], [1, "view-all"], [1, "pi", "pi-chevron-right"], [1, "courses-carousel"], [3, "value", "numVisible", "numScroll", "circular"], ["pTemplate", "item"], ["pButton", "", "label", "Add New Course", "icon", "pi pi-plus", 3, "click", "disabled", "pTooltip"], [1, "course-icon-wrapper"], [1, "pi", "pi-box"], [1, "name-text"], [1, "col", "col-progress", "progress-col"], [1, "progress-bar-bg"], [1, "progress-bar-fill"], [1, "status-dot"], ["pTooltip", "Go to Course", "tooltipPosition", "top", 1, "icon-btn"], [1, "pi", "pi-arrow-right"], ["pTooltip", "View Details", "tooltipPosition", "top", 1, "icon-btn"], [1, "pi", "pi-eye"], [1, "course-card"], [1, "card-top"], [1, "tag"], ["pTooltip", "Bookmark Course", "tooltipPosition", "top", 1, "bookmark-btn"], [1, "pi", "pi-bookmark"], [1, "card-body"], [1, "accent-bar"], [1, "content"], [1, "course-title"], [1, "course-author"], [1, "course-description"], [1, "card-divider"], [1, "card-footer"], [1, "rating"], [1, "pi", "pi-star-fill"], [1, "rating-count"], [1, "price-action"], [1, "price-info"], [1, "current-price"], [1, "original-price"], [1, "get-course-btn"], [1, "unavailable-btn"]], template: function CoursesListComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "p-iconfield", 4);
            i0.ɵɵelement(5, "p-inputicon", 5);
            i0.ɵɵelementStart(6, "input", 6);
            i0.ɵɵtwoWayListener("ngModelChange", function CoursesListComponent_Template_input_ngModelChange_6_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event); return $event; });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(7, "div", 7);
            i0.ɵɵconditionalCreate(8, CoursesListComponent_Conditional_8_Template, 1, 2, "button", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 9)(10, "h2", 10);
            i0.ɵɵtext(11, "My Courses");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "div", 11)(13, "div", 12)(14, "div", 13);
            i0.ɵɵtext(15, "Course Name");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "div", 14);
            i0.ɵɵtext(17, "Instructor");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "div", 15);
            i0.ɵɵtext(19, "Progress \u21C5");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "div", 16);
            i0.ɵɵtext(21, "Status \u21C5");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 17);
            i0.ɵɵtext(23, "Start Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 18);
            i0.ɵɵtext(25, "End Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "div", 19);
            i0.ɵɵtext(27, "Next Live Classes");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "div", 20);
            i0.ɵɵtext(29, "Actions");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "div", 21);
            i0.ɵɵrepeaterCreate(31, CoursesListComponent_For_32_Template, 26, 12, "div", 22, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "div", 9)(34, "h2", 10);
            i0.ɵɵtext(35, "Popular Courses");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "div", 23)(37, "span");
            i0.ɵɵtext(38, "View all popular courses");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(39, "i", 24);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(40, "div", 25)(41, "p-carousel", 26);
            i0.ɵɵtemplate(42, CoursesListComponent_ng_template_42_Template, 28, 11, "ng-template", 27);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchQuery);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.showAddCourseButton() ? 8 : -1);
            i0.ɵɵadvance(23);
            i0.ɵɵrepeater(ctx.myCourses);
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("value", ctx.courses)("numVisible", 3)("numScroll", 1)("circular", true);
        } }, dependencies: [CommonModule, FormsModule, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgModel, ButtonModule, i3.ButtonDirective, i4.PrimeTemplate, TooltipModule, i5.Tooltip, CarouselModule, i6.Carousel, InputTextModule, i7.InputText, IconFieldModule, i8.IconField, InputIconModule, i9.InputIcon], styles: [".courses-container[_ngcontent-%COMP%] {\n    padding: 2rem;\n    background: #F3F4F6;\n    min-height: 100vh;\n}\n\n.courses-header[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 2rem;\n\n    // Search: PrimeNG input, same pattern as login (design rule)\n    .search-field {\n        max-width: 400px;\n\n        ::ng-deep .p-iconfield {\n            width: 100%;\n        }\n\n        ::ng-deep .p-inputtext {\n            width: 100%;\n            border-radius: 12px;\n            background: #f9fafb;\n            border: 1px solid #e5e7eb;\n            padding-left: 44px;\n            box-shadow: none;\n            font-size: 15px;\n        }\n\n        ::ng-deep .p-inputtext:focus {\n            border-color: var(--sqx-color-primary);\n            background: #ffffff;\n            box-shadow: 0 0 0 3px rgba(91, 75, 196, 0.1);\n        }\n\n        ::ng-deep .p-inputicon {\n            color: #9ca3af;\n            font-size: 16px;\n        }\n    }\n\n    // Add New Course Button\n    button {\n        background: var(--sqx-color-primary);\n        color: white;\n        border: none;\n        padding: 12px 24px;\n        border-radius: 8px;\n        font-weight: 600;\n\n        &:hover {\n            background: #5b4dc7;\n        }\n    }\n}\n\n.page-title[_ngcontent-%COMP%] {\n    font-size: 24px;\n    font-weight: 700;\n    color: var(--sqx-color-text);\n    margin-bottom: 1.5rem;\n}\n\n//[_ngcontent-%COMP%]   Summary[_ngcontent-%COMP%]   Cards\n.summary-cards-row[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    gap: 1.5rem;\n    margin-bottom: 2rem; // Decreased gap\n}\n\n.summary-card[_ngcontent-%COMP%] {\n    border-radius: 20px;\n    padding: 1.5rem;\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    height: 180px;\n    transition: all 0.3s ease;\n    background: white;\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);\n\n    .card-icon-wrapper {\n        background: #FFF7ED;\n        color: #F97316;\n    }\n\n    .card-info h3 {\n        color: var(--sqx-color-text);\n    }\n\n    .card-info p {\n        color: #9CA3AF;\n    }\n\n    .card-action {\n        color: var(--sqx-color-text);\n    }\n\n    // Hover effect to highlight (mimic the dark card concept)\n    &:hover {\n        background: linear-gradient(135deg, #1F2937 0%, #374151 100%);\n        color: white;\n        transform: translateY(-5px);\n        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);\n\n        .card-icon-wrapper {\n            background: white;\n            color: var(--sqx-color-text);\n        }\n\n        .card-info h3 {\n            color: white;\n        }\n\n        .card-info p {\n            color: #9CA3AF;\n        }\n\n        .card-action {\n            color: white;\n        }\n    }\n\n\n    .card-icon-wrapper {\n        width: 40px;\n        height: 40px;\n        border-radius: 12px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-weight: 700;\n        font-size: 16px;\n        margin-bottom: 1rem;\n        transition: all 0.3s ease;\n    }\n\n    .card-info {\n        h3 {\n            font-size: 16px;\n            font-weight: 700;\n            margin: 0 0 5px 0;\n        }\n\n        p {\n            font-size: 12px;\n            margin: 0;\n        }\n    }\n\n    .card-action {\n        display: flex;\n        align-items: center;\n        justify-content: flex-end;\n        gap: 5px;\n        font-size: 12px;\n        font-weight: 600;\n        cursor: pointer;\n        margin-top: auto;\n    }\n}\n\n//[_ngcontent-%COMP%]   Section[_ngcontent-%COMP%]   Headers\n.section-header[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 1rem; // Decreased gap\n\n    .section-title {\n        font-size: 20px;\n        font-weight: 700;\n        color: var(--sqx-color-text);\n        margin: 0;\n    }\n\n    .view-all {\n        font-size: 14px;\n        color: var(--sqx-color-text);\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        gap: 5px;\n        font-weight: 500;\n    }\n}\n\n//[_ngcontent-%COMP%]   Courses[_ngcontent-%COMP%]   Carousel\n.courses-carousel[_ngcontent-%COMP%] {\n    margin-bottom: 2rem;\n\n    ::ng-deep .p-carousel-item {\n        padding: 0 0.75rem; // Add gap between items\n    }\n\n    ::ng-deep .p-carousel-indicators {\n        display: none !important; // Hide indicators if not needed or style them\n    }\n\n    // Carousel Navigation Buttons Styling\n    ::ng-deep .p-carousel-prev,\n    ::ng-deep .p-carousel-next {\n        background-color: white !important;\n        background: white !important; // redundancy for safety\n        border: 1px solid #E5E7EB !important;\n        color: #6B7280 !important;\n        width: 40px !important;\n        height: 40px !important;\n        border-radius: 50% !important;\n        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;\n        transition: all 0.2s !important;\n        opacity: 1 !important;\n        display: flex !important;\n        align-items: center !important;\n        justify-content: center !important;\n\n        &:hover {\n            color: var(--sqx-color-primary) !important;\n            background-color: #F9FAFB !important;\n            transform: scale(1.05);\n        }\n\n        &:disabled {\n            opacity: 0.5 !important;\n            cursor: default !important;\n            box-shadow: none !important;\n        }\n\n        // Ensure icon is visible\n        .p-icon,\n        .pi {\n            font-size: 14px !important;\n            color: inherit !important;\n        }\n    }\n}\n\n//[_ngcontent-%COMP%]   .courses-grid[_ngcontent-%COMP%]   removed\n\n.course-card[_ngcontent-%COMP%] {\n    background: white;\n    border-radius: 24px;\n    padding: 1.5rem;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); // Decreased shadow\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n    position: relative;\n    // Hover effect removed\n\n    .card-top {\n        display: flex;\n        justify-content: space-between;\n        align-items: flex-start;\n        margin-bottom: 1rem;\n\n        .tag {\n            background: #E0F2FE;\n            color: #0EA5E9;\n            padding: 6px 12px;\n            border-radius: 20px;\n            font-size: 11px;\n            font-weight: 600;\n        }\n\n        .bookmark-btn {\n            background: #F3F4F6;\n            border: none;\n            width: 36px;\n            height: 36px;\n            border-radius: 50%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            cursor: pointer;\n            color: #9CA3AF;\n\n            &:hover {\n                color: var(--sqx-color-primary);\n            }\n        }\n    }\n\n    .card-body {\n        display: flex;\n        gap: 15px;\n        margin-bottom: 1.5rem;\n        flex: 1;\n\n        .accent-bar {\n            width: 4px;\n            border-radius: 4px;\n            flex-shrink: 0;\n        }\n\n        .content {\n            .course-title {\n                font-size: 18px;\n                font-weight: 700;\n                margin: 0 0 10px 0;\n                color: var(--sqx-color-text);\n                line-height: 1.3;\n            }\n\n            .course-author {\n                font-size: 12px;\n                color: var(--sqx-color-text-light);\n                margin: 0 0 6px 0;\n            }\n\n            .course-description {\n                font-size: 13px;\n                color: #6B7280;\n                line-height: 1.5;\n                margin: 0;\n                display: -webkit-box;\n                line-clamp: 3;\n                -webkit-line-clamp: 3;\n                -webkit-box-orient: vertical;\n                overflow: hidden;\n            }\n        }\n    }\n\n    .card-divider {\n        height: 1px;\n        background: #F3F4F6;\n        margin-bottom: 1rem;\n    }\n\n    .card-footer {\n        display: flex;\n        flex-direction: column;\n        gap: 1rem;\n\n        .rating {\n            display: flex;\n            align-items: center;\n            gap: 5px;\n            font-size: 14px;\n            font-weight: 600;\n\n            .rating-count {\n                font-size: 12px;\n                font-weight: 500;\n                color: var(--sqx-color-text-light);\n            }\n\n            i {\n                color: #F59E0B;\n            }\n        }\n\n        .price-action {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n\n            .price-info {\n                display: flex;\n                align-items: baseline;\n                gap: 8px;\n\n                .current-price {\n                    font-size: 18px;\n                    font-weight: 700;\n                    color: var(--sqx-color-text);\n                }\n\n                .original-price {\n                    font-size: 13px;\n                    text-decoration: line-through;\n                    color: #9CA3AF;\n                }\n            }\n\n            .get-course-btn {\n                background: var(--sqx-color-primary);\n                color: white;\n                border: none;\n                padding: 10px 20px;\n                border-radius: 30px;\n                font-size: 13px;\n                font-weight: 600;\n                display: flex;\n                align-items: center;\n                gap: 5px;\n                cursor: pointer;\n                transition: all 0.2s;\n\n                &:hover {\n                    background: #5b4dc7;\n                }\n            }\n\n            .unavailable-btn {\n                background: #E5E7EB;\n                color: #374151;\n                border: none;\n                padding: 10px 20px;\n                border-radius: 30px;\n                font-size: 13px;\n                font-weight: 600;\n                cursor: default;\n            }\n        }\n    }\n}\n\n//[_ngcontent-%COMP%]   My[_ngcontent-%COMP%]   Courses[_ngcontent-%COMP%]   List\n.my-courses-list[_ngcontent-%COMP%] {\n    background: white;\n    border-radius: 20px;\n    padding: 1.5rem 0; // Remove side padding to let lines touch edges\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);\n    overflow: hidden; // Ensure radius clips content\n    margin-bottom: 3rem; // Added gap as requested\n}\n\n.list-header[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 2fr 1.5fr 1.5fr 1fr 1fr 1fr 1.5fr 100px;\n    padding: 0 1.5rem 1rem 1.5rem; // Add side padding back to content\n    border-bottom: 1px solid #F3F4F6;\n    font-size: 12px;\n    font-weight: 600;\n    color: #6B7280;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n}\n\n.list-body[_ngcontent-%COMP%] {\n    .list-row {\n        display: grid;\n        grid-template-columns: 2fr 1.5fr 1.5fr 1fr 1fr 1fr 1.5fr 100px;\n        padding: 1rem 1.5rem; // Add side padding back to content\n        align-items: center;\n        border-bottom: 1px solid #F3F4F6;\n        font-size: 14px;\n        color: var(--sqx-color-text);\n\n        &:last-child {\n            border-bottom: none;\n        }\n\n        &:hover {\n            background: #F9FAFB;\n        }\n\n        .col-name {\n            display: flex;\n            align-items: center;\n            gap: 12px;\n            font-weight: 600;\n\n            .course-icon-wrapper {\n                width: 36px;\n                height: 36px;\n                background: #FFF7ED;\n                border: 1px solid #FED7AA;\n                border-radius: 8px;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n\n                i {\n                    color: #F97316;\n                    font-size: 16px;\n                }\n            }\n        }\n\n        .progress-col {\n            .progress-bar-bg {\n                width: 100%;\n                height: 6px;\n                background: #F3F4F6;\n                border-radius: 10px;\n                overflow: hidden;\n\n                .progress-bar-fill {\n                    height: 100%;\n                    border-radius: 10px;\n                }\n            }\n        }\n\n        .col-status {\n            display: flex;\n            align-items: center;\n            gap: 8px;\n            font-size: 13px;\n\n            .status-dot {\n                width: 8px;\n                height: 8px;\n                border-radius: 50%;\n                background: #D1D5DB;\n\n                &.in-progress {\n                    background: #F97316;\n                }\n            }\n        }\n\n        .col-actions {\n            display: flex;\n            gap: 10px;\n\n            .icon-btn {\n                width: 28px;\n                height: 28px;\n                border-radius: 50%;\n                border: none;\n                background: transparent;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                cursor: pointer;\n                color: #6B7280;\n\n                &:hover {\n                    background: #F3F4F6;\n                    color: var(--sqx-color-primary);\n                }\n\n                &.delete:hover {\n                    color: #EF4444;\n                }\n\n                i {\n                    font-size: 14px;\n                }\n            }\n        }\n    }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CoursesListComponent, [{
        type: Component,
        args: [{ selector: 'app-courses-list', standalone: true, imports: [CommonModule, FormsModule, ButtonModule, TooltipModule, CarouselModule, InputTextModule, IconFieldModule, InputIconModule], template: "<div class=\"courses-container\">\n\n    <div class=\"courses-header\">\n        <div class=\"header-left\">\n            <div class=\"search-field\">\n                <p-iconfield class=\"w-full\">\n                    <p-inputicon class=\"pi pi-search\" />\n                    <input pInputText type=\"text\" [(ngModel)]=\"searchQuery\" placeholder=\"Search by course name\"\n                        id=\"course-search\" class=\"w-full\" />\n                </p-iconfield>\n            </div>\n        </div>\n        <div class=\"header-actions\">\n            @if (showAddCourseButton()) {\n            <button\n              pButton\n              label=\"Add New Course\"\n              icon=\"pi pi-plus\"\n              [disabled]=\"!canAddCourse()\"\n              (click)=\"navigateToAddCourse()\"\n              [pTooltip]=\"canAddCourse() ? '' : 'Head permission required to add courses'\"\n            ></button>\n            }\n        </div>\n    </div>\n\n    <!-- My Courses Section -->\n    <div class=\"section-header\">\n        <h2 class=\"section-title\">My Courses</h2>\n    </div>\n\n    <div class=\"my-courses-list\">\n        <div class=\"list-header\">\n            <div class=\"col col-name\">Course Name</div>\n            <div class=\"col col-instructor\">Instructor</div>\n            <div class=\"col col-progress\">Progress \u21C5</div>\n            <div class=\"col col-status\">Status \u21C5</div>\n            <div class=\"col col-start\">Start Date</div>\n            <div class=\"col col-end\">End Date</div>\n            <div class=\"col col-next\">Next Live Classes</div>\n            <div class=\"col col-actions\">Actions</div>\n        </div>\n\n        <div class=\"list-body\">\n            @for (myCourse of myCourses; track myCourse.name) {\n            <div class=\"list-row\">\n                <div class=\"col col-name\">\n                    <div class=\"course-icon-wrapper\">\n                        <i class=\"pi pi-box\"></i>\n                    </div>\n                    <span class=\"name-text\">{{myCourse.name}}</span>\n                </div>\n                <div class=\"col col-instructor\">{{myCourse.instructor}}</div>\n                <div class=\"col col-progress progress-col\">\n                    <div class=\"progress-bar-bg\">\n                        <div class=\"progress-bar-fill\" [style.width.%]=\"myCourse.progress\"\n                            [style.background-color]=\"myCourse.progressColor\"></div>\n                    </div>\n                </div>\n                <div class=\"col col-status\">\n                    <span class=\"status-dot\" [class.in-progress]=\"myCourse.status === 'In Progress'\"></span>\n                    <span>{{myCourse.status}}</span>\n                </div>\n                <div class=\"col col-start\">{{myCourse.startDate}}</div>\n                <div class=\"col col-end\">{{myCourse.endDate}}</div>\n                <div class=\"col col-next\">{{myCourse.nextLiveClass}}</div>\n                <div class=\"col col-actions\">\n                    <button class=\"icon-btn\" pTooltip=\"Go to Course\" tooltipPosition=\"top\"><i\n                            class=\"pi pi-arrow-right\"></i></button>\n                    <button class=\"icon-btn\" pTooltip=\"View Details\" tooltipPosition=\"top\"><i\n                            class=\"pi pi-eye\"></i></button>\n                </div>\n            </div>\n            }\n        </div>\n    </div>\n\n    <!-- Popular Courses Section -->\n    <div class=\"section-header\">\n        <h2 class=\"section-title\">Popular Courses</h2>\n        <div class=\"view-all\">\n            <span>View all popular courses</span>\n            <i class=\"pi pi-chevron-right\"></i>\n        </div>\n    </div>\n\n    <div class=\"courses-carousel\">\n        <p-carousel [value]=\"courses\" [numVisible]=\"3\" [numScroll]=\"1\" [circular]=\"true\">\n            <ng-template let-course pTemplate=\"item\">\n                <div class=\"course-card\">\n                    <div class=\"card-top\">\n                        <span class=\"tag\">Popular in week</span>\n                        <button class=\"bookmark-btn\" pTooltip=\"Bookmark Course\" tooltipPosition=\"top\">\n                            <i class=\"pi pi-bookmark\"></i>\n                        </button>\n                    </div>\n\n                    <div class=\"card-body\">\n                        <div class=\"accent-bar\" [style.background-color]=\"course.accentColor || '#FFC107'\"></div>\n                        <div class=\"content\">\n                            <h3 class=\"course-title\">{{course.title}}</h3>\n                            @if (course.author) {\n                                <p class=\"course-author\">By {{ course.author }}</p>\n                            }\n                            <p class=\"course-description\">{{course.description}}</p>\n                        </div>\n                    </div>\n\n                    <div class=\"card-divider\"></div>\n\n                    <div class=\"card-footer\">\n                        <div class=\"rating\">\n                            <i class=\"pi pi-star-fill\"></i>\n                            <span>{{ course.ratingAverage ?? 4.2 }}</span>\n                            @if (course.ratingCount != null && course.ratingCount > 0) {\n                                <span class=\"rating-count\">({{ course.ratingCount }} rating{{ course.ratingCount === 1 ? '' : 's' }})</span>\n                            }\n                        </div>\n\n                        <div class=\"price-action\">\n                            <div class=\"price-info\">\n                                <span class=\"current-price\">${{calculateDiscountedPrice(course.price,\n                                    course.discount)}}</span>\n                                @if (course.discount) {\n                                <span class=\"original-price\">${{course.price}}</span>\n                            }\n                            </div>\n\n                            @if (!course.unavailable) {\n                            <button class=\"get-course-btn\">\n                                <span>Get Course</span>\n                                <i class=\"pi pi-chevron-right\"></i>\n                            </button>\n                            }\n                            @if (course.unavailable) {\n                            <button class=\"unavailable-btn\">\n                                <span>Unavailable</span>\n                            </button>\n                            }\n                        </div>\n                    </div>\n                </div>\n            </ng-template>\n        </p-carousel>\n    </div>\n\n</div>\n", styles: [".courses-container {\n    padding: 2rem;\n    background: #F3F4F6;\n    min-height: 100vh;\n}\n\n.courses-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 2rem;\n\n    // Search: PrimeNG input, same pattern as login (design rule)\n    .search-field {\n        max-width: 400px;\n\n        ::ng-deep .p-iconfield {\n            width: 100%;\n        }\n\n        ::ng-deep .p-inputtext {\n            width: 100%;\n            border-radius: 12px;\n            background: #f9fafb;\n            border: 1px solid #e5e7eb;\n            padding-left: 44px;\n            box-shadow: none;\n            font-size: 15px;\n        }\n\n        ::ng-deep .p-inputtext:focus {\n            border-color: var(--sqx-color-primary);\n            background: #ffffff;\n            box-shadow: 0 0 0 3px rgba(91, 75, 196, 0.1);\n        }\n\n        ::ng-deep .p-inputicon {\n            color: #9ca3af;\n            font-size: 16px;\n        }\n    }\n\n    // Add New Course Button\n    button {\n        background: var(--sqx-color-primary);\n        color: white;\n        border: none;\n        padding: 12px 24px;\n        border-radius: 8px;\n        font-weight: 600;\n\n        &:hover {\n            background: #5b4dc7;\n        }\n    }\n}\n\n.page-title {\n    font-size: 24px;\n    font-weight: 700;\n    color: var(--sqx-color-text);\n    margin-bottom: 1.5rem;\n}\n\n// Summary Cards\n.summary-cards-row {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    gap: 1.5rem;\n    margin-bottom: 2rem; // Decreased gap\n}\n\n.summary-card {\n    border-radius: 20px;\n    padding: 1.5rem;\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    height: 180px;\n    transition: all 0.3s ease;\n    background: white;\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);\n\n    .card-icon-wrapper {\n        background: #FFF7ED;\n        color: #F97316;\n    }\n\n    .card-info h3 {\n        color: var(--sqx-color-text);\n    }\n\n    .card-info p {\n        color: #9CA3AF;\n    }\n\n    .card-action {\n        color: var(--sqx-color-text);\n    }\n\n    // Hover effect to highlight (mimic the dark card concept)\n    &:hover {\n        background: linear-gradient(135deg, #1F2937 0%, #374151 100%);\n        color: white;\n        transform: translateY(-5px);\n        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);\n\n        .card-icon-wrapper {\n            background: white;\n            color: var(--sqx-color-text);\n        }\n\n        .card-info h3 {\n            color: white;\n        }\n\n        .card-info p {\n            color: #9CA3AF;\n        }\n\n        .card-action {\n            color: white;\n        }\n    }\n\n\n    .card-icon-wrapper {\n        width: 40px;\n        height: 40px;\n        border-radius: 12px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-weight: 700;\n        font-size: 16px;\n        margin-bottom: 1rem;\n        transition: all 0.3s ease;\n    }\n\n    .card-info {\n        h3 {\n            font-size: 16px;\n            font-weight: 700;\n            margin: 0 0 5px 0;\n        }\n\n        p {\n            font-size: 12px;\n            margin: 0;\n        }\n    }\n\n    .card-action {\n        display: flex;\n        align-items: center;\n        justify-content: flex-end;\n        gap: 5px;\n        font-size: 12px;\n        font-weight: 600;\n        cursor: pointer;\n        margin-top: auto;\n    }\n}\n\n// Section Headers\n.section-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 1rem; // Decreased gap\n\n    .section-title {\n        font-size: 20px;\n        font-weight: 700;\n        color: var(--sqx-color-text);\n        margin: 0;\n    }\n\n    .view-all {\n        font-size: 14px;\n        color: var(--sqx-color-text);\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        gap: 5px;\n        font-weight: 500;\n    }\n}\n\n// Courses Carousel\n.courses-carousel {\n    margin-bottom: 2rem;\n\n    ::ng-deep .p-carousel-item {\n        padding: 0 0.75rem; // Add gap between items\n    }\n\n    ::ng-deep .p-carousel-indicators {\n        display: none !important; // Hide indicators if not needed or style them\n    }\n\n    // Carousel Navigation Buttons Styling\n    ::ng-deep .p-carousel-prev,\n    ::ng-deep .p-carousel-next {\n        background-color: white !important;\n        background: white !important; // redundancy for safety\n        border: 1px solid #E5E7EB !important;\n        color: #6B7280 !important;\n        width: 40px !important;\n        height: 40px !important;\n        border-radius: 50% !important;\n        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;\n        transition: all 0.2s !important;\n        opacity: 1 !important;\n        display: flex !important;\n        align-items: center !important;\n        justify-content: center !important;\n\n        &:hover {\n            color: var(--sqx-color-primary) !important;\n            background-color: #F9FAFB !important;\n            transform: scale(1.05);\n        }\n\n        &:disabled {\n            opacity: 0.5 !important;\n            cursor: default !important;\n            box-shadow: none !important;\n        }\n\n        // Ensure icon is visible\n        .p-icon,\n        .pi {\n            font-size: 14px !important;\n            color: inherit !important;\n        }\n    }\n}\n\n// .courses-grid removed\n\n.course-card {\n    background: white;\n    border-radius: 24px;\n    padding: 1.5rem;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); // Decreased shadow\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n    position: relative;\n    // Hover effect removed\n\n    .card-top {\n        display: flex;\n        justify-content: space-between;\n        align-items: flex-start;\n        margin-bottom: 1rem;\n\n        .tag {\n            background: #E0F2FE;\n            color: #0EA5E9;\n            padding: 6px 12px;\n            border-radius: 20px;\n            font-size: 11px;\n            font-weight: 600;\n        }\n\n        .bookmark-btn {\n            background: #F3F4F6;\n            border: none;\n            width: 36px;\n            height: 36px;\n            border-radius: 50%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            cursor: pointer;\n            color: #9CA3AF;\n\n            &:hover {\n                color: var(--sqx-color-primary);\n            }\n        }\n    }\n\n    .card-body {\n        display: flex;\n        gap: 15px;\n        margin-bottom: 1.5rem;\n        flex: 1;\n\n        .accent-bar {\n            width: 4px;\n            border-radius: 4px;\n            flex-shrink: 0;\n        }\n\n        .content {\n            .course-title {\n                font-size: 18px;\n                font-weight: 700;\n                margin: 0 0 10px 0;\n                color: var(--sqx-color-text);\n                line-height: 1.3;\n            }\n\n            .course-author {\n                font-size: 12px;\n                color: var(--sqx-color-text-light);\n                margin: 0 0 6px 0;\n            }\n\n            .course-description {\n                font-size: 13px;\n                color: #6B7280;\n                line-height: 1.5;\n                margin: 0;\n                display: -webkit-box;\n                line-clamp: 3;\n                -webkit-line-clamp: 3;\n                -webkit-box-orient: vertical;\n                overflow: hidden;\n            }\n        }\n    }\n\n    .card-divider {\n        height: 1px;\n        background: #F3F4F6;\n        margin-bottom: 1rem;\n    }\n\n    .card-footer {\n        display: flex;\n        flex-direction: column;\n        gap: 1rem;\n\n        .rating {\n            display: flex;\n            align-items: center;\n            gap: 5px;\n            font-size: 14px;\n            font-weight: 600;\n\n            .rating-count {\n                font-size: 12px;\n                font-weight: 500;\n                color: var(--sqx-color-text-light);\n            }\n\n            i {\n                color: #F59E0B;\n            }\n        }\n\n        .price-action {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n\n            .price-info {\n                display: flex;\n                align-items: baseline;\n                gap: 8px;\n\n                .current-price {\n                    font-size: 18px;\n                    font-weight: 700;\n                    color: var(--sqx-color-text);\n                }\n\n                .original-price {\n                    font-size: 13px;\n                    text-decoration: line-through;\n                    color: #9CA3AF;\n                }\n            }\n\n            .get-course-btn {\n                background: var(--sqx-color-primary);\n                color: white;\n                border: none;\n                padding: 10px 20px;\n                border-radius: 30px;\n                font-size: 13px;\n                font-weight: 600;\n                display: flex;\n                align-items: center;\n                gap: 5px;\n                cursor: pointer;\n                transition: all 0.2s;\n\n                &:hover {\n                    background: #5b4dc7;\n                }\n            }\n\n            .unavailable-btn {\n                background: #E5E7EB;\n                color: #374151;\n                border: none;\n                padding: 10px 20px;\n                border-radius: 30px;\n                font-size: 13px;\n                font-weight: 600;\n                cursor: default;\n            }\n        }\n    }\n}\n\n// My Courses List\n.my-courses-list {\n    background: white;\n    border-radius: 20px;\n    padding: 1.5rem 0; // Remove side padding to let lines touch edges\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);\n    overflow: hidden; // Ensure radius clips content\n    margin-bottom: 3rem; // Added gap as requested\n}\n\n.list-header {\n    display: grid;\n    grid-template-columns: 2fr 1.5fr 1.5fr 1fr 1fr 1fr 1.5fr 100px;\n    padding: 0 1.5rem 1rem 1.5rem; // Add side padding back to content\n    border-bottom: 1px solid #F3F4F6;\n    font-size: 12px;\n    font-weight: 600;\n    color: #6B7280;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n}\n\n.list-body {\n    .list-row {\n        display: grid;\n        grid-template-columns: 2fr 1.5fr 1.5fr 1fr 1fr 1fr 1.5fr 100px;\n        padding: 1rem 1.5rem; // Add side padding back to content\n        align-items: center;\n        border-bottom: 1px solid #F3F4F6;\n        font-size: 14px;\n        color: var(--sqx-color-text);\n\n        &:last-child {\n            border-bottom: none;\n        }\n\n        &:hover {\n            background: #F9FAFB;\n        }\n\n        .col-name {\n            display: flex;\n            align-items: center;\n            gap: 12px;\n            font-weight: 600;\n\n            .course-icon-wrapper {\n                width: 36px;\n                height: 36px;\n                background: #FFF7ED;\n                border: 1px solid #FED7AA;\n                border-radius: 8px;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n\n                i {\n                    color: #F97316;\n                    font-size: 16px;\n                }\n            }\n        }\n\n        .progress-col {\n            .progress-bar-bg {\n                width: 100%;\n                height: 6px;\n                background: #F3F4F6;\n                border-radius: 10px;\n                overflow: hidden;\n\n                .progress-bar-fill {\n                    height: 100%;\n                    border-radius: 10px;\n                }\n            }\n        }\n\n        .col-status {\n            display: flex;\n            align-items: center;\n            gap: 8px;\n            font-size: 13px;\n\n            .status-dot {\n                width: 8px;\n                height: 8px;\n                border-radius: 50%;\n                background: #D1D5DB;\n\n                &.in-progress {\n                    background: #F97316;\n                }\n            }\n        }\n\n        .col-actions {\n            display: flex;\n            gap: 10px;\n\n            .icon-btn {\n                width: 28px;\n                height: 28px;\n                border-radius: 50%;\n                border: none;\n                background: transparent;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                cursor: pointer;\n                color: #6B7280;\n\n                &:hover {\n                    background: #F3F4F6;\n                    color: var(--sqx-color-primary);\n                }\n\n                &.delete:hover {\n                    color: #EF4444;\n                }\n\n                i {\n                    font-size: 14px;\n                }\n            }\n        }\n    }\n}\n"] }]
    }], () => [{ type: i1.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CoursesListComponent, { className: "CoursesListComponent", filePath: "src/app/modules/courses/courses-list/courses-list.component.ts", lineNumber: 47 }); })();
