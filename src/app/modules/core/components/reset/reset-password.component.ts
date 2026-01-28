import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  template: `
    <section class="page">
      <h1>Reset Password</h1>
      <p>Set a new password.</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent {}
