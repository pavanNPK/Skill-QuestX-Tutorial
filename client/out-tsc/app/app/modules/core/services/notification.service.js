import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as i0 from "@angular/core";
export class NotificationService {
    http = inject(HttpClient);
    apiUrl = environment.apiUrl;
    getNotifications() {
        return this.http.get(`${this.apiUrl}/notifications`);
    }
    markAsRead(id) {
        return this.http.patch(`${this.apiUrl}/notifications/${id}/read`, {});
    }
    markAllAsRead() {
        return this.http.patch(`${this.apiUrl}/notifications/read-all`, {});
    }
    static ɵfac = function NotificationService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NotificationService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: NotificationService, factory: NotificationService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotificationService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
