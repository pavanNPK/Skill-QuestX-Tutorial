import { Routes } from '@angular/router';

export const tasksRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./tasks/tasks').then((m) => m.Tasks)
    }
];
