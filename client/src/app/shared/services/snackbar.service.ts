// use of this file is:
// Shared service file. It provides reusable cross-feature behavior.
import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private readonly messages = inject(MessageService);

  // use of this is:
  // Shows successful action feedback.
  success(message: string): void {
    this.open(message, 'success');
  }

  // use of this is:
  // Shows error feedback for failed actions/API calls.
  error(message: string): void {
    this.open(message, 'error');
  }

  // use of this is:
  // Shows neutral informational feedback.
  info(message: string): void {
    this.open(message, 'info');
  }

  // use of this is:
  // Shows warning feedback when the action can continue but needs attention.
  warn(message: string): void {
    this.open(message, 'warn');
  }

  // use of this is:
  // Shows secondary neutral feedback for low-priority UI events.
  secondary(message: string): void {
    this.open(message, 'secondary');
  }

  // use of this is:
  // Shows high-contrast feedback for important system notices.
  contrast(message: string): void {
    this.open(message, 'contrast');
  }

  // use of this is:
  // Centralizes PrimeNG toast severity, summary, and duration.
  private open(message: string, panelClass: 'success' | 'error' | 'info' | 'warn' | 'secondary' | 'contrast'): void {
    const summaryMap: Record<typeof panelClass, string> = {
      success: 'Success',
      error: 'Error',
      info: 'Info',
      warn: 'Warn',
      secondary: 'Secondary',
      contrast: 'Contrast',
    };

    this.messages.add({
      severity: panelClass,
      summary: summaryMap[panelClass],
      detail: message,
      life: 5000,
    });
  }
}
