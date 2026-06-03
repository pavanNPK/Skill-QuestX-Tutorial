import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { getFriendlyErrorMessage } from '../../../shared/utils/error-messages.util';
import { SnackbarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'sqx-profile-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    SafeUrlPipe
],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent {
  private fb = inject(FormBuilder);
  readonly auth = inject(AuthService);
  private snackbar = inject(SnackbarService);

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
        this.snackbar.success('Your details have been saved.');
      },
      error: (err) => {
        this.submitting.set(false);
        this.snackbar.error(getFriendlyErrorMessage(err));
      },
    });
  }
}
