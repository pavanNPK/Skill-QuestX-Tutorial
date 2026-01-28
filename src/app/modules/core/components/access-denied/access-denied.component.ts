import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sqx-access-denied',
  standalone: true,
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessDeniedComponent {}
