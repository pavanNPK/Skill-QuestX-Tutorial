import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  template: `
    <section class="page">
      <h1>Terms and Conditions</h1>
      <p>Terms and conditions content goes here.</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsAndConditionsComponent {}
