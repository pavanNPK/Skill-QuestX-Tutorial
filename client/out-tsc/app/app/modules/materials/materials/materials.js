import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Subject, filter, takeUntil } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/header.service";
import * as i2 from "../../core/services/course-content.service";
import * as i3 from "../../core/services/auth.service";
import * as i4 from "@angular/router";
import * as i5 from "@angular/common";
import * as i6 from "primeng/button";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.text;
const _forTrack2 = ($index, $item) => $item.text + $item.level;
function Materials_Conditional_1_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵtext(1, "Loading materials...");
    i0.ɵɵelementEnd();
} }
function Materials_Conditional_1_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function Materials_Conditional_1_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("Showing ", ctx_r0.visibleCourses.length, " course material set", ctx_r0.visibleCourses.length === 1 ? "" : "s");
} }
function Materials_Conditional_1_For_6_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "div", 8);
    i0.ɵɵelement(2, "i", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 10)(4, "h3", 11);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 12);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 13)(9, "div", 14);
    i0.ɵɵelement(10, "div", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 16);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "button", 17);
    i0.ɵɵlistener("click", function Materials_Conditional_1_For_6_Template_button_click_13_listener() { const course_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.selectCourse(course_r3)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const course_r3 = ctx.$implicit;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(course_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("By ", course_r3.author || "SkillQuestX");
    i0.ɵɵadvance(3);
    i0.ɵɵstyleProp("width", course_r3.moduleCount ? 100 : 0, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", course_r3.moduleCount, " Indexes \u2022 ", course_r3.lessonCount, " Slides");
} }
function Materials_Conditional_1_ForEmpty_7_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵtext(1, "No material records were returned by the API.");
    i0.ɵɵelementEnd();
} }
function Materials_Conditional_1_ForEmpty_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, Materials_Conditional_1_ForEmpty_7_Conditional_0_Template, 2, 0, "div", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional(!ctx_r0.loading && !ctx_r0.error ? 0 : -1);
} }
function Materials_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵconditionalCreate(1, Materials_Conditional_1_Conditional_1_Template, 2, 0, "div", 4)(2, Materials_Conditional_1_Conditional_2_Template, 2, 1, "div", 4);
    i0.ɵɵconditionalCreate(3, Materials_Conditional_1_Conditional_3_Template, 2, 2, "div", 5);
    i0.ɵɵelementStart(4, "div", 6);
    i0.ɵɵrepeaterCreate(5, Materials_Conditional_1_For_6_Template, 14, 6, "div", 7, _forTrack0, false, Materials_Conditional_1_ForEmpty_7_Template, 1, 1);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.loading ? 1 : ctx_r0.error ? 2 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!ctx_r0.loading && ctx_r0.visibleCourses.length > 0 ? 3 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.visibleCourses);
} }
function Materials_Conditional_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵtext(1, "Loading course material...");
    i0.ɵɵelementEnd();
} }
function Materials_Conditional_2_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵtext(1, "No materials have been published for this course.");
    i0.ɵɵelementEnd();
} }
function Materials_Conditional_2_Conditional_3_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 18)(1, "button", 21);
    i0.ɵɵlistener("click", function Materials_Conditional_2_Conditional_3_Conditional_0_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.goBack()); });
    i0.ɵɵelementEnd()();
} }
function Materials_Conditional_2_Conditional_3_For_3_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const module_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" ", module_r6.lessons.length, " slides ");
} }
function Materials_Conditional_2_Conditional_3_For_3_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Coming next ");
} }
function Materials_Conditional_2_Conditional_3_For_3_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 22);
    i0.ɵɵlistener("click", function Materials_Conditional_2_Conditional_3_For_3_Template_button_click_0_listener() { const module_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(module_r6.lessons.length ? ctx_r0.openIndex(module_r6) : null); });
    i0.ɵɵelementStart(1, "span", 23);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 24);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 25);
    i0.ɵɵconditionalCreate(6, Materials_Conditional_2_Conditional_3_For_3_Conditional_6_Template, 1, 1)(7, Materials_Conditional_2_Conditional_3_For_3_Conditional_7_Template, 1, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "i", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const module_r6 = ctx.$implicit;
    const ɵ$index_70_r7 = ctx.$index;
    i0.ɵɵclassProp("disabled", module_r6.lessons.length === 0);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ɵ$index_70_r7 + 1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(module_r6.title.replace(ɵ$index_70_r7 + 1 + ". ", ""));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(module_r6.lessons.length ? 6 : 7);
} }
function Materials_Conditional_2_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, Materials_Conditional_2_Conditional_3_Conditional_0_Template, 2, 0, "div", 18);
    i0.ɵɵelementStart(1, "div", 19);
    i0.ɵɵrepeaterCreate(2, Materials_Conditional_2_Conditional_3_For_3_Template, 9, 5, "button", 20, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional(ctx_r0.visibleCourses.length > 1 ? 0 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.indexModules);
} }
function Materials_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵconditionalCreate(1, Materials_Conditional_2_Conditional_1_Template, 2, 0, "div", 4)(2, Materials_Conditional_2_Conditional_2_Template, 2, 0, "div", 4);
    i0.ɵɵconditionalCreate(3, Materials_Conditional_2_Conditional_3_Template, 4, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.loading ? 1 : !ctx_r0.selectedContent || ctx_r0.selectedContent.modules.length === 0 ? 2 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.selectedContent ? 3 : -1);
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h3");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const block_r9 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(block_r9.text || block_r9.title);
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_2_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h3");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const block_r9 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(block_r9.title);
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, Materials_Conditional_3_Conditional_13_For_8_Case_2_Conditional_0_Template, 2, 1, "h3");
    i0.ɵɵelementStart(1, "p");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const block_r9 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵconditional(block_r9.title ? 0 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(block_r9.text);
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_3_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h3");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const block_r9 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(block_r9.title);
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, Materials_Conditional_3_Conditional_13_For_8_Case_3_Conditional_0_Template, 2, 1, "h3");
    i0.ɵɵelementStart(1, "p");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const block_r9 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵconditional(block_r9.title ? 0 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(block_r9.text);
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_4_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h3");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const block_r9 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(block_r9.title);
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_4_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r10 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r10.text);
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, Materials_Conditional_3_Conditional_13_For_8_Case_4_Conditional_0_Template, 2, 1, "h3");
    i0.ɵɵelementStart(1, "ul", 39);
    i0.ɵɵrepeaterCreate(2, Materials_Conditional_3_Conditional_13_For_8_Case_4_For_3_Template, 2, 1, "li", null, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const block_r9 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵconditional(block_r9.title ? 0 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(block_r9.items);
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_5_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h3");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const block_r9 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(block_r9.title);
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_5_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 42);
    i0.ɵɵelement(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r11 = ctx.$implicit;
    i0.ɵɵstyleProp("padding-left", item_r11.level * 1.5, "rem");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", item_r11.text, " ");
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, Materials_Conditional_3_Conditional_13_For_8_Case_5_Conditional_0_Template, 2, 1, "h3");
    i0.ɵɵelementStart(1, "div", 40);
    i0.ɵɵrepeaterCreate(2, Materials_Conditional_3_Conditional_13_For_8_Case_5_For_3_Template, 3, 3, "div", 41, _forTrack2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const block_r9 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵconditional(block_r9.title ? 0 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.flattenedBullets(block_r9.items));
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_6_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h3");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const block_r9 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(block_r9.title);
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_6_For_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r12 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(column_r12);
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_6_For_9_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cell_r13 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(cell_r13);
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_6_For_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵrepeaterCreate(1, Materials_Conditional_3_Conditional_13_For_8_Case_6_For_9_For_2_Template, 2, 1, "td", null, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r14 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵrepeater(row_r14);
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, Materials_Conditional_3_Conditional_13_For_8_Case_6_Conditional_0_Template, 2, 1, "h3");
    i0.ɵɵelementStart(1, "div", 43)(2, "table")(3, "thead")(4, "tr");
    i0.ɵɵrepeaterCreate(5, Materials_Conditional_3_Conditional_13_For_8_Case_6_For_6_Template, 2, 1, "th", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "tbody");
    i0.ɵɵrepeaterCreate(8, Materials_Conditional_3_Conditional_13_For_8_Case_6_For_9_Template, 3, 0, "tr", null, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const block_r9 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵconditional(block_r9.title ? 0 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(block_r9.columns);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(block_r9.rows);
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_7_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 46);
    i0.ɵɵlistener("click", function Materials_Conditional_3_Conditional_13_For_8_Case_7_Conditional_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r15); const block_r9 = i0.ɵɵnextContext(2).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.openBlock(block_r9)); });
    i0.ɵɵelementEnd();
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵelement(1, "i", 44);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, Materials_Conditional_3_Conditional_13_For_8_Case_7_Conditional_4_Template, 1, 0, "button", 45);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const block_r9 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(block_r9.title || block_r9.text || "Image");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.hasOpenableAsset(block_r9) ? 4 : -1);
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_8_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 46);
    i0.ɵɵlistener("click", function Materials_Conditional_3_Conditional_13_For_8_Case_8_Conditional_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r16); const block_r9 = i0.ɵɵnextContext(2).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.openBlock(block_r9)); });
    i0.ɵɵelementEnd();
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵelement(1, "i", 47);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, Materials_Conditional_3_Conditional_13_For_8_Case_8_Conditional_4_Template, 1, 0, "button", 45);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const block_r9 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(block_r9.title || block_r9.text || "Document");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.hasOpenableAsset(block_r9) ? 4 : -1);
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_9_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 46);
    i0.ɵɵlistener("click", function Materials_Conditional_3_Conditional_13_For_8_Case_9_Conditional_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r17); const block_r9 = i0.ɵɵnextContext(2).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.openBlock(block_r9)); });
    i0.ɵɵelementEnd();
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵelement(1, "i", 48);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, Materials_Conditional_3_Conditional_13_For_8_Case_9_Conditional_4_Template, 1, 0, "button", 45);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const block_r9 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(block_r9.title || block_r9.text || "Video");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.hasOpenableAsset(block_r9) ? 4 : -1);
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_10_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 46);
    i0.ɵɵlistener("click", function Materials_Conditional_3_Conditional_13_For_8_Case_10_Conditional_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r18); const block_r9 = i0.ɵɵnextContext(2).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.openBlock(block_r9)); });
    i0.ɵɵelementEnd();
} }
function Materials_Conditional_3_Conditional_13_For_8_Case_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵelement(1, "i", 49);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, Materials_Conditional_3_Conditional_13_For_8_Case_10_Conditional_4_Template, 1, 0, "button", 45);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const block_r9 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(block_r9.title || block_r9.text || "Link");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.hasOpenableAsset(block_r9) ? 4 : -1);
} }
function Materials_Conditional_3_Conditional_13_For_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 37);
    i0.ɵɵconditionalCreate(1, Materials_Conditional_3_Conditional_13_For_8_Case_1_Template, 2, 1, "h3")(2, Materials_Conditional_3_Conditional_13_For_8_Case_2_Template, 3, 2)(3, Materials_Conditional_3_Conditional_13_For_8_Case_3_Template, 3, 2)(4, Materials_Conditional_3_Conditional_13_For_8_Case_4_Template, 4, 1)(5, Materials_Conditional_3_Conditional_13_For_8_Case_5_Template, 4, 1)(6, Materials_Conditional_3_Conditional_13_For_8_Case_6_Template, 10, 1)(7, Materials_Conditional_3_Conditional_13_For_8_Case_7_Template, 5, 2, "div", 38)(8, Materials_Conditional_3_Conditional_13_For_8_Case_8_Template, 5, 2, "div", 38)(9, Materials_Conditional_3_Conditional_13_For_8_Case_9_Template, 5, 2, "div", 38)(10, Materials_Conditional_3_Conditional_13_For_8_Case_10_Template, 5, 2, "div", 38);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_13_0;
    const block_r9 = ctx.$implicit;
    i0.ɵɵproperty("ngClass", block_r9.type);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_13_0 = block_r9.type) === "heading" ? 1 : tmp_13_0 === "paragraph" ? 2 : tmp_13_0 === "assignment_note" ? 3 : tmp_13_0 === "bullet_list" ? 4 : tmp_13_0 === "nested_bullet_list" ? 5 : tmp_13_0 === "table" ? 6 : tmp_13_0 === "image" ? 7 : tmp_13_0 === "document" ? 8 : tmp_13_0 === "video" ? 9 : tmp_13_0 === "link" ? 10 : -1);
} }
function Materials_Conditional_3_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 34)(1, "div", 35)(2, "p");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 36);
    i0.ɵɵrepeaterCreate(7, Materials_Conditional_3_Conditional_13_For_8_Template, 11, 2, "section", 37, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Slide ", ctx_r0.currentSlideNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.currentLesson.title);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.currentLesson.blocks);
} }
function Materials_Conditional_3_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵtext(1, "Content for this index will be added soon.");
    i0.ɵɵelementEnd();
} }
function Materials_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 3)(1, "div", 27)(2, "div", 28)(3, "button", 29);
    i0.ɵɵlistener("click", function Materials_Conditional_3_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.backToIndex()); });
    i0.ɵɵelement(4, "i", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "h2");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "div", 31)(11, "button", 32);
    i0.ɵɵlistener("click", function Materials_Conditional_3_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.previousSlide()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "button", 33);
    i0.ɵɵlistener("click", function Materials_Conditional_3_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.nextSlide()); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(13, Materials_Conditional_3_Conditional_13_Template, 9, 2, "article", 34)(14, Materials_Conditional_3_Conditional_14_Template, 2, 0, "div", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r0.selectedModule.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("Slide ", ctx_r0.currentSlideNumber, " of ", ctx_r0.totalSlides);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.currentLessonIndex === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.currentLessonIndex >= ctx_r0.totalSlides - 1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.currentLesson ? 13 : 14);
} }
export class Materials {
    headerService;
    contentService;
    authService;
    router;
    cdr;
    selectedCourse = null;
    selectedContent = null;
    selectedModule = null;
    currentLessonIndex = 0;
    displayModal = false;
    selectedLesson = null;
    enrolledCourses = [];
    loading = true;
    error = '';
    destroy$ = new Subject();
    get visibleCourses() {
        return Array.isArray(this.enrolledCourses) ? this.enrolledCourses : [];
    }
    get indexModules() {
        return this.selectedContent?.modules ?? [];
    }
    get currentLesson() {
        if (!this.selectedModule?.lessons?.length)
            return null;
        return this.selectedModule.lessons[this.currentLessonIndex] ?? null;
    }
    get currentSlideNumber() {
        return this.currentLessonIndex + 1;
    }
    get totalSlides() {
        return this.selectedModule?.lessons?.length ?? 0;
    }
    breadcrumbLabel(title) {
        return title.replace(/^\d+\.\s*/, '');
    }
    constructor(headerService, contentService, authService, router, cdr) {
        this.headerService = headerService;
        this.contentService = contentService;
        this.authService = authService;
        this.router = router;
        this.cdr = cdr;
    }
    ngOnInit() {
        this.updateGlobalHeader();
        this.loadAvailableCourses();
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd), filter((event) => event.urlAfterRedirects === '/materials'), takeUntil(this.destroy$))
            .subscribe(() => {
            if (this.loading)
                return;
            console.info('[Materials Page] /materials route activated, refreshing available courses');
            this.selectedCourse = null;
            this.selectedContent = null;
            this.selectedModule = null;
            this.currentLessonIndex = 0;
            this.loadAvailableCourses();
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.headerService.reset();
    }
    loadAvailableCourses() {
        console.info('[Materials Page] Loading available courses for route', {
            url: this.router.url,
            currentUser: this.authService.currentUser(),
        });
        this.loading = true;
        this.error = '';
        this.cdr.detectChanges();
        this.contentService.getAvailableCourses().subscribe({
            next: (courses) => {
                const normalizedCourses = Array.isArray(courses) ? courses : [];
                console.info('[Materials Page] Available courses loaded', {
                    currentUser: this.authService.currentUser(),
                    count: normalizedCourses.length,
                    courses: normalizedCourses,
                });
                this.enrolledCourses = normalizedCourses;
                this.loading = false;
                this.error = normalizedCourses.length ? '' : this.emptyStateMessage();
                this.cdr.detectChanges();
                if (normalizedCourses.length === 1 && !this.selectedCourse) {
                    this.selectCourse(normalizedCourses[0]);
                }
            },
            error: (error) => {
                console.error('[Materials Page] Failed to load available courses', {
                    currentUser: this.authService.currentUser(),
                    error,
                });
                this.loading = false;
                this.error = 'Could not load materials.';
                this.cdr.detectChanges();
            },
        });
    }
    updateGlobalHeader() {
        if (!this.selectedCourse) {
            this.headerService.updateTitle('Materials');
            this.headerService.updateBreadcrumbs([
                { icon: 'pi pi-home', url: '/dashboard', label: 'Home' },
                { label: 'Materials' }
            ]);
            return;
        }
        if (this.selectedModule) {
            this.headerService.updateTitle('');
            this.headerService.updateBreadcrumbs([
                { icon: 'pi pi-home', url: '/dashboard', label: 'Home' },
                { label: 'Materials', command: () => this.backToIndex() },
                { label: this.breadcrumbLabel(this.selectedModule.title) }
            ]);
            return;
        }
        this.headerService.updateTitle('');
        this.headerService.updateBreadcrumbs([
            { icon: 'pi pi-home', url: '/dashboard', label: 'Home' },
            { label: 'Materials', command: () => this.goBack() },
            { label: this.selectedCourse.title }
        ]);
    }
    selectCourse(course) {
        console.info('[Materials Page] Selected course', course);
        this.selectedCourse = course;
        this.loading = true;
        this.error = '';
        this.contentService.getContent(course.id).subscribe({
            next: (content) => {
                console.info('[Materials Page] Course content loaded', {
                    courseId: course.id,
                    status: content.status,
                    mode: content.mode,
                    modules: content.modules.length,
                    content,
                });
                this.selectedContent = content;
                this.selectedModule = null;
                this.currentLessonIndex = 0;
                this.loading = false;
                this.updateGlobalHeader();
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('[Materials Page] Failed to load course content', {
                    course,
                    error,
                });
                this.selectedContent = null;
                this.loading = false;
                this.error = 'Content is not published or you are not enrolled in this course.';
                this.cdr.detectChanges();
            },
        });
    }
    goBack() {
        this.selectedCourse = null;
        this.selectedContent = null;
        this.selectedModule = null;
        this.currentLessonIndex = 0;
        this.updateGlobalHeader();
    }
    backToIndex() {
        this.selectedModule = null;
        this.currentLessonIndex = 0;
        this.updateGlobalHeader();
    }
    openIndex(module) {
        console.info('[Materials Page] Open index module', module);
        this.selectedModule = module;
        this.currentLessonIndex = 0;
        this.updateGlobalHeader();
        this.cdr.detectChanges();
    }
    previousSlide() {
        if (this.currentLessonIndex > 0) {
            this.currentLessonIndex--;
            this.cdr.detectChanges();
        }
    }
    nextSlide() {
        if (this.selectedModule && this.currentLessonIndex < this.selectedModule.lessons.length - 1) {
            this.currentLessonIndex++;
            this.cdr.detectChanges();
        }
    }
    viewLesson(lesson) {
        this.selectedLesson = lesson;
        this.displayModal = true;
    }
    getIconForType(type) {
        switch (type) {
            case 'video': return 'pi pi-video';
            case 'document': return 'pi pi-file';
            case 'image': return 'pi pi-image';
            case 'link': return 'pi pi-link';
            case 'paragraph': return 'pi pi-align-left';
            case 'assignment_note': return 'pi pi-pencil';
            default: return 'pi pi-file';
        }
    }
    materialBlocks(lesson) {
        return lesson.blocks.filter((block) => ['document', 'image', 'video', 'link', 'paragraph', 'assignment_note', 'heading', 'bullet_list', 'nested_bullet_list', 'table'].includes(block.type));
    }
    flattenedBullets(items, level = 0) {
        if (!Array.isArray(items))
            return [];
        return items.flatMap((item) => [
            { text: item.text, level },
            ...this.flattenedBullets(item.children, level + 1),
        ]);
    }
    hasOpenableAsset(block) {
        return ['document', 'image', 'video', 'link'].includes(block.type) && !!block.url;
    }
    openBlock(block) {
        const url = this.contentService.absoluteAssetUrl(block.url);
        if (url)
            window.open(url, '_blank', 'noopener');
    }
    emptyStateMessage() {
        const role = this.authService.currentUser()?.role;
        if (role === 'instructor') {
            return 'No course content is available for this instructor. Assign this instructor to a course, then import or publish content.';
        }
        if (role === 'student') {
            return 'No published material is available for your enrolled courses yet.';
        }
        return 'No course content is available yet. Import content from the course editor first.';
    }
    static ɵfac = function Materials_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Materials)(i0.ɵɵdirectiveInject(i1.HeaderService), i0.ɵɵdirectiveInject(i2.CourseContentService), i0.ɵɵdirectiveInject(i3.AuthService), i0.ɵɵdirectiveInject(i4.Router), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Materials, selectors: [["sqx-materials"]], decls: 4, vars: 3, consts: [[1, "materials-container"], [1, "view-section", "fade-in"], [1, "index-layout", "fade-in"], [1, "slide-reader", "fade-in"], [1, "empty-state"], [1, "materials-count"], [1, "courses-list"], [1, "course-item"], [1, "course-icon"], [1, "pi", "pi-book"], [1, "course-info"], [1, "course-name"], [1, "instructor"], [1, "progress-wrapper"], [1, "progress-bar"], [1, "fill"], [1, "progress-text"], ["pButton", "", "label", "View Material", "icon", "pi pi-arrow-right", 1, "action-btn", 3, "click"], [1, "index-actions"], [1, "index-table"], ["type", "button", 1, "index-row", 3, "disabled"], ["pButton", "", "type", "button", "icon", "pi pi-arrow-left", "label", "Courses", 1, "back-btn", 3, "click"], ["type", "button", 1, "index-row", 3, "click"], [1, "index-number"], [1, "index-title"], [1, "index-meta"], [1, "pi", "pi-chevron-right"], [1, "reader-toolbar"], [1, "reader-title"], ["type", "button", "aria-label", "Back to index", 1, "reader-back-icon", 3, "click"], [1, "pi", "pi-chevron-left"], [1, "reader-actions"], ["pButton", "", "type", "button", "icon", "pi pi-chevron-left", "label", "Prev", 1, "pager-btn", 3, "click", "disabled"], ["pButton", "", "type", "button", "icon", "pi pi-chevron-right", "iconPos", "right", "label", "Next", 1, "pager-btn", 3, "click", "disabled"], [1, "slide-page"], [1, "slide-page-header"], [1, "slide-blocks"], [1, "content-block", 3, "ngClass"], [1, "asset-block"], [1, "bullet-list"], [1, "nested-list"], [1, "nested-item", 3, "padding-left"], [1, "nested-item"], [1, "table-wrap"], [1, "pi", "pi-image"], ["pButton", "", "type", "button", "icon", "pi pi-external-link", "label", "Open"], ["pButton", "", "type", "button", "icon", "pi pi-external-link", "label", "Open", 3, "click"], [1, "pi", "pi-file"], [1, "pi", "pi-video"], [1, "pi", "pi-link"]], template: function Materials_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, Materials_Conditional_1_Template, 8, 3, "div", 1);
            i0.ɵɵconditionalCreate(2, Materials_Conditional_2_Template, 4, 2, "div", 2);
            i0.ɵɵconditionalCreate(3, Materials_Conditional_3_Template, 15, 6, "div", 3);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.selectedCourse && ctx.visibleCourses.length !== 1 ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.selectedCourse && !ctx.selectedModule ? 2 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.selectedCourse && ctx.selectedModule ? 3 : -1);
        } }, dependencies: [CommonModule, i5.NgClass, ButtonModule, i6.ButtonDirective, DialogModule, TableModule, BreadcrumbModule], styles: [".materials-container[_ngcontent-%COMP%] {\n    width: 100%;\n    padding: 2rem;\n    min-height: 100vh;\n    background: #F9FAFB;\n}\n\n.page-title[_ngcontent-%COMP%] {\n    font-size: 24px;\n    font-weight: 700;\n    color: var(--sqx-color-text);\n    margin-bottom: 2rem;\n}\n\n//[_ngcontent-%COMP%]   Course[_ngcontent-%COMP%]   List[_ngcontent-%COMP%]   Styles\n.courses-list[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 1.5rem;\n}\n\n.materials-count[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n    color: #4B5563;\n    font-size: 14px;\n    font-weight: 600;\n}\n\n.index-layout[_ngcontent-%COMP%], \n.slide-reader[_ngcontent-%COMP%] {\n    max-width: 1200px;\n    margin: 0 auto;\n}\n\n.index-actions[_ngcontent-%COMP%], \n.reader-toolbar[_ngcontent-%COMP%] {\n    background: #FFFFFF;\n    border: 1px solid #E5E7EB;\n    border-radius: 12px;\n    padding: 1.25rem;\n    margin-bottom: 1rem;\n    display: flex;\n    align-items: center;\n    gap: 1rem;\n    box-shadow: 0 4px 12px rgba(17, 24, 39, 0.04);\n}\n\n.back-btn[_ngcontent-%COMP%], \n.pager-btn[_ngcontent-%COMP%] {\n    border-radius: 8px;\n}\n\n.index-table[_ngcontent-%COMP%] {\n    background: #FFFFFF;\n    border: 1px solid #E5E7EB;\n    border-radius: 12px;\n    overflow: hidden;\n    box-shadow: 0 4px 12px rgba(17, 24, 39, 0.04);\n}\n\n.index-row[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 62px;\n    border: 0;\n    border-bottom: 1px solid #E5E7EB;\n    background: #FFFFFF;\n    display: grid;\n    grid-template-columns: 48px minmax(0, 1fr) 120px 28px;\n    align-items: center;\n    gap: 1rem;\n    padding: 0.875rem 1.125rem;\n    text-align: left;\n    cursor: pointer;\n    color: #111827;\n\n    &:last-child {\n        border-bottom: 0;\n    }\n\n    &:hover:not(.disabled) {\n        background: #F9FAFB;\n\n        .index-title {\n            color: var(--sqx-color-primary);\n        }\n    }\n\n    &.disabled {\n        cursor: default;\n        color: #9CA3AF;\n        background: #FCFCFD;\n    }\n\n    .index-number {\n        width: 32px;\n        height: 32px;\n        border-radius: 8px;\n        background: #EEF2FF;\n        color: var(--sqx-color-primary);\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        font-weight: 800;\n    }\n\n    .index-title {\n        font-size: 16px;\n        font-weight: 700;\n        overflow-wrap: anywhere;\n    }\n\n    .index-meta {\n        font-size: 13px;\n        font-weight: 700;\n        color: #6B7280;\n        text-align: right;\n    }\n\n    i {\n        color: #9CA3AF;\n    }\n}\n\n.reader-toolbar[_ngcontent-%COMP%] {\n    justify-content: space-between;\n    position: sticky;\n    top: 0;\n    z-index: 3;\n\n    .reader-title {\n        min-width: 0;\n        display: flex;\n        align-items: center;\n        gap: 0.875rem;\n        color: #111827;\n\n        h2 {\n            margin: 0 0 0.15rem;\n            color: #111827;\n            font-size: 22px;\n            line-height: 1.2;\n            font-weight: 800;\n        }\n\n        span {\n            font-size: 13px;\n            color: #6B7280;\n            font-weight: 700;\n        }\n    }\n\n    .reader-actions {\n        display: flex;\n        gap: 0.75rem;\n    }\n}\n\n.reader-back-icon[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n    border: 1px solid #D9D6F0;\n    border-radius: 10px;\n    background: #FFFFFF;\n    color: var(--sqx-color-primary);\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    flex: 0 0 auto;\n\n    &:hover {\n        background: #F5F3FF;\n        border-color: var(--sqx-color-primary);\n    }\n}\n\n.reader-actions[_ngcontent-%COMP%] {\n    ::ng-deep .p-button {\n        background: var(--sqx-color-primary) !important;\n        border-color: var(--sqx-color-primary) !important;\n        color: #FFFFFF !important;\n\n        &:hover:not(:disabled) {\n            background: var(--sqx-color-primary-dark) !important;\n            border-color: var(--sqx-color-primary-dark) !important;\n        }\n\n        &:disabled {\n            background: #D9D6F0 !important;\n            border-color: #D9D6F0 !important;\n            color: #FFFFFF !important;\n            opacity: 1;\n        }\n    }\n}\n\n.slide-page[_ngcontent-%COMP%] {\n    background: #FFFFFF;\n    border: 1px solid #E5E7EB;\n    border-radius: 12px;\n    min-height: 680px;\n    padding: 0;\n    box-shadow: 0 10px 30px rgba(17, 24, 39, 0.06);\n    overflow: hidden;\n}\n\n.slide-page-header[_ngcontent-%COMP%] {\n    border-bottom: 1px solid #E5E7EB;\n    padding: 1.25rem 1.75rem;\n    margin-bottom: 0;\n\n    p {\n        margin: 0 0 0.375rem;\n        color: var(--sqx-color-primary);\n        font-weight: 800;\n        font-size: 13px;\n    }\n\n    h2 {\n        margin: 0;\n        color: #111827;\n        font-size: 28px;\n        line-height: 1.25;\n        font-weight: 800;\n    }\n}\n\n.slide-blocks[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 1.25rem;\n    padding: 1.5rem 1.75rem 2rem;\n}\n\n.content-block[_ngcontent-%COMP%] {\n    color: #1F2937;\n    font-size: 16px;\n    line-height: 1.65;\n\n    h3 {\n        margin: 0 0 0.75rem;\n        font-size: 20px;\n        font-weight: 800;\n        color: #111827;\n    }\n\n    p {\n        margin: 0;\n    }\n\n    &.assignment_note {\n        background: #FFFBEB;\n        border: 1px solid #FDE68A;\n        border-radius: 10px;\n        padding: 1rem;\n    }\n}\n\n.bullet-list[_ngcontent-%COMP%] {\n    margin: 0;\n    padding-left: 1.25rem;\n}\n\n.nested-list[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n}\n\n.nested-item[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 0.625rem;\n\n    span {\n        width: 7px;\n        height: 7px;\n        border-radius: 50%;\n        background: var(--sqx-color-primary);\n        flex: 0 0 auto;\n        margin-top: 0.65rem;\n    }\n}\n\n.table-wrap[_ngcontent-%COMP%] {\n    width: 100%;\n    overflow-x: auto;\n    border: 1px solid #D1D5DB;\n    border-radius: 10px;\n}\n\n.table-wrap[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n    width: 100%;\n    border-collapse: collapse;\n    min-width: 640px;\n    background: #FFFFFF;\n\n    th,\n    td {\n        border-bottom: 1px solid #E5E7EB;\n        border-right: 1px solid #E5E7EB;\n        padding: 0.625rem 0.75rem;\n        text-align: left;\n        vertical-align: top;\n    }\n\n    th:last-child,\n    td:last-child {\n        border-right: 0;\n    }\n\n    tr:last-child td {\n        border-bottom: 0;\n    }\n\n    th {\n        background: #F59E0B;\n        color: #111827;\n        font-weight: 800;\n    }\n}\n\n.asset-block[_ngcontent-%COMP%] {\n    border: 1px solid #E5E7EB;\n    background: #F9FAFB;\n    border-radius: 10px;\n    padding: 1rem;\n    display: flex;\n    align-items: center;\n    gap: 0.875rem;\n\n    i {\n        color: var(--sqx-color-primary);\n        font-size: 20px;\n    }\n\n    span {\n        flex: 1;\n        font-weight: 700;\n    }\n}\n\n@media (max-width: 900px) {\n    .reader-toolbar[_ngcontent-%COMP%], \n   .index-actions[_ngcontent-%COMP%] {\n        align-items: stretch;\n        flex-direction: column;\n    }\n\n    .reader-toolbar[_ngcontent-%COMP%]   .reader-actions[_ngcontent-%COMP%] {\n        width: 100%;\n\n        .pager-btn {\n            flex: 1;\n        }\n    }\n\n    .index-row[_ngcontent-%COMP%] {\n        grid-template-columns: 40px minmax(0, 1fr) 24px;\n\n        .index-meta {\n            grid-column: 2 / 3;\n            text-align: left;\n        }\n    }\n\n    .slide-page[_ngcontent-%COMP%] {\n        min-height: 560px;\n    }\n\n    .slide-page-header[_ngcontent-%COMP%] {\n        padding: 1rem 1.125rem;\n    }\n\n    .slide-blocks[_ngcontent-%COMP%] {\n        padding: 1.125rem;\n    }\n}\n\n.course-item[_ngcontent-%COMP%] {\n    background: white;\n    padding: 1.5rem;\n    border-radius: 16px;\n    display: flex;\n    align-items: center;\n    gap: 1.5rem;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);\n    transition: transform 0.2s, box-shadow 0.2s;\n\n    &:hover {\n        transform: translateY(-2px);\n        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);\n    }\n\n    .course-icon {\n        width: 60px;\n        height: 60px;\n        background: #EFF6FF;\n        color: #3B82F6;\n        border-radius: 12px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n\n        i {\n            font-size: 24px;\n        }\n    }\n\n    .course-info {\n        flex: 1;\n\n        .course-name {\n            font-size: 18px;\n            font-weight: 700;\n            margin: 0 0 6px 0;\n            color: var(--sqx-color-text);\n        }\n\n        .instructor {\n            font-size: 13px;\n            color: #6B7280;\n            margin-bottom: 12px;\n        }\n\n        .progress-wrapper {\n            display: flex;\n            align-items: center;\n            gap: 12px;\n\n            .progress-bar {\n                width: 150px;\n                height: 6px;\n                background: #F3F4F6;\n                border-radius: 10px;\n                overflow: hidden;\n\n                .fill {\n                    height: 100%;\n                    background: var(--sqx-color-primary);\n                    border-radius: 10px;\n                }\n            }\n\n            .progress-text {\n                font-size: 12px;\n                font-weight: 600;\n                color: var(--sqx-color-primary);\n            }\n        }\n    }\n\n    .action-btn {\n        background: white;\n        color: #3B82F6;\n        border: 1px solid #BFDBFE;\n        font-weight: 600;\n        border-radius: 8px;\n\n        &:hover {\n            background: #EFF6FF;\n            color: #2563EB;\n        }\n    }\n}\n\n//[_ngcontent-%COMP%]   Header[_ngcontent-%COMP%]   &[_ngcontent-%COMP%]   Breadcrumb\n.page-header[_ngcontent-%COMP%] {\n    margin-bottom: 2rem;\n\n    ::ng-deep .p-breadcrumb {\n        background: transparent;\n        padding: 0;\n\n        .p-menuitem-text {\n            color: #6B7280;\n            font-weight: 500;\n        }\n\n        .p-menuitem-link:hover .p-menuitem-text {\n            color: var(--primary-color);\n        }\n\n        li:last-child .p-menuitem-text {\n            color: var(--sqx-color-text);\n            font-weight: 700;\n        }\n    }\n}\n\n//[_ngcontent-%COMP%]   Fade[_ngcontent-%COMP%]   Animation\n.fade-in[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_fadeIn 0.4s ease-in-out;\n}\n\n@keyframes _ngcontent-%COMP%_fadeIn {\n    from {\n        opacity: 0;\n        transform: translateY(10px);\n    }\n\n    to {\n        opacity: 1;\n        transform: translateY(0);\n    }\n}\n\n//[_ngcontent-%COMP%]   Concept[_ngcontent-%COMP%]   Grid[_ngcontent-%COMP%]   Premium\n.concepts-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));\n    gap: 1.5rem;\n}\n\n.concept-card-premium[_ngcontent-%COMP%] {\n    background: white;\n    border-radius: 20px;\n    padding: 2rem;\n    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);\n    cursor: pointer;\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    border: 1px solid transparent;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    height: 100%;\n    min-height: 200px;\n    position: relative;\n    overflow: hidden;\n\n    &:hover {\n        transform: translateY(-5px);\n        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.06);\n        border-color: rgba(99, 102, 241, 0.1); // Subtle primary border\n\n        .premium-title {\n            color: var(--primary-color);\n        }\n\n        .arrow-icon {\n            transform: translateX(5px);\n            color: var(--primary-color);\n        }\n    }\n\n    .card-content {\n        .premium-title {\n            font-size: 18px;\n            font-weight: 700;\n            color: var(--sqx-color-text);\n            margin-bottom: 0.75rem;\n            line-height: 1.4;\n            transition: color 0.3s;\n        }\n\n        .premium-desc {\n            font-size: 14px;\n            color: #6B7280;\n            line-height: 1.6;\n            margin: 0;\n        }\n    }\n\n    .card-footer {\n        margin-top: 2rem;\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n\n        .resource-badge {\n            display: flex;\n            align-items: center;\n            gap: 8px;\n            font-size: 12px;\n            font-weight: 600;\n            color: var(--primary-color);\n            background: #EFF6FF; // Light primary bg\n            padding: 8px 16px;\n            border-radius: 30px;\n        }\n\n        .arrow-icon {\n            font-size: 14px;\n            color: #D1D5DB;\n            transition: all 0.3s;\n        }\n    }\n}\n\n.concepts-list[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n    gap: 1.5rem;\n}\n\n.concept-card[_ngcontent-%COMP%] {\n    background: white;\n    border-radius: 16px;\n    padding: 1.5rem;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    height: 100%;\n\n    .concept-title {\n        font-size: 16px;\n        font-weight: 700;\n        margin: 0 0 10px 0;\n        color: var(--sqx-color-text);\n    }\n\n    .concept-desc {\n        font-size: 13px;\n        color: #6B7280;\n        line-height: 1.5;\n        margin-bottom: 1rem;\n    }\n\n    .resource-count {\n        display: flex;\n        align-items: center;\n        gap: 6px;\n        font-size: 12px;\n        font-weight: 600;\n        color: #8B5CF6;\n        background: #F5F3FF;\n        padding: 6px 12px;\n        border-radius: 20px;\n        width: fit-content;\n        margin-bottom: 1.5rem;\n    }\n\n    .view-btn {\n        width: 100%;\n        background: var(--primary-color);\n        border: none;\n        border-radius: 8px;\n        margin-top: auto;\n    }\n}\n\n//[_ngcontent-%COMP%]   Modal[_ngcontent-%COMP%]   Styles\n[_ngcontent-%COMP%]  .material-modal {\n    .p-dialog-header {\n        border-bottom: 1px solid #F3F4F6;\n        padding: 1.5rem;\n    }\n\n    .p-dialog-content {\n        padding: 1.5rem;\n    }\n}\n\n.modal-content[_ngcontent-%COMP%] {\n    .modal-concept-title {\n        font-size: 20px;\n        font-weight: 700;\n        margin: 0 0 10px 0;\n    }\n\n    .modal-concept-desc {\n        color: #6B7280;\n        line-height: 1.6;\n        margin-bottom: 2rem;\n    }\n\n    .resources-grid {\n        display: flex;\n        flex-direction: column;\n        gap: 1rem;\n\n        .resource-item {\n            display: flex;\n            align-items: center;\n            gap: 1rem;\n            padding: 1rem;\n            background: #F9FAFB;\n            border-radius: 12px;\n            border: 1px solid #E5E7EB;\n\n            .res-icon {\n                width: 40px;\n                height: 40px;\n                border-radius: 8px;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n\n                &.video {\n                    background: #fee2e2;\n                    color: #ef4444;\n                }\n\n                &.doc {\n                    background: #e0e7ff;\n                    color: #4338ca;\n                }\n\n                &.link {\n                    background: #dcfce7;\n                    color: #15803d;\n                }\n\n                &.text {\n                    background: #fef3c7;\n                    color: #d97706;\n                }\n            }\n\n            .res-info {\n                flex: 1;\n\n                .res-title {\n                    font-size: 14px;\n                    font-weight: 600;\n                    margin: 0 0 4px 0;\n                }\n\n                .res-type {\n                    font-size: 11px;\n                    color: #6B7280;\n                    text-transform: uppercase;\n                    letter-spacing: 0.5px;\n                }\n            }\n\n            .open-btn {\n                background: white;\n                color: var(--sqx-color-text);\n                border: 1px solid #D1D5DB;\n                font-size: 12px;\n\n                &:hover {\n                    background: #F3F4F6;\n                    border-color: #9CA3AF;\n                }\n            }\n        }\n    }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Materials, [{
        type: Component,
        args: [{ selector: 'sqx-materials', standalone: true, imports: [CommonModule, ButtonModule, DialogModule, TableModule, BreadcrumbModule], template: "<div class=\"materials-container\">\n    @if (!selectedCourse && visibleCourses.length !== 1) {\n    <div class=\"view-section fade-in\">\n        @if (loading) {\n        <div class=\"empty-state\">Loading materials...</div>\n        } @else if (error) {\n        <div class=\"empty-state\">{{ error }}</div>\n        }\n\n        @if (!loading && visibleCourses.length > 0) {\n        <div class=\"materials-count\">Showing {{ visibleCourses.length }} course material set{{ visibleCourses.length === 1 ? '' : 's' }}</div>\n        }\n\n        <div class=\"courses-list\">\n            @for (course of visibleCourses; track course.id) {\n            <div class=\"course-item\">\n                <div class=\"course-icon\">\n                    <i class=\"pi pi-book\"></i>\n                </div>\n                <div class=\"course-info\">\n                    <h3 class=\"course-name\">{{ course.title }}</h3>\n                    <p class=\"instructor\">By {{ course.author || 'SkillQuestX' }}</p>\n                    <div class=\"progress-wrapper\">\n                        <div class=\"progress-bar\">\n                            <div class=\"fill\" [style.width.%]=\"course.moduleCount ? 100 : 0\"></div>\n                        </div>\n                        <span class=\"progress-text\">{{ course.moduleCount }} Indexes \u2022 {{ course.lessonCount }} Slides</span>\n                    </div>\n                </div>\n                <button pButton label=\"View Material\" icon=\"pi pi-arrow-right\" class=\"action-btn\"\n                    (click)=\"selectCourse(course)\"></button>\n            </div>\n            } @empty {\n            @if (!loading && !error) {\n            <div class=\"empty-state\">No material records were returned by the API.</div>\n            }\n            }\n        </div>\n    </div>\n    }\n\n    @if (selectedCourse && !selectedModule) {\n    <div class=\"index-layout fade-in\">\n        @if (loading) {\n        <div class=\"empty-state\">Loading course material...</div>\n        } @else if (!selectedContent || selectedContent.modules.length === 0) {\n        <div class=\"empty-state\">No materials have been published for this course.</div>\n        }\n\n        @if (selectedContent) {\n        @if (visibleCourses.length > 1) {\n        <div class=\"index-actions\">\n            <button pButton type=\"button\" icon=\"pi pi-arrow-left\" label=\"Courses\" class=\"back-btn\"\n                (click)=\"goBack()\"></button>\n        </div>\n        }\n\n        <div class=\"index-table\">\n            @for (module of indexModules; track module.id; let i = $index) {\n            <button type=\"button\" class=\"index-row\" [class.disabled]=\"module.lessons.length === 0\"\n                (click)=\"module.lessons.length ? openIndex(module) : null\">\n                <span class=\"index-number\">{{ i + 1 }}</span>\n                <span class=\"index-title\">{{ module.title.replace((i + 1) + '. ', '') }}</span>\n                <span class=\"index-meta\">\n                    @if (module.lessons.length) {\n                    {{ module.lessons.length }} slides\n                    } @else {\n                    Coming next\n                    }\n                </span>\n                <i class=\"pi pi-chevron-right\"></i>\n            </button>\n            }\n        </div>\n        }\n    </div>\n    }\n\n    @if (selectedCourse && selectedModule) {\n    <div class=\"slide-reader fade-in\">\n        <div class=\"reader-toolbar\">\n            <div class=\"reader-title\">\n                <button type=\"button\" class=\"reader-back-icon\" aria-label=\"Back to index\" (click)=\"backToIndex()\">\n                    <i class=\"pi pi-chevron-left\"></i>\n                </button>\n                <div>\n                    <h2>{{ selectedModule.title }}</h2>\n                    <span>Slide {{ currentSlideNumber }} of {{ totalSlides }}</span>\n                </div>\n            </div>\n            <div class=\"reader-actions\">\n                <button pButton type=\"button\" icon=\"pi pi-chevron-left\" label=\"Prev\" class=\"pager-btn\"\n                    [disabled]=\"currentLessonIndex === 0\" (click)=\"previousSlide()\"></button>\n                <button pButton type=\"button\" icon=\"pi pi-chevron-right\" iconPos=\"right\" label=\"Next\" class=\"pager-btn\"\n                    [disabled]=\"currentLessonIndex >= totalSlides - 1\" (click)=\"nextSlide()\"></button>\n            </div>\n        </div>\n\n        @if (currentLesson) {\n        <article class=\"slide-page\">\n            <div class=\"slide-page-header\">\n                <p>Slide {{ currentSlideNumber }}</p>\n                <h2>{{ currentLesson.title }}</h2>\n            </div>\n\n            <div class=\"slide-blocks\">\n                @for (block of currentLesson.blocks; track block.id) {\n                <section class=\"content-block\" [ngClass]=\"block.type\">\n                    @switch (block.type) {\n                    @case ('heading') {\n                    <h3>{{ block.text || block.title }}</h3>\n                    }\n                    @case ('paragraph') {\n                    @if (block.title) { <h3>{{ block.title }}</h3> }\n                    <p>{{ block.text }}</p>\n                    }\n                    @case ('assignment_note') {\n                    @if (block.title) { <h3>{{ block.title }}</h3> }\n                    <p>{{ block.text }}</p>\n                    }\n                    @case ('bullet_list') {\n                    @if (block.title) { <h3>{{ block.title }}</h3> }\n                    <ul class=\"bullet-list\">\n                        @for (item of block.items; track item.text) {\n                        <li>{{ item.text }}</li>\n                        }\n                    </ul>\n                    }\n                    @case ('nested_bullet_list') {\n                    @if (block.title) { <h3>{{ block.title }}</h3> }\n                    <div class=\"nested-list\">\n                        @for (item of flattenedBullets(block.items); track item.text + item.level) {\n                        <div class=\"nested-item\" [style.padding-left.rem]=\"item.level * 1.5\">\n                            <span></span>{{ item.text }}\n                        </div>\n                        }\n                    </div>\n                    }\n                    @case ('table') {\n                    @if (block.title) { <h3>{{ block.title }}</h3> }\n                    <div class=\"table-wrap\">\n                        <table>\n                            <thead>\n                                <tr>\n                                    @for (column of block.columns; track column) {\n                                    <th>{{ column }}</th>\n                                    }\n                                </tr>\n                            </thead>\n                            <tbody>\n                                @for (row of block.rows; track $index) {\n                                <tr>\n                                    @for (cell of row; track $index) {\n                                    <td>{{ cell }}</td>\n                                    }\n                                </tr>\n                                }\n                            </tbody>\n                        </table>\n                    </div>\n                    }\n                    @case ('image') {\n                    <div class=\"asset-block\">\n                        <i class=\"pi pi-image\"></i>\n                        <span>{{ block.title || block.text || 'Image' }}</span>\n                        @if (hasOpenableAsset(block)) {\n                        <button pButton type=\"button\" icon=\"pi pi-external-link\" label=\"Open\"\n                            (click)=\"openBlock(block)\"></button>\n                        }\n                    </div>\n                    }\n                    @case ('document') {\n                    <div class=\"asset-block\">\n                        <i class=\"pi pi-file\"></i>\n                        <span>{{ block.title || block.text || 'Document' }}</span>\n                        @if (hasOpenableAsset(block)) {\n                        <button pButton type=\"button\" icon=\"pi pi-external-link\" label=\"Open\"\n                            (click)=\"openBlock(block)\"></button>\n                        }\n                    </div>\n                    }\n                    @case ('video') {\n                    <div class=\"asset-block\">\n                        <i class=\"pi pi-video\"></i>\n                        <span>{{ block.title || block.text || 'Video' }}</span>\n                        @if (hasOpenableAsset(block)) {\n                        <button pButton type=\"button\" icon=\"pi pi-external-link\" label=\"Open\"\n                            (click)=\"openBlock(block)\"></button>\n                        }\n                    </div>\n                    }\n                    @case ('link') {\n                    <div class=\"asset-block\">\n                        <i class=\"pi pi-link\"></i>\n                        <span>{{ block.title || block.text || 'Link' }}</span>\n                        @if (hasOpenableAsset(block)) {\n                        <button pButton type=\"button\" icon=\"pi pi-external-link\" label=\"Open\"\n                            (click)=\"openBlock(block)\"></button>\n                        }\n                    </div>\n                    }\n                    }\n                </section>\n                }\n            </div>\n        </article>\n        } @else {\n        <div class=\"empty-state\">Content for this index will be added soon.</div>\n        }\n    </div>\n    }\n</div>\n", styles: [".materials-container {\n    width: 100%;\n    padding: 2rem;\n    min-height: 100vh;\n    background: #F9FAFB;\n}\n\n.page-title {\n    font-size: 24px;\n    font-weight: 700;\n    color: var(--sqx-color-text);\n    margin-bottom: 2rem;\n}\n\n// Course List Styles\n.courses-list {\n    display: flex;\n    flex-direction: column;\n    gap: 1.5rem;\n}\n\n.materials-count {\n    margin-bottom: 1rem;\n    color: #4B5563;\n    font-size: 14px;\n    font-weight: 600;\n}\n\n.index-layout,\n.slide-reader {\n    max-width: 1200px;\n    margin: 0 auto;\n}\n\n.index-actions,\n.reader-toolbar {\n    background: #FFFFFF;\n    border: 1px solid #E5E7EB;\n    border-radius: 12px;\n    padding: 1.25rem;\n    margin-bottom: 1rem;\n    display: flex;\n    align-items: center;\n    gap: 1rem;\n    box-shadow: 0 4px 12px rgba(17, 24, 39, 0.04);\n}\n\n.back-btn,\n.pager-btn {\n    border-radius: 8px;\n}\n\n.index-table {\n    background: #FFFFFF;\n    border: 1px solid #E5E7EB;\n    border-radius: 12px;\n    overflow: hidden;\n    box-shadow: 0 4px 12px rgba(17, 24, 39, 0.04);\n}\n\n.index-row {\n    width: 100%;\n    min-height: 62px;\n    border: 0;\n    border-bottom: 1px solid #E5E7EB;\n    background: #FFFFFF;\n    display: grid;\n    grid-template-columns: 48px minmax(0, 1fr) 120px 28px;\n    align-items: center;\n    gap: 1rem;\n    padding: 0.875rem 1.125rem;\n    text-align: left;\n    cursor: pointer;\n    color: #111827;\n\n    &:last-child {\n        border-bottom: 0;\n    }\n\n    &:hover:not(.disabled) {\n        background: #F9FAFB;\n\n        .index-title {\n            color: var(--sqx-color-primary);\n        }\n    }\n\n    &.disabled {\n        cursor: default;\n        color: #9CA3AF;\n        background: #FCFCFD;\n    }\n\n    .index-number {\n        width: 32px;\n        height: 32px;\n        border-radius: 8px;\n        background: #EEF2FF;\n        color: var(--sqx-color-primary);\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        font-weight: 800;\n    }\n\n    .index-title {\n        font-size: 16px;\n        font-weight: 700;\n        overflow-wrap: anywhere;\n    }\n\n    .index-meta {\n        font-size: 13px;\n        font-weight: 700;\n        color: #6B7280;\n        text-align: right;\n    }\n\n    i {\n        color: #9CA3AF;\n    }\n}\n\n.reader-toolbar {\n    justify-content: space-between;\n    position: sticky;\n    top: 0;\n    z-index: 3;\n\n    .reader-title {\n        min-width: 0;\n        display: flex;\n        align-items: center;\n        gap: 0.875rem;\n        color: #111827;\n\n        h2 {\n            margin: 0 0 0.15rem;\n            color: #111827;\n            font-size: 22px;\n            line-height: 1.2;\n            font-weight: 800;\n        }\n\n        span {\n            font-size: 13px;\n            color: #6B7280;\n            font-weight: 700;\n        }\n    }\n\n    .reader-actions {\n        display: flex;\n        gap: 0.75rem;\n    }\n}\n\n.reader-back-icon {\n    width: 40px;\n    height: 40px;\n    border: 1px solid #D9D6F0;\n    border-radius: 10px;\n    background: #FFFFFF;\n    color: var(--sqx-color-primary);\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    flex: 0 0 auto;\n\n    &:hover {\n        background: #F5F3FF;\n        border-color: var(--sqx-color-primary);\n    }\n}\n\n.reader-actions {\n    ::ng-deep .p-button {\n        background: var(--sqx-color-primary) !important;\n        border-color: var(--sqx-color-primary) !important;\n        color: #FFFFFF !important;\n\n        &:hover:not(:disabled) {\n            background: var(--sqx-color-primary-dark) !important;\n            border-color: var(--sqx-color-primary-dark) !important;\n        }\n\n        &:disabled {\n            background: #D9D6F0 !important;\n            border-color: #D9D6F0 !important;\n            color: #FFFFFF !important;\n            opacity: 1;\n        }\n    }\n}\n\n.slide-page {\n    background: #FFFFFF;\n    border: 1px solid #E5E7EB;\n    border-radius: 12px;\n    min-height: 680px;\n    padding: 0;\n    box-shadow: 0 10px 30px rgba(17, 24, 39, 0.06);\n    overflow: hidden;\n}\n\n.slide-page-header {\n    border-bottom: 1px solid #E5E7EB;\n    padding: 1.25rem 1.75rem;\n    margin-bottom: 0;\n\n    p {\n        margin: 0 0 0.375rem;\n        color: var(--sqx-color-primary);\n        font-weight: 800;\n        font-size: 13px;\n    }\n\n    h2 {\n        margin: 0;\n        color: #111827;\n        font-size: 28px;\n        line-height: 1.25;\n        font-weight: 800;\n    }\n}\n\n.slide-blocks {\n    display: flex;\n    flex-direction: column;\n    gap: 1.25rem;\n    padding: 1.5rem 1.75rem 2rem;\n}\n\n.content-block {\n    color: #1F2937;\n    font-size: 16px;\n    line-height: 1.65;\n\n    h3 {\n        margin: 0 0 0.75rem;\n        font-size: 20px;\n        font-weight: 800;\n        color: #111827;\n    }\n\n    p {\n        margin: 0;\n    }\n\n    &.assignment_note {\n        background: #FFFBEB;\n        border: 1px solid #FDE68A;\n        border-radius: 10px;\n        padding: 1rem;\n    }\n}\n\n.bullet-list {\n    margin: 0;\n    padding-left: 1.25rem;\n}\n\n.nested-list {\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n}\n\n.nested-item {\n    display: flex;\n    align-items: flex-start;\n    gap: 0.625rem;\n\n    span {\n        width: 7px;\n        height: 7px;\n        border-radius: 50%;\n        background: var(--sqx-color-primary);\n        flex: 0 0 auto;\n        margin-top: 0.65rem;\n    }\n}\n\n.table-wrap {\n    width: 100%;\n    overflow-x: auto;\n    border: 1px solid #D1D5DB;\n    border-radius: 10px;\n}\n\n.table-wrap table {\n    width: 100%;\n    border-collapse: collapse;\n    min-width: 640px;\n    background: #FFFFFF;\n\n    th,\n    td {\n        border-bottom: 1px solid #E5E7EB;\n        border-right: 1px solid #E5E7EB;\n        padding: 0.625rem 0.75rem;\n        text-align: left;\n        vertical-align: top;\n    }\n\n    th:last-child,\n    td:last-child {\n        border-right: 0;\n    }\n\n    tr:last-child td {\n        border-bottom: 0;\n    }\n\n    th {\n        background: #F59E0B;\n        color: #111827;\n        font-weight: 800;\n    }\n}\n\n.asset-block {\n    border: 1px solid #E5E7EB;\n    background: #F9FAFB;\n    border-radius: 10px;\n    padding: 1rem;\n    display: flex;\n    align-items: center;\n    gap: 0.875rem;\n\n    i {\n        color: var(--sqx-color-primary);\n        font-size: 20px;\n    }\n\n    span {\n        flex: 1;\n        font-weight: 700;\n    }\n}\n\n@media (max-width: 900px) {\n    .reader-toolbar,\n    .index-actions {\n        align-items: stretch;\n        flex-direction: column;\n    }\n\n    .reader-toolbar .reader-actions {\n        width: 100%;\n\n        .pager-btn {\n            flex: 1;\n        }\n    }\n\n    .index-row {\n        grid-template-columns: 40px minmax(0, 1fr) 24px;\n\n        .index-meta {\n            grid-column: 2 / 3;\n            text-align: left;\n        }\n    }\n\n    .slide-page {\n        min-height: 560px;\n    }\n\n    .slide-page-header {\n        padding: 1rem 1.125rem;\n    }\n\n    .slide-blocks {\n        padding: 1.125rem;\n    }\n}\n\n.course-item {\n    background: white;\n    padding: 1.5rem;\n    border-radius: 16px;\n    display: flex;\n    align-items: center;\n    gap: 1.5rem;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);\n    transition: transform 0.2s, box-shadow 0.2s;\n\n    &:hover {\n        transform: translateY(-2px);\n        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);\n    }\n\n    .course-icon {\n        width: 60px;\n        height: 60px;\n        background: #EFF6FF;\n        color: #3B82F6;\n        border-radius: 12px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n\n        i {\n            font-size: 24px;\n        }\n    }\n\n    .course-info {\n        flex: 1;\n\n        .course-name {\n            font-size: 18px;\n            font-weight: 700;\n            margin: 0 0 6px 0;\n            color: var(--sqx-color-text);\n        }\n\n        .instructor {\n            font-size: 13px;\n            color: #6B7280;\n            margin-bottom: 12px;\n        }\n\n        .progress-wrapper {\n            display: flex;\n            align-items: center;\n            gap: 12px;\n\n            .progress-bar {\n                width: 150px;\n                height: 6px;\n                background: #F3F4F6;\n                border-radius: 10px;\n                overflow: hidden;\n\n                .fill {\n                    height: 100%;\n                    background: var(--sqx-color-primary);\n                    border-radius: 10px;\n                }\n            }\n\n            .progress-text {\n                font-size: 12px;\n                font-weight: 600;\n                color: var(--sqx-color-primary);\n            }\n        }\n    }\n\n    .action-btn {\n        background: white;\n        color: #3B82F6;\n        border: 1px solid #BFDBFE;\n        font-weight: 600;\n        border-radius: 8px;\n\n        &:hover {\n            background: #EFF6FF;\n            color: #2563EB;\n        }\n    }\n}\n\n// Header & Breadcrumb\n.page-header {\n    margin-bottom: 2rem;\n\n    ::ng-deep .p-breadcrumb {\n        background: transparent;\n        padding: 0;\n\n        .p-menuitem-text {\n            color: #6B7280;\n            font-weight: 500;\n        }\n\n        .p-menuitem-link:hover .p-menuitem-text {\n            color: var(--primary-color);\n        }\n\n        li:last-child .p-menuitem-text {\n            color: var(--sqx-color-text);\n            font-weight: 700;\n        }\n    }\n}\n\n// Fade Animation\n.fade-in {\n    animation: fadeIn 0.4s ease-in-out;\n}\n\n@keyframes fadeIn {\n    from {\n        opacity: 0;\n        transform: translateY(10px);\n    }\n\n    to {\n        opacity: 1;\n        transform: translateY(0);\n    }\n}\n\n// Concept Grid Premium\n.concepts-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));\n    gap: 1.5rem;\n}\n\n.concept-card-premium {\n    background: white;\n    border-radius: 20px;\n    padding: 2rem;\n    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);\n    cursor: pointer;\n    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    border: 1px solid transparent;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    height: 100%;\n    min-height: 200px;\n    position: relative;\n    overflow: hidden;\n\n    &:hover {\n        transform: translateY(-5px);\n        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.06);\n        border-color: rgba(99, 102, 241, 0.1); // Subtle primary border\n\n        .premium-title {\n            color: var(--primary-color);\n        }\n\n        .arrow-icon {\n            transform: translateX(5px);\n            color: var(--primary-color);\n        }\n    }\n\n    .card-content {\n        .premium-title {\n            font-size: 18px;\n            font-weight: 700;\n            color: var(--sqx-color-text);\n            margin-bottom: 0.75rem;\n            line-height: 1.4;\n            transition: color 0.3s;\n        }\n\n        .premium-desc {\n            font-size: 14px;\n            color: #6B7280;\n            line-height: 1.6;\n            margin: 0;\n        }\n    }\n\n    .card-footer {\n        margin-top: 2rem;\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n\n        .resource-badge {\n            display: flex;\n            align-items: center;\n            gap: 8px;\n            font-size: 12px;\n            font-weight: 600;\n            color: var(--primary-color);\n            background: #EFF6FF; // Light primary bg\n            padding: 8px 16px;\n            border-radius: 30px;\n        }\n\n        .arrow-icon {\n            font-size: 14px;\n            color: #D1D5DB;\n            transition: all 0.3s;\n        }\n    }\n}\n\n.concepts-list {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n    gap: 1.5rem;\n}\n\n.concept-card {\n    background: white;\n    border-radius: 16px;\n    padding: 1.5rem;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    height: 100%;\n\n    .concept-title {\n        font-size: 16px;\n        font-weight: 700;\n        margin: 0 0 10px 0;\n        color: var(--sqx-color-text);\n    }\n\n    .concept-desc {\n        font-size: 13px;\n        color: #6B7280;\n        line-height: 1.5;\n        margin-bottom: 1rem;\n    }\n\n    .resource-count {\n        display: flex;\n        align-items: center;\n        gap: 6px;\n        font-size: 12px;\n        font-weight: 600;\n        color: #8B5CF6;\n        background: #F5F3FF;\n        padding: 6px 12px;\n        border-radius: 20px;\n        width: fit-content;\n        margin-bottom: 1.5rem;\n    }\n\n    .view-btn {\n        width: 100%;\n        background: var(--primary-color);\n        border: none;\n        border-radius: 8px;\n        margin-top: auto;\n    }\n}\n\n// Modal Styles\n::ng-deep .material-modal {\n    .p-dialog-header {\n        border-bottom: 1px solid #F3F4F6;\n        padding: 1.5rem;\n    }\n\n    .p-dialog-content {\n        padding: 1.5rem;\n    }\n}\n\n.modal-content {\n    .modal-concept-title {\n        font-size: 20px;\n        font-weight: 700;\n        margin: 0 0 10px 0;\n    }\n\n    .modal-concept-desc {\n        color: #6B7280;\n        line-height: 1.6;\n        margin-bottom: 2rem;\n    }\n\n    .resources-grid {\n        display: flex;\n        flex-direction: column;\n        gap: 1rem;\n\n        .resource-item {\n            display: flex;\n            align-items: center;\n            gap: 1rem;\n            padding: 1rem;\n            background: #F9FAFB;\n            border-radius: 12px;\n            border: 1px solid #E5E7EB;\n\n            .res-icon {\n                width: 40px;\n                height: 40px;\n                border-radius: 8px;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n\n                &.video {\n                    background: #fee2e2;\n                    color: #ef4444;\n                }\n\n                &.doc {\n                    background: #e0e7ff;\n                    color: #4338ca;\n                }\n\n                &.link {\n                    background: #dcfce7;\n                    color: #15803d;\n                }\n\n                &.text {\n                    background: #fef3c7;\n                    color: #d97706;\n                }\n            }\n\n            .res-info {\n                flex: 1;\n\n                .res-title {\n                    font-size: 14px;\n                    font-weight: 600;\n                    margin: 0 0 4px 0;\n                }\n\n                .res-type {\n                    font-size: 11px;\n                    color: #6B7280;\n                    text-transform: uppercase;\n                    letter-spacing: 0.5px;\n                }\n            }\n\n            .open-btn {\n                background: white;\n                color: var(--sqx-color-text);\n                border: 1px solid #D1D5DB;\n                font-size: 12px;\n\n                &:hover {\n                    background: #F3F4F6;\n                    border-color: #9CA3AF;\n                }\n            }\n        }\n    }\n}\n"] }]
    }], () => [{ type: i1.HeaderService }, { type: i2.CourseContentService }, { type: i3.AuthService }, { type: i4.Router }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Materials, { className: "Materials", filePath: "src/app/modules/materials/materials/materials.ts", lineNumber: 34 }); })();
