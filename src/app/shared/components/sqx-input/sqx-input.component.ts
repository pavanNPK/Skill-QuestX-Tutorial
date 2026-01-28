import { CommonModule } from '@angular/common';
import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

type InputSize = 'xs' | 'sm' | 'md' | 'lg';
type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

let nextId = 0;

@Component({
  selector: 'sqx-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sqx-input.component.html',
  styleUrl: './sqx-input.component.scss'
})
export class SqxInputComponent implements ControlValueAccessor {
  // Public inputs let templates configure label, validation, and styling.
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: InputType = 'text';
  @Input() hint = '';
  @Input() inputId = '';
  @Input() autocomplete = '';

  @Input() required = false;
  @Input() minLength?: number;
  @Input() maxLength?: number;
  @Input() min?: number;
  @Input() max?: number;
  @Input() step?: number;
  @Input() pattern = '';

  @Input() prefixIcon = '';
  @Input() suffixIcon = '';
  @Input() size: InputSize = 'md';
  @Input() fullWidth = false;
  @Input() width = '';
  @Input() suppressErrors = false;
  @Input() errorMessages: Record<string, string> = {};

  // Internal value that mirrors the form control value.
  value: string | number | null = '';
  disabled = false;
  focused = false;
  private generatedId = `sqx-input-${++nextId}`;

  // Form callbacks provided by Angular forms.
  private onChange: (value: string | number | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    // Link this component as the value accessor for form APIs.
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get id(): string {
    // Use provided id when available, otherwise generate one.
    return this.inputId || this.generatedId;
  }

  get control() {
    // Expose the current Angular form control (if any).
    return this.ngControl?.control;
  }

  get showErrors(): boolean {
    // Show errors only when control is interacted with (touched/dirty).
    if (this.suppressErrors) {
      return false;
    }
    const control = this.control;
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  get errors(): string[] {
    // Convert validation errors into displayable messages.
    const control = this.control;
    if (!control?.errors) {
      return [];
    }
    const errors = control.errors;
    return Object.keys(errors).map((key) => this.resolveErrorMessage(key, errors[key]));
  }

  writeValue(value: string | number | null): void {
    // Angular forms writes new values into the component.
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string | number | null) => void): void {
    // Called by Angular forms to receive value updates.
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    // Called by Angular forms to receive touch events.
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Angular forms toggles disabled state here.
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    // Push user input changes back to the form control.
    const target = event.target as HTMLInputElement;
    const value = this.type === 'number' ? target.valueAsNumber : target.value;
    this.value = Number.isNaN(value) ? '' : value;
    this.onChange(this.value);
  }

  onBlur(): void {
    // Mark as touched when the field loses focus.
    this.focused = false;
    this.onTouched();
  }

  onFocus(): void {
    // Track focus for styling and UX hints.
    this.focused = true;
  }

  private resolveErrorMessage(key: string, details: any): string {
    // Map validation keys to friendly messages (overrideable).
    if (this.errorMessages[key]) {
      return this.errorMessages[key];
    }
    switch (key) {
      case 'required':
        return 'This field is required.';
      case 'email':
        return 'Enter a valid email address.';
      case 'minlength':
        return `Minimum length is ${details?.requiredLength ?? ''}.`;
      case 'maxlength':
        return `Maximum length is ${details?.requiredLength ?? ''}.`;
      case 'min':
        return `Minimum value is ${details?.min ?? ''}.`;
      case 'max':
        return `Maximum value is ${details?.max ?? ''}.`;
      case 'pattern':
        return 'Value does not match the expected format.';
      default:
        return 'Invalid value.';
    }
  }
}
