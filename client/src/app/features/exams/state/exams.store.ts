// use of this file is:
// Feature SignalStore file. It stores feature state, async status, cache, and computed values.
import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

// use of this is:
// Exams state separates loading exam data from submitting answers so screens can disable the correct actions.
interface ExamsState {
  selectedExamId: string | null;
  loading: boolean;
  submitting: boolean;
  error: string;
}

// use of this is:
// Initial values keep exam pages idle until a list/detail/submit flow starts.
const initialState: ExamsState = {
  selectedExamId: null,
  loading: false,
  submitting: false,
  error: '',
};

export const ExamsStore = signalStore(
  { providedIn: 'root' },
  withState<ExamsState>(initialState),
  withComputed((store) => ({
    // use of this is:
    // One computed flag for any exam screen that should disable actions during async work.
    busy: computed(() => store.loading() || store.submitting()),
  })),
  withMethods((store) => ({
    // use of this is:
    // Stores the active exam id for list/detail/assessment screens.
    selectExam(examId: string | null): void {
      patchState(store, { selectedExamId: examId });
    },

    // use of this is:
    // Updates exam loading state from future exam API store methods.
    setLoading(loading: boolean): void {
      patchState(store, { loading });
    },

    // use of this is:
    // Updates submission state for assessment save/submit flows.
    setSubmitting(submitting: boolean): void {
      patchState(store, { submitting });
    },

    // use of this is:
    // Stores the latest feature-level error message.
    setError(error: string): void {
      patchState(store, { error });
    },
  })),
);
