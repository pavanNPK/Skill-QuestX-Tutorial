import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { getFriendlyErrorMessage } from '../../../../shared/utils/error-messages.util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "primeng/button";
import * as i3 from "primeng/password";
import * as i4 from "primeng/floatlabel";
import * as i5 from "primeng/iconfield";
import * as i6 from "primeng/inputicon";
import * as i7 from "primeng/toast";
function ChangePasswordComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 9);
    i0.ɵɵtext(1, "Current password is required.");
    i0.ɵɵelementEnd();
} }
function ChangePasswordComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 9);
    i0.ɵɵtext(1, "Password must be at least 8 characters.");
    i0.ɵɵelementEnd();
} }
function ChangePasswordComponent_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 9);
    i0.ɵɵtext(1, "Passwords do not match.");
    i0.ɵɵelementEnd();
} }
export class ChangePasswordComponent {
    fb = inject(FormBuilder);
    router = inject(Router);
    auth = inject(AuthService);
    messageService = inject(MessageService);
    submitting = signal(false, ...(ngDevMode ? [{ debugName: "submitting" }] : []));
    form;
    constructor() {
        this.form = this.fb.group({
            currentPassword: ['', [Validators.required, Validators.minLength(6)]],
            newPassword: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required]],
        }, { validators: this.passwordMatchValidator });
    }
    passwordMatchValidator(g) {
        const newP = g.get('newPassword')?.value;
        const confirm = g.get('confirmPassword')?.value;
        if (newP && confirm && newP !== confirm)
            return { mismatch: true };
        return null;
    }
    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const currentPassword = this.form.get('currentPassword')?.value;
        const newPassword = this.form.get('newPassword')?.value;
        this.submitting.set(true);
        this.auth.changePassword(currentPassword, newPassword).subscribe({
            next: (res) => {
                this.submitting.set(false);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Password updated',
                    detail: res.message ?? 'Please sign in again with your new password.',
                });
                this.auth.logout();
            },
            error: (err) => {
                this.submitting.set(false);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: getFriendlyErrorMessage(err, {
                        default: 'Could not update password. Check your current password and try again.',
                    }),
                });
            },
        });
    }
    static ɵfac = function ChangePasswordComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ChangePasswordComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ChangePasswordComponent, selectors: [["sqx-change-password"]], features: [i0.ɵɵProvidersFeature([MessageService])], decls: 31, vars: 12, consts: [[1, "page-container", "change-password-page"], [1, "form-card", "change-password-card"], [1, "change-password-form", 3, "ngSubmit", "formGroup"], [1, "form-field"], ["variant", "on", 1, "w-full"], [1, "w-full"], [1, "pi", "pi-lock"], ["formControlName", "currentPassword", "inputStyleClass", "w-full", "inputId", "current-pw", 1, "w-full", 3, "feedback", "toggleMask"], ["for", "current-pw"], [1, "p-error"], ["formControlName", "newPassword", "inputStyleClass", "w-full", "inputId", "new-pw", 1, "w-full", 3, "feedback", "toggleMask"], ["for", "new-pw"], ["formControlName", "confirmPassword", "inputStyleClass", "w-full", "inputId", "confirm-pw", 1, "w-full", 3, "feedback", "toggleMask"], ["for", "confirm-pw"], [1, "form-actions"], ["pButton", "", "type", "submit", "label", "Update password", 1, "p-button-primary", 3, "loading", "disabled"], ["pButton", "", "routerLink", "/dashboard", "label", "Cancel", 1, "p-button-outlined"]], template: function ChangePasswordComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "p-toast");
            i0.ɵɵelementStart(2, "div", 1)(3, "form", 2);
            i0.ɵɵlistener("ngSubmit", function ChangePasswordComponent_Template_form_ngSubmit_3_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(4, "div", 3)(5, "p-floatlabel", 4)(6, "p-iconfield", 5);
            i0.ɵɵelement(7, "p-inputicon", 6)(8, "p-password", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "label", 8);
            i0.ɵɵtext(10, "Current password");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(11, ChangePasswordComponent_Conditional_11_Template, 2, 0, "small", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "div", 3)(13, "p-floatlabel", 4)(14, "p-iconfield", 5);
            i0.ɵɵelement(15, "p-inputicon", 6)(16, "p-password", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "label", 11);
            i0.ɵɵtext(18, "New password");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(19, ChangePasswordComponent_Conditional_19_Template, 2, 0, "small", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "div", 3)(21, "p-floatlabel", 4)(22, "p-iconfield", 5);
            i0.ɵɵelement(23, "p-inputicon", 6)(24, "p-password", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "label", 13);
            i0.ɵɵtext(26, "Confirm new password");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(27, ChangePasswordComponent_Conditional_27_Template, 2, 0, "small", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "div", 14);
            i0.ɵɵelement(29, "button", 15)(30, "a", 16);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            let tmp_3_0;
            let tmp_6_0;
            let tmp_9_0;
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("feedback", false)("toggleMask", true);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(((tmp_3_0 = ctx.form.get("currentPassword")) == null ? null : tmp_3_0.touched) && ((tmp_3_0 = ctx.form.get("currentPassword")) == null ? null : tmp_3_0.invalid) ? 11 : -1);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("feedback", true)("toggleMask", true);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(((tmp_6_0 = ctx.form.get("newPassword")) == null ? null : tmp_6_0.touched) && ((tmp_6_0 = ctx.form.get("newPassword")) == null ? null : tmp_6_0.invalid) ? 19 : -1);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("feedback", false)("toggleMask", true);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(((tmp_9_0 = ctx.form.get("confirmPassword")) == null ? null : tmp_9_0.touched) && (ctx.form.hasError("mismatch") || ((tmp_9_0 = ctx.form.get("confirmPassword")) == null ? null : tmp_9_0.invalid)) ? 27 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("loading", ctx.submitting())("disabled", ctx.submitting() || ctx.form.invalid);
        } }, dependencies: [CommonModule,
            ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink,
            ButtonModule, i2.ButtonDirective, PasswordModule, i3.Password, FloatLabelModule, i4.FloatLabel, IconFieldModule, i5.IconField, InputIconModule, i6.InputIcon, ToastModule, i7.Toast], styles: [".change-password-page[_ngcontent-%COMP%] {\n  padding: 1.5rem 2rem;\n  width: 100%;\n}\n\n.change-password-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 12px;\n  border: 1px solid #e5e7eb;\n  padding: 1.5rem 2rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);\n  width: 100%;\n}\n\n.change-password-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n\n  .p-button-primary {\n    background: var(--sqx-color-primary, #5B4BC4) !important;\n    border: none !important;\n    box-shadow: none !important;\n  }\n\n  .p-button-outlined {\n    border-color: var(--sqx-color-primary, #5B4BC4);\n    color: var(--sqx-color-primary, #5B4BC4);\n  }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ChangePasswordComponent, [{
        type: Component,
        args: [{ selector: 'sqx-change-password', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    RouterLink,
                    ButtonModule,
                    PasswordModule,
                    FloatLabelModule,
                    IconFieldModule,
                    InputIconModule,
                    ToastModule,
                ], providers: [MessageService], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page-container change-password-page\">\n  <p-toast />\n  <div class=\"form-card change-password-card\">\n    <form [formGroup]=\"form\" (ngSubmit)=\"submit()\" class=\"change-password-form\">\n      <div class=\"form-field\">\n        <p-floatlabel variant=\"on\" class=\"w-full\">\n          <p-iconfield class=\"w-full\">\n            <p-inputicon class=\"pi pi-lock\"></p-inputicon>\n            <p-password formControlName=\"currentPassword\" [feedback]=\"false\" [toggleMask]=\"true\"\n              inputStyleClass=\"w-full\" class=\"w-full\" inputId=\"current-pw\" />\n          </p-iconfield>\n          <label for=\"current-pw\">Current password</label>\n        </p-floatlabel>\n        @if (form.get('currentPassword')?.touched && form.get('currentPassword')?.invalid) {\n          <small class=\"p-error\">Current password is required.</small>\n        }\n      </div>\n      <div class=\"form-field\">\n        <p-floatlabel variant=\"on\" class=\"w-full\">\n          <p-iconfield class=\"w-full\">\n            <p-inputicon class=\"pi pi-lock\"></p-inputicon>\n            <p-password formControlName=\"newPassword\" [feedback]=\"true\" [toggleMask]=\"true\"\n              inputStyleClass=\"w-full\" class=\"w-full\" inputId=\"new-pw\" />\n          </p-iconfield>\n          <label for=\"new-pw\">New password</label>\n        </p-floatlabel>\n        @if (form.get('newPassword')?.touched && form.get('newPassword')?.invalid) {\n          <small class=\"p-error\">Password must be at least 8 characters.</small>\n        }\n      </div>\n      <div class=\"form-field\">\n        <p-floatlabel variant=\"on\" class=\"w-full\">\n          <p-iconfield class=\"w-full\">\n            <p-inputicon class=\"pi pi-lock\"></p-inputicon>\n            <p-password formControlName=\"confirmPassword\" [feedback]=\"false\" [toggleMask]=\"true\"\n              inputStyleClass=\"w-full\" class=\"w-full\" inputId=\"confirm-pw\" />\n          </p-iconfield>\n          <label for=\"confirm-pw\">Confirm new password</label>\n        </p-floatlabel>\n        @if (form.get('confirmPassword')?.touched && (form.hasError('mismatch') || form.get('confirmPassword')?.invalid)) {\n          <small class=\"p-error\">Passwords do not match.</small>\n        }\n      </div>\n      <div class=\"form-actions\">\n        <button pButton type=\"submit\" label=\"Update password\" class=\"p-button-primary\"\n          [loading]=\"submitting()\" [disabled]=\"submitting() || form.invalid\"></button>\n        <a pButton routerLink=\"/dashboard\" label=\"Cancel\" class=\"p-button-outlined\"></a>\n      </div>\n    </form>\n  </div>\n</div>\n", styles: [".change-password-page {\n  padding: 1.5rem 2rem;\n  width: 100%;\n}\n\n.change-password-card {\n  background: #fff;\n  border-radius: 12px;\n  border: 1px solid #e5e7eb;\n  padding: 1.5rem 2rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);\n  width: 100%;\n}\n\n.change-password-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.form-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n\n.form-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n\n  .p-button-primary {\n    background: var(--sqx-color-primary, #5B4BC4) !important;\n    border: none !important;\n    box-shadow: none !important;\n  }\n\n  .p-button-outlined {\n    border-color: var(--sqx-color-primary, #5B4BC4);\n    color: var(--sqx-color-primary, #5B4BC4);\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ChangePasswordComponent, { className: "ChangePasswordComponent", filePath: "src/app/modules/core/components/change-password/change-password.component.ts", lineNumber: 34 }); })();
