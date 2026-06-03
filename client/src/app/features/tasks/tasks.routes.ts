// use of this file is:
// Route file. It declares Angular routes and lazy-loads feature pages.
import { Routes } from '@angular/router';

export const tasksRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/tasks/tasks').then((m) => m.Tasks)
    }
];
