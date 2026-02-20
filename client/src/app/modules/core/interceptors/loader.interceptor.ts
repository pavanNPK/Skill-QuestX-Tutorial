import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../../../shared/services/loader.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

export const loaderInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const loader = inject(LoaderService);
  loader.show();
  return next(req).pipe(
    finalize(() => loader.hide())
  );
};
