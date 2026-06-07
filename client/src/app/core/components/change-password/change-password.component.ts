// use of this file is:
// Core component file. It renders app-wide UI used across routes.
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AuthService } from '../../services/auth.service';
import { getFriendlyErrorMessage } from '../../../shared/utils/error-messages.util';
import { SnackbarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'sqx-change-password',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ProgressSpinnerModule,
],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent {
  private router = inject(Router);
  private auth = inject(AuthService);
  private snackbar = inject(SnackbarService);

  readonly submitting = signal(false);
  readonly currentPassword = signal('');
  readonly newPassword = signal('');
  readonly confirmPassword = signal('');
  readonly touched = signal({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  readonly passwordMismatch = computed(() => {
    const confirm = this.confirmPassword();
    return confirm.length > 0 && this.newPassword() !== confirm;
  });
  readonly formInvalid = computed(() =>
    !this.currentPassword().trim() ||
    this.newPassword().length < 8 ||
    !this.confirmPassword().trim() ||
    this.newPassword() !== this.confirmPassword()
  );
  readonly passwordRules = [
    { label: 'Minimum 8 characters', test: (value: string) => value.length >= 8 },
    { label: 'One uppercase character', test: (value: string) => /[A-Z]/.test(value) },
    { label: 'One lowercase character', test: (value: string) => /[a-z]/.test(value) },
    { label: 'One number', test: (value: string) => /\d/.test(value) },
    { label: 'One special character', test: (value: string) => /[^A-Za-z0-9]/.test(value) },
  ];
  ruleComplete(rule: { test: (value: string) => boolean }): boolean {
    return rule.test(this.newPassword());
  }

  setField(field: 'currentPassword' | 'newPassword' | 'confirmPassword', value: string): void {
    if (field === 'currentPassword') this.currentPassword.set(value);
    if (field === 'newPassword') this.newPassword.set(value);
    if (field === 'confirmPassword') this.confirmPassword.set(value);
  }

  markTouched(field: 'currentPassword' | 'newPassword' | 'confirmPassword'): void {
    this.touched.update((state) => ({ ...state, [field]: true }));
  }

  cancel(): void {
    this.router.navigate(['/profile-settings']);
  }

  submit(): void {
    this.touched.set({ currentPassword: true, newPassword: true, confirmPassword: true });
    if (this.formInvalid()) {
      return;
    }
    const currentPassword = this.currentPassword();
    const newPassword = this.newPassword();
    this.submitting.set(true);
    this.auth.changePassword(currentPassword, newPassword).subscribe({
      next: (res) => {
        this.submitting.set(false);
        this.snackbar.success(res.message ?? 'Password updated. Please sign in again with your new password.');
        this.auth.logout();
      },
      error: (err) => {
        this.submitting.set(false);
        this.snackbar.error(
          getFriendlyErrorMessage(err, {
            default: 'Could not update password. Check your current password and try again.',
          }),
        );
      },
    });
  }
}
