import { Routes } from '@angular/router';
import { Exams } from './pages/exams/exams';

export const examsRoutes: Routes = [
    {
        path: '',
        component: Exams,
        children: [
            { path: '', redirectTo: 'assessment', pathMatch: 'full' },
            {
                path: 'assessment',
                loadComponent: () =>
                    import('./pages/online-assessment/online-assessment').then((m) => m.OnlineAssessment)
            },
            {
                path: 'docs',
                loadComponent: () => import('./pages/exam-docs/exam-docs').then((m) => m.ExamDocs)
            }
        ]
    }
];
