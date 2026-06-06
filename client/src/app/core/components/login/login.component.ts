// use of this file is:
// Core component file. It renders app-wide UI used across routes.
import { ChangeDetectionStrategy, Component, OnDestroy, signal } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AuthService } from '../../services/auth.service';
import { getFriendlyErrorMessage } from '../../../shared/utils/error-messages.util';
import { SnackbarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'sqx-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy {
  private rotationTimer?: ReturnType<typeof setInterval>;

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

  readonly activeIndex = signal(0);

  /** True while login request is in progress (prevents double submit). */
  readonly submitting = signal(false);
  readonly hidePassword = signal(true);

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private snackbar: SnackbarService
  ) {
    this.loginForm = this.buildLoginForm();
    this.rotationTimer = setInterval(() => {
      this.activeIndex.update((index) => (index + 1) % this.carouselItems.length);
    }, 3000);
  }

  setActive(index: number) {
    this.activeIndex.set(index);
  }

  private buildLoginForm() {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submitLogin() {
    if (this.loginForm.invalid || this.submitting()) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    const { email, password } = this.loginForm.value;
    this.auth.login({ email, password }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.submitting.set(false);
        const msg = getFriendlyErrorMessage(err, { default: 'Invalid email or password. Please try again.' });
        this.snackbar.error(msg);
      },
      complete: () => this.submitting.set(false),
    });
  }

  ngOnDestroy(): void {
    if (this.rotationTimer) {
      clearInterval(this.rotationTimer);
    }
  }
}
