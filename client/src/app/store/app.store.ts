import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

interface AppState {
  initialized: boolean;
  activeRequests: number;
  shellReady: boolean;
}

const initialState: AppState = {
  initialized: true,
  activeRequests: 0,
  shellReady: true,
};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    // use of this is:
    // Root loading signal can drive a global loader without each feature duplicating this logic.
    isBusy: computed(() => store.activeRequests() > 0),
  })),
  withMethods((store) => ({
    // use of this is:
    // Increment before a root-level async task starts.
    beginRequest(): void {
      patchState(store, { activeRequests: store.activeRequests() + 1 });
    },

    // use of this is:
    // Decrement after a root-level async task finishes while protecting against negative counts.
    endRequest(): void {
      patchState(store, { activeRequests: Math.max(0, store.activeRequests() - 1) });
    },

    // use of this is:
    // Allows startup/bootstrap code to mark the application shell as ready.
    setShellReady(shellReady: boolean): void {
      patchState(store, { shellReady });
    },
  })),
);
