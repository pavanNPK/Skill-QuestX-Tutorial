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
      }
    ]
  }
];
