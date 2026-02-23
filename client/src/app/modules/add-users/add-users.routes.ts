import { Routes } from '@angular/router';
import { AddUsersComponent } from './add-users.component';
import { usersPageGuard } from '../../shared/guards/roles.guards';

export const addUsersRoutes: Routes = [
  {
    path: '',
    component: AddUsersComponent,
    canActivate: [usersPageGuard],
  },
];
