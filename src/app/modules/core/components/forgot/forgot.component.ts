import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sqx-forgot',
  standalone: true,
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotComponent {}
