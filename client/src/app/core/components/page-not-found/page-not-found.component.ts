import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sqx-page-not-found',
  standalone: true,
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {}
