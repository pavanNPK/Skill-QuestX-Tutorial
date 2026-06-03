// use of this file is:
// Feature SignalStore file. It stores feature state, async status, cache, and computed values.
import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

// use of this is:
// Batches state owns active batch selection plus read/write flags for batch screens.
interface BatchesState {
  selectedBatchId: string | null;
  loading: boolean;
  saving: boolean;
  error: string;
}

// use of this is:
// Initial values keep batch pages idle before the first load or save operation.
const initialState: BatchesState = {
  selectedBatchId: null,
  loading: false,
  saving: false,
  error: '',
};

export const BatchesStore = signalStore(
  { providedIn: 'root' },
  withState<BatchesState>(initialState),
  withComputed((store) => ({
    // use of this is:
    // Batch screens can react to any active list/detail/save operation.
    busy: computed(() => store.loading() || store.saving()),
  })),
  withMethods((store) => ({
    // use of this is:
    // Keeps selected batch id in the Batches feature store.
    selectBatch(batchId: string | null): void {
      patchState(store, { selectedBatchId: batchId });
    },

    // use of this is:
    // Updates batch list/detail loading state.
    setLoading(loading: boolean): void {
      patchState(store, { loading });
    },

    // use of this is:
    // Updates batch create/update operation state.
    setSaving(saving: boolean): void {
      patchState(store, { saving });
    },

    // use of this is:
    // Stores the latest feature-level error message.
    setError(error: string): void {
      patchState(store, { error });
    },
  })),
);
