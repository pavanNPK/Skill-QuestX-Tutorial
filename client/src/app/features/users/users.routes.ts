// use of this file is:
// Route file. It declares Angular routes and lazy-loads feature pages.
import { Routes } from '@angular/router';
import { AddUsersComponent } from './pages/add-users.component';
import { usersPageGuard } from '../../shared/guards/roles.guards';

export const addUsersRoutes: Routes = [
  {
    path: '',
    component: AddUsersComponent,
    canActivate: [usersPageGuard],
  },
];
