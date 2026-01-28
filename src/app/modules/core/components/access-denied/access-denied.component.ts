import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  template: `
    <section class="page">
      <h1>Access Denied</h1>
      <p>You do not have permission to view this page.</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessDeniedComponent {}
