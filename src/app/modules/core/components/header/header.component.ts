import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sqx-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {}
