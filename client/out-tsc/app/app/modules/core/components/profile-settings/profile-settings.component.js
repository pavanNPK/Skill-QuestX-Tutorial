import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { getFriendlyErrorMessage } from '../../../../shared/utils/error-messages.util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "primeng/button";
import * as i3 from "primeng/inputtext";
import * as i4 from "primeng/floatlabel";
import * as i5 from "primeng/toast";
function ProfileSettingsComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 5);
    i0.ɵɵpipe(1, "safeUrl");
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", i0.ɵɵpipeBind1(1, 1, (tmp_1_0 = ctx_r0.auth.currentUser()) == null ? null : tmp_1_0.profileImageUrl), i0.ɵɵsanitizeUrl);
} }
function ProfileSettingsComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.userInitials());
} }
function ProfileSettingsComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 12);
    i0.ɵɵtext(1, "First name is required.");
    i0.ɵɵelementEnd();
} }
function ProfileSettingsComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 12);
    i0.ɵɵtext(1, "Last name is required.");
    i0.ɵɵelementEnd();
} }
export class ProfileSettingsComponent {
    fb = inject(FormBuilder);
    auth = inject(AuthService);
    messageService = inject(MessageService);
    submitting = signal(false, ...(ngDevMode ? [{ debugName: "submitting" }] : []));
    form;
    constructor() {
        const u = this.auth.currentUser();
        this.form = this.fb.group({
            firstName: [u?.firstName ?? '', [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
            lastName: [u?.lastName ?? '', [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
        });
    }
    userInitials() {
        const u = this.auth.currentUser();
        if (!u?.firstName && !u?.lastName)
            return (u?.name?.slice(0, 2) ?? 'U').toUpperCase();
        const f = (u.firstName ?? '').trim().charAt(0);
        const l = (u.lastName ?? '').trim().charAt(0);
        return (f + l).toUpperCase() || (u.name?.slice(0, 2) ?? 'U').toUpperCase();
    }
    save() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.submitting.set(true);
        this.auth.updateProfile(this.form.value).subscribe({
            next: () => {
                this.submitting.set(false);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Profile updated',
                    detail: 'Your details have been saved.',
                });
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
    static ɵfac = function ProfileSettingsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProfileSettingsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProfileSettingsComponent, selectors: [["sqx-profile-settings"]], features: [i0.ɵɵProvidersFeature([MessageService])], decls: 40, vars: 8, consts: [[1, "profile-settings-page"], [1, "profile-card", "card"], [1, "card-heading"], [1, "profile-row"], [1, "profile-avatar"], ["alt", "Profile", 3, "src"], [1, "avatar-initials"], [1, "profile-details", "profile-form", 3, "ngSubmit", "formGroup"], [1, "form-field"], ["variant", "on", 1, "w-full"], ["pInputText", "", "formControlName", "firstName", "id", "firstName", 1, "w-full"], ["for", "firstName"], [1, "p-error"], ["pInputText", "", "formControlName", "lastName", "id", "lastName", 1, "w-full"], ["for", "lastName"], [1, "detail-row", "read-only"], [1, "label"], [1, "value"], [1, "profile-actions"], ["pButton", "", "type", "submit", "label", "Save changes", 1, "p-button-primary", 3, "loading", "disabled"], ["pButton", "", "routerLink", "/change-password", "label", "Change password", "icon", "pi pi-lock", 1, "p-button-outlined"], [1, "preferences-card", "card"], [1, "coming-soon"]], template: function ProfileSettingsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "p-toast");
            i0.ɵɵelementStart(2, "div", 1)(3, "h2", 2);
            i0.ɵɵtext(4, "Account");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 3)(6, "div", 4);
            i0.ɵɵconditionalCreate(7, ProfileSettingsComponent_Conditional_7_Template, 2, 3, "img", 5)(8, ProfileSettingsComponent_Conditional_8_Template, 2, 1, "span", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "form", 7);
            i0.ɵɵlistener("ngSubmit", function ProfileSettingsComponent_Template_form_ngSubmit_9_listener() { return ctx.save(); });
            i0.ɵɵelementStart(10, "div", 8)(11, "p-floatlabel", 9);
            i0.ɵɵelement(12, "input", 10);
            i0.ɵɵelementStart(13, "label", 11);
            i0.ɵɵtext(14, "First name");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(15, ProfileSettingsComponent_Conditional_15_Template, 2, 0, "small", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "div", 8)(17, "p-floatlabel", 9);
            i0.ɵɵelement(18, "input", 13);
            i0.ɵɵelementStart(19, "label", 14);
            i0.ɵɵtext(20, "Last name");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(21, ProfileSettingsComponent_Conditional_21_Template, 2, 0, "small", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 15)(23, "span", 16);
            i0.ɵɵtext(24, "Email (username)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "span", 17);
            i0.ɵɵtext(26);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "div", 15)(28, "span", 16);
            i0.ɵɵtext(29, "Role");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "span", 17);
            i0.ɵɵtext(31);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(32, "div", 18);
            i0.ɵɵelement(33, "button", 19)(34, "a", 20);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(35, "div", 21)(36, "h2", 2);
            i0.ɵɵtext(37, "User Preferences");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "p", 22);
            i0.ɵɵtext(39, "We'll add user preferences here in a future update.");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            let tmp_0_0;
            let tmp_2_0;
            let tmp_3_0;
            let tmp_4_0;
            i0.ɵɵadvance(7);
            i0.ɵɵconditional(((tmp_0_0 = ctx.auth.currentUser()) == null ? null : tmp_0_0.profileImageUrl) ? 7 : 8);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(((tmp_2_0 = ctx.form.get("firstName")) == null ? null : tmp_2_0.touched) && ((tmp_2_0 = ctx.form.get("firstName")) == null ? null : tmp_2_0.invalid) ? 15 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(((tmp_3_0 = ctx.form.get("lastName")) == null ? null : tmp_3_0.touched) && ((tmp_3_0 = ctx.form.get("lastName")) == null ? null : tmp_3_0.invalid) ? 21 : -1);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(((tmp_4_0 = ctx.auth.currentUser()) == null ? null : tmp_4_0.email) ?? "\u2014");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.auth.roleLabel());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("loading", ctx.submitting())("disabled", ctx.submitting() || ctx.form.invalid || ctx.form.pristine);
        } }, dependencies: [CommonModule,
            ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink,
            ButtonModule, i2.ButtonDirective, CardModule,
            InputTextModule, i3.InputText, FloatLabelModule, i4.FloatLabel, ToastModule, i5.Toast, SafeUrlPipe], styles: [".profile-settings-page[_ngcontent-%COMP%] {\n  padding: 1.5rem 2rem;\n  width: 100%;\n}\n\n.card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 12px;\n  border: 1px solid #e5e7eb;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);\n}\n\n.card-heading[_ngcontent-%COMP%] {\n  margin: 0 0 1rem 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #374151;\n}\n\n.profile-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1.5rem;\n  align-items: flex-start;\n}\n\n.profile-avatar[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  overflow: hidden;\n  background: var(--sqx-color-primary, #5B4BC4);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n  }\n}\n\n.avatar-initials[_ngcontent-%COMP%] {\n  color: #fff;\n  font-size: 1.5rem;\n  font-weight: 600;\n}\n\n.profile-details[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.profile-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n\n.form-field[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n}\n\n.detail-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem 1rem;\n  margin-bottom: 0.5rem;\n\n  .label {\n    font-size: 0.875rem;\n    color: #6b7280;\n    min-width: 6rem;\n  }\n\n  .value {\n    font-size: 0.9375rem;\n    color: #1f2937;\n  }\n\n  &.read-only .value {\n    color: #4b5563;\n  }\n}\n\n.profile-actions[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n\n  .p-button-primary {\n    background: var(--sqx-color-primary, #5B4BC4) !important;\n    border: none !important;\n    box-shadow: none !important;\n  }\n\n  .p-button-outlined {\n    border-color: var(--sqx-color-primary, #5B4BC4);\n    color: var(--sqx-color-primary, #5B4BC4);\n  }\n}\n\n.preferences-card[_ngcontent-%COMP%]   .coming-soon[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.9375rem;\n  color: #6b7280;\n  font-style: italic;\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProfileSettingsComponent, [{
        type: Component,
        args: [{ selector: 'sqx-profile-settings', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    RouterLink,
                    ButtonModule,
                    CardModule,
                    InputTextModule,
                    FloatLabelModule,
                    ToastModule,
                    SafeUrlPipe,
                ], providers: [MessageService], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"profile-settings-page\">\n  <p-toast />\n  <div class=\"profile-card card\">\n    <h2 class=\"card-heading\">Account</h2>\n    <div class=\"profile-row\">\n      <div class=\"profile-avatar\">\n        @if (auth.currentUser()?.profileImageUrl) {\n          <img [src]=\"auth.currentUser()?.profileImageUrl | safeUrl\" alt=\"Profile\" />\n        } @else {\n          <span class=\"avatar-initials\">{{ userInitials() }}</span>\n        }\n      </div>\n      <form [formGroup]=\"form\" (ngSubmit)=\"save()\" class=\"profile-details profile-form\">\n        <div class=\"form-field\">\n          <p-floatlabel variant=\"on\" class=\"w-full\">\n            <input pInputText formControlName=\"firstName\" id=\"firstName\" class=\"w-full\" />\n            <label for=\"firstName\">First name</label>\n          </p-floatlabel>\n          @if (form.get('firstName')?.touched && form.get('firstName')?.invalid) {\n            <small class=\"p-error\">First name is required.</small>\n          }\n        </div>\n        <div class=\"form-field\">\n          <p-floatlabel variant=\"on\" class=\"w-full\">\n            <input pInputText formControlName=\"lastName\" id=\"lastName\" class=\"w-full\" />\n            <label for=\"lastName\">Last name</label>\n          </p-floatlabel>\n          @if (form.get('lastName')?.touched && form.get('lastName')?.invalid) {\n            <small class=\"p-error\">Last name is required.</small>\n          }\n        </div>\n        <div class=\"detail-row read-only\">\n          <span class=\"label\">Email (username)</span>\n          <span class=\"value\">{{ auth.currentUser()?.email ?? '\u2014' }}</span>\n        </div>\n        <div class=\"detail-row read-only\">\n          <span class=\"label\">Role</span>\n          <span class=\"value\">{{ auth.roleLabel() }}</span>\n        </div>\n        <div class=\"profile-actions\">\n          <button pButton type=\"submit\" label=\"Save changes\" class=\"p-button-primary\"\n            [loading]=\"submitting()\" [disabled]=\"submitting() || form.invalid || form.pristine\"></button>\n          <a pButton routerLink=\"/change-password\" label=\"Change password\" class=\"p-button-outlined\" icon=\"pi pi-lock\"></a>\n        </div>\n      </form>\n    </div>\n  </div>\n\n  <div class=\"preferences-card card\">\n    <h2 class=\"card-heading\">User Preferences</h2>\n    <p class=\"coming-soon\">We'll add user preferences here in a future update.</p>\n  </div>\n</div>\n", styles: [".profile-settings-page {\n  padding: 1.5rem 2rem;\n  width: 100%;\n}\n\n.card {\n  background: #fff;\n  border-radius: 12px;\n  border: 1px solid #e5e7eb;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);\n}\n\n.card-heading {\n  margin: 0 0 1rem 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #374151;\n}\n\n.profile-row {\n  display: flex;\n  gap: 1.5rem;\n  align-items: flex-start;\n}\n\n.profile-avatar {\n  flex-shrink: 0;\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  overflow: hidden;\n  background: var(--sqx-color-primary, #5B4BC4);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n  }\n}\n\n.avatar-initials {\n  color: #fff;\n  font-size: 1.5rem;\n  font-weight: 600;\n}\n\n.profile-details {\n  flex: 1;\n  min-width: 0;\n}\n\n.profile-form {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n\n.form-field {\n  margin-bottom: 0.5rem;\n}\n\n.detail-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem 1rem;\n  margin-bottom: 0.5rem;\n\n  .label {\n    font-size: 0.875rem;\n    color: #6b7280;\n    min-width: 6rem;\n  }\n\n  .value {\n    font-size: 0.9375rem;\n    color: #1f2937;\n  }\n\n  &.read-only .value {\n    color: #4b5563;\n  }\n}\n\n.profile-actions {\n  margin-top: 1rem;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n\n  .p-button-primary {\n    background: var(--sqx-color-primary, #5B4BC4) !important;\n    border: none !important;\n    box-shadow: none !important;\n  }\n\n  .p-button-outlined {\n    border-color: var(--sqx-color-primary, #5B4BC4);\n    color: var(--sqx-color-primary, #5B4BC4);\n  }\n}\n\n.preferences-card .coming-soon {\n  margin: 0;\n  font-size: 0.9375rem;\n  color: #6b7280;\n  font-style: italic;\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProfileSettingsComponent, { className: "ProfileSettingsComponent", filePath: "src/app/modules/core/components/profile-settings/profile-settings.component.ts", lineNumber: 34 }); })();
