import { Routes } from '@angular/router';

export const coursesRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./courses-list/courses-list.component').then(m => m.CoursesListComponent)
    },
    {
        path: 'add',
        loadComponent: () => import('./add-course/add-course.component').then(m => m.AddCourseComponent)
    }
];
