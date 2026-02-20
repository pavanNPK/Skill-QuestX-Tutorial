import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideRouter } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { routes } from './app.routes';
import { authInterceptor } from './modules/core/interceptors/auth.interceptor';
import { loaderInterceptor } from './modules/core/interceptors/loader.interceptor';
import { AuthService } from './modules/core/services/auth.service';

function initAuth(auth: AuthService): () => Promise<void> {
  return () => {
    if (!auth.getToken()) return Promise.resolve();
    return lastValueFrom(auth.getMe())
      .then(() => {})
      .catch(() => {});
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, loaderInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [AuthService],
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
