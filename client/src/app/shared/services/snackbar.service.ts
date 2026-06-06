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
  // Centralizes PrimeNG toast severity, summary, and duration.
  private open(message: string, panelClass: 'success' | 'error' | 'info'): void {
    this.messages.add({
      severity: panelClass,
      summary: panelClass === 'success' ? 'Success' : panelClass === 'error' ? 'Error' : 'Info',
      detail: message,
      life: 5000,
    });
  }
}
