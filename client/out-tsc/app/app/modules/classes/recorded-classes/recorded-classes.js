import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/header.service";
import * as i2 from "../../core/services/course-content.service";
import * as i3 from "primeng/button";
import * as i4 from "@angular/common";
const _c0 = () => [];
const _forTrack0 = ($index, $item) => $item.id;
function RecordedClasses_Conditional_1_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1, "Loading recorded classes...");
    i0.ɵɵelementEnd();
} }
function RecordedClasses_Conditional_1_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function RecordedClasses_Conditional_1_For_5_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵlistener("click", function RecordedClasses_Conditional_1_For_5_Template_div_click_0_listener() { const course_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.selectCourse(course_r3)); });
    i0.ɵɵelementStart(1, "div", 6);
    i0.ɵɵelement(2, "i", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 8)(4, "h3", 9);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 10)(7, "span");
    i0.ɵɵelement(8, "i", 11);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵelement(11, "i", 12);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 13)(14, "div", 14);
    i0.ɵɵelement(15, "div", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span", 16);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "titlecase");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "button", 17);
    i0.ɵɵelement(20, "i", 18);
    i0.ɵɵtext(21, " Open ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const course_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(course_r3.title);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", course_r3.moduleCount, " Modules");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", course_r3.lessonCount, " Lessons");
    i0.ɵɵadvance(3);
    i0.ɵɵstyleProp("width", course_r3.moduleCount ? 20 : 0, "%")("background-color", ctx_r0.getProgressColor(course_r3.moduleCount ? 20 : 0));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 8, course_r3.status));
} }
function RecordedClasses_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵconditionalCreate(1, RecordedClasses_Conditional_1_Conditional_1_Template, 2, 0, "div", 2)(2, RecordedClasses_Conditional_1_Conditional_2_Template, 2, 1, "div", 2);
    i0.ɵɵelementStart(3, "div", 3);
    i0.ɵɵrepeaterCreate(4, RecordedClasses_Conditional_1_For_5_Template, 22, 10, "div", 4, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.loading ? 1 : ctx_r0.error ? 2 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.courses);
} }
function RecordedClasses_Conditional_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1, "No modules uploaded yet.");
    i0.ɵɵelementEnd();
} }
function RecordedClasses_Conditional_2_For_4_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵlistener("click", function RecordedClasses_Conditional_2_For_4_Template_div_click_0_listener() { const chapter_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.selectChapter(chapter_r5)); });
    i0.ɵɵelementStart(1, "div", 22);
    i0.ɵɵelement(2, "i", 23);
    i0.ɵɵelementStart(3, "span", 24);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 25)(6, "h4", 26);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 27);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const chapter_r5 = ctx.$implicit;
    const ɵ$index_64_r6 = ctx.$index;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("border-bottom-color", ctx_r0.moduleColor(ɵ$index_64_r6));
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("color", ctx_r0.moduleColor(ɵ$index_64_r6));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("0", ɵ$index_64_r6 + 1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(chapter_r5.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", chapter_r5.lessons.length, " Lessons");
} }
function RecordedClasses_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵconditionalCreate(1, RecordedClasses_Conditional_2_Conditional_1_Template, 2, 0, "div", 2);
    i0.ɵɵelementStart(2, "div", 19);
    i0.ɵɵrepeaterCreate(3, RecordedClasses_Conditional_2_For_4_Template, 10, 7, "div", 20, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.selectedContent || ctx_r0.selectedContent.modules.length === 0 ? 1 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater((ctx_r0.selectedContent == null ? null : ctx_r0.selectedContent.modules) || i0.ɵɵpureFunction0(1, _c0));
} }
function RecordedClasses_Conditional_3_For_3_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 30);
    i0.ɵɵlistener("click", function RecordedClasses_Conditional_3_For_3_Template_div_click_0_listener() { const concept_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.openConcept(concept_r8)); });
    i0.ɵɵelementStart(1, "div", 31);
    i0.ɵɵelement(2, "i");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 32)(4, "h4", 33);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 34);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "titlecase");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 35);
    i0.ɵɵelement(10, "button", 36);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const concept_r8 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r0.lessonType(concept_r8) === "video" ? "pi pi-play-circle" : "pi pi-file");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(concept_r8.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(8, 5, ctx_r0.lessonType(concept_r8)), " \u2022 ", ctx_r0.lessonDuration(concept_r8));
} }
function RecordedClasses_Conditional_3_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "i", 18);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No lessons uploaded yet.");
    i0.ɵɵelementEnd()();
} }
function RecordedClasses_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1)(1, "div", 28);
    i0.ɵɵrepeaterCreate(2, RecordedClasses_Conditional_3_For_3_Template, 11, 7, "div", 29, _forTrack0);
    i0.ɵɵconditionalCreate(4, RecordedClasses_Conditional_3_Conditional_4_Template, 4, 0, "div", 2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.selectedChapter.lessons);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.selectedChapter.lessons.length === 0 ? 4 : -1);
} }
export class RecordedClasses {
    headerService;
    contentService;
    // State
    currentView = 'courses';
    selectedCourse = null;
    selectedContent = null;
    selectedChapter = null;
    courses = [];
    loading = true;
    error = '';
    constructor(headerService, contentService) {
        this.headerService = headerService;
        this.contentService = contentService;
        this.updateGlobalHeader();
    }
    ngOnInit() {
        this.contentService.getAvailableCourses().subscribe({
            next: (courses) => {
                this.courses = courses;
                this.loading = false;
                if (!courses.length)
                    this.error = 'No recorded class content is available yet.';
            },
            error: () => {
                this.loading = false;
                this.error = 'Could not load recorded classes.';
            },
        });
    }
    ngOnDestroy() {
        this.headerService.reset();
    }
    // Navigation Methods
    selectCourse(course) {
        this.selectedCourse = course;
        this.loading = true;
        this.contentService.getContent(course.id).subscribe({
            next: (content) => {
                this.selectedContent = content;
                this.currentView = 'chapters';
                this.loading = false;
                this.updateGlobalHeader();
            },
            error: () => {
                this.loading = false;
                this.error = 'Content is not published or you are not enrolled in this course.';
            },
        });
    }
    selectChapter(chapter) {
        this.selectedChapter = chapter;
        this.currentView = 'concepts';
        this.updateGlobalHeader();
    }
    // Helpers
    getProgressColor(progress) {
        if (progress >= 75)
            return '#10B981'; // Green
        if (progress >= 40)
            return '#5B4BC4'; // Primary
        return '#F59E0B'; // Orange
    }
    // Content Interaction
    openConcept(lesson) {
        const video = lesson.blocks.find((block) => block.type === 'video' && block.url);
        const document = lesson.blocks.find((block) => ['document', 'link', 'image'].includes(block.type) && block.url);
        const target = video ?? document;
        if (target?.url)
            window.open(this.contentService.absoluteAssetUrl(target.url), '_blank', 'noopener');
    }
    updateGlobalHeader() {
        const base = [
            { icon: 'pi pi-home', url: '/dashboard', label: 'Home' }, // Provide label for clarity/fallback
            { label: 'Classes' },
            { label: 'Recorded Classes', command: () => this.resetView() }
        ];
        if (this.currentView === 'courses') {
            this.headerService.updateBreadcrumbs([...base]);
        }
        else if (this.currentView === 'chapters' && this.selectedCourse) {
            this.headerService.updateBreadcrumbs([
                ...base,
                {
                    label: this.selectedCourse.title || 'Course', // Fallback for undefined
                    title: this.selectedCourse.title
                }
            ]);
        }
        else if (this.currentView === 'concepts' && this.selectedCourse && this.selectedChapter) {
            this.headerService.updateBreadcrumbs([
                ...base,
                {
                    label: this.selectedCourse.title || 'Course',
                    title: this.selectedCourse.title,
                    command: () => this.selectCourse(this.selectedCourse)
                },
                { label: this.selectedChapter.title || 'Chapter' }
            ]);
        }
    }
    resetView() {
        this.currentView = 'courses';
        this.selectedCourse = null;
        this.selectedContent = null;
        this.selectedChapter = null;
        this.updateGlobalHeader();
    }
    lessonType(lesson) {
        if (lesson.blocks.some((block) => block.type === 'video'))
            return 'video';
        if (lesson.blocks.some((block) => block.type === 'assignment_note'))
            return 'assignment';
        return 'reading';
    }
    lessonDuration(lesson) {
        return lesson.durationMinutes ? `${lesson.durationMinutes} min` : 'Reading';
    }
    moduleColor(index) {
        return ['#C7D2FE', '#A5F3FC', '#DDD6FE', '#FDE68A', '#BBF7D0', '#E5E7EB'][index % 6];
    }
    static ɵfac = function RecordedClasses_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RecordedClasses)(i0.ɵɵdirectiveInject(i1.HeaderService), i0.ɵɵdirectiveInject(i2.CourseContentService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RecordedClasses, selectors: [["sqx-recorded-classes"]], decls: 4, vars: 3, consts: [[1, "recorded-classes-container"], [1, "view-section", "fade-in"], [1, "empty-state"], [1, "courses-grid"], [1, "course-card-premium"], [1, "course-card-premium", 3, "click"], [1, "card-icon-wrapper"], [1, "pi", "pi-video", 2, "font-size", "2rem", "color", "var(--sqx-color-primary)"], [1, "card-content"], [1, "course-title"], [1, "course-meta"], [1, "pi", "pi-folder"], [1, "pi", "pi-clock"], [1, "progress-section"], [1, "progress-bar"], [1, "fill"], [1, "progress-text"], [1, "action-btn"], [1, "pi", "pi-folder-open"], [1, "folders-grid"], [1, "folder-card"], [1, "folder-card", 3, "click"], [1, "folder-top"], [1, "pi", "pi-folder", "folder-icon"], [1, "chapter-num-badge"], [1, "folder-body"], [1, "folder-title"], [1, "folder-subtitle"], [1, "concepts-grid"], [1, "concept-item"], [1, "concept-item", 3, "click"], [1, "concept-icon"], [1, "concept-info"], [1, "concept-title"], [1, "concept-meta"], [1, "concept-action"], ["pButton", "", "icon", "pi pi-play", 1, "p-button-rounded", "p-button-text"]], template: function RecordedClasses_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, RecordedClasses_Conditional_1_Template, 6, 1, "div", 1);
            i0.ɵɵconditionalCreate(2, RecordedClasses_Conditional_2_Template, 5, 2, "div", 1);
            i0.ɵɵconditionalCreate(3, RecordedClasses_Conditional_3_Template, 5, 1, "div", 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.currentView === "courses" ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.currentView === "chapters" && ctx.selectedCourse ? 2 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.currentView === "concepts" && ctx.selectedChapter ? 3 : -1);
        } }, dependencies: [CommonModule, BreadcrumbModule, CardModule, ButtonModule, i3.ButtonDirective, TooltipModule, i4.TitleCasePipe], styles: [".recorded-classes-container[_ngcontent-%COMP%] {\n    padding: 2rem;\n    min-height: 100vh;\n    background: #F9FAFB;\n}\n\n.fade-in[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_fadeIn 0.3s ease-in-out;\n}\n\n@keyframes _ngcontent-%COMP%_fadeIn {\n    from {\n        opacity: 0;\n        transform: translateY(10px);\n    }\n\n    to {\n        opacity: 1;\n        transform: translateY(0);\n    }\n}\n\n.section-title[_ngcontent-%COMP%] {\n    font-size: 20px;\n    font-weight: 700;\n    color: var(--sqx-color-text);\n    margin-bottom: 1.5rem;\n}\n\n//[_ngcontent-%COMP%]   Local[_ngcontent-%COMP%]   Header[_ngcontent-%COMP%]   (Back button + Context)\n.local-header[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 1rem;\n    margin-bottom: 2rem;\n\n    .back-btn {\n        color: #6B7280;\n        padding: 0;\n\n        &:hover {\n            color: var(--primary-color);\n            background: transparent;\n        }\n    }\n\n    .current-context {\n        font-size: 18px;\n        font-weight: 600;\n        color: var(--sqx-color-text);\n        margin: 0;\n\n        // Truncate\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        max-width: 600px; // Adjust as needed\n        display: inline-block;\n    }\n}\n\n//[_ngcontent-%COMP%]   Level[_ngcontent-%COMP%]   1[_ngcontent-%COMP%]:   Courses[_ngcontent-%COMP%]   Grid\n.courses-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));\n    gap: 2rem;\n}\n\n.course-card-premium[_ngcontent-%COMP%] {\n    background: white;\n    border-radius: 20px;\n    padding: 1.5rem;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); // Decreased shadow\n    transition: all 0.3s ease;\n    cursor: pointer;\n    border: 1px solid #E5E7EB; // Default border\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n\n    &:hover {\n        // No transform, no border change as requested (or minimal)\n        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);\n        // border-color: #E5E7EB; // Keep same as default or slightly darker\n\n        // Button hover effect handled below\n    }\n\n    .card-icon-wrapper {\n        width: 60px;\n        height: 60px;\n        background: #F5F3FF;\n        border-radius: 12px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        margin-bottom: 1.5rem;\n    }\n\n    .card-content {\n        flex: 1;\n        margin-bottom: 1.5rem;\n\n        .course-title {\n            font-size: 18px;\n            font-weight: 700;\n            margin: 0 0 1rem 0;\n            color: var(--sqx-color-text);\n            line-height: 1.3;\n        }\n\n        .course-meta {\n            display: flex;\n            gap: 1rem;\n            font-size: 12px;\n            color: #6B7280;\n            margin-bottom: 1.5rem;\n\n            span {\n                display: flex;\n                align-items: center;\n                gap: 5px;\n            }\n        }\n\n        .progress-section {\n            .progress-bar {\n                height: 6px;\n                background: #F3F4F6;\n                border-radius: 10px;\n                overflow: hidden;\n                margin-bottom: 8px;\n\n                .fill {\n                    height: 100%;\n                    border-radius: 10px;\n                    transition: width 0.5s ease-out;\n                }\n            }\n\n            .progress-text {\n                font-size: 12px;\n                color: #6B7280;\n                font-weight: 500;\n            }\n        }\n    }\n\n    .action-btn {\n        width: 100%;\n        padding: 10px;\n        border-radius: 8px;\n        border: none;\n        background: #EFF6FF; // Default Light Blue\n        color: var(--primary-color);\n        font-weight: 600;\n        font-size: 14px;\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        gap: 8px;\n        transition: background-color 0.2s ease, color 0.2s ease;\n    }\n}\n\n//[_ngcontent-%COMP%]   Level[_ngcontent-%COMP%]   2[_ngcontent-%COMP%]:   Folders[_ngcontent-%COMP%]   Grid\n.folders-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n    gap: 1.5rem;\n}\n\n.folder-card[_ngcontent-%COMP%] {\n    background: white;\n    border-radius: 16px;\n    padding: 1.5rem;\n    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);\n    cursor: pointer;\n    transition: all 0.2s ease;\n    border: 1px solid #F3F4F6;\n    display: flex;\n    flex-direction: column;\n    height: 180px;\n\n    &:hover {\n        transform: translateY(-2px);\n        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);\n        border-color: #E5E7EB; // Slightly darker border\n    }\n\n    .folder-top {\n        display: flex;\n        justify-content: space-between;\n        align-items: flex-start;\n        margin-bottom: auto;\n        border-bottom: 3px solid transparent; // For the color accent\n        padding-bottom: 10px;\n\n        .folder-icon {\n            font-size: 2rem;\n        }\n\n        .chapter-num-badge {\n            font-size: 24px;\n            font-weight: 700;\n            color: #E5E7EB; // Subtle large number\n            opacity: 0.5;\n        }\n    }\n\n    .folder-body {\n        .folder-title {\n            font-size: 15px;\n            font-weight: 600;\n            color: var(--sqx-color-text);\n            margin: 0 0 5px 0;\n            line-height: 1.4;\n        }\n\n        .folder-subtitle {\n            font-size: 12px;\n            color: #9CA3AF;\n            margin: 0;\n        }\n    }\n}\n\n//[_ngcontent-%COMP%]   Level[_ngcontent-%COMP%]   3[_ngcontent-%COMP%]:   Concepts[_ngcontent-%COMP%]   Grid\n.concepts-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr; // List view by default for concepts\n    gap: 1rem;\n}\n\n.concept-item[_ngcontent-%COMP%] {\n    background: white;\n    padding: 1rem 1.5rem;\n    border-radius: 12px;\n    display: flex;\n    align-items: center;\n    gap: 1.5rem;\n    transition: all 0.2s;\n    border: 1px solid #F3F4F6;\n\n    &:hover {\n        background: #F9FAFB;\n        border-color: #E5E7EB;\n    }\n\n    .concept-icon {\n        width: 40px;\n        height: 40px;\n        border-radius: 50%;\n        background: #F3F4F6;\n        color: #6B7280;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 1.2rem;\n\n        &.completed {\n            background: #D1FAE5;\n            color: #10B981;\n        }\n    }\n\n    .concept-info {\n        flex: 1;\n\n        .concept-title {\n            font-size: 15px;\n            font-weight: 600;\n            color: var(--sqx-color-text);\n            margin: 0 0 4px 0;\n        }\n\n        .concept-meta {\n            font-size: 12px;\n            color: #9CA3AF;\n        }\n    }\n\n    .concept-action {\n        .completed-icon {\n            color: #10B981;\n            font-size: 1.2rem;\n        }\n    }\n}\n\n.empty-state[_ngcontent-%COMP%] {\n    text-align: center;\n    padding: 4rem 2rem;\n    color: #9CA3AF;\n\n    i {\n        font-size: 3rem;\n        margin-bottom: 1rem;\n        opacity: 0.5;\n    }\n\n    p {\n        margin: 0;\n        font-size: 1rem;\n    }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RecordedClasses, [{
        type: Component,
        args: [{ selector: 'sqx-recorded-classes', standalone: true, imports: [CommonModule, BreadcrumbModule, CardModule, ButtonModule, TooltipModule], template: "<div class=\"recorded-classes-container\">\n\n    <!-- Global Breadcrumb is in Header. Local context is removed to avoid duplication. -->\n\n    <!-- Level 1: Enrolled Courses List -->\n    @if (currentView === 'courses') {\n    <div class=\"view-section fade-in\">\n        @if (loading) {\n        <div class=\"empty-state\">Loading recorded classes...</div>\n        } @else if (error) {\n        <div class=\"empty-state\">{{ error }}</div>\n        }\n        <!-- Removed \"My Recorded Classes\" title as per user feedback about redundancy -->\n        <div class=\"courses-grid\">\n            @for (course of courses; track course.id) {\n            <div class=\"course-card-premium\" (click)=\"selectCourse(course)\">\n                <div class=\"card-icon-wrapper\">\n                    <!-- Placeholder Icon if no image -->\n                    <i class=\"pi pi-video\" style=\"font-size: 2rem; color: var(--sqx-color-primary)\"></i>\n                </div>\n                <div class=\"card-content\">\n                    <h3 class=\"course-title\">{{ course.title }}</h3>\n                    <div class=\"course-meta\">\n                        <span><i class=\"pi pi-folder\"></i> {{ course.moduleCount }} Modules</span>\n                        <span><i class=\"pi pi-clock\"></i> {{ course.lessonCount }} Lessons</span>\n                    </div>\n                    <div class=\"progress-section\">\n                        <div class=\"progress-bar\">\n                            <div class=\"fill\" [style.width.%]=\"course.moduleCount ? 20 : 0\"\n                                [style.background-color]=\"getProgressColor(course.moduleCount ? 20 : 0)\">\n                            </div>\n                        </div>\n                        <span class=\"progress-text\">{{ course.status | titlecase }}</span>\n                    </div>\n                </div>\n                <button class=\"action-btn\">\n                    <i class=\"pi pi-folder-open\"></i> Open\n                </button>\n            </div>\n            }\n        </div>\n    </div>\n    }\n\n    <!-- Level 2: Chapters (Folder Structure) -->\n    @if (currentView === 'chapters' && selectedCourse) {\n    <div class=\"view-section fade-in\">\n        @if (!selectedContent || selectedContent.modules.length === 0) {\n        <div class=\"empty-state\">No modules uploaded yet.</div>\n        }\n        <div class=\"folders-grid\">\n            @for (chapter of selectedContent?.modules || []; track chapter.id; let moduleIndex = $index) {\n            <div class=\"folder-card\" (click)=\"selectChapter(chapter)\">\n                <div class=\"folder-top\" [style.border-bottom-color]=\"moduleColor(moduleIndex)\">\n                    <i class=\"pi pi-folder folder-icon\" [style.color]=\"moduleColor(moduleIndex)\"></i>\n                    <span class=\"chapter-num-badge\">0{{ moduleIndex + 1 }}</span>\n                </div>\n                <div class=\"folder-body\">\n                    <h4 class=\"folder-title\">{{ chapter.title }}</h4>\n                    <p class=\"folder-subtitle\">{{ chapter.lessons.length }} Lessons</p>\n                </div>\n            </div>\n            }\n        </div>\n    </div>\n    }\n\n    <!-- Level 3: Concepts (Grid) -->\n    @if (currentView === 'concepts' && selectedChapter) {\n    <div class=\"view-section fade-in\">\n        <div class=\"concepts-grid\">\n            @for (concept of selectedChapter.lessons; track concept.id) {\n            <div class=\"concept-item\" (click)=\"openConcept(concept)\">\n                <div class=\"concept-icon\">\n                    <i [class]=\"lessonType(concept) === 'video' ? 'pi pi-play-circle' : 'pi pi-file'\"></i>\n                </div>\n                <div class=\"concept-info\">\n                    <h4 class=\"concept-title\">{{ concept.title }}</h4>\n                    <span class=\"concept-meta\">{{ lessonType(concept) | titlecase }} \u2022 {{ lessonDuration(concept) }}</span>\n                </div>\n                <div class=\"concept-action\">\n                    <button pButton icon=\"pi pi-play\" class=\"p-button-rounded p-button-text\"></button>\n                </div>\n            </div>\n            }\n            @if (selectedChapter.lessons.length === 0) {\n            <div class=\"empty-state\">\n                <i class=\"pi pi-folder-open\"></i>\n                <p>No lessons uploaded yet.</p>\n            </div>\n            }\n        </div>\n    </div>\n    }\n\n</div>\n", styles: [".recorded-classes-container {\n    padding: 2rem;\n    min-height: 100vh;\n    background: #F9FAFB;\n}\n\n.fade-in {\n    animation: fadeIn 0.3s ease-in-out;\n}\n\n@keyframes fadeIn {\n    from {\n        opacity: 0;\n        transform: translateY(10px);\n    }\n\n    to {\n        opacity: 1;\n        transform: translateY(0);\n    }\n}\n\n.section-title {\n    font-size: 20px;\n    font-weight: 700;\n    color: var(--sqx-color-text);\n    margin-bottom: 1.5rem;\n}\n\n// Local Header (Back button + Context)\n.local-header {\n    display: flex;\n    align-items: center;\n    gap: 1rem;\n    margin-bottom: 2rem;\n\n    .back-btn {\n        color: #6B7280;\n        padding: 0;\n\n        &:hover {\n            color: var(--primary-color);\n            background: transparent;\n        }\n    }\n\n    .current-context {\n        font-size: 18px;\n        font-weight: 600;\n        color: var(--sqx-color-text);\n        margin: 0;\n\n        // Truncate\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        max-width: 600px; // Adjust as needed\n        display: inline-block;\n    }\n}\n\n// Level 1: Courses Grid\n.courses-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));\n    gap: 2rem;\n}\n\n.course-card-premium {\n    background: white;\n    border-radius: 20px;\n    padding: 1.5rem;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); // Decreased shadow\n    transition: all 0.3s ease;\n    cursor: pointer;\n    border: 1px solid #E5E7EB; // Default border\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n\n    &:hover {\n        // No transform, no border change as requested (or minimal)\n        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);\n        // border-color: #E5E7EB; // Keep same as default or slightly darker\n\n        // Button hover effect handled below\n    }\n\n    .card-icon-wrapper {\n        width: 60px;\n        height: 60px;\n        background: #F5F3FF;\n        border-radius: 12px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        margin-bottom: 1.5rem;\n    }\n\n    .card-content {\n        flex: 1;\n        margin-bottom: 1.5rem;\n\n        .course-title {\n            font-size: 18px;\n            font-weight: 700;\n            margin: 0 0 1rem 0;\n            color: var(--sqx-color-text);\n            line-height: 1.3;\n        }\n\n        .course-meta {\n            display: flex;\n            gap: 1rem;\n            font-size: 12px;\n            color: #6B7280;\n            margin-bottom: 1.5rem;\n\n            span {\n                display: flex;\n                align-items: center;\n                gap: 5px;\n            }\n        }\n\n        .progress-section {\n            .progress-bar {\n                height: 6px;\n                background: #F3F4F6;\n                border-radius: 10px;\n                overflow: hidden;\n                margin-bottom: 8px;\n\n                .fill {\n                    height: 100%;\n                    border-radius: 10px;\n                    transition: width 0.5s ease-out;\n                }\n            }\n\n            .progress-text {\n                font-size: 12px;\n                color: #6B7280;\n                font-weight: 500;\n            }\n        }\n    }\n\n    .action-btn {\n        width: 100%;\n        padding: 10px;\n        border-radius: 8px;\n        border: none;\n        background: #EFF6FF; // Default Light Blue\n        color: var(--primary-color);\n        font-weight: 600;\n        font-size: 14px;\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        gap: 8px;\n        transition: background-color 0.2s ease, color 0.2s ease;\n    }\n}\n\n// Level 2: Folders Grid\n.folders-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n    gap: 1.5rem;\n}\n\n.folder-card {\n    background: white;\n    border-radius: 16px;\n    padding: 1.5rem;\n    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);\n    cursor: pointer;\n    transition: all 0.2s ease;\n    border: 1px solid #F3F4F6;\n    display: flex;\n    flex-direction: column;\n    height: 180px;\n\n    &:hover {\n        transform: translateY(-2px);\n        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);\n        border-color: #E5E7EB; // Slightly darker border\n    }\n\n    .folder-top {\n        display: flex;\n        justify-content: space-between;\n        align-items: flex-start;\n        margin-bottom: auto;\n        border-bottom: 3px solid transparent; // For the color accent\n        padding-bottom: 10px;\n\n        .folder-icon {\n            font-size: 2rem;\n        }\n\n        .chapter-num-badge {\n            font-size: 24px;\n            font-weight: 700;\n            color: #E5E7EB; // Subtle large number\n            opacity: 0.5;\n        }\n    }\n\n    .folder-body {\n        .folder-title {\n            font-size: 15px;\n            font-weight: 600;\n            color: var(--sqx-color-text);\n            margin: 0 0 5px 0;\n            line-height: 1.4;\n        }\n\n        .folder-subtitle {\n            font-size: 12px;\n            color: #9CA3AF;\n            margin: 0;\n        }\n    }\n}\n\n// Level 3: Concepts Grid\n.concepts-grid {\n    display: grid;\n    grid-template-columns: 1fr; // List view by default for concepts\n    gap: 1rem;\n}\n\n.concept-item {\n    background: white;\n    padding: 1rem 1.5rem;\n    border-radius: 12px;\n    display: flex;\n    align-items: center;\n    gap: 1.5rem;\n    transition: all 0.2s;\n    border: 1px solid #F3F4F6;\n\n    &:hover {\n        background: #F9FAFB;\n        border-color: #E5E7EB;\n    }\n\n    .concept-icon {\n        width: 40px;\n        height: 40px;\n        border-radius: 50%;\n        background: #F3F4F6;\n        color: #6B7280;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 1.2rem;\n\n        &.completed {\n            background: #D1FAE5;\n            color: #10B981;\n        }\n    }\n\n    .concept-info {\n        flex: 1;\n\n        .concept-title {\n            font-size: 15px;\n            font-weight: 600;\n            color: var(--sqx-color-text);\n            margin: 0 0 4px 0;\n        }\n\n        .concept-meta {\n            font-size: 12px;\n            color: #9CA3AF;\n        }\n    }\n\n    .concept-action {\n        .completed-icon {\n            color: #10B981;\n            font-size: 1.2rem;\n        }\n    }\n}\n\n.empty-state {\n    text-align: center;\n    padding: 4rem 2rem;\n    color: #9CA3AF;\n\n    i {\n        font-size: 3rem;\n        margin-bottom: 1rem;\n        opacity: 0.5;\n    }\n\n    p {\n        margin: 0;\n        font-size: 1rem;\n    }\n}"] }]
    }], () => [{ type: i1.HeaderService }, { type: i2.CourseContentService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RecordedClasses, { className: "RecordedClasses", filePath: "src/app/modules/classes/recorded-classes/recorded-classes.ts", lineNumber: 24 }); })();
