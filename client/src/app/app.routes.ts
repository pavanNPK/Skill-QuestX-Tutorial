// use of this file is:
// Route file. It declares Angular routes and lazy-loads feature pages.
import { Routes } from '@angular/router';

import { AccessDeniedComponent } from './core/components/access-denied/access-denied.component';
import { LoginComponent } from './core/components/login/login.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './core/components/privacy-policy/privacy-policy.component';
import { RegisterComponent } from './core/components/register/register.component';
import { ResetPasswordComponent } from './core/components/reset/reset-password.component';
import { TermsAndConditionsComponent } from './core/components/terms-and-conditions/terms-and-conditions.component';
import { authGuard, authLoadGuard } from './shared/guards/auth.guards';
import { UtilitiesDemoComponent } from './shared/components/utilities-demo/utilities-demo.component';
import { ForgotComponent } from './core/components/forgot/forgot.component';
import { SetPasswordComponent } from './core/components/set-password/set-password.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { ChangePasswordComponent } from './core/components/change-password/change-password.component';
import { ProfileSettingsComponent } from './core/components/profile-settings/profile-settings.component';
import { MembershipPlansComponent } from './core/components/membership-plans/membership-plans.component';

export const routes: Routes = [
  // use of this section is:
  // Public routes render without authGuard because users need them before login.
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'set-password', component: SetPasswordComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'utilities-demo', component: UtilitiesDemoComponent },

  // use of this route is:
  // Protected app shell. canMatch blocks lazy loading for anonymous users;
  // canActivate protects the shell after matching.
  {
    path: '',
    component: HomeComponent,
    canMatch: [authLoadGuard],
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        // Dashboard is lazy-loaded so the first app bundle stays smaller.
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.dashboardRoutes)
      },
      {
        // Courses feature owns course list and course-content management entry points.
        path: 'courses',
        loadChildren: () => import('./features/courses/courses.routes').then((m) => m.coursesRoutes)
      },
      {
        // Materials feature uses MaterialsStore cache for fast revisit/loading.
        path: 'materials',
        loadChildren: () => import('./features/materials/materials.routes').then((m) => m.materialsRoutes)
      },
      {
        path: 'classes',
        loadChildren: () => import('./features/classes/classes.routes').then((m) => m.classesRoutes)
      },
      {
        path: 'tasks',
        loadChildren: () => import('./features/tasks/tasks.routes').then((m) => m.tasksRoutes)
      },
      {
        path: 'batches',
        loadChildren: () => import('./features/batches/batches.routes').then((m) => m.batchesRoutes)
      },
      {
        path: 'add-users',
        loadChildren: () => import('./features/users/users.routes').then((m) => m.addUsersRoutes)
      },
      {
        path: 'exams',
        loadChildren: () => import('./features/exams/exams.routes').then((m) => m.examsRoutes)
      },
      {
        path: 'projects',
        loadChildren: () => import('./features/projects/projects.routes').then((m) => m.projectsRoutes)
      },
      { path: 'change-password', component: ChangePasswordComponent, canActivate: [authGuard] },
      { path: 'membership-plans', component: MembershipPlansComponent, canActivate: [authGuard] },
      { path: 'profile-settings', component: ProfileSettingsComponent, canActivate: [authGuard] }
    ]
  },

  // use of this route is:
  // Redirect anonymous empty path visits to login after protected canMatch fails.
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  // use of this route is:
  // Catch every unknown URL and show a stable not-found page.
  { path: '**', component: PageNotFoundComponent }
];
