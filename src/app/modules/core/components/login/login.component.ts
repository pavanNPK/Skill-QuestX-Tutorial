import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <section class="page">
      <h1>Login</h1>
      <p>Sign in to continue.</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {}
