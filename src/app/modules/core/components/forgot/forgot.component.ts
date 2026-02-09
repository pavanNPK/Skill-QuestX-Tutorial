import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'sqx-forgot',
  standalone: true,
  imports: [
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
  ],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class ForgotComponent implements OnDestroy {
  step: 'email' | 'otp' | 'reset' = 'email';
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

  emailForm: FormGroup;
  otpForm: FormGroup;
  resetForm: FormGroup;

  passwordStrength = 0;
  passwordLabel: 'Weak' | 'Medium' | 'Strong' = 'Weak';

  private otpTimer?: ReturnType<typeof setInterval>;
  private rotationTimer?: ReturnType<typeof setInterval>;
  private passwordSub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {
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
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    this.step = 'otp';
    this.messageService.add({
      severity: 'success',
      summary: 'OTP sent',
      detail: 'We sent a 6-digit OTP to your email.'
    });
    this.startOtpTimer();
    this.cdr.markForCheck();
  }

  submitOtp() {
    if (this.otpForm.invalid || this.otpExpired) {
      this.otpForm.markAllAsTouched();
      return;
    }

    this.messageService.add({
      severity: 'success',
      summary: 'OTP verified',
      detail: 'You can now set a new password.'
    });

    if (this.otpTimer) {
      clearInterval(this.otpTimer);
    }
    this.step = 'reset';
    this.cdr.markForCheck();
  }

  submitReset() {
    if (this.resetForm.invalid || !this.passwordsMatch()) {
      this.resetForm.markAllAsTouched();
      return;
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Password updated',
      detail: 'You can now log in with your new password.'
    });
    this.cdr.markForCheck();
  }

  resendOtp() {
    this.otpForm.reset();
    this.otpExpired = false;
    this.messageService.add({
      severity: 'info',
      summary: 'OTP resent',
      detail: 'A new OTP was sent to your email.'
    });
    this.startOtpTimer();
    this.cdr.markForCheck();
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

  setActive(index: number) {
    this.activeIndex = index;
  }

  ngOnDestroy(): void {
    if (this.otpTimer) {
      clearInterval(this.otpTimer);
    }
    if (this.rotationTimer) {
      clearInterval(this.rotationTimer);
    }
    this.passwordSub?.unsubscribe();
  }

  private startOtpTimer() {
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

  private updatePasswordStrength() {
    const password = this.resetForm.get('password')?.value || '';
    let score = 0;

    if (password.length >= 6) score += 25;
    if (password.length >= 10) score += 15;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[0-9]/.test(password)) score += 20;
    if (/[^A-Za-z0-9]/.test(password)) score += 20;

    this.passwordStrength = Math.min(100, score);

    if (this.passwordStrength >= 70) {
      this.passwordLabel = 'Strong';
    } else if (this.passwordStrength >= 40) {
      this.passwordLabel = 'Medium';
    } else {
      this.passwordLabel = 'Weak';
    }
  }
}
