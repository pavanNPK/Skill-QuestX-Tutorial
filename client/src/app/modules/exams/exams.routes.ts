import { Routes } from '@angular/router';
import { Exams } from './exams/exams';

export const examsRoutes: Routes = [
    {
        path: '',
        component: Exams,
        children: [
            { path: '', redirectTo: 'assessment', pathMatch: 'full' },
            {
                path: 'assessment',
                loadComponent: () =>
                    import('./online-assessment/online-assessment').then((m) => m.OnlineAssessment)
            },
            {
                path: 'docs',
                loadComponent: () => import('./exam-docs/exam-docs').then((m) => m.ExamDocs)
            }
        ]
    }
];
