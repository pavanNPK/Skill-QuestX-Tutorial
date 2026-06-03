import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

interface TasksState {
  selectedTaskId: string | null;
  loading: boolean;
  saving: boolean;
  error: string;
}

const initialState: TasksState = {
  selectedTaskId: null,
  loading: false,
  saving: false,
  error: '',
};

export const TasksStore = signalStore(
  { providedIn: 'root' },
  withState<TasksState>(initialState),
  withComputed((store) => ({
    // use of this is:
    // Combines task list loading and task save state for quick button/loader checks.
    busy: computed(() => store.loading() || store.saving()),
  })),
  withMethods((store) => ({
    // use of this is:
    // Keeps active task state in the Tasks feature store.
    selectTask(taskId: string | null): void {
      patchState(store, { selectedTaskId: taskId });
    },

    // use of this is:
    // Updates list/detail loading state.
    setLoading(loading: boolean): void {
      patchState(store, { loading });
    },

    // use of this is:
    // Updates create/submit/save state.
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
