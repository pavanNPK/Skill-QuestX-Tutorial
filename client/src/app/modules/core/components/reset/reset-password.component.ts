import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sqx-reset-password',
  standalone: true,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent {}
