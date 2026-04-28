import { AddUsersComponent } from './add-users.component';
import { usersPageGuard } from '../../shared/guards/roles.guards';
export const addUsersRoutes = [
    {
        path: '',
        component: AddUsersComponent,
        canActivate: [usersPageGuard],
    },
];
