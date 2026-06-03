import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth.service';
import { getFriendlyErrorMessage } from '../../../shared/utils/error-messages.util';
import { SnackbarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'sqx-change-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
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
  readonly hideCurrentPassword = signal(true);
  readonly hideNewPassword = signal(true);
  readonly hideConfirmPassword = signal(true);
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
