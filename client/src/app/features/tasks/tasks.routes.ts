import { Routes } from '@angular/router';

export const tasksRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/tasks/tasks').then((m) => m.Tasks)
    }
];
