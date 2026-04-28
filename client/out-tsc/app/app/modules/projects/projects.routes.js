export const projectsRoutes = [
    {
        path: '',
        loadComponent: () => import('./projects/projects').then((m) => m.Projects)
    }
];
