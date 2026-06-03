// use of this file is:
// Core service file. It provides app-wide API/state helpers shared by multiple features.
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
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

  getNotifications(): Observable<NotificationsResponse> {
    // use of this is:
    // Loads notification list and unread count for the header drawer.
    return this.http.get<NotificationsResponse>(`${this.apiUrl}/notifications`);
  }

  markAsRead(id: string): Observable<{ updated: boolean }> {
    // use of this is:
    // Marks a single notification read after user opens/clicks it.
    return this.http.patch<{ updated: boolean }>(`${this.apiUrl}/notifications/${id}/read`, {});
  }

  markAllAsRead(): Observable<{ marked: number }> {
    // use of this is:
    // Marks all current user's notifications as read.
    return this.http.patch<{ marked: number }>(`${this.apiUrl}/notifications/read-all`, {});
  }
}
