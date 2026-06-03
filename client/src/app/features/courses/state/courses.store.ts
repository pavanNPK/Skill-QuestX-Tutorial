// use of this file is:
// Feature SignalStore file. It stores feature state, async status, cache, and computed values.
import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

// use of this is:
// Courses state owns only feature-level UI state; API entity lists can be added here when course pages need caching.
interface CoursesState {
  selectedCourseId: string | null;
  loading: boolean;
  error: string;
}

// use of this is:
// Initial values mean no course is selected and no async course work is active on first load.
const initialState: CoursesState = {
  selectedCourseId: null,
  loading: false,
  error: '',
};

export const CoursesStore = signalStore(
  { providedIn: 'root' },
  withState<CoursesState>(initialState),
  withComputed((store) => ({
    // use of this is:
    // Components can check whether a course detail is selected without duplicating null checks.
    hasSelection: computed(() => !!store.selectedCourseId()),
  })),
  withMethods((store) => ({
    // use of this is:
    // Keeps selected course state inside the Courses feature instead of route components.
    selectCourse(courseId: string | null): void {
      patchState(store, { selectedCourseId: courseId });
    },

    // use of this is:
    // Shared loading flag for future course API calls.
    setLoading(loading: boolean): void {
      patchState(store, { loading });
    },

    // use of this is:
    // Stores the latest feature-level error message.
    setError(error: string): void {
      patchState(store, { error });
    },
  })),
);
