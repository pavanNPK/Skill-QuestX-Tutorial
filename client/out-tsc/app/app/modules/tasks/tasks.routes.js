export const tasksRoutes = [
    {
        path: '',
        loadComponent: () => import('./tasks/tasks').then((m) => m.Tasks)
    }
];
