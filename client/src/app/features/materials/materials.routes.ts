import { Routes } from '@angular/router';

export const materialsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/materials/materials').then((m) => m.Materials)
    }
];
