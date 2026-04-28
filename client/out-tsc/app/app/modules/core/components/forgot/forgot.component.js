import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ProgressBarModule } from 'primeng/progressbar';
import { KnobModule } from 'primeng/knob';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { getFriendlyErrorMessage } from '../../../../shared/utils/error-messages.util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "primeng/api";
import * as i3 from "../../services/auth.service";
import * as i4 from "@angular/router";
import * as i5 from "@angular/common";
import * as i6 from "primeng/button";
import * as i7 from "primeng/iconfield";
import * as i8 from "primeng/inputicon";
import * as i9 from "primeng/inputtext";
import * as i10 from "primeng/password";
import * as i11 from "primeng/knob";
import * as i12 from "primeng/toast";
import * as i13 from "primeng/floatlabel";
const _c0 = () => ({ standalone: true });
function ForgotComponent_div_7_Template(rf, ctx) { if (rf & 1) {
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
    const i_r2 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", i_r2 === ctx_r2.activeIndex);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r1.title);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r1.subtitle);
} }
function ForgotComponent_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 20);
    i0.ɵɵlistener("click", function ForgotComponent_button_9_Template_button_click_0_listener() { const i_r5 = i0.ɵɵrestoreView(_r4).index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setActive(i_r5)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r5 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", i_r5 === ctx_r2.activeIndex);
} }
function ForgotComponent_Conditional_18_small_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 32);
    i0.ɵɵtext(1, " Enter a valid email address. ");
    i0.ɵɵelementEnd();
} }
function ForgotComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 14)(1, "form", 21);
    i0.ɵɵlistener("ngSubmit", function ForgotComponent_Conditional_18_Template_form_ngSubmit_1_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitEmail()); });
    i0.ɵɵelementStart(2, "div", 22)(3, "p-floatlabel", 23)(4, "p-iconfield", 24);
    i0.ɵɵelement(5, "p-inputicon", 25)(6, "input", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "label", 27);
    i0.ɵɵtext(8, "Email");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(9, ForgotComponent_Conditional_18_small_9_Template, 2, 0, "small", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 29)(11, "a", 30);
    i0.ɵɵtext(12, "Back to login");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(13, "button", 31);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r2.emailForm);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngIf", ((tmp_2_0 = ctx_r2.emailForm.get("email")) == null ? null : tmp_2_0.touched) && ((tmp_2_0 = ctx_r2.emailForm.get("email")) == null ? null : tmp_2_0.invalid));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("loading", ctx_r2.submitting())("disabled", ctx_r2.emailForm.invalid || ctx_r2.submitting());
} }
function ForgotComponent_Conditional_19_small_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 32);
    i0.ɵɵtext(1, " Enter a valid 6-digit OTP. ");
    i0.ɵɵelementEnd();
} }
function ForgotComponent_Conditional_19_small_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 32);
    i0.ɵɵtext(1, "OTP expired. Please resend.");
    i0.ɵɵelementEnd();
} }
function ForgotComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 14)(1, "form", 21);
    i0.ɵɵlistener("ngSubmit", function ForgotComponent_Conditional_19_Template_form_ngSubmit_1_listener() { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitOtp()); });
    i0.ɵɵelementStart(2, "div", 22)(3, "p-floatlabel", 23)(4, "p-iconfield", 24);
    i0.ɵɵelement(5, "p-inputicon", 33)(6, "input", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "label", 35);
    i0.ɵɵtext(8, "OTP");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(9, ForgotComponent_Conditional_19_small_9_Template, 2, 0, "small", 28)(10, ForgotComponent_Conditional_19_small_10_Template, 2, 0, "small", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 36)(12, "div", 37);
    i0.ɵɵtext(13, "OTP expires in");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 38);
    i0.ɵɵelement(15, "p-knob", 39);
    i0.ɵɵelementStart(16, "div", 40);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(18, "div", 41);
    i0.ɵɵelement(19, "button", 42);
    i0.ɵɵelementStart(20, "button", 43);
    i0.ɵɵlistener("click", function ForgotComponent_Conditional_19_Template_button_click_20_listener() { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.resendOtp()); });
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r2.otpForm);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngIf", ((tmp_2_0 = ctx_r2.otpForm.get("otp")) == null ? null : tmp_2_0.touched) && ((tmp_2_0 = ctx_r2.otpForm.get("otp")) == null ? null : tmp_2_0.invalid));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.otpExpired);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", ctx_r2.otpProgress)("ngModelOptions", i0.ɵɵpureFunction0(12, _c0))("readonly", true)("strokeWidth", 8)("size", 90)("showValue", false);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.otpTimeLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("loading", ctx_r2.submitting())("disabled", ctx_r2.submitting());
} }
function ForgotComponent_Conditional_20_small_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 32);
    i0.ɵɵtext(1, " Password must be at least 6 characters. ");
    i0.ɵɵelementEnd();
} }
function ForgotComponent_Conditional_20_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51)(1, "div", 52);
    i0.ɵɵelement(2, "div", 53);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "small", 54);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-strength", ctx_r2.passwordLabel.toLowerCase());
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-strength", ctx_r2.passwordLabel.toLowerCase());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Password strength: ", ctx_r2.passwordLabel, " ");
} }
function ForgotComponent_Conditional_20_small_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 32);
    i0.ɵɵtext(1, " Passwords do not match. ");
    i0.ɵɵelementEnd();
} }
function ForgotComponent_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 14)(1, "form", 21);
    i0.ɵɵlistener("ngSubmit", function ForgotComponent_Conditional_20_Template_form_ngSubmit_1_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitReset()); });
    i0.ɵɵelementStart(2, "div", 22)(3, "p-floatlabel", 23)(4, "p-iconfield", 24);
    i0.ɵɵelement(5, "p-inputicon", 44)(6, "p-password", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "label", 46);
    i0.ɵɵtext(8, "New Password");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(9, ForgotComponent_Conditional_20_small_9_Template, 2, 0, "small", 28)(10, ForgotComponent_Conditional_20_div_10_Template, 5, 3, "div", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 22)(12, "p-floatlabel", 23)(13, "p-iconfield", 24);
    i0.ɵɵelement(14, "p-inputicon", 44)(15, "p-password", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "label", 49);
    i0.ɵɵtext(17, "Confirm Password");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(18, ForgotComponent_Conditional_20_small_18_Template, 2, 0, "small", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(19, "button", 50);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    let tmp_8_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r2.resetForm);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("toggleMask", true)("feedback", false);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ((tmp_4_0 = ctx_r2.resetForm.get("password")) == null ? null : tmp_4_0.touched) && ((tmp_4_0 = ctx_r2.resetForm.get("password")) == null ? null : tmp_4_0.invalid));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (tmp_5_0 = ctx_r2.resetForm.get("password")) == null ? null : tmp_5_0.value);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("toggleMask", true)("feedback", false);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ((tmp_8_0 = ctx_r2.resetForm.get("confirmPassword")) == null ? null : tmp_8_0.touched) && !ctx_r2.passwordsMatch());
    i0.ɵɵadvance();
    i0.ɵɵproperty("loading", ctx_r2.submitting())("disabled", ctx_r2.submitting());
} }
export class ForgotComponent {
    fb;
    messageService;
    cdr;
    auth;
    router;
    step = 'email';
    otpTotalSeconds = 180;
    otpSecondsLeft = 0;
    otpProgress = 0;
    otpExpired = false;
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
    /** True while any submit request is in progress. */
    submitting = signal(false, ...(ngDevMode ? [{ debugName: "submitting" }] : []));
    emailForm;
    otpForm;
    resetForm;
    passwordStrength = 0;
    passwordLabel = 'Weak';
    otpTimer;
    rotationTimer;
    passwordSub;
    constructor(fb, messageService, cdr, auth, router) {
        this.fb = fb;
        this.messageService = messageService;
        this.cdr = cdr;
        this.auth = auth;
        this.router = router;
        this.emailForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
        this.otpForm = this.fb.group({
            otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
        });
        this.resetForm = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]]
        });
        this.passwordSub = this.resetForm.get('password')?.valueChanges.subscribe(() => {
            this.updatePasswordStrength();
            this.resetForm.get('confirmPassword')?.updateValueAndValidity();
            this.cdr.markForCheck();
        });
        this.rotationTimer = setInterval(() => {
            this.activeIndex = (this.activeIndex + 1) % this.carouselItems.length;
            this.cdr.markForCheck();
        }, 3000);
    }
    submitEmail() {
        if (this.emailForm.invalid || this.submitting()) {
            this.emailForm.markAllAsTouched();
            return;
        }
        this.submitting.set(true);
        const email = this.emailForm.get('email')?.value;
        this.auth.forgotPasswordSendOtp(email).subscribe({
            next: (res) => {
                if (res.sent) {
                    this.step = 'otp';
                    this.messageService.add({
                        severity: 'success',
                        summary: 'OTP sent',
                        detail: res.message,
                        life: 5000
                    });
                    this.startOtpTimer();
                }
                else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Account not found',
                        detail: res.message,
                        life: 5000
                    });
                }
                this.submitting.set(false);
                this.cdr.markForCheck();
            },
            error: (err) => {
                this.submitting.set(false);
                const msg = getFriendlyErrorMessage(err, { default: 'Something went wrong. Please try again.' });
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: msg,
                    life: 5000
                });
                this.cdr.markForCheck();
            }
        });
    }
    submitOtp() {
        if (this.otpForm.invalid || this.otpExpired || this.submitting()) {
            this.otpForm.markAllAsTouched();
            return;
        }
        this.submitting.set(true);
        const email = this.emailForm.get('email')?.value;
        const otp = this.otpForm.get('otp')?.value;
        this.auth.verifyOtp(email, otp).subscribe({
            next: (res) => {
                if (res.valid) {
                    if (this.otpTimer)
                        clearInterval(this.otpTimer);
                    this.step = 'reset';
                    this.messageService.add({
                        severity: 'success',
                        summary: 'OTP verified',
                        detail: 'You can now set a new password.',
                        life: 3000
                    });
                }
                else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Invalid OTP',
                        detail: 'OTP is invalid or expired. Please try again or resend.',
                        life: 5000
                    });
                }
                this.submitting.set(false);
                this.cdr.markForCheck();
            },
            error: (err) => {
                this.submitting.set(false);
                const msg = getFriendlyErrorMessage(err, { default: 'Could not verify OTP. Please try again.' });
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: msg,
                    life: 5000
                });
                this.cdr.markForCheck();
            }
        });
    }
    submitReset() {
        if (this.resetForm.invalid || !this.passwordsMatch() || this.submitting()) {
            this.resetForm.markAllAsTouched();
            return;
        }
        this.submitting.set(true);
        const email = this.emailForm.get('email')?.value;
        const otp = this.otpForm.get('otp')?.value;
        const newPassword = this.resetForm.get('password')?.value;
        this.auth.resetPassword(email, otp, newPassword).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Password updated',
                    detail: res.message || 'You can now log in with your new password.',
                    life: 5000
                });
                this.submitting.set(false);
                this.cdr.markForCheck();
                setTimeout(() => this.router.navigate(['/login']), 1500);
            },
            error: (err) => {
                this.submitting.set(false);
                const msg = getFriendlyErrorMessage(err, { default: 'Could not reset password. Please try again.' });
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: msg,
                    life: 5000
                });
                this.cdr.markForCheck();
            }
        });
    }
    resendOtp() {
        const email = this.emailForm.get('email')?.value;
        this.otpForm.patchValue({ otp: '' });
        this.otpExpired = false;
        this.auth.forgotPasswordSendOtp(email).subscribe({
            next: (res) => {
                if (res.sent) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'OTP resent',
                        detail: res.message,
                        life: 5000
                    });
                    this.startOtpTimer();
                }
                else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Account not found',
                        detail: res.message,
                        life: 5000
                    });
                }
                this.cdr.markForCheck();
            },
            error: (err) => {
                const msg = getFriendlyErrorMessage(err, { default: 'Could not resend OTP. Please try again.' });
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: msg,
                    life: 5000
                });
                this.cdr.markForCheck();
            }
        });
    }
    get otpTimeLabel() {
        const minutes = Math.floor(this.otpSecondsLeft / 60)
            .toString()
            .padStart(2, '0');
        const seconds = (this.otpSecondsLeft % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }
    get strengthClass() {
        if (this.passwordStrength >= 70) {
            return 'strength-strong';
        }
        if (this.passwordStrength >= 40) {
            return 'strength-medium';
        }
        return 'strength-weak';
    }
    passwordsMatch() {
        return this.resetForm.get('password')?.value === this.resetForm.get('confirmPassword')?.value;
    }
    setActive(index) {
        this.activeIndex = index;
    }
    ngOnDestroy() {
        if (this.otpTimer) {
            clearInterval(this.otpTimer);
        }
        if (this.rotationTimer) {
            clearInterval(this.rotationTimer);
        }
        this.passwordSub?.unsubscribe();
    }
    startOtpTimer() {
        if (this.otpTimer) {
            clearInterval(this.otpTimer);
        }
        this.otpSecondsLeft = this.otpTotalSeconds - 1;
        this.otpProgress = Math.max(0, (this.otpSecondsLeft / this.otpTotalSeconds) * 100);
        this.otpExpired = false;
        this.cdr.markForCheck();
        this.otpTimer = setInterval(() => {
            this.otpSecondsLeft -= 1;
            this.otpProgress = Math.max(0, (this.otpSecondsLeft / this.otpTotalSeconds) * 100);
            this.cdr.markForCheck();
            if (this.otpSecondsLeft <= 0) {
                this.otpExpired = true;
                this.messageService.add({
                    severity: 'warn',
                    summary: 'OTP expired',
                    detail: 'Please resend OTP to continue.'
                });
                this.cdr.markForCheck();
                clearInterval(this.otpTimer);
            }
        }, 1000);
    }
    updatePasswordStrength() {
        const password = this.resetForm.get('password')?.value || '';
        let score = 0;
        if (password.length >= 6)
            score += 25;
        if (password.length >= 10)
            score += 15;
        if (/[A-Z]/.test(password))
            score += 20;
        if (/[0-9]/.test(password))
            score += 20;
        if (/[^A-Za-z0-9]/.test(password))
            score += 20;
        this.passwordStrength = Math.min(100, score);
        if (this.passwordStrength >= 70) {
            this.passwordLabel = 'Strong';
        }
        else if (this.passwordStrength >= 40) {
            this.passwordLabel = 'Medium';
        }
        else {
            this.passwordLabel = 'Weak';
        }
    }
    static ɵfac = function ForgotComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ForgotComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.MessageService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i3.AuthService), i0.ɵɵdirectiveInject(i4.Router)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ForgotComponent, selectors: [["sqx-forgot"]], features: [i0.ɵɵProvidersFeature([MessageService])], decls: 21, vars: 5, consts: [[1, "flex", "flex-column", "lg:flex-row", "h-screen", "overflow-hidden", "p-2", "box-border", "bg-white"], [1, "w-full", "lg:w-6", "p-0", "hidden", "lg:block", "h-full", "relative"], ["src", "/assets/images/auth.jpg", "alt", "Forgot password banner", 1, "w-full", "h-full", "block", "object-cover"], [1, "absolute", "bottom-0", "left-0", "p-4", "lg:p-5", "text-white"], [1, "hero-content"], [1, "hero-slides"], ["class", "hero-slide", 3, "active", 4, "ngFor", "ngForOf"], [1, "hero-dots"], ["type", "button", "aria-label", "Show slide", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "w-full", "lg:w-6", "h-full", "p-4", "lg:p-6", "flex", "flex-column", "justify-content-center", "gap-3", "bg-white", "forgot-form"], [1, "flex", "justify-content-center", "lg:justify-content-start"], ["src", "/core/logo.svg", "alt", "SkillQuestX", 1, "w-15rem"], [1, "m-0"], [1, "mt-2", "mb-0"], [1, "animate-in"], [1, "hero-slide"], [1, "hero-title-stack"], [1, "hero-title", "m-0"], [1, "hero-quote"], [1, "quote-mark"], ["type", "button", "aria-label", "Show slide", 3, "click"], [1, "flex", "flex-column", "gap-3", 3, "ngSubmit", "formGroup"], [1, "flex", "flex-column", "gap-1"], ["variant", "on", 1, "w-full"], [1, "w-full"], [1, "pi", "pi-envelope"], ["id", "forgot-email", "pInputText", "", "type", "email", "formControlName", "email", 1, "w-full"], ["for", "forgot-email"], ["class", "p-error", 4, "ngIf"], [1, "flex", "flex-column", "lg:flex-row", "justify-content-between", "align-items-start", "lg:align-items-center", "gap-2"], ["routerLink", "/login", 1, "brand-link", "text-sm"], ["pButton", "", "type", "submit", "label", "Send OTP", 1, "login-button", "w-full", 3, "loading", "disabled"], [1, "p-error"], [1, "pi", "pi-key"], ["id", "forgot-otp", "pInputText", "", "type", "text", "maxlength", "6", "formControlName", "otp", 1, "w-full"], ["for", "forgot-otp"], [1, "flex", "flex-column", "gap-2", "align-items-center"], [1, "text-sm", "text-600"], [1, "otp-timer"], [3, "ngModel", "ngModelOptions", "readonly", "strokeWidth", "size", "showValue"], [1, "otp-timer-label", "text-sm", "font-medium"], [1, "flex", "flex-column", "sm:flex-row", "gap-2"], ["pButton", "", "type", "submit", "label", "Verify OTP", 1, "login-button", "w-full", 3, "loading", "disabled"], ["pButton", "", "type", "button", "label", "Resend OTP", 1, "p-button-outlined", "w-full", 3, "click"], [1, "pi", "pi-lock"], ["inputId", "new-password", "formControlName", "password", "inputStyleClass", "w-full", 1, "w-full", 3, "toggleMask", "feedback"], ["for", "new-password"], ["class", "password-strength", 4, "ngIf"], ["inputId", "confirm-password", "formControlName", "confirmPassword", "inputStyleClass", "w-full", 1, "w-full", 3, "toggleMask", "feedback"], ["for", "confirm-password"], ["pButton", "", "type", "submit", "label", "Update Password", 1, "login-button", "w-full", 3, "loading", "disabled"], [1, "password-strength"], [1, "strength-bar"], [1, "strength-fill"], [1, "strength-text"]], template: function ForgotComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵelement(1, "p-toast");
            i0.ɵɵelementStart(2, "div", 1);
            i0.ɵɵelement(3, "img", 2);
            i0.ɵɵelementStart(4, "div", 3)(5, "div", 4)(6, "div", 5);
            i0.ɵɵtemplate(7, ForgotComponent_div_7_Template, 10, 4, "div", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 7);
            i0.ɵɵtemplate(9, ForgotComponent_button_9_Template, 1, 2, "button", 8);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(10, "div", 9)(11, "div", 10);
            i0.ɵɵelement(12, "img", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "div")(14, "h2", 12);
            i0.ɵɵtext(15, "Forgot Password");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "p", 13);
            i0.ɵɵtext(17, "We\u2019ll help you reset your password in a few steps.");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(18, ForgotComponent_Conditional_18_Template, 14, 4, "div", 14);
            i0.ɵɵconditionalCreate(19, ForgotComponent_Conditional_19_Template, 21, 13, "div", 14);
            i0.ɵɵconditionalCreate(20, ForgotComponent_Conditional_20_Template, 20, 10, "div", 14);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngForOf", ctx.carouselItems);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.carouselItems);
            i0.ɵɵadvance(9);
            i0.ɵɵconditional(ctx.step === "email" ? 18 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.step === "otp" ? 19 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.step === "reset" ? 20 : -1);
        } }, dependencies: [CommonModule, i5.NgForOf, i5.NgIf, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.FormGroupDirective, i1.FormControlName, FormsModule, i1.NgModel, RouterLink,
            ButtonModule, i6.ButtonDirective, IconFieldModule, i7.IconField, InputIconModule, i8.InputIcon, InputTextModule, i9.InputText, PasswordModule, i10.Password, ProgressBarModule,
            KnobModule, i11.Knob, ToastModule, i12.Toast, FloatLabelModule, i13.FloatLabel], styles: [".forgot-form[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.otp-timer-screen[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.animate-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeSlideIn 0.4s ease;\n}\n\n@keyframes _ngcontent-%COMP%_fadeSlideIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.brand-link[_ngcontent-%COMP%] {\n  color: var(--sqx-color-primary);\n  text-decoration: none;\n  font-weight: 600;\n}\n\n.brand-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n.p-error[_ngcontent-%COMP%] {\n  color: #d32f2f;\n  font-size: 12px;\n}\n\n.strength-weak[_ngcontent-%COMP%]     .p-progressbar-value {\n  background: #ef4444;\n}\n\n.strength-medium[_ngcontent-%COMP%]     .p-progressbar-value {\n  background: #f59e0b;\n}\n\n.strength-strong[_ngcontent-%COMP%]     .p-progressbar-value {\n  background: #22c55e;\n}\n\n.otp-progress[_ngcontent-%COMP%]     .p-progressbar-value {\n  background: var(--sqx-color-primary);\n  transition: width 0.4s ease;\n}\n\n.otp-timer[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.otp-timer-label[_ngcontent-%COMP%] {\n  position: absolute;\n}\n\n\n  .p-knob-value {\n  stroke: var(--sqx-color-primary);\n}\n\n  .p-knob-range {\n  stroke: #e5e7eb;\n}\n\n  .p-password .p-password-toggle, \n  .p-password .p-password-toggle-icon, \n  .p-password .p-icon {\n  cursor: pointer;\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  max-width: 720px;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n\n.hero-slides[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 72px;\n}\n\n.hero-slide[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  transform: translateY(8px);\n  transition: opacity 0.4s ease, transform 0.4s ease;\n}\n\n.hero-slide.active[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: translateY(0);\n}\n\n.hero-title-stack[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n}\n\n.hero-quote[_ngcontent-%COMP%] {\n  font-size: 16px;\n  line-height: 1.6;\n  margin: 0;\n  position: relative;\n  white-space: nowrap;\n}\n\n.quote-mark[_ngcontent-%COMP%] {\n  font-size: 36px;\n  line-height: 0;\n  vertical-align: baseline;\n  opacity: 0.6;\n}\n\n.hero-dots[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n\n.hero-dots[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 4px;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.35);\n  border: none;\n  padding: 0;\n  cursor: pointer;\n}\n\n.hero-dots[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  width: 40px;\n  background: #ffffff;\n}\n\n  .p-progressbar {\n  height: 4px;\n  border-radius: 999px;\n}\n\n  .p-progressbar-value {\n  border-radius: 999px;\n}\n\n  .login-button.p-button {\n  background: var(--sqx-color-primary);\n  border: 1px solid var(--sqx-color-primary);\n  color: #ffffff;\n}\n\n  .login-button.p-button:enabled:hover, \n  .login-button.p-button:enabled:focus, \n  .login-button.p-button:enabled:active {\n  background: var(--sqx-color-primary-dark);\n  border: 1px solid var(--sqx-color-primary-dark);\n  color: #ffffff;\n}\n\n  .login-button.p-button:focus, \n  .login-button.p-button:active {\n  background: var(--sqx-color-primary);\n  border: none;\n  color: #ffffff;\n}\n\n  .p-button.p-button-outlined {\n  color: var(--sqx-color-primary);\n  border-color: var(--sqx-color-primary);\n}\n\n  .p-button.p-button-outlined:enabled:hover, \n  .p-button.p-button-outlined:enabled:focus, \n  .p-button.p-button-outlined:enabled:active {\n  color: var(--sqx-color-primary-dark);\n  border-color: var(--sqx-color-primary-dark);\n  background: rgba(91, 75, 196, 0.08);\n}\n\n//[_ngcontent-%COMP%]   Password[_ngcontent-%COMP%]   Strength[_ngcontent-%COMP%]   Indicator\n.password-strength[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n\n.strength-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 4px;\n  background: #e5e7eb;\n  border-radius: 2px;\n  overflow: hidden;\n  margin-bottom: 4px;\n}\n\n.strength-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  transition: all 0.3s ease;\n  border-radius: 2px;\n\n  &[data-strength=\"weak\"] {\n    width: 33%;\n    background: #ef4444;\n  }\n\n  &[data-strength=\"medium\"] {\n    width: 66%;\n    background: #f59e0b;\n  }\n\n  &[data-strength=\"strong\"] {\n    width: 100%;\n    background: #10b981;\n  }\n}\n\n.strength-text[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: capitalize;\n\n  &[data-strength=\"weak\"] {\n    color: #ef4444;\n  }\n\n  &[data-strength=\"medium\"] {\n    color: #f59e0b;\n  }\n\n  &[data-strength=\"strong\"] {\n    color: #10b981;\n  }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ForgotComponent, [{
        type: Component,
        args: [{ selector: 'sqx-forgot', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    FormsModule,
                    RouterLink,
                    ButtonModule,
                    IconFieldModule,
                    InputIconModule,
                    InputTextModule,
                    PasswordModule,
                    ProgressBarModule,
                    KnobModule,
                    ToastModule,
                    FloatLabelModule
                ], changeDetection: ChangeDetectionStrategy.OnPush, providers: [MessageService], template: "<section class=\"flex flex-column lg:flex-row h-screen overflow-hidden p-2 box-border bg-white\">\n  <p-toast></p-toast>\n\n  <div class=\"w-full lg:w-6 p-0 hidden lg:block h-full relative\">\n    <img class=\"w-full h-full block object-cover\" src=\"/assets/images/auth.jpg\" alt=\"Forgot password banner\" />\n    <div class=\"absolute bottom-0 left-0 p-4 lg:p-5 text-white\">\n      <div class=\"hero-content\">\n        <div class=\"hero-slides\">\n          <div class=\"hero-slide\" *ngFor=\"let item of carouselItems; let i = index\" [class.active]=\"i === activeIndex\">\n            <div class=\"hero-title-stack\">\n              <h3 class=\"hero-title m-0\">{{ item.title }}</h3>\n              <div class=\"hero-quote\">\n                <span class=\"quote-mark\">\u201C</span>{{ item.subtitle }}<span class=\"quote-mark\">\u201D</span>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"hero-dots\">\n          <button type=\"button\" *ngFor=\"let item of carouselItems; let i = index\" [class.active]=\"i === activeIndex\"\n            (click)=\"setActive(i)\" aria-label=\"Show slide\"></button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"w-full lg:w-6 h-full p-4 lg:p-6 flex flex-column justify-content-center gap-3 bg-white forgot-form\">\n    <div class=\"flex justify-content-center lg:justify-content-start\">\n      <img src=\"/core/logo.svg\" alt=\"SkillQuestX\" class=\"w-15rem\" />\n    </div>\n    <div>\n      <h2 class=\"m-0\">Forgot Password</h2>\n      <p class=\"mt-2 mb-0\">We\u2019ll help you reset your password in a few steps.</p>\n    </div>\n\n    @if (step === 'email') {\n    <div class=\"animate-in\">\n      <form [formGroup]=\"emailForm\" (ngSubmit)=\"submitEmail()\" class=\"flex flex-column gap-3\">\n        <div class=\"flex flex-column gap-1\">\n          <p-floatlabel variant=\"on\" class=\"w-full\">\n            <p-iconfield class=\"w-full\">\n              <p-inputicon class=\"pi pi-envelope\"></p-inputicon>\n              <input id=\"forgot-email\" pInputText type=\"email\" formControlName=\"email\" class=\"w-full\" />\n            </p-iconfield>\n            <label for=\"forgot-email\">Email</label>\n          </p-floatlabel>\n          <small class=\"p-error\" *ngIf=\"emailForm.get('email')?.touched && emailForm.get('email')?.invalid\">\n            Enter a valid email address.\n          </small>\n        </div>\n\n        <div class=\"flex flex-column lg:flex-row justify-content-between align-items-start lg:align-items-center gap-2\">\n          <a routerLink=\"/login\" class=\"brand-link text-sm\">Back to login</a>\n        </div>\n\n        <button pButton type=\"submit\" label=\"Send OTP\" class=\"login-button w-full\"\n          [loading]=\"submitting()\" [disabled]=\"emailForm.invalid || submitting()\"></button>\n      </form>\n    </div>\n    }\n\n    @if (step === 'otp') {\n    <div class=\"animate-in\">\n      <form [formGroup]=\"otpForm\" (ngSubmit)=\"submitOtp()\" class=\"flex flex-column gap-3\">\n        <div class=\"flex flex-column gap-1\">\n          <p-floatlabel variant=\"on\" class=\"w-full\">\n            <p-iconfield class=\"w-full\">\n              <p-inputicon class=\"pi pi-key\"></p-inputicon>\n              <input id=\"forgot-otp\" pInputText type=\"text\" maxlength=\"6\" formControlName=\"otp\" class=\"w-full\" />\n            </p-iconfield>\n            <label for=\"forgot-otp\">OTP</label>\n          </p-floatlabel>\n          <small class=\"p-error\" *ngIf=\"otpForm.get('otp')?.touched && otpForm.get('otp')?.invalid\">\n            Enter a valid 6-digit OTP.\n          </small>\n          <small class=\"p-error\" *ngIf=\"otpExpired\">OTP expired. Please resend.</small>\n        </div>\n\n        <div class=\"flex flex-column gap-2 align-items-center\">\n          <div class=\"text-sm text-600\">OTP expires in</div>\n          <div class=\"otp-timer\">\n            <p-knob [ngModel]=\"otpProgress\" [ngModelOptions]=\"{ standalone: true }\" [readonly]=\"true\" [strokeWidth]=\"8\"\n              [size]=\"90\" [showValue]=\"false\"></p-knob>\n            <div class=\"otp-timer-label text-sm font-medium\">{{ otpTimeLabel }}</div>\n          </div>\n        </div>\n\n        <div class=\"flex flex-column sm:flex-row gap-2\">\n          <button pButton type=\"submit\" label=\"Verify OTP\" class=\"login-button w-full\"\n            [loading]=\"submitting()\" [disabled]=\"submitting()\"></button>\n          <button pButton type=\"button\" label=\"Resend OTP\" class=\"p-button-outlined w-full\"\n            (click)=\"resendOtp()\"></button>\n        </div>\n      </form>\n    </div>\n    }\n\n    @if (step === 'reset') {\n    <div class=\"animate-in\">\n      <form [formGroup]=\"resetForm\" (ngSubmit)=\"submitReset()\" class=\"flex flex-column gap-3\">\n        <div class=\"flex flex-column gap-1\">\n          <p-floatlabel variant=\"on\" class=\"w-full\">\n            <p-iconfield class=\"w-full\">\n              <p-inputicon class=\"pi pi-lock\"></p-inputicon>\n              <p-password inputId=\"new-password\" [toggleMask]=\"true\" [feedback]=\"false\" formControlName=\"password\"\n                inputStyleClass=\"w-full\" class=\"w-full\"></p-password>\n            </p-iconfield>\n            <label for=\"new-password\">New Password</label>\n          </p-floatlabel>\n          <small class=\"p-error\" *ngIf=\"resetForm.get('password')?.touched && resetForm.get('password')?.invalid\">\n            Password must be at least 6 characters.\n          </small>\n\n          <!-- Password Strength Indicator -->\n          <div class=\"password-strength\" *ngIf=\"resetForm.get('password')?.value\">\n            <div class=\"strength-bar\">\n              <div class=\"strength-fill\" [attr.data-strength]=\"passwordLabel.toLowerCase()\"></div>\n            </div>\n            <small class=\"strength-text\" [attr.data-strength]=\"passwordLabel.toLowerCase()\">\n              Password strength: {{ passwordLabel }}\n            </small>\n          </div>\n        </div>\n\n\n        <div class=\"flex flex-column gap-1\">\n          <p-floatlabel variant=\"on\" class=\"w-full\">\n            <p-iconfield class=\"w-full\">\n              <p-inputicon class=\"pi pi-lock\"></p-inputicon>\n              <p-password inputId=\"confirm-password\" [toggleMask]=\"true\" [feedback]=\"false\"\n                formControlName=\"confirmPassword\" inputStyleClass=\"w-full\" class=\"w-full\"></p-password>\n            </p-iconfield>\n            <label for=\"confirm-password\">Confirm Password</label>\n          </p-floatlabel>\n          <small class=\"p-error\" *ngIf=\"resetForm.get('confirmPassword')?.touched && !passwordsMatch()\">\n            Passwords do not match.\n          </small>\n        </div>\n\n        <button pButton type=\"submit\" label=\"Update Password\" class=\"login-button w-full\"\n        [loading]=\"submitting()\" [disabled]=\"submitting()\"></button>\n      </form>\n    </div>\n    }\n  </div>\n</section>", styles: [".forgot-form {\n  position: relative;\n}\n\n.otp-timer-screen {\n  position: absolute;\n  top: 0;\n  right: 0;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.animate-in {\n  animation: fadeSlideIn 0.4s ease;\n}\n\n@keyframes fadeSlideIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.brand-link {\n  color: var(--sqx-color-primary);\n  text-decoration: none;\n  font-weight: 600;\n}\n\n.brand-link:hover {\n  text-decoration: underline;\n}\n\n.p-error {\n  color: #d32f2f;\n  font-size: 12px;\n}\n\n.strength-weak ::ng-deep .p-progressbar-value {\n  background: #ef4444;\n}\n\n.strength-medium ::ng-deep .p-progressbar-value {\n  background: #f59e0b;\n}\n\n.strength-strong ::ng-deep .p-progressbar-value {\n  background: #22c55e;\n}\n\n.otp-progress ::ng-deep .p-progressbar-value {\n  background: var(--sqx-color-primary);\n  transition: width 0.4s ease;\n}\n\n.otp-timer {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.otp-timer-label {\n  position: absolute;\n}\n\n\n::ng-deep .p-knob-value {\n  stroke: var(--sqx-color-primary);\n}\n\n::ng-deep .p-knob-range {\n  stroke: #e5e7eb;\n}\n\n::ng-deep .p-password .p-password-toggle,\n::ng-deep .p-password .p-password-toggle-icon,\n::ng-deep .p-password .p-icon {\n  cursor: pointer;\n}\n\n.hero-content {\n  max-width: 720px;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n\n.hero-slides {\n  position: relative;\n  min-height: 72px;\n}\n\n.hero-slide {\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  transform: translateY(8px);\n  transition: opacity 0.4s ease, transform 0.4s ease;\n}\n\n.hero-slide.active {\n  opacity: 1;\n  transform: translateY(0);\n}\n\n.hero-title-stack {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\n.hero-title {\n  font-size: 28px;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n}\n\n.hero-quote {\n  font-size: 16px;\n  line-height: 1.6;\n  margin: 0;\n  position: relative;\n  white-space: nowrap;\n}\n\n.quote-mark {\n  font-size: 36px;\n  line-height: 0;\n  vertical-align: baseline;\n  opacity: 0.6;\n}\n\n.hero-dots {\n  display: flex;\n  gap: 8px;\n}\n\n.hero-dots button {\n  width: 20px;\n  height: 4px;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.35);\n  border: none;\n  padding: 0;\n  cursor: pointer;\n}\n\n.hero-dots button.active {\n  width: 40px;\n  background: #ffffff;\n}\n\n::ng-deep .p-progressbar {\n  height: 4px;\n  border-radius: 999px;\n}\n\n::ng-deep .p-progressbar-value {\n  border-radius: 999px;\n}\n\n::ng-deep .login-button.p-button {\n  background: var(--sqx-color-primary);\n  border: 1px solid var(--sqx-color-primary);\n  color: #ffffff;\n}\n\n::ng-deep .login-button.p-button:enabled:hover,\n::ng-deep .login-button.p-button:enabled:focus,\n::ng-deep .login-button.p-button:enabled:active {\n  background: var(--sqx-color-primary-dark);\n  border: 1px solid var(--sqx-color-primary-dark);\n  color: #ffffff;\n}\n\n::ng-deep .login-button.p-button:focus,\n::ng-deep .login-button.p-button:active {\n  background: var(--sqx-color-primary);\n  border: none;\n  color: #ffffff;\n}\n\n::ng-deep .p-button.p-button-outlined {\n  color: var(--sqx-color-primary);\n  border-color: var(--sqx-color-primary);\n}\n\n::ng-deep .p-button.p-button-outlined:enabled:hover,\n::ng-deep .p-button.p-button-outlined:enabled:focus,\n::ng-deep .p-button.p-button-outlined:enabled:active {\n  color: var(--sqx-color-primary-dark);\n  border-color: var(--sqx-color-primary-dark);\n  background: rgba(91, 75, 196, 0.08);\n}\n\n// Password Strength Indicator\n.password-strength {\n  margin-top: 8px;\n}\n\n.strength-bar {\n  width: 100%;\n  height: 4px;\n  background: #e5e7eb;\n  border-radius: 2px;\n  overflow: hidden;\n  margin-bottom: 4px;\n}\n\n.strength-fill {\n  height: 100%;\n  transition: all 0.3s ease;\n  border-radius: 2px;\n\n  &[data-strength=\"weak\"] {\n    width: 33%;\n    background: #ef4444;\n  }\n\n  &[data-strength=\"medium\"] {\n    width: 66%;\n    background: #f59e0b;\n  }\n\n  &[data-strength=\"strong\"] {\n    width: 100%;\n    background: #10b981;\n  }\n}\n\n.strength-text {\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: capitalize;\n\n  &[data-strength=\"weak\"] {\n    color: #ef4444;\n  }\n\n  &[data-strength=\"medium\"] {\n    color: #f59e0b;\n  }\n\n  &[data-strength=\"strong\"] {\n    color: #10b981;\n  }\n}"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.MessageService }, { type: i0.ChangeDetectorRef }, { type: i3.AuthService }, { type: i4.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ForgotComponent, { className: "ForgotComponent", filePath: "src/app/modules/core/components/forgot/forgot.component.ts", lineNumber: 43 }); })();
