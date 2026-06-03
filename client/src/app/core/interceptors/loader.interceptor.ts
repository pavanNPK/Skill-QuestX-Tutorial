// use of this file is:
// Core interceptor file. It runs on HTTP requests/responses before feature code receives them.
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

export const loaderInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // use of this is:
  // Show a shared loader while any HTTP request is active.
  const loader = inject(LoaderService);
  loader.show();
  return next(req).pipe(
    // finalize runs for success and error, so the loader always hides.
    finalize(() => loader.hide())
  );
};
