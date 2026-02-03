import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sqx-utilities-demo',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule],
  templateUrl: './utilities-demo.component.html',
  styleUrl: './utilities-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UtilitiesDemoComponent { }
