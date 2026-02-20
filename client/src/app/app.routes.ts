import { Routes } from '@angular/router';

import { AccessDeniedComponent } from './modules/core/components/access-denied/access-denied.component';
import { LoginComponent } from './modules/core/components/login/login.component';
import { PageNotFoundComponent } from './modules/core/components/page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './modules/core/components/privacy-policy/privacy-policy.component';
import { RegisterComponent } from './modules/core/components/register/register.component';
import { ResetPasswordComponent } from './modules/core/components/reset/reset-password.component';
import { TermsAndConditionsComponent } from './modules/core/components/terms-and-conditions/terms-and-conditions.component';
import { authGuard, authLoadGuard } from './shared/guards/auth.guards';
import { UtilitiesDemoComponent } from './shared/components/utilities-demo/utilities-demo.component';
import { ForgotComponent } from './modules/core/components/forgot/forgot.component';
import { SetPasswordComponent } from './modules/core/components/set-password/set-password.component';
import { HomeComponent } from './modules/home/home.component';

export const routes: Routes = [
  // Auth routes (public)
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'set-password', component: SetPasswordComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'utilities-demo', component: UtilitiesDemoComponent },

  // Protected routes (with auth guard) - at root level
  {
    path: '',
    component: HomeComponent,
    canMatch: [authLoadGuard],
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.routes').then((m) => m.dashboardRoutes)
      },
      {
        path: 'courses',
        loadChildren: () => import('./modules/courses/courses.routes').then((m) => m.coursesRoutes)
      },
      {
        path: 'materials',
        loadChildren: () => import('./modules/materials/materials.routes').then((m) => m.materialsRoutes)
      },
      {
        path: 'classes',
        loadChildren: () => import('./modules/classes/classes.routes').then((m) => m.classesRoutes)
      },
      {
        path: 'tasks',
        loadChildren: () => import('./modules/tasks/tasks.routes').then((m) => m.tasksRoutes)
      },
      {
        path: 'batches',
        loadChildren: () => import('./modules/batches/batches.routes').then((m) => m.batchesRoutes)
      },
      {
        path: 'add-users',
        loadChildren: () => import('./modules/add-users/add-users.routes').then((m) => m.addUsersRoutes)
      },
      {
        path: 'exams',
        loadChildren: () => import('./modules/exams/exams.routes').then((m) => m.examsRoutes)
      },
      {
        path: 'projects',
        loadChildren: () => import('./modules/projects/projects.routes').then((m) => m.projectsRoutes)
      }
    ]
  },

  // Redirect empty path to login when not authenticated (canMatch above failed)
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  // 404
  { path: '**', component: PageNotFoundComponent }
];

