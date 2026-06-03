// use of this file is:
// Shared service file. It provides reusable cross-feature behavior.
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private count = 0;
  readonly visible = signal(false);

  // use of this is:
  // Increments active request count and shows global loader.
  show(): void {
    this.count++;
    this.visible.set(true);
  }

  // use of this is:
  // Decrements active request count and hides loader when all requests finish.
  hide(): void {
    this.count = Math.max(0, this.count - 1);
    if (this.count === 0) {
      this.visible.set(false);
    }
  }

  // use of this is:
  // Emergency reset for navigation errors or manual cleanup.
  forceHide(): void {
    this.count = 0;
    this.visible.set(false);
  }
}
