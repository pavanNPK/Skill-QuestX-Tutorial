// use of this file is:
// Shared component file. It provides reusable UI or base behavior across features.
import { Directive, OnDestroy } from '@angular/core';
import { MonoTypeOperatorFunction, Subject, takeUntil } from 'rxjs';

// use of this is:
// Every component that makes manual Observable subscriptions can extend BaseComponent.
// It gives one shared destroy signal so API calls, router events, and timers stop when the component is removed.
@Directive()
export abstract class BaseComponent implements OnDestroy {
  // use of this is:
  // Emits once during ngOnDestroy and completes, which tells takeUntil() to unsubscribe active streams.
  protected readonly destroy$ = new Subject<void>();

  // use of this is:
  // Helper keeps component code short: observable.pipe(this.untilDestroyed()).
  protected untilDestroyed<T>(): MonoTypeOperatorFunction<T> {
    return takeUntil(this.destroy$);
  }

  // use of this is:
  // Angular calls this automatically when the component is destroyed.
  // Child components that override ngOnDestroy must call super.ngOnDestroy().
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
