import { Routes } from '@angular/router';

export const syllabusRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./syllabus/syllabus').then((m) => m.Syllabus)
    }
];
