// use of this file is:
// Route file. It declares Angular routes and lazy-loads feature pages.
import { Routes } from '@angular/router';

export const materialsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/materials/materials').then((m) => m.Materials)
    }
];
