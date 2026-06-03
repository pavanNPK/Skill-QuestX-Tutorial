// use of this file is:
// Route file. It declares Angular routes and lazy-loads feature pages.
import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component'

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];
