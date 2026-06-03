// use of this file is:
// Route file. It declares Angular routes and lazy-loads feature pages.
import { Routes } from '@angular/router';

export const syllabusRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/syllabus/syllabus').then((m) => m.Syllabus)
    }
];
