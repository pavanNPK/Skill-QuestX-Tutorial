import { inject } from '@angular/core';
import { LoaderService } from '../../../shared/services/loader.service';
import { finalize } from 'rxjs/operators';
export const loaderInterceptor = (req, next) => {
    const loader = inject(LoaderService);
    loader.show();
    return next(req).pipe(finalize(() => loader.hide()));
};
