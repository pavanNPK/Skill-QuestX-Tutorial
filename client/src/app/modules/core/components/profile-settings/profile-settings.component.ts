import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { getFriendlyErrorMessage } from '../../../../shared/utils/error-messages.util';

@Component({
  selector: 'sqx-profile-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    CardModule,
    InputTextModule,
    FloatLabelModule,
    ToastModule,
    SafeUrlPipe,
  ],
  providers: [MessageService],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent {
  private fb = inject(FormBuilder);
  readonly auth = inject(AuthService);
  private messageService = inject(MessageService);

  readonly submitting = signal(false);
  form: FormGroup;

  constructor() {
    const u = this.auth.currentUser();
    this.form = this.fb.group({
      firstName: [u?.firstName ?? '', [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
      lastName: [u?.lastName ?? '', [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
    });
  }

  userInitials(): string {
    const u = this.auth.currentUser();
    if (!u?.firstName && !u?.lastName) return (u?.name?.slice(0, 2) ?? 'U').toUpperCase();
    const f = (u.firstName ?? '').trim().charAt(0);
    const l = (u.lastName ?? '').trim().charAt(0);
    return (f + l).toUpperCase() || (u.name?.slice(0, 2) ?? 'U').toUpperCase();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.auth.updateProfile(this.form.value).subscribe({
      next: () => {
        this.submitting.set(false);
        this.messageService.add({
          severity: 'success',
          summary: 'Profile updated',
          detail: 'Your details have been saved.',
        });
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
}
