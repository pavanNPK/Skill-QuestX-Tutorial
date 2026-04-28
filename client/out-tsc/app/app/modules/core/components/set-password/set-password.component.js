import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { getFriendlyErrorMessage } from '../../../../shared/utils/error-messages.util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/button";
import * as i4 from "primeng/password";
import * as i5 from "primeng/floatlabel";
import * as i6 from "primeng/toast";
function SetPasswordComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1, "Invalid or missing set-password link. Request a new one from your admin.");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(2, "a", 12);
} }
function SetPasswordComponent_Conditional_18_small_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 11);
    i0.ɵɵtext(1, " Password must be at least 8 characters. ");
    i0.ɵɵelementEnd();
} }
function SetPasswordComponent_Conditional_18_small_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 11);
    i0.ɵɵtext(1, " Passwords do not match. ");
    i0.ɵɵelementEnd();
} }
function SetPasswordComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13)(1, "div", 14)(2, "p-floatlabel", 15);
    i0.ɵɵelement(3, "p-password", 16);
    i0.ɵɵelementStart(4, "label", 17);
    i0.ɵɵtext(5, "New password");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, SetPasswordComponent_Conditional_18_small_6_Template, 2, 0, "small", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 14)(8, "p-floatlabel", 15);
    i0.ɵɵelement(9, "p-password", 19);
    i0.ɵɵelementStart(10, "label", 20);
    i0.ɵɵtext(11, "Confirm password");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(12, SetPasswordComponent_Conditional_18_small_12_Template, 2, 0, "small", 18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 21);
    i0.ɵɵelement(14, "button", 22)(15, "a", 23);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_3_0;
    let tmp_6_0;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("feedback", true)("toggleMask", true);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ((tmp_3_0 = ctx_r0.form.get("password")) == null ? null : tmp_3_0.touched) && ((tmp_3_0 = ctx_r0.form.get("password")) == null ? null : tmp_3_0.invalid));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("feedback", false)("toggleMask", true);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ((tmp_6_0 = ctx_r0.form.get("confirmPassword")) == null ? null : tmp_6_0.touched) && ((tmp_6_0 = ctx_r0.form.get("confirmPassword")) == null ? null : tmp_6_0.errors == null ? null : tmp_6_0.errors["mismatch"]));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("loading", ctx_r0.submitting())("disabled", ctx_r0.submitting());
} }
export class SetPasswordComponent {
    fb = inject(FormBuilder);
    route = inject(ActivatedRoute);
    router = inject(Router);
    auth = inject(AuthService);
    messageService = inject(MessageService);
    submitting = signal(false, ...(ngDevMode ? [{ debugName: "submitting" }] : []));
    token = signal(null, ...(ngDevMode ? [{ debugName: "token" }] : []));
    form;
    constructor() {
        this.form = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required]],
        });
    }
    ngOnInit() {
        const t = this.route.snapshot.queryParamMap.get('token');
        this.token.set(t);
        if (!t) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Invalid link',
                detail: 'Set-password link is missing or invalid. Request a new one from your admin.',
            });
        }
    }
    submit() {
        const t = this.token();
        if (!t)
            return;
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            const confirm = this.form.get('confirmPassword');
            if (this.form.get('password')?.value !== confirm?.value) {
                confirm?.setErrors({ mismatch: true });
            }
            return;
        }
        const password = this.form.get('password')?.value;
        const confirm = this.form.get('confirmPassword')?.value;
        if (password !== confirm) {
            this.form.get('confirmPassword')?.setErrors({ mismatch: true });
            this.form.markAllAsTouched();
            return;
        }
        this.submitting.set(true);
        this.auth.setPassword(t, password).subscribe({
            next: (res) => {
                this.submitting.set(false);
                const roleLabel = res.user.role === 'admin' ? 'Admin' : res.user.role === 'instructor' ? 'Instructor' : res.user.role;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Password set',
                    detail: `${res.message} Your role: ${roleLabel}.`,
                });
                this.router.navigate(['/login'], { queryParams: { setPassword: 'true', role: res.user.role } });
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
    static ɵfac = function SetPasswordComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SetPasswordComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SetPasswordComponent, selectors: [["sqx-set-password"]], features: [i0.ɵɵProvidersFeature([MessageService])], decls: 19, vars: 2, consts: [[1, "flex", "flex-column", "lg:flex-row", "h-screen", "overflow-hidden", "p-2", "box-border", "bg-white"], [1, "w-full", "lg:w-6", "p-0", "hidden", "lg:block", "h-full", "relative"], ["src", "/assets/images/auth.jpg", "alt", "Set password", 1, "w-full", "h-full", "block", "object-cover"], [1, "absolute", "bottom-0", "left-0", "p-4", "lg:p-5", "text-white"], [1, "hero-title", "m-0"], [1, "m-0", "mt-2"], [1, "w-full", "lg:w-6", "h-full", "p-4", "lg:p-6", "flex", "flex-column", "justify-content-center", "gap-3", "bg-white", 3, "ngSubmit", "formGroup"], [1, "flex", "justify-content-center", "lg:justify-content-start"], ["src", "/core/logo.svg", "alt", "SkillQuestX", 1, "w-15rem"], [1, "m-0"], [1, "mt-2", "mb-0"], [1, "p-error"], ["pButton", "", "routerLink", "/login", "label", "Go to Login", 1, "p-button-outlined"], [1, "flex", "flex-column", "gap-3"], [1, "flex", "flex-column", "gap-1"], ["variant", "on", 1, "w-full"], ["formControlName", "password", "inputStyleClass", "w-full", "inputId", "set-pw", 1, "w-full", 3, "feedback", "toggleMask"], ["for", "set-pw"], ["class", "p-error", 4, "ngIf"], ["formControlName", "confirmPassword", "inputStyleClass", "w-full", "inputId", "set-pw-confirm", 1, "w-full", 3, "feedback", "toggleMask"], ["for", "set-pw-confirm"], [1, "flex", "gap-2", "flex-wrap"], ["pButton", "", "type", "submit", "label", "Set password", 1, "p-button-primary", 3, "loading", "disabled"], ["pButton", "", "routerLink", "/login", "label", "Back to login", 1, "p-button-outlined"]], template: function SetPasswordComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1);
            i0.ɵɵelement(2, "img", 2);
            i0.ɵɵelementStart(3, "div", 3)(4, "h3", 4);
            i0.ɵɵtext(5, "Set your password");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 5);
            i0.ɵɵtext(7, "You have been added as Admin or Instructor. Create a password to sign in.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(8, "form", 6);
            i0.ɵɵlistener("ngSubmit", function SetPasswordComponent_Template_form_ngSubmit_8_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(9, "div", 7);
            i0.ɵɵelement(10, "img", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(11, "p-toast");
            i0.ɵɵelementStart(12, "div")(13, "h2", 9);
            i0.ɵɵtext(14, "Set your password");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "p", 10);
            i0.ɵɵtext(16, "Create a password (at least 8 characters). After this you can log in.");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(17, SetPasswordComponent_Conditional_17_Template, 3, 0)(18, SetPasswordComponent_Conditional_18_Template, 16, 8);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(9);
            i0.ɵɵconditional(!ctx.token() ? 17 : 18);
        } }, dependencies: [CommonModule, i1.NgIf, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, RouterLink,
            ButtonModule, i3.ButtonDirective, PasswordModule, i4.Password, FloatLabelModule, i5.FloatLabel, ToastModule, i6.Toast], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n}\n\n//[_ngcontent-%COMP%]   Brand[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   styling[_ngcontent-%COMP%]   (default[_ngcontent-%COMP%]   PrimeNG[_ngcontent-%COMP%]   size[_ngcontent-%COMP%]; color from design system)\n[_nghost-%COMP%]     .p-button-primary {\n  background: var(--sqx-color-primary);\n  border: none;\n  color: #ffffff;\n  transition: all 0.2s ease;\n}\n\n[_nghost-%COMP%]     .p-button-primary:hover:not(:disabled) {\n  background: var(--sqx-color-primary-dark);\n}\n\n[_nghost-%COMP%]     .p-button-primary:focus, \n[_nghost-%COMP%]     .p-button-primary:active {\n  background: var(--sqx-color-primary);\n  box-shadow: none;\n  outline: none;\n}\n\n[_nghost-%COMP%]     .p-button-primary:disabled {\n  background: var(--sqx-color-primary-light);\n  opacity: 0.7;\n}\n\n//   Outlined   button   (No/Cancel/Close)\n[_nghost-%COMP%]     .p-button-outlined {\n  color: var(--sqx-color-primary);\n  border-color: var(--sqx-color-primary);\n  background: transparent;\n  transition: all 0.2s ease;\n}\n\n[_nghost-%COMP%]     .p-button-outlined:hover {\n  background: rgba(91, 75, 196, 0.08);\n  color: var(--sqx-color-primary-dark);\n  border-color: var(--sqx-color-primary-dark);\n}\n\n//   Input   styling\n[_nghost-%COMP%]     .p-password {\n  width: 100%;\n}\n\n[_nghost-%COMP%]     .p-inputtext {\n  border-radius: 6px;\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n}\n\n[_nghost-%COMP%]     .p-inputtext:focus {\n  border-color: var(--sqx-color-primary);\n  background: #ffffff;\n  box-shadow: 0 0 0 3px rgba(91, 75, 196, 0.1);\n}\n\n.p-error[_ngcontent-%COMP%] {\n  color: #d32f2f;\n  font-size: 12px;\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SetPasswordComponent, [{
        type: Component,
        args: [{ selector: 'sqx-set-password', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    RouterLink,
                    ButtonModule,
                    PasswordModule,
                    FloatLabelModule,
                    ToastModule,
                ], providers: [MessageService], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"flex flex-column lg:flex-row h-screen overflow-hidden p-2 box-border bg-white\">\n  <div class=\"w-full lg:w-6 p-0 hidden lg:block h-full relative\">\n    <img class=\"w-full h-full block object-cover\" src=\"/assets/images/auth.jpg\" alt=\"Set password\" />\n    <div class=\"absolute bottom-0 left-0 p-4 lg:p-5 text-white\">\n      <h3 class=\"hero-title m-0\">Set your password</h3>\n      <p class=\"m-0 mt-2\">You have been added as Admin or Instructor. Create a password to sign in.</p>\n    </div>\n  </div>\n\n  <form class=\"w-full lg:w-6 h-full p-4 lg:p-6 flex flex-column justify-content-center gap-3 bg-white\"\n    [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n    <div class=\"flex justify-content-center lg:justify-content-start\">\n      <img src=\"/core/logo.svg\" alt=\"SkillQuestX\" class=\"w-15rem\" />\n    </div>\n    <p-toast />\n    <div>\n      <h2 class=\"m-0\">Set your password</h2>\n      <p class=\"mt-2 mb-0\">Create a password (at least 8 characters). After this you can log in.</p>\n    </div>\n\n    @if (!token()) {\n      <p class=\"p-error\">Invalid or missing set-password link. Request a new one from your admin.</p>\n      <a pButton routerLink=\"/login\" label=\"Go to Login\" class=\"p-button-outlined\"></a>\n    } @else {\n    <div class=\"flex flex-column gap-3\">\n      <div class=\"flex flex-column gap-1\">\n        <p-floatlabel variant=\"on\" class=\"w-full\">\n          <p-password formControlName=\"password\" [feedback]=\"true\" [toggleMask]=\"true\" class=\"w-full\"\n            inputStyleClass=\"w-full\" inputId=\"set-pw\" />\n          <label for=\"set-pw\">New password</label>\n        </p-floatlabel>\n        <small class=\"p-error\" *ngIf=\"form.get('password')?.touched && form.get('password')?.invalid\">\n          Password must be at least 8 characters.\n        </small>\n      </div>\n      <div class=\"flex flex-column gap-1\">\n        <p-floatlabel variant=\"on\" class=\"w-full\">\n          <p-password formControlName=\"confirmPassword\" [feedback]=\"false\" [toggleMask]=\"true\" class=\"w-full\"\n            inputStyleClass=\"w-full\" inputId=\"set-pw-confirm\" />\n          <label for=\"set-pw-confirm\">Confirm password</label>\n        </p-floatlabel>\n        <small class=\"p-error\" *ngIf=\"form.get('confirmPassword')?.touched && form.get('confirmPassword')?.errors?.['mismatch']\">\n          Passwords do not match.\n        </small>\n      </div>\n    </div>\n\n    <div class=\"flex gap-2 flex-wrap\">\n      <button pButton type=\"submit\" label=\"Set password\" [loading]=\"submitting()\" [disabled]=\"submitting()\"\n        class=\"p-button-primary\"></button>\n      <a pButton routerLink=\"/login\" label=\"Back to login\" class=\"p-button-outlined\"></a>\n    </div>\n    }\n  </form>\n</section>\n", styles: [":host {\n  display: block;\n}\n\n.hero-title {\n  font-size: 28px;\n  font-weight: 700;\n}\n\n// Brand button styling (default PrimeNG size; color from design system)\n:host ::ng-deep .p-button-primary {\n  background: var(--sqx-color-primary);\n  border: none;\n  color: #ffffff;\n  transition: all 0.2s ease;\n}\n\n:host ::ng-deep .p-button-primary:hover:not(:disabled) {\n  background: var(--sqx-color-primary-dark);\n}\n\n:host ::ng-deep .p-button-primary:focus,\n:host ::ng-deep .p-button-primary:active {\n  background: var(--sqx-color-primary);\n  box-shadow: none;\n  outline: none;\n}\n\n:host ::ng-deep .p-button-primary:disabled {\n  background: var(--sqx-color-primary-light);\n  opacity: 0.7;\n}\n\n// Outlined button (No/Cancel/Close)\n:host ::ng-deep .p-button-outlined {\n  color: var(--sqx-color-primary);\n  border-color: var(--sqx-color-primary);\n  background: transparent;\n  transition: all 0.2s ease;\n}\n\n:host ::ng-deep .p-button-outlined:hover {\n  background: rgba(91, 75, 196, 0.08);\n  color: var(--sqx-color-primary-dark);\n  border-color: var(--sqx-color-primary-dark);\n}\n\n// Input styling\n:host ::ng-deep .p-password {\n  width: 100%;\n}\n\n:host ::ng-deep .p-inputtext {\n  border-radius: 6px;\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n}\n\n:host ::ng-deep .p-inputtext:focus {\n  border-color: var(--sqx-color-primary);\n  background: #ffffff;\n  box-shadow: 0 0 0 3px rgba(91, 75, 196, 0.1);\n}\n\n.p-error {\n  color: #d32f2f;\n  font-size: 12px;\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SetPasswordComponent, { className: "SetPasswordComponent", filePath: "src/app/modules/core/components/set-password/set-password.component.ts", lineNumber: 30 }); })();
