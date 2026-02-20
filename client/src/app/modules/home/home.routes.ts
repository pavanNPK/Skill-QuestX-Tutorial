import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { authChildGuard, authGuard } from '../../shared/guards/auth.guards';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    canActivateChild: [authChildGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.routes').then((m) => m.dashboardRoutes)
      },
      {
        path: 'syllabus',
        loadChildren: () => import('../syllabus/syllabus.routes').then((m) => m.syllabusRoutes)
      },
      {
        path: 'materials',
        loadChildren: () => import('../materials/materials.routes').then((m) => m.materialsRoutes)
      },
      {
        path: 'classes',
        loadChildren: () => import('../classes/classes.routes').then((m) => m.classesRoutes)
      },
      {
        path: 'tasks',
        loadChildren: () => import('../tasks/tasks.routes').then((m) => m.tasksRoutes)
      },
      {
        path: 'exams',
        loadChildren: () => import('../exams/exams.routes').then((m) => m.examsRoutes)
      },
      {
        path: 'projects',
        loadChildren: () => import('../projects/projects.routes').then((m) => m.projectsRoutes)
      }
    ]
  }
];
