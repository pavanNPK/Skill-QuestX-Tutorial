import { Injectable, signal } from '@angular/core';
import * as i0 from "@angular/core";
export class LoaderService {
    count = 0;
    visible = signal(false, ...(ngDevMode ? [{ debugName: "visible" }] : []));
    show() {
        this.count++;
        this.visible.set(true);
    }
    hide() {
        this.count = Math.max(0, this.count - 1);
        if (this.count === 0) {
            this.visible.set(false);
        }
    }
    forceHide() {
        this.count = 0;
        this.visible.set(false);
    }
    static ɵfac = function LoaderService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoaderService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LoaderService, factory: LoaderService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoaderService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
