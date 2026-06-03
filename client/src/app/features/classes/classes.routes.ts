import { Routes } from '@angular/router';
import { Classes } from './pages/classes/classes';

export const classesRoutes: Routes = [
    {
        path: '',
        component: Classes,
        children: [
            { path: '', redirectTo: 'recorded', pathMatch: 'full' },
            {
                path: 'recorded',
                loadComponent: () =>
                    import('./pages/recorded-classes/recorded-classes').then((m) => m.RecordedClasses)
            },
            {
                path: 'recorded/:id',
                loadComponent: () =>
                    import('./pages/chapter-detail/chapter-detail').then((m) => m.ChapterDetail)
            },
            {
                path: 'live',
                loadComponent: () =>
                    import('./pages/live-stream/live-stream').then((m) => m.LiveStream)
            }
        ]
    }
];
