import { CanActivateChildFn, CanActivateFn, CanMatchFn } from '@angular/router';

export const authGuard: CanActivateFn = () => true;
export const authChildGuard: CanActivateChildFn = () => true;
export const authLoadGuard: CanMatchFn = () => true;
