import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  template: `
    <section class="page">
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {}
