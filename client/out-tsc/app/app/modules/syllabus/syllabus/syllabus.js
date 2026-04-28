import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { CourseContentService } from '../../core/services/course-content.service';
import * as i0 from "@angular/core";
import * as i1 from "primeng/accordion";
const _forTrack0 = ($index, $item) => $item.id;
function Syllabus_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const course_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", course_r1.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(course_r1.title);
} }
function Syllabus_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtext(1, "Loading syllabus...");
    i0.ɵɵelementEnd();
} }
function Syllabus_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.error);
} }
function Syllabus_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtext(1, "No syllabus modules have been added yet.");
    i0.ɵɵelementEnd();
} }
function Syllabus_Conditional_12_For_3_ng_template_2_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 15);
} }
function Syllabus_Conditional_12_For_3_ng_template_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 16);
} }
function Syllabus_Conditional_12_For_3_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, Syllabus_Conditional_12_For_3_ng_template_2_Conditional_0_Template, 1, 0, "i", 15)(1, Syllabus_Conditional_12_For_3_ng_template_2_Conditional_1_Template, 1, 0, "i", 16);
} if (rf & 2) {
    const active_r3 = ctx.active;
    i0.ɵɵconditional(active_r3 ? 0 : 1);
} }
function Syllabus_Conditional_12_For_3_For_12_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lesson_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(lesson_r4.summary);
} }
function Syllabus_Conditional_12_For_3_For_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14)(1, "div", 17);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 18);
    i0.ɵɵtext(4);
    i0.ɵɵconditionalCreate(5, Syllabus_Conditional_12_For_3_For_12_Conditional_5_Template, 2, 1, "small");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const lesson_r4 = ctx.$implicit;
    const ɵ$index_59_r5 = ctx.$index;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ɵ$index_59_r5 + 1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", lesson_r4.title, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(lesson_r4.summary ? 5 : -1);
} }
function Syllabus_Conditional_12_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p-accordion-panel", 4)(1, "p-accordion-header");
    i0.ɵɵtemplate(2, Syllabus_Conditional_12_For_3_ng_template_2_Template, 2, 1, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementStart(4, "span", 9)(5, "span", 10);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 11);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "p-accordion-content", 12)(10, "div", 13);
    i0.ɵɵrepeaterCreate(11, Syllabus_Conditional_12_For_3_For_12_Template, 6, 3, "div", 14, _forTrack0);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const module_r6 = ctx.$implicit;
    const ɵ$index_34_r7 = ctx.$index;
    i0.ɵɵproperty("value", ɵ$index_34_r7.toString());
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(module_r6.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(module_r6.lessons.length);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(module_r6.lessons);
} }
function Syllabus_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "p-accordion", 4);
    i0.ɵɵrepeaterCreate(2, Syllabus_Conditional_12_For_3_Template, 13, 3, "p-accordion-panel", 4, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", "0");
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.content.modules);
} }
export class Syllabus {
    contentService = inject(CourseContentService);
    courses = [];
    selectedCourseId = '';
    content = null;
    loading = true;
    error = '';
    ngOnInit() {
        this.contentService.getAvailableCourses().subscribe({
            next: (courses) => {
                this.courses = courses;
                this.selectedCourseId = courses[0]?.id ?? '';
                if (this.selectedCourseId)
                    this.loadContent();
                else {
                    this.loading = false;
                    this.error = 'No course content is available yet.';
                }
            },
            error: () => {
                this.loading = false;
                this.error = 'Could not load course syllabus.';
            },
        });
    }
    onCourseChange(event) {
        this.selectedCourseId = event.target.value;
        this.loadContent();
    }
    loadContent() {
        if (!this.selectedCourseId)
            return;
        this.loading = true;
        this.error = '';
        this.contentService.getContent(this.selectedCourseId).subscribe({
            next: (content) => {
                this.content = content;
                this.loading = false;
            },
            error: () => {
                this.content = null;
                this.loading = false;
                this.error = 'Content is not published or you are not enrolled in this course.';
            },
        });
    }
    static ɵfac = function Syllabus_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Syllabus)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Syllabus, selectors: [["sqx-syllabus"]], decls: 13, vars: 5, consts: [["toggleicon", ""], [1, "syllabus-container"], [1, "course-info"], [1, "course-selector", 3, "change", "value"], [3, "value"], [1, "course-title"], [1, "course-description"], [1, "empty-state"], [1, "modules-section"], [1, "module-header-content"], [1, "module-title-text"], [1, "topic-count-badge"], [1, "syllabus-contnet-parent"], [1, "topics-list"], [1, "topic-item"], [1, "pi", "pi-minus"], [1, "pi", "pi-plus"], [1, "topic-number"], [1, "topic-title"]], template: function Syllabus_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "select", 3);
            i0.ɵɵlistener("change", function Syllabus_Template_select_change_2_listener($event) { return ctx.onCourseChange($event); });
            i0.ɵɵrepeaterCreate(3, Syllabus_For_4_Template, 2, 2, "option", 4, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h2", 5);
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 6);
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(9, Syllabus_Conditional_9_Template, 2, 0, "div", 7)(10, Syllabus_Conditional_10_Template, 2, 1, "div", 7)(11, Syllabus_Conditional_11_Template, 2, 0, "div", 7);
            i0.ɵɵconditionalCreate(12, Syllabus_Conditional_12_Template, 4, 1, "div", 8);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", ctx.selectedCourseId);
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.courses);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate((ctx.content == null ? null : ctx.content.title) || "Syllabus");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate((ctx.content == null ? null : ctx.content.description) || ctx.error);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading ? 9 : ctx.error && !ctx.content ? 10 : ctx.content && ctx.content.modules.length === 0 ? 11 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.content && ctx.content.modules.length ? 12 : -1);
        } }, dependencies: [CommonModule, AccordionModule, i1.Accordion, i1.AccordionPanel, i1.AccordionHeader, i1.AccordionContent], styles: [".syllabus-container[_ngcontent-%COMP%] {\n    width: 100%;\n    padding: var(--sqx-space-6);\n}\n\n.course-info[_ngcontent-%COMP%] {\n    margin-bottom: var(--sqx-space-6);\n\n    .course-title {\n        font-size: 24px;\n        font-weight: 700;\n        color: var(--sqx-color-text);\n        margin: 0 0 var(--sqx-space-3) 0;\n    }\n\n    .course-description {\n        font-size: 15px;\n        line-height: 1.6;\n        color: var(--sqx-color-text-light);\n        margin: 0;\n    }\n}\n\n.modules-section[_ngcontent-%COMP%] {\n    max-width: 100%;\n}\n\n//[_ngcontent-%COMP%]   Accordion[_ngcontent-%COMP%]   Customization\n[_ngcontent-%COMP%]  .p-accordion {\n    .p-accordion-panel {\n        border: 1px solid var(--sqx-color-border);\n        border-radius: var(--sqx-radius-lg);\n        overflow: hidden;\n        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n        transition: all 0.3s ease;\n        margin-bottom: 0 !important;\n\n        &:hover {\n            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n        }\n    }\n\n    .p-accordion-header {\n        border: none;\n        background: white;\n\n        .p-accordion-header-link {\n            padding: var(--sqx-space-5);\n            border: none;\n            background: transparent;\n\n            &:focus {\n                box-shadow: none;\n            }\n        }\n    }\n\n    .p-accordion-content {\n        border: none;\n        background: white;\n        padding: 0 !important;\n        overflow: hidden;\n    }\n}\n\n[_nghost-%COMP%]     .syllabus-contnet-parent .p-accordioncontent-content {\n    padding: 0 !important;\n}\n\n[_nghost-%COMP%]     .syllabus-contnet-parent .p-accordioncontent-wrapper {\n    padding: 0 !important;\n}\n\n.module-header-content[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    width: 100%;\n    gap: var(--sqx-space-3);\n    margin-right: 0.5rem;\n}\n\n.module-title-text[_ngcontent-%COMP%] {\n    font-size: 18px;\n    font-weight: 600;\n    color: var(--sqx-color-text);\n    flex: 1;\n}\n\n.topic-count-badge[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    min-width: 24px;\n    height: 24px;\n    padding: 0 8px;\n    background: #1f2937;\n    color: white;\n    font-size: 12px;\n    font-weight: 600;\n    border-radius: 50%;\n}\n\n.topics-list[_ngcontent-%COMP%] {\n    padding: var(--sqx-space-4) var(--sqx-space-5);\n    border-top: 1px solid var(--sqx-color-border);\n}\n\n.topic-item[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: var(--sqx-space-3);\n    padding: var(--sqx-space-3) var(--sqx-space-4);\n    margin-bottom: var(--sqx-space-2);\n    background: white;\n    border-radius: var(--sqx-radius-md);\n    border: 1px solid var(--sqx-color-border);\n    transition: all 0.2s ease;\n\n    &:last-child {\n        margin-bottom: 0;\n    }\n\n    &:hover {\n        border-color: var(--sqx-color-primary);\n        background: #f8f9ff;\n    }\n\n    .topic-number {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: 32px;\n        height: 32px;\n        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n        color: white;\n        font-size: 14px;\n        font-weight: 700;\n        border-radius: 50%;\n        flex-shrink: 0;\n    }\n\n    .topic-title {\n        flex: 1;\n        font-size: 15px;\n        font-weight: 500;\n        color: var(--sqx-color-text);\n        line-height: 1.4;\n    }\n}\n\n//[_ngcontent-%COMP%]   Responsive[_ngcontent-%COMP%]   Design\n@media[_ngcontent-%COMP%]   (max-width[_ngcontent-%COMP%]: 768px) {\n    .course-header {\n        padding: var(--sqx-space-6) var(--sqx-space-4);\n\n        .course-title {\n            font-size: 24px;\n        }\n\n        .course-description {\n            font-size: 14px;\n        }\n\n        .course-stats {\n            gap: var(--sqx-space-3);\n        }\n    }\n\n    .modules-section {\n        padding: 0 var(--sqx-space-4);\n    }\n\n    .module-header {\n        flex-wrap: wrap;\n        gap: var(--sqx-space-3);\n\n        .module-number {\n            width: auto;\n            flex-shrink: 0;\n        }\n\n        .module-title {\n            font-size: 16px;\n        }\n\n        .module-count {\n            width: 100%;\n            text-align: center;\n        }\n    }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Syllabus, [{
        type: Component,
        args: [{ selector: 'sqx-syllabus', standalone: true, imports: [CommonModule, AccordionModule], template: "<div class=\"syllabus-container\">\n    <!-- Simple Course Info -->\n    <div class=\"course-info\">\n        <select class=\"course-selector\" [value]=\"selectedCourseId\" (change)=\"onCourseChange($event)\">\n            @for (course of courses; track course.id) {\n            <option [value]=\"course.id\">{{ course.title }}</option>\n            }\n        </select>\n        <h2 class=\"course-title\">{{ content?.title || 'Syllabus' }}</h2>\n        <p class=\"course-description\">{{ content?.description || error }}</p>\n    </div>\n\n    @if (loading) {\n    <div class=\"empty-state\">Loading syllabus...</div>\n    } @else if (error && !content) {\n    <div class=\"empty-state\">{{ error }}</div>\n    } @else if (content && content.modules.length === 0) {\n    <div class=\"empty-state\">No syllabus modules have been added yet.</div>\n    }\n\n    <!-- Syllabus Modules -->\n    @if (content && content.modules.length) {\n    <div class=\"modules-section\">\n        <p-accordion [value]=\"'0'\">\n            @for (module of content.modules; track module.id; let i = $index) {\n            <p-accordion-panel [value]=\"i.toString()\">\n                <p-accordion-header>\n                    <ng-template #toggleicon let-active=\"active\">\n                        @if (active) {\n                        <i class=\"pi pi-minus\"></i>\n                        } @else {\n                        <i class=\"pi pi-plus\"></i>\n                        }\n                    </ng-template>\n                    <span class=\"module-header-content\">\n                        <span class=\"module-title-text\">{{ module.title }}</span>\n                        <span class=\"topic-count-badge\">{{ module.lessons.length }}</span>\n                    </span>\n                </p-accordion-header>\n                <p-accordion-content class=\"syllabus-contnet-parent\">\n                    <div class=\"topics-list\">\n                        @for (lesson of module.lessons; track lesson.id; let lessonIndex = $index) {\n                        <div class=\"topic-item\">\n                            <div class=\"topic-number\">{{ lessonIndex + 1 }}</div>\n                            <div class=\"topic-title\">\n                                {{ lesson.title }}\n                                @if (lesson.summary) {\n                                <small>{{ lesson.summary }}</small>\n                                }\n                            </div>\n                        </div>\n                        }\n                    </div>\n                </p-accordion-content>\n            </p-accordion-panel>\n            }\n        </p-accordion>\n    </div>\n    }\n</div>\n", styles: [".syllabus-container {\n    width: 100%;\n    padding: var(--sqx-space-6);\n}\n\n.course-info {\n    margin-bottom: var(--sqx-space-6);\n\n    .course-title {\n        font-size: 24px;\n        font-weight: 700;\n        color: var(--sqx-color-text);\n        margin: 0 0 var(--sqx-space-3) 0;\n    }\n\n    .course-description {\n        font-size: 15px;\n        line-height: 1.6;\n        color: var(--sqx-color-text-light);\n        margin: 0;\n    }\n}\n\n.modules-section {\n    max-width: 100%;\n}\n\n// Accordion Customization\n::ng-deep .p-accordion {\n    .p-accordion-panel {\n        border: 1px solid var(--sqx-color-border);\n        border-radius: var(--sqx-radius-lg);\n        overflow: hidden;\n        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n        transition: all 0.3s ease;\n        margin-bottom: 0 !important;\n\n        &:hover {\n            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n        }\n    }\n\n    .p-accordion-header {\n        border: none;\n        background: white;\n\n        .p-accordion-header-link {\n            padding: var(--sqx-space-5);\n            border: none;\n            background: transparent;\n\n            &:focus {\n                box-shadow: none;\n            }\n        }\n    }\n\n    .p-accordion-content {\n        border: none;\n        background: white;\n        padding: 0 !important;\n        overflow: hidden;\n    }\n}\n\n:host ::ng-deep .syllabus-contnet-parent .p-accordioncontent-content {\n    padding: 0 !important;\n}\n\n:host ::ng-deep .syllabus-contnet-parent .p-accordioncontent-wrapper {\n    padding: 0 !important;\n}\n\n.module-header-content {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    width: 100%;\n    gap: var(--sqx-space-3);\n    margin-right: 0.5rem;\n}\n\n.module-title-text {\n    font-size: 18px;\n    font-weight: 600;\n    color: var(--sqx-color-text);\n    flex: 1;\n}\n\n.topic-count-badge {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    min-width: 24px;\n    height: 24px;\n    padding: 0 8px;\n    background: #1f2937;\n    color: white;\n    font-size: 12px;\n    font-weight: 600;\n    border-radius: 50%;\n}\n\n.topics-list {\n    padding: var(--sqx-space-4) var(--sqx-space-5);\n    border-top: 1px solid var(--sqx-color-border);\n}\n\n.topic-item {\n    display: flex;\n    align-items: center;\n    gap: var(--sqx-space-3);\n    padding: var(--sqx-space-3) var(--sqx-space-4);\n    margin-bottom: var(--sqx-space-2);\n    background: white;\n    border-radius: var(--sqx-radius-md);\n    border: 1px solid var(--sqx-color-border);\n    transition: all 0.2s ease;\n\n    &:last-child {\n        margin-bottom: 0;\n    }\n\n    &:hover {\n        border-color: var(--sqx-color-primary);\n        background: #f8f9ff;\n    }\n\n    .topic-number {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: 32px;\n        height: 32px;\n        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n        color: white;\n        font-size: 14px;\n        font-weight: 700;\n        border-radius: 50%;\n        flex-shrink: 0;\n    }\n\n    .topic-title {\n        flex: 1;\n        font-size: 15px;\n        font-weight: 500;\n        color: var(--sqx-color-text);\n        line-height: 1.4;\n    }\n}\n\n// Responsive Design\n@media (max-width: 768px) {\n    .course-header {\n        padding: var(--sqx-space-6) var(--sqx-space-4);\n\n        .course-title {\n            font-size: 24px;\n        }\n\n        .course-description {\n            font-size: 14px;\n        }\n\n        .course-stats {\n            gap: var(--sqx-space-3);\n        }\n    }\n\n    .modules-section {\n        padding: 0 var(--sqx-space-4);\n    }\n\n    .module-header {\n        flex-wrap: wrap;\n        gap: var(--sqx-space-3);\n\n        .module-number {\n            width: auto;\n            flex-shrink: 0;\n        }\n\n        .module-title {\n            font-size: 16px;\n        }\n\n        .module-count {\n            width: 100%;\n            text-align: center;\n        }\n    }\n}"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Syllabus, { className: "Syllabus", filePath: "src/app/modules/syllabus/syllabus/syllabus.ts", lineNumber: 13 }); })();
