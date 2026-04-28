import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { AuthService, } from '../core/services/auth.service';
import { getFriendlyErrorMessage } from '../../shared/utils/error-messages.util';
import { ChipModule } from 'primeng/chip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "primeng/button";
import * as i3 from "primeng/api";
import * as i4 from "primeng/inputtext";
import * as i5 from "primeng/iconfield";
import * as i6 from "primeng/inputicon";
import * as i7 from "primeng/floatlabel";
import * as i8 from "primeng/table";
import * as i9 from "primeng/select";
import * as i10 from "primeng/multiselect";
import * as i11 from "primeng/toast";
import * as i12 from "primeng/tag";
import * as i13 from "primeng/tooltip";
const _c0 = () => [5, 10, 25];
const _c1 = () => ({ "min-width": "50rem" });
const _c2 = () => ({ standalone: true });
const _c3 = () => ({ "min-width": "40rem" });
const _forTrack0 = ($index, $item) => $item.courseId;
const _forTrack1 = ($index, $item) => $item.batchId;
function AddUsersComponent_Conditional_2_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Add Admin or Instructor ");
} }
function AddUsersComponent_Conditional_2_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Add Instructor ");
} }
function AddUsersComponent_Conditional_2_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Add Admins and Instructors by name and email. They will receive an email to set their password. ");
} }
function AddUsersComponent_Conditional_2_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Add Instructors by name and email. They will receive an email to set their password. ");
} }
function AddUsersComponent_Conditional_2_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 20);
    i0.ɵɵtext(1, "First name is required.");
    i0.ɵɵelementEnd();
} }
function AddUsersComponent_Conditional_2_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 20);
    i0.ɵɵtext(1, "Enter a valid first name (letters and spaces only).");
    i0.ɵɵelementEnd();
} }
function AddUsersComponent_Conditional_2_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 20);
    i0.ɵɵtext(1, "Last name is required.");
    i0.ɵɵelementEnd();
} }
function AddUsersComponent_Conditional_2_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 20);
    i0.ɵɵtext(1, "Enter a valid last name (letters and spaces only).");
    i0.ɵɵelementEnd();
} }
function AddUsersComponent_Conditional_2_Conditional_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 20);
    i0.ɵɵtext(1, "Email address is required.");
    i0.ɵɵelementEnd();
} }
function AddUsersComponent_Conditional_2_Conditional_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 20);
    i0.ɵɵtext(1, "Enter a valid email address.");
    i0.ɵɵelementEnd();
} }
function AddUsersComponent_Conditional_2_Conditional_44_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 13)(1, "p-floatlabel", 14)(2, "p-iconfield", 15);
    i0.ɵɵelement(3, "p-inputicon", 29);
    i0.ɵɵelementStart(4, "p-select", 30);
    i0.ɵɵtwoWayListener("ngModelChange", function AddUsersComponent_Conditional_2_Conditional_44_Template_p_select_ngModelChange_4_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.selectedRole, $event) || (ctx_r1.selectedRole = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "label", 31);
    i0.ɵɵtext(6, "Role ");
    i0.ɵɵelementStart(7, "span", 19);
    i0.ɵɵtext(8, "*");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r1.roleOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.selectedRole);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(3, _c2));
} }
function AddUsersComponent_Conditional_2_Conditional_45_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 35);
    i0.ɵɵtext(1, "No courses in the system yet. Run the seed script from the server folder: ");
    i0.ɵɵelementStart(2, "code");
    i0.ɵɵtext(3, "node scripts/seed-courses.cjs");
    i0.ɵɵelementEnd()();
} }
function AddUsersComponent_Conditional_2_Conditional_45_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 26)(1, "div", 32)(2, "label", 33);
    i0.ɵɵtext(3, "Assign to courses");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p-multiSelect", 34);
    i0.ɵɵtwoWayListener("ngModelChange", function AddUsersComponent_Conditional_2_Conditional_45_Template_p_multiSelect_ngModelChange_4_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.selectedCourses, $event) || (ctx_r1.selectedCourses = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("onFocus", function AddUsersComponent_Conditional_2_Conditional_45_Template_p_multiSelect_onFocus_4_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.loadCourses()); });
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, AddUsersComponent_Conditional_2_Conditional_45_Conditional_5_Template, 4, 0, "small", 35);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r1.courses());
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.selectedCourses);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(6, _c2))("showClear", true)("loading", ctx_r1.coursesLoading());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.courses().length === 0 ? 5 : -1);
} }
function AddUsersComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1)(1, "div", 3)(2, "h3", 4);
    i0.ɵɵconditionalCreate(3, AddUsersComponent_Conditional_2_Conditional_3_Template, 1, 0)(4, AddUsersComponent_Conditional_2_Conditional_4_Template, 1, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 5);
    i0.ɵɵconditionalCreate(6, AddUsersComponent_Conditional_2_Conditional_6_Template, 1, 0)(7, AddUsersComponent_Conditional_2_Conditional_7_Template, 1, 0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "form", 11);
    i0.ɵɵlistener("ngSubmit", function AddUsersComponent_Conditional_2_Template_form_ngSubmit_8_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵelementStart(9, "div", 12)(10, "div", 13)(11, "p-floatlabel", 14)(12, "p-iconfield", 15);
    i0.ɵɵelement(13, "p-inputicon", 16)(14, "input", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "label", 18);
    i0.ɵɵtext(16, "First Name ");
    i0.ɵɵelementStart(17, "span", 19);
    i0.ɵɵtext(18, "*");
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(19, AddUsersComponent_Conditional_2_Conditional_19_Template, 2, 0, "small", 20);
    i0.ɵɵconditionalCreate(20, AddUsersComponent_Conditional_2_Conditional_20_Template, 2, 0, "small", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 13)(22, "p-floatlabel", 14)(23, "p-iconfield", 15);
    i0.ɵɵelement(24, "p-inputicon", 16)(25, "input", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "label", 22);
    i0.ɵɵtext(27, "Last Name ");
    i0.ɵɵelementStart(28, "span", 19);
    i0.ɵɵtext(29, "*");
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(30, AddUsersComponent_Conditional_2_Conditional_30_Template, 2, 0, "small", 20);
    i0.ɵɵconditionalCreate(31, AddUsersComponent_Conditional_2_Conditional_31_Template, 2, 0, "small", 20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "div", 12)(33, "div", 13)(34, "p-floatlabel", 14)(35, "p-iconfield", 15);
    i0.ɵɵelement(36, "p-inputicon", 23)(37, "input", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "label", 25);
    i0.ɵɵtext(39, "Email Address ");
    i0.ɵɵelementStart(40, "span", 19);
    i0.ɵɵtext(41, "*");
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(42, AddUsersComponent_Conditional_2_Conditional_42_Template, 2, 0, "small", 20);
    i0.ɵɵconditionalCreate(43, AddUsersComponent_Conditional_2_Conditional_43_Template, 2, 0, "small", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(44, AddUsersComponent_Conditional_2_Conditional_44_Template, 9, 4, "div", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(45, AddUsersComponent_Conditional_2_Conditional_45_Template, 6, 7, "div", 26);
    i0.ɵɵelementStart(46, "div", 27);
    i0.ɵɵelement(47, "p-button", 28);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.auth.isSuperAdmin() ? 3 : 4);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.auth.isSuperAdmin() ? 6 : 7);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("formGroup", ctx_r1.form);
    i0.ɵɵadvance(11);
    i0.ɵɵconditional(((tmp_4_0 = ctx_r1.form.get("firstName")) == null ? null : tmp_4_0.touched) && ((tmp_4_0 = ctx_r1.form.get("firstName")) == null ? null : tmp_4_0.hasError("required")) ? 19 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(((tmp_5_0 = ctx_r1.form.get("firstName")) == null ? null : tmp_5_0.touched) && ((tmp_5_0 = ctx_r1.form.get("firstName")) == null ? null : tmp_5_0.hasError("pattern")) ? 20 : -1);
    i0.ɵɵadvance(10);
    i0.ɵɵconditional(((tmp_6_0 = ctx_r1.form.get("lastName")) == null ? null : tmp_6_0.touched) && ((tmp_6_0 = ctx_r1.form.get("lastName")) == null ? null : tmp_6_0.hasError("required")) ? 30 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(((tmp_7_0 = ctx_r1.form.get("lastName")) == null ? null : tmp_7_0.touched) && ((tmp_7_0 = ctx_r1.form.get("lastName")) == null ? null : tmp_7_0.hasError("pattern")) ? 31 : -1);
    i0.ɵɵadvance(11);
    i0.ɵɵconditional(((tmp_8_0 = ctx_r1.form.get("email")) == null ? null : tmp_8_0.touched) && ((tmp_8_0 = ctx_r1.form.get("email")) == null ? null : tmp_8_0.hasError("required")) ? 42 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(((tmp_9_0 = ctx_r1.form.get("email")) == null ? null : tmp_9_0.touched) && ((tmp_9_0 = ctx_r1.form.get("email")) == null ? null : tmp_9_0.hasError("email")) ? 43 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.roleOptions.length > 1 ? 44 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional((ctx_r1.selectedRole == null ? null : ctx_r1.selectedRole.value) === "instructor" ? 45 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("loading", ctx_r1.submitting())("disabled", ctx_r1.submitting() || ctx_r1.form.invalid);
} }
function AddUsersComponent_Conditional_3_ng_template_7_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 39);
    i0.ɵɵtext(1, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "th", 39);
    i0.ɵɵtext(3, "Actions");
    i0.ɵɵelementEnd();
} }
function AddUsersComponent_Conditional_3_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th", 37);
    i0.ɵɵtext(2, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th", 38);
    i0.ɵɵtext(4, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th", 39);
    i0.ɵɵtext(6, "Role");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 39);
    i0.ɵɵtext(8, "Head");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(9, AddUsersComponent_Conditional_3_ng_template_7_Conditional_9_Template, 4, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(9);
    i0.ɵɵconditional(ctx_r1.showActions ? 9 : -1);
} }
function AddUsersComponent_Conditional_3_ng_template_8_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 43)(1, "input", 45);
    i0.ɵɵlistener("change", function AddUsersComponent_Conditional_3_ng_template_8_Conditional_12_Template_input_change_1_listener($event) { i0.ɵɵrestoreView(_r5); const user_r6 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onHeadToggle(user_r6.id, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(2, "span", 46);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("pTooltip", user_r6.canManageUsers ? "Revoke head permission" : "Grant head permission: this Admin can add users and activate/deactivate");
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", user_r6.canManageUsers);
} }
function AddUsersComponent_Conditional_3_ng_template_8_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 44);
    i0.ɵɵtext(1, "\u2014");
    i0.ɵɵelementEnd();
} }
function AddUsersComponent_Conditional_3_ng_template_8_Conditional_14_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-button", 49);
    i0.ɵɵlistener("click", function AddUsersComponent_Conditional_3_ng_template_8_Conditional_14_Conditional_3_Template_p_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const user_r6 = i0.ɵɵnextContext(2).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setUserStatus(user_r6.id, false)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("text", true);
} }
function AddUsersComponent_Conditional_3_ng_template_8_Conditional_14_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-button", 50);
    i0.ɵɵlistener("click", function AddUsersComponent_Conditional_3_ng_template_8_Conditional_14_Conditional_4_Template_p_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const user_r6 = i0.ɵɵnextContext(2).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setUserStatus(user_r6.id, true)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("text", true);
} }
function AddUsersComponent_Conditional_3_ng_template_8_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵelement(1, "p-tag", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "td");
    i0.ɵɵconditionalCreate(3, AddUsersComponent_Conditional_3_ng_template_8_Conditional_14_Conditional_3_Template, 1, 1, "p-button", 47)(4, AddUsersComponent_Conditional_3_ng_template_8_Conditional_14_Conditional_4_Template, 1, 1, "p-button", 48);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r1.isActive(user_r6) ? "Active" : "Inactive")("severity", ctx_r1.isActive(user_r6) ? "success" : "danger");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.isActive(user_r6) ? 3 : 4);
} }
function AddUsersComponent_Conditional_3_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "div", 40)(3, "div", 41);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵelement(10, "p-tag", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵconditionalCreate(12, AddUsersComponent_Conditional_3_ng_template_8_Conditional_12_Template, 3, 2, "label", 43)(13, AddUsersComponent_Conditional_3_ng_template_8_Conditional_13_Template, 2, 0, "span", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(14, AddUsersComponent_Conditional_3_ng_template_8_Conditional_14_Template, 5, 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", user_r6.firstName == null ? null : user_r6.firstName.charAt(0), "", user_r6.lastName == null ? null : user_r6.lastName.charAt(0));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r6.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r6.email);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r1.roleLabel(user_r6.role))("severity", ctx_r1.getRoleSeverity(user_r6.role));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(user_r6.role === "admin" ? 12 : 13);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.showActions ? 14 : -1);
} }
function AddUsersComponent_Conditional_3_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 51);
    i0.ɵɵelement(2, "i", 52);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "No admins yet. Add one using the form above.");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵattribute("colspan", ctx_r1.showActions ? 6 : 4);
} }
function AddUsersComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2)(1, "div", 3)(2, "h3", 4);
    i0.ɵɵtext(3, "Admins");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 5);
    i0.ɵɵtext(5, "Super Admin and Admin users.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p-table", 36);
    i0.ɵɵtemplate(7, AddUsersComponent_Conditional_3_ng_template_7_Template, 10, 1, "ng-template", 7)(8, AddUsersComponent_Conditional_3_ng_template_8_Template, 15, 8, "ng-template", 8)(9, AddUsersComponent_Conditional_3_ng_template_9_Template, 5, 1, "ng-template", 9);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("value", ctx_r1.admins())("loading", ctx_r1.loading())("paginator", ctx_r1.admins().length > 0)("rows", 10)("showCurrentPageReport", ctx_r1.admins().length > 0)("rowsPerPageOptions", i0.ɵɵpureFunction0(7, _c0))("tableStyle", i0.ɵɵpureFunction0(8, _c1));
} }
function AddUsersComponent_Conditional_4_ng_template_7_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 55);
    i0.ɵɵtext(1, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "th", 56);
    i0.ɵɵtext(3, "Actions");
    i0.ɵɵelementEnd();
} }
function AddUsersComponent_Conditional_4_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th", 54);
    i0.ɵɵtext(2, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th", 38);
    i0.ɵɵtext(4, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th", 55);
    i0.ɵɵtext(6, "Courses");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 55);
    i0.ɵɵtext(8, "Batches");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th", 39);
    i0.ɵɵtext(10, "Role");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(11, AddUsersComponent_Conditional_4_ng_template_7_Conditional_11_Template, 4, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(11);
    i0.ɵɵconditional(ctx_r1.showActions ? 11 : -1);
} }
function AddUsersComponent_Conditional_4_ng_template_8_Conditional_15_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-button", 49);
    i0.ɵɵlistener("click", function AddUsersComponent_Conditional_4_ng_template_8_Conditional_15_Conditional_3_Template_p_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const user_r10 = i0.ɵɵnextContext(2).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setUserStatus(user_r10.id, false)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("text", true);
} }
function AddUsersComponent_Conditional_4_ng_template_8_Conditional_15_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-button", 50);
    i0.ɵɵlistener("click", function AddUsersComponent_Conditional_4_ng_template_8_Conditional_15_Conditional_4_Template_p_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const user_r10 = i0.ɵɵnextContext(2).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setUserStatus(user_r10.id, true)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("text", true);
} }
function AddUsersComponent_Conditional_4_ng_template_8_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵelement(1, "p-tag", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "td");
    i0.ɵɵconditionalCreate(3, AddUsersComponent_Conditional_4_ng_template_8_Conditional_15_Conditional_3_Template, 1, 1, "p-button", 47)(4, AddUsersComponent_Conditional_4_ng_template_8_Conditional_15_Conditional_4_Template, 1, 1, "p-button", 48);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r10 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r1.isActive(user_r10) ? "Active" : "Inactive")("severity", ctx_r1.isActive(user_r10) ? "success" : "danger");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.isActive(user_r10) ? 3 : 4);
} }
function AddUsersComponent_Conditional_4_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "div", 40)(3, "div", 41);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td");
    i0.ɵɵelement(14, "p-tag", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(15, AddUsersComponent_Conditional_4_ng_template_8_Conditional_15_Template, 5, 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r10 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", user_r10.firstName == null ? null : user_r10.firstName.charAt(0), "", user_r10.lastName == null ? null : user_r10.lastName.charAt(0));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r10.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r10.email);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r10.courseCount);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r10.batchCount);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r1.roleLabel(user_r10.role))("severity", ctx_r1.getRoleSeverity(user_r10.role));
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.showActions ? 15 : -1);
} }
function AddUsersComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2)(1, "div", 3)(2, "h3", 4);
    i0.ɵɵtext(3, "Instructors");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 5);
    i0.ɵɵtext(5, "Instructors with course and batch counts.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p-table", 53);
    i0.ɵɵtemplate(7, AddUsersComponent_Conditional_4_ng_template_7_Template, 12, 1, "ng-template", 7)(8, AddUsersComponent_Conditional_4_ng_template_8_Template, 16, 9, "ng-template", 8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("value", ctx_r1.instructors())("loading", ctx_r1.loading())("paginator", true)("rows", 10)("showCurrentPageReport", true)("rowsPerPageOptions", i0.ɵɵpureFunction0(7, _c0))("tableStyle", i0.ɵɵpureFunction0(8, _c1));
} }
function AddUsersComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Students (your courses) ");
} }
function AddUsersComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Students ");
} }
function AddUsersComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Students registered in batches of courses you teach. ");
} }
function AddUsersComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " All students in the system. ");
} }
function AddUsersComponent_ng_template_14_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 39);
    i0.ɵɵtext(1, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "th", 56);
    i0.ɵɵtext(3, "Actions");
    i0.ɵɵelementEnd();
} }
function AddUsersComponent_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th", 38);
    i0.ɵɵtext(2, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th", 57);
    i0.ɵɵtext(4, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th", 58);
    i0.ɵɵtext(6, "Role");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, AddUsersComponent_ng_template_14_Conditional_7_Template, 4, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵconditional(ctx_r1.showActions ? 7 : -1);
} }
function AddUsersComponent_ng_template_15_Conditional_11_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-button", 49);
    i0.ɵɵlistener("click", function AddUsersComponent_ng_template_15_Conditional_11_Conditional_3_Template_p_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const user_r13 = i0.ɵɵnextContext(2).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setUserStatus(user_r13.id, false)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("text", true);
} }
function AddUsersComponent_ng_template_15_Conditional_11_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-button", 50);
    i0.ɵɵlistener("click", function AddUsersComponent_ng_template_15_Conditional_11_Conditional_4_Template_p_button_click_0_listener() { i0.ɵɵrestoreView(_r14); const user_r13 = i0.ɵɵnextContext(2).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setUserStatus(user_r13.id, true)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("text", true);
} }
function AddUsersComponent_ng_template_15_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵelement(1, "p-tag", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "td");
    i0.ɵɵconditionalCreate(3, AddUsersComponent_ng_template_15_Conditional_11_Conditional_3_Template, 1, 1, "p-button", 47)(4, AddUsersComponent_ng_template_15_Conditional_11_Conditional_4_Template, 1, 1, "p-button", 48);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r13 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r1.isActive(user_r13) ? "Active" : "Inactive")("severity", ctx_r1.isActive(user_r13) ? "success" : "danger");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.isActive(user_r13) ? 3 : 4);
} }
function AddUsersComponent_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "div", 40)(3, "div", 41);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵelement(10, "p-tag", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(11, AddUsersComponent_ng_template_15_Conditional_11_Template, 5, 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r13 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", user_r13.firstName == null ? null : user_r13.firstName.charAt(0), "", user_r13.lastName == null ? null : user_r13.lastName.charAt(0));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r13.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r13.email);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r1.roleLabel(user_r13.role))("severity", ctx_r1.getRoleSeverity(user_r13.role));
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.showActions ? 11 : -1);
} }
function AddUsersComponent_ng_template_16_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " No students in your courses yet. ");
} }
function AddUsersComponent_ng_template_16_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " No students found. ");
} }
function AddUsersComponent_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 51);
    i0.ɵɵelement(2, "i", 52);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵconditionalCreate(4, AddUsersComponent_ng_template_16_Conditional_4_Template, 1, 0)(5, AddUsersComponent_ng_template_16_Conditional_5_Template, 1, 0);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵattribute("colspan", ctx_r1.showActions ? 5 : 3);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.view() === "instructor" ? 4 : 5);
} }
function AddUsersComponent_Conditional_17_For_7_For_4_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Email");
    i0.ɵɵelementEnd()();
} }
function AddUsersComponent_Conditional_17_For_7_For_4_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const user_r15 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r15.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r15.email);
} }
function AddUsersComponent_Conditional_17_For_7_For_4_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 64);
    i0.ɵɵtext(2, "No students in this batch.");
    i0.ɵɵelementEnd()();
} }
function AddUsersComponent_Conditional_17_For_7_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 61)(1, "h5", 62);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-table", 63);
    i0.ɵɵtemplate(4, AddUsersComponent_Conditional_17_For_7_For_4_ng_template_4_Template, 5, 0, "ng-template", 7)(5, AddUsersComponent_Conditional_17_For_7_For_4_ng_template_5_Template, 5, 2, "ng-template", 8)(6, AddUsersComponent_Conditional_17_For_7_For_4_ng_template_6_Template, 3, 0, "ng-template", 9);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const batch_r16 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(batch_r16.batchName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", batch_r16.students)("tableStyle", i0.ɵɵpureFunction0(3, _c3));
} }
function AddUsersComponent_Conditional_17_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 59)(1, "h4", 60);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(3, AddUsersComponent_Conditional_17_For_7_For_4_Template, 7, 4, "div", 61, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const course_r17 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(course_r17.courseName);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(course_r17.batches);
} }
function AddUsersComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 3)(2, "h3", 4);
    i0.ɵɵtext(3, "Students by Batch & Course");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 5);
    i0.ɵɵtext(5, "Students grouped by course and batch.");
    i0.ɵɵelementEnd()();
    i0.ɵɵrepeaterCreate(6, AddUsersComponent_Conditional_17_For_7_Template, 5, 1, "div", 59, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(ctx_r1.batchesByCourse());
} }
export class AddUsersComponent {
    fb = inject(FormBuilder);
    auth = inject(AuthService);
    messageService = inject(MessageService);
    loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    submitting = signal(false, ...(ngDevMode ? [{ debugName: "submitting" }] : []));
    view = signal(null, ...(ngDevMode ? [{ debugName: "view" }] : []));
    admins = signal([], ...(ngDevMode ? [{ debugName: "admins" }] : []));
    instructors = signal([], ...(ngDevMode ? [{ debugName: "instructors" }] : []));
    students = signal([], ...(ngDevMode ? [{ debugName: "students" }] : []));
    batchesByCourse = signal([], ...(ngDevMode ? [{ debugName: "batchesByCourse" }] : []));
    roleOptions = [];
    selectedRole = null;
    courses = signal([], ...(ngDevMode ? [{ debugName: "courses" }] : []));
    coursesLoading = signal(false, ...(ngDevMode ? [{ debugName: "coursesLoading" }] : []));
    selectedCourses = [];
    form;
    constructor() {
        this.form = this.fb.group({
            firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
            lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
            email: ['', [Validators.required, Validators.email]],
        });
    }
    ngOnInit() {
        this.roleOptions = this.auth.getAddableRoles();
        if (this.roleOptions.length > 0) {
            this.selectedRole = this.roleOptions[this.roleOptions.length - 1];
        }
        this.loadUsers();
        if (this.auth.canDoUserCUD()) {
            this.loadCourses();
        }
    }
    /** Load courses from API (for Assign to courses). Call on init and when opening the dropdown. */
    loadCourses() {
        if (!this.auth.canDoUserCUD())
            return;
        this.coursesLoading.set(true);
        this.auth.listCourses().subscribe({
            next: (list) => {
                this.courses.set(list);
                this.coursesLoading.set(false);
            },
            error: (err) => {
                this.courses.set([]);
                this.coursesLoading.set(false);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Could not load courses',
                    detail: getFriendlyErrorMessage(err, {
                        default: 'Unable to load courses. Check your connection and try again.',
                        notFound: 'Courses could not be loaded. Please refresh and try again.',
                        network: 'Unable to connect. Please check your connection.',
                    }),
                });
            },
        });
    }
    loadUsers() {
        this.loading.set(true);
        this.auth.listUsers().subscribe({
            next: (res) => {
                this.view.set(res.view);
                if (res.view === 'sa') {
                    this.admins.set(res.admins);
                    this.instructors.set(res.instructors);
                    this.students.set(res.students);
                    this.batchesByCourse.set(res.batchesByCourse);
                }
                else if (res.view === 'admin') {
                    this.instructors.set(res.instructors);
                    this.students.set(res.students);
                    this.admins.set([]);
                    this.batchesByCourse.set([]);
                }
                else {
                    this.students.set(res.students);
                    this.admins.set([]);
                    this.instructors.set([]);
                    this.batchesByCourse.set([]);
                }
                this.loading.set(false);
            },
            error: (err) => {
                this.loading.set(false);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: getFriendlyErrorMessage(err),
                });
            },
        });
    }
    /** True if current role can add users (SA only; Admin is view-only until SA grants head option). */
    get showAddUserForm() {
        return this.auth.canDoUserCUD();
    }
    /** True if current role can activate/deactivate users (SA only). Admin has no C,U,D until SA grants option. */
    get showActions() {
        return this.auth.canDoUserCUD();
    }
    setUserStatus(userId, active) {
        this.auth.setUserStatus(userId, active).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: active ? 'User activated' : 'User deactivated',
                    detail: active ? 'The user can sign in again.' : 'The user has been deactivated and cannot sign in until reactivated.',
                });
                this.loadUsers();
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: getFriendlyErrorMessage(err, {
                        default: 'Could not update user status. Please try again.',
                        notFound: 'User not found or the request could not be completed. Please refresh the page and try again.',
                        network: 'Unable to connect. Please check your connection and try again.',
                    }),
                });
            },
        });
    }
    /** SA only: toggle head permission from checkbox change event. */
    onHeadToggle(userId, event) {
        const head = event.target.checked;
        this.setHeadPermission(userId, head);
    }
    /** SA only: grant or revoke head permission for an Admin. That Admin can then add users and set user status. */
    setHeadPermission(userId, head) {
        this.auth.setHeadPermission(userId, head).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: head ? 'Head granted' : 'Head revoked',
                    detail: head ? 'This Admin can now add users and activate/deactivate users.' : 'This Admin can no longer add users or change status.',
                });
                this.loadUsers();
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: getFriendlyErrorMessage(err, {
                        default: 'Could not update head permission. Please try again.',
                        network: 'Unable to connect. Please check your connection and try again.',
                    }),
                });
            },
        });
    }
    isActive(user) {
        return user.isActive !== false;
    }
    submit() {
        if (this.form.invalid || !this.selectedRole) {
            this.form.markAllAsTouched();
            return;
        }
        const value = this.form.getRawValue();
        const role = this.selectedRole.value;
        this.submitting.set(true);
        const body = {
            firstName: value.firstName,
            lastName: value.lastName,
            email: value.email,
            role,
        };
        if (role === 'instructor' && this.selectedCourses.length > 0) {
            body.courseIds = this.selectedCourses.map((c) => c.id);
        }
        this.auth.createUser(body).subscribe({
            next: (res) => {
                this.submitting.set(false);
                if ('access_token' in res) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'User created',
                        detail: 'User has been added and can log in.',
                    });
                }
                else {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Invitation sent',
                        detail: res.message,
                    });
                }
                this.form.reset();
                this.selectedCourses = [];
                if (this.roleOptions.length > 0) {
                    this.selectedRole = this.roleOptions[this.roleOptions.length - 1];
                }
                this.loadUsers();
            },
            error: (err) => {
                this.submitting.set(false);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: getFriendlyErrorMessage(err),
                });
            },
        });
    }
    getRoleSeverity(role) {
        switch (role) {
            case 'super_admin': return 'danger';
            case 'admin': return 'info';
            case 'instructor': return 'success';
            default: return 'secondary';
        }
    }
    roleLabel(role) {
        const map = {
            super_admin: 'Super Admin',
            admin: 'Admin',
            instructor: 'Instructor',
            student: 'Student',
        };
        return map[role] ?? role;
    }
    static ɵfac = function AddUsersComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AddUsersComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AddUsersComponent, selectors: [["sqx-add-users"]], features: [i0.ɵɵProvidersFeature([MessageService])], decls: 18, vars: 15, consts: [[1, "page-container"], [1, "form-card"], [1, "table-card"], [1, "card-header"], [1, "card-title"], [1, "card-subtitle"], ["currentPageReportTemplate", "Showing {first} to {last} of {totalRecords} students", "styleClass", "p-datatable-striped", 3, "value", "loading", "paginator", "rows", "showCurrentPageReport", "rowsPerPageOptions", "tableStyle"], ["pTemplate", "header"], ["pTemplate", "body"], ["pTemplate", "emptymessage"], [1, "table-card", "batches-by-course"], [1, "add-form", 3, "ngSubmit", "formGroup"], [1, "form-row"], [1, "form-field"], ["variant", "on", 1, "w-full"], [1, "w-full"], [1, "pi", "pi-user"], ["pInputText", "", "id", "firstName", "formControlName", "firstName", 1, "w-full"], ["for", "firstName"], [1, "required"], [1, "p-error"], ["pInputText", "", "id", "lastName", "formControlName", "lastName", 1, "w-full"], ["for", "lastName"], [1, "pi", "pi-envelope"], ["pInputText", "", "id", "email", "type", "email", "formControlName", "email", 1, "w-full"], ["for", "email"], [1, "form-row", "form-field"], [1, "form-actions"], ["type", "submit", "label", "Send Invitation", "icon", "pi pi-send", 3, "loading", "disabled"], [1, "pi", "pi-id-card"], ["id", "role", "optionLabel", "label", 1, "w-full", 3, "ngModelChange", "options", "ngModel", "ngModelOptions"], ["for", "role"], [1, "form-field", "w-full", "assign-courses-field"], [1, "block", "mb-2", "font-medium", "text-color"], ["optionLabel", "name", "placeholder", "Select courses to assign", "display", "chip", 1, "w-full", "assign-course-select", 3, "ngModelChange", "onFocus", "options", "ngModel", "ngModelOptions", "showClear", "loading"], [1, "assign-courses-empty-hint"], ["currentPageReportTemplate", "Showing {first} to {last} of {totalRecords} users", "styleClass", "p-datatable-striped", 3, "value", "loading", "paginator", "rows", "showCurrentPageReport", "rowsPerPageOptions", "tableStyle"], [2, "width", "24%"], [2, "width", "28%"], [2, "width", "12%"], [1, "user-name-cell"], [1, "user-avatar"], [3, "value", "severity"], [1, "head-toggle", 3, "pTooltip"], [1, "text-muted"], ["type", "checkbox", 3, "change", "checked"], [1, "head-toggle-slider"], ["icon", "pi pi-ban", "pTooltip", "Deactivate", "severity", "secondary", "size", "small", 3, "text"], ["icon", "pi pi-check", "pTooltip", "Activate", "severity", "success", "size", "small", 3, "text"], ["icon", "pi pi-ban", "pTooltip", "Deactivate", "severity", "secondary", "size", "small", 3, "click", "text"], ["icon", "pi pi-check", "pTooltip", "Activate", "severity", "success", "size", "small", 3, "click", "text"], [1, "empty-message"], [1, "pi", "pi-users"], ["currentPageReportTemplate", "Showing {first} to {last} of {totalRecords} instructors", "styleClass", "p-datatable-striped", 3, "value", "loading", "paginator", "rows", "showCurrentPageReport", "rowsPerPageOptions", "tableStyle"], [2, "width", "22%"], [2, "width", "10%"], [2, "width", "8%"], [2, "width", "37%"], [2, "width", "15%"], [1, "course-group"], [1, "course-name"], [1, "batch-group"], [1, "batch-name"], ["styleClass", "p-datatable-striped p-datatable-sm", 3, "value", "tableStyle"], ["colspan", "2"]], template: function AddUsersComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "p-toast");
            i0.ɵɵconditionalCreate(2, AddUsersComponent_Conditional_2_Template, 48, 13, "div", 1);
            i0.ɵɵconditionalCreate(3, AddUsersComponent_Conditional_3_Template, 10, 9, "div", 2);
            i0.ɵɵconditionalCreate(4, AddUsersComponent_Conditional_4_Template, 9, 9, "div", 2);
            i0.ɵɵelementStart(5, "div", 2)(6, "div", 3)(7, "h3", 4);
            i0.ɵɵconditionalCreate(8, AddUsersComponent_Conditional_8_Template, 1, 0)(9, AddUsersComponent_Conditional_9_Template, 1, 0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p", 5);
            i0.ɵɵconditionalCreate(11, AddUsersComponent_Conditional_11_Template, 1, 0)(12, AddUsersComponent_Conditional_12_Template, 1, 0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "p-table", 6);
            i0.ɵɵtemplate(14, AddUsersComponent_ng_template_14_Template, 8, 1, "ng-template", 7)(15, AddUsersComponent_ng_template_15_Template, 12, 7, "ng-template", 8)(16, AddUsersComponent_ng_template_16_Template, 6, 2, "ng-template", 9);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(17, AddUsersComponent_Conditional_17_Template, 8, 0, "div", 10);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.showAddUserForm ? 2 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.view() === "sa" ? 3 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((ctx.view() === "sa" || ctx.view() === "admin") && ctx.instructors().length > 0 ? 4 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.view() === "instructor" ? 8 : 9);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.view() === "instructor" ? 11 : 12);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", ctx.students())("loading", ctx.loading())("paginator", true)("rows", 10)("showCurrentPageReport", true)("rowsPerPageOptions", i0.ɵɵpureFunction0(13, _c0))("tableStyle", i0.ɵɵpureFunction0(14, _c1));
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.view() === "sa" && ctx.batchesByCourse().length > 0 ? 17 : -1);
        } }, dependencies: [CommonModule,
            ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, FormsModule, i1.NgModel, ButtonModule, i2.Button, i3.PrimeTemplate, InputTextModule, i4.InputText, IconFieldModule, i5.IconField, InputIconModule, i6.InputIcon, FloatLabelModule, i7.FloatLabel, TableModule, i8.Table, SelectModule, i9.Select, MultiSelectModule, i10.MultiSelect, ToastModule, i11.Toast, TagModule, i12.Tag, TooltipModule, i13.Tooltip, ChipModule], styles: [".page-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  background: var(--surface-ground);\n  min-height: 100%;\n}\n\n.form-card[_ngcontent-%COMP%], \n.table-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 1.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n  border: 1px solid var(--surface-border);\n}\n\n.card-header[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n\n  .card-title {\n    margin: 0 0 0.25rem 0;\n    font-size: 1.25rem;\n    font-weight: 600;\n    color: var(--text-color);\n  }\n\n  .card-subtitle {\n    margin: 0;\n    font-size: 0.875rem;\n    color: var(--text-color-secondary);\n  }\n}\n\n.add-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1.25rem;\n\n  @media (max-width: 768px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n\n.required[_ngcontent-%COMP%] {\n  color: #d32f2f;\n  font-weight: 600;\n}\n\n.course-chips[_ngcontent-%COMP%] {\n  -shadowcsshost-no-combinator ::ng-deep .course-chip {\n    .p-chip {\n      background: #f3f4f6;\n      border-radius: 6px;\n    }\n  }\n}\n\n.p-error[_ngcontent-%COMP%] {\n  color: #d32f2f;\n  font-size: 12px;\n}\n\n//[_ngcontent-%COMP%]   Head[_ngcontent-%COMP%]   permission[_ngcontent-%COMP%]   toggle[_ngcontent-%COMP%]   (switch style)\n.head-toggle[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n  width: 2.5rem;\n  height: 1.25rem;\n  cursor: pointer;\n  vertical-align: middle;\n\n  input {\n    opacity: 0;\n    width: 0;\n    height: 0;\n\n    &:checked + .head-toggle-slider {\n      background: var(--sqx-color-primary, #5B4BC4);\n    }\n\n    &:checked + .head-toggle-slider::before {\n      transform: translateX(1.25rem);\n    }\n\n    &:focus + .head-toggle-slider {\n      box-shadow: 0 0 0 2px rgba(91, 75, 196, 0.25);\n    }\n  }\n}\n\n.head-toggle-slider[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: #d1d5db;\n  border-radius: 1.25rem;\n  transition: background 0.2s;\n\n  &::before {\n    content: '';\n    position: absolute;\n    height: 1rem;\n    width: 1rem;\n    left: 0.125rem;\n    bottom: 0.125rem;\n    background: #fff;\n    border-radius: 50%;\n    transition: transform 0.2s;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);\n  }\n}\n\n//   Input   styles   matching   login   screen   exactly\n[_nghost-%COMP%]     .form-field .p-iconfield {\n  width: 100%;\n}\n\n[_nghost-%COMP%]     .form-field .p-floatlabel {\n  width: 100%;\n}\n\n[_nghost-%COMP%]     .form-field .p-inputtext {\n  width: 100%;\n  border-radius: 6px;\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  padding-left: 44px;\n  box-shadow: none;\n  font-size: 15px;\n}\n\n[_nghost-%COMP%]     .form-field .p-inputtext:focus {\n  border-color: var(--sqx-color-primary);\n  background: #ffffff;\n  box-shadow: 0 0 0 3px rgba(91, 75, 196, 0.1);\n}\n\n[_nghost-%COMP%]     .form-field .p-inputicon {\n  color: #9ca3af;\n  font-size: 16px;\n}\n\n[_nghost-%COMP%]     .form-field .p-select {\n  width: 100%;\n  border-radius: 6px;\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  box-shadow: none;\n  font-size: 15px;\n}\n\n[_nghost-%COMP%]     .form-field .p-select .p-select-label {\n  padding-left: 44px;\n}\n\n\n\n[_nghost-%COMP%]     .assign-courses-field .p-select .p-select-label {\n  padding-left: 1rem;\n}\n\n.assign-courses-empty-hint[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.5rem;\n  color: var(--sqx-color-text-light, #6b7280);\n  font-size: 0.8125rem;\n  code {\n    background: rgba(91, 75, 196, 0.08);\n    padding: 0.125rem 0.375rem;\n    border-radius: 4px;\n    font-size: 0.75rem;\n  }\n}\n[_nghost-%COMP%]     .assign-courses-field .p-select .p-select-trigger, \n[_nghost-%COMP%]     .assign-course-select .p-select-trigger {\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n}\n[_nghost-%COMP%]     .assign-courses-field .p-select .p-select-trigger-icon, \n[_nghost-%COMP%]     .assign-course-select .p-select-trigger-icon, \n[_nghost-%COMP%]     .assign-courses-field .p-select .p-icon, \n[_nghost-%COMP%]     .assign-course-select .p-select .p-icon {\n  opacity: 1;\n  visibility: visible;\n  color: var(--sqx-color-text-light);\n}\n\n[_nghost-%COMP%]     .form-field .p-select:not(.p-disabled):hover, \n[_nghost-%COMP%]     .form-field .p-select:not(.p-disabled).p-focus {\n  border-color: var(--sqx-color-primary);\n  background: #ffffff;\n  box-shadow: 0 0 0 3px rgba(91, 75, 196, 0.1);\n}\n\n[_nghost-%COMP%]     .form-field .p-floatlabel label {\n  font-size: 0.875rem;\n  color: #6b7280;\n  left: 44px;\n}\n\n[_nghost-%COMP%]     .form-field .p-floatlabel:has(.p-inputtext:focus) label, \n[_nghost-%COMP%]     .form-field .p-floatlabel:has(.p-inputtext.p-filled) label, \n[_nghost-%COMP%]     .form-field .p-floatlabel:has(.p-select.p-focus) label, \n[_nghost-%COMP%]     .form-field .p-floatlabel:has(.p-select .p-select-label:not(.p-placeholder)) label {\n  left: 12px;\n  top: 0;\n  font-size: 0.75rem;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-start;\n  margin-top: 0.5rem;\n}\n\n[_nghost-%COMP%]     .form-actions .p-button {\n  background: var(--sqx-color-primary);\n  border: none;\n  color: #ffffff;\n  transition: all 0.2s ease;\n}\n\n[_nghost-%COMP%]     .form-actions .p-button:hover:not(:disabled) {\n  background: var(--sqx-color-primary-dark);\n}\n\n[_nghost-%COMP%]     .form-actions .p-button:focus, \n[_nghost-%COMP%]     .form-actions .p-button:active {\n  background: var(--sqx-color-primary);\n  box-shadow: none;\n  outline: none;\n}\n\n[_nghost-%COMP%]     .form-actions .p-button:disabled {\n  background: var(--sqx-color-primary-light);\n  opacity: 0.7;\n}\n\n//[_ngcontent-%COMP%]   Table[_ngcontent-%COMP%]   styles\n.user-name-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.user-avatar[_ngcontent-%COMP%] {\n  min-width: 36px;\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, var(--sqx-color-primary), var(--sqx-color-primary-dark));\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n  flex-shrink: 0;\n}\n\n.empty-message[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem 1rem !important;\n  color: var(--text-color-secondary);\n\n  i {\n    font-size: 2.5rem;\n    margin-bottom: 1rem;\n    display: block;\n    opacity: 0.5;\n  }\n\n  span {\n    display: block;\n    font-size: 0.9rem;\n  }\n}\n\n//[_ngcontent-%COMP%]   Override[_ngcontent-%COMP%]   PrimeNG[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   styles[_ngcontent-%COMP%]   for[_ngcontent-%COMP%]   consistency\n[_ngcontent-%COMP%]  {\n  .p-datatable {\n    .p-datatable-header {\n      background: transparent;\n      border: none;\n      padding: 0 0 1rem 0;\n    }\n\n    .p-datatable-thead > tr > th {\n      background: var(--surface-ground);\n      color: var(--text-color-secondary);\n      font-weight: 600;\n      font-size: 0.8rem;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n      padding: 0.875rem 1rem;\n      border-bottom: 1px solid var(--surface-border);\n    }\n\n    .p-datatable-tbody > tr > td {\n      padding: 1rem;\n      border-bottom: 1px solid var(--surface-border);\n      background: #ffffff;\n    }\n\n    .p-datatable-tbody > tr:hover > td {\n      background: var(--surface-hover);\n    }\n  }\n\n  .p-paginator {\n    background: transparent;\n    border: none;\n    padding: 1rem 0 0 0;\n  }\n}\n\n//[_ngcontent-%COMP%]   Batches[_ngcontent-%COMP%]   by[_ngcontent-%COMP%]   course[_ngcontent-%COMP%]   (SA view)\n.batches-by-course[_ngcontent-%COMP%] {\n  .course-group {\n    margin-bottom: 1.5rem;\n\n    &:last-child {\n      margin-bottom: 0;\n    }\n  }\n\n  .course-name {\n    margin: 0 0 0.75rem 0;\n    font-size: 1.1rem;\n    font-weight: 600;\n    color: var(--text-color);\n  }\n\n  .batch-group {\n    margin-bottom: 1rem;\n    padding-left: 1rem;\n    border-left: 3px solid var(--primary-color);\n  }\n\n  .batch-name {\n    margin: 0 0 0.5rem 0;\n    font-size: 0.95rem;\n    font-weight: 500;\n    color: var(--text-color-secondary);\n  }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AddUsersComponent, [{
        type: Component,
        args: [{ selector: 'sqx-add-users', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    FormsModule,
                    ButtonModule,
                    InputTextModule,
                    IconFieldModule,
                    InputIconModule,
                    FloatLabelModule,
                    TableModule,
                    SelectModule,
                    MultiSelectModule,
                    ToastModule,
                    TagModule,
                    TooltipModule,
                    ChipModule,
                ], providers: [MessageService], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page-container\">\n  <p-toast />\n\n  <!-- Add User Form Card (SA & Admin only) -->\n  @if (showAddUserForm) {\n  <div class=\"form-card\">\n    <div class=\"card-header\">\n      <h3 class=\"card-title\">\n        @if (auth.isSuperAdmin()) {\n          Add Admin or Instructor\n        } @else {\n          Add Instructor\n        }\n      </h3>\n      <p class=\"card-subtitle\">\n        @if (auth.isSuperAdmin()) {\n          Add Admins and Instructors by name and email. They will receive an email to set their password.\n        } @else {\n          Add Instructors by name and email. They will receive an email to set their password.\n        }\n      </p>\n    </div>\n\n    <form [formGroup]=\"form\" (ngSubmit)=\"submit()\" class=\"add-form\">\n      <div class=\"form-row\">\n        <div class=\"form-field\">\n          <p-floatlabel variant=\"on\" class=\"w-full\">\n            <p-iconfield class=\"w-full\">\n              <p-inputicon class=\"pi pi-user\"></p-inputicon>\n              <input pInputText id=\"firstName\" formControlName=\"firstName\" class=\"w-full\" />\n            </p-iconfield>\n            <label for=\"firstName\">First Name <span class=\"required\">*</span></label>\n          </p-floatlabel>\n          @if (form.get('firstName')?.touched && form.get('firstName')?.hasError('required')) {\n            <small class=\"p-error\">First name is required.</small>\n          }\n          @if (form.get('firstName')?.touched && form.get('firstName')?.hasError('pattern')) {\n            <small class=\"p-error\">Enter a valid first name (letters and spaces only).</small>\n          }\n        </div>\n        <div class=\"form-field\">\n          <p-floatlabel variant=\"on\" class=\"w-full\">\n            <p-iconfield class=\"w-full\">\n              <p-inputicon class=\"pi pi-user\"></p-inputicon>\n              <input pInputText id=\"lastName\" formControlName=\"lastName\" class=\"w-full\" />\n            </p-iconfield>\n            <label for=\"lastName\">Last Name <span class=\"required\">*</span></label>\n          </p-floatlabel>\n          @if (form.get('lastName')?.touched && form.get('lastName')?.hasError('required')) {\n            <small class=\"p-error\">Last name is required.</small>\n          }\n          @if (form.get('lastName')?.touched && form.get('lastName')?.hasError('pattern')) {\n            <small class=\"p-error\">Enter a valid last name (letters and spaces only).</small>\n          }\n        </div>\n      </div>\n\n      <div class=\"form-row\">\n        <div class=\"form-field\">\n          <p-floatlabel variant=\"on\" class=\"w-full\">\n            <p-iconfield class=\"w-full\">\n              <p-inputicon class=\"pi pi-envelope\"></p-inputicon>\n              <input pInputText id=\"email\" type=\"email\" formControlName=\"email\" class=\"w-full\" />\n            </p-iconfield>\n            <label for=\"email\">Email Address <span class=\"required\">*</span></label>\n          </p-floatlabel>\n          @if (form.get('email')?.touched && form.get('email')?.hasError('required')) {\n            <small class=\"p-error\">Email address is required.</small>\n          }\n          @if (form.get('email')?.touched && form.get('email')?.hasError('email')) {\n            <small class=\"p-error\">Enter a valid email address.</small>\n          }\n        </div>\n        @if (roleOptions.length > 1) {\n          <div class=\"form-field\">\n            <p-floatlabel variant=\"on\" class=\"w-full\">\n              <p-iconfield class=\"w-full\">\n                <p-inputicon class=\"pi pi-id-card\"></p-inputicon>\n                <p-select\n                  id=\"role\"\n                  [options]=\"roleOptions\"\n                  [(ngModel)]=\"selectedRole\"\n                  [ngModelOptions]=\"{standalone: true}\"\n                  optionLabel=\"label\"\n                  class=\"w-full\"\n                />\n              </p-iconfield>\n              <label for=\"role\">Role <span class=\"required\">*</span></label>\n            </p-floatlabel>\n          </div>\n        }\n      </div>\n\n      @if (selectedRole?.value === 'instructor') {\n      <div class=\"form-row form-field\">\n        <div class=\"form-field w-full assign-courses-field\">\n          <label class=\"block mb-2 font-medium text-color\">Assign to courses</label>\n          <p-multiSelect\n            [options]=\"courses()\"\n            [(ngModel)]=\"selectedCourses\"\n            [ngModelOptions]=\"{standalone: true}\"\n            optionLabel=\"name\"\n            placeholder=\"Select courses to assign\"\n            display=\"chip\"\n            [showClear]=\"true\"\n            [loading]=\"coursesLoading()\"\n            (onFocus)=\"loadCourses()\"\n            class=\"w-full assign-course-select\"\n          />\n          @if (courses().length === 0) {\n            <small class=\"assign-courses-empty-hint\">No courses in the system yet. Run the seed script from the server folder: <code>node scripts/seed-courses.cjs</code></small>\n          }\n        </div>\n      </div>\n      }\n\n      <div class=\"form-actions\">\n        <p-button\n          type=\"submit\"\n          label=\"Send Invitation\"\n          icon=\"pi pi-send\"\n          [loading]=\"submitting()\"\n          [disabled]=\"submitting() || form.invalid\"\n        />\n      </div>\n    </form>\n  </div>\n  }\n\n  <!-- SA: Admins (always show section for Super Admin) -->\n  @if (view() === 'sa') {\n  <div class=\"table-card\">\n    <div class=\"card-header\">\n      <h3 class=\"card-title\">Admins</h3>\n      <p class=\"card-subtitle\">Super Admin and Admin users.</p>\n    </div>\n    <p-table\n      [value]=\"admins()\"\n      [loading]=\"loading()\"\n      [paginator]=\"admins().length > 0\"\n      [rows]=\"10\"\n      [showCurrentPageReport]=\"admins().length > 0\"\n      currentPageReportTemplate=\"Showing {first} to {last} of {totalRecords} users\"\n      [rowsPerPageOptions]=\"[5, 10, 25]\"\n      [tableStyle]=\"{ 'min-width': '50rem' }\"\n      styleClass=\"p-datatable-striped\"\n    >\n      <ng-template pTemplate=\"header\">\n        <tr>\n          <th style=\"width: 24%\">Name</th>\n          <th style=\"width: 28%\">Email</th>\n          <th style=\"width: 12%\">Role</th>\n          <th style=\"width: 12%\">Head</th>\n          @if (showActions) {\n            <th style=\"width: 12%\">Status</th>\n            <th style=\"width: 12%\">Actions</th>\n          }\n        </tr>\n      </ng-template>\n      <ng-template pTemplate=\"body\" let-user>\n        <tr>\n          <td>\n            <div class=\"user-name-cell\">\n              <div class=\"user-avatar\">{{ user.firstName?.charAt(0) }}{{ user.lastName?.charAt(0) }}</div>\n              <span>{{ user.name }}</span>\n            </div>\n          </td>\n          <td>{{ user.email }}</td>\n          <td><p-tag [value]=\"roleLabel(user.role)\" [severity]=\"getRoleSeverity(user.role)\" /></td>\n          <td>\n            @if (user.role === 'admin') {\n              <label class=\"head-toggle\" [pTooltip]=\"user.canManageUsers ? 'Revoke head permission' : 'Grant head permission: this Admin can add users and activate/deactivate'\">\n                <input\n                  type=\"checkbox\"\n                  [checked]=\"user.canManageUsers\"\n                  (change)=\"onHeadToggle(user.id, $event)\"\n                />\n                <span class=\"head-toggle-slider\"></span>\n              </label>\n            } @else {\n              <span class=\"text-muted\">\u2014</span>\n            }\n          </td>\n          @if (showActions) {\n            <td>\n              <p-tag [value]=\"isActive(user) ? 'Active' : 'Inactive'\" [severity]=\"isActive(user) ? 'success' : 'danger'\" />\n            </td>\n            <td>\n              @if (isActive(user)) {\n                <p-button icon=\"pi pi-ban\" pTooltip=\"Deactivate\" severity=\"secondary\" [text]=\"true\" size=\"small\" (click)=\"setUserStatus(user.id, false)\" />\n              } @else {\n                <p-button icon=\"pi pi-check\" pTooltip=\"Activate\" severity=\"success\" [text]=\"true\" size=\"small\" (click)=\"setUserStatus(user.id, true)\" />\n              }\n            </td>\n          }\n        </tr>\n      </ng-template>\n      <ng-template pTemplate=\"emptymessage\">\n        <tr>\n          <td [attr.colspan]=\"showActions ? 6 : 4\" class=\"empty-message\">\n            <i class=\"pi pi-users\"></i>\n            <span>No admins yet. Add one using the form above.</span>\n          </td>\n        </tr>\n      </ng-template>\n    </p-table>\n  </div>\n  }\n\n  <!-- SA & Admin: Instructors (with course/batch counts) -->\n  @if ((view() === 'sa' || view() === 'admin') && instructors().length > 0) {\n  <div class=\"table-card\">\n    <div class=\"card-header\">\n      <h3 class=\"card-title\">Instructors</h3>\n      <p class=\"card-subtitle\">Instructors with course and batch counts.</p>\n    </div>\n    <p-table\n      [value]=\"instructors()\"\n      [loading]=\"loading()\"\n      [paginator]=\"true\"\n      [rows]=\"10\"\n      [showCurrentPageReport]=\"true\"\n      currentPageReportTemplate=\"Showing {first} to {last} of {totalRecords} instructors\"\n      [rowsPerPageOptions]=\"[5, 10, 25]\"\n      [tableStyle]=\"{ 'min-width': '50rem' }\"\n      styleClass=\"p-datatable-striped\"\n    >\n      <ng-template pTemplate=\"header\">\n        <tr>\n          <th style=\"width: 22%\">Name</th>\n          <th style=\"width: 28%\">Email</th>\n          <th style=\"width: 10%\">Courses</th>\n          <th style=\"width: 10%\">Batches</th>\n          <th style=\"width: 12%\">Role</th>\n          @if (showActions) {\n            <th style=\"width: 10%\">Status</th>\n            <th style=\"width: 8%\">Actions</th>\n          }\n        </tr>\n      </ng-template>\n      <ng-template pTemplate=\"body\" let-user>\n        <tr>\n          <td>\n            <div class=\"user-name-cell\">\n              <div class=\"user-avatar\">{{ user.firstName?.charAt(0) }}{{ user.lastName?.charAt(0) }}</div>\n              <span>{{ user.name }}</span>\n            </div>\n          </td>\n          <td>{{ user.email }}</td>\n          <td>{{ user.courseCount }}</td>\n          <td>{{ user.batchCount }}</td>\n          <td><p-tag [value]=\"roleLabel(user.role)\" [severity]=\"getRoleSeverity(user.role)\" /></td>\n          @if (showActions) {\n            <td>\n              <p-tag [value]=\"isActive(user) ? 'Active' : 'Inactive'\" [severity]=\"isActive(user) ? 'success' : 'danger'\" />\n            </td>\n            <td>\n              @if (isActive(user)) {\n                <p-button icon=\"pi pi-ban\" pTooltip=\"Deactivate\" severity=\"secondary\" [text]=\"true\" size=\"small\" (click)=\"setUserStatus(user.id, false)\" />\n              } @else {\n                <p-button icon=\"pi pi-check\" pTooltip=\"Activate\" severity=\"success\" [text]=\"true\" size=\"small\" (click)=\"setUserStatus(user.id, true)\" />\n              }\n            </td>\n          }\n        </tr>\n      </ng-template>\n    </p-table>\n  </div>\n  }\n\n  <!-- SA, Admin, Instructor: Students -->\n  <div class=\"table-card\">\n    <div class=\"card-header\">\n      <h3 class=\"card-title\">\n        @if (view() === 'instructor') {\n          Students (your courses)\n        } @else {\n          Students\n        }\n      </h3>\n      <p class=\"card-subtitle\">\n        @if (view() === 'instructor') {\n          Students registered in batches of courses you teach.\n        } @else {\n          All students in the system.\n        }\n      </p>\n    </div>\n    <p-table\n      [value]=\"students()\"\n      [loading]=\"loading()\"\n      [paginator]=\"true\"\n      [rows]=\"10\"\n      [showCurrentPageReport]=\"true\"\n      currentPageReportTemplate=\"Showing {first} to {last} of {totalRecords} students\"\n      [rowsPerPageOptions]=\"[5, 10, 25]\"\n      [tableStyle]=\"{ 'min-width': '50rem' }\"\n      styleClass=\"p-datatable-striped\"\n    >\n      <ng-template pTemplate=\"header\">\n        <tr>\n          <th style=\"width: 28%\">Name</th>\n          <th style=\"width: 37%\">Email</th>\n          <th style=\"width: 15%\">Role</th>\n          @if (showActions) {\n            <th style=\"width: 12%\">Status</th>\n            <th style=\"width: 8%\">Actions</th>\n          }\n        </tr>\n      </ng-template>\n      <ng-template pTemplate=\"body\" let-user>\n        <tr>\n          <td>\n            <div class=\"user-name-cell\">\n              <div class=\"user-avatar\">{{ user.firstName?.charAt(0) }}{{ user.lastName?.charAt(0) }}</div>\n              <span>{{ user.name }}</span>\n            </div>\n          </td>\n          <td>{{ user.email }}</td>\n          <td><p-tag [value]=\"roleLabel(user.role)\" [severity]=\"getRoleSeverity(user.role)\" /></td>\n          @if (showActions) {\n            <td>\n              <p-tag [value]=\"isActive(user) ? 'Active' : 'Inactive'\" [severity]=\"isActive(user) ? 'success' : 'danger'\" />\n            </td>\n            <td>\n              @if (isActive(user)) {\n                <p-button icon=\"pi pi-ban\" pTooltip=\"Deactivate\" severity=\"secondary\" [text]=\"true\" size=\"small\" (click)=\"setUserStatus(user.id, false)\" />\n              } @else {\n                <p-button icon=\"pi pi-check\" pTooltip=\"Activate\" severity=\"success\" [text]=\"true\" size=\"small\" (click)=\"setUserStatus(user.id, true)\" />\n              }\n            </td>\n          }\n        </tr>\n      </ng-template>\n      <ng-template pTemplate=\"emptymessage\">\n        <tr>\n          <td [attr.colspan]=\"showActions ? 5 : 3\" class=\"empty-message\">\n            <i class=\"pi pi-users\"></i>\n            <span>\n              @if (view() === 'instructor') {\n                No students in your courses yet.\n              } @else {\n                No students found.\n              }\n            </span>\n          </td>\n        </tr>\n      </ng-template>\n    </p-table>\n  </div>\n\n  <!-- SA only: Batches by Course -->\n  @if (view() === 'sa' && batchesByCourse().length > 0) {\n  <div class=\"table-card batches-by-course\">\n    <div class=\"card-header\">\n      <h3 class=\"card-title\">Students by Batch & Course</h3>\n      <p class=\"card-subtitle\">Students grouped by course and batch.</p>\n    </div>\n    @for (course of batchesByCourse(); track course.courseId) {\n      <div class=\"course-group\">\n        <h4 class=\"course-name\">{{ course.courseName }}</h4>\n        @for (batch of course.batches; track batch.batchId) {\n          <div class=\"batch-group\">\n            <h5 class=\"batch-name\">{{ batch.batchName }}</h5>\n            <p-table\n              [value]=\"batch.students\"\n              [tableStyle]=\"{ 'min-width': '40rem' }\"\n              styleClass=\"p-datatable-striped p-datatable-sm\"\n            >\n              <ng-template pTemplate=\"header\">\n                <tr>\n                  <th>Name</th>\n                  <th>Email</th>\n                </tr>\n              </ng-template>\n              <ng-template pTemplate=\"body\" let-user>\n                <tr>\n                  <td>{{ user.name }}</td>\n                  <td>{{ user.email }}</td>\n                </tr>\n              </ng-template>\n              <ng-template pTemplate=\"emptymessage\">\n                <tr><td colspan=\"2\">No students in this batch.</td></tr>\n              </ng-template>\n            </p-table>\n          </div>\n        }\n      </div>\n    }\n  </div>\n  }\n</div>\n", styles: [".page-container {\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  background: var(--surface-ground);\n  min-height: 100%;\n}\n\n.form-card,\n.table-card {\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 1.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n  border: 1px solid var(--surface-border);\n}\n\n.card-header {\n  margin-bottom: 1.5rem;\n\n  .card-title {\n    margin: 0 0 0.25rem 0;\n    font-size: 1.25rem;\n    font-weight: 600;\n    color: var(--text-color);\n  }\n\n  .card-subtitle {\n    margin: 0;\n    font-size: 0.875rem;\n    color: var(--text-color-secondary);\n  }\n}\n\n.add-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.form-row {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1.25rem;\n\n  @media (max-width: 768px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.form-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n\n.required {\n  color: #d32f2f;\n  font-weight: 600;\n}\n\n.course-chips {\n  :host ::ng-deep .course-chip {\n    .p-chip {\n      background: #f3f4f6;\n      border-radius: 6px;\n    }\n  }\n}\n\n.p-error {\n  color: #d32f2f;\n  font-size: 12px;\n}\n\n// Head permission toggle (switch style)\n.head-toggle {\n  position: relative;\n  display: inline-block;\n  width: 2.5rem;\n  height: 1.25rem;\n  cursor: pointer;\n  vertical-align: middle;\n\n  input {\n    opacity: 0;\n    width: 0;\n    height: 0;\n\n    &:checked + .head-toggle-slider {\n      background: var(--sqx-color-primary, #5B4BC4);\n    }\n\n    &:checked + .head-toggle-slider::before {\n      transform: translateX(1.25rem);\n    }\n\n    &:focus + .head-toggle-slider {\n      box-shadow: 0 0 0 2px rgba(91, 75, 196, 0.25);\n    }\n  }\n}\n\n.head-toggle-slider {\n  position: absolute;\n  inset: 0;\n  background: #d1d5db;\n  border-radius: 1.25rem;\n  transition: background 0.2s;\n\n  &::before {\n    content: '';\n    position: absolute;\n    height: 1rem;\n    width: 1rem;\n    left: 0.125rem;\n    bottom: 0.125rem;\n    background: #fff;\n    border-radius: 50%;\n    transition: transform 0.2s;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);\n  }\n}\n\n// Input styles matching login screen exactly\n:host ::ng-deep .form-field .p-iconfield {\n  width: 100%;\n}\n\n:host ::ng-deep .form-field .p-floatlabel {\n  width: 100%;\n}\n\n:host ::ng-deep .form-field .p-inputtext {\n  width: 100%;\n  border-radius: 6px;\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  padding-left: 44px;\n  box-shadow: none;\n  font-size: 15px;\n}\n\n:host ::ng-deep .form-field .p-inputtext:focus {\n  border-color: var(--sqx-color-primary);\n  background: #ffffff;\n  box-shadow: 0 0 0 3px rgba(91, 75, 196, 0.1);\n}\n\n:host ::ng-deep .form-field .p-inputicon {\n  color: #9ca3af;\n  font-size: 16px;\n}\n\n:host ::ng-deep .form-field .p-select {\n  width: 100%;\n  border-radius: 6px;\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  box-shadow: none;\n  font-size: 15px;\n}\n\n:host ::ng-deep .form-field .p-select .p-select-label {\n  padding-left: 44px;\n}\n\n/* Assign to courses: no left icon, so no extra left padding; ensure dropdown chevron visible */\n:host ::ng-deep .assign-courses-field .p-select .p-select-label {\n  padding-left: 1rem;\n}\n\n.assign-courses-empty-hint {\n  display: block;\n  margin-top: 0.5rem;\n  color: var(--sqx-color-text-light, #6b7280);\n  font-size: 0.8125rem;\n  code {\n    background: rgba(91, 75, 196, 0.08);\n    padding: 0.125rem 0.375rem;\n    border-radius: 4px;\n    font-size: 0.75rem;\n  }\n}\n:host ::ng-deep .assign-courses-field .p-select .p-select-trigger,\n:host ::ng-deep .assign-course-select .p-select-trigger {\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n}\n:host ::ng-deep .assign-courses-field .p-select .p-select-trigger-icon,\n:host ::ng-deep .assign-course-select .p-select-trigger-icon,\n:host ::ng-deep .assign-courses-field .p-select .p-icon,\n:host ::ng-deep .assign-course-select .p-select .p-icon {\n  opacity: 1;\n  visibility: visible;\n  color: var(--sqx-color-text-light);\n}\n\n:host ::ng-deep .form-field .p-select:not(.p-disabled):hover,\n:host ::ng-deep .form-field .p-select:not(.p-disabled).p-focus {\n  border-color: var(--sqx-color-primary);\n  background: #ffffff;\n  box-shadow: 0 0 0 3px rgba(91, 75, 196, 0.1);\n}\n\n:host ::ng-deep .form-field .p-floatlabel label {\n  font-size: 0.875rem;\n  color: #6b7280;\n  left: 44px;\n}\n\n:host ::ng-deep .form-field .p-floatlabel:has(.p-inputtext:focus) label,\n:host ::ng-deep .form-field .p-floatlabel:has(.p-inputtext.p-filled) label,\n:host ::ng-deep .form-field .p-floatlabel:has(.p-select.p-focus) label,\n:host ::ng-deep .form-field .p-floatlabel:has(.p-select .p-select-label:not(.p-placeholder)) label {\n  left: 12px;\n  top: 0;\n  font-size: 0.75rem;\n}\n\n.form-actions {\n  display: flex;\n  justify-content: flex-start;\n  margin-top: 0.5rem;\n}\n\n:host ::ng-deep .form-actions .p-button {\n  background: var(--sqx-color-primary);\n  border: none;\n  color: #ffffff;\n  transition: all 0.2s ease;\n}\n\n:host ::ng-deep .form-actions .p-button:hover:not(:disabled) {\n  background: var(--sqx-color-primary-dark);\n}\n\n:host ::ng-deep .form-actions .p-button:focus,\n:host ::ng-deep .form-actions .p-button:active {\n  background: var(--sqx-color-primary);\n  box-shadow: none;\n  outline: none;\n}\n\n:host ::ng-deep .form-actions .p-button:disabled {\n  background: var(--sqx-color-primary-light);\n  opacity: 0.7;\n}\n\n// Table styles\n.user-name-cell {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.user-avatar {\n  min-width: 36px;\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, var(--sqx-color-primary), var(--sqx-color-primary-dark));\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n  flex-shrink: 0;\n}\n\n.empty-message {\n  text-align: center;\n  padding: 3rem 1rem !important;\n  color: var(--text-color-secondary);\n\n  i {\n    font-size: 2.5rem;\n    margin-bottom: 1rem;\n    display: block;\n    opacity: 0.5;\n  }\n\n  span {\n    display: block;\n    font-size: 0.9rem;\n  }\n}\n\n// Override PrimeNG table styles for consistency\n::ng-deep {\n  .p-datatable {\n    .p-datatable-header {\n      background: transparent;\n      border: none;\n      padding: 0 0 1rem 0;\n    }\n\n    .p-datatable-thead > tr > th {\n      background: var(--surface-ground);\n      color: var(--text-color-secondary);\n      font-weight: 600;\n      font-size: 0.8rem;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n      padding: 0.875rem 1rem;\n      border-bottom: 1px solid var(--surface-border);\n    }\n\n    .p-datatable-tbody > tr > td {\n      padding: 1rem;\n      border-bottom: 1px solid var(--surface-border);\n      background: #ffffff;\n    }\n\n    .p-datatable-tbody > tr:hover > td {\n      background: var(--surface-hover);\n    }\n  }\n\n  .p-paginator {\n    background: transparent;\n    border: none;\n    padding: 1rem 0 0 0;\n  }\n}\n\n// Batches by course (SA view)\n.batches-by-course {\n  .course-group {\n    margin-bottom: 1.5rem;\n\n    &:last-child {\n      margin-bottom: 0;\n    }\n  }\n\n  .course-name {\n    margin: 0 0 0.75rem 0;\n    font-size: 1.1rem;\n    font-weight: 600;\n    color: var(--text-color);\n  }\n\n  .batch-group {\n    margin-bottom: 1rem;\n    padding-left: 1rem;\n    border-left: 3px solid var(--primary-color);\n  }\n\n  .batch-name {\n    margin: 0 0 0.5rem 0;\n    font-size: 0.95rem;\n    font-weight: 500;\n    color: var(--text-color-secondary);\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AddUsersComponent, { className: "AddUsersComponent", filePath: "src/app/modules/add-users/add-users.component.ts", lineNumber: 58 }); })();
