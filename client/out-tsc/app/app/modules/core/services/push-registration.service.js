import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../environments/environment';
import * as i0 from "@angular/core";
export class PushRegistrationService {
    http = inject(HttpClient);
    messageService = inject(MessageService);
    apiUrl = environment.apiUrl;
    /** Register SW, request permission, subscribe, and send subscription to backend. Call when user is logged in. */
    async register() {
        if (!this.supported())
            return;
        try {
            const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
            const key = await this.getVapidPublicKey();
            if (!key)
                return;
            const permission = await Notification.requestPermission();
            if (permission !== 'granted')
                return;
            const sub = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.urlBase64ToUint8Array(key),
            });
            await this.sendSubscriptionToBackend(sub.toJSON());
            this.messageService.add({
                severity: 'success',
                summary: 'Notifications enabled',
                detail: "You'll receive push notifications for tasks and updates.",
            });
        }
        catch (_) {
            // e.g. permission denied, SW register failed, no VAPID
        }
    }
    supported() {
        return typeof navigator !== 'undefined' &&
            'serviceWorker' in navigator &&
            'PushManager' in window &&
            'Notification' in window;
    }
    async getVapidPublicKey() {
        const res = await firstValueFrom(this.http.get(`${this.apiUrl}/notifications/vapid-public-key`));
        return res?.publicKey ?? null;
    }
    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = atob(base64);
        const output = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i)
            output[i] = rawData.charCodeAt(i);
        return output;
    }
    async sendSubscriptionToBackend(sub) {
        const p256dh = sub.keys?.['p256dh'];
        const auth = sub.keys?.['auth'];
        if (!sub.endpoint || !p256dh || !auth)
            return;
        await firstValueFrom(this.http.post(`${this.apiUrl}/notifications/subscription`, {
            endpoint: sub.endpoint,
            keys: { p256dh: p256dh, auth },
        }));
    }
    static ɵfac = function PushRegistrationService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PushRegistrationService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: PushRegistrationService, factory: PushRegistrationService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PushRegistrationService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
