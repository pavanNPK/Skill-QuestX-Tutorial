import { Routes } from '@angular/router';

export const projectsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/projects/projects').then((m) => m.Projects)
    }
];
