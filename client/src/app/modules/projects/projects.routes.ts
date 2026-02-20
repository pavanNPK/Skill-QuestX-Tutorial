import { Routes } from '@angular/router';

export const projectsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./projects/projects').then((m) => m.Projects)
    }
];
