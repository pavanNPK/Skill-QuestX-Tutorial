import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth.service';
import { getFriendlyErrorMessage } from '../../../shared/utils/error-messages.util';
import { SnackbarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'sqx-set-password',
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
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetPasswordComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);
  private snackbar = inject(SnackbarService);

  readonly submitting = signal(false);
  readonly token = signal<string | null>(null);
  readonly hidePassword = signal(true);
  readonly hideConfirmPassword = signal(true);

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const t = this.route.snapshot.queryParamMap.get('token');
    this.token.set(t);
    if (!t) {
      this.snackbar.error('Set-password link is missing or invalid. Request a new one from your admin.');
    }
  }

  submit(): void {
    const t = this.token();
    if (!t) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      const confirm = this.form.get('confirmPassword');
      if (this.form.get('password')?.value !== confirm?.value) {
        confirm?.setErrors({ mismatch: true });
      }
      return;
    }
    const password = this.form.get('password')?.value;
    const confirm = this.form.get('confirmPassword')?.value;
    if (password !== confirm) {
      this.form.get('confirmPassword')?.setErrors({ mismatch: true });
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.auth.setPassword(t, password).subscribe({
      next: (res: { message: string; user: { role: string } }) => {
        this.submitting.set(false);
        const roleLabel = res.user.role === 'admin' ? 'Admin' : res.user.role === 'instructor' ? 'Instructor' : res.user.role;
        this.snackbar.success(`${res.message} Your role: ${roleLabel}.`);
        this.router.navigate(['/login'], { queryParams: { setPassword: 'true', role: res.user.role } });
      },
      error: (err: unknown) => {
        this.submitting.set(false);
        this.snackbar.error(getFriendlyErrorMessage(err));
      },
    });
  }
}
