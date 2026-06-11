// use of this file is:
// Route file. It declares Angular routes and lazy-loads feature pages.
import { Routes } from '@angular/router';

export const materialsRoutes: Routes = [
    {
        path: 'upload',
        loadComponent: () => import('./pages/upload/materials-upload-page.component').then((m) => m.MaterialsUploadPageComponent)
    },
    {
        path: '',
        loadComponent: () => import('./pages/materials/materials').then((m) => m.Materials)
    }
];
