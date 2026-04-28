export const syllabusRoutes = [
    {
        path: '',
        loadComponent: () => import('./syllabus/syllabus').then((m) => m.Syllabus)
    }
];
