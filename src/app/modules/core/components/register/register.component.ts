import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  template: `
    <section class="page">
      <h1>Register</h1>
      <p>Create your account.</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {}
