// use of this file is:
// Angular source file. It connects one part of the frontend application.
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

// use of this is:
// Runs once before Angular finishes startup. If a token exists, it refreshes the user session
// and registers browser push notifications before protected pages load.
function initAuth(auth: AuthService, pushReg: PushRegistrationService): () => Promise<void> {
  return () => {
    // No token means anonymous startup, so skip the /me API call.
    if (!auth.getToken()) return Promise.resolve();
    // getMe refreshes local session state; push registration is best-effort after auth succeeds.
    return lastValueFrom(auth.getMe())
      .then(() => { pushReg.register(); })
      .catch(() => {});
  };
}

// use of this is:
// Root Angular provider configuration. This is the frontend equivalent of backend build-app.ts.
export const appConfig: ApplicationConfig = {
  providers: [
    // Global PrimeNG toast/message service.
    MessageService,
    // Angular router uses app.routes.ts as the single route tree.
    provideRouter(routes),
    // Interceptor order: dedupe duplicate writes, attach auth, then show/hide loader.
    provideHttpClient(withInterceptors([dedupeInterceptor, authInterceptor, loaderInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [AuthService, PushRegistrationService],
      multi: true,
    },
    provideAnimationsAsync(),
    provideBrowserGlobalErrorListeners(),
    // Event coalescing reduces change-detection work during rapid UI events.
    provideZoneChangeDetection({ eventCoalescing: true }),
    // PrimeNG theme registration kept global so components do not configure theme repeatedly.
    providePrimeNG({
      theme: {
        preset: Aura,
      },
      ripple: true,
    }),
  ],
};
