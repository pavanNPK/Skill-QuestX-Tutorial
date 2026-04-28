import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../core/services/course-content.service";
import * as i3 from "primeng/accordion";
const _c0 = () => [];
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.text;
function ChapterDetail_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtext(1, "Loading class content...");
    i0.ɵɵelementEnd();
} }
function ChapterDetail_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function ChapterDetail_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtext(1, "No lessons uploaded yet.");
    i0.ɵɵelementEnd();
} }
function ChapterDetail_Conditional_11_For_3_ng_template_2_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 12);
} }
function ChapterDetail_Conditional_11_For_3_ng_template_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 13);
} }
function ChapterDetail_Conditional_11_For_3_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, ChapterDetail_Conditional_11_For_3_ng_template_2_Conditional_0_Template, 1, 0, "i", 12)(1, ChapterDetail_Conditional_11_For_3_ng_template_2_Conditional_1_Template, 1, 0, "i", 13);
} if (rf & 2) {
    const active_r2 = ctx.active;
    i0.ɵɵconditional(active_r2 ? 0 : 1);
} }
function ChapterDetail_Conditional_11_For_3_For_9_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lesson_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", lesson_r4.durationMinutes, " min");
} }
function ChapterDetail_Conditional_11_For_3_For_9_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵelement(1, "i", 24);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const lesson_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(lesson_r4.summary);
} }
function ChapterDetail_Conditional_11_For_3_For_9_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵelement(1, "i", 25);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const lesson_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.blockText(ctx_r0.primaryBlock(lesson_r4)));
} }
function ChapterDetail_Conditional_11_For_3_For_9_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵlistener("click", function ChapterDetail_Conditional_11_For_3_For_9_Template_div_click_0_listener() { const lesson_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.openLesson(lesson_r4)); });
    i0.ɵɵelementStart(1, "div", 15)(2, "div", 16);
    i0.ɵɵelement(3, "i", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, ChapterDetail_Conditional_11_For_3_For_9_Conditional_4_Template, 2, 1, "span", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 19)(6, "h4", 20);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(8, ChapterDetail_Conditional_11_For_3_For_9_Conditional_8_Template, 4, 1, "div", 21);
    i0.ɵɵconditionalCreate(9, ChapterDetail_Conditional_11_For_3_For_9_Conditional_9_Template, 4, 1, "div", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 22);
    i0.ɵɵelement(11, "i", 23);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const lesson_r4 = ctx.$implicit;
    const ɵ$index_51_r5 = ctx.$index;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(lesson_r4.durationMinutes ? 4 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" Lesson ", ɵ$index_51_r5 + 1, ": ", lesson_r4.title, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(lesson_r4.summary ? 8 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.primaryBlock(lesson_r4) ? 9 : -1);
} }
function ChapterDetail_Conditional_11_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p-accordion-panel", 8)(1, "p-accordion-header");
    i0.ɵɵtemplate(2, ChapterDetail_Conditional_11_For_3_ng_template_2_Template, 2, 1, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementStart(4, "span", 9);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p-accordion-content")(7, "div", 10);
    i0.ɵɵrepeaterCreate(8, ChapterDetail_Conditional_11_For_3_For_9_Template, 12, 5, "div", 11, _forTrack0);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const module_r6 = ctx.$implicit;
    const ɵ$index_31_r7 = ctx.$index;
    i0.ɵɵproperty("value", ɵ$index_31_r7.toString());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(module_r6.title);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(module_r6.lessons);
} }
function ChapterDetail_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "p-accordion", 8);
    i0.ɵɵrepeaterCreate(2, ChapterDetail_Conditional_11_For_3_Template, 10, 2, "p-accordion-panel", 8, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", "0");
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.modules);
} }
function ChapterDetail_Conditional_12_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.selectedLesson.summary);
} }
function ChapterDetail_Conditional_12_For_6_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h3", 20);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const block_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(block_r8.text || block_r8.title);
} }
function ChapterDetail_Conditional_12_For_6_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const block_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(block_r8.text);
} }
function ChapterDetail_Conditional_12_For_6_Conditional_4_For_2_Conditional_2_For_2_Conditional_2_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const grandChild_r9 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(grandChild_r9.text);
} }
function ChapterDetail_Conditional_12_For_6_Conditional_4_For_2_Conditional_2_For_2_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul");
    i0.ɵɵrepeaterCreate(1, ChapterDetail_Conditional_12_For_6_Conditional_4_For_2_Conditional_2_For_2_Conditional_2_For_2_Template, 2, 1, "li", null, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const child_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵrepeater(child_r10.children || i0.ɵɵpureFunction0(0, _c0));
} }
function ChapterDetail_Conditional_12_For_6_Conditional_4_For_2_Conditional_2_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵconditionalCreate(2, ChapterDetail_Conditional_12_For_6_Conditional_4_For_2_Conditional_2_For_2_Conditional_2_Template, 3, 1, "ul");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const child_r10 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", child_r10.text, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional((child_r10.children == null ? null : child_r10.children.length) ? 2 : -1);
} }
function ChapterDetail_Conditional_12_For_6_Conditional_4_For_2_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul");
    i0.ɵɵrepeaterCreate(1, ChapterDetail_Conditional_12_For_6_Conditional_4_For_2_Conditional_2_For_2_Template, 3, 2, "li", null, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵrepeater(item_r11.children || i0.ɵɵpureFunction0(0, _c0));
} }
function ChapterDetail_Conditional_12_For_6_Conditional_4_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵconditionalCreate(2, ChapterDetail_Conditional_12_For_6_Conditional_4_For_2_Conditional_2_Template, 3, 1, "ul");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r11 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r11.text, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional((item_r11.children == null ? null : item_r11.children.length) ? 2 : -1);
} }
function ChapterDetail_Conditional_12_For_6_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul");
    i0.ɵɵrepeaterCreate(1, ChapterDetail_Conditional_12_For_6_Conditional_4_For_2_Template, 3, 2, "li", null, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const block_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵrepeater(block_r8.items || i0.ɵɵpureFunction0(0, _c0));
} }
function ChapterDetail_Conditional_12_For_6_Conditional_5_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 29);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r12 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(column_r12);
} }
function ChapterDetail_Conditional_12_For_6_Conditional_5_For_7_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 30);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cell_r13 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(cell_r13);
} }
function ChapterDetail_Conditional_12_For_6_Conditional_5_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵrepeaterCreate(1, ChapterDetail_Conditional_12_For_6_Conditional_5_For_7_For_2_Template, 2, 1, "td", 30, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r14 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵrepeater(row_r14);
} }
function ChapterDetail_Conditional_12_For_6_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 26)(1, "thead")(2, "tr");
    i0.ɵɵrepeaterCreate(3, ChapterDetail_Conditional_12_For_6_Conditional_5_For_4_Template, 2, 1, "th", 29, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "tbody");
    i0.ɵɵrepeaterCreate(6, ChapterDetail_Conditional_12_For_6_Conditional_5_For_7_Template, 3, 0, "tr", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const block_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(block_r8.columns || i0.ɵɵpureFunction0(0, _c0));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(block_r8.rows || i0.ɵɵpureFunction0(1, _c0));
} }
function ChapterDetail_Conditional_12_For_6_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 27);
} if (rf & 2) {
    const block_r8 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", ctx_r0.blockUrl(block_r8), i0.ɵɵsanitizeUrl)("alt", block_r8.title || block_r8.text);
} }
function ChapterDetail_Conditional_12_For_6_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 28);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const block_r8 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("href", ctx_r0.blockUrl(block_r8), i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(block_r8.title || block_r8.text || block_r8.type);
} }
function ChapterDetail_Conditional_12_For_6_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const block_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(block_r8.title || block_r8.text || block_r8.type);
} }
function ChapterDetail_Conditional_12_For_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11)(1, "div", 19);
    i0.ɵɵconditionalCreate(2, ChapterDetail_Conditional_12_For_6_Conditional_2_Template, 2, 1, "h3", 20)(3, ChapterDetail_Conditional_12_For_6_Conditional_3_Template, 2, 1, "p")(4, ChapterDetail_Conditional_12_For_6_Conditional_4_Template, 3, 1, "ul")(5, ChapterDetail_Conditional_12_For_6_Conditional_5_Template, 8, 2, "table", 26)(6, ChapterDetail_Conditional_12_For_6_Conditional_6_Template, 1, 2, "img", 27)(7, ChapterDetail_Conditional_12_For_6_Conditional_7_Template, 2, 2, "a", 28)(8, ChapterDetail_Conditional_12_For_6_Conditional_8_Template, 2, 1, "p");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const block_r8 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(block_r8.type === "heading" ? 2 : block_r8.type === "paragraph" || block_r8.type === "assignment_note" ? 3 : block_r8.type === "bullet_list" || block_r8.type === "nested_bullet_list" ? 4 : block_r8.type === "table" ? 5 : block_r8.type === "image" && block_r8.url ? 6 : block_r8.url ? 7 : 8);
} }
function ChapterDetail_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "h2", 4);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(3, ChapterDetail_Conditional_12_Conditional_3_Template, 2, 1, "p", 5);
    i0.ɵɵelementStart(4, "div", 10);
    i0.ɵɵrepeaterCreate(5, ChapterDetail_Conditional_12_For_6_Template, 9, 1, "div", 11, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.selectedLesson.title);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.selectedLesson.summary ? 3 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.selectedLesson.blocks);
} }
export class ChapterDetail {
    route;
    contentService;
    chapterTitle = 'Recorded Classes';
    courseTitle = '';
    courseDescription = '';
    content = null;
    modules = [];
    selectedLesson = null;
    loading = true;
    error = '';
    constructor(route, contentService) {
        this.route = route;
        this.contentService = contentService;
    }
    ngOnInit() {
        const chapterId = this.route.snapshot.paramMap.get('id');
        this.contentService.getAvailableCourses().subscribe({
            next: (courses) => {
                const courseId = courses[0]?.id;
                if (!courseId) {
                    this.loading = false;
                    this.error = 'No course content is available.';
                    return;
                }
                this.contentService.getContent(courseId).subscribe({
                    next: (content) => {
                        this.content = content;
                        this.courseTitle = content.title;
                        this.courseDescription = content.description;
                        const selectedModule = content.modules.find((module) => module.id === chapterId);
                        this.modules = selectedModule ? [selectedModule] : content.modules;
                        this.chapterTitle = selectedModule ? selectedModule.title : 'Recorded Classes';
                        this.loading = false;
                    },
                    error: () => {
                        this.loading = false;
                        this.error = 'Content is not published or you are not enrolled in this course.';
                    },
                });
            },
            error: () => {
                this.loading = false;
                this.error = 'Could not load course content.';
            },
        });
    }
    openLesson(lesson) {
        this.selectedLesson = lesson;
        const target = lesson.blocks.find((block) => ['video', 'document', 'image', 'link'].includes(block.type) && block.url);
        if (target?.url)
            window.open(this.contentService.absoluteAssetUrl(target.url), '_blank', 'noopener');
    }
    primaryBlock(lesson) {
        return lesson.blocks.find((block) => ['video', 'document', 'image', 'link'].includes(block.type)) ?? null;
    }
    blockText(block) {
        return block.title || block.text || block.type;
    }
    bulletText(items) {
        return (items ?? []).map((item) => item.text).filter(Boolean).join(', ');
    }
    blockUrl(block) {
        return this.contentService.absoluteAssetUrl(block.url);
    }
    static ɵfac = function ChapterDetail_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ChapterDetail)(i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.CourseContentService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ChapterDetail, selectors: [["sqx-chapter-detail"]], decls: 13, vars: 6, consts: [["toggleicon", ""], [1, "chapter-detail-container"], [1, "page-title"], [1, "course-info"], [1, "course-title"], [1, "course-description"], [1, "empty-state"], [1, "modules-section"], [3, "value"], [1, "module-title-text"], [1, "videos-list"], [1, "video-item"], [1, "pi", "pi-chevron-up"], [1, "pi", "pi-chevron-down"], [1, "video-item", 3, "click"], [1, "video-thumbnail"], [1, "placeholder-thumbnail"], [1, "pi", "pi-play"], [1, "duration-badge"], [1, "video-info"], [1, "video-title"], [1, "video-meta"], [1, "video-action"], [1, "pi", "pi-external-link"], [1, "pi", "pi-align-left"], [1, "pi", "pi-file"], [2, "width", "100%", "border-collapse", "collapse"], [2, "max-width", "100%", "border-radius", "8px", 3, "src", "alt"], ["target", "_blank", "rel", "noopener", 3, "href"], [2, "border", "1px solid #d1d5db", "padding", "0.5rem", "text-align", "left"], [2, "border", "1px solid #d1d5db", "padding", "0.5rem"]], template: function ChapterDetail_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "h1", 2);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 3)(4, "h2", 4);
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 5);
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(8, ChapterDetail_Conditional_8_Template, 2, 0, "div", 6)(9, ChapterDetail_Conditional_9_Template, 2, 1, "div", 6)(10, ChapterDetail_Conditional_10_Template, 2, 0, "div", 6);
            i0.ɵɵconditionalCreate(11, ChapterDetail_Conditional_11_Template, 4, 1, "div", 7);
            i0.ɵɵconditionalCreate(12, ChapterDetail_Conditional_12_Template, 7, 2, "div", 7);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.chapterTitle);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.courseTitle);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.courseDescription);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading ? 8 : ctx.error ? 9 : ctx.modules.length === 0 ? 10 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.modules.length ? 11 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.selectedLesson ? 12 : -1);
        } }, dependencies: [CommonModule, AccordionModule, i3.Accordion, i3.AccordionPanel, i3.AccordionHeader, i3.AccordionContent], styles: [".chapter-detail-container[_ngcontent-%COMP%] {\n    width: 100%;\n    padding: var(--sqx-space-6);\n}\n\n.page-title[_ngcontent-%COMP%] {\n    font-size: 24px;\n    font-weight: 700;\n    color: var(--sqx-color-text);\n    margin: 0 0 var(--sqx-space-5) 0;\n}\n\n.course-info[_ngcontent-%COMP%] {\n    margin-bottom: var(--sqx-space-6);\n\n    .course-title {\n        font-size: 18px;\n        font-weight: 600;\n        color: var(--sqx-color-text);\n        margin: 0 0 var(--sqx-space-2) 0;\n    }\n\n    .course-description {\n        font-size: 14px;\n        line-height: 1.6;\n        color: var(--sqx-color-text-light);\n        margin: 0;\n    }\n}\n\n.modules-section[_ngcontent-%COMP%] {\n    max-width: 100%;\n}\n\n//[_ngcontent-%COMP%]   Accordion[_ngcontent-%COMP%]   Customization\n[_ngcontent-%COMP%]  .p-accordion {\n    .p-accordion-panel {\n        border: 1px solid var(--sqx-color-border);\n        border-radius: var(--sqx-radius-lg);\n        overflow: hidden;\n        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n        margin-bottom: 0 !important;\n\n        &:hover {\n            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n        }\n    }\n\n    .p-accordion-header {\n        border: none;\n        background: white;\n\n        .p-accordion-header-link {\n            padding: var(--sqx-space-5);\n            border: none;\n            background: transparent;\n\n            &:focus {\n                box-shadow: none;\n            }\n        }\n    }\n\n    .p-accordion-content {\n        border: none;\n        background: white;\n        padding: 0 !important;\n        overflow: hidden;\n    }\n}\n\n.module-title-text[_ngcontent-%COMP%] {\n    font-size: 18px;\n    font-weight: 600;\n    color: var(--sqx-color-text);\n}\n\n.videos-list[_ngcontent-%COMP%] {\n    padding: var(--sqx-space-4) var(--sqx-space-5);\n    border-top: 1px solid var(--sqx-color-border);\n    background: #FAFBFC;\n}\n\n.video-item[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: var(--sqx-space-4);\n    padding: var(--sqx-space-4);\n    background: white;\n    border: 1px solid var(--sqx-color-border);\n    border-radius: var(--sqx-radius-md);\n    margin-bottom: var(--sqx-space-3);\n    cursor: pointer;\n    transition: all 0.2s ease;\n\n    &:last-child {\n        margin-bottom: 0;\n    }\n\n    &:not(.locked):hover {\n        border-color: var(--sqx-color-primary);\n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);\n    }\n\n    &.locked {\n        opacity: 0.6;\n        cursor: not-allowed;\n    }\n\n    .video-thumbnail {\n        position: relative;\n        flex-shrink: 0;\n        width: 120px;\n        height: 80px;\n        border-radius: var(--sqx-radius-sm);\n        overflow: hidden;\n        background: #F3F4F6;\n\n        img {\n            width: 100%;\n            height: 100%;\n            object-fit: cover;\n        }\n\n        .placeholder-thumbnail {\n            width: 100%;\n            height: 100%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n\n            i {\n                font-size: 32px;\n                color: white;\n            }\n        }\n\n        .duration-badge {\n            position: absolute;\n            bottom: 6px;\n            right: 6px;\n            padding: 4px 8px;\n            background: rgba(0, 0, 0, 0.8);\n            color: white;\n            font-size: 11px;\n            font-weight: 600;\n            border-radius: 4px;\n        }\n    }\n\n    .video-info {\n        flex: 1;\n\n        .video-title {\n            font-size: 15px;\n            font-weight: 500;\n            color: var(--sqx-color-text);\n            margin: 0 0 var(--sqx-space-2) 0;\n            line-height: 1.4;\n        }\n\n        .video-meta {\n            display: flex;\n            align-items: center;\n            gap: var(--sqx-space-2);\n            font-size: 13px;\n            color: var(--sqx-color-text-light);\n\n            i {\n                font-size: 14px;\n            }\n        }\n    }\n\n    .video-action {\n        flex-shrink: 0;\n\n        .lock-icon {\n            font-size: 20px;\n            color: var(--sqx-color-text-light);\n        }\n    }\n}\n\n//[_ngcontent-%COMP%]   Responsive[_ngcontent-%COMP%]   Design\n@media[_ngcontent-%COMP%]   (max-width[_ngcontent-%COMP%]: 768px) {\n    .video-item {\n        flex-direction: column;\n        align-items: flex-start;\n\n        .video-thumbnail {\n            width: 100%;\n            height: 160px;\n        }\n    }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ChapterDetail, [{
        type: Component,
        args: [{ selector: 'sqx-chapter-detail', standalone: true, imports: [CommonModule, AccordionModule], template: "<div class=\"chapter-detail-container\">\n    <!-- Page Header -->\n    <h1 class=\"page-title\">{{ chapterTitle }}</h1>\n\n    <!-- Course Info -->\n    <div class=\"course-info\">\n        <h2 class=\"course-title\">{{ courseTitle }}</h2>\n        <p class=\"course-description\">{{ courseDescription }}</p>\n    </div>\n\n    @if (loading) {\n    <div class=\"empty-state\">Loading class content...</div>\n    } @else if (error) {\n    <div class=\"empty-state\">{{ error }}</div>\n    } @else if (modules.length === 0) {\n    <div class=\"empty-state\">No lessons uploaded yet.</div>\n    }\n\n    <!-- Modules Accordion -->\n    @if (modules.length) {\n    <div class=\"modules-section\">\n        <p-accordion [value]=\"'0'\">\n            @for (module of modules; track module.id; let i = $index) {\n            <p-accordion-panel [value]=\"i.toString()\">\n                <p-accordion-header>\n                    <ng-template #toggleicon let-active=\"active\">\n                        @if (active) {\n                        <i class=\"pi pi-chevron-up\"></i>\n                        } @else {\n                        <i class=\"pi pi-chevron-down\"></i>\n                        }\n                    </ng-template>\n                    <span class=\"module-title-text\">{{ module.title }}</span>\n                </p-accordion-header>\n                <p-accordion-content>\n                    <div class=\"videos-list\">\n                        @for (lesson of module.lessons; track lesson.id; let lessonIndex = $index) {\n                        <div class=\"video-item\" (click)=\"openLesson(lesson)\">\n                            <div class=\"video-thumbnail\">\n                                <div class=\"placeholder-thumbnail\">\n                                    <i class=\"pi pi-play\"></i>\n                                </div>\n                                @if (lesson.durationMinutes) {\n                                <span class=\"duration-badge\">{{ lesson.durationMinutes }} min</span>\n                                }\n                            </div>\n                            <div class=\"video-info\">\n                                <h4 class=\"video-title\">\n                                    Lesson {{ lessonIndex + 1 }}: {{ lesson.title }}\n                                </h4>\n                                @if (lesson.summary) {\n                                <div class=\"video-meta\">\n                                    <i class=\"pi pi-align-left\"></i>\n                                    <span>{{ lesson.summary }}</span>\n                                </div>\n                                }\n                                @if (primaryBlock(lesson)) {\n                                <div class=\"video-meta\">\n                                    <i class=\"pi pi-file\"></i>\n                                    <span>{{ blockText(primaryBlock(lesson)!) }}</span>\n                                </div>\n                                }\n                            </div>\n                            <div class=\"video-action\">\n                                <i class=\"pi pi-external-link\"></i>\n                            </div>\n                        </div>\n                        }\n                    </div>\n                </p-accordion-content>\n            </p-accordion-panel>\n            }\n        </p-accordion>\n    </div>\n    }\n\n    @if (selectedLesson) {\n    <div class=\"modules-section\">\n        <h2 class=\"course-title\">{{ selectedLesson.title }}</h2>\n        @if (selectedLesson.summary) {\n        <p class=\"course-description\">{{ selectedLesson.summary }}</p>\n        }\n        <div class=\"videos-list\">\n            @for (block of selectedLesson.blocks; track block.id) {\n            <div class=\"video-item\">\n                <div class=\"video-info\">\n                    @if (block.type === 'heading') {\n                    <h3 class=\"video-title\">{{ block.text || block.title }}</h3>\n                    } @else if (block.type === 'paragraph' || block.type === 'assignment_note') {\n                    <p>{{ block.text }}</p>\n                    } @else if (block.type === 'bullet_list' || block.type === 'nested_bullet_list') {\n                    <ul>\n                        @for (item of block.items || []; track item.text) {\n                        <li>\n                            {{ item.text }}\n                            @if (item.children?.length) {\n                            <ul>\n                                @for (child of item.children || []; track child.text) {\n                                <li>\n                                    {{ child.text }}\n                                    @if (child.children?.length) {\n                                    <ul>\n                                        @for (grandChild of child.children || []; track grandChild.text) {\n                                        <li>{{ grandChild.text }}</li>\n                                        }\n                                    </ul>\n                                    }\n                                </li>\n                                }\n                            </ul>\n                            }\n                        </li>\n                        }\n                    </ul>\n                    } @else if (block.type === 'table') {\n                    <table style=\"width: 100%; border-collapse: collapse;\">\n                        <thead>\n                            <tr>\n                                @for (column of block.columns || []; track column) {\n                                <th style=\"border: 1px solid #d1d5db; padding: 0.5rem; text-align: left;\">{{ column }}</th>\n                                }\n                            </tr>\n                        </thead>\n                        <tbody>\n                            @for (row of block.rows || []; track row) {\n                            <tr>\n                                @for (cell of row; track cell) {\n                                <td style=\"border: 1px solid #d1d5db; padding: 0.5rem;\">{{ cell }}</td>\n                                }\n                            </tr>\n                            }\n                        </tbody>\n                    </table>\n                    } @else if (block.type === 'image' && block.url) {\n                    <img [src]=\"blockUrl(block)\" [alt]=\"block.title || block.text\" style=\"max-width: 100%; border-radius: 8px;\">\n                    } @else if (block.url) {\n                    <a [href]=\"blockUrl(block)\" target=\"_blank\" rel=\"noopener\">{{ block.title || block.text || block.type }}</a>\n                    } @else {\n                    <p>{{ block.title || block.text || block.type }}</p>\n                    }\n                </div>\n            </div>\n            }\n        </div>\n    </div>\n    }\n</div>\n", styles: [".chapter-detail-container {\n    width: 100%;\n    padding: var(--sqx-space-6);\n}\n\n.page-title {\n    font-size: 24px;\n    font-weight: 700;\n    color: var(--sqx-color-text);\n    margin: 0 0 var(--sqx-space-5) 0;\n}\n\n.course-info {\n    margin-bottom: var(--sqx-space-6);\n\n    .course-title {\n        font-size: 18px;\n        font-weight: 600;\n        color: var(--sqx-color-text);\n        margin: 0 0 var(--sqx-space-2) 0;\n    }\n\n    .course-description {\n        font-size: 14px;\n        line-height: 1.6;\n        color: var(--sqx-color-text-light);\n        margin: 0;\n    }\n}\n\n.modules-section {\n    max-width: 100%;\n}\n\n// Accordion Customization\n::ng-deep .p-accordion {\n    .p-accordion-panel {\n        border: 1px solid var(--sqx-color-border);\n        border-radius: var(--sqx-radius-lg);\n        overflow: hidden;\n        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n        margin-bottom: 0 !important;\n\n        &:hover {\n            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n        }\n    }\n\n    .p-accordion-header {\n        border: none;\n        background: white;\n\n        .p-accordion-header-link {\n            padding: var(--sqx-space-5);\n            border: none;\n            background: transparent;\n\n            &:focus {\n                box-shadow: none;\n            }\n        }\n    }\n\n    .p-accordion-content {\n        border: none;\n        background: white;\n        padding: 0 !important;\n        overflow: hidden;\n    }\n}\n\n.module-title-text {\n    font-size: 18px;\n    font-weight: 600;\n    color: var(--sqx-color-text);\n}\n\n.videos-list {\n    padding: var(--sqx-space-4) var(--sqx-space-5);\n    border-top: 1px solid var(--sqx-color-border);\n    background: #FAFBFC;\n}\n\n.video-item {\n    display: flex;\n    align-items: center;\n    gap: var(--sqx-space-4);\n    padding: var(--sqx-space-4);\n    background: white;\n    border: 1px solid var(--sqx-color-border);\n    border-radius: var(--sqx-radius-md);\n    margin-bottom: var(--sqx-space-3);\n    cursor: pointer;\n    transition: all 0.2s ease;\n\n    &:last-child {\n        margin-bottom: 0;\n    }\n\n    &:not(.locked):hover {\n        border-color: var(--sqx-color-primary);\n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);\n    }\n\n    &.locked {\n        opacity: 0.6;\n        cursor: not-allowed;\n    }\n\n    .video-thumbnail {\n        position: relative;\n        flex-shrink: 0;\n        width: 120px;\n        height: 80px;\n        border-radius: var(--sqx-radius-sm);\n        overflow: hidden;\n        background: #F3F4F6;\n\n        img {\n            width: 100%;\n            height: 100%;\n            object-fit: cover;\n        }\n\n        .placeholder-thumbnail {\n            width: 100%;\n            height: 100%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n\n            i {\n                font-size: 32px;\n                color: white;\n            }\n        }\n\n        .duration-badge {\n            position: absolute;\n            bottom: 6px;\n            right: 6px;\n            padding: 4px 8px;\n            background: rgba(0, 0, 0, 0.8);\n            color: white;\n            font-size: 11px;\n            font-weight: 600;\n            border-radius: 4px;\n        }\n    }\n\n    .video-info {\n        flex: 1;\n\n        .video-title {\n            font-size: 15px;\n            font-weight: 500;\n            color: var(--sqx-color-text);\n            margin: 0 0 var(--sqx-space-2) 0;\n            line-height: 1.4;\n        }\n\n        .video-meta {\n            display: flex;\n            align-items: center;\n            gap: var(--sqx-space-2);\n            font-size: 13px;\n            color: var(--sqx-color-text-light);\n\n            i {\n                font-size: 14px;\n            }\n        }\n    }\n\n    .video-action {\n        flex-shrink: 0;\n\n        .lock-icon {\n            font-size: 20px;\n            color: var(--sqx-color-text-light);\n        }\n    }\n}\n\n// Responsive Design\n@media (max-width: 768px) {\n    .video-item {\n        flex-direction: column;\n        align-items: flex-start;\n\n        .video-thumbnail {\n            width: 100%;\n            height: 160px;\n        }\n    }\n}"] }]
    }], () => [{ type: i1.ActivatedRoute }, { type: i2.CourseContentService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ChapterDetail, { className: "ChapterDetail", filePath: "src/app/modules/classes/chapter-detail/chapter-detail.ts", lineNumber: 21 }); })();
