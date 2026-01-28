import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  template: `
    <section class="page">
      <h1>Privacy Policy</h1>
      <p>Privacy policy content goes here.</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyPolicyComponent {}
