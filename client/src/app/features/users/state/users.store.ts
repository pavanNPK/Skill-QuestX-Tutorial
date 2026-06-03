// use of this file is:
// Feature SignalStore file. It stores feature state, async status, cache, and computed values.
import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

// use of this is:
// Users state keeps admin user-management selection and async flags in one predictable place.
interface UsersState {
  selectedUserId: string | null;
  loading: boolean;
  saving: boolean;
  error: string;
}

// use of this is:
// Initial values keep the user-management page empty and idle until data is loaded.
const initialState: UsersState = {
  selectedUserId: null,
  loading: false,
  saving: false,
  error: '',
};

export const UsersStore = signalStore(
  { providedIn: 'root' },
  withState<UsersState>(initialState),
  withComputed((store) => ({
    // use of this is:
    // User-management screens can use one flag for loaders and disabled buttons.
    busy: computed(() => store.loading() || store.saving()),
  })),
  withMethods((store) => ({
    // use of this is:
    // Keeps selected admin/user-management row in feature state.
    selectUser(userId: string | null): void {
      patchState(store, { selectedUserId: userId });
    },

    // use of this is:
    // Updates user list/detail loading state.
    setLoading(loading: boolean): void {
      patchState(store, { loading });
    },

    // use of this is:
    // Updates create/update/delete operation state.
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
