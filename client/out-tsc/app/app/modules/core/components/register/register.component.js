import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { getFriendlyErrorMessage } from '../../../../shared/utils/error-messages.util';
import { compressImage, validateImageFile, formatFileSize } from '../../../../shared/utils/image-compress.util';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ChipModule } from 'primeng/chip';
import { KnobModule } from 'primeng/knob';
import { TooltipModule } from 'primeng/tooltip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/router";
import * as i3 from "primeng/api";
import * as i4 from "../../services/auth.service";
import * as i5 from "primeng/button";
import * as i6 from "primeng/floatlabel";
import * as i7 from "primeng/iconfield";
import * as i8 from "primeng/inputicon";
import * as i9 from "primeng/inputtext";
import * as i10 from "primeng/password";
import * as i11 from "primeng/toast";
import * as i12 from "primeng/chip";
import * as i13 from "primeng/knob";
import * as i14 from "primeng/tooltip";
const _c0 = () => ({ standalone: true });
function RegisterComponent_For_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15)(1, "div", 16)(2, "h3", 17);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 18)(5, "span", 19);
    i0.ɵɵtext(6, "\u201C");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(7);
    i0.ɵɵelementStart(8, "span", 19);
    i0.ɵɵtext(9, "\u201D");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r1.carouselItems.indexOf(item_r1) === ctx_r1.activeIndex);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r1.title);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r1.subtitle);
} }
function RegisterComponent_For_11_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 20);
    i0.ɵɵlistener("click", function RegisterComponent_For_11_Template_button_click_0_listener() { const item_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setActive(ctx_r1.carouselItems.indexOf(item_r4))); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r1.carouselItems.indexOf(item_r4) === ctx_r1.activeIndex);
} }
function RegisterComponent_Conditional_14_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 31);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", ctx_r1.profileImagePreview, i0.ɵɵsanitizeUrl);
} }
function RegisterComponent_Conditional_14_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵelement(1, "i", 69);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Add Photo");
    i0.ɵɵelementEnd()();
} }
function RegisterComponent_Conditional_14_Conditional_27_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "First name is required.");
    i0.ɵɵelementEnd();
} }
function RegisterComponent_Conditional_14_Conditional_27_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "First name must contain only alphabets.");
    i0.ɵɵelementEnd();
} }
function RegisterComponent_Conditional_14_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 42);
    i0.ɵɵconditionalCreate(1, RegisterComponent_Conditional_14_Conditional_27_Conditional_1_Template, 2, 0, "span");
    i0.ɵɵconditionalCreate(2, RegisterComponent_Conditional_14_Conditional_27_Conditional_2_Template, 2, 0, "span");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵconditional(((tmp_4_0 = ctx_r1.registerForm.get("firstName")) == null ? null : tmp_4_0.errors == null ? null : tmp_4_0.errors["required"]) ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(((tmp_5_0 = ctx_r1.registerForm.get("firstName")) == null ? null : tmp_5_0.errors == null ? null : tmp_5_0.errors["pattern"]) ? 2 : -1);
} }
function RegisterComponent_Conditional_14_Conditional_35_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Last name is required.");
    i0.ɵɵelementEnd();
} }
function RegisterComponent_Conditional_14_Conditional_35_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Last name must contain only alphabets.");
    i0.ɵɵelementEnd();
} }
function RegisterComponent_Conditional_14_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 42);
    i0.ɵɵconditionalCreate(1, RegisterComponent_Conditional_14_Conditional_35_Conditional_1_Template, 2, 0, "span");
    i0.ɵɵconditionalCreate(2, RegisterComponent_Conditional_14_Conditional_35_Conditional_2_Template, 2, 0, "span");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵconditional(((tmp_4_0 = ctx_r1.registerForm.get("lastName")) == null ? null : tmp_4_0.errors == null ? null : tmp_4_0.errors["required"]) ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(((tmp_5_0 = ctx_r1.registerForm.get("lastName")) == null ? null : tmp_5_0.errors == null ? null : tmp_5_0.errors["pattern"]) ? 2 : -1);
} }
function RegisterComponent_Conditional_14_Conditional_44_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Email is required.");
    i0.ɵɵelementEnd();
} }
function RegisterComponent_Conditional_14_Conditional_44_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enter a valid email address.");
    i0.ɵɵelementEnd();
} }
function RegisterComponent_Conditional_14_Conditional_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 42);
    i0.ɵɵconditionalCreate(1, RegisterComponent_Conditional_14_Conditional_44_Conditional_1_Template, 2, 0, "span");
    i0.ɵɵconditionalCreate(2, RegisterComponent_Conditional_14_Conditional_44_Conditional_2_Template, 2, 0, "span");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵconditional(((tmp_4_0 = ctx_r1.registerForm.get("email")) == null ? null : tmp_4_0.errors == null ? null : tmp_4_0.errors["required"]) ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(((tmp_5_0 = ctx_r1.registerForm.get("email")) == null ? null : tmp_5_0.errors == null ? null : tmp_5_0.errors["email"]) ? 2 : -1);
} }
function RegisterComponent_Conditional_14_Conditional_52_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Phone number is required.");
    i0.ɵɵelementEnd();
} }
function RegisterComponent_Conditional_14_Conditional_52_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Phone number must be 10 digits.");
    i0.ɵɵelementEnd();
} }
function RegisterComponent_Conditional_14_Conditional_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 42);
    i0.ɵɵconditionalCreate(1, RegisterComponent_Conditional_14_Conditional_52_Conditional_1_Template, 2, 0, "span");
    i0.ɵɵconditionalCreate(2, RegisterComponent_Conditional_14_Conditional_52_Conditional_2_Template, 2, 0, "span");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵconditional(((tmp_4_0 = ctx_r1.registerForm.get("phoneNumber")) == null ? null : tmp_4_0.errors == null ? null : tmp_4_0.errors["required"]) ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(((tmp_5_0 = ctx_r1.registerForm.get("phoneNumber")) == null ? null : tmp_5_0.errors == null ? null : tmp_5_0.errors["pattern"]) ? 2 : -1);
} }
function RegisterComponent_Conditional_14_Conditional_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 58);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.resumeFileName);
} }
function RegisterComponent_Conditional_14_Conditional_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64)(1, "span", 70);
    i0.ɵɵtext(2, "No skills added. Press Enter to add");
    i0.ɵɵelementEnd()();
} }
function RegisterComponent_Conditional_14_Conditional_86_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-chip", 72);
    i0.ɵɵlistener("onRemove", function RegisterComponent_Conditional_14_Conditional_86_For_2_Template_p_chip_onRemove_0_listener() { const skill_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.removeSkill(skill_r8)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const skill_r8 = ctx.$implicit;
    i0.ɵɵproperty("label", skill_r8)("removable", true);
} }
function RegisterComponent_Conditional_14_Conditional_86_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65);
    i0.ɵɵrepeaterCreate(1, RegisterComponent_Conditional_14_Conditional_86_For_2_Template, 1, 2, "p-chip", 71, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.skills);
} }
function RegisterComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 21);
    i0.ɵɵlistener("ngSubmit", function RegisterComponent_Conditional_14_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitStep1()); });
    i0.ɵɵelementStart(1, "div", 22);
    i0.ɵɵelement(2, "img", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "h2", 24);
    i0.ɵɵtext(5, "Complete your Profile");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 25);
    i0.ɵɵtext(7, "Let's Get to Know You Better by Filling your Profile");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 26)(9, "div", 27)(10, "h3", 28);
    i0.ɵɵtext(11, "Contact Details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 29)(13, "div", 30);
    i0.ɵɵlistener("click", function RegisterComponent_Conditional_14_Template_div_click_13_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.triggerProfileImageUpload()); });
    i0.ɵɵconditionalCreate(14, RegisterComponent_Conditional_14_Conditional_14_Template, 1, 1, "img", 31)(15, RegisterComponent_Conditional_14_Conditional_15_Template, 4, 0, "div", 32);
    i0.ɵɵelement(16, "button", 33);
    i0.ɵɵelementStart(17, "input", 34, 0);
    i0.ɵɵlistener("change", function RegisterComponent_Conditional_14_Template_input_change_17_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onProfileImageSelect($event)); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "div", 35)(20, "div", 36)(21, "p-floatlabel", 37)(22, "p-iconfield", 38);
    i0.ɵɵelement(23, "p-inputicon", 39)(24, "input", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "label", 41);
    i0.ɵɵtext(26, "First Name");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(27, RegisterComponent_Conditional_14_Conditional_27_Template, 3, 2, "small", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div", 36)(29, "p-floatlabel", 37)(30, "p-iconfield", 38);
    i0.ɵɵelement(31, "p-inputicon", 39)(32, "input", 43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "label", 44);
    i0.ɵɵtext(34, "Last Name");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(35, RegisterComponent_Conditional_14_Conditional_35_Template, 3, 2, "small", 42);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "div", 35)(37, "div", 36)(38, "p-floatlabel", 37)(39, "p-iconfield", 38);
    i0.ɵɵelement(40, "p-inputicon", 45)(41, "input", 46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "label", 47);
    i0.ɵɵtext(43, "Email Id");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(44, RegisterComponent_Conditional_14_Conditional_44_Template, 3, 2, "small", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "div", 36)(46, "p-floatlabel", 37)(47, "p-iconfield", 38);
    i0.ɵɵelement(48, "p-inputicon", 48)(49, "input", 49);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "label", 50);
    i0.ɵɵtext(51, "Phone Number");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(52, RegisterComponent_Conditional_14_Conditional_52_Template, 3, 2, "small", 42);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(53, "div", 27)(54, "h3", 28);
    i0.ɵɵtext(55, "Academics");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "div", 51)(57, "p-floatlabel", 37)(58, "p-iconfield", 38);
    i0.ɵɵelement(59, "p-inputicon", 52)(60, "input", 53);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(61, "label", 54);
    i0.ɵɵtext(62, "Under Graduate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(63, "div", 51)(64, "label", 55);
    i0.ɵɵtext(65, "Resume");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "input", 56, 1);
    i0.ɵɵlistener("change", function RegisterComponent_Conditional_14_Template_input_change_66_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onResumeSelect($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "button", 57);
    i0.ɵɵlistener("click", function RegisterComponent_Conditional_14_Template_button_click_68_listener() { i0.ɵɵrestoreView(_r5); const resumeInput_r6 = i0.ɵɵreference(67); return i0.ɵɵresetView(resumeInput_r6.click()); });
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(69, RegisterComponent_Conditional_14_Conditional_69_Template, 2, 1, "small", 58);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(70, "div", 27)(71, "h3", 28);
    i0.ɵɵtext(72, "Skills");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(73, "div", 51)(74, "p-floatlabel", 37)(75, "p-iconfield", 38);
    i0.ɵɵelement(76, "p-inputicon", 59);
    i0.ɵɵelementStart(77, "input", 60);
    i0.ɵɵtwoWayListener("ngModelChange", function RegisterComponent_Conditional_14_Template_input_ngModelChange_77_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.skillInput, $event) || (ctx_r1.skillInput = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("keydown.enter", function RegisterComponent_Conditional_14_Template_input_keydown_enter_77_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.addSkill($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(78, "label", 61);
    i0.ɵɵtext(79, "Add Skills ");
    i0.ɵɵelementStart(80, "span", 62);
    i0.ɵɵtext(81, "(Upto 10 Skills)");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(82, "div", 51)(83, "label", 63);
    i0.ɵɵtext(84, "Skills added");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(85, RegisterComponent_Conditional_14_Conditional_85_Template, 3, 0, "div", 64)(86, RegisterComponent_Conditional_14_Conditional_86_Template, 3, 0, "div", 65);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelement(87, "button", 66);
    i0.ɵɵelementStart(88, "div", 67);
    i0.ɵɵtext(89, " Already have an account? ");
    i0.ɵɵelementStart(90, "a", 68);
    i0.ɵɵtext(91, "Login");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r1.registerForm);
    i0.ɵɵadvance(14);
    i0.ɵɵconditional(ctx_r1.profileImagePreview ? 14 : 15);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("icon", ctx_r1.profileImagePreview ? "pi pi-pencil" : "pi pi-camera")("pTooltip", ctx_r1.profileImagePreview ? "Change photo" : "Add photo");
    i0.ɵɵadvance(11);
    i0.ɵɵconditional(((tmp_7_0 = ctx_r1.registerForm.get("firstName")) == null ? null : tmp_7_0.touched) && ((tmp_7_0 = ctx_r1.registerForm.get("firstName")) == null ? null : tmp_7_0.invalid) ? 27 : -1);
    i0.ɵɵadvance(8);
    i0.ɵɵconditional(((tmp_8_0 = ctx_r1.registerForm.get("lastName")) == null ? null : tmp_8_0.touched) && ((tmp_8_0 = ctx_r1.registerForm.get("lastName")) == null ? null : tmp_8_0.invalid) ? 35 : -1);
    i0.ɵɵadvance(9);
    i0.ɵɵconditional(((tmp_9_0 = ctx_r1.registerForm.get("email")) == null ? null : tmp_9_0.touched) && ((tmp_9_0 = ctx_r1.registerForm.get("email")) == null ? null : tmp_9_0.invalid) ? 44 : -1);
    i0.ɵɵadvance(8);
    i0.ɵɵconditional(((tmp_10_0 = ctx_r1.registerForm.get("phoneNumber")) == null ? null : tmp_10_0.touched) && ((tmp_10_0 = ctx_r1.registerForm.get("phoneNumber")) == null ? null : tmp_10_0.invalid) ? 52 : -1);
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("label", ctx_r1.resumeFileName || "Upload updated Resume");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.resumeFileName ? 69 : -1);
    i0.ɵɵadvance(8);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.skillInput);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(15, _c0));
    i0.ɵɵadvance(8);
    i0.ɵɵconditional(ctx_r1.skills.length === 0 ? 85 : 86);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("loading", ctx_r1.submitting())("disabled", ctx_r1.registerForm.invalid || ctx_r1.submitting());
} }
function RegisterComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 73);
    i0.ɵɵlistener("ngSubmit", function RegisterComponent_Conditional_15_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitOTP()); });
    i0.ɵɵelementStart(1, "div", 22);
    i0.ɵɵelement(2, "img", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "h2", 24);
    i0.ɵɵtext(5, "Verify Your Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 25);
    i0.ɵɵtext(7, "We sent a 6-digit code to ");
    i0.ɵɵelementStart(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "div", 26)(11, "div", 51)(12, "p-floatlabel", 37)(13, "p-iconfield", 38);
    i0.ɵɵelement(14, "p-inputicon", 74);
    i0.ɵɵelementStart(15, "input", 75);
    i0.ɵɵtwoWayListener("ngModelChange", function RegisterComponent_Conditional_15_Template_input_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.otpCode, $event) || (ctx_r1.otpCode = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "label", 76);
    i0.ɵɵtext(17, "OTP");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(18, "div", 77)(19, "div", 78);
    i0.ɵɵtext(20, "OTP expires in");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 79);
    i0.ɵɵelement(22, "p-knob", 80);
    i0.ɵɵelementStart(23, "div", 81);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "div", 82);
    i0.ɵɵelement(26, "button", 83);
    i0.ɵɵelementStart(27, "button", 84);
    i0.ɵɵlistener("click", function RegisterComponent_Conditional_15_Template_button_click_27_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.resendOTP()); });
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate((tmp_1_0 = ctx_r1.registerForm.get("email")) == null ? null : tmp_1_0.value);
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.otpCode);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(13, _c0));
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngModel", ctx_r1.otpProgress)("ngModelOptions", i0.ɵɵpureFunction0(14, _c0))("readonly", true)("strokeWidth", 8)("size", 90)("showValue", false);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.formatTime(ctx_r1.resendTimer));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("loading", ctx_r1.submitting())("disabled", ctx_r1.otpCode.length !== 6 || ctx_r1.submitting());
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r1.canResendOTP);
} }
function RegisterComponent_Conditional_16_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 42);
    i0.ɵɵtext(1, "Password must be at least 8 characters.");
    i0.ɵɵelementEnd();
} }
function RegisterComponent_Conditional_16_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 88)(1, "div", 92);
    i0.ɵɵelement(2, "div", 93);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "small", 94);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-strength", ctx_r1.getPasswordStrength());
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-strength", ctx_r1.getPasswordStrength());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Password strength: ", ctx_r1.getPasswordStrength(), " ");
} }
function RegisterComponent_Conditional_16_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 42);
    i0.ɵɵtext(1, "Passwords do not match.");
    i0.ɵɵelementEnd();
} }
function RegisterComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 21);
    i0.ɵɵlistener("ngSubmit", function RegisterComponent_Conditional_16_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitPassword()); });
    i0.ɵɵelementStart(1, "div", 22);
    i0.ɵɵelement(2, "img", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "h2", 24);
    i0.ɵɵtext(5, "Create Your Password");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 25);
    i0.ɵɵtext(7, "Choose a strong password to secure your account");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 26)(9, "div", 51)(10, "p-floatlabel", 37)(11, "p-iconfield", 38);
    i0.ɵɵelement(12, "p-inputicon", 85)(13, "p-password", 86);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "label", 87);
    i0.ɵɵtext(15, "Password");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(16, RegisterComponent_Conditional_16_Conditional_16_Template, 2, 0, "small", 42);
    i0.ɵɵconditionalCreate(17, RegisterComponent_Conditional_16_Conditional_17_Template, 5, 3, "div", 88);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 51)(19, "p-floatlabel", 37)(20, "p-iconfield", 38);
    i0.ɵɵelement(21, "p-inputicon", 85)(22, "p-password", 89);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "label", 90);
    i0.ɵɵtext(24, "Confirm Password");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(25, RegisterComponent_Conditional_16_Conditional_25_Template, 2, 0, "small", 42);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(26, "button", 91);
    i0.ɵɵelementStart(27, "div", 67);
    i0.ɵɵtext(28, " Already have an account? ");
    i0.ɵɵelementStart(29, "a", 68);
    i0.ɵɵtext(30, "Login");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    let tmp_8_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r1.passwordForm);
    i0.ɵɵadvance(13);
    i0.ɵɵproperty("feedback", false)("toggleMask", true);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(((tmp_4_0 = ctx_r1.passwordForm.get("password")) == null ? null : tmp_4_0.touched) && ((tmp_4_0 = ctx_r1.passwordForm.get("password")) == null ? null : tmp_4_0.invalid) ? 16 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(((tmp_5_0 = ctx_r1.passwordForm.get("password")) == null ? null : tmp_5_0.value) ? 17 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("feedback", false)("toggleMask", true);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(((tmp_8_0 = ctx_r1.passwordForm.get("confirmPassword")) == null ? null : tmp_8_0.touched) && ctx_r1.passwordForm.hasError("passwordMismatch") ? 25 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("loading", ctx_r1.submitting())("disabled", ctx_r1.passwordForm.invalid || ctx_r1.submitting());
} }
export class RegisterComponent {
    fb;
    cdr;
    router;
    messageService;
    auth;
    carouselItems = [
        {
            title: 'REDEFINE',
            subtitle: 'Boost your learning and career path'
        },
        {
            title: 'UPSKILL',
            subtitle: 'Gain modern, in-demand technical expertise'
        },
        {
            title: 'SUCCEED',
            subtitle: 'Land your dream role or promotion'
        }
    ];
    activeIndex = 0;
    currentStep = 1; // 1: Form, 2: OTP, 3: Password
    /** True while any submit request is in progress. */
    submitting = signal(false, ...(ngDevMode ? [{ debugName: "submitting" }] : []));
    // Forms
    registerForm;
    passwordForm;
    // File uploads
    profileImage = null;
    /** Empty by default; show placeholder until user uploads. */
    profileImagePreview = '';
    /** Compressed base64 profile image to send with registration */
    profileImageBase64 = '';
    resumeFile = null;
    resumeFileName = '';
    /** URL returned from server after resume upload */
    resumeUploadedUrl = '';
    isCompressingImage = false;
    isUploadingResume = false;
    // Skills
    skills = [];
    skillInput = '';
    // OTP
    otpCode = '';
    otpSent = false;
    canResendOTP = false;
    resendTimer = 180; // 3 minutes
    otpExpired = false;
    // Calculate OTP progress percentage for knob
    get otpProgress() {
        return Math.round((this.resendTimer / 180) * 100);
    }
    rotationTimer;
    resendInterval;
    constructor(fb, cdr, router, messageService, auth) {
        this.fb = fb;
        this.cdr = cdr;
        this.router = router;
        this.messageService = messageService;
        this.auth = auth;
        this.registerForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
            lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
            email: ['', [Validators.required, Validators.email]],
            phoneCountry: ['+91'],
            phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
            underGraduate: ['', Validators.required],
        });
        this.passwordForm = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required]]
        }, { validators: this.passwordMatchValidator });
        this.rotationTimer = setInterval(() => {
            this.activeIndex = (this.activeIndex + 1) % this.carouselItems.length;
            this.cdr.markForCheck();
        }, 3000);
    }
    setActive(index) {
        this.activeIndex = index;
    }
    // Profile Image Upload
    triggerProfileImageUpload() {
        const fileInput = document.getElementById('profile-image-input');
        fileInput?.click();
    }
    async onProfileImageSelect(event) {
        const input = event.target;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            // Validate file
            const validationError = validateImageFile(file, 5);
            if (validationError) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Invalid File',
                    detail: validationError,
                    life: 3000
                });
                return;
            }
            this.profileImage = file;
            this.isCompressingImage = true;
            this.cdr.markForCheck();
            try {
                // Compress image to max 400x400, ~200KB
                const compressed = await compressImage(file, {
                    maxWidth: 400,
                    maxHeight: 400,
                    quality: 0.8,
                    maxSizeKB: 200
                });
                this.profileImageBase64 = compressed;
                this.profileImagePreview = compressed;
                const sizeKB = Math.round((compressed.split(',')[1].length * 3) / 4 / 1024);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Image Ready',
                    detail: `Compressed to ${sizeKB}KB`,
                    life: 2000
                });
            }
            catch (err) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Compression Failed',
                    detail: 'Could not process image. Try another file.',
                    life: 3000
                });
                this.profileImage = null;
                this.profileImageBase64 = '';
            }
            finally {
                this.isCompressingImage = false;
                this.cdr.markForCheck();
            }
        }
    }
    // Resume Upload - uploads immediately to server
    onResumeSelect(event) {
        const input = event.target;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            // Validate file type (PDF, DOC, DOCX, Excel)
            const validTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ];
            if (!validTypes.includes(file.type)) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Invalid File Type',
                    detail: 'Please select a valid file (PDF, DOC, DOCX, or Excel)',
                    life: 3000
                });
                return;
            }
            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'File Too Large',
                    detail: 'Resume size must be less than 5MB',
                    life: 3000
                });
                return;
            }
            this.resumeFile = file;
            this.resumeFileName = file.name;
            this.isUploadingResume = true;
            this.cdr.markForCheck();
            // Upload resume to server immediately
            this.auth.uploadResume(file).subscribe({
                next: (res) => {
                    this.resumeUploadedUrl = res.url;
                    this.isUploadingResume = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Resume Uploaded',
                        detail: `${formatFileSize(res.size)} uploaded`,
                        life: 2000
                    });
                    this.cdr.markForCheck();
                },
                error: (err) => {
                    this.isUploadingResume = false;
                    this.resumeFile = null;
                    this.resumeFileName = '';
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Upload Failed',
                        detail: getFriendlyErrorMessage(err, { default: 'Could not upload resume. Try again.' }),
                        life: 3000
                    });
                    this.cdr.markForCheck();
                }
            });
        }
    }
    // Skills Management
    addSkill(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        const skill = this.skillInput.trim();
        if (!skill) {
            return;
        }
        if (this.skills.length >= 10) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Maximum Reached',
                detail: 'Maximum 10 skills allowed',
                life: 3000
            });
            return;
        }
        if (this.skills.includes(skill)) {
            this.messageService.add({
                severity: 'info',
                summary: 'Duplicate Skill',
                detail: 'Skill already added',
                life: 3000
            });
            return;
        }
        this.skills.push(skill);
        this.skillInput = '';
        this.cdr.markForCheck();
    }
    removeSkill(skill) {
        const index = this.skills.indexOf(skill);
        if (index > -1) {
            this.skills.splice(index, 1);
        }
        this.cdr.markForCheck();
    }
    // Step 1: Submit Profile Form
    submitStep1() {
        if (this.registerForm.invalid || this.submitting()) {
            this.registerForm.markAllAsTouched();
            return;
        }
        // Validate profile image (must be compressed)
        if (!this.profileImageBase64) {
            this.messageService.add({
                severity: 'error',
                summary: 'Profile Image Required',
                detail: 'Please upload a profile image',
                life: 3000
            });
            return;
        }
        // Validate resume (must be uploaded)
        if (!this.resumeUploadedUrl) {
            this.messageService.add({
                severity: 'error',
                summary: 'Resume Required',
                detail: 'Please upload your resume',
                life: 3000
            });
            return;
        }
        // Check if still uploading
        if (this.isCompressingImage || this.isUploadingResume) {
            this.messageService.add({
                severity: 'info',
                summary: 'Please Wait',
                detail: 'Files are still being processed',
                life: 3000
            });
            return;
        }
        // Validate skills (at least 1 skill required)
        if (this.skills.length === 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Skills Required',
                detail: 'Please add at least one skill',
                life: 3000
            });
            return;
        }
        this.submitting.set(true);
        const email = this.registerForm.get('email')?.value;
        this.auth.sendOtp(email).subscribe({
            next: () => {
                this.otpSent = true;
                this.currentStep = 2;
                this.startResendTimer();
                this.messageService.add({
                    severity: 'info',
                    summary: 'OTP Sent',
                    detail: 'Check your email for the OTP',
                    life: 3000
                });
                this.submitting.set(false);
                this.cdr.markForCheck();
            },
            error: () => {
                this.otpSent = true;
                this.currentStep = 2;
                this.startResendTimer();
                this.submitting.set(false);
                this.cdr.markForCheck();
            }
        });
    }
    // Send OTP (resend)
    sendOTP() {
        const email = this.registerForm.get('email')?.value;
        this.auth.sendOtp(email).subscribe({
            next: () => {
                this.otpSent = true;
                this.currentStep = 2;
                this.startResendTimer();
                this.cdr.markForCheck();
            }
        });
    }
    // Resend OTP Timer
    startResendTimer() {
        this.canResendOTP = false;
        this.resendTimer = 180; // 3 minutes
        this.resendInterval = setInterval(() => {
            this.resendTimer--;
            if (this.resendTimer <= 0) {
                this.canResendOTP = true;
                if (this.resendInterval) {
                    clearInterval(this.resendInterval);
                }
            }
            this.cdr.markForCheck();
        }, 1000);
    }
    // Resend OTP
    resendOTP() {
        if (!this.canResendOTP)
            return;
        console.log('Resending OTP to:', this.registerForm.get('email')?.value);
        this.sendOTP();
    }
    // Step 2: Submit OTP
    submitOTP() {
        if (this.otpCode.length !== 6 || this.submitting()) {
            if (this.otpCode.length !== 6) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Invalid OTP',
                    detail: 'Please enter a valid 6-digit OTP',
                    life: 3000
                });
            }
            return;
        }
        this.submitting.set(true);
        const email = this.registerForm.get('email')?.value;
        this.auth.verifyOtp(email, this.otpCode).subscribe({
            next: (res) => {
                if (res.valid) {
                    this.currentStep = 3;
                }
                else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Invalid OTP',
                        detail: 'OTP is invalid or expired',
                        life: 3000
                    });
                }
                this.submitting.set(false);
                this.cdr.markForCheck();
            },
            error: () => {
                this.submitting.set(false);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Could not verify OTP',
                    life: 3000
                });
                this.cdr.markForCheck();
            }
        });
    }
    // Step 3: Submit Password
    submitPassword() {
        if (this.passwordForm.invalid || this.submitting()) {
            this.passwordForm.markAllAsTouched();
            return;
        }
        this.submitting.set(true);
        const password = this.passwordForm.get('password')?.value;
        const { firstName, lastName, email, phoneCountry, phoneNumber, underGraduate } = this.registerForm.value;
        this.auth.register({
            firstName,
            lastName,
            email,
            password,
            phoneCountry: phoneCountry || undefined,
            phoneNumber: phoneNumber || undefined,
            underGraduate: underGraduate || undefined,
            profileImageUrl: this.profileImageBase64 || undefined,
            resumeUrl: this.resumeUploadedUrl || undefined,
            skills: this.skills.length ? this.skills : undefined
        }).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Registration Successful',
                    detail: 'Welcome! Redirecting to dashboard.',
                    life: 3000
                });
                this.submitting.set(false);
                setTimeout(() => this.router.navigate(['/dashboard']), 1500);
            },
            error: (err) => {
                this.submitting.set(false);
                const msg = getFriendlyErrorMessage(err, {
                    default: 'This email may already be registered. Try logging in.'
                });
                this.messageService.add({
                    severity: 'error',
                    summary: 'Registration Failed',
                    detail: msg,
                    life: 5000
                });
                this.cdr.markForCheck();
            }
        });
    }
    // Password Match Validator
    passwordMatchValidator(group) {
        const password = group.get('password')?.value;
        const confirmPassword = group.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { passwordMismatch: true };
    }
    // Get Password Strength
    getPasswordStrength() {
        const password = this.passwordForm.get('password')?.value || '';
        if (password.length === 0)
            return '';
        if (password.length < 8)
            return 'weak';
        let strength = 0;
        if (/[a-z]/.test(password))
            strength++;
        if (/[A-Z]/.test(password))
            strength++;
        if (/[0-9]/.test(password))
            strength++;
        if (/[^a-zA-Z0-9]/.test(password))
            strength++;
        if (strength <= 2)
            return 'weak';
        if (strength === 3)
            return 'medium';
        return 'strong';
    }
    // Format time in MM:SS format
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
    ngOnDestroy() {
        if (this.rotationTimer) {
            clearInterval(this.rotationTimer);
        }
        if (this.resendInterval) {
            clearInterval(this.resendInterval);
        }
    }
    static ɵfac = function RegisterComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RegisterComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.MessageService), i0.ɵɵdirectiveInject(i4.AuthService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RegisterComponent, selectors: [["sqx-register"]], features: [i0.ɵɵProvidersFeature([MessageService])], decls: 17, vars: 3, consts: [["profileImageInput", ""], ["resumeInput", ""], [1, "flex", "flex-column", "lg:flex-row", "h-screen", "overflow-hidden", "p-2", "box-border", "bg-white"], [1, "w-full", "lg:w-6", "p-0", "hidden", "lg:block", "h-full", "relative"], ["src", "/assets/images/auth.jpg", "alt", "Register banner", 1, "w-full", "h-full", "block", "object-cover"], [1, "absolute", "bottom-0", "left-0", "p-4", "lg:p-5", "text-white"], [1, "hero-content"], [1, "hero-slides"], [1, "hero-slide", 3, "active"], [1, "hero-dots"], ["type", "button", "aria-label", "Show slide", 3, "active"], [1, "w-full", "lg:w-6", "h-full", "p-4", "lg:p-6", "flex", "flex-column", "justify-content-center", "gap-3", "bg-white"], [1, "register-scroll-container", "w-full", "overflow-y-auto"], [1, "register-form", 3, "formGroup"], [1, "register-form"], [1, "hero-slide"], [1, "hero-title-stack"], [1, "hero-title", "m-0"], [1, "hero-quote"], [1, "quote-mark"], ["type", "button", "aria-label", "Show slide", 3, "click"], [1, "register-form", 3, "ngSubmit", "formGroup"], [1, "flex", "justify-content-center", "lg:justify-content-start"], ["src", "/core/logo.svg", "alt", "SkillQuestX", 1, "w-15rem"], [1, "m-0"], [1, "mt-2", "mb-0"], [1, "flex", "flex-column", "gap-3"], [1, "section-group"], [1, "section-title"], [1, "flex", "justify-content-center", "lg:justify-content-start", "mb-3"], [1, "profile-avatar-wrapper", 3, "click"], ["alt", "Profile", 1, "profile-avatar", 3, "src"], [1, "profile-avatar-placeholder"], ["type", "button", "pButton", "", 1, "avatar-edit-btn", 3, "icon", "pTooltip"], ["type", "file", "id", "profile-image-input", "accept", "image/jpeg,image/jpg,image/png", "hidden", "", 3, "change"], [1, "flex", "flex-column", "lg:flex-row", "gap-3"], [1, "flex", "flex-column", "gap-1", "w-full"], ["variant", "on", 1, "w-full"], [1, "w-full"], [1, "pi", "pi-user"], ["id", "reg-firstname", "pInputText", "", "type", "text", "formControlName", "firstName", 1, "w-full"], ["for", "reg-firstname"], [1, "p-error"], ["id", "reg-lastname", "pInputText", "", "type", "text", "formControlName", "lastName", 1, "w-full"], ["for", "reg-lastname"], [1, "pi", "pi-envelope"], ["id", "reg-email", "pInputText", "", "type", "email", "formControlName", "email", 1, "w-full"], ["for", "reg-email"], [1, "pi", "pi-phone"], ["id", "reg-phone", "pInputText", "", "type", "tel", "formControlName", "phoneNumber", 1, "w-full"], ["for", "reg-phone"], [1, "flex", "flex-column", "gap-1"], [1, "pi", "pi-book"], ["id", "reg-undergraduate", "pInputText", "", "type", "text", "formControlName", "underGraduate", 1, "w-full"], ["for", "reg-undergraduate"], [1, "resume-label"], ["type", "file", "id", "resume-input", "accept", ".pdf,.doc,.docx,.xls,.xlsx", "hidden", "", 3, "change"], ["pButton", "", "type", "button", "icon", "pi pi-paperclip", 1, "resume-upload-btn", "w-full", 3, "click", "label"], [1, "text-xs", "text-500"], [1, "pi", "pi-tags"], ["id", "reg-skills", "pInputText", "", "type", "text", 1, "w-full", 3, "ngModelChange", "keydown.enter", "ngModel", "ngModelOptions"], ["for", "reg-skills"], [1, "text-400", "text-xs"], [1, "skills-section-label"], [1, "no-skills-card"], [1, "skills-container"], ["pButton", "", "type", "submit", "label", "Continue to Verify Email", 1, "login-button", "w-full", 3, "loading", "disabled"], [1, "text-sm", "text-center"], ["routerLink", "/login", 1, "brand-link"], [1, "pi", "pi-user-plus"], [1, "text-500"], ["styleClass", "skill-chip", 3, "label", "removable"], ["styleClass", "skill-chip", 3, "onRemove", "label", "removable"], [1, "register-form", 3, "ngSubmit"], [1, "pi", "pi-key"], ["id", "reg-otp", "pInputText", "", "type", "text", "maxlength", "6", 1, "w-full", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["for", "reg-otp"], [1, "flex", "flex-column", "gap-2", "align-items-center"], [1, "text-sm", "text-600"], [1, "otp-timer"], [3, "ngModel", "ngModelOptions", "readonly", "strokeWidth", "size", "showValue"], [1, "otp-timer-label", "text-sm", "font-medium"], [1, "flex", "flex-column", "sm:flex-row", "gap-2"], ["pButton", "", "type", "submit", "label", "Verify OTP", 1, "login-button", "w-full", 3, "loading", "disabled"], ["pButton", "", "type", "button", "label", "Resend OTP", 1, "p-button-outlined", "w-full", 3, "click", "disabled"], [1, "pi", "pi-lock"], ["id", "reg-password", "formControlName", "password", 1, "w-full", 3, "feedback", "toggleMask"], ["for", "reg-password"], [1, "password-strength"], ["id", "reg-confirm-password", "formControlName", "confirmPassword", 1, "w-full", 3, "feedback", "toggleMask"], ["for", "reg-confirm-password"], ["pButton", "", "type", "submit", "label", "Complete Registration", 1, "login-button", "w-full", 3, "loading", "disabled"], [1, "strength-bar"], [1, "strength-fill"], [1, "strength-text"]], template: function RegisterComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "p-toast");
            i0.ɵɵelementStart(1, "section", 2)(2, "div", 3);
            i0.ɵɵelement(3, "img", 4);
            i0.ɵɵelementStart(4, "div", 5)(5, "div", 6)(6, "div", 7);
            i0.ɵɵrepeaterCreate(7, RegisterComponent_For_8_Template, 10, 4, "div", 8, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div", 9);
            i0.ɵɵrepeaterCreate(10, RegisterComponent_For_11_Template, 1, 2, "button", 10, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(12, "div", 11)(13, "div", 12);
            i0.ɵɵconditionalCreate(14, RegisterComponent_Conditional_14_Template, 92, 16, "form", 13);
            i0.ɵɵconditionalCreate(15, RegisterComponent_Conditional_15_Template, 28, 15, "form", 14);
            i0.ɵɵconditionalCreate(16, RegisterComponent_Conditional_16_Template, 31, 10, "form", 13);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵrepeater(ctx.carouselItems);
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.carouselItems);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.currentStep === 1 ? 14 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.currentStep === 2 ? 15 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.currentStep === 3 ? 16 : -1);
        } }, dependencies: [CommonModule,
            ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.FormGroupDirective, i1.FormControlName, FormsModule, i1.NgModel, i1.NgForm, RouterLink,
            ButtonModule, i5.ButtonDirective, FloatLabelModule, i6.FloatLabel, IconFieldModule, i7.IconField, InputIconModule, i8.InputIcon, InputTextModule, i9.InputText, PasswordModule, i10.Password, ToastModule, i11.Toast, ChipModule, i12.Chip, KnobModule, i13.Knob, TooltipModule, i14.Tooltip], styles: ["//[_ngcontent-%COMP%]   Hero[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   styles[_ngcontent-%COMP%]   (matching login/forgot)\n.hero-content[_ngcontent-%COMP%] {\n  max-width: 720px;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n\n.hero-slides[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 72px;\n}\n\n.hero-slide[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  transform: translateY(8px);\n  transition: opacity 0.4s ease, transform 0.4s ease;\n}\n\n.hero-slide.active[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: translateY(0);\n}\n\n.hero-title-stack[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n}\n\n.hero-quote[_ngcontent-%COMP%] {\n  font-size: 16px;\n  line-height: 1.6;\n  margin: 0;\n  position: relative;\n  white-space: nowrap;\n}\n\n.quote-mark[_ngcontent-%COMP%] {\n  font-size: 36px;\n  line-height: 0;\n  vertical-align: baseline;\n  opacity: 0.6;\n}\n\n.hero-dots[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n\n.hero-dots[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 4px;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.35);\n  border: none;\n  padding: 0;\n  cursor: pointer;\n}\n\n.hero-dots[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  width: 40px;\n  background: #ffffff;\n}\n\n//[_ngcontent-%COMP%]   Register[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   container[_ngcontent-%COMP%]   with[_ngcontent-%COMP%]   scroll\n.register-scroll-container[_ngcontent-%COMP%] {\n  max-height: 100%;\n  padding-right: 8px;\n\n  &::-webkit-scrollbar {\n    width: 6px;\n  }\n\n  &::-webkit-scrollbar-track {\n    background: transparent;\n  }\n\n  &::-webkit-scrollbar-thumb {\n    background: #d1d5db;\n    border-radius: 3px;\n  }\n\n  &::-webkit-scrollbar-thumb:hover {\n    background: #9ca3af;\n  }\n}\n\n//[_ngcontent-%COMP%]   Register[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   styles\n.register-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  width: 100%;\n  padding: 24px 0;\n}\n\n.register-form[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] {\n  max-width: none;\n}\n\n.register-form[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 34px;\n  margin: 0;\n  color: #101828;\n}\n\n.register-form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #475467;\n}\n\n//[_ngcontent-%COMP%]   Section[_ngcontent-%COMP%]   groups\n.section-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.section-title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: #101828;\n  margin: 0;\n}\n\n//[_ngcontent-%COMP%]   Profile[_ngcontent-%COMP%]   Avatar\n.profile-avatar-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  width: 80px;\n  height: 80px;\n}\n\n.profile-avatar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 3px solid #f9fafb;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n.profile-avatar-placeholder[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  border: 2px dashed #d1d5db;\n  background: #f9fafb;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n\n  .pi {\n    font-size: 1.5rem;\n    color: #9ca3af;\n  }\n\n  span {\n    font-size: 0.65rem;\n    color: #9ca3af;\n    font-weight: 500;\n  }\n}\n\n.avatar-edit-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  width: 28px;\n  height: 28px;\n  min-width: 28px;\n  padding: 0;\n  border-radius: 50%;\n  background: var(--sqx-color-primary) !important;\n  border: 2px solid #ffffff;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);\n\n  .pi {\n    font-size: 12px;\n  }\n}\n\n.avatar-edit-btn[_ngcontent-%COMP%]:hover {\n  background: var(--sqx-color-primary-dark) !important;\n}\n\n//   Input   fields   matching   login/forgot\n[_nghost-%COMP%]     .register-form .p-iconfield {\n  width: 100%;\n}\n\n[_nghost-%COMP%]     .register-form .p-inputtext {\n  width: 100%;\n  border-radius: 6px;\n  background: #ffffff;\n  border: 1px solid #e5e7eb;\n  padding-left: 44px;\n  box-shadow: none;\n  font-size: 16px;\n}\n\n[_nghost-%COMP%]     .register-form .p-inputtext:focus {\n  border-color: var(--sqx-color-primary);\n  background: #ffffff;\n  box-shadow: 0 0 0 3px rgba(91, 75, 196, 0.1);\n}\n\n[_nghost-%COMP%]     .register-form .p-inputicon {\n  color: #9ca3af;\n  font-size: 16px;\n}\n\n//[_ngcontent-%COMP%]   Resume[_ngcontent-%COMP%]   upload[_ngcontent-%COMP%]   button\n.resume-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n  color: #344054;\n  margin-bottom: 4px;\n}\n\n[_nghost-%COMP%]     .resume-upload-btn.p-button {\n  background: #ffffff;\n  border: 1px solid #e5e7eb;\n  color: #667085;\n  justify-content: flex-start;\n  border-radius: 6px;\n  box-shadow: none !important;\n  outline: none !important;\n  font-weight: 400;\n}\n\n[_nghost-%COMP%]     .resume-upload-btn.p-button:hover {\n  background: #f3f4f6;\n  border-color: #d1d5db;\n  color: #667085;\n}\n\n//[_ngcontent-%COMP%]   Skills[_ngcontent-%COMP%]   section\n.skills-section-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n  color: #344054;\n}\n\n.no-skills-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  padding: 16px;\n  text-align: center;\n  color: #9ca3af;\n  font-size: 14px;\n}\n\n.skills-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  background: #ffffff;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  padding: 12px;\n  min-height: 56px;\n}\n\n[_nghost-%COMP%]     .skill-chip.p-chip {\n  background: var(--sqx-color-primary);\n  color: #ffffff;\n  font-size: 13px;\n  font-weight: 500;\n  border-radius: 999px;\n  padding: 6px 12px;\n\n  .p-chip-remove-icon {\n    color: #ffffff;\n    font-size: 14px;\n    margin-left: 6px;\n\n    &:hover {\n      color: #ffffff;\n      opacity: 0.8;\n    }\n  }\n}\n\n//   Submit   button   matching   login/forgot\n[_nghost-%COMP%]     .login-button.p-button {\n  margin-top: 5px;\n  width: 100%;\n  color: #ffffff;\n  background: var(--sqx-color-primary);\n  border: none;\n  box-shadow: none !important;\n  outline: none !important;\n  transition: all 0.2s ease;\n  border-radius: 6px;\n}\n\n[_nghost-%COMP%]     .login-button.p-button:hover {\n  background: var(--sqx-color-primary-dark);\n  border: none;\n  box-shadow: none;\n}\n\n[_nghost-%COMP%]     .login-button.p-button:focus, \n[_nghost-%COMP%]     .login-button.p-button:active {\n  background: var(--sqx-color-primary);\n  border: none;\n  color: #ffffff;\n  box-shadow: none !important;\n  outline: none !important;\n}\n\n[_nghost-%COMP%]     .login-button.p-button:disabled {\n  background: #e5e7eb;\n  color: #9ca3af;\n  opacity: 1;\n}\n\n//[_ngcontent-%COMP%]   Error[_ngcontent-%COMP%]   messages\n.p-error[_ngcontent-%COMP%] {\n  color: #d32f2f;\n  font-size: 12px;\n}\n\n//[_ngcontent-%COMP%]   Brand[_ngcontent-%COMP%]   link[_ngcontent-%COMP%]   styling[_ngcontent-%COMP%]   (for login link)\n.brand-link[_ngcontent-%COMP%] {\n  color: var(--sqx-color-primary);\n  text-decoration: none;\n  font-weight: 600;\n}\n\n.brand-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n//[_ngcontent-%COMP%]   Responsive[_ngcontent-%COMP%]   adjustments\n@media[_ngcontent-%COMP%]   (max-width[_ngcontent-%COMP%]: 960px) {\n  .register-form {\n    max-width: 100%;\n    padding: 16px 0;\n  }\n\n  .register-scroll-container {\n    max-height: none;\n  }\n}\n\n//[_ngcontent-%COMP%]   Steps[_ngcontent-%COMP%]   Indicator\n.steps-indicator[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  margin: 24px 0;\n}\n\n.step[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n\n  .step-number {\n    width: 40px;\n    height: 40px;\n    border-radius: 50%;\n    background: #f3f4f6;\n    border: 2px solid #e5e7eb;\n    color: #9ca3af;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-weight: 600;\n    font-size: 16px;\n    transition: all 0.3s ease;\n  }\n\n  .step-label {\n    font-size: 12px;\n    color: #9ca3af;\n    font-weight: 500;\n    transition: all 0.3s ease;\n  }\n\n  &.active {\n    .step-number {\n      background: var(--sqx-color-primary);\n      border-color: var(--sqx-color-primary);\n      color: white;\n    }\n\n    .step-label {\n      color: var(--sqx-color-primary);\n    }\n  }\n\n  &.completed {\n    .step-number {\n      background: #10b981;\n      border-color: #10b981;\n      color: white;\n    }\n\n    .step-label {\n      color: #10b981;\n    }\n  }\n}\n\n.step-line[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 2px;\n  background: #e5e7eb;\n  transition: all 0.3s ease;\n\n  &.active {\n    background: var(--sqx-color-primary);\n  }\n}\n\n//[_ngcontent-%COMP%]   OTP[_ngcontent-%COMP%]   Input\n.otp-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin: 24px 0;\n}\n\n.otp-input[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 300px;\n  height: 60px;\n  text-align: center;\n  font-size: 24px;\n  font-weight: 600;\n  letter-spacing: 8px;\n  border: 2px solid #e5e7eb;\n  border-radius: 12px;\n  background: #ffffff;\n  transition: all 0.3s ease;\n\n  &:focus {\n    outline: none;\n    border-color: var(--sqx-color-primary);\n    background: white;\n    box-shadow: 0 0 0 3px rgba(91, 75, 196, 0.1);\n  }\n\n  &::placeholder {\n    letter-spacing: 2px;\n    font-size: 14px;\n    color: #9ca3af;\n  }\n}\n\n//[_ngcontent-%COMP%]   Password[_ngcontent-%COMP%]   Strength[_ngcontent-%COMP%]   Indicator\n.password-strength[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n\n.strength-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 4px;\n  background: #e5e7eb;\n  border-radius: 2px;\n  overflow: hidden;\n  margin-bottom: 4px;\n}\n\n.strength-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  transition: all 0.3s ease;\n  border-radius: 2px;\n\n  &[data-strength=\"weak\"] {\n    width: 33%;\n    background: #ef4444;\n  }\n\n  &[data-strength=\"medium\"] {\n    width: 66%;\n    background: #f59e0b;\n  }\n\n  &[data-strength=\"strong\"] {\n    width: 100%;\n    background: #10b981;\n  }\n}\n\n.strength-text[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: capitalize;\n\n  &[data-strength=\"weak\"] {\n    color: #ef4444;\n  }\n\n  &[data-strength=\"medium\"] {\n    color: #f59e0b;\n  }\n\n  &[data-strength=\"strong\"] {\n    color: #10b981;\n  }\n}\n\n//   Add   Skill   Button\n[_nghost-%COMP%]     .add-skill-btn.p-button {\n  width: 44px;\n  height: 44px;\n  min-width: 44px;\n  padding: 0;\n  background: var(--sqx-color-primary);\n  border: none;\n  border-radius: 6px;\n\n  &:hover {\n    background: var(--sqx-color-primary-dark);\n  }\n\n  &:disabled {\n    background: #e5e7eb;\n    color: #9ca3af;\n  }\n}\n\n//[_ngcontent-%COMP%]   Clickable[_ngcontent-%COMP%]   Profile[_ngcontent-%COMP%]   Avatar\n.profile-avatar-wrapper[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: transform 0.2s ease;\n\n  &:hover {\n    transform: scale(1.05);\n  }\n}\n\n//   Password   Component   Styling\n[_nghost-%COMP%]     .p-password {\n  width: 100%;\n\n  input {\n    width: 100%;\n    border-radius: 6px;\n    background: #ffffff;\n    border: 1px solid #e5e7eb;\n    padding-left: 44px; // Space for lock icon\n    box-shadow: none;\n    font-size: 16px;\n\n    &:focus {\n      border-color: var(--sqx-color-primary);\n      background: #ffffff;\n      box-shadow: 0 0 0 3px rgba(91, 75, 196, 0.1);\n    }\n  }\n\n  // Eye icon cursor pointer\n  .p-password-toggle-icon {\n    cursor: pointer;\n  }\n\n  button {\n    cursor: pointer;\n  }\n}\n\n//[_ngcontent-%COMP%]   OTP[_ngcontent-%COMP%]   Timer[_ngcontent-%COMP%]   Styling\n.otp-timer[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.otp-timer-label[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n//[_ngcontent-%COMP%]   Knob[_ngcontent-%COMP%]   theming\n[_ngcontent-%COMP%]  .p-knob-value {\n  stroke: var(--sqx-color-primary);\n}\n\n  .p-knob-range {\n  stroke: #e5e7eb;\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RegisterComponent, [{
        type: Component,
        args: [{ selector: 'sqx-register', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    FormsModule,
                    RouterLink,
                    ButtonModule,
                    FloatLabelModule,
                    IconFieldModule,
                    InputIconModule,
                    InputTextModule,
                    PasswordModule,
                    ToastModule,
                    ChipModule,
                    KnobModule,
                    TooltipModule
                ], providers: [MessageService], changeDetection: ChangeDetectionStrategy.OnPush, template: "<p-toast></p-toast>\n\n<section class=\"flex flex-column lg:flex-row h-screen overflow-hidden p-2 box-border bg-white\">\n  <div class=\"w-full lg:w-6 p-0 hidden lg:block h-full relative\">\n    <img class=\"w-full h-full block object-cover\" src=\"/assets/images/auth.jpg\" alt=\"Register banner\" />\n    <div class=\"absolute bottom-0 left-0 p-4 lg:p-5 text-white\">\n      <div class=\"hero-content\">\n        <div class=\"hero-slides\">\n          @for (item of carouselItems; track item) {\n          <div class=\"hero-slide\" [class.active]=\"carouselItems.indexOf(item) === activeIndex\">\n            <div class=\"hero-title-stack\">\n              <h3 class=\"hero-title m-0\">{{ item.title }}</h3>\n              <div class=\"hero-quote\">\n                <span class=\"quote-mark\">\u201C</span>{{ item.subtitle }}<span class=\"quote-mark\">\u201D</span>\n              </div>\n            </div>\n          </div>\n          }\n        </div>\n        <div class=\"hero-dots\">\n          @for (item of carouselItems; track item) {\n          <button type=\"button\" [class.active]=\"carouselItems.indexOf(item) === activeIndex\"\n            (click)=\"setActive(carouselItems.indexOf(item))\" aria-label=\"Show slide\"></button>\n          }\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"w-full lg:w-6 h-full p-4 lg:p-6 flex flex-column justify-content-center gap-3 bg-white\">\n    <div class=\"register-scroll-container w-full overflow-y-auto\">\n      @if (currentStep === 1) {\n      <form class=\"register-form\" [formGroup]=\"registerForm\" (ngSubmit)=\"submitStep1()\">\n        <div class=\"flex justify-content-center lg:justify-content-start\">\n          <img src=\"/core/logo.svg\" alt=\"SkillQuestX\" class=\"w-15rem\" />\n        </div>\n\n        <div>\n          <h2 class=\"m-0\">Complete your Profile</h2>\n          <p class=\"mt-2 mb-0\">Let's Get to Know You Better by Filling your Profile</p>\n        </div>\n\n        <div class=\"flex flex-column gap-3\">\n          <div class=\"section-group\">\n            <h3 class=\"section-title\">Contact Details</h3>\n\n            <div class=\"flex justify-content-center lg:justify-content-start mb-3\">\n              <div class=\"profile-avatar-wrapper\" (click)=\"triggerProfileImageUpload()\">\n                @if (profileImagePreview) {\n                  <img [src]=\"profileImagePreview\" alt=\"Profile\" class=\"profile-avatar\" />\n                } @else {\n                  <div class=\"profile-avatar-placeholder\">\n                    <i class=\"pi pi-user-plus\"></i>\n                    <span>Add Photo</span>\n                  </div>\n                }\n                <button type=\"button\" class=\"avatar-edit-btn\" pButton [icon]=\"profileImagePreview ? 'pi pi-pencil' : 'pi pi-camera'\" [pTooltip]=\"profileImagePreview ? 'Change photo' : 'Add photo'\"></button>\n                <input type=\"file\" #profileImageInput id=\"profile-image-input\" accept=\"image/jpeg,image/jpg,image/png\"\n                  (change)=\"onProfileImageSelect($event)\" hidden />\n              </div>\n            </div>\n\n            <div class=\"flex flex-column lg:flex-row gap-3\">\n              <div class=\"flex flex-column gap-1 w-full\">\n                <p-floatlabel variant=\"on\" class=\"w-full\">\n                  <p-iconfield class=\"w-full\">\n                    <p-inputicon class=\"pi pi-user\"></p-inputicon>\n                    <input id=\"reg-firstname\" pInputText type=\"text\" class=\"w-full\" formControlName=\"firstName\" />\n                  </p-iconfield>\n                  <label for=\"reg-firstname\">First Name</label>\n                </p-floatlabel>\n                @if (registerForm.get('firstName')?.touched && registerForm.get('firstName')?.invalid) {\n                <small class=\"p-error\">\n                  @if (registerForm.get('firstName')?.errors?.['required']) {\n                  <span>First name is required.</span>\n                  }\n                  @if (registerForm.get('firstName')?.errors?.['pattern']) {\n                  <span>First name must contain only alphabets.</span>\n                  }\n                </small>\n                }\n              </div>\n\n              <div class=\"flex flex-column gap-1 w-full\">\n                <p-floatlabel variant=\"on\" class=\"w-full\">\n                  <p-iconfield class=\"w-full\">\n                    <p-inputicon class=\"pi pi-user\"></p-inputicon>\n                    <input id=\"reg-lastname\" pInputText type=\"text\" class=\"w-full\" formControlName=\"lastName\" />\n                  </p-iconfield>\n                  <label for=\"reg-lastname\">Last Name</label>\n                </p-floatlabel>\n                @if (registerForm.get('lastName')?.touched && registerForm.get('lastName')?.invalid) {\n                <small class=\"p-error\">\n                  @if (registerForm.get('lastName')?.errors?.['required']) {\n                  <span>Last name is required.</span>\n                  }\n                  @if (registerForm.get('lastName')?.errors?.['pattern']) {\n                  <span>Last name must contain only alphabets.</span>\n                  }\n                </small>\n                }\n              </div>\n            </div>\n\n            <div class=\"flex flex-column lg:flex-row gap-3\">\n              <div class=\"flex flex-column gap-1 w-full\">\n                <p-floatlabel variant=\"on\" class=\"w-full\">\n                  <p-iconfield class=\"w-full\">\n                    <p-inputicon class=\"pi pi-envelope\"></p-inputicon>\n                    <input id=\"reg-email\" pInputText type=\"email\" class=\"w-full\" formControlName=\"email\" />\n                  </p-iconfield>\n                  <label for=\"reg-email\">Email Id</label>\n                </p-floatlabel>\n                @if (registerForm.get('email')?.touched && registerForm.get('email')?.invalid) {\n                <small class=\"p-error\">\n                  @if (registerForm.get('email')?.errors?.['required']) {\n                  <span>Email is required.</span>\n                  }\n                  @if (registerForm.get('email')?.errors?.['email']) {\n                  <span>Enter a valid email address.</span>\n                  }\n                </small>\n                }\n              </div>\n\n              <div class=\"flex flex-column gap-1 w-full\">\n                <p-floatlabel variant=\"on\" class=\"w-full\">\n                  <p-iconfield class=\"w-full\">\n                    <p-inputicon class=\"pi pi-phone\"></p-inputicon>\n                    <input id=\"reg-phone\" pInputText type=\"tel\" class=\"w-full\" formControlName=\"phoneNumber\" />\n                  </p-iconfield>\n                  <label for=\"reg-phone\">Phone Number</label>\n                </p-floatlabel>\n                @if (registerForm.get('phoneNumber')?.touched && registerForm.get('phoneNumber')?.invalid) {\n                <small class=\"p-error\">\n                  @if (registerForm.get('phoneNumber')?.errors?.['required']) {\n                  <span>Phone number is required.</span>\n                  }\n                  @if (registerForm.get('phoneNumber')?.errors?.['pattern']) {\n                  <span>Phone number must be 10 digits.</span>\n                  }\n                </small>\n                }\n              </div>\n            </div>\n\n            <div class=\"section-group\">\n              <h3 class=\"section-title\">Academics</h3>\n\n              <div class=\"flex flex-column gap-1\">\n                <p-floatlabel variant=\"on\" class=\"w-full\">\n                  <p-iconfield class=\"w-full\">\n                    <p-inputicon class=\"pi pi-book\"></p-inputicon>\n                    <input id=\"reg-undergraduate\" pInputText type=\"text\" class=\"w-full\"\n                      formControlName=\"underGraduate\" />\n                  </p-iconfield>\n                  <label for=\"reg-undergraduate\">Under Graduate</label>\n                </p-floatlabel>\n              </div>\n\n              <div class=\"flex flex-column gap-1\">\n                <label class=\"resume-label\">Resume</label>\n                <input type=\"file\" #resumeInput id=\"resume-input\" accept=\".pdf,.doc,.docx,.xls,.xlsx\"\n                  (change)=\"onResumeSelect($event)\" hidden />\n                <button pButton type=\"button\" [label]=\"resumeFileName || 'Upload updated Resume'\" icon=\"pi pi-paperclip\"\n                  class=\"resume-upload-btn w-full\" (click)=\"resumeInput.click()\"></button>\n                @if (resumeFileName) {\n                <small class=\"text-xs text-500\">{{ resumeFileName }}</small>\n                }\n              </div>\n            </div>\n\n            <div class=\"section-group\">\n              <h3 class=\"section-title\">Skills</h3>\n\n              <div class=\"flex flex-column gap-1\">\n                <p-floatlabel variant=\"on\" class=\"w-full\">\n                  <p-iconfield class=\"w-full\">\n                    <p-inputicon class=\"pi pi-tags\"></p-inputicon>\n                    <input id=\"reg-skills\" pInputText type=\"text\" class=\"w-full\" [(ngModel)]=\"skillInput\"\n                      [ngModelOptions]=\"{standalone: true}\" (keydown.enter)=\"addSkill($event)\" />\n                  </p-iconfield>\n                  <label for=\"reg-skills\">Add Skills <span class=\"text-400 text-xs\">(Upto 10 Skills)</span></label>\n                </p-floatlabel>\n              </div>\n\n              <div class=\"flex flex-column gap-1\">\n                <label class=\"skills-section-label\">Skills added</label>\n                @if (skills.length === 0) {\n                <div class=\"no-skills-card\">\n                  <span class=\"text-500\">No skills added. Press Enter to add</span>\n                </div>\n                } @else {\n                <div class=\"skills-container\">\n                  @for (skill of skills; track skill) {\n                  <p-chip [label]=\"skill\" [removable]=\"true\" (onRemove)=\"removeSkill(skill)\"\n                    styleClass=\"skill-chip\"></p-chip>\n                  }\n                </div>\n                }\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <button pButton type=\"submit\" label=\"Continue to Verify Email\" class=\"login-button w-full\"\n          [loading]=\"submitting()\" [disabled]=\"registerForm.invalid || submitting()\"></button>\n\n        <div class=\"text-sm text-center\">\n          Already have an account? <a routerLink=\"/login\" class=\"brand-link\">Login</a>\n        </div>\n      </form>\n      }\n\n      @if (currentStep === 2) {\n      <form class=\"register-form\" (ngSubmit)=\"submitOTP()\">\n        <div class=\"flex justify-content-center lg:justify-content-start\">\n          <img src=\"/core/logo.svg\" alt=\"SkillQuestX\" class=\"w-15rem\" />\n        </div>\n\n        <div>\n          <h2 class=\"m-0\">Verify Your Email</h2>\n          <p class=\"mt-2 mb-0\">We sent a 6-digit code to <strong>{{ registerForm.get('email')?.value }}</strong></p>\n        </div>\n\n        <div class=\"flex flex-column gap-3\">\n          <div class=\"flex flex-column gap-1\">\n            <p-floatlabel variant=\"on\" class=\"w-full\">\n              <p-iconfield class=\"w-full\">\n                <p-inputicon class=\"pi pi-key\"></p-inputicon>\n                <input id=\"reg-otp\" pInputText type=\"text\" maxlength=\"6\" [(ngModel)]=\"otpCode\"\n                  [ngModelOptions]=\"{standalone: true}\" class=\"w-full\" />\n              </p-iconfield>\n              <label for=\"reg-otp\">OTP</label>\n            </p-floatlabel>\n          </div>\n\n          <div class=\"flex flex-column gap-2 align-items-center\">\n            <div class=\"text-sm text-600\">OTP expires in</div>\n            <div class=\"otp-timer\">\n              <p-knob [ngModel]=\"otpProgress\" [ngModelOptions]=\"{ standalone: true }\" [readonly]=\"true\"\n                [strokeWidth]=\"8\" [size]=\"90\" [showValue]=\"false\"></p-knob>\n              <div class=\"otp-timer-label text-sm font-medium\">{{ formatTime(resendTimer) }}</div>\n            </div>\n          </div>\n\n          <div class=\"flex flex-column sm:flex-row gap-2\">\n            <button pButton type=\"submit\" label=\"Verify OTP\" class=\"login-button w-full\"\n              [loading]=\"submitting()\" [disabled]=\"otpCode.length !== 6 || submitting()\"></button>\n            <button pButton type=\"button\" label=\"Resend OTP\" class=\"p-button-outlined w-full\" [disabled]=\"!canResendOTP\"\n              (click)=\"resendOTP()\"></button>\n          </div>\n        </div>\n      </form>\n      }\n\n      @if (currentStep === 3) {\n      <form class=\"register-form\" [formGroup]=\"passwordForm\" (ngSubmit)=\"submitPassword()\">\n        <div class=\"flex justify-content-center lg:justify-content-start\">\n          <img src=\"/core/logo.svg\" alt=\"SkillQuestX\" class=\"w-15rem\" />\n        </div>\n\n        <div>\n          <h2 class=\"m-0\">Create Your Password</h2>\n          <p class=\"mt-2 mb-0\">Choose a strong password to secure your account</p>\n        </div>\n\n        <div class=\"flex flex-column gap-3\">\n          <div class=\"flex flex-column gap-1\">\n            <p-floatlabel variant=\"on\" class=\"w-full\">\n              <p-iconfield class=\"w-full\">\n                <p-inputicon class=\"pi pi-lock\"></p-inputicon>\n                <p-password id=\"reg-password\" class=\"w-full\" formControlName=\"password\" [feedback]=\"false\"\n                  [toggleMask]=\"true\">\n                </p-password>\n              </p-iconfield>\n              <label for=\"reg-password\">Password</label>\n            </p-floatlabel>\n            @if (passwordForm.get('password')?.touched && passwordForm.get('password')?.invalid) {\n            <small class=\"p-error\">Password must be at least 8 characters.</small>\n            }\n\n            @if (passwordForm.get('password')?.value) {\n            <div class=\"password-strength\">\n              <div class=\"strength-bar\">\n                <div class=\"strength-fill\" [attr.data-strength]=\"getPasswordStrength()\"></div>\n              </div>\n              <small class=\"strength-text\" [attr.data-strength]=\"getPasswordStrength()\">\n                Password strength: {{ getPasswordStrength() }}\n              </small>\n            </div>\n            }\n          </div>\n\n          <div class=\"flex flex-column gap-1\">\n            <p-floatlabel variant=\"on\" class=\"w-full\">\n              <p-iconfield class=\"w-full\">\n                <p-inputicon class=\"pi pi-lock\"></p-inputicon>\n                <p-password id=\"reg-confirm-password\" class=\"w-full\" formControlName=\"confirmPassword\"\n                  [feedback]=\"false\" [toggleMask]=\"true\">\n                </p-password>\n              </p-iconfield>\n              <label for=\"reg-confirm-password\">Confirm Password</label>\n            </p-floatlabel>\n            @if (passwordForm.get('confirmPassword')?.touched && passwordForm.hasError('passwordMismatch')) {\n            <small class=\"p-error\">Passwords do not match.</small>\n            }\n          </div>\n        </div>\n\n        <button pButton type=\"submit\" label=\"Complete Registration\" class=\"login-button w-full\"\n          [loading]=\"submitting()\" [disabled]=\"passwordForm.invalid || submitting()\"></button>\n\n        <div class=\"text-sm text-center\">\n          Already have an account? <a routerLink=\"/login\" class=\"brand-link\">Login</a>\n        </div>\n      </form>\n      }\n    </div>\n  </div>\n</section>", styles: ["// Hero section styles (matching login/forgot)\n.hero-content {\n  max-width: 720px;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n\n.hero-slides {\n  position: relative;\n  min-height: 72px;\n}\n\n.hero-slide {\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  transform: translateY(8px);\n  transition: opacity 0.4s ease, transform 0.4s ease;\n}\n\n.hero-slide.active {\n  opacity: 1;\n  transform: translateY(0);\n}\n\n.hero-title-stack {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\n.hero-title {\n  font-size: 28px;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n}\n\n.hero-quote {\n  font-size: 16px;\n  line-height: 1.6;\n  margin: 0;\n  position: relative;\n  white-space: nowrap;\n}\n\n.quote-mark {\n  font-size: 36px;\n  line-height: 0;\n  vertical-align: baseline;\n  opacity: 0.6;\n}\n\n.hero-dots {\n  display: flex;\n  gap: 8px;\n}\n\n.hero-dots button {\n  width: 20px;\n  height: 4px;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.35);\n  border: none;\n  padding: 0;\n  cursor: pointer;\n}\n\n.hero-dots button.active {\n  width: 40px;\n  background: #ffffff;\n}\n\n// Register form container with scroll\n.register-scroll-container {\n  max-height: 100%;\n  padding-right: 8px;\n\n  &::-webkit-scrollbar {\n    width: 6px;\n  }\n\n  &::-webkit-scrollbar-track {\n    background: transparent;\n  }\n\n  &::-webkit-scrollbar-thumb {\n    background: #d1d5db;\n    border-radius: 3px;\n  }\n\n  &::-webkit-scrollbar-thumb:hover {\n    background: #9ca3af;\n  }\n}\n\n// Register form styles\n.register-form {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  width: 100%;\n  padding: 24px 0;\n}\n\n.register-form>* {\n  max-width: none;\n}\n\n.register-form h2 {\n  font-size: 34px;\n  margin: 0;\n  color: #101828;\n}\n\n.register-form p {\n  font-size: 16px;\n  color: #475467;\n}\n\n// Section groups\n.section-group {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.section-title {\n  font-size: 16px;\n  font-weight: 600;\n  color: #101828;\n  margin: 0;\n}\n\n// Profile Avatar\n.profile-avatar-wrapper {\n  position: relative;\n  width: 80px;\n  height: 80px;\n}\n\n.profile-avatar {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 3px solid #f9fafb;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n.profile-avatar-placeholder {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  border: 2px dashed #d1d5db;\n  background: #f9fafb;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n\n  .pi {\n    font-size: 1.5rem;\n    color: #9ca3af;\n  }\n\n  span {\n    font-size: 0.65rem;\n    color: #9ca3af;\n    font-weight: 500;\n  }\n}\n\n.avatar-edit-btn {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  width: 28px;\n  height: 28px;\n  min-width: 28px;\n  padding: 0;\n  border-radius: 50%;\n  background: var(--sqx-color-primary) !important;\n  border: 2px solid #ffffff;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);\n\n  .pi {\n    font-size: 12px;\n  }\n}\n\n.avatar-edit-btn:hover {\n  background: var(--sqx-color-primary-dark) !important;\n}\n\n// Input fields matching login/forgot\n:host ::ng-deep .register-form .p-iconfield {\n  width: 100%;\n}\n\n:host ::ng-deep .register-form .p-inputtext {\n  width: 100%;\n  border-radius: 6px;\n  background: #ffffff;\n  border: 1px solid #e5e7eb;\n  padding-left: 44px;\n  box-shadow: none;\n  font-size: 16px;\n}\n\n:host ::ng-deep .register-form .p-inputtext:focus {\n  border-color: var(--sqx-color-primary);\n  background: #ffffff;\n  box-shadow: 0 0 0 3px rgba(91, 75, 196, 0.1);\n}\n\n:host ::ng-deep .register-form .p-inputicon {\n  color: #9ca3af;\n  font-size: 16px;\n}\n\n// Resume upload button\n.resume-label {\n  font-size: 14px;\n  font-weight: 500;\n  color: #344054;\n  margin-bottom: 4px;\n}\n\n:host ::ng-deep .resume-upload-btn.p-button {\n  background: #ffffff;\n  border: 1px solid #e5e7eb;\n  color: #667085;\n  justify-content: flex-start;\n  border-radius: 6px;\n  box-shadow: none !important;\n  outline: none !important;\n  font-weight: 400;\n}\n\n:host ::ng-deep .resume-upload-btn.p-button:hover {\n  background: #f3f4f6;\n  border-color: #d1d5db;\n  color: #667085;\n}\n\n// Skills section\n.skills-section-label {\n  font-size: 14px;\n  font-weight: 500;\n  color: #344054;\n}\n\n.no-skills-card {\n  background: #ffffff;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  padding: 16px;\n  text-align: center;\n  color: #9ca3af;\n  font-size: 14px;\n}\n\n.skills-container {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  background: #ffffff;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  padding: 12px;\n  min-height: 56px;\n}\n\n:host ::ng-deep .skill-chip.p-chip {\n  background: var(--sqx-color-primary);\n  color: #ffffff;\n  font-size: 13px;\n  font-weight: 500;\n  border-radius: 999px;\n  padding: 6px 12px;\n\n  .p-chip-remove-icon {\n    color: #ffffff;\n    font-size: 14px;\n    margin-left: 6px;\n\n    &:hover {\n      color: #ffffff;\n      opacity: 0.8;\n    }\n  }\n}\n\n// Submit button matching login/forgot\n:host ::ng-deep .login-button.p-button {\n  margin-top: 5px;\n  width: 100%;\n  color: #ffffff;\n  background: var(--sqx-color-primary);\n  border: none;\n  box-shadow: none !important;\n  outline: none !important;\n  transition: all 0.2s ease;\n  border-radius: 6px;\n}\n\n:host ::ng-deep .login-button.p-button:hover {\n  background: var(--sqx-color-primary-dark);\n  border: none;\n  box-shadow: none;\n}\n\n:host ::ng-deep .login-button.p-button:focus,\n:host ::ng-deep .login-button.p-button:active {\n  background: var(--sqx-color-primary);\n  border: none;\n  color: #ffffff;\n  box-shadow: none !important;\n  outline: none !important;\n}\n\n:host ::ng-deep .login-button.p-button:disabled {\n  background: #e5e7eb;\n  color: #9ca3af;\n  opacity: 1;\n}\n\n// Error messages\n.p-error {\n  color: #d32f2f;\n  font-size: 12px;\n}\n\n// Brand link styling (for login link)\n.brand-link {\n  color: var(--sqx-color-primary);\n  text-decoration: none;\n  font-weight: 600;\n}\n\n.brand-link:hover {\n  text-decoration: underline;\n}\n\n// Responsive adjustments\n@media (max-width: 960px) {\n  .register-form {\n    max-width: 100%;\n    padding: 16px 0;\n  }\n\n  .register-scroll-container {\n    max-height: none;\n  }\n}\n\n// Steps Indicator\n.steps-indicator {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  margin: 24px 0;\n}\n\n.step {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n\n  .step-number {\n    width: 40px;\n    height: 40px;\n    border-radius: 50%;\n    background: #f3f4f6;\n    border: 2px solid #e5e7eb;\n    color: #9ca3af;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-weight: 600;\n    font-size: 16px;\n    transition: all 0.3s ease;\n  }\n\n  .step-label {\n    font-size: 12px;\n    color: #9ca3af;\n    font-weight: 500;\n    transition: all 0.3s ease;\n  }\n\n  &.active {\n    .step-number {\n      background: var(--sqx-color-primary);\n      border-color: var(--sqx-color-primary);\n      color: white;\n    }\n\n    .step-label {\n      color: var(--sqx-color-primary);\n    }\n  }\n\n  &.completed {\n    .step-number {\n      background: #10b981;\n      border-color: #10b981;\n      color: white;\n    }\n\n    .step-label {\n      color: #10b981;\n    }\n  }\n}\n\n.step-line {\n  width: 60px;\n  height: 2px;\n  background: #e5e7eb;\n  transition: all 0.3s ease;\n\n  &.active {\n    background: var(--sqx-color-primary);\n  }\n}\n\n// OTP Input\n.otp-container {\n  display: flex;\n  justify-content: center;\n  margin: 24px 0;\n}\n\n.otp-input {\n  width: 100%;\n  max-width: 300px;\n  height: 60px;\n  text-align: center;\n  font-size: 24px;\n  font-weight: 600;\n  letter-spacing: 8px;\n  border: 2px solid #e5e7eb;\n  border-radius: 12px;\n  background: #ffffff;\n  transition: all 0.3s ease;\n\n  &:focus {\n    outline: none;\n    border-color: var(--sqx-color-primary);\n    background: white;\n    box-shadow: 0 0 0 3px rgba(91, 75, 196, 0.1);\n  }\n\n  &::placeholder {\n    letter-spacing: 2px;\n    font-size: 14px;\n    color: #9ca3af;\n  }\n}\n\n// Password Strength Indicator\n.password-strength {\n  margin-top: 8px;\n}\n\n.strength-bar {\n  width: 100%;\n  height: 4px;\n  background: #e5e7eb;\n  border-radius: 2px;\n  overflow: hidden;\n  margin-bottom: 4px;\n}\n\n.strength-fill {\n  height: 100%;\n  transition: all 0.3s ease;\n  border-radius: 2px;\n\n  &[data-strength=\"weak\"] {\n    width: 33%;\n    background: #ef4444;\n  }\n\n  &[data-strength=\"medium\"] {\n    width: 66%;\n    background: #f59e0b;\n  }\n\n  &[data-strength=\"strong\"] {\n    width: 100%;\n    background: #10b981;\n  }\n}\n\n.strength-text {\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: capitalize;\n\n  &[data-strength=\"weak\"] {\n    color: #ef4444;\n  }\n\n  &[data-strength=\"medium\"] {\n    color: #f59e0b;\n  }\n\n  &[data-strength=\"strong\"] {\n    color: #10b981;\n  }\n}\n\n// Add Skill Button\n:host ::ng-deep .add-skill-btn.p-button {\n  width: 44px;\n  height: 44px;\n  min-width: 44px;\n  padding: 0;\n  background: var(--sqx-color-primary);\n  border: none;\n  border-radius: 6px;\n\n  &:hover {\n    background: var(--sqx-color-primary-dark);\n  }\n\n  &:disabled {\n    background: #e5e7eb;\n    color: #9ca3af;\n  }\n}\n\n// Clickable Profile Avatar\n.profile-avatar-wrapper {\n  cursor: pointer;\n  transition: transform 0.2s ease;\n\n  &:hover {\n    transform: scale(1.05);\n  }\n}\n\n// Password Component Styling\n:host ::ng-deep .p-password {\n  width: 100%;\n\n  input {\n    width: 100%;\n    border-radius: 6px;\n    background: #ffffff;\n    border: 1px solid #e5e7eb;\n    padding-left: 44px; // Space for lock icon\n    box-shadow: none;\n    font-size: 16px;\n\n    &:focus {\n      border-color: var(--sqx-color-primary);\n      background: #ffffff;\n      box-shadow: 0 0 0 3px rgba(91, 75, 196, 0.1);\n    }\n  }\n\n  // Eye icon cursor pointer\n  .p-password-toggle-icon {\n    cursor: pointer;\n  }\n\n  button {\n    cursor: pointer;\n  }\n}\n\n// OTP Timer Styling\n.otp-timer {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.otp-timer-label {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n// Knob theming\n::ng-deep .p-knob-value {\n  stroke: var(--sqx-color-primary);\n}\n\n::ng-deep .p-knob-range {\n  stroke: #e5e7eb;\n}"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i0.ChangeDetectorRef }, { type: i2.Router }, { type: i3.MessageService }, { type: i4.AuthService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src/app/modules/core/components/register/register.component.ts", lineNumber: 44 }); })();
