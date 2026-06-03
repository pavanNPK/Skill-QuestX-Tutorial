// use of this file is:
// Feature SignalStore file. It stores feature state, async status, cache, and computed values.
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';

import {
  AvailableCourseContent,
  CourseContent,
  CourseContentService,
} from '../../../core/services/course-content.service';

// use of this is:
// Materials state keeps course list, loaded course content cache, active lesson selection, and async flags together.
interface MaterialsState {
  courses: AvailableCourseContent[];
  contentByCourseId: Record<string, CourseContent>;
  selectedCourseId: string | null;
  selectedModuleId: string | null;
  currentLessonIndex: number;
  loadingCourses: boolean;
  loadingContent: boolean;
  saving: boolean;
  error: string;
  loadedCourses: boolean;
}

// use of this is:
// Initial values make the page render instantly, then API results fill the store without local component duplicates.
const initialState: MaterialsState = {
  courses: [],
  contentByCourseId: {},
  selectedCourseId: null,
  selectedModuleId: null,
  currentLessonIndex: 0,
  loadingCourses: false,
  loadingContent: false,
  saving: false,
  error: '',
  loadedCourses: false,
};

export const MaterialsStore = signalStore(
  { providedIn: 'root' },
  withState<MaterialsState>(initialState),
  withComputed((store) => ({
    // use of this is:
    // Components read one stable list signal instead of storing duplicate course arrays locally.
    visibleCourses: computed(() => store.courses()),

    // use of this is:
    // Finds the selected course object from the selected id.
    selectedCourse: computed(() => store.courses().find((course) => course.id === store.selectedCourseId()) ?? null),

    // use of this is:
    // Returns cached content for the selected course when it has already been loaded.
    selectedContent: computed(() => {
      const courseId = store.selectedCourseId();
      return courseId ? store.contentByCourseId()[courseId] ?? null : null;
    }),

    // use of this is:
    // Single loading flag for templates that should show a loader during list or detail API calls.
    loading: computed(() => store.loadingCourses() || store.loadingContent()),
  })),
  withMethods((store, contentService = inject(CourseContentService)) => ({
    // use of this is:
    // Loads available material courses once and reuses them on future visits unless force is true.
    async loadAvailableCourses(force = false): Promise<AvailableCourseContent[]> {
      if (store.loadedCourses() && !force) return store.courses();

      patchState(store, { loadingCourses: true, error: '' });
      try {
        const courses = await firstValueFrom(contentService.getAvailableCourses());
        const safeCourses = Array.isArray(courses) ? courses : [];
        patchState(store, {
          courses: safeCourses,
          loadingCourses: false,
          loadedCourses: true,
          error: safeCourses.length ? '' : 'No materials are available yet.',
        });
        return safeCourses;
      } catch (error) {
        patchState(store, {
          loadingCourses: false,
          error: 'Could not load materials.',
        });
        throw error;
      }
    },

    // use of this is:
    // Selects a course and loads content only once per course id, making back/forward navigation fast.
    async selectCourse(courseId: string, force = false): Promise<CourseContent> {
      patchState(store, { selectedCourseId: courseId, selectedModuleId: null, currentLessonIndex: 0, error: '' });

      const cached = store.contentByCourseId()[courseId];
      if (cached && !force) return cached;

      patchState(store, { loadingContent: true });
      try {
        const content = await firstValueFrom(contentService.getContent(courseId));
        patchState(store, {
          contentByCourseId: {
            ...store.contentByCourseId(),
            [courseId]: content,
          },
          loadingContent: false,
        });
        return content;
      } catch (error) {
        patchState(store, {
          loadingContent: false,
          error: 'Content is not published or you are not enrolled in this course.',
        });
        throw error;
      }
    },

    // use of this is:
    // Updates cached content after save/import/publish so the next view does not refetch stale data.
    setCourseContent(content: CourseContent): void {
      patchState(store, {
        contentByCourseId: {
          ...store.contentByCourseId(),
          [content.courseId]: content,
        },
      });
    },

    // use of this is:
    // Clears selected course/detail view while keeping loaded course/content cache for fast return.
    clearSelection(): void {
      patchState(store, {
        selectedCourseId: null,
        selectedModuleId: null,
        currentLessonIndex: 0,
        error: '',
      });
    },

    // use of this is:
    // Forces the course list and detail cache to reload after major changes.
    resetCache(): void {
      patchState(store, initialState);
    },
  })),
);
