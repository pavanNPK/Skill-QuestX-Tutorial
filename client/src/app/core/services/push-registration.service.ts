// use of this file is:
// Core service file. It provides app-wide API/state helpers shared by multiple features.
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Injectable({ providedIn: 'root' })
export class PushRegistrationService {
  private http = inject(HttpClient);
  private snackbar = inject(SnackbarService);
  private readonly apiUrl = environment.apiUrl;

  /** Register SW, request permission, subscribe, and send subscription to backend. Call when user is logged in. */
  async register(): Promise<void> {
    // use of this is:
    // Registers service worker, requests permission, subscribes browser, and saves subscription.
    if (!this.supported()) return;
    // Do not prompt or run push setup during every refresh. Preferences can ask for permission explicitly.
    if (Notification.permission !== 'granted') return;
    try {
      const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      const key = await this.getVapidPublicKey();
      if (!key) return;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(key) as BufferSource,
      });
      await this.sendSubscriptionToBackend(sub.toJSON());
      this.snackbar.success("You'll receive notifications for updates.");
    } catch (_) {
      // e.g. permission denied, SW register failed, no VAPID
    }
  }

  private supported(): boolean {
    // use of this is:
    // Checks browser support before touching service worker or Push APIs.
    return typeof navigator !== 'undefined' &&
      'serviceWorker' in navigator &&
      'PushManager' in window &&
      'Notification' in window;
  }

  private async getVapidPublicKey(): Promise<string | null> {
    // use of this is:
    // Reads backend public VAPID key needed by PushManager.subscribe().
    const res = await firstValueFrom(this.http.get<{ publicKey: string | null }>(`${this.apiUrl}/notifications/vapid-public-key`));
    return res?.publicKey ?? null;
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    // use of this is:
    // Converts base64url VAPID key into Uint8Array format required by browser Push API.
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    const output = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) output[i] = rawData.charCodeAt(i);
    return output;
  }

  private async sendSubscriptionToBackend(sub: PushSubscriptionJSON): Promise<void> {
    // use of this is:
    // Sends browser subscription keys to backend so it can deliver push notifications later.
    const p256dh = sub.keys?.['p256dh'];
    const auth = sub.keys?.['auth'];
    if (!sub.endpoint || !p256dh || !auth) return;
    await firstValueFrom(this.http.post<{ saved: boolean }>(`${this.apiUrl}/notifications/subscription`, {
      endpoint: sub.endpoint,
      keys: { p256dh: p256dh, auth },
    }));
  }
}
