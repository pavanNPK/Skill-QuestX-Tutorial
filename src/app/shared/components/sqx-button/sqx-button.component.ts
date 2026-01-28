import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'primary' | 'secondary' | 'ghost';

@Component({
  selector: 'sqx-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sqx-button.component.html',
  styleUrl: './sqx-button.component.css'
})
export class SqxButtonComponent {
  // Public inputs let templates configure label, style, and behavior.
  @Input() label = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() fullWidth = false;
  @Input() width = '';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon = '';
  @Input() iconPosition: 'left' | 'right' = 'left';

  get isDisabled(): boolean {
    // Disable when explicitly disabled or while loading.
    return this.disabled || this.loading;
  }
}
