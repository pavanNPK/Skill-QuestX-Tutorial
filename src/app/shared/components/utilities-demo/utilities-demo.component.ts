import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sqx-utilities-demo',
  standalone: true,
  templateUrl: './utilities-demo.component.html',
  styleUrl: './utilities-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UtilitiesDemoComponent {}
