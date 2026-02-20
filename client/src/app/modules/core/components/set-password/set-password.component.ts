import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { getFriendlyErrorMessage } from '../../../../shared/utils/error-messages.util';

@Component({
  selector: 'sqx-set-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    PasswordModule,
    FloatLabelModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetPasswordComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);
  private messageService = inject(MessageService);

  readonly submitting = signal(false);
  readonly token = signal<string | null>(null);

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
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid link',
        detail: 'Set-password link is missing or invalid. Request a new one from your admin.',
      });
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
        this.messageService.add({
          severity: 'success',
          summary: 'Password set',
          detail: `${res.message} Your role: ${roleLabel}.`,
        });
        this.router.navigate(['/login'], { queryParams: { setPassword: 'true', role: res.user.role } });
      },
      error: (err: unknown) => {
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
