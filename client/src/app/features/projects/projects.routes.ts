// use of this file is:
// Route file. It declares Angular routes and lazy-loads feature pages.
import { Routes } from '@angular/router';

export const projectsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/projects/projects').then((m) => m.Projects)
    }
];
