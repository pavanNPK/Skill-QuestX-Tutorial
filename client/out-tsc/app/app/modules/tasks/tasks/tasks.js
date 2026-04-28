import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { DrawerModule } from 'primeng/drawer';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from '../../core/services/auth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "primeng/table";
import * as i3 from "primeng/api";
import * as i4 from "primeng/button";
import * as i5 from "primeng/inputtext";
import * as i6 from "primeng/datepicker";
import * as i7 from "primeng/select";
import * as i8 from "primeng/drawer";
import * as i9 from "primeng/avatar";
import * as i10 from "primeng/avatargroup";
import * as i11 from "primeng/tooltip";
import * as i12 from "primeng/tag";
import * as i13 from "primeng/confirmdialog";
import * as i14 from "primeng/toast";
import * as i15 from "@angular/common";
const _c0 = () => ({ "min-width": "50rem" });
const _c1 = () => ({ "background-color": "#9c27b0", "color": "#ffffff" });
const _forTrack0 = ($index, $item) => $item.weekNumber;
const _forTrack1 = ($index, $item) => $item.id;
const _forTrack2 = ($index, $item) => $item.authorName + $item.time;
const _forTrack3 = ($index, $item) => $item.student.id;
function Tasks_Conditional_1_ng_template_8_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r4.label);
} }
function Tasks_Conditional_1_ng_template_8_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 37);
    i0.ɵɵtext(1, "Month");
    i0.ɵɵelementEnd();
} }
function Tasks_Conditional_1_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, Tasks_Conditional_1_ng_template_8_Conditional_0_Template, 2, 1, "span")(1, Tasks_Conditional_1_ng_template_8_Conditional_1_Template, 2, 0, "span", 37);
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    i0.ɵɵconditional(item_r4 ? 0 : 1);
} }
function Tasks_Conditional_1_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r5.label);
} }
function Tasks_Conditional_1_ng_template_14_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r6.label);
} }
function Tasks_Conditional_1_ng_template_14_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 37);
    i0.ɵɵtext(1, "2nd Week");
    i0.ɵɵelementEnd();
} }
function Tasks_Conditional_1_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, Tasks_Conditional_1_ng_template_14_Conditional_0_Template, 2, 1, "span")(1, Tasks_Conditional_1_ng_template_14_Conditional_1_Template, 2, 0, "span", 37);
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    i0.ɵɵconditional(item_r6 ? 0 : 1);
} }
function Tasks_Conditional_1_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r7.label);
} }
function Tasks_Conditional_1_For_17_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 39);
    i0.ɵɵlistener("click", function Tasks_Conditional_1_For_17_For_2_Template_div_click_0_listener() { const task_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.selectedTask.set(task_r9)); });
    i0.ɵɵelementStart(1, "div", 40);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 41);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_24_0;
    const task_r9 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("selected", ((tmp_24_0 = ctx_r2.selectedTask()) == null ? null : tmp_24_0.id) === task_r9.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r9.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatTaskDate(task_r9.dueDate));
} }
function Tasks_Conditional_1_For_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵrepeaterCreate(1, Tasks_Conditional_1_For_17_For_2_Template, 5, 4, "div", 38, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r10 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵrepeater(group_r10.tasks);
} }
function Tasks_Conditional_1_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵtext(1, "No tasks for this month and week.");
    i0.ɵɵelementEnd();
} }
function Tasks_Conditional_1_Conditional_20_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 47);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const task_r12 = i0.ɵɵnextContext();
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Task Created on ", ctx_r2.formatTaskDate(task_r12.createdAt));
} }
function Tasks_Conditional_1_Conditional_20_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 53)(1, "div", 54)(2, "span", 55);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(4, "div", 56);
    i0.ɵɵelement(5, "button", 57);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.timerDisplay());
} }
function Tasks_Conditional_1_Conditional_20_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 49)(1, "button", 58);
    i0.ɵɵlistener("click", function Tasks_Conditional_1_Conditional_20_Conditional_11_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r13); const task_r12 = i0.ɵɵnextContext(); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.startTimerForTask(task_r12.id)); });
    i0.ɵɵelementEnd()();
} }
function Tasks_Conditional_1_Conditional_20_For_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 52);
    i0.ɵɵelement(1, "p-avatar", 59);
    i0.ɵɵelementStart(2, "div", 60)(3, "span", 61);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 62);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 63);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const fb_r14 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("label", fb_r14.authorName.charAt(0));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(fb_r14.authorName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(fb_r14.time);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(fb_r14.text);
} }
function Tasks_Conditional_1_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 35)(1, "div", 42)(2, "h2", 43);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 44);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 45)(7, "button", 46);
    i0.ɵɵlistener("click", function Tasks_Conditional_1_Conditional_20_Template_button_click_7_listener() { const task_r12 = i0.ɵɵrestoreView(_r11); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.startTimerForTask(task_r12.id)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(8, Tasks_Conditional_1_Conditional_20_Conditional_8_Template, 2, 1, "p", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 48);
    i0.ɵɵconditionalCreate(10, Tasks_Conditional_1_Conditional_20_Conditional_10_Template, 6, 1)(11, Tasks_Conditional_1_Conditional_20_Conditional_11_Template, 2, 0, "div", 49);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 50)(13, "h3", 51);
    i0.ɵɵtext(14, "Feedbacks");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(15, Tasks_Conditional_1_Conditional_20_For_16_Template, 9, 4, "div", 52, _forTrack2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const task_r12 = ctx;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(task_r12.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r12.description);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("label", task_r12.attachmentFilename || "Download Task");
    i0.ɵɵadvance();
    i0.ɵɵconditional(task_r12.createdAt ? 8 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.timerStartedForTaskId() === task_r12.id ? 10 : 11);
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r2.getFeedbacksForTask(task_r12));
} }
function Tasks_Conditional_1_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36)(1, "p");
    i0.ɵɵtext(2, "Select a task from the list to view details.");
    i0.ɵɵelementEnd()();
} }
function Tasks_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 3)(1, "div", 23)(2, "div", 24)(3, "div", 25)(4, "div", 26)(5, "label", 27);
    i0.ɵɵtext(6, "Month");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p-select", 28);
    i0.ɵɵtwoWayListener("ngModelChange", function Tasks_Conditional_1_Template_p_select_ngModelChange_7_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.selectedMonthValue, $event) || (ctx_r2.selectedMonthValue = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("onChange", function Tasks_Conditional_1_Template_p_select_onChange_7_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onMonthChange()); });
    i0.ɵɵtemplate(8, Tasks_Conditional_1_ng_template_8_Template, 2, 1, "ng-template", 29)(9, Tasks_Conditional_1_ng_template_9_Template, 2, 1, "ng-template", 30);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 26)(11, "label", 27);
    i0.ɵɵtext(12, "Week");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p-select", 31);
    i0.ɵɵtwoWayListener("ngModelChange", function Tasks_Conditional_1_Template_p_select_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.selectedWeekValue, $event) || (ctx_r2.selectedWeekValue = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("onChange", function Tasks_Conditional_1_Template_p_select_onChange_13_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.selectFirstTaskForFilter()); });
    i0.ɵɵtemplate(14, Tasks_Conditional_1_ng_template_14_Template, 2, 1, "ng-template", 29)(15, Tasks_Conditional_1_ng_template_15_Template, 2, 1, "ng-template", 30);
    i0.ɵɵelementEnd()()();
    i0.ɵɵrepeaterCreate(16, Tasks_Conditional_1_For_17_Template, 3, 0, "div", 32, _forTrack0);
    i0.ɵɵconditionalCreate(18, Tasks_Conditional_1_Conditional_18_Template, 2, 0, "div", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 34);
    i0.ɵɵconditionalCreate(20, Tasks_Conditional_1_Conditional_20_Template, 17, 5, "div", 35)(21, Tasks_Conditional_1_Conditional_21_Template, 3, 0, "div", 36);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_12_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("options", ctx_r2.monthOptionsList);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.selectedMonthValue);
    i0.ɵɵproperty("showClear", false);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("options", ctx_r2.weekOptionsForSelectedMonth);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.selectedWeekValue);
    i0.ɵɵproperty("showClear", false);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.tasksGroupedByWeek);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.tasksGroupedByWeek.length === 0 ? 18 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_12_0 = ctx_r2.selectedTask()) ? 20 : 21, tmp_12_0);
} }
function Tasks_Conditional_2_Conditional_13_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Task Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Batch");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Due Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Priority");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Assigned");
    i0.ɵɵelementEnd()();
} }
function Tasks_Conditional_2_Conditional_13_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 82)(1, "td")(2, "div", 83)(3, "span", 84);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 85);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵelement(13, "p-tag", 86);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td")(15, "span", 87);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "td")(18, "div", 88);
    i0.ɵɵelement(19, "i", 89);
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const task_r17 = ctx.$implicit;
    i0.ɵɵproperty("pSelectableRow", task_r17);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(task_r17.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r17.description);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r17.batchName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(11, 12, task_r17.dueDate, "MMM d, y"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("value", task_r17.priority)("severity", task_r17.priority === "High" ? "danger" : task_r17.priority === "Medium" ? "warn" : "success");
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(task_r17.status.toLowerCase().replace(" ", "-"));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(task_r17.status);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", task_r17.submittedCount, "/", task_r17.assignedCount, " Submitted");
} }
function Tasks_Conditional_2_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 77)(1, "p-table", 79);
    i0.ɵɵtwoWayListener("selectionChange", function Tasks_Conditional_2_Conditional_13_Template_p_table_selectionChange_1_listener($event) { i0.ɵɵrestoreView(_r16); const ctx_r2 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r2.selectedTask, $event) || (ctx_r2.selectedTask = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("onRowSelect", function Tasks_Conditional_2_Conditional_13_Template_p_table_onRowSelect_1_listener($event) { i0.ɵɵrestoreView(_r16); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openTaskDetails($event.data)); });
    i0.ɵɵtemplate(2, Tasks_Conditional_2_Conditional_13_ng_template_2_Template, 13, 0, "ng-template", 80)(3, Tasks_Conditional_2_Conditional_13_ng_template_3_Template, 22, 15, "ng-template", 81);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r2.filteredTasks)("tableStyle", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵtwoWayProperty("selection", ctx_r2.selectedTask);
} }
function Tasks_Conditional_2_Conditional_14_For_9_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 97);
    i0.ɵɵlistener("click", function Tasks_Conditional_2_Conditional_14_For_9_Template_div_click_0_listener() { const task_r19 = i0.ɵɵrestoreView(_r18).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.openTaskDetails(task_r19)); });
    i0.ɵɵelementStart(1, "div", 98);
    i0.ɵɵelement(2, "p-tag", 99);
    i0.ɵɵelementStart(3, "span", 100);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "h4");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 101);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 102)(11, "div", 103)(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const task_r19 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", task_r19.priority)("severity", task_r19.priority === "High" ? "danger" : task_r19.priority === "Medium" ? "warn" : "success");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 7, task_r19.dueDate, "MMM d"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(task_r19.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r19.batchName);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", task_r19.submittedCount, "/", task_r19.assignedCount, " Submitted");
} }
function Tasks_Conditional_2_Conditional_14_For_18_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 97);
    i0.ɵɵlistener("click", function Tasks_Conditional_2_Conditional_14_For_18_Template_div_click_0_listener() { const task_r21 = i0.ɵɵrestoreView(_r20).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.openTaskDetails(task_r21)); });
    i0.ɵɵelementStart(1, "div", 98);
    i0.ɵɵelement(2, "p-tag", 99);
    i0.ɵɵelementStart(3, "span", 100);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "h4");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 101);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 102)(11, "div", 103)(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const task_r21 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", task_r21.priority)("severity", task_r21.priority === "High" ? "danger" : task_r21.priority === "Medium" ? "warn" : "success");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 7, task_r21.dueDate, "MMM d"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(task_r21.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r21.batchName);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", task_r21.submittedCount, "/", task_r21.assignedCount, " Submitted");
} }
function Tasks_Conditional_2_Conditional_14_For_27_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 97);
    i0.ɵɵlistener("click", function Tasks_Conditional_2_Conditional_14_For_27_Template_div_click_0_listener() { const task_r23 = i0.ɵɵrestoreView(_r22).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.openTaskDetails(task_r23)); });
    i0.ɵɵelementStart(1, "div", 98);
    i0.ɵɵelement(2, "p-tag", 99);
    i0.ɵɵelementStart(3, "span", 100);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "h4");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 101);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 102)(11, "div", 103)(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const task_r23 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", task_r23.priority)("severity", task_r23.priority === "High" ? "danger" : task_r23.priority === "Medium" ? "warn" : "success");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 7, task_r23.dueDate, "MMM d"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(task_r23.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r23.batchName);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", task_r23.submittedCount, "/", task_r23.assignedCount, " Submitted");
} }
function Tasks_Conditional_2_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 78)(1, "div", 90)(2, "div", 91)(3, "h3");
    i0.ɵɵtext(4, "Pending");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 92);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 93);
    i0.ɵɵrepeaterCreate(8, Tasks_Conditional_2_Conditional_14_For_9_Template, 14, 10, "div", 94, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 90)(11, "div", 95)(12, "h3");
    i0.ɵɵtext(13, "In Progress");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 92);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 93);
    i0.ɵɵrepeaterCreate(17, Tasks_Conditional_2_Conditional_14_For_18_Template, 14, 10, "div", 94, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 90)(20, "div", 96)(21, "h3");
    i0.ɵɵtext(22, "Completed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "span", 92);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div", 93);
    i0.ɵɵrepeaterCreate(26, Tasks_Conditional_2_Conditional_14_For_27_Template, 14, 10, "div", 94, _forTrack1);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r2.getTasksByStatus("Pending").length);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r2.getTasksByStatus("Pending"));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r2.getTasksByStatus("In Progress").length);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r2.getTasksByStatus("In Progress"));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r2.getTasksByStatus("Completed").length);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r2.getTasksByStatus("Completed"));
} }
function Tasks_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 64)(1, "div", 65)(2, "button", 66);
    i0.ɵɵlistener("click", function Tasks_Conditional_2_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggleView("list")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 67);
    i0.ɵɵlistener("click", function Tasks_Conditional_2_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggleView("board")); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 68)(5, "button", 69);
    i0.ɵɵlistener("click", function Tasks_Conditional_2_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openCreateDrawer()); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(6, "div", 70)(7, "span", 71);
    i0.ɵɵelement(8, "i", 72);
    i0.ɵɵelementStart(9, "input", 73);
    i0.ɵɵtwoWayListener("ngModelChange", function Tasks_Conditional_2_Template_input_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.searchText, $event) || (ctx_r2.searchText = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "p-select", 74);
    i0.ɵɵtwoWayListener("ngModelChange", function Tasks_Conditional_2_Template_p_select_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.filterStatus, $event) || (ctx_r2.filterStatus = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p-datepicker", 75);
    i0.ɵɵtwoWayListener("ngModelChange", function Tasks_Conditional_2_Template_p_datepicker_ngModelChange_11_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.filterDateRange, $event) || (ctx_r2.filterDateRange = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "p-select", 76);
    i0.ɵɵtwoWayListener("ngModelChange", function Tasks_Conditional_2_Template_p_select_ngModelChange_12_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.filterBatch, $event) || (ctx_r2.filterBatch = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(13, Tasks_Conditional_2_Conditional_13_Template, 4, 4, "div", 77);
    i0.ɵɵconditionalCreate(14, Tasks_Conditional_2_Conditional_14_Template, 28, 3, "div", 78);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("active", ctx_r2.currentView() === "list");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r2.currentView() === "board");
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.searchText);
    i0.ɵɵadvance();
    i0.ɵɵproperty("options", ctx_r2.filterStatusOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.filterStatus);
    i0.ɵɵproperty("showClear", true);
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.filterDateRange);
    i0.ɵɵproperty("readonlyInput", true);
    i0.ɵɵadvance();
    i0.ɵɵproperty("options", ctx_r2.batches);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.filterBatch);
    i0.ɵɵproperty("showClear", true);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.currentView() === "list" ? 13 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.currentView() === "board" ? 14 : -1);
} }
function Tasks_ng_template_4_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 106);
    i0.ɵɵelement(1, "p-tag", 107);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r2.newTask.priority)("severity", ctx_r2.newTask.priority === "High" ? "danger" : ctx_r2.newTask.priority === "Medium" ? "warn" : "success");
} }
function Tasks_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 104)(1, "div", 105)(2, "h2");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, Tasks_ng_template_4_Conditional_4_Template, 2, 2, "div", 106);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.isEditing() ? "Edit Task" : "Create New Task");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.isEditing() && ctx_r2.newTask.priority ? 4 : -1);
} }
function Tasks_Conditional_35_For_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-avatar", 109);
} if (rf & 2) {
    const student_r24 = ctx.$implicit;
    i0.ɵɵproperty("image", student_r24.avatar);
} }
function Tasks_Conditional_35_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-avatar", 111);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleMap(i0.ɵɵpureFunction0(3, _c1));
    i0.ɵɵproperty("label", "+" + (ctx_r2.newTask.batch.students.length - 5));
} }
function Tasks_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17)(1, "label", 9);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 108)(4, "p-avatarGroup");
    i0.ɵɵrepeaterCreate(5, Tasks_Conditional_35_For_6_Template, 1, 1, "p-avatar", 109, _forTrack1);
    i0.ɵɵconditionalCreate(7, Tasks_Conditional_35_Conditional_7_Template, 1, 4, "p-avatar", 110);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Assigned Students (", ctx_r2.newTask.batch.students.length, ")");
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.newTask.batch.students.slice(0, 5));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.newTask.batch.students.length > 5 ? 7 : -1);
} }
function Tasks_ng_template_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 104)(1, "div", 105)(2, "h2");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 106);
    i0.ɵɵelement(5, "p-tag", 107);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate((tmp_4_0 = ctx_r2.selectedTask()) == null ? null : tmp_4_0.title);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", (tmp_5_0 = ctx_r2.selectedTask()) == null ? null : tmp_5_0.priority)("severity", ((tmp_6_0 = ctx_r2.selectedTask()) == null ? null : tmp_6_0.priority) === "High" ? "danger" : ((tmp_6_0 = ctx_r2.selectedTask()) == null ? null : tmp_6_0.priority) === "Medium" ? "warn" : "success");
} }
function Tasks_Conditional_42_For_40_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 130);
    i0.ɵɵelement(1, "i", 133);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Submitted");
    i0.ɵɵelementEnd()();
} }
function Tasks_Conditional_42_For_40_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 131);
    i0.ɵɵelement(1, "i", 134);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Pending");
    i0.ɵɵelementEnd()();
} }
function Tasks_Conditional_42_For_40_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "button", 132);
} if (rf & 2) {
    i0.ɵɵproperty("text", true)("rounded", true);
} }
function Tasks_Conditional_42_For_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 123)(1, "div", 124);
    i0.ɵɵelement(2, "p-avatar", 125);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 126)(4, "div", 127)(5, "span", 128);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 129);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(10, Tasks_Conditional_42_For_40_Conditional_10_Template, 4, 0, "div", 130)(11, Tasks_Conditional_42_For_40_Conditional_11_Template, 4, 0, "div", 131);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(12, Tasks_Conditional_42_For_40_Conditional_12_Template, 1, 2, "button", 132);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const sub_r25 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("image", sub_r25.student.avatar);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(sub_r25.student.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(sub_r25.submittedAt ? i0.ɵɵpipeBind2(9, 5, sub_r25.submittedAt, "MMM d") : "");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(sub_r25.status === "Submitted" ? 10 : 11);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(sub_r25.status === "Submitted" ? 12 : -1);
} }
function Tasks_Conditional_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22)(1, "div", 112)(2, "h3");
    i0.ɵɵtext(3, "Properties");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 113)(5, "div", 114)(6, "label");
    i0.ɵɵtext(7, "Due Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 115);
    i0.ɵɵelement(9, "i", 116);
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "date");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "div", 114)(14, "label");
    i0.ɵɵtext(15, "Duration");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 115);
    i0.ɵɵelement(17, "i", 117);
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(20, "div", 114)(21, "label");
    i0.ɵɵtext(22, "Batch");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 115);
    i0.ɵɵelement(24, "i", 89);
    i0.ɵɵelementStart(25, "span");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(27, "div", 114)(28, "label");
    i0.ɵɵtext(29, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "p", 118);
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(32, "div", 119)(33, "div", 120)(34, "h3");
    i0.ɵɵtext(35, "Student Activity");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "span", 121);
    i0.ɵɵtext(37);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(38, "div", 122);
    i0.ɵɵrepeaterCreate(39, Tasks_Conditional_42_For_40_Template, 13, 8, "div", 123, _forTrack3);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const task_r26 = ctx;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(12, 5, task_r26.dueDate, "medium"));
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(task_r26.duration);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(task_r26.batchName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", task_r26.description, " ");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r2.getTaskSubmissions(task_r26).length);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r2.getTaskSubmissions(task_r26));
} }
function Tasks_ng_template_43_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 135)(1, "button", 136);
    i0.ɵɵlistener("click", function Tasks_ng_template_43_Template_button_click_1_listener($event) { i0.ɵɵrestoreView(_r27); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.confirmDelete($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 137);
    i0.ɵɵlistener("click", function Tasks_ng_template_43_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r27); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.editTask()); });
    i0.ɵɵelementEnd()();
} }
export class Tasks {
    confirmationService = inject(ConfirmationService);
    messageService = inject(MessageService);
    auth = inject(AuthService);
    /** Student sees week-wise list + month/week filters; instructor sees board/list + create. */
    get isStudentView() {
        return this.auth.currentUser()?.role === 'student';
    }
    ngOnInit() {
        this.buildMonthOptions();
        if (this.isStudentView && this.monthOptionsListCache.length > 0 && !this.selectedMonthValue) {
            const now = new Date();
            const currentMonthOption = this.monthOptionsListCache.find((m) => m.value.getMonth() === now.getMonth() && m.value.getFullYear() === now.getFullYear());
            this.selectedMonthValue = currentMonthOption ?? this.monthOptionsListCache[0];
            const currentWeekNum = this.getWeekOfMonth(now);
            this.selectedWeekValue =
                this.weekOptionsForSelectedMonth.find((w) => w.value === currentWeekNum) ?? this.weekOptionsForSelectedMonth[0];
            this.selectFirstTaskForFilter();
        }
    }
    /** All 12 months for current year and previous year (most recent first). Future: add year dropdown for real-time year + month selection. */
    buildMonthOptions() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const list = [];
        for (const year of [currentYear, currentYear - 1]) {
            for (let month = 11; month >= 0; month--) {
                const d = new Date(year, month, 1);
                list.push({
                    label: d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                    value: new Date(d),
                });
            }
        }
        this.monthOptionsListCache = list;
    }
    // State
    currentView = signal('board', ...(ngDevMode ? [{ debugName: "currentView" }] : []));
    isCreateDrawerOpen = signal(false, ...(ngDevMode ? [{ debugName: "isCreateDrawerOpen" }] : []));
    isEditing = signal(false, ...(ngDevMode ? [{ debugName: "isEditing" }] : []));
    currentTaskId = signal(null, ...(ngDevMode ? [{ debugName: "currentTaskId" }] : []));
    // Student view: month & week filters
    selectedMonthValue = null;
    selectedWeekValue = null;
    monthOptions = [];
    weekOptions = [
        { label: 'All Weeks', value: 'all' },
        { label: '1st Week', value: 1 },
        { label: '2nd Week', value: 2 },
        { label: '3rd Week', value: 3 },
        { label: '4th Week', value: 4 },
        { label: '5th Week', value: 5 },
    ];
    /** Cached so select selection stays stable (built from tasks in ngOnInit). */
    monthOptionsListCache = [];
    /** Student view: timer shows only after Download Task or Start Task. Task id when timer is active. */
    timerStartedForTaskId = signal(null, ...(ngDevMode ? [{ debugName: "timerStartedForTaskId" }] : []));
    /** Display value for timer (e.g. 01:00:58). */
    timerDisplay = signal('01:00:58', ...(ngDevMode ? [{ debugName: "timerDisplay" }] : []));
    // Data
    batches = [
        {
            id: 101,
            name: 'Python Masterclass - Batch A',
            students: [
                { id: 1, name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?u=1' },
                { id: 2, name: 'Bob Smith', avatar: 'https://i.pravatar.cc/150?u=2' },
                { id: 3, name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?u=3' },
                { id: 4, name: 'Diana Prince', avatar: 'https://i.pravatar.cc/150?u=4' },
                { id: 5, name: 'Evan Wright', avatar: 'https://i.pravatar.cc/150?u=5' }
            ]
        },
        {
            id: 102,
            name: 'Web Development - Batch B',
            students: [
                { id: 6, name: 'Fiona Gallagher', avatar: 'https://i.pravatar.cc/150?u=6' },
                { id: 7, name: 'George Martin', avatar: 'https://i.pravatar.cc/150?u=7' },
                { id: 8, name: 'Hannah Abbott', avatar: 'https://i.pravatar.cc/150?u=8' }
            ]
        }
    ];
    tasks = [
        {
            id: 1,
            title: 'Introduction to Python, Course. introduction and Learnings.',
            description: 'Download the Daily Task as PDF. Right after downloading, the timer starts with allotted time by mentor. Finish the task in allotted time, Submit it as PDF.',
            batchId: 101,
            batchName: 'Python Masterclass - Batch A',
            status: 'In Progress',
            priority: 'High',
            dueDate: new Date('2026-02-01T23:59:00'),
            duration: '2 hours',
            assignedCount: 5,
            submittedCount: 2,
            attachmentFilename: 'Assignment01.pdf',
            createdAt: new Date('2026-02-03'),
        },
        {
            id: 2,
            title: 'Control Flow: If/Else',
            description: 'Implement a calculator using if/else statements.',
            batchId: 101,
            batchName: 'Python Masterclass - Batch A',
            status: 'In Progress',
            priority: 'Medium',
            dueDate: new Date('2026-02-02T23:59:00'),
            duration: '1 day',
            assignedCount: 5,
            submittedCount: 1,
            attachmentFilename: 'Assignment02.pdf',
            createdAt: new Date('2026-02-01'),
        },
        {
            id: 3,
            title: 'HTML5 Structure',
            description: 'Create a semantic HTML page layout.',
            batchId: 102,
            batchName: 'Web Development - Batch B',
            status: 'Completed',
            priority: 'Low',
            dueDate: new Date('2026-02-03T23:59:00'),
            duration: '3 hours',
            assignedCount: 3,
            submittedCount: 3,
            attachmentFilename: 'Assignment03.pdf',
            createdAt: new Date('2026-02-02'),
        },
        {
            id: 4,
            title: 'Python Basics: Variables & Types',
            description: 'Complete the exercises on variable declaration and data types.',
            batchId: 101,
            batchName: 'Python Masterclass - Batch A',
            status: 'Pending',
            priority: 'High',
            dueDate: new Date('2026-02-08T23:59:00'),
            duration: '2 hours',
            assignedCount: 5,
            submittedCount: 0,
            attachmentFilename: 'Assignment04.pdf',
            createdAt: new Date('2026-02-05'),
        },
        {
            id: 5,
            title: 'Functions and Modules',
            description: 'Write reusable functions and organize code into modules.',
            batchId: 101,
            batchName: 'Python Masterclass - Batch A',
            status: 'Pending',
            priority: 'Medium',
            dueDate: new Date('2026-02-15T23:59:00'),
            duration: '1 day',
            assignedCount: 5,
            submittedCount: 0,
            attachmentFilename: 'Assignment05.pdf',
            createdAt: new Date('2026-02-10'),
        },
    ];
    // Filters
    filterBatch = null;
    filterStatus = null;
    filterDateRange = null;
    searchText = '';
    filterStatusOptions = ['Pending', 'In Progress', 'Completed'];
    get monthOptionsList() {
        return this.monthOptionsListCache;
    }
    get effectiveMonth() {
        if (this.selectedMonthValue)
            return this.selectedMonthValue;
        return this.monthOptionsListCache.length ? this.monthOptionsListCache[0] : null;
    }
    /** Effective week for filter; validates against selected month (real-time weeks). */
    get effectiveWeek() {
        const options = this.weekOptionsForSelectedMonth;
        if (!this.selectedWeekValue)
            return options[0];
        const found = options.find((o) => o.value === this.selectedWeekValue.value);
        return found ?? options[0];
    }
    /** Week number in month (1–5). Day 1–7 = week 1, 8–14 = week 2, etc. */
    getWeekOfMonth(d) {
        const date = new Date(d);
        const dayOfMonth = date.getDate();
        return Math.ceil(dayOfMonth / 7) || 1;
    }
    /** Number of weeks in the given month (real-time: 4 or 5 based on last day). */
    getWeeksInMonth(year, monthIndex) {
        const lastDay = new Date(year, monthIndex + 1, 0).getDate();
        return this.getWeekOfMonth(new Date(year, monthIndex, lastDay));
    }
    /** Week options for the selected month (real-time: only weeks that exist in that month). */
    get weekOptionsForSelectedMonth() {
        const month = this.effectiveMonth;
        const base = [{ label: 'All Weeks', value: 'all' }];
        if (!month)
            return [...base, ...this.weekOptions.slice(1)];
        const year = month.value.getFullYear();
        const monthIndex = month.value.getMonth();
        const numWeeks = this.getWeeksInMonth(year, monthIndex);
        const labels = { 1: '1st Week', 2: '2nd Week', 3: '3rd Week', 4: '4th Week', 5: '5th Week' };
        for (let w = 1; w <= numWeeks; w++) {
            base.push({ label: labels[w] ?? `${w}th Week`, value: w });
        }
        return base;
    }
    /** Tasks filtered by selected month/week for student list. */
    get tasksForStudent() {
        const month = this.effectiveMonth;
        const week = this.effectiveWeek;
        if (!month)
            return [];
        return this.tasks
            .filter((t) => {
            const due = new Date(t.dueDate);
            if (due.getMonth() !== month.value.getMonth() || due.getFullYear() !== month.value.getFullYear()) {
                return false;
            }
            if (week.value === 'all')
                return true;
            return this.getWeekOfMonth(due) === week.value;
        })
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    }
    /** Grouped by week for left list (student view). */
    get tasksGroupedByWeek() {
        const weekMap = new Map();
        this.tasksForStudent.forEach((t) => {
            const w = this.getWeekOfMonth(new Date(t.dueDate));
            if (!weekMap.has(w))
                weekMap.set(w, []);
            weekMap.get(w).push(t);
        });
        const labels = { 1: '1st Week', 2: '2nd Week', 3: '3rd Week', 4: '4th Week', 5: '5th Week' };
        return Array.from(weekMap.entries())
            .sort(([a], [b]) => a - b)
            .map(([weekNumber, tasks]) => ({ weekLabel: labels[weekNumber] ?? `${weekNumber}th Week`, weekNumber, tasks }));
    }
    /** Mock feedbacks for selected task (student view). */
    getFeedbacksForTask(task) {
        if (!task)
            return [];
        return [
            { authorName: 'Charil Polamraju', time: '9:45 PM', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Good progress on the first section.' },
        ];
    }
    formatTaskDate(d) {
        return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '/');
    }
    /** When month changes, normalize week to a valid option for that month, then select first task. */
    onMonthChange() {
        const options = this.weekOptionsForSelectedMonth;
        const valid = options.some((o) => o.value === this.selectedWeekValue?.value);
        if (!valid)
            this.selectedWeekValue = options[0];
        this.selectFirstTaskForFilter();
    }
    /** Student view: select first task for current filter (month/week). Call on filter change and init. */
    selectFirstTaskForFilter() {
        const list = this.tasksForStudent;
        this.selectedTask.set(list.length > 0 ? list[0] : null);
    }
    /** Student view: show timer after Download Task or Start Task. */
    startTimerForTask(taskId) {
        this.timerStartedForTaskId.set(taskId);
        this.timerDisplay.set('01:00:58');
    }
    // Form Data
    newTask = {
        title: '',
        description: '',
        batch: null,
        dueDate: null,
        duration: '',
        priority: 'Medium'
    };
    priorityOptions = ['Low', 'Medium', 'High'];
    // Computed / Helper Methods
    get selectedBatchStudents() {
        return this.newTask.batch ? this.newTask.batch.students : [];
    }
    get filteredTasks() {
        return this.tasks.filter(task => {
            const matchesSearch = !this.searchText || task.title.toLowerCase().includes(this.searchText.toLowerCase());
            const matchesBatch = !this.filterBatch || task.batchId === this.filterBatch.id;
            const matchesStatus = !this.filterStatus || task.status === this.filterStatus;
            let matchesDate = true;
            if (this.filterDateRange && this.filterDateRange.length) {
                const start = this.filterDateRange[0];
                const end = this.filterDateRange[1];
                if (start && !end) {
                    // Exact match or matches start if only one selected? Usually ranges imply >= start.
                    // Im implementing >= start.
                    matchesDate = task.dueDate >= start;
                }
                else if (start && end) {
                    matchesDate = task.dueDate >= start && task.dueDate <= end;
                }
            }
            return matchesSearch && matchesBatch && matchesStatus && matchesDate;
        });
    }
    // Detailed State
    selectedTask = signal(null, ...(ngDevMode ? [{ debugName: "selectedTask" }] : []));
    isDetailsDrawerOpen = signal(false, ...(ngDevMode ? [{ debugName: "isDetailsDrawerOpen" }] : []));
    // Mock Submissions Data Helper
    getTaskSubmissions(task) {
        if (!task)
            return [];
        // Find the batch for this task
        const batch = this.batches.find(b => b.id === task.batchId);
        if (!batch)
            return [];
        // Deterministic pseudo-random submissions based on task ID
        return batch.students.map((student, index) => {
            // Simulate some students having submitted
            // Mix logic so it's consistent for the same task/student
            const isSubmitted = (task.id + student.id) % 2 === 0;
            return {
                student: student,
                status: isSubmitted ? 'Submitted' : 'Pending',
                submittedAt: isSubmitted ? new Date(task.dueDate.getTime() - (Math.random() * 100000000)) : null
            };
        });
    }
    openTaskDetails(task) {
        if (!task)
            return;
        this.selectedTask.set(task);
        this.isDetailsDrawerOpen.set(true);
    }
    closeTaskDetails() {
        this.isDetailsDrawerOpen.set(false);
        this.selectedTask.set(null);
    }
    editTask() {
        const task = this.selectedTask();
        if (!task)
            return;
        // Close details drawer
        this.closeTaskDetails();
        // Set editing state FIRST
        this.isEditing.set(true);
        this.currentTaskId.set(task.id);
        // Populate form
        const batch = this.batches.find(b => b.id === task.batchId) || null;
        this.newTask = {
            title: task.title,
            description: task.description,
            batch: batch,
            dueDate: task.dueDate,
            duration: task.duration,
            priority: task.priority
        };
        // Open drawer (won't reset because isEditing is true)
        this.openCreateDrawer();
    }
    confirmDelete(event) {
        if (!this.selectedTask())
            return;
        this.confirmationService.confirm({
            target: event.target,
            message: 'Do you want to delete this task?',
            header: 'Danger Zone',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger'
            },
            accept: () => {
                // Mock Delete Logic
                this.tasks = this.tasks.filter(t => t.id !== this.selectedTask().id);
                this.isDetailsDrawerOpen.set(false);
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Task deleted successfully' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
    }
    toggleView(view) {
        this.currentView.set(view);
    }
    openCreateDrawer() {
        // Only reset if we're starting fresh (not editing)
        if (!this.isEditing()) {
            this.resetForm();
        }
        this.isCreateDrawerOpen.set(true);
    }
    closeCreateDrawer() {
        this.isCreateDrawerOpen.set(false);
        // Reset editing state FIRST, then reset form
        this.isEditing.set(false);
        this.currentTaskId.set(null);
        this.resetForm();
    }
    resetForm() {
        this.newTask = {
            title: '',
            description: '',
            batch: null,
            dueDate: null,
            duration: '',
            priority: 'Medium'
        };
    }
    saveTask() {
        if (this.newTask.title && this.newTask.batch && this.newTask.dueDate) {
            if (this.isEditing() && this.currentTaskId()) {
                // Update existing task
                this.tasks = this.tasks.map(t => {
                    if (t.id === this.currentTaskId()) {
                        return {
                            ...t,
                            title: this.newTask.title,
                            description: this.newTask.description,
                            batchId: this.newTask.batch.id,
                            batchName: this.newTask.batch.name,
                            priority: this.newTask.priority,
                            dueDate: this.newTask.dueDate,
                            duration: this.newTask.duration
                        };
                    }
                    return t;
                });
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task updated' });
            }
            else {
                // Create new task
                const task = {
                    id: this.tasks.length + 1,
                    title: this.newTask.title,
                    description: this.newTask.description,
                    batchId: this.newTask.batch.id,
                    batchName: this.newTask.batch.name,
                    status: 'Pending',
                    priority: this.newTask.priority,
                    dueDate: this.newTask.dueDate,
                    duration: this.newTask.duration,
                    assignedCount: this.newTask.batch.students.length,
                    submittedCount: 0
                };
                this.tasks = [...this.tasks, task];
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task created' });
            }
            this.closeCreateDrawer();
        }
    }
    getTasksByStatus(status) {
        return this.filteredTasks.filter(t => t.status === status);
    }
    static ɵfac = function Tasks_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Tasks)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Tasks, selectors: [["sqx-tasks"]], features: [i0.ɵɵProvidersFeature([ConfirmationService, MessageService])], decls: 47, vars: 27, consts: [["header", ""], ["footer", ""], [1, "page-container"], [1, "student-tasks-layout"], ["position", "right", 3, "visibleChange", "visible", "styleClass", "modal", "closable", "dismissible"], [1, "create-task-wrapper"], [1, "create-task-content", "custom-scrollbar"], [1, "create-task-form"], [1, "form-field"], [1, "form-label"], ["type", "text", "pInputText", "", "placeholder", "Enter task title", 1, "form-input", 3, "ngModelChange", "ngModel"], ["pInputTextarea", "", "rows", "4", "placeholder", "Enter task description", 1, "form-textarea", 3, "ngModelChange", "ngModel"], [1, "form-row", "form-row-2"], ["optionLabel", "name", "placeholder", "Select Batch", 1, "create-task-select", "w-full", 3, "ngModelChange", "options", "ngModel", "checkmark", "showClear"], ["placeholder", "Select due date", "appendTo", "body", "styleClass", "form-datepicker", 3, "ngModelChange", "ngModel", "showTime"], ["type", "text", "pInputText", "", "placeholder", "e.g. 2 hours", 1, "form-input", 3, "ngModelChange", "ngModel"], ["placeholder", "Select Priority", 1, "create-task-select", "w-full", 3, "ngModelChange", "options", "ngModel", "checkmark", "showClear"], [1, "form-field", "form-field-avatars"], [1, "create-task-drawer-footer"], ["pButton", "", "label", "Cancel", 1, "p-button-outlined", "p-button-secondary", 3, "click"], ["pButton", "", "icon", "pi pi-check", 1, "create-task-btn", 3, "click", "label", "disabled"], ["position", "right", "styleClass", "task-details-drawer", 3, "visibleChange", "visible", "modal", "closable"], [1, "task-details-content", "h-full", "overflow-y-auto", "custom-scrollbar"], [1, "student-tasks-body"], [1, "student-task-list-panel"], [1, "student-filters-in-card"], [1, "filter-group"], [1, "filter-label"], ["optionLabel", "label", "placeholder", "Month", 1, "student-filter-select", 3, "ngModelChange", "onChange", "options", "ngModel", "showClear"], ["pTemplate", "selectedItem"], ["pTemplate", "item"], ["optionLabel", "label", "placeholder", "Week", 1, "student-filter-select", 3, "ngModelChange", "onChange", "options", "ngModel", "showClear"], [1, "week-group"], [1, "student-task-list-empty"], [1, "student-task-detail-panel"], [1, "student-detail-cards"], [1, "student-detail-empty"], [1, "placeholder"], [1, "student-task-card", 3, "selected"], [1, "student-task-card", 3, "click"], [1, "student-task-card-title"], [1, "student-task-card-date"], [1, "student-detail-card", "student-detail-card-task"], [1, "student-detail-title"], [1, "student-detail-description"], [1, "student-detail-download-wrap"], ["pButton", "", "icon", "pi pi-download", 1, "p-button-outlined", 3, "click", "label"], [1, "student-detail-created"], [1, "student-detail-card", "student-detail-card-clock"], [1, "student-start-task-wrap"], [1, "student-detail-card", "student-detail-card-feedbacks"], [1, "student-feedbacks-title"], [1, "student-feedback-item"], [1, "student-timer-section"], [1, "student-timer-circle"], [1, "student-timer-value"], [1, "student-upload-section"], ["pButton", "", "label", "Upload Task", "icon", "pi pi-upload", 1, "student-upload-btn"], ["pButton", "", "label", "Start Task", "icon", "pi pi-play", 1, "student-start-task-btn", 3, "click"], ["shape", "circle", "size", "normal", "styleClass", "student-feedback-avatar", 3, "label"], [1, "student-feedback-body"], [1, "student-feedback-author"], [1, "student-feedback-time"], [1, "student-feedback-text"], [1, "tasks-header-actions"], [1, "view-toggles"], ["pButton", "", "icon", "pi pi-list", "pTooltip", "List View", "tooltipPosition", "bottom", 1, "p-button-text", 3, "click"], ["pButton", "", "icon", "pi pi-th-large", "pTooltip", "Board View", "tooltipPosition", "bottom", 1, "p-button-text", 3, "click"], [1, "action-buttons"], ["pButton", "", "label", "Create Task", "icon", "pi pi-plus", 1, "create-btn", 3, "click"], [1, "filters-section"], [1, "p-input-icon-left", "search-box"], [1, "pi", "pi-search"], ["type", "text", "pInputText", "", "placeholder", "Search tasks...", 3, "ngModelChange", "ngModel"], ["placeholder", "Status", 1, "status-filter", 3, "ngModelChange", "options", "ngModel", "showClear"], ["selectionMode", "range", "placeholder", "Date Range", 1, "date-filter", 3, "ngModelChange", "ngModel", "readonlyInput"], ["optionLabel", "name", "placeholder", "Filter by Batch", 1, "batch-filter", 3, "ngModelChange", "options", "ngModel", "showClear"], [1, "tasks-table-container"], [1, "tasks-board"], ["selectionMode", "single", 3, "selectionChange", "onRowSelect", "value", "tableStyle", "selection"], ["pTemplate", "header"], ["pTemplate", "body"], [1, "cursor-pointer", 3, "pSelectableRow"], [1, "task-cell-content"], [1, "task-title"], [1, "task-desc-truncate"], [3, "value", "severity"], [1, "status-badge"], [1, "assigned-stats"], [1, "pi", "pi-users"], [1, "board-column"], [1, "column-header", "pending"], [1, "count"], [1, "column-content"], [1, "kanban-card"], [1, "column-header", "in-progress"], [1, "column-header", "completed"], [1, "kanban-card", 3, "click"], [1, "card-header"], ["styleClass", "mini-tag", 3, "value", "severity"], [1, "due-date"], [1, "batch-name"], [1, "card-footer"], [1, "progress-info"], [1, "premium-drawer-header", "w-full"], [1, "title-section"], [1, "meta-badges"], [1, "uppercase", "text-[10px]", "font-bold", "tracking-wider", "px-2", "py-0.5", 3, "value", "severity"], [1, "avatar-group-wrap"], ["shape", "circle", "size", "normal", "styleClass", "border-2 border-white", 3, "image"], ["shape", "circle", "size", "normal", 3, "label", "style"], ["shape", "circle", "size", "normal", 3, "label"], [1, "properties-panel"], [1, "property-grid"], [1, "property-item"], [1, "value"], [1, "pi", "pi-calendar"], [1, "pi", "pi-clock"], [1, "description-text"], [1, "activity-feed"], [1, "feed-header"], [1, "count-badge"], [1, "feed-list"], [1, "feed-item"], [1, "avatar-wrapper"], ["shape", "circle", "size", "normal", 3, "image"], [1, "feed-content"], [1, "top-row"], [1, "student-name"], [1, "timestamp"], [1, "status-badge", "submitted"], [1, "status-badge", "pending"], ["pButton", "", "icon", "pi pi-external-link", "size", "small", 1, "action-btn", 3, "text", "rounded"], [1, "pi", "pi-check-circle", 2, "font-size", "0.7rem"], [1, "pi", "pi-clock", 2, "font-size", "0.7rem"], [1, "drawer-footer"], ["pButton", "", "label", "Delete Task", "icon", "pi pi-trash", 1, "p-button-outlined", "p-button-danger", 3, "click"], ["pButton", "", "label", "Edit Task", "icon", "pi pi-pencil", 1, "p-button-primary", 3, "click"]], template: function Tasks_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2);
            i0.ɵɵconditionalCreate(1, Tasks_Conditional_1_Template, 22, 8, "div", 3);
            i0.ɵɵconditionalCreate(2, Tasks_Conditional_2_Template, 15, 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "p-drawer", 4);
            i0.ɵɵtwoWayListener("visibleChange", function Tasks_Template_p_drawer_visibleChange_3_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.isCreateDrawerOpen, $event) || (ctx.isCreateDrawerOpen = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵtemplate(4, Tasks_ng_template_4_Template, 5, 2, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(6, "div", 5)(7, "div", 6)(8, "div", 7)(9, "div", 8)(10, "label", 9);
            i0.ɵɵtext(11, "Task Title");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "input", 10);
            i0.ɵɵtwoWayListener("ngModelChange", function Tasks_Template_input_ngModelChange_12_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.newTask.title, $event) || (ctx.newTask.title = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "div", 8)(14, "label", 9);
            i0.ɵɵtext(15, "Description");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "textarea", 11);
            i0.ɵɵtwoWayListener("ngModelChange", function Tasks_Template_textarea_ngModelChange_16_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.newTask.description, $event) || (ctx.newTask.description = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "div", 12)(18, "div", 8)(19, "label", 9);
            i0.ɵɵtext(20, "Batch");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "p-select", 13);
            i0.ɵɵtwoWayListener("ngModelChange", function Tasks_Template_p_select_ngModelChange_21_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.newTask.batch, $event) || (ctx.newTask.batch = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "div", 8)(23, "label", 9);
            i0.ɵɵtext(24, "Due Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "p-datepicker", 14);
            i0.ɵɵtwoWayListener("ngModelChange", function Tasks_Template_p_datepicker_ngModelChange_25_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.newTask.dueDate, $event) || (ctx.newTask.dueDate = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(26, "div", 12)(27, "div", 8)(28, "label", 9);
            i0.ɵɵtext(29, "Duration");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "input", 15);
            i0.ɵɵtwoWayListener("ngModelChange", function Tasks_Template_input_ngModelChange_30_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.newTask.duration, $event) || (ctx.newTask.duration = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(31, "div", 8)(32, "label", 9);
            i0.ɵɵtext(33, "Priority");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "p-select", 16);
            i0.ɵɵtwoWayListener("ngModelChange", function Tasks_Template_p_select_ngModelChange_34_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.newTask.priority, $event) || (ctx.newTask.priority = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(35, Tasks_Conditional_35_Template, 8, 2, "div", 17);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(36, "div", 18)(37, "button", 19);
            i0.ɵɵlistener("click", function Tasks_Template_button_click_37_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeCreateDrawer()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "button", 20);
            i0.ɵɵlistener("click", function Tasks_Template_button_click_38_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.saveTask()); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(39, "p-drawer", 21);
            i0.ɵɵtwoWayListener("visibleChange", function Tasks_Template_p_drawer_visibleChange_39_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.isDetailsDrawerOpen, $event) || (ctx.isDetailsDrawerOpen = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵtemplate(40, Tasks_ng_template_40_Template, 6, 3, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵconditionalCreate(42, Tasks_Conditional_42_Template, 41, 8, "div", 22);
            i0.ɵɵtemplate(43, Tasks_ng_template_43_Template, 3, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(45, "p-toast")(46, "p-confirmDialog");
        } if (rf & 2) {
            let tmp_29_0;
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isStudentView ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.isStudentView ? 2 : -1);
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("visible", ctx.isCreateDrawerOpen);
            i0.ɵɵproperty("styleClass", "create-task-drawer " + (ctx.isEditing() ? "edit-mode-drawer" : ""))("modal", true)("closable", true)("dismissible", false);
            i0.ɵɵadvance(9);
            i0.ɵɵtwoWayProperty("ngModel", ctx.newTask.title);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.newTask.description);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("options", ctx.batches);
            i0.ɵɵtwoWayProperty("ngModel", ctx.newTask.batch);
            i0.ɵɵproperty("checkmark", true)("showClear", true);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.newTask.dueDate);
            i0.ɵɵproperty("showTime", true);
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.newTask.duration);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.priorityOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.newTask.priority);
            i0.ɵɵproperty("checkmark", true)("showClear", true);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.newTask.batch ? 35 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("label", ctx.isEditing() ? "Save Changes" : "Create Task")("disabled", !ctx.newTask.title || !ctx.newTask.batch);
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("visible", ctx.isDetailsDrawerOpen);
            i0.ɵɵproperty("modal", true)("closable", true);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional((tmp_29_0 = ctx.selectedTask()) ? 42 : -1, tmp_29_0);
        } }, dependencies: [CommonModule,
            FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgModel, TableModule, i2.Table, i3.PrimeTemplate, i2.SelectableRow, ButtonModule, i4.ButtonDirective, InputTextModule, i5.InputText, DatePickerModule, i6.DatePicker, SelectModule, i7.Select, DrawerModule, i8.Drawer, AvatarModule, i9.Avatar, AvatarGroupModule, i10.AvatarGroup, TooltipModule, i11.Tooltip, TagModule, i12.Tag, ConfirmDialogModule, i13.ConfirmDialog, ToastModule, i14.Toast, i15.DatePipe], styles: ["//[_ngcontent-%COMP%]   ==========[_ngcontent-%COMP%]   Student[_ngcontent-%COMP%]   Tasks[_ngcontent-%COMP%]   View[_ngcontent-%COMP%]:   Week-wise[_ngcontent-%COMP%]   list[_ngcontent-%COMP%]    + Month/Week[_ngcontent-%COMP%]   filters[_ngcontent-%COMP%]   ==========\n.student-tasks-layout[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  min-height: calc(100vh - 120px);\n}\n\n\n\n.student-filters-in-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 1rem;\n  flex-wrap: wrap;\n  padding-bottom: 1rem;\n  margin-bottom: 0.75rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.student-filters-in-card[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n\n.student-filters-in-card[_ngcontent-%COMP%]   .filter-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.student-filters-in-card[_ngcontent-%COMP%]   .student-filter-select[_ngcontent-%COMP%] {\n  min-width: 130px;\n}\n\n\n\n.student-tasks-body[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 4fr 8fr;\n  gap: 1.5rem;\n  flex: 1;\n  min-height: 0;\n  align-items: stretch;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.student-task-list-panel[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 12px;\n  border: 1px solid #e5e7eb;\n  overflow-y: auto;\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.student-task-list-panel[_ngcontent-%COMP%]   .week-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.student-task-card[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 0.75rem;\n  padding: 1rem 1.25rem;\n  border-radius: 10px;\n  border: 1px solid #e5e7eb;\n  background: #fafafa;\n  cursor: pointer;\n  transition: background 0.2s, border-color 0.2s;\n\n  &:hover {\n    background: #f3f4f6;\n    border-color: var(--sqx-color-primary, #5B4BC4);\n  }\n\n  &.selected {\n    background: rgba(91, 75, 196, 0.08);\n    border-color: var(--sqx-color-primary, #5B4BC4);\n  }\n}\n\n.student-task-card-title[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 600;\n  color: #374151;\n  line-height: 1.35;\n  flex: 1;\n  min-width: 0;\n  display: -webkit-box;\n  line-clamp: 2;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n.student-task-card-date[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: #6b7280;\n  flex-shrink: 0;\n}\n\n.student-task-list-empty[_ngcontent-%COMP%] {\n  padding: 2rem;\n  text-align: center;\n  color: #9ca3af;\n  font-size: 0.9375rem;\n}\n\n.student-task-detail-panel[_ngcontent-%COMP%] {\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n}\n\n\n\n.student-detail-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  grid-template-rows: auto auto;\n  gap: 1.25rem;\n  align-items: stretch;\n\n  @media (max-width: 700px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.student-detail-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 12px;\n  border: 1px solid #e5e7eb;\n  padding: 1.25rem 1.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n  min-height: 0;\n}\n\n\n\n.student-detail-card-task[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.student-detail-card-clock[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  min-height: 200px;\n}\n\n.student-detail-card-feedbacks[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.student-detail-download-wrap[_ngcontent-%COMP%] {\n  .p-button-outlined {\n    border-color: #d1d5db;\n    color: #374151;\n\n    &:hover {\n      border-color: var(--sqx-color-primary, #5B4BC4);\n      color: var(--sqx-color-primary, #5B4BC4);\n    }\n  }\n}\n\n.student-start-task-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  min-height: 180px;\n}\n\n.student-start-task-btn[_ngcontent-%COMP%] {\n  background: var(--sqx-color-primary, #5B4BC4) !important;\n  border: none !important;\n  box-shadow: none !important;\n  color: #fff !important;\n\n  &:hover:not(:disabled) {\n    filter: brightness(1.05);\n  }\n}\n\n.student-detail-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #1f2937;\n  line-height: 1.35;\n}\n\n.student-detail-description[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.9375rem;\n  line-height: 1.6;\n  color: #4b5563;\n}\n\n\n.student-detail-created[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.8125rem;\n  color: #6b7280;\n}\n\n.student-timer-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 1rem 0;\n}\n\n.student-timer-circle[_ngcontent-%COMP%] {\n  width: 140px;\n  height: 140px;\n  border-radius: 50%;\n  border: 4px solid #e5e7eb;\n  border-top-color: var(--sqx-color-primary, #5B4BC4);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #fafafa;\n  position: relative;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n}\n\n.student-timer-value[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1f2937;\n  font-variant-numeric: tabular-nums;\n}\n\n.student-upload-section[_ngcontent-%COMP%] {\n  .student-upload-btn {\n    background: var(--sqx-color-primary, #5B4BC4) !important;\n    border: none !important;\n    box-shadow: none !important;\n    color: #fff !important;\n\n    &:hover:not(:disabled) {\n      filter: brightness(1.05);\n    }\n  }\n}\n\n.student-feedbacks-title[_ngcontent-%COMP%] {\n  margin: 0 0 0.75rem 0;\n  font-size: 1rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n\n.student-feedback-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  padding: 0.75rem 0;\n  border-bottom: 1px solid #f3f4f6;\n\n  &:last-child {\n    border-bottom: none;\n  }\n}\n\n.student-feedback-avatar[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  background: var(--sqx-color-primary, #5B4BC4) !important;\n  color: #fff !important;\n}\n\n.student-feedback-body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n\n.student-feedback-author[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 0.9375rem;\n  color: #1f2937;\n}\n\n.student-feedback-time[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #9ca3af;\n}\n\n.student-feedback-text[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0 0;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  color: #4b5563;\n}\n\n.student-detail-empty[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 200px;\n  color: #9ca3af;\n  font-size: 0.9375rem;\n}\n\n//[_ngcontent-%COMP%]   Header[_ngcontent-%COMP%]   Actions[_ngcontent-%COMP%]   (Instructor view)\n.tasks-header-actions[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 2rem;\n\n    .view-toggles {\n        background: white;\n        padding: 0.25rem;\n        border-radius: 8px;\n        border: 1px solid #dfe6e9;\n        display: flex;\n        gap: 0.25rem;\n\n        .p-button {\n            width: 2.5rem;\n            height: 2.5rem;\n            color: #b2bec3;\n            border-radius: 6px;\n\n            &:hover {\n                background: #f1f2f6;\n                color: #636e72;\n            }\n\n            &.active {\n                background: #6c5ce7; // Brand Color\n                color: white;\n            }\n        }\n    }\n\n    .action-buttons {\n        .create-btn {\n            // Use PrimeNG default size; color from global primary override\n            background: var(--sqx-color-primary);\n            border: none;\n            box-shadow: none;\n\n            &:hover:not(:disabled) {\n                background: var(--sqx-color-primary-dark);\n            }\n        }\n    }\n}\n\n//[_ngcontent-%COMP%]   ...[_ngcontent-%COMP%]   existing[_ngcontent-%COMP%]   filters[_ngcontent-%COMP%]   ...\n\n//[_ngcontent-%COMP%]   Create[_ngcontent-%COMP%]   Task[_ngcontent-%COMP%]   Drawer[_ngcontent-%COMP%]   -[_ngcontent-%COMP%]   full[_ngcontent-%COMP%]   UI[_ngcontent-%COMP%]   overhaul\n[_ngcontent-%COMP%]  .create-task-drawer {\n    width: 100% !important;\n    max-width: 100%;\n\n    @media (min-width: 768px) {\n        width: 28rem !important; // 448px - room for 2 columns\n    }\n\n    @media (min-width: 1024px) {\n        width: 32rem !important; // 512px\n    }\n\n    .p-drawer-header {\n        padding: 1.25rem 1.5rem;\n        border-bottom: 1px solid #e5e7eb;\n        background: #fafafa;\n    }\n\n    .p-drawer-content {\n        padding: 1.5rem;\n        overflow-y: auto;\n        display: flex;\n        flex-direction: column;\n    }\n\n    .p-drawer-footer {\n        padding: 1rem 1.5rem !important;\n        border-top: 1px solid #e5e7eb;\n        background: #fafafa;\n        gap: 0.75rem;\n    }\n}\n\n.create-task-drawer-header[_ngcontent-%COMP%] {\n    width: 100%;\n}\n\n.create-task-drawer-title[_ngcontent-%COMP%] {\n    font-size: 1.25rem;\n    font-weight: 700;\n    color: #1f2937;\n}\n\n.create-task-form[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 1.25rem;\n    width: 100%;\n    min-width: 0;\n}\n\n.form-field[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n    min-width: 0;\n}\n\n.form-label[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n    font-weight: 600;\n    color: #4b5563;\n}\n\n.form-row[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 1.25rem;\n}\n\n.form-row-2[_ngcontent-%COMP%] {\n    @media (min-width: 768px) {\n        display: grid;\n        grid-template-columns: 1fr 1fr;\n        gap: 1rem;\n    }\n}\n\n.form-field-avatars[_ngcontent-%COMP%] {\n    margin-top: 0.25rem;\n}\n\n.avatar-group-wrap[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n}\n\n.create-task-drawer-footer[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    gap: 0.75rem;\n    width: 100%;\n}\n\n//[_ngcontent-%COMP%]   Shared[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]   look[_ngcontent-%COMP%]   for[_ngcontent-%COMP%]   drawer[_ngcontent-%COMP%]   (padding, font, radius)\n$drawer-input-padding[_ngcontent-%COMP%]:   0.75rem[_ngcontent-%COMP%]   1rem[_ngcontent-%COMP%];\n$drawer-input-radius[_ngcontent-%COMP%]:   8px[_ngcontent-%COMP%];\n$drawer-input-border[_ngcontent-%COMP%]:   1px[_ngcontent-%COMP%]   solid[_ngcontent-%COMP%]   #d1d5db[_ngcontent-%COMP%];\n$drawer-input-font[_ngcontent-%COMP%]:   'Sen'[_ngcontent-%COMP%], system-ui[_ngcontent-%COMP%], -apple-system[_ngcontent-%COMP%], BlinkMacSystemFont[_ngcontent-%COMP%], 'Segoe[_ngcontent-%COMP%]   UI'[_ngcontent-%COMP%], sans-serif[_ngcontent-%COMP%];\n\n//[_ngcontent-%COMP%]   Force[_ngcontent-%COMP%]   full[_ngcontent-%COMP%]   width[_ngcontent-%COMP%]   and[_ngcontent-%COMP%]   consistent[_ngcontent-%COMP%]   styling[_ngcontent-%COMP%]   for[_ngcontent-%COMP%]   all[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   controls[_ngcontent-%COMP%]   inside[_ngcontent-%COMP%]   create-task-drawer\n[_ngcontent-%COMP%]  .create-task-drawer {\n\n    .form-input,\n    .form-textarea {\n        width: 100% !important;\n        min-width: 0;\n        box-sizing: border-box;\n        border-radius: $drawer-input-radius;\n        border: $drawer-input-border;\n        padding: $drawer-input-padding;\n        font-size: 0.875rem;\n        font-family: $drawer-input-font;\n        transition: border-color 0.2s, box-shadow 0.2s;\n\n        &::placeholder {\n            font-family: $drawer-input-font;\n            color: #9ca3af;\n        }\n\n        &:focus {\n            border-color: #6c5ce7;\n            box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.15);\n            outline: none;\n        }\n    }\n\n    .form-textarea {\n        resize: vertical;\n        min-height: 6rem;\n        line-height: 1.5;\n        padding: 0.75rem 1rem !important;\n    }\n\n    // PrimeNG Select \u2013 minimal styling to match PrimeNG defaults\n    .create-task-select {\n        width: 100%;\n\n        ::ng-deep .p-select {\n            width: 100%;\n\n            &:hover:not(.p-disabled) {\n                border-color: var(--sqx-color-primary);\n            }\n\n            &.p-focus {\n                border-color: var(--sqx-color-primary);\n                box-shadow: 0 0 0 0.2rem rgba(108, 92, 231, 0.2);\n            }\n        }\n    }\n\n    // PrimeNG DatePicker \u2013 same look as inputs and selects\n    .form-datepicker.p-datepicker,\n    .p-datepicker.form-datepicker,\n    .p-drawer-content p-datepicker,\n    .p-drawer-content .p-datepicker {\n        display: block;\n        width: 100% !important;\n        min-width: 0;\n        font-family: $drawer-input-font;\n\n        .p-inputtext {\n            width: 100% !important;\n            min-width: 0;\n            min-height: 2.75rem;\n            padding: $drawer-input-padding !important;\n            box-sizing: border-box;\n            border-radius: $drawer-input-radius;\n            border: $drawer-input-border;\n            font-size: 0.875rem;\n            font-family: $drawer-input-font;\n            transition: border-color 0.2s, box-shadow 0.2s;\n\n            &::placeholder {\n                font-family: $drawer-input-font;\n                color: #9ca3af;\n            }\n        }\n\n        &.p-focus .p-inputtext,\n        .p-inputtext:focus {\n            border-color: #6c5ce7;\n            box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.15);\n            outline: none;\n        }\n    }\n\n    // All text inputs in drawer content \u2013 padding and font\n    .p-drawer-content {\n        .p-inputtext {\n            width: 100% !important;\n            min-width: 0;\n            box-sizing: border-box;\n            padding: $drawer-input-padding !important;\n            font-family: $drawer-input-font;\n\n            &::placeholder {\n                font-family: $drawer-input-font;\n            }\n        }\n\n        .p-inputtextarea {\n            width: 100% !important;\n            min-width: 0;\n            box-sizing: border-box;\n            padding: 0.75rem 1rem !important;\n            font-family: $drawer-input-font;\n            font-size: 0.875rem;\n            line-height: 1.5;\n            resize: vertical;\n            min-height: 6rem;\n            border-radius: $drawer-input-radius;\n            border: $drawer-input-border;\n            transition: border-color 0.2s, box-shadow 0.2s;\n\n            &::placeholder {\n                font-family: $drawer-input-font;\n                color: #9ca3af;\n            }\n\n            &:focus {\n                border-color: #6c5ce7;\n                box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.15);\n                outline: none;\n            }\n        }\n    }\n}\n\n//   Select   dropdown   overlay   (panel)   \u2013   premium   list   when   opened   from   Create   Task   drawer\n[_nghost-%COMP%]     .p-select-overlay, \n[_nghost-%COMP%]     .p-select-panel, \n[_nghost-%COMP%]     [role=\"listbox\"] {\n    font-family: $drawer-input-font !important;\n    border-radius: $drawer-input-radius !important;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12) !important;\n    border: 1px solid #e5e7eb !important;\n    padding: 0.25rem 0 !important;\n\n    .p-select-option,\n    .p-select-option-label,\n    [role=\"option\"] {\n        font-family: $drawer-input-font !important;\n        font-size: 0.875rem !important;\n        padding: 0.625rem 1rem !important;\n        margin: 0 0.25rem;\n        border-radius: 6px;\n    }\n\n    .p-select-option.p-select-option-active,\n    .p-select-option.p-highlight,\n    [role=\"option\"][aria-selected=\"true\"] {\n        background: rgba(108, 92, 231, 0.08) !important;\n        color: #6c5ce7 !important;\n    }\n}\n\n//[_ngcontent-%COMP%]   ==========[_ngcontent-%COMP%]   Task[_ngcontent-%COMP%]   Details[_ngcontent-%COMP%]   Drawer[_ngcontent-%COMP%]   \u2013[_ngcontent-%COMP%]   Premium[_ngcontent-%COMP%]   Design[_ngcontent-%COMP%]   ==========\n$task-details-font[_ngcontent-%COMP%]:   'Sen'[_ngcontent-%COMP%], system-ui[_ngcontent-%COMP%], -apple-system[_ngcontent-%COMP%], BlinkMacSystemFont[_ngcontent-%COMP%], 'Segoe[_ngcontent-%COMP%]   UI'[_ngcontent-%COMP%], sans-serif[_ngcontent-%COMP%];\n$task-details-radius[_ngcontent-%COMP%]:   12px[_ngcontent-%COMP%];\n$task-details-radius-sm[_ngcontent-%COMP%]:   8px[_ngcontent-%COMP%];\n$task-details-accent[_ngcontent-%COMP%]:   #6c5ce7[_ngcontent-%COMP%];\n$task-details-accent-soft[_ngcontent-%COMP%]:   rgba(108, 92, 231, 0.08)[_ngcontent-%COMP%];\n$task-details-surface[_ngcontent-%COMP%]:   #f8fafc[_ngcontent-%COMP%];\n$task-details-border[_ngcontent-%COMP%]:   #e2e8f0[_ngcontent-%COMP%];\n$task-details-text[_ngcontent-%COMP%]:   #1e293b[_ngcontent-%COMP%];\n$task-details-muted[_ngcontent-%COMP%]:   #64748b[_ngcontent-%COMP%];\n$task-details-success[_ngcontent-%COMP%]:   #059669[_ngcontent-%COMP%];\n$task-details-success-bg[_ngcontent-%COMP%]:   #ecfdf5[_ngcontent-%COMP%];\n$task-details-pending-bg[_ngcontent-%COMP%]:   #f1f5f9[_ngcontent-%COMP%];\n\n  .task-details-drawer {\n    width: 100% !important;\n    max-width: 100%;\n    font-family: $task-details-font;\n\n    @media (min-width: 768px) {\n        width: 28rem !important;\n    }\n\n    @media (min-width: 1024px) {\n        width: 32rem !important;\n    }\n\n    .p-drawer-header {\n        padding: 0;\n        border: none;\n        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\n        border-bottom: 1px solid $task-details-border;\n    }\n\n    .p-drawer-content {\n        padding: 0;\n        overflow: hidden;\n        display: flex;\n        flex-direction: column;\n        background: $task-details-surface;\n    }\n}\n\n.task-details-header[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: 1rem;\n    padding: 1.5rem 1.5rem 1.25rem;\n    width: 100%;\n}\n\n.task-details-header-main[_ngcontent-%COMP%] {\n    flex: 1;\n    min-width: 0;\n}\n\n.task-details-title[_ngcontent-%COMP%] {\n    margin: 0 0 0.75rem 0;\n    font-family: $task-details-font;\n    font-size: 1.5rem;\n    font-weight: 700;\n    line-height: 1.3;\n    letter-spacing: -0.02em;\n    color: $task-details-text;\n}\n\n.task-details-meta[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    flex-wrap: wrap;\n}\n\n.task-details-priority-tag[_ngcontent-%COMP%] {\n    font-size: 0.6875rem !important;\n    font-weight: 700 !important;\n    letter-spacing: 0.05em !important;\n    text-transform: uppercase !important;\n    padding: 0.25rem 0.5rem !important;\n    border-radius: 6px !important;\n}\n\n.task-details-id[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    font-weight: 500;\n    color: $task-details-muted;\n    background: white;\n    padding: 0.25rem 0.5rem;\n    border-radius: 6px;\n    border: 1px solid $task-details-border;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);\n}\n\n.task-details-actions[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 0.25rem;\n}\n\n.task-details-action-btn[_ngcontent-%COMP%] {\n    width: 2.25rem !important;\n    height: 2.25rem !important;\n    border-radius: $task-details-radius-sm !important;\n    color: $task-details-muted !important;\n    transition: color 0.2s, background 0.2s !important;\n\n    &.task-details-action-edit:hover {\n        color: $task-details-accent !important;\n        background: $task-details-accent-soft !important;\n    }\n\n    &.task-details-action-delete:hover {\n        color: #dc2626 !important;\n        background: rgba(220, 38, 38, 0.08) !important;\n    }\n}\n\n.task-details-body[_ngcontent-%COMP%] {\n    flex: 1;\n    overflow-y: auto;\n    padding: 1.25rem 1.5rem 1.5rem;\n\n    &::-webkit-scrollbar {\n        width: 6px;\n    }\n\n    &::-webkit-scrollbar-track {\n        background: transparent;\n    }\n\n    &::-webkit-scrollbar-thumb {\n        background: #cbd5e1;\n        border-radius: 3px;\n    }\n}\n\n.task-details-content[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 1.5rem;\n}\n\n.task-details-section[_ngcontent-%COMP%] {\n    background: white;\n    border-radius: $task-details-radius;\n    border: 1px solid $task-details-border;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n    overflow: hidden;\n}\n\n.task-details-section-title[_ngcontent-%COMP%] {\n    margin: 0 0 1rem 0;\n    font-family: $task-details-font;\n    font-size: 0.6875rem;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: $task-details-muted;\n}\n\n.task-details-properties[_ngcontent-%COMP%] {\n    padding: 1.25rem 1.25rem 1.5rem;\n}\n\n.task-details-props-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr;\n    gap: 1.25rem;\n    margin-bottom: 1.25rem;\n}\n\n.task-details-prop[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 0.375rem;\n}\n\n.task-details-prop-label[_ngcontent-%COMP%] {\n    font-size: 0.6875rem;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: $task-details-muted;\n}\n\n.task-details-prop-value[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    font-size: 0.875rem;\n    font-weight: 500;\n    color: $task-details-text;\n\n    span {\n        font-family: $task-details-font;\n    }\n}\n\n.task-details-prop-icon[_ngcontent-%COMP%] {\n    color: $task-details-accent;\n    font-size: 0.875rem;\n    flex-shrink: 0;\n}\n\n.task-details-description-block[_ngcontent-%COMP%] {\n    padding-top: 1.25rem;\n    border-top: 1px solid $task-details-border;\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n}\n\n.task-details-description[_ngcontent-%COMP%] {\n    margin: 0;\n    font-family: $task-details-font;\n    font-size: 0.875rem;\n    line-height: 1.6;\n    color: #475569;\n    padding: 1rem;\n    background: $task-details-surface;\n    border-radius: $task-details-radius-sm;\n    border: 1px solid $task-details-border;\n}\n\n//[_ngcontent-%COMP%]   Student[_ngcontent-%COMP%]   Activity\n.task-details-activity[_ngcontent-%COMP%] {\n    padding: 1.25rem 1.25rem 1.5rem;\n}\n\n.task-details-activity-head[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: 1rem;\n}\n\n.task-details-activity-count[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    font-weight: 600;\n    color: $task-details-muted;\n    background: $task-details-pending-bg;\n    padding: 0.25rem 0.625rem;\n    border-radius: 999px;\n    border: 1px solid $task-details-border;\n}\n\n.task-details-activity-list[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n}\n\n.task-details-activity-item[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 1rem;\n    padding: 1rem 1rem;\n    border-radius: $task-details-radius-sm;\n    border: 1px solid transparent;\n    background: $task-details-surface;\n    transition: background 0.2s, border-color 0.2s;\n\n    &:hover {\n        background: white;\n        border-color: $task-details-border;\n        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);\n    }\n}\n\n.task-details-activity-avatar[_ngcontent-%COMP%] {\n    border: 2px solid white !important;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;\n    flex-shrink: 0;\n}\n\n.task-details-activity-body[_ngcontent-%COMP%] {\n    flex: 1;\n    min-width: 0;\n    display: flex;\n    flex-direction: column;\n    gap: 0.375rem;\n}\n\n.task-details-activity-row[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 0.5rem;\n}\n\n.task-details-activity-name[_ngcontent-%COMP%] {\n    font-family: $task-details-font;\n    font-size: 0.875rem;\n    font-weight: 600;\n    color: $task-details-text;\n}\n\n.task-details-activity-date[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    color: $task-details-muted;\n    flex-shrink: 0;\n}\n\n.task-details-status[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.375rem;\n    font-size: 0.75rem;\n    font-weight: 600;\n    padding: 0.25rem 0.5rem;\n    border-radius: 6px;\n    width: fit-content;\n\n    i {\n        font-size: 0.6875rem;\n    }\n}\n\n.task-details-status-submitted[_ngcontent-%COMP%] {\n    color: $task-details-success;\n    background: $task-details-success-bg;\n    border: 1px solid rgba(5, 150, 105, 0.2);\n}\n\n.task-details-status-pending[_ngcontent-%COMP%] {\n    color: $task-details-muted;\n    background: $task-details-pending-bg;\n    border: 1px solid $task-details-border;\n}\n\n.task-details-activity-link[_ngcontent-%COMP%] {\n    opacity: 0.5;\n    color: $task-details-muted !important;\n    width: 2rem !important;\n    height: 2rem !important;\n    border-radius: 6px !important;\n    transition: opacity 0.2s, color 0.2s, background 0.2s !important;\n    flex-shrink: 0;\n}\n\n.task-details-activity-item[_ngcontent-%COMP%]:hover   .task-details-activity-link[_ngcontent-%COMP%] {\n    opacity: 1;\n}\n\n.task-details-activity-link[_ngcontent-%COMP%]:hover {\n    color: $task-details-accent !important;\n    background: $task-details-accent-soft !important;\n}\n\n//[_ngcontent-%COMP%]   Premium[_ngcontent-%COMP%]   Filters\n.filters-section[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 1rem;\n    margin-bottom: 2rem;\n    flex-wrap: wrap;\n    align-items: center;\n\n    .search-box {\n        flex: 2;\n        min-width: 300px;\n        position: relative;\n\n        i {\n            position: absolute;\n            left: 1rem;\n            top: 50%;\n            transform: translateY(-50%);\n            color: #b2bec3;\n            z-index: 1;\n        }\n\n        input {\n            width: 100%;\n            padding-left: 2.5rem;\n            border-radius: 8px;\n            border: 1px solid #dfe6e9;\n            height: 42px;\n            transition: all 0.2s;\n\n            &:focus {\n                border-color: #6c5ce7;\n                box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.1);\n            }\n        }\n    }\n\n    .status-filter,\n    .date-filter,\n    .batch-filter {\n        flex: 1;\n        min-width: 180px;\n\n        ::ng-deep .p-select,\n        ::ng-deep .p-datepicker {\n            width: 100%;\n            border-radius: 8px;\n            height: 42px;\n            border-color: #dfe6e9;\n            align-items: center;\n\n            &:hover {\n                border-color: #b2bec3;\n            }\n\n            &.p-focus {\n                border-color: #6c5ce7;\n                box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.1);\n            }\n        }\n\n        ::ng-deep .p-inputtext {\n            border-radius: 8px;\n            padding-top: 0.5rem;\n            padding-bottom: 0.5rem;\n        }\n    }\n}\n\n//[_ngcontent-%COMP%]   Drawer[_ngcontent-%COMP%]   Customization[_ngcontent-%COMP%]   (if Tailwind classes aren't enough)\n::ng-deep[_ngcontent-%COMP%]   .p-drawer[_ngcontent-%COMP%] {\n    border: none;\n    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.05);\n\n    .p-drawer-content {\n        padding: 1.5rem;\n    }\n}\n\n.create-task-btn[_ngcontent-%COMP%] {\n    background: var(--sqx-color-primary) !important;\n    border: none !important;\n    box-shadow: none !important;\n\n    &:hover:not(:disabled) {\n        background: var(--sqx-color-primary-dark) !important;\n    }\n}\n\n//[_ngcontent-%COMP%]   Global[_ngcontent-%COMP%]   Overrides[_ngcontent-%COMP%]   for[_ngcontent-%COMP%]   Premium[_ngcontent-%COMP%]   Feel\n::ng-deep[_ngcontent-%COMP%]   .p-component[_ngcontent-%COMP%] {\n    font-family: 'Inter', sans-serif;\n}\n\n//[_ngcontent-%COMP%]   List[_ngcontent-%COMP%]   &[_ngcontent-%COMP%]   Board[_ngcontent-%COMP%]   styles[_ngcontent-%COMP%]   remain...\n\n//[_ngcontent-%COMP%]   List[_ngcontent-%COMP%]   View[_ngcontent-%COMP%]   Table\n.tasks-table-container[_ngcontent-%COMP%] {\n    background: white;\n    border-radius: 12px;\n    border: 1px solid #dfe6e9;\n    overflow: hidden;\n\n    .task-cell-content {\n        display: flex;\n        flex-direction: column;\n\n        .task-title {\n            font-weight: 600;\n            color: #2d3436;\n        }\n\n        .task-desc-truncate {\n            font-size: 13px;\n            color: #b2bec3;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            max-width: 300px;\n        }\n    }\n\n    .status-badge {\n        padding: 4px 12px;\n        border-radius: 20px;\n        font-size: 12px;\n        font-weight: 600;\n\n        &.pending {\n            background: #FFF4E5;\n            color: #FF9800;\n        }\n\n        &.in-progress {\n            background: #E3F2FD;\n            color: #2196F3;\n        }\n\n        &.completed {\n            background: #E8F5E9;\n            color: #4CAF50;\n        }\n    }\n}\n\n//[_ngcontent-%COMP%]   Board[_ngcontent-%COMP%]   View\n.tasks-board[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 1.5rem;\n    overflow-x: auto;\n    padding-bottom: 1rem;\n    min-height: calc(100vh - 250px);\n\n    .board-column {\n        flex: 1;\n        min-width: 300px;\n        background: #F9FAFB;\n        border-radius: 12px;\n        padding: 1rem;\n        border: 1px solid #dfe6e9;\n\n        .column-header {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            margin-bottom: 1rem;\n            padding-bottom: 0.5rem;\n            border-bottom: 2px solid transparent;\n\n            h3 {\n                font-size: 16px;\n                font-weight: 600;\n                margin: 0;\n            }\n\n            .count {\n                background: rgba(0, 0, 0, 0.05);\n                padding: 2px 8px;\n                border-radius: 10px;\n                font-size: 12px;\n                font-weight: 600;\n            }\n\n            &.pending {\n                border-color: #FF9800;\n\n                h3 {\n                    color: #d97706;\n                }\n            }\n\n            &.in-progress {\n                border-color: #2196F3;\n\n                h3 {\n                    color: #0284c7;\n                }\n            }\n\n            &.completed {\n                border-color: #4CAF50;\n\n                h3 {\n                    color: #059669;\n                }\n            }\n        }\n\n        .column-content {\n            display: flex;\n            flex-direction: column;\n            gap: 1rem;\n        }\n    }\n}\n\n.kanban-card[_ngcontent-%COMP%] {\n    background: white;\n    padding: 1rem;\n    border-radius: 8px;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n    border: 1px solid transparent;\n    transition: all 0.2s;\n    cursor: pointer;\n\n    &:hover {\n        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n        border-color: #a29bfe;\n    }\n\n    .card-header {\n        display: flex;\n        justify-content: space-between;\n        margin-bottom: 0.5rem;\n\n        .mini-tag {\n            padding: 2px 6px;\n            font-size: 10px;\n        }\n\n        .due-date {\n            font-size: 12px;\n            color: #b2bec3;\n        }\n    }\n\n    h4 {\n        margin: 0 0 0.5rem 0;\n        font-size: 15px;\n        font-weight: 600;\n        color: #2d3436;\n    }\n\n    .batch-name {\n        font-size: 12px;\n        color: #b2bec3;\n        margin: 0 0 1rem 0;\n    }\n\n    .card-footer {\n        display: flex;\n        justify-content: flex-end;\n        align-items: center;\n        border-top: 1px solid #f1f2f6;\n        padding-top: 0.75rem;\n        margin-top: 0.5rem;\n\n        .progress-info {\n            font-size: 0.85rem;\n            color: #636e72;\n            font-weight: 500;\n\n            span {\n                display: flex;\n                align-items: center;\n                gap: 0.25rem;\n            }\n        }\n    }\n}\n\n//[_ngcontent-%COMP%]   Custom[_ngcontent-%COMP%]   Scrollbar[_ngcontent-%COMP%]   for[_ngcontent-%COMP%]   Drawer\n.custom-scrollbar[_ngcontent-%COMP%] {\n    &::-webkit-scrollbar {\n        width: 6px;\n    }\n\n    &::-webkit-scrollbar-track {\n        background: transparent;\n    }\n\n    &::-webkit-scrollbar-thumb {\n        background: #e2e8f0;\n        border-radius: 3px;\n\n        &:hover {\n            background: #cbd5e1;\n        }\n    }\n}\n\n//[_ngcontent-%COMP%]   Premium[_ngcontent-%COMP%]   Drawer[_ngcontent-%COMP%]   Styles\n::ng-deep[_ngcontent-%COMP%]   .p-drawer-header[_ngcontent-%COMP%] {\n    background: #fff !important;\n    padding: 0 !important;\n    display: flex;\n    align-items: center;\n}\n\n::ng-deep[_ngcontent-%COMP%]   .p-drawer-content[_ngcontent-%COMP%] {\n    background: #f9fafb !important;\n    padding: 0 !important;\n}\n\n.premium-drawer-header[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n    padding: 1.5rem 1.5rem 0.5rem 1.5rem;\n    border-bottom: 1px solid #f8f9fa;\n    margin-bottom: 0;\n    background: #fff;\n    width: 100%;\n\n    .title-section {\n        display: flex;\n        flex-direction: column;\n        gap: 0.25rem;\n\n        h2 {\n            font-size: 1.5rem;\n            font-weight: 700;\n            color: #111827;\n            margin: 0;\n            line-height: 1.2;\n            letter-spacing: -0.02em;\n        }\n\n        .meta-badges {\n            display: flex;\n            align-items: center;\n            gap: 0.5rem;\n\n            .id-badge {\n                font-size: 0.75rem;\n                color: #9ca3af;\n                background: #f9fafb;\n                padding: 0.125rem 0.5rem;\n                border-radius: 4px;\n                border: 1px solid #f3f4f6;\n                font-family: monospace;\n            }\n        }\n    }\n}\n\n.task-details-content[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n    display: flex;\n    flex-direction: column;\n    gap: 1.5rem;\n\n    .properties-panel {\n        display: flex;\n        flex-direction: column;\n        gap: 1.25rem;\n        background: #fff;\n        border-radius: 8px;\n        padding: 1.25rem;\n        border: 1px solid #f3f4f6;\n        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n\n        h3 {\n            font-size: 0.75rem;\n            font-weight: 700;\n            color: #9ca3af;\n            text-transform: uppercase;\n            letter-spacing: 0.05em;\n            margin: 0 0 0.5rem 0;\n        }\n\n        .property-grid {\n            display: grid;\n            grid-template-columns: 1fr;\n            gap: 1.5rem;\n        }\n\n        .property-item {\n            display: flex;\n            flex-direction: column;\n            gap: 0.375rem;\n\n            label {\n                font-size: 0.7rem;\n                font-weight: 700;\n                color: #9ca3af;\n                text-transform: uppercase;\n                letter-spacing: 0.05em;\n            }\n\n            .value {\n                display: flex;\n                align-items: center;\n                gap: 0.5rem;\n                font-size: 0.875rem;\n                font-weight: 500;\n                color: #1f2937;\n\n                i {\n                    color: #6c5ce7;\n                    font-size: 0.875rem;\n                }\n            }\n\n            p.description-text {\n                font-size: 0.875rem;\n                line-height: 1.6;\n                color: #374151;\n                background: #f9fafb;\n                padding: 1rem;\n                border-radius: 8px;\n                border: 1px solid #f3f4f6;\n                margin: 0;\n            }\n        }\n    }\n\n    .divider {\n        height: 1px;\n        background-color: #f3f4f6;\n        width: 100%;\n        margin: 0.5rem 0;\n    }\n\n    .activity-feed {\n        display: flex;\n        flex-direction: column;\n        gap: 1.5rem;\n        background: #fff;\n        border-radius: 8px;\n        padding: 1.25rem;\n        border: 1px solid #f3f4f6;\n        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n\n        .feed-header {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n\n            h3 {\n                font-size: 0.75rem;\n                font-weight: 700;\n                color: #9ca3af;\n                text-transform: uppercase;\n                letter-spacing: 0.05em;\n                margin: 0;\n            }\n\n            .count-badge {\n                font-size: 0.75rem;\n                color: #6b7280;\n                background: #f3f4f6;\n                padding: 0.125rem 0.5rem;\n                border-radius: 999px;\n                font-weight: 600;\n            }\n        }\n\n        .feed-list {\n            position: relative;\n            display: flex;\n            flex-direction: column;\n            gap: 0;\n\n            // Vertical Line\n            &::before {\n                content: '';\n                position: absolute;\n                left: 20px;\n                top: 1rem;\n                bottom: 1rem;\n                width: 1px;\n                background: #e5e7eb;\n                z-index: 0;\n            }\n\n            .feed-item {\n                display: flex;\n                align-items: flex-start;\n                gap: 1rem;\n                padding: 0.75rem;\n                border-radius: 8px;\n                position: relative;\n                z-index: 1;\n                background: transparent;\n                transition: all 0.2s;\n                margin: 0 -0.75rem; // Negative margin to align content with grid but allow hover bg\n\n                &:hover {\n                    background-color: #f9fafb;\n\n                    .action-btn {\n                        opacity: 1;\n                    }\n                }\n\n                .avatar-wrapper {\n                    background: white;\n                    border-radius: 50%;\n                    padding: 2px;\n                    border: 1px solid #fff;\n                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n                    z-index: 2;\n                    flex-shrink: 0;\n                }\n\n                .feed-content {\n                    flex: 1;\n                    display: flex;\n                    flex-direction: column;\n                    gap: 0.25rem;\n                    min-width: 0; // Truncation fix\n\n                    .top-row {\n                        display: flex;\n                        align-items: center;\n                        justify-content: space-between;\n                        gap: 0.5rem;\n                    }\n\n                    .student-name {\n                        font-size: 0.875rem;\n                        font-weight: 600;\n                        color: #111827;\n                    }\n\n                    .timestamp {\n                        font-size: 0.75rem;\n                        color: #9ca3af;\n                        white-space: nowrap;\n                    }\n\n                    .status-badge {\n                        display: inline-flex;\n                        align-items: center;\n                        gap: 0.375rem;\n                        font-size: 0.75rem;\n                        font-weight: 500;\n                        padding: 0.125rem 0.5rem;\n                        border-radius: 4px;\n                        width: fit-content;\n                        margin-top: 0.125rem;\n\n                        &.submitted {\n                            color: #059669;\n                            background: #ecfdf5;\n                            border: 1px solid #d1fae5;\n                        }\n\n                        &.pending {\n                            color: #6b7280;\n                            background: #f3f4f6;\n                            border: 1px solid #e5e7eb;\n                        }\n                    }\n                }\n\n                .action-btn {\n                    opacity: 0;\n                    transition: opacity 0.2s;\n                    color: #9ca3af;\n\n                    &:hover {\n                        color: #6c5ce7;\n                        background: rgba(108, 92, 231, 0.1);\n                    }\n                }\n            }\n        }\n    }\n}\n\n//[_ngcontent-%COMP%]   Footer[_ngcontent-%COMP%]   Overrides\n::ng-deep[_ngcontent-%COMP%]   .p-drawer-footer[_ngcontent-%COMP%] {\n    border-top: 1px solid #f3f4f6;\n}\n\n.drawer-footer[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    gap: 0.75rem;\n    width: 100%;\n    padding: 1rem 1.5rem; // Add padding inside to match drawer content\n\n    button {\n        font-size: 0.875rem;\n    }\n}\n\n//[_ngcontent-%COMP%]   Create/Edit[_ngcontent-%COMP%]   Task[_ngcontent-%COMP%]   Drawer[_ngcontent-%COMP%]   Styles\n::ng-deep[_ngcontent-%COMP%]   .create-task-drawer[_ngcontent-%COMP%] {\n    .p-drawer-header {\n        padding: 0;\n        background: white;\n    }\n\n    .p-drawer-content {\n        padding: 0; // Reset padding to handle scrollable content\n    }\n\n}\n\n.create-task-wrapper[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n    background: white;\n}\n\n//[_ngcontent-%COMP%]   Content[_ngcontent-%COMP%]   Scroll[_ngcontent-%COMP%]   Area\n.create-task-content[_ngcontent-%COMP%] {\n    flex: 1;\n    overflow-y: auto;\n    padding: 1.5rem;\n}\n\n.create-task-form[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 1.5rem;\n}\n\n.form-field[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n}\n\n.form-label[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n    font-weight: 600;\n    color: #374151;\n}\n\n.form-input,\n.form-textarea[_ngcontent-%COMP%] {\n    width: 100%;\n    padding: 0.75rem 1rem;\n    border-radius: 8px;\n    border: 1px solid #e5e7eb;\n    font-size: 0.95rem;\n    transition: all 0.2s;\n\n    &:focus {\n        border-color: #6c5ce7;\n        box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.1);\n    }\n}\n\n.form-row[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 1.5rem;\n\n    &.form-row-2 {\n        .form-field {\n            flex: 1;\n        }\n    }\n}\n\n//[_ngcontent-%COMP%]   Consistent[_ngcontent-%COMP%]   with[_ngcontent-%COMP%]   custom[_ngcontent-%COMP%]   footer\n.create-task-drawer-footer[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    gap: 0.75rem;\n    padding: 1rem 1.5rem;\n    border-top: 1px solid #f3f4f6;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Tasks, [{
        type: Component,
        args: [{ selector: 'sqx-tasks', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    TableModule,
                    ButtonModule,
                    InputTextModule,
                    DatePickerModule,
                    SelectModule,
                    DrawerModule,
                    AvatarModule,
                    AvatarGroupModule,
                    TooltipModule,
                    TagModule,
                    ConfirmDialogModule,
                    ToastModule
                ], providers: [ConfirmationService, MessageService], template: "<div class=\"page-container\">\n    <!-- ========== STUDENT VIEW: Week-wise list + Month/Week filters ========== -->\n    @if (isStudentView) {\n    <div class=\"student-tasks-layout\">\n        <div class=\"student-tasks-body\">\n            <!-- Left: White card with filters at top + task list -->\n            <div class=\"student-task-list-panel\">\n                <div class=\"student-filters-in-card\">\n                    <div class=\"filter-group\">\n                        <label class=\"filter-label\">Month</label>\n                        <p-select [options]=\"monthOptionsList\" [(ngModel)]=\"selectedMonthValue\" optionLabel=\"label\"\n                            placeholder=\"Month\" [showClear]=\"false\" class=\"student-filter-select\"\n                            (onChange)=\"onMonthChange()\">\n                            <ng-template pTemplate=\"selectedItem\" let-item>\n                                @if (item) {\n                                <span>{{ item.label }}</span>\n                                } @else {\n                                <span class=\"placeholder\">Month</span>\n                                }\n                            </ng-template>\n                            <ng-template pTemplate=\"item\" let-item>\n                                <span>{{ item.label }}</span>\n                            </ng-template>\n                        </p-select>\n                    </div>\n                    <div class=\"filter-group\">\n                        <label class=\"filter-label\">Week</label>\n                        <p-select [options]=\"weekOptionsForSelectedMonth\" [(ngModel)]=\"selectedWeekValue\" optionLabel=\"label\"\n                            placeholder=\"Week\" [showClear]=\"false\" class=\"student-filter-select\"\n                            (onChange)=\"selectFirstTaskForFilter()\">\n                            <ng-template pTemplate=\"selectedItem\" let-item>\n                                @if (item) {\n                                <span>{{ item.label }}</span>\n                                } @else {\n                                <span class=\"placeholder\">2nd Week</span>\n                                }\n                            </ng-template>\n                            <ng-template pTemplate=\"item\" let-item>\n                                <span>{{ item.label }}</span>\n                            </ng-template>\n                        </p-select>\n                    </div>\n                </div>\n                @for (group of tasksGroupedByWeek; track group.weekNumber) {\n                <div class=\"week-group\">\n                    @for (task of group.tasks; track task.id) {\n                    <div class=\"student-task-card\" [class.selected]=\"selectedTask()?.id === task.id\"\n                        (click)=\"selectedTask.set(task)\">\n                        <div class=\"student-task-card-title\">{{ task.title }}</div>\n                        <div class=\"student-task-card-date\">{{ formatTaskDate(task.dueDate) }}</div>\n                    </div>\n                    }\n                </div>\n                }\n                @if (tasksGroupedByWeek.length === 0) {\n                <div class=\"student-task-list-empty\">No tasks for this month and week.</div>\n                }\n            </div>\n\n            <!-- Right: Three cards - row1: task data + clock/timer, row2: feedbacks -->\n            <div class=\"student-task-detail-panel\">\n                @if (selectedTask(); as task) {\n                <div class=\"student-detail-cards\">\n                    <!-- Row 1 - Card 1: Task data with Download Task -->\n                    <div class=\"student-detail-card student-detail-card-task\">\n                        <h2 class=\"student-detail-title\">{{ task.title }}</h2>\n                        <p class=\"student-detail-description\">{{ task.description }}</p>\n                        <div class=\"student-detail-download-wrap\">\n                            <button pButton [label]=\"task.attachmentFilename || 'Download Task'\" icon=\"pi pi-download\"\n                                class=\"p-button-outlined\" (click)=\"startTimerForTask(task.id)\"></button>\n                        </div>\n                        @if (task.createdAt) {\n                        <p class=\"student-detail-created\">Task Created on {{ formatTaskDate(task.createdAt) }}</p>\n                        }\n                    </div>\n                    <!-- Row 1 - Card 2: Clock - Start Task button by default, timer + Upload after click -->\n                    <div class=\"student-detail-card student-detail-card-clock\">\n                        @if (timerStartedForTaskId() === task.id) {\n                        <div class=\"student-timer-section\">\n                            <div class=\"student-timer-circle\">\n                                <span class=\"student-timer-value\">{{ timerDisplay() }}</span>\n                            </div>\n                        </div>\n                        <div class=\"student-upload-section\">\n                            <button pButton label=\"Upload Task\" icon=\"pi pi-upload\" class=\"student-upload-btn\"></button>\n                        </div>\n                        } @else {\n                        <div class=\"student-start-task-wrap\">\n                            <button pButton label=\"Start Task\" icon=\"pi pi-play\" class=\"student-start-task-btn\"\n                                (click)=\"startTimerForTask(task.id)\"></button>\n                        </div>\n                        }\n                    </div>\n                    <!-- Row 2 - Card 3: Feedbacks -->\n                    <div class=\"student-detail-card student-detail-card-feedbacks\">\n                        <h3 class=\"student-feedbacks-title\">Feedbacks</h3>\n                        @for (fb of getFeedbacksForTask(task); track fb.authorName + fb.time) {\n                        <div class=\"student-feedback-item\">\n                            <p-avatar [label]=\"fb.authorName.charAt(0)\" shape=\"circle\" size=\"normal\"\n                                styleClass=\"student-feedback-avatar\"></p-avatar>\n                            <div class=\"student-feedback-body\">\n                                <span class=\"student-feedback-author\">{{ fb.authorName }}</span>\n                                <span class=\"student-feedback-time\">{{ fb.time }}</span>\n                                <p class=\"student-feedback-text\">{{ fb.text }}</p>\n                            </div>\n                        </div>\n                        }\n                    </div>\n                </div>\n                } @else {\n                <div class=\"student-detail-empty\">\n                    <p>Select a task from the list to view details.</p>\n                </div>\n                }\n            </div>\n        </div>\n    </div>\n    }\n\n    <!-- ========== INSTRUCTOR/ADMIN VIEW ========== -->\n    @if (!isStudentView) {\n    <!-- Header -->\n    <div class=\"tasks-header-actions\">\n        <div class=\"view-toggles\">\n            <button pButton icon=\"pi pi-list\" class=\"p-button-text\" [class.active]=\"currentView() === 'list'\"\n                (click)=\"toggleView('list')\" pTooltip=\"List View\" tooltipPosition=\"bottom\"></button>\n            <button pButton icon=\"pi pi-th-large\" class=\"p-button-text\" [class.active]=\"currentView() === 'board'\"\n                (click)=\"toggleView('board')\" pTooltip=\"Board View\" tooltipPosition=\"bottom\"></button>\n        </div>\n\n        <div class=\"action-buttons\">\n            <button pButton label=\"Create Task\" icon=\"pi pi-plus\" class=\"create-btn\"\n                (click)=\"openCreateDrawer()\"></button>\n        </div>\n    </div>\n\n    <!-- Filter Section -->\n    <div class=\"filters-section\">\n        <span class=\"p-input-icon-left search-box\">\n            <i class=\"pi pi-search\"></i>\n            <input type=\"text\" pInputText placeholder=\"Search tasks...\" [(ngModel)]=\"searchText\" />\n        </span>\n\n        <p-select [options]=\"filterStatusOptions\" [(ngModel)]=\"filterStatus\" placeholder=\"Status\" [showClear]=\"true\"\n            class=\"status-filter\"></p-select>\n\n        <p-datepicker [(ngModel)]=\"filterDateRange\" selectionMode=\"range\" [readonlyInput]=\"true\"\n            placeholder=\"Date Range\" class=\"date-filter\"></p-datepicker>\n\n        <p-select [options]=\"batches\" [(ngModel)]=\"filterBatch\" optionLabel=\"name\" placeholder=\"Filter by Batch\"\n            [showClear]=\"true\" class=\"batch-filter\"></p-select>\n    </div>\n\n    <!-- List View -->\n    @if (currentView() === 'list') {\n    <div class=\"tasks-table-container\">\n        <p-table [value]=\"filteredTasks\" [tableStyle]=\"{ 'min-width': '50rem' }\" selectionMode=\"single\"\n            [(selection)]=\"selectedTask\" (onRowSelect)=\"openTaskDetails($event.data)\">\n            <ng-template pTemplate=\"header\">\n                <tr>\n                    <th>Task Name</th>\n                    <th>Batch</th>\n                    <th>Due Date</th>\n                    <th>Priority</th>\n                    <th>Status</th>\n                    <th>Assigned</th>\n                </tr>\n            </ng-template>\n            <ng-template pTemplate=\"body\" let-task>\n                <tr [pSelectableRow]=\"task\" class=\"cursor-pointer\">\n                    <td>\n                        <div class=\"task-cell-content\">\n                            <span class=\"task-title\">{{ task.title }}</span>\n                            <span class=\"task-desc-truncate\">{{ task.description }}</span>\n                        </div>\n                    </td>\n                    <td>{{ task.batchName }}</td>\n                    <td>{{ task.dueDate | date:'MMM d, y' }}</td>\n                    <td>\n                        <p-tag [value]=\"task.priority\"\n                            [severity]=\"task.priority === 'High' ? 'danger' : (task.priority === 'Medium' ? 'warn' : 'success')\"></p-tag>\n                    </td>\n                    <td>\n                        <span class=\"status-badge\" [class]=\"task.status.toLowerCase().replace(' ', '-')\">{{ task.status\n                            }}</span>\n                    </td>\n                    <td>\n                        <div class=\"assigned-stats\">\n                            <i class=\"pi pi-users\"></i>\n                            <span>{{ task.submittedCount }}/{{ task.assignedCount }} Submitted</span>\n                        </div>\n                    </td>\n                </tr>\n            </ng-template>\n        </p-table>\n    </div>\n    }\n\n    <!-- Board View -->\n    @if (currentView() === 'board') {\n    <div class=\"tasks-board\">\n        <!-- Pending Column -->\n        <div class=\"board-column\">\n            <div class=\"column-header pending\">\n                <h3>Pending</h3>\n                <span class=\"count\">{{ getTasksByStatus('Pending').length }}</span>\n            </div>\n            <div class=\"column-content\">\n                @for (task of getTasksByStatus('Pending'); track task.id) {\n                <div class=\"kanban-card\" (click)=\"openTaskDetails(task)\">\n                    <div class=\"card-header\">\n                        <p-tag [value]=\"task.priority\"\n                            [severity]=\"task.priority === 'High' ? 'danger' : (task.priority === 'Medium' ? 'warn' : 'success')\"\n                            styleClass=\"mini-tag\"></p-tag>\n                        <span class=\"due-date\">{{ task.dueDate | date:'MMM d' }}</span>\n                    </div>\n                    <h4>{{ task.title }}</h4>\n                    <p class=\"batch-name\">{{ task.batchName }}</p>\n                    <div class=\"card-footer\">\n                        <div class=\"progress-info\">\n                            <span>{{ task.submittedCount }}/{{ task.assignedCount }} Submitted</span>\n                        </div>\n                    </div>\n                </div>\n                }\n            </div>\n        </div>\n\n        <!-- In Progress Column -->\n        <div class=\"board-column\">\n            <div class=\"column-header in-progress\">\n                <h3>In Progress</h3>\n                <span class=\"count\">{{ getTasksByStatus('In Progress').length }}</span>\n            </div>\n            <div class=\"column-content\">\n                @for (task of getTasksByStatus('In Progress'); track task.id) {\n                <div class=\"kanban-card\" (click)=\"openTaskDetails(task)\">\n                    <div class=\"card-header\">\n                        <p-tag [value]=\"task.priority\"\n                            [severity]=\"task.priority === 'High' ? 'danger' : (task.priority === 'Medium' ? 'warn' : 'success')\"\n                            styleClass=\"mini-tag\"></p-tag>\n                        <span class=\"due-date\">{{ task.dueDate | date:'MMM d' }}</span>\n                    </div>\n                    <h4>{{ task.title }}</h4>\n                    <p class=\"batch-name\">{{ task.batchName }}</p>\n                    <div class=\"card-footer\">\n                        <div class=\"progress-info\">\n                            <span>{{ task.submittedCount }}/{{ task.assignedCount }} Submitted</span>\n                        </div>\n                    </div>\n                </div>\n                }\n            </div>\n        </div>\n\n        <!-- Completed Column -->\n        <div class=\"board-column\">\n            <div class=\"column-header completed\">\n                <h3>Completed</h3>\n                <span class=\"count\">{{ getTasksByStatus('Completed').length }}</span>\n            </div>\n            <div class=\"column-content\">\n                @for (task of getTasksByStatus('Completed'); track task.id) {\n                <div class=\"kanban-card\" (click)=\"openTaskDetails(task)\">\n                    <div class=\"card-header\">\n                        <p-tag [value]=\"task.priority\"\n                            [severity]=\"task.priority === 'High' ? 'danger' : (task.priority === 'Medium' ? 'warn' : 'success')\"\n                            styleClass=\"mini-tag\"></p-tag>\n                        <span class=\"due-date\">{{ task.dueDate | date:'MMM d' }}</span>\n                    </div>\n                    <h4>{{ task.title }}</h4>\n                    <p class=\"batch-name\">{{ task.batchName }}</p>\n                    <div class=\"card-footer\">\n                        <div class=\"progress-info\">\n                            <span>{{ task.submittedCount }}/{{ task.assignedCount }} Submitted</span>\n                        </div>\n                    </div>\n                </div>\n                }\n            </div>\n        </div>\n    </div>\n    }\n    }\n</div>\n\n<!-- Create Task Drawer -->\n<!-- Create Task Drawer -->\n<p-drawer [(visible)]=\"isCreateDrawerOpen\" position=\"right\"\n    [styleClass]=\"'create-task-drawer ' + (isEditing() ? 'edit-mode-drawer' : '')\" [modal]=\"true\" [closable]=\"true\"\n    [dismissible]=\"false\">\n    <ng-template #header>\n        <div class=\"premium-drawer-header w-full\">\n            <div class=\"title-section\">\n                <h2>{{ isEditing() ? 'Edit Task' : 'Create New Task' }}</h2>\n                @if (isEditing() && newTask.priority) {\n                <div class=\"meta-badges\">\n                    <p-tag [value]=\"newTask.priority\"\n                        [severity]=\"newTask.priority === 'High' ? 'danger' : (newTask.priority === 'Medium' ? 'warn' : 'success')\"\n                        class=\"uppercase text-[10px] font-bold tracking-wider px-2 py-0.5\"></p-tag>\n                </div>\n                }\n            </div>\n        </div>\n    </ng-template>\n\n    <div class=\"create-task-wrapper\">\n        <div class=\"create-task-content custom-scrollbar\">\n            <div class=\"create-task-form\">\n                <div class=\"form-field\">\n                    <label class=\"form-label\">Task Title</label>\n                    <input type=\"text\" pInputText [(ngModel)]=\"newTask.title\" placeholder=\"Enter task title\"\n                        class=\"form-input\" />\n                </div>\n\n                <div class=\"form-field\">\n                    <label class=\"form-label\">Description</label>\n                    <textarea pInputTextarea [(ngModel)]=\"newTask.description\" rows=\"4\"\n                        placeholder=\"Enter task description\" class=\"form-textarea\"></textarea>\n                </div>\n\n                <div class=\"form-row form-row-2\">\n                    <div class=\"form-field\">\n                        <label class=\"form-label\">Batch</label>\n                        <p-select [options]=\"batches\" [(ngModel)]=\"newTask.batch\" optionLabel=\"name\"\n                            placeholder=\"Select Batch\" class=\"create-task-select w-full\" [checkmark]=\"true\"\n                            [showClear]=\"true\"></p-select>\n                    </div>\n                    <div class=\"form-field\">\n                        <label class=\"form-label\">Due Date</label>\n                        <p-datepicker [(ngModel)]=\"newTask.dueDate\" [showTime]=\"true\" placeholder=\"Select due date\"\n                            appendTo=\"body\" styleClass=\"form-datepicker\"></p-datepicker>\n                    </div>\n                </div>\n\n                <div class=\"form-row form-row-2\">\n                    <div class=\"form-field\">\n                        <label class=\"form-label\">Duration</label>\n                        <input type=\"text\" pInputText [(ngModel)]=\"newTask.duration\" placeholder=\"e.g. 2 hours\"\n                            class=\"form-input\" />\n                    </div>\n                    <div class=\"form-field\">\n                        <label class=\"form-label\">Priority</label>\n                        <p-select [options]=\"priorityOptions\" [(ngModel)]=\"newTask.priority\"\n                            placeholder=\"Select Priority\" class=\"create-task-select w-full\" [checkmark]=\"true\"\n                            [showClear]=\"true\"></p-select>\n                    </div>\n                </div>\n\n                @if (newTask.batch) {\n                <div class=\"form-field form-field-avatars\">\n                    <label class=\"form-label\">Assigned Students ({{ newTask.batch.students.length }})</label>\n                    <div class=\"avatar-group-wrap\">\n                        <p-avatarGroup>\n                            @for (student of newTask.batch.students.slice(0, 5); track student.id) {\n                            <p-avatar [image]=\"student.avatar\" shape=\"circle\" size=\"normal\"\n                                styleClass=\"border-2 border-white\"></p-avatar>\n                            }\n                            @if (newTask.batch.students.length > 5) {\n                            <p-avatar [label]=\"'+' + (newTask.batch.students.length - 5)\" shape=\"circle\" size=\"normal\"\n                                [style]=\"{'background-color': '#9c27b0', 'color': '#ffffff'}\"></p-avatar>\n                            }\n                        </p-avatarGroup>\n                    </div>\n                </div>\n                }\n            </div>\n        </div>\n\n        <div class=\"create-task-drawer-footer\">\n            <button pButton label=\"Cancel\" class=\"p-button-outlined p-button-secondary\"\n                (click)=\"closeCreateDrawer()\"></button>\n            <button pButton [label]=\"isEditing() ? 'Save Changes' : 'Create Task'\" icon=\"pi pi-check\"\n                (click)=\"saveTask()\" [disabled]=\"!newTask.title || !newTask.batch\" class=\"create-task-btn\"></button>\n        </div>\n    </div>\n</p-drawer>\n\n<!-- Task Details Drawer -->\n<p-drawer [(visible)]=\"isDetailsDrawerOpen\" position=\"right\" styleClass=\"task-details-drawer\" [modal]=\"true\"\n    [closable]=\"true\">\n    <ng-template #header>\n        <div class=\"premium-drawer-header w-full\">\n            <div class=\"title-section\">\n                <h2>{{ selectedTask()?.title }}</h2>\n                <div class=\"meta-badges\">\n                    <p-tag [value]=\"selectedTask()?.priority\"\n                        [severity]=\"selectedTask()?.priority === 'High' ? 'danger' : (selectedTask()?.priority === 'Medium' ? 'warn' : 'success')\"\n                        class=\"uppercase text-[10px] font-bold tracking-wider px-2 py-0.5\"></p-tag>\n                </div>\n            </div>\n            <!-- Actions moved to footer -->\n        </div>\n    </ng-template>\n\n    @if (selectedTask(); as task) {\n    <div class=\"task-details-content h-full overflow-y-auto custom-scrollbar\">\n\n        <!-- Properties Panel -->\n        <div class=\"properties-panel\">\n            <h3>Properties</h3>\n\n            <div class=\"property-grid\">\n                <!-- Due Date -->\n                <div class=\"property-item\">\n                    <label>Due Date</label>\n                    <div class=\"value\">\n                        <i class=\"pi pi-calendar\"></i>\n                        <span>{{ task.dueDate | date:'medium' }}</span>\n                    </div>\n                </div>\n\n                <!-- Duration -->\n                <div class=\"property-item\">\n                    <label>Duration</label>\n                    <div class=\"value\">\n                        <i class=\"pi pi-clock\"></i>\n                        <span>{{ task.duration }}</span>\n                    </div>\n                </div>\n\n                <!-- Batch -->\n                <div class=\"property-item\">\n                    <label>Batch</label>\n                    <div class=\"value\">\n                        <i class=\"pi pi-users\"></i>\n                        <span>{{ task.batchName }}</span>\n                    </div>\n                </div>\n\n                <!-- Description -->\n                <div class=\"property-item\">\n                    <label>Description</label>\n                    <p class=\"description-text\">\n                        {{ task.description }}\n                    </p>\n                </div>\n            </div>\n        </div>\n\n\n\n        <!-- Activity Feed -->\n        <div class=\"activity-feed\">\n            <div class=\"feed-header\">\n                <h3>Student Activity</h3>\n                <span class=\"count-badge\">{{ getTaskSubmissions(task).length }}</span>\n            </div>\n\n            <div class=\"feed-list\">\n                @for (sub of getTaskSubmissions(task); track sub.student.id) {\n                <div class=\"feed-item\">\n                    <div class=\"avatar-wrapper\">\n                        <p-avatar [image]=\"sub.student.avatar\" shape=\"circle\" size=\"normal\"></p-avatar>\n                    </div>\n\n                    <div class=\"feed-content\">\n                        <div class=\"top-row\">\n                            <span class=\"student-name\">{{ sub.student.name }}</span>\n                            <span class=\"timestamp\">{{ sub.submittedAt ? (sub.submittedAt | date:'MMM d') : '' }}</span>\n                        </div>\n\n                        @if(sub.status === 'Submitted') {\n                        <div class=\"status-badge submitted\">\n                            <i class=\"pi pi-check-circle\" style=\"font-size: 0.7rem\"></i>\n                            <span>Submitted</span>\n                        </div>\n                        } @else {\n                        <div class=\"status-badge pending\">\n                            <i class=\"pi pi-clock\" style=\"font-size: 0.7rem\"></i>\n                            <span>Pending</span>\n                        </div>\n                        }\n                    </div>\n\n                    @if (sub.status === 'Submitted') {\n                    <button pButton icon=\"pi pi-external-link\" [text]=\"true\" [rounded]=\"true\" size=\"small\"\n                        class=\"action-btn\"></button>\n                    }\n                </div>\n                }\n            </div>\n        </div>\n    </div>\n    }\n\n    <ng-template #footer>\n        <div class=\"drawer-footer\">\n            <button pButton label=\"Delete Task\" icon=\"pi pi-trash\" class=\"p-button-outlined p-button-danger\"\n                (click)=\"confirmDelete($event)\"></button>\n            <button pButton label=\"Edit Task\" icon=\"pi pi-pencil\" class=\"p-button-primary\"\n                (click)=\"editTask()\"></button>\n        </div>\n    </ng-template>\n</p-drawer>\n\n<p-toast></p-toast>\n<p-confirmDialog></p-confirmDialog>", styles: ["// ========== Student Tasks View: Week-wise list + Month/Week filters ==========\n.student-tasks-layout {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  min-height: calc(100vh - 120px);\n}\n\n/* Filters inside the white card (above task list) */\n.student-filters-in-card {\n  display: flex;\n  align-items: flex-end;\n  gap: 1rem;\n  flex-wrap: wrap;\n  padding-bottom: 1rem;\n  margin-bottom: 0.75rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n\n.student-filters-in-card .filter-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n\n.student-filters-in-card .filter-label {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.student-filters-in-card .student-filter-select {\n  min-width: 130px;\n}\n\n/* Left col 4, right col 8 */\n.student-tasks-body {\n  display: grid;\n  grid-template-columns: 4fr 8fr;\n  gap: 1.5rem;\n  flex: 1;\n  min-height: 0;\n  align-items: stretch;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.student-task-list-panel {\n  background: #fff;\n  border-radius: 12px;\n  border: 1px solid #e5e7eb;\n  overflow-y: auto;\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.student-task-list-panel .week-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.student-task-card {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 0.75rem;\n  padding: 1rem 1.25rem;\n  border-radius: 10px;\n  border: 1px solid #e5e7eb;\n  background: #fafafa;\n  cursor: pointer;\n  transition: background 0.2s, border-color 0.2s;\n\n  &:hover {\n    background: #f3f4f6;\n    border-color: var(--sqx-color-primary, #5B4BC4);\n  }\n\n  &.selected {\n    background: rgba(91, 75, 196, 0.08);\n    border-color: var(--sqx-color-primary, #5B4BC4);\n  }\n}\n\n.student-task-card-title {\n  font-size: 0.9375rem;\n  font-weight: 600;\n  color: #374151;\n  line-height: 1.35;\n  flex: 1;\n  min-width: 0;\n  display: -webkit-box;\n  line-clamp: 2;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n.student-task-card-date {\n  font-size: 0.8125rem;\n  color: #6b7280;\n  flex-shrink: 0;\n}\n\n.student-task-list-empty {\n  padding: 2rem;\n  text-align: center;\n  color: #9ca3af;\n  font-size: 0.9375rem;\n}\n\n.student-task-detail-panel {\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n}\n\n/* Three cards: row1 = task + clock (same height), row2 = feedbacks */\n.student-detail-cards {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  grid-template-rows: auto auto;\n  gap: 1.25rem;\n  align-items: stretch;\n\n  @media (max-width: 700px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.student-detail-card {\n  background: #fff;\n  border-radius: 12px;\n  border: 1px solid #e5e7eb;\n  padding: 1.25rem 1.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n  min-height: 0;\n}\n\n/* Row 1 cards: same height (stretch to match) */\n.student-detail-card-task {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.student-detail-card-clock {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  min-height: 200px;\n}\n\n.student-detail-card-feedbacks {\n  grid-column: 1 / -1;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.student-detail-download-wrap {\n  .p-button-outlined {\n    border-color: #d1d5db;\n    color: #374151;\n\n    &:hover {\n      border-color: var(--sqx-color-primary, #5B4BC4);\n      color: var(--sqx-color-primary, #5B4BC4);\n    }\n  }\n}\n\n.student-start-task-wrap {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  min-height: 180px;\n}\n\n.student-start-task-btn {\n  background: var(--sqx-color-primary, #5B4BC4) !important;\n  border: none !important;\n  box-shadow: none !important;\n  color: #fff !important;\n\n  &:hover:not(:disabled) {\n    filter: brightness(1.05);\n  }\n}\n\n.student-detail-title {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #1f2937;\n  line-height: 1.35;\n}\n\n.student-detail-description {\n  margin: 0;\n  font-size: 0.9375rem;\n  line-height: 1.6;\n  color: #4b5563;\n}\n\n\n.student-detail-created {\n  margin: 0;\n  font-size: 0.8125rem;\n  color: #6b7280;\n}\n\n.student-timer-section {\n  display: flex;\n  justify-content: center;\n  padding: 1rem 0;\n}\n\n.student-timer-circle {\n  width: 140px;\n  height: 140px;\n  border-radius: 50%;\n  border: 4px solid #e5e7eb;\n  border-top-color: var(--sqx-color-primary, #5B4BC4);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #fafafa;\n  position: relative;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n}\n\n.student-timer-value {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1f2937;\n  font-variant-numeric: tabular-nums;\n}\n\n.student-upload-section {\n  .student-upload-btn {\n    background: var(--sqx-color-primary, #5B4BC4) !important;\n    border: none !important;\n    box-shadow: none !important;\n    color: #fff !important;\n\n    &:hover:not(:disabled) {\n      filter: brightness(1.05);\n    }\n  }\n}\n\n.student-feedbacks-title {\n  margin: 0 0 0.75rem 0;\n  font-size: 1rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n\n.student-feedback-item {\n  display: flex;\n  gap: 1rem;\n  padding: 0.75rem 0;\n  border-bottom: 1px solid #f3f4f6;\n\n  &:last-child {\n    border-bottom: none;\n  }\n}\n\n.student-feedback-avatar {\n  flex-shrink: 0;\n  background: var(--sqx-color-primary, #5B4BC4) !important;\n  color: #fff !important;\n}\n\n.student-feedback-body {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n\n.student-feedback-author {\n  font-weight: 600;\n  font-size: 0.9375rem;\n  color: #1f2937;\n}\n\n.student-feedback-time {\n  font-size: 0.75rem;\n  color: #9ca3af;\n}\n\n.student-feedback-text {\n  margin: 0.25rem 0 0 0;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  color: #4b5563;\n}\n\n.student-detail-empty {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 200px;\n  color: #9ca3af;\n  font-size: 0.9375rem;\n}\n\n// Header Actions (Instructor view)\n.tasks-header-actions {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 2rem;\n\n    .view-toggles {\n        background: white;\n        padding: 0.25rem;\n        border-radius: 8px;\n        border: 1px solid #dfe6e9;\n        display: flex;\n        gap: 0.25rem;\n\n        .p-button {\n            width: 2.5rem;\n            height: 2.5rem;\n            color: #b2bec3;\n            border-radius: 6px;\n\n            &:hover {\n                background: #f1f2f6;\n                color: #636e72;\n            }\n\n            &.active {\n                background: #6c5ce7; // Brand Color\n                color: white;\n            }\n        }\n    }\n\n    .action-buttons {\n        .create-btn {\n            // Use PrimeNG default size; color from global primary override\n            background: var(--sqx-color-primary);\n            border: none;\n            box-shadow: none;\n\n            &:hover:not(:disabled) {\n                background: var(--sqx-color-primary-dark);\n            }\n        }\n    }\n}\n\n// ... existing filters ...\n\n// Create Task Drawer - full UI overhaul\n::ng-deep .create-task-drawer {\n    width: 100% !important;\n    max-width: 100%;\n\n    @media (min-width: 768px) {\n        width: 28rem !important; // 448px - room for 2 columns\n    }\n\n    @media (min-width: 1024px) {\n        width: 32rem !important; // 512px\n    }\n\n    .p-drawer-header {\n        padding: 1.25rem 1.5rem;\n        border-bottom: 1px solid #e5e7eb;\n        background: #fafafa;\n    }\n\n    .p-drawer-content {\n        padding: 1.5rem;\n        overflow-y: auto;\n        display: flex;\n        flex-direction: column;\n    }\n\n    .p-drawer-footer {\n        padding: 1rem 1.5rem !important;\n        border-top: 1px solid #e5e7eb;\n        background: #fafafa;\n        gap: 0.75rem;\n    }\n}\n\n.create-task-drawer-header {\n    width: 100%;\n}\n\n.create-task-drawer-title {\n    font-size: 1.25rem;\n    font-weight: 700;\n    color: #1f2937;\n}\n\n.create-task-form {\n    display: flex;\n    flex-direction: column;\n    gap: 1.25rem;\n    width: 100%;\n    min-width: 0;\n}\n\n.form-field {\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n    min-width: 0;\n}\n\n.form-label {\n    font-size: 0.875rem;\n    font-weight: 600;\n    color: #4b5563;\n}\n\n.form-row {\n    display: flex;\n    flex-direction: column;\n    gap: 1.25rem;\n}\n\n.form-row-2 {\n    @media (min-width: 768px) {\n        display: grid;\n        grid-template-columns: 1fr 1fr;\n        gap: 1rem;\n    }\n}\n\n.form-field-avatars {\n    margin-top: 0.25rem;\n}\n\n.avatar-group-wrap {\n    display: flex;\n    align-items: center;\n}\n\n.create-task-drawer-footer {\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    gap: 0.75rem;\n    width: 100%;\n}\n\n// Shared input look for drawer (padding, font, radius)\n$drawer-input-padding: 0.75rem 1rem;\n$drawer-input-radius: 8px;\n$drawer-input-border: 1px solid #d1d5db;\n$drawer-input-font: 'Sen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;\n\n// Force full width and consistent styling for all form controls inside create-task-drawer\n::ng-deep .create-task-drawer {\n\n    .form-input,\n    .form-textarea {\n        width: 100% !important;\n        min-width: 0;\n        box-sizing: border-box;\n        border-radius: $drawer-input-radius;\n        border: $drawer-input-border;\n        padding: $drawer-input-padding;\n        font-size: 0.875rem;\n        font-family: $drawer-input-font;\n        transition: border-color 0.2s, box-shadow 0.2s;\n\n        &::placeholder {\n            font-family: $drawer-input-font;\n            color: #9ca3af;\n        }\n\n        &:focus {\n            border-color: #6c5ce7;\n            box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.15);\n            outline: none;\n        }\n    }\n\n    .form-textarea {\n        resize: vertical;\n        min-height: 6rem;\n        line-height: 1.5;\n        padding: 0.75rem 1rem !important;\n    }\n\n    // PrimeNG Select \u2013 minimal styling to match PrimeNG defaults\n    .create-task-select {\n        width: 100%;\n\n        ::ng-deep .p-select {\n            width: 100%;\n\n            &:hover:not(.p-disabled) {\n                border-color: var(--sqx-color-primary);\n            }\n\n            &.p-focus {\n                border-color: var(--sqx-color-primary);\n                box-shadow: 0 0 0 0.2rem rgba(108, 92, 231, 0.2);\n            }\n        }\n    }\n\n    // PrimeNG DatePicker \u2013 same look as inputs and selects\n    .form-datepicker.p-datepicker,\n    .p-datepicker.form-datepicker,\n    .p-drawer-content p-datepicker,\n    .p-drawer-content .p-datepicker {\n        display: block;\n        width: 100% !important;\n        min-width: 0;\n        font-family: $drawer-input-font;\n\n        .p-inputtext {\n            width: 100% !important;\n            min-width: 0;\n            min-height: 2.75rem;\n            padding: $drawer-input-padding !important;\n            box-sizing: border-box;\n            border-radius: $drawer-input-radius;\n            border: $drawer-input-border;\n            font-size: 0.875rem;\n            font-family: $drawer-input-font;\n            transition: border-color 0.2s, box-shadow 0.2s;\n\n            &::placeholder {\n                font-family: $drawer-input-font;\n                color: #9ca3af;\n            }\n        }\n\n        &.p-focus .p-inputtext,\n        .p-inputtext:focus {\n            border-color: #6c5ce7;\n            box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.15);\n            outline: none;\n        }\n    }\n\n    // All text inputs in drawer content \u2013 padding and font\n    .p-drawer-content {\n        .p-inputtext {\n            width: 100% !important;\n            min-width: 0;\n            box-sizing: border-box;\n            padding: $drawer-input-padding !important;\n            font-family: $drawer-input-font;\n\n            &::placeholder {\n                font-family: $drawer-input-font;\n            }\n        }\n\n        .p-inputtextarea {\n            width: 100% !important;\n            min-width: 0;\n            box-sizing: border-box;\n            padding: 0.75rem 1rem !important;\n            font-family: $drawer-input-font;\n            font-size: 0.875rem;\n            line-height: 1.5;\n            resize: vertical;\n            min-height: 6rem;\n            border-radius: $drawer-input-radius;\n            border: $drawer-input-border;\n            transition: border-color 0.2s, box-shadow 0.2s;\n\n            &::placeholder {\n                font-family: $drawer-input-font;\n                color: #9ca3af;\n            }\n\n            &:focus {\n                border-color: #6c5ce7;\n                box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.15);\n                outline: none;\n            }\n        }\n    }\n}\n\n// Select dropdown overlay (panel) \u2013 premium list when opened from Create Task drawer\n:host ::ng-deep .p-select-overlay,\n:host ::ng-deep .p-select-panel,\n:host ::ng-deep [role=\"listbox\"] {\n    font-family: $drawer-input-font !important;\n    border-radius: $drawer-input-radius !important;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12) !important;\n    border: 1px solid #e5e7eb !important;\n    padding: 0.25rem 0 !important;\n\n    .p-select-option,\n    .p-select-option-label,\n    [role=\"option\"] {\n        font-family: $drawer-input-font !important;\n        font-size: 0.875rem !important;\n        padding: 0.625rem 1rem !important;\n        margin: 0 0.25rem;\n        border-radius: 6px;\n    }\n\n    .p-select-option.p-select-option-active,\n    .p-select-option.p-highlight,\n    [role=\"option\"][aria-selected=\"true\"] {\n        background: rgba(108, 92, 231, 0.08) !important;\n        color: #6c5ce7 !important;\n    }\n}\n\n// ========== Task Details Drawer \u2013 Premium Design ==========\n$task-details-font: 'Sen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;\n$task-details-radius: 12px;\n$task-details-radius-sm: 8px;\n$task-details-accent: #6c5ce7;\n$task-details-accent-soft: rgba(108, 92, 231, 0.08);\n$task-details-surface: #f8fafc;\n$task-details-border: #e2e8f0;\n$task-details-text: #1e293b;\n$task-details-muted: #64748b;\n$task-details-success: #059669;\n$task-details-success-bg: #ecfdf5;\n$task-details-pending-bg: #f1f5f9;\n\n::ng-deep .task-details-drawer {\n    width: 100% !important;\n    max-width: 100%;\n    font-family: $task-details-font;\n\n    @media (min-width: 768px) {\n        width: 28rem !important;\n    }\n\n    @media (min-width: 1024px) {\n        width: 32rem !important;\n    }\n\n    .p-drawer-header {\n        padding: 0;\n        border: none;\n        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\n        border-bottom: 1px solid $task-details-border;\n    }\n\n    .p-drawer-content {\n        padding: 0;\n        overflow: hidden;\n        display: flex;\n        flex-direction: column;\n        background: $task-details-surface;\n    }\n}\n\n.task-details-header {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: 1rem;\n    padding: 1.5rem 1.5rem 1.25rem;\n    width: 100%;\n}\n\n.task-details-header-main {\n    flex: 1;\n    min-width: 0;\n}\n\n.task-details-title {\n    margin: 0 0 0.75rem 0;\n    font-family: $task-details-font;\n    font-size: 1.5rem;\n    font-weight: 700;\n    line-height: 1.3;\n    letter-spacing: -0.02em;\n    color: $task-details-text;\n}\n\n.task-details-meta {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    flex-wrap: wrap;\n}\n\n.task-details-priority-tag {\n    font-size: 0.6875rem !important;\n    font-weight: 700 !important;\n    letter-spacing: 0.05em !important;\n    text-transform: uppercase !important;\n    padding: 0.25rem 0.5rem !important;\n    border-radius: 6px !important;\n}\n\n.task-details-id {\n    font-size: 0.75rem;\n    font-weight: 500;\n    color: $task-details-muted;\n    background: white;\n    padding: 0.25rem 0.5rem;\n    border-radius: 6px;\n    border: 1px solid $task-details-border;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);\n}\n\n.task-details-actions {\n    display: flex;\n    align-items: center;\n    gap: 0.25rem;\n}\n\n.task-details-action-btn {\n    width: 2.25rem !important;\n    height: 2.25rem !important;\n    border-radius: $task-details-radius-sm !important;\n    color: $task-details-muted !important;\n    transition: color 0.2s, background 0.2s !important;\n\n    &.task-details-action-edit:hover {\n        color: $task-details-accent !important;\n        background: $task-details-accent-soft !important;\n    }\n\n    &.task-details-action-delete:hover {\n        color: #dc2626 !important;\n        background: rgba(220, 38, 38, 0.08) !important;\n    }\n}\n\n.task-details-body {\n    flex: 1;\n    overflow-y: auto;\n    padding: 1.25rem 1.5rem 1.5rem;\n\n    &::-webkit-scrollbar {\n        width: 6px;\n    }\n\n    &::-webkit-scrollbar-track {\n        background: transparent;\n    }\n\n    &::-webkit-scrollbar-thumb {\n        background: #cbd5e1;\n        border-radius: 3px;\n    }\n}\n\n.task-details-content {\n    display: flex;\n    flex-direction: column;\n    gap: 1.5rem;\n}\n\n.task-details-section {\n    background: white;\n    border-radius: $task-details-radius;\n    border: 1px solid $task-details-border;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n    overflow: hidden;\n}\n\n.task-details-section-title {\n    margin: 0 0 1rem 0;\n    font-family: $task-details-font;\n    font-size: 0.6875rem;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: $task-details-muted;\n}\n\n.task-details-properties {\n    padding: 1.25rem 1.25rem 1.5rem;\n}\n\n.task-details-props-grid {\n    display: grid;\n    grid-template-columns: 1fr;\n    gap: 1.25rem;\n    margin-bottom: 1.25rem;\n}\n\n.task-details-prop {\n    display: flex;\n    flex-direction: column;\n    gap: 0.375rem;\n}\n\n.task-details-prop-label {\n    font-size: 0.6875rem;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: $task-details-muted;\n}\n\n.task-details-prop-value {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    font-size: 0.875rem;\n    font-weight: 500;\n    color: $task-details-text;\n\n    span {\n        font-family: $task-details-font;\n    }\n}\n\n.task-details-prop-icon {\n    color: $task-details-accent;\n    font-size: 0.875rem;\n    flex-shrink: 0;\n}\n\n.task-details-description-block {\n    padding-top: 1.25rem;\n    border-top: 1px solid $task-details-border;\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n}\n\n.task-details-description {\n    margin: 0;\n    font-family: $task-details-font;\n    font-size: 0.875rem;\n    line-height: 1.6;\n    color: #475569;\n    padding: 1rem;\n    background: $task-details-surface;\n    border-radius: $task-details-radius-sm;\n    border: 1px solid $task-details-border;\n}\n\n// Student Activity\n.task-details-activity {\n    padding: 1.25rem 1.25rem 1.5rem;\n}\n\n.task-details-activity-head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: 1rem;\n}\n\n.task-details-activity-count {\n    font-size: 0.75rem;\n    font-weight: 600;\n    color: $task-details-muted;\n    background: $task-details-pending-bg;\n    padding: 0.25rem 0.625rem;\n    border-radius: 999px;\n    border: 1px solid $task-details-border;\n}\n\n.task-details-activity-list {\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n}\n\n.task-details-activity-item {\n    display: flex;\n    align-items: center;\n    gap: 1rem;\n    padding: 1rem 1rem;\n    border-radius: $task-details-radius-sm;\n    border: 1px solid transparent;\n    background: $task-details-surface;\n    transition: background 0.2s, border-color 0.2s;\n\n    &:hover {\n        background: white;\n        border-color: $task-details-border;\n        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);\n    }\n}\n\n.task-details-activity-avatar {\n    border: 2px solid white !important;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;\n    flex-shrink: 0;\n}\n\n.task-details-activity-body {\n    flex: 1;\n    min-width: 0;\n    display: flex;\n    flex-direction: column;\n    gap: 0.375rem;\n}\n\n.task-details-activity-row {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 0.5rem;\n}\n\n.task-details-activity-name {\n    font-family: $task-details-font;\n    font-size: 0.875rem;\n    font-weight: 600;\n    color: $task-details-text;\n}\n\n.task-details-activity-date {\n    font-size: 0.75rem;\n    color: $task-details-muted;\n    flex-shrink: 0;\n}\n\n.task-details-status {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.375rem;\n    font-size: 0.75rem;\n    font-weight: 600;\n    padding: 0.25rem 0.5rem;\n    border-radius: 6px;\n    width: fit-content;\n\n    i {\n        font-size: 0.6875rem;\n    }\n}\n\n.task-details-status-submitted {\n    color: $task-details-success;\n    background: $task-details-success-bg;\n    border: 1px solid rgba(5, 150, 105, 0.2);\n}\n\n.task-details-status-pending {\n    color: $task-details-muted;\n    background: $task-details-pending-bg;\n    border: 1px solid $task-details-border;\n}\n\n.task-details-activity-link {\n    opacity: 0.5;\n    color: $task-details-muted !important;\n    width: 2rem !important;\n    height: 2rem !important;\n    border-radius: 6px !important;\n    transition: opacity 0.2s, color 0.2s, background 0.2s !important;\n    flex-shrink: 0;\n}\n\n.task-details-activity-item:hover .task-details-activity-link {\n    opacity: 1;\n}\n\n.task-details-activity-link:hover {\n    color: $task-details-accent !important;\n    background: $task-details-accent-soft !important;\n}\n\n// Premium Filters\n.filters-section {\n    display: flex;\n    gap: 1rem;\n    margin-bottom: 2rem;\n    flex-wrap: wrap;\n    align-items: center;\n\n    .search-box {\n        flex: 2;\n        min-width: 300px;\n        position: relative;\n\n        i {\n            position: absolute;\n            left: 1rem;\n            top: 50%;\n            transform: translateY(-50%);\n            color: #b2bec3;\n            z-index: 1;\n        }\n\n        input {\n            width: 100%;\n            padding-left: 2.5rem;\n            border-radius: 8px;\n            border: 1px solid #dfe6e9;\n            height: 42px;\n            transition: all 0.2s;\n\n            &:focus {\n                border-color: #6c5ce7;\n                box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.1);\n            }\n        }\n    }\n\n    .status-filter,\n    .date-filter,\n    .batch-filter {\n        flex: 1;\n        min-width: 180px;\n\n        ::ng-deep .p-select,\n        ::ng-deep .p-datepicker {\n            width: 100%;\n            border-radius: 8px;\n            height: 42px;\n            border-color: #dfe6e9;\n            align-items: center;\n\n            &:hover {\n                border-color: #b2bec3;\n            }\n\n            &.p-focus {\n                border-color: #6c5ce7;\n                box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.1);\n            }\n        }\n\n        ::ng-deep .p-inputtext {\n            border-radius: 8px;\n            padding-top: 0.5rem;\n            padding-bottom: 0.5rem;\n        }\n    }\n}\n\n// Drawer Customization (if Tailwind classes aren't enough)\n::ng-deep .p-drawer {\n    border: none;\n    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.05);\n\n    .p-drawer-content {\n        padding: 1.5rem;\n    }\n}\n\n.create-task-btn {\n    background: var(--sqx-color-primary) !important;\n    border: none !important;\n    box-shadow: none !important;\n\n    &:hover:not(:disabled) {\n        background: var(--sqx-color-primary-dark) !important;\n    }\n}\n\n// Global Overrides for Premium Feel\n::ng-deep .p-component {\n    font-family: 'Inter', sans-serif;\n}\n\n// List & Board styles remain...\n\n// List View Table\n.tasks-table-container {\n    background: white;\n    border-radius: 12px;\n    border: 1px solid #dfe6e9;\n    overflow: hidden;\n\n    .task-cell-content {\n        display: flex;\n        flex-direction: column;\n\n        .task-title {\n            font-weight: 600;\n            color: #2d3436;\n        }\n\n        .task-desc-truncate {\n            font-size: 13px;\n            color: #b2bec3;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            max-width: 300px;\n        }\n    }\n\n    .status-badge {\n        padding: 4px 12px;\n        border-radius: 20px;\n        font-size: 12px;\n        font-weight: 600;\n\n        &.pending {\n            background: #FFF4E5;\n            color: #FF9800;\n        }\n\n        &.in-progress {\n            background: #E3F2FD;\n            color: #2196F3;\n        }\n\n        &.completed {\n            background: #E8F5E9;\n            color: #4CAF50;\n        }\n    }\n}\n\n// Board View\n.tasks-board {\n    display: flex;\n    gap: 1.5rem;\n    overflow-x: auto;\n    padding-bottom: 1rem;\n    min-height: calc(100vh - 250px);\n\n    .board-column {\n        flex: 1;\n        min-width: 300px;\n        background: #F9FAFB;\n        border-radius: 12px;\n        padding: 1rem;\n        border: 1px solid #dfe6e9;\n\n        .column-header {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            margin-bottom: 1rem;\n            padding-bottom: 0.5rem;\n            border-bottom: 2px solid transparent;\n\n            h3 {\n                font-size: 16px;\n                font-weight: 600;\n                margin: 0;\n            }\n\n            .count {\n                background: rgba(0, 0, 0, 0.05);\n                padding: 2px 8px;\n                border-radius: 10px;\n                font-size: 12px;\n                font-weight: 600;\n            }\n\n            &.pending {\n                border-color: #FF9800;\n\n                h3 {\n                    color: #d97706;\n                }\n            }\n\n            &.in-progress {\n                border-color: #2196F3;\n\n                h3 {\n                    color: #0284c7;\n                }\n            }\n\n            &.completed {\n                border-color: #4CAF50;\n\n                h3 {\n                    color: #059669;\n                }\n            }\n        }\n\n        .column-content {\n            display: flex;\n            flex-direction: column;\n            gap: 1rem;\n        }\n    }\n}\n\n.kanban-card {\n    background: white;\n    padding: 1rem;\n    border-radius: 8px;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n    border: 1px solid transparent;\n    transition: all 0.2s;\n    cursor: pointer;\n\n    &:hover {\n        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n        border-color: #a29bfe;\n    }\n\n    .card-header {\n        display: flex;\n        justify-content: space-between;\n        margin-bottom: 0.5rem;\n\n        .mini-tag {\n            padding: 2px 6px;\n            font-size: 10px;\n        }\n\n        .due-date {\n            font-size: 12px;\n            color: #b2bec3;\n        }\n    }\n\n    h4 {\n        margin: 0 0 0.5rem 0;\n        font-size: 15px;\n        font-weight: 600;\n        color: #2d3436;\n    }\n\n    .batch-name {\n        font-size: 12px;\n        color: #b2bec3;\n        margin: 0 0 1rem 0;\n    }\n\n    .card-footer {\n        display: flex;\n        justify-content: flex-end;\n        align-items: center;\n        border-top: 1px solid #f1f2f6;\n        padding-top: 0.75rem;\n        margin-top: 0.5rem;\n\n        .progress-info {\n            font-size: 0.85rem;\n            color: #636e72;\n            font-weight: 500;\n\n            span {\n                display: flex;\n                align-items: center;\n                gap: 0.25rem;\n            }\n        }\n    }\n}\n\n// Custom Scrollbar for Drawer\n.custom-scrollbar {\n    &::-webkit-scrollbar {\n        width: 6px;\n    }\n\n    &::-webkit-scrollbar-track {\n        background: transparent;\n    }\n\n    &::-webkit-scrollbar-thumb {\n        background: #e2e8f0;\n        border-radius: 3px;\n\n        &:hover {\n            background: #cbd5e1;\n        }\n    }\n}\n\n// Premium Drawer Styles\n::ng-deep .p-drawer-header {\n    background: #fff !important;\n    padding: 0 !important;\n    display: flex;\n    align-items: center;\n}\n\n::ng-deep .p-drawer-content {\n    background: #f9fafb !important;\n    padding: 0 !important;\n}\n\n.premium-drawer-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n    padding: 1.5rem 1.5rem 0.5rem 1.5rem;\n    border-bottom: 1px solid #f8f9fa;\n    margin-bottom: 0;\n    background: #fff;\n    width: 100%;\n\n    .title-section {\n        display: flex;\n        flex-direction: column;\n        gap: 0.25rem;\n\n        h2 {\n            font-size: 1.5rem;\n            font-weight: 700;\n            color: #111827;\n            margin: 0;\n            line-height: 1.2;\n            letter-spacing: -0.02em;\n        }\n\n        .meta-badges {\n            display: flex;\n            align-items: center;\n            gap: 0.5rem;\n\n            .id-badge {\n                font-size: 0.75rem;\n                color: #9ca3af;\n                background: #f9fafb;\n                padding: 0.125rem 0.5rem;\n                border-radius: 4px;\n                border: 1px solid #f3f4f6;\n                font-family: monospace;\n            }\n        }\n    }\n}\n\n.task-details-content {\n    padding: 1.5rem;\n    display: flex;\n    flex-direction: column;\n    gap: 1.5rem;\n\n    .properties-panel {\n        display: flex;\n        flex-direction: column;\n        gap: 1.25rem;\n        background: #fff;\n        border-radius: 8px;\n        padding: 1.25rem;\n        border: 1px solid #f3f4f6;\n        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n\n        h3 {\n            font-size: 0.75rem;\n            font-weight: 700;\n            color: #9ca3af;\n            text-transform: uppercase;\n            letter-spacing: 0.05em;\n            margin: 0 0 0.5rem 0;\n        }\n\n        .property-grid {\n            display: grid;\n            grid-template-columns: 1fr;\n            gap: 1.5rem;\n        }\n\n        .property-item {\n            display: flex;\n            flex-direction: column;\n            gap: 0.375rem;\n\n            label {\n                font-size: 0.7rem;\n                font-weight: 700;\n                color: #9ca3af;\n                text-transform: uppercase;\n                letter-spacing: 0.05em;\n            }\n\n            .value {\n                display: flex;\n                align-items: center;\n                gap: 0.5rem;\n                font-size: 0.875rem;\n                font-weight: 500;\n                color: #1f2937;\n\n                i {\n                    color: #6c5ce7;\n                    font-size: 0.875rem;\n                }\n            }\n\n            p.description-text {\n                font-size: 0.875rem;\n                line-height: 1.6;\n                color: #374151;\n                background: #f9fafb;\n                padding: 1rem;\n                border-radius: 8px;\n                border: 1px solid #f3f4f6;\n                margin: 0;\n            }\n        }\n    }\n\n    .divider {\n        height: 1px;\n        background-color: #f3f4f6;\n        width: 100%;\n        margin: 0.5rem 0;\n    }\n\n    .activity-feed {\n        display: flex;\n        flex-direction: column;\n        gap: 1.5rem;\n        background: #fff;\n        border-radius: 8px;\n        padding: 1.25rem;\n        border: 1px solid #f3f4f6;\n        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n\n        .feed-header {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n\n            h3 {\n                font-size: 0.75rem;\n                font-weight: 700;\n                color: #9ca3af;\n                text-transform: uppercase;\n                letter-spacing: 0.05em;\n                margin: 0;\n            }\n\n            .count-badge {\n                font-size: 0.75rem;\n                color: #6b7280;\n                background: #f3f4f6;\n                padding: 0.125rem 0.5rem;\n                border-radius: 999px;\n                font-weight: 600;\n            }\n        }\n\n        .feed-list {\n            position: relative;\n            display: flex;\n            flex-direction: column;\n            gap: 0;\n\n            // Vertical Line\n            &::before {\n                content: '';\n                position: absolute;\n                left: 20px;\n                top: 1rem;\n                bottom: 1rem;\n                width: 1px;\n                background: #e5e7eb;\n                z-index: 0;\n            }\n\n            .feed-item {\n                display: flex;\n                align-items: flex-start;\n                gap: 1rem;\n                padding: 0.75rem;\n                border-radius: 8px;\n                position: relative;\n                z-index: 1;\n                background: transparent;\n                transition: all 0.2s;\n                margin: 0 -0.75rem; // Negative margin to align content with grid but allow hover bg\n\n                &:hover {\n                    background-color: #f9fafb;\n\n                    .action-btn {\n                        opacity: 1;\n                    }\n                }\n\n                .avatar-wrapper {\n                    background: white;\n                    border-radius: 50%;\n                    padding: 2px;\n                    border: 1px solid #fff;\n                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n                    z-index: 2;\n                    flex-shrink: 0;\n                }\n\n                .feed-content {\n                    flex: 1;\n                    display: flex;\n                    flex-direction: column;\n                    gap: 0.25rem;\n                    min-width: 0; // Truncation fix\n\n                    .top-row {\n                        display: flex;\n                        align-items: center;\n                        justify-content: space-between;\n                        gap: 0.5rem;\n                    }\n\n                    .student-name {\n                        font-size: 0.875rem;\n                        font-weight: 600;\n                        color: #111827;\n                    }\n\n                    .timestamp {\n                        font-size: 0.75rem;\n                        color: #9ca3af;\n                        white-space: nowrap;\n                    }\n\n                    .status-badge {\n                        display: inline-flex;\n                        align-items: center;\n                        gap: 0.375rem;\n                        font-size: 0.75rem;\n                        font-weight: 500;\n                        padding: 0.125rem 0.5rem;\n                        border-radius: 4px;\n                        width: fit-content;\n                        margin-top: 0.125rem;\n\n                        &.submitted {\n                            color: #059669;\n                            background: #ecfdf5;\n                            border: 1px solid #d1fae5;\n                        }\n\n                        &.pending {\n                            color: #6b7280;\n                            background: #f3f4f6;\n                            border: 1px solid #e5e7eb;\n                        }\n                    }\n                }\n\n                .action-btn {\n                    opacity: 0;\n                    transition: opacity 0.2s;\n                    color: #9ca3af;\n\n                    &:hover {\n                        color: #6c5ce7;\n                        background: rgba(108, 92, 231, 0.1);\n                    }\n                }\n            }\n        }\n    }\n}\n\n// Footer Overrides\n::ng-deep .p-drawer-footer {\n    border-top: 1px solid #f3f4f6;\n}\n\n.drawer-footer {\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    gap: 0.75rem;\n    width: 100%;\n    padding: 1rem 1.5rem; // Add padding inside to match drawer content\n\n    button {\n        font-size: 0.875rem;\n    }\n}\n\n// Create/Edit Task Drawer Styles\n::ng-deep .create-task-drawer {\n    .p-drawer-header {\n        padding: 0;\n        background: white;\n    }\n\n    .p-drawer-content {\n        padding: 0; // Reset padding to handle scrollable content\n    }\n\n}\n\n.create-task-wrapper {\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n    background: white;\n}\n\n// Content Scroll Area\n.create-task-content {\n    flex: 1;\n    overflow-y: auto;\n    padding: 1.5rem;\n}\n\n.create-task-form {\n    display: flex;\n    flex-direction: column;\n    gap: 1.5rem;\n}\n\n.form-field {\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n}\n\n.form-label {\n    font-size: 0.875rem;\n    font-weight: 600;\n    color: #374151;\n}\n\n.form-input,\n.form-textarea {\n    width: 100%;\n    padding: 0.75rem 1rem;\n    border-radius: 8px;\n    border: 1px solid #e5e7eb;\n    font-size: 0.95rem;\n    transition: all 0.2s;\n\n    &:focus {\n        border-color: #6c5ce7;\n        box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.1);\n    }\n}\n\n.form-row {\n    display: flex;\n    gap: 1.5rem;\n\n    &.form-row-2 {\n        .form-field {\n            flex: 1;\n        }\n    }\n}\n\n// Consistent with custom footer\n.create-task-drawer-footer {\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    gap: 0.75rem;\n    padding: 1rem 1.5rem;\n    border-top: 1px solid #f3f4f6;\n}"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Tasks, { className: "Tasks", filePath: "src/app/modules/tasks/tasks/tasks.ts", lineNumber: 87 }); })();
