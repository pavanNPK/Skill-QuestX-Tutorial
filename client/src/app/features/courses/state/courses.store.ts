import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

interface CoursesState {
  selectedCourseId: string | null;
  loading: boolean;
  error: string;
}

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
