import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-forgot',
  standalone: true,
  template: `
    <section class="page">
      <h1>Forgot Password</h1>
      <p>Request a reset link.</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotComponent {}
