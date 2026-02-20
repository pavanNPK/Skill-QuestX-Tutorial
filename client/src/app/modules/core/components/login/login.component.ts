import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { getFriendlyErrorMessage } from '../../../../shared/utils/error-messages.util';

@Component({
  selector: 'sqx-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    PasswordModule,
    FloatLabelModule,
    ToastModule
  ],
  providers: [MessageService],
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

  activeIndex = 0;

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private messageService: MessageService
  ) {
    this.loginForm = this.buildLoginForm();
    this.rotationTimer = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.carouselItems.length;
    }, 3000);
  }

  setActive(index: number) {
    this.activeIndex = index;
  }

  private buildLoginForm() {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submitLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;
    this.auth.login({ email, password }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        const msg = getFriendlyErrorMessage(err, { default: 'Invalid email or password. Please try again.' });
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: msg,
          life: 5000
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.rotationTimer) {
      clearInterval(this.rotationTimer);
    }
  }
}
