// use of this file is:
// Route file. It declares Angular routes and lazy-loads feature pages.
import { Routes } from '@angular/router';

export const coursesRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/courses-list/courses-list.component').then(m => m.CoursesListComponent)
    },
    {
        path: 'add',
        loadComponent: () => import('./pages/add-course/add-course.component').then(m => m.AddCourseComponent)
    }
];
