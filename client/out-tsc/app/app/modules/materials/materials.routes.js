export const materialsRoutes = [
    {
        path: '',
        loadComponent: () => import('./materials/materials').then((m) => m.Materials)
    }
];
