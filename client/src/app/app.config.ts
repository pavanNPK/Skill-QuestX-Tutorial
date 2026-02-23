import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideRouter } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';

import { routes } from './app.routes';
import { authInterceptor } from './modules/core/interceptors/auth.interceptor';
import { loaderInterceptor } from './modules/core/interceptors/loader.interceptor';
import { dedupeInterceptor } from './modules/core/interceptors/dedupe.interceptor';
import { AuthService } from './modules/core/services/auth.service';
import { PushRegistrationService } from './modules/core/services/push-registration.service';

function initAuth(auth: AuthService, pushReg: PushRegistrationService): () => Promise<void> {
  return () => {
    if (!auth.getToken()) return Promise.resolve();
    return lastValueFrom(auth.getMe())
      .then(() => { pushReg.register(); })
      .catch(() => {});
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideRouter(routes),
    provideHttpClient(withInterceptors([dedupeInterceptor, authInterceptor, loaderInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [AuthService, PushRegistrationService],
      multi: true,
    },
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
      ripple: true,
    }),
  ],
};
