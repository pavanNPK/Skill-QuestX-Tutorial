import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class HeaderService {
    titleSubject = new BehaviorSubject('');
    breadcrumbsSubject = new BehaviorSubject([]);
    title$ = this.titleSubject.asObservable();
    breadcrumbs$ = this.breadcrumbsSubject.asObservable();
    updateTitle(title) {
        this.titleSubject.next(title);
    }
    updateBreadcrumbs(breadcrumbs) {
        this.breadcrumbsSubject.next(breadcrumbs);
    }
    reset() {
        this.titleSubject.next('');
        this.breadcrumbsSubject.next([]);
    }
    hasTitleOverride() {
        return !!this.titleSubject.value;
    }
    hasBreadcrumbOverride() {
        return this.breadcrumbsSubject.value.length > 0;
    }
    static ɵfac = function HeaderService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HeaderService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: HeaderService, factory: HeaderService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HeaderService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
