import { Routes } from '@angular/router';

export const materialsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./materials/materials').then((m) => m.Materials)
    }
];
