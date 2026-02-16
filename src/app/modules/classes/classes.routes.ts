import { Routes } from '@angular/router';
import { Classes } from './classes/classes';

export const classesRoutes: Routes = [
    {
        path: '',
        component: Classes,
        children: [
            { path: '', redirectTo: 'recorded', pathMatch: 'full' },
            {
                path: 'recorded',
                loadComponent: () =>
                    import('./recorded-classes/recorded-classes').then((m) => m.RecordedClasses)
            },
            {
                path: 'live',
                loadComponent: () =>
                    import('./live-stream/live-stream').then((m) => m.LiveStream)
            }
        ]
    }
];
