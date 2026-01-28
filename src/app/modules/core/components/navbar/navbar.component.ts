import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sqx-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {}
