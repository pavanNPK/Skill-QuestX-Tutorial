// use of this file is:
// Shared service file. It provides reusable cross-feature behavior.
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private readonly snackBar = inject(MatSnackBar);

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
  // Centralizes Material snackbar styling, position, and duration.
  private open(message: string, panelClass: 'success' | 'error' | 'info'): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [`sqx-snackbar-${panelClass}`],
    });
  }
}
