import { Routes } from '@angular/router';

export const syllabusRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/syllabus/syllabus').then((m) => m.Syllabus)
    }
];
