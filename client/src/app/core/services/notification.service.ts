// use of this file is:
// Core service file. It provides app-wide API/state helpers shared by multiple features.
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize, of, shareReplay, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  link: string | null;
  metadata: Record<string, unknown> | null;
  read: boolean;
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: AppNotification[];
  unreadCount: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private cached?: NotificationsResponse;
  private cachedAt = 0;
  private inFlight$?: Observable<NotificationsResponse>;
  private readonly cacheMs = 15000;

  getNotifications(force = false): Observable<NotificationsResponse> {
    // use of this is:
    // Loads notification list and unread count for the header drawer.
    const now = Date.now();
    if (!force && this.cached && now - this.cachedAt < this.cacheMs) {
      return of(this.cached);
    }
    if (!force && this.inFlight$) return this.inFlight$;

    this.inFlight$ = this.http.get<NotificationsResponse>(`${this.apiUrl}/notifications`).pipe(
      tap((response) => {
        this.cached = response;
        this.cachedAt = Date.now();
      }),
      shareReplay({ bufferSize: 1, refCount: true }),
      finalize(() => { this.inFlight$ = undefined; }),
    );
    return this.inFlight$;
  }

  markAsRead(id: string): Observable<{ updated: boolean }> {
    // use of this is:
    // Marks a single notification read after user opens/clicks it.
    return this.http.patch<{ updated: boolean }>(`${this.apiUrl}/notifications/${id}/read`, {}).pipe(
      tap(() => { this.cached = undefined; }),
    );
  }

  markAllAsRead(): Observable<{ marked: number }> {
    // use of this is:
    // Marks all current user's notifications as read.
    return this.http.patch<{ marked: number }>(`${this.apiUrl}/notifications/read-all`, {}).pipe(
      tap(() => { this.cached = undefined; }),
    );
  }
}
