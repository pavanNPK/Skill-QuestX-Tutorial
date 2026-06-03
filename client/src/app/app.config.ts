import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideRouter } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { loaderInterceptor } from './core/interceptors/loader.interceptor';
import { dedupeInterceptor } from './core/interceptors/dedupe.interceptor';
import { AuthService } from './core/services/auth.service';
import { PushRegistrationService } from './core/services/push-registration.service';

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
    provideAnimationsAsync(),
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
