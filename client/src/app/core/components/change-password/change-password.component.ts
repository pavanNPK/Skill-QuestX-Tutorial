// use of this file is:
// Core component file. It renders app-wide UI used across routes.
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
    ReactiveFormsModule,
    RouterLink,
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
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);
  private snackbar = inject(SnackbarService);

  readonly submitting = signal(false);
  form: FormGroup;

  constructor() {
    this.form = this.fb.group(
      {
        currentPassword: ['', [Validators.required, Validators.minLength(6)]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup): { [key: string]: boolean } | null {
    const newP = g.get('newPassword')?.value;
    const confirm = g.get('confirmPassword')?.value;
    if (newP && confirm && newP !== confirm) return { mismatch: true };
    return null;
  }

  submit(): void {
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
