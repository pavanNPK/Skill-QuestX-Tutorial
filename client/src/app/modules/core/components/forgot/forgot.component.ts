import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
import { AuthService } from '../../services/auth.service';

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

  /** Generic message so we never reveal whether the email exists (no email enumeration). */
  readonly genericOtpMessage = 'If an account exists with this email, you will receive an OTP.';

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private auth: AuthService,
    private router: Router
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
    const email = this.emailForm.get('email')?.value;
    this.auth.forgotPasswordSendOtp(email).subscribe({
      next: (res) => {
        this.step = 'otp';
        this.messageService.add({
          severity: 'info',
          summary: 'Check your email',
          detail: res.message || this.genericOtpMessage,
          life: 5000
        });
        this.startOtpTimer();
        this.cdr.markForCheck();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong. Please try again.',
          life: 5000
        });
        this.cdr.markForCheck();
      }
    });
  }

  submitOtp() {
    if (this.otpForm.invalid || this.otpExpired) {
      this.otpForm.markAllAsTouched();
      return;
    }
    const email = this.emailForm.get('email')?.value;
    const otp = this.otpForm.get('otp')?.value;
    this.auth.verifyOtp(email, otp).subscribe({
      next: (res) => {
        if (res.valid) {
          if (this.otpTimer) clearInterval(this.otpTimer);
          this.step = 'reset';
          this.messageService.add({
            severity: 'success',
            summary: 'OTP verified',
            detail: 'You can now set a new password.',
            life: 3000
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Invalid OTP',
            detail: 'OTP is invalid or expired. Please try again or resend.',
            life: 5000
          });
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not verify OTP. Please try again.',
          life: 5000
        });
        this.cdr.markForCheck();
      }
    });
  }

  submitReset() {
    if (this.resetForm.invalid || !this.passwordsMatch()) {
      this.resetForm.markAllAsTouched();
      return;
    }
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
        this.cdr.markForCheck();
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.error?.message || 'Could not reset password. Please try again.',
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
        this.messageService.add({
          severity: 'info',
          summary: 'Check your email',
          detail: res.message || this.genericOtpMessage,
          life: 5000
        });
        this.startOtpTimer();
        this.cdr.markForCheck();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not resend OTP. Please try again.',
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
