import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { getFriendlyErrorMessage } from '../../../../shared/utils/error-messages.util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/router";
import * as i3 from "../../services/auth.service";
import * as i4 from "primeng/api";
import * as i5 from "@angular/common";
import * as i6 from "primeng/button";
import * as i7 from "primeng/inputtext";
import * as i8 from "primeng/iconfield";
import * as i9 from "primeng/inputicon";
import * as i10 from "primeng/password";
import * as i11 from "primeng/floatlabel";
import * as i12 from "primeng/toast";
function LoginComponent_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30)(1, "div", 31)(2, "h3", 32);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 33)(5, "span", 34);
    i0.ɵɵtext(6, "\u201C");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(7);
    i0.ɵɵelementStart(8, "span", 34);
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
function LoginComponent_For_10_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 35);
    i0.ɵɵlistener("click", function LoginComponent_For_10_Template_button_click_0_listener() { const item_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setActive(ctx_r1.carouselItems.indexOf(item_r4))); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r1.carouselItems.indexOf(item_r4) === ctx_r1.activeIndex);
} }
function LoginComponent_small_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 36);
    i0.ɵɵtext(1, " Enter a valid email address. ");
    i0.ɵɵelementEnd();
} }
function LoginComponent_small_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 36);
    i0.ɵɵtext(1, " Password must be at least 6 characters. ");
    i0.ɵɵelementEnd();
} }
export class LoginComponent {
    fb;
    router;
    auth;
    messageService;
    rotationTimer;
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
    /** True while login request is in progress (prevents double submit). */
    submitting = signal(false, ...(ngDevMode ? [{ debugName: "submitting" }] : []));
    loginForm;
    constructor(fb, router, auth, messageService) {
        this.fb = fb;
        this.router = router;
        this.auth = auth;
        this.messageService = messageService;
        this.loginForm = this.buildLoginForm();
        this.rotationTimer = setInterval(() => {
            this.activeIndex = (this.activeIndex + 1) % this.carouselItems.length;
        }, 3000);
    }
    setActive(index) {
        this.activeIndex = index;
    }
    buildLoginForm() {
        return this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
    submitLogin() {
        if (this.loginForm.invalid || this.submitting()) {
            this.loginForm.markAllAsTouched();
            return;
        }
        this.submitting.set(true);
        const { email, password } = this.loginForm.value;
        this.auth.login({ email, password }).subscribe({
            next: () => this.router.navigate(['/dashboard']),
            error: (err) => {
                this.submitting.set(false);
                const msg = getFriendlyErrorMessage(err, { default: 'Invalid email or password. Please try again.' });
                this.messageService.add({
                    severity: 'error',
                    summary: 'Login Failed',
                    detail: msg,
                    life: 5000
                });
            },
            complete: () => this.submitting.set(false),
        });
    }
    ngOnDestroy() {
        if (this.rotationTimer) {
            clearInterval(this.rotationTimer);
        }
    }
    static ɵfac = function LoginComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoginComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.AuthService), i0.ɵɵdirectiveInject(i4.MessageService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginComponent, selectors: [["sqx-login"]], features: [i0.ɵɵProvidersFeature([MessageService])], decls: 45, vars: 7, consts: [[1, "flex", "flex-column", "lg:flex-row", "h-screen", "overflow-hidden", "p-2", "box-border", "bg-white"], [1, "w-full", "lg:w-6", "p-0", "hidden", "lg:block", "h-full", "relative"], ["src", "/assets/images/auth.jpg", "alt", "Login banner", 1, "w-full", "h-full", "block", "object-cover"], [1, "absolute", "bottom-0", "left-0", "p-4", "lg:p-5", "text-white"], [1, "hero-content"], [1, "hero-slides"], [1, "hero-slide", 3, "active"], [1, "hero-dots"], ["type", "button", "aria-label", "Show slide", 3, "active"], [1, "w-full", "lg:w-6", "h-full", "p-4", "lg:p-6", "flex", "flex-column", "justify-content-center", "gap-3", "bg-white", 3, "ngSubmit", "formGroup"], [1, "flex", "justify-content-center", "lg:justify-content-start"], ["src", "/core/logo.svg", "alt", "SkillQuestX", 1, "w-15rem"], [1, "m-0"], [1, "mt-2", "mb-0"], [1, "flex", "flex-column", "gap-3"], [1, "flex", "flex-column", "gap-1"], ["variant", "on", 1, "w-full"], [1, "w-full"], [1, "pi", "pi-envelope"], ["id", "login-email", "pInputText", "", "type", "email", "formControlName", "email", 1, "w-full"], ["for", "login-email"], ["class", "p-error", 4, "ngIf"], [1, "pi", "pi-lock"], ["inputStyleClass", "w-full", "inputId", "login-password", "formControlName", "password", 1, "w-full", 3, "toggleMask", "feedback"], ["for", "login-password"], [1, "flex", "flex-column", "lg:flex-row", "justify-content-between", "align-items-start", "lg:align-items-center", "gap-2"], ["routerLink", "/forgot-password", 1, "brand-link", "text-sm"], [1, "text-sm"], ["routerLink", "/register", 1, "brand-link"], ["pButton", "", "type", "submit", "label", "Login", 1, "login-button", "w-full", 3, "loading", "disabled"], [1, "hero-slide"], [1, "hero-title-stack"], [1, "hero-title", "m-0"], [1, "hero-quote"], [1, "quote-mark"], ["type", "button", "aria-label", "Show slide", 3, "click"], [1, "p-error"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1);
            i0.ɵɵelement(2, "img", 2);
            i0.ɵɵelementStart(3, "div", 3)(4, "div", 4)(5, "div", 5);
            i0.ɵɵrepeaterCreate(6, LoginComponent_For_7_Template, 10, 4, "div", 6, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 7);
            i0.ɵɵrepeaterCreate(9, LoginComponent_For_10_Template, 1, 2, "button", 8, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(11, "form", 9);
            i0.ɵɵlistener("ngSubmit", function LoginComponent_Template_form_ngSubmit_11_listener() { return ctx.submitLogin(); });
            i0.ɵɵelementStart(12, "div", 10);
            i0.ɵɵelement(13, "img", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(14, "p-toast");
            i0.ɵɵelementStart(15, "div")(16, "h2", 12);
            i0.ɵɵtext(17, "Welcome");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "p", 13);
            i0.ɵɵtext(19, "Enter your Email Id and password to Login");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "div", 14)(21, "div", 15)(22, "p-floatlabel", 16)(23, "p-iconfield", 17);
            i0.ɵɵelement(24, "p-inputicon", 18)(25, "input", 19);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "label", 20);
            i0.ɵɵtext(27, "Email Id");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(28, LoginComponent_small_28_Template, 2, 0, "small", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "div", 15)(30, "p-floatlabel", 16)(31, "p-iconfield", 17);
            i0.ɵɵelement(32, "p-inputicon", 22)(33, "p-password", 23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "label", 24);
            i0.ɵɵtext(35, "Password");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(36, LoginComponent_small_36_Template, 2, 0, "small", 21);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(37, "div", 25)(38, "a", 26);
            i0.ɵɵtext(39, "Forgot password?");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "div", 27);
            i0.ɵɵtext(41, " Don\u2019t have an account? ");
            i0.ɵɵelementStart(42, "a", 28);
            i0.ɵɵtext(43, "Sign up");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(44, "button", 29);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            let tmp_3_0;
            let tmp_6_0;
            i0.ɵɵadvance(6);
            i0.ɵɵrepeater(ctx.carouselItems);
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.carouselItems);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.loginForm);
            i0.ɵɵadvance(17);
            i0.ɵɵproperty("ngIf", ((tmp_3_0 = ctx.loginForm.get("email")) == null ? null : tmp_3_0.touched) && ((tmp_3_0 = ctx.loginForm.get("email")) == null ? null : tmp_3_0.invalid));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("toggleMask", true)("feedback", false);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ((tmp_6_0 = ctx.loginForm.get("password")) == null ? null : tmp_6_0.touched) && ((tmp_6_0 = ctx.loginForm.get("password")) == null ? null : tmp_6_0.invalid));
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("loading", ctx.submitting())("disabled", ctx.loginForm.invalid || ctx.submitting());
        } }, dependencies: [CommonModule, i5.NgIf, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink,
            ButtonModule, i6.ButtonDirective, InputTextModule, i7.InputText, IconFieldModule, i8.IconField, InputIconModule, i9.InputIcon, PasswordModule, i10.Password, FloatLabelModule, i11.FloatLabel, ToastModule, i12.Toast], styles: [".login-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #ffffff;\n  padding: 24px;\n}\n\n.login-card[_ngcontent-%COMP%] {\n  width: min(1080px, 100%);\n  background: #ffffff;\n  border-radius: 28px;\n  overflow: hidden;\n  box-shadow: 0 24px 60px rgba(23, 22, 51, 0.16);\n  min-height: 640px;\n  display: flex;\n}\n\n.login-hero[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 640px;\n  background:\n    linear-gradient(140deg, rgba(195, 175, 255, 0.95), rgba(103, 63, 205, 0.95) 55%, rgba(52, 39, 116, 0.98)),\n    url('/assets/images/auth.jpg') center/cover no-repeat;\n  color: #ffffff;\n  display: flex;\n  align-items: flex-end;\n  padding: 48px;\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  max-width: 720px;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n\n.hero-slides[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 72px;\n}\n\n.hero-slide[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  transform: translateY(8px);\n  transition: opacity 0.4s ease, transform 0.4s ease;\n}\n\n.hero-slide.active[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: translateY(0);\n}\n\n.hero-title-stack[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n}\n\n.hero-profile[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 24px;\n}\n\n.hero-avatar[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.25);\n  overflow: hidden;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n  }\n}\n\n.hero-name[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n}\n\n.hero-role[_ngcontent-%COMP%] {\n  font-size: 14px;\n  opacity: 0.85;\n}\n\n.hero-quote[_ngcontent-%COMP%] {\n  font-size: 16px;\n  line-height: 1.6;\n  margin: 0;\n  position: relative;\n  white-space: nowrap;\n}\n\n.quote-mark[_ngcontent-%COMP%] {\n  font-size: 36px;\n  line-height: 0;\n  vertical-align: baseline;\n  opacity: 0.6;\n}\n\n.hero-dots[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n\n.hero-dots[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 4px;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.35);\n  border: none;\n  padding: 0;\n  cursor: pointer;\n}\n\n.hero-dots[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  width: 40px;\n  background: #ffffff;\n}\n\n.login-form[_ngcontent-%COMP%] {\n  padding: 56px 64px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 20px;\n}\n\n.login-form[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] {\n  max-width: 360px;\n}\n\n.login-logo[_ngcontent-%COMP%] {\n  width: 220px;\n  margin-bottom: 8px;\n}\n\n.login-form[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 34px;\n  margin: 0;\n  color: #101828;\n}\n\n.login-subtitle[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #475467;\n  margin: 0 0 8px;\n}\n\n.form-field[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n\n[_nghost-%COMP%]     .form-field .p-iconfield {\n  width: 100%;\n}\n\n[_nghost-%COMP%]     .form-field .p-inputtext {\n  width: 100%;\n  border-radius: 12px;\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  padding-left: 44px;\n  box-shadow: none;\n  font-size: 15px;\n}\n\n[_nghost-%COMP%]     .form-field .p-inputtext:focus {\n  border-color: var(--sqx-color-primary);\n  background: #ffffff;\n  box-shadow: 0 0 0 3px rgba(91, 75, 196, 0.1);\n}\n\n[_nghost-%COMP%]     .form-field .p-inputicon {\n  color: #9ca3af;\n  font-size: 16px;\n}\n\n[_nghost-%COMP%]     .login-button.p-button {\n  margin-top: 5px;\n  width: 100%;\n  color: #ffffff;\n  background: var(--sqx-color-primary);\n  border: none;\n  box-shadow: none !important;\n  outline: none !important;\n  transition: all 0.2s ease;\n}\n\n[_nghost-%COMP%]     .login-button.p-button:hover {\n  background: var(--sqx-color-primary-dark);\n  border: none;\n  box-shadow: none;\n}\n\n:[_nghost-%COMP%]     .p-password .p-password-toggle, \n:[_nghost-%COMP%]     .p-password .p-password-toggle-icon, \n:[_nghost-%COMP%]     .p-password .p-icon {\n  cursor: pointer;\n}\n\n:[_nghost-%COMP%]     .p-password .p-password-toggle, \n:[_nghost-%COMP%]     .p-password .p-password-toggle-icon, \n:[_nghost-%COMP%]     .p-password .p-icon {\n  cursor: pointer;\n}\n\n.p-error[_ngcontent-%COMP%] {\n  color: #d32f2f;\n  font-size: 12px;\n}\n\n.brand-link[_ngcontent-%COMP%] {\n  color: var(--sqx-color-primary);\n  text-decoration: none;\n  font-weight: 600;\n}\n\n.brand-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n:[_nghost-%COMP%]     .login-button.p-button:focus, \n:[_nghost-%COMP%]     .login-button.p-button:active {\n  background: var(--sqx-color-primary);\n  border: none;\n  color: #ffffff;\n  box-shadow: none !important;\n  outline: none !important;\n}\n\n:[_nghost-%COMP%]     .p-password .p-password-toggle, \n:[_nghost-%COMP%]     .p-password .p-password-toggle-icon, \n:[_nghost-%COMP%]     .p-password .p-icon {\n  cursor: pointer;\n}\n\n@media (max-width: 960px) {\n  .login-card[_ngcontent-%COMP%] {\n    min-height: auto;\n  }\n\n  .login-form[_ngcontent-%COMP%] {\n    padding: 48px 32px;\n  }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginComponent, [{
        type: Component,
        args: [{ selector: 'sqx-login', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    RouterLink,
                    ButtonModule,
                    InputTextModule,
                    IconFieldModule,
                    InputIconModule,
                    PasswordModule,
                    FloatLabelModule,
                    ToastModule
                ], providers: [MessageService], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"flex flex-column lg:flex-row h-screen overflow-hidden p-2 box-border bg-white\">\n  <div class=\"w-full lg:w-6 p-0 hidden lg:block h-full relative\">\n    <img class=\"w-full h-full block object-cover\" src=\"/assets/images/auth.jpg\" alt=\"Login banner\" />\n    <div class=\"absolute bottom-0 left-0 p-4 lg:p-5 text-white\">\n      <div class=\"hero-content\">\n        <div class=\"hero-slides\">\n          @for (item of carouselItems; track item) {\n          <div class=\"hero-slide\" [class.active]=\"carouselItems.indexOf(item) === activeIndex\">\n            <div class=\"hero-title-stack\">\n              <h3 class=\"hero-title m-0\">{{ item.title }}</h3>\n              <div class=\"hero-quote\">\n                <span class=\"quote-mark\">\u201C</span>{{ item.subtitle }}<span class=\"quote-mark\">\u201D</span>\n              </div>\n            </div>\n          </div>\n          }\n        </div>\n        <div class=\"hero-dots\">\n          @for (item of carouselItems; track item) {\n          <button type=\"button\" [class.active]=\"carouselItems.indexOf(item) === activeIndex\"\n            (click)=\"setActive(carouselItems.indexOf(item))\" aria-label=\"Show slide\"></button>\n          }\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <form class=\"w-full lg:w-6 h-full p-4 lg:p-6 flex flex-column justify-content-center gap-3 bg-white\"\n    [formGroup]=\"loginForm\" (ngSubmit)=\"submitLogin()\">\n    <div class=\"flex justify-content-center lg:justify-content-start\">\n      <img src=\"/core/logo.svg\" alt=\"SkillQuestX\" class=\"w-15rem\" />\n    </div>\n    <p-toast />\n    <div>\n      <h2 class=\"m-0\">Welcome</h2>\n      <p class=\"mt-2 mb-0\">Enter your Email Id and password to Login</p>\n    </div>\n\n    <div class=\"flex flex-column gap-3\">\n      <div class=\"flex flex-column gap-1\">\n        <p-floatlabel variant=\"on\" class=\"w-full\">\n          <p-iconfield class=\"w-full\">\n            <p-inputicon class=\"pi pi-envelope\"></p-inputicon>\n            <input id=\"login-email\" pInputText type=\"email\" class=\"w-full\" formControlName=\"email\" />\n          </p-iconfield>\n          <label for=\"login-email\">Email Id</label>\n        </p-floatlabel>\n        <small class=\"p-error\" *ngIf=\"loginForm.get('email')?.touched && loginForm.get('email')?.invalid\">\n          Enter a valid email address.\n        </small>\n      </div>\n\n      <div class=\"flex flex-column gap-1\">\n        <p-floatlabel variant=\"on\" class=\"w-full\">\n          <p-iconfield class=\"w-full\">\n            <p-inputicon class=\"pi pi-lock\"></p-inputicon>\n            <p-password class=\"w-full\" inputStyleClass=\"w-full\" inputId=\"login-password\" [toggleMask]=\"true\"\n              [feedback]=\"false\" formControlName=\"password\"></p-password>\n          </p-iconfield>\n          <label for=\"login-password\">Password</label>\n        </p-floatlabel>\n        <small class=\"p-error\" *ngIf=\"loginForm.get('password')?.touched && loginForm.get('password')?.invalid\">\n          Password must be at least 6 characters.\n        </small>\n      </div>\n    </div>\n\n    <div class=\"flex flex-column lg:flex-row justify-content-between align-items-start lg:align-items-center gap-2\">\n      <a routerLink=\"/forgot-password\" class=\"brand-link text-sm\">Forgot password?</a>\n      <div class=\"text-sm\">\n        Don\u2019t have an account? <a routerLink=\"/register\" class=\"brand-link\">Sign up</a>\n      </div>\n    </div>\n\n    <button pButton type=\"submit\" label=\"Login\" class=\"login-button w-full\"\n      [loading]=\"submitting()\" [disabled]=\"loginForm.invalid || submitting()\"></button>\n  </form>\n</section>", styles: [".login-page {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #ffffff;\n  padding: 24px;\n}\n\n.login-card {\n  width: min(1080px, 100%);\n  background: #ffffff;\n  border-radius: 28px;\n  overflow: hidden;\n  box-shadow: 0 24px 60px rgba(23, 22, 51, 0.16);\n  min-height: 640px;\n  display: flex;\n}\n\n.login-hero {\n  position: relative;\n  min-height: 640px;\n  background:\n    linear-gradient(140deg, rgba(195, 175, 255, 0.95), rgba(103, 63, 205, 0.95) 55%, rgba(52, 39, 116, 0.98)),\n    url('/assets/images/auth.jpg') center/cover no-repeat;\n  color: #ffffff;\n  display: flex;\n  align-items: flex-end;\n  padding: 48px;\n}\n\n.hero-content {\n  max-width: 720px;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n\n.hero-slides {\n  position: relative;\n  min-height: 72px;\n}\n\n.hero-slide {\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  transform: translateY(8px);\n  transition: opacity 0.4s ease, transform 0.4s ease;\n}\n\n.hero-slide.active {\n  opacity: 1;\n  transform: translateY(0);\n}\n\n.hero-title-stack {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\n.hero-title {\n  font-size: 28px;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n}\n\n.hero-profile {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 24px;\n}\n\n.hero-avatar {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.25);\n  overflow: hidden;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n  }\n}\n\n.hero-name {\n  font-size: 18px;\n  font-weight: 600;\n}\n\n.hero-role {\n  font-size: 14px;\n  opacity: 0.85;\n}\n\n.hero-quote {\n  font-size: 16px;\n  line-height: 1.6;\n  margin: 0;\n  position: relative;\n  white-space: nowrap;\n}\n\n.quote-mark {\n  font-size: 36px;\n  line-height: 0;\n  vertical-align: baseline;\n  opacity: 0.6;\n}\n\n.hero-dots {\n  display: flex;\n  gap: 8px;\n}\n\n.hero-dots button {\n  width: 20px;\n  height: 4px;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.35);\n  border: none;\n  padding: 0;\n  cursor: pointer;\n}\n\n.hero-dots button.active {\n  width: 40px;\n  background: #ffffff;\n}\n\n.login-form {\n  padding: 56px 64px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 20px;\n}\n\n.login-form>* {\n  max-width: 360px;\n}\n\n.login-logo {\n  width: 220px;\n  margin-bottom: 8px;\n}\n\n.login-form h2 {\n  font-size: 34px;\n  margin: 0;\n  color: #101828;\n}\n\n.login-subtitle {\n  font-size: 18px;\n  color: #475467;\n  margin: 0 0 8px;\n}\n\n.form-field {\n  margin-bottom: 16px;\n}\n\n:host ::ng-deep .form-field .p-iconfield {\n  width: 100%;\n}\n\n:host ::ng-deep .form-field .p-inputtext {\n  width: 100%;\n  border-radius: 12px;\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  padding-left: 44px;\n  box-shadow: none;\n  font-size: 15px;\n}\n\n:host ::ng-deep .form-field .p-inputtext:focus {\n  border-color: var(--sqx-color-primary);\n  background: #ffffff;\n  box-shadow: 0 0 0 3px rgba(91, 75, 196, 0.1);\n}\n\n:host ::ng-deep .form-field .p-inputicon {\n  color: #9ca3af;\n  font-size: 16px;\n}\n\n:host ::ng-deep .login-button.p-button {\n  margin-top: 5px;\n  width: 100%;\n  color: #ffffff;\n  background: var(--sqx-color-primary);\n  border: none;\n  box-shadow: none !important;\n  outline: none !important;\n  transition: all 0.2s ease;\n}\n\n:host ::ng-deep .login-button.p-button:hover {\n  background: var(--sqx-color-primary-dark);\n  border: none;\n  box-shadow: none;\n}\n\n::host ::ng-deep .p-password .p-password-toggle,\n::host ::ng-deep .p-password .p-password-toggle-icon,\n::host ::ng-deep .p-password .p-icon {\n  cursor: pointer;\n}\n\n::host ::ng-deep .p-password .p-password-toggle,\n::host ::ng-deep .p-password .p-password-toggle-icon,\n::host ::ng-deep .p-password .p-icon {\n  cursor: pointer;\n}\n\n.p-error {\n  color: #d32f2f;\n  font-size: 12px;\n}\n\n.brand-link {\n  color: var(--sqx-color-primary);\n  text-decoration: none;\n  font-weight: 600;\n}\n\n.brand-link:hover {\n  text-decoration: underline;\n}\n\n::host ::ng-deep .login-button.p-button:focus,\n::host ::ng-deep .login-button.p-button:active {\n  background: var(--sqx-color-primary);\n  border: none;\n  color: #ffffff;\n  box-shadow: none !important;\n  outline: none !important;\n}\n\n::host ::ng-deep .p-password .p-password-toggle,\n::host ::ng-deep .p-password .p-password-toggle-icon,\n::host ::ng-deep .p-password .p-icon {\n  cursor: pointer;\n}\n\n@media (max-width: 960px) {\n  .login-card {\n    min-height: auto;\n  }\n\n  .login-form {\n    padding: 48px 32px;\n  }\n}"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.Router }, { type: i3.AuthService }, { type: i4.MessageService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/modules/core/components/login/login.component.ts", lineNumber: 36 }); })();
