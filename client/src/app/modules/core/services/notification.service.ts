import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

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
    return this.http.get<NotificationsResponse>(`${this.apiUrl}/notifications`);
  }

  markAsRead(id: string): Observable<{ updated: boolean }> {
    return this.http.patch<{ updated: boolean }>(`${this.apiUrl}/notifications/${id}/read`, {});
  }

  markAllAsRead(): Observable<{ marked: number }> {
    return this.http.patch<{ marked: number }>(`${this.apiUrl}/notifications/read-all`, {});
  }
}
