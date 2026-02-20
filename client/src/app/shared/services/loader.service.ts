import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private count = 0;
  readonly visible = signal(false);

  show(): void {
    this.count++;
    this.visible.set(true);
  }

  hide(): void {
    this.count = Math.max(0, this.count - 1);
    if (this.count === 0) {
      this.visible.set(false);
    }
  }

  forceHide(): void {
    this.count = 0;
    this.visible.set(false);
  }
}
