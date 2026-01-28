import { Routes } from '@angular/router';

import { AccessDeniedComponent } from './modules/core/components/access-denied/access-denied.component';
import { LoginComponent } from './modules/core/components/login/login.component';
import { PageNotFoundComponent } from './modules/core/components/page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './modules/core/components/privacy-policy/privacy-policy.component';
import { RegisterComponent } from './modules/core/components/register/register.component';
import { ResetPasswordComponent } from './modules/core/components/reset/reset-password.component';
import { TermsAndConditionsComponent } from './modules/core/components/terms-and-conditions/terms-and-conditions.component';
import { authGuard, authLoadGuard } from './shared/guards/auth.guards';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.routes').then((m) => m.homeRoutes),
    canMatch: [authLoadGuard],
    canActivate: [authGuard]
  },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: '**', component: PageNotFoundComponent }
];
