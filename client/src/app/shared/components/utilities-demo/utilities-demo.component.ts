// use of this file is:
// Shared component file. It provides reusable UI or base behavior across features.
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'sqx-utilities-demo',
  standalone: true,
  imports: [ButtonModule, InputTextModule],
  templateUrl: './utilities-demo.component.html',
  styleUrl: './utilities-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UtilitiesDemoComponent { }
