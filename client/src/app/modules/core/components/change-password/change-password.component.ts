import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

@Component({
  selector: 'sqx-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    PasswordModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);
  private messageService = inject(MessageService);

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
}
