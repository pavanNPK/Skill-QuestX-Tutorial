import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sqx-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {}
