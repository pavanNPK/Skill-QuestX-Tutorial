import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sqx-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {}
