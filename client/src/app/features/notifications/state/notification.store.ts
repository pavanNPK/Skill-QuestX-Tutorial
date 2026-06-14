// use of this file is:
// Notification Signal Store. All notification API calls and cache decisions live here.
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { NotificationService, type NotificationsResponse } from '../../../core/services/notification.service';
import {
  clearNotificationsCache,
  NOTIFICATIONS_CACHE_MS,
  readNotificationsCache,
  writeNotificationsCache,
} from './notification.cache';
import { notificationsInitialState, type NotificationItem, type NotificationsState } from './notification.state';

function formatTimeAgo(createdAt: string): string {
  const date = new Date(createdAt);
  const now = new Date();
  const sec = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (sec < 60) return 'Just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} minute${min !== 1 ? 's' : ''} ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hour${hr !== 1 ? 's' : ''} ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day} day${day !== 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
}

function toViewItem(notification: NotificationsState['notifications'][number]): NotificationItem {
  return {
    id: notification.id,
    title: notification.title,
    message: notification.message || '',
    time: formatTimeAgo(notification.createdAt),
    read: notification.read,
    link: notification.link ?? null,
  };
}

export const NotificationsStore = signalStore(
  { providedIn: 'root' },
  withState<NotificationsState>(notificationsInitialState),
  withComputed((store) => ({
    visibleNotifications: computed(() => store.notifications().map(toViewItem)),
    hasUnread: computed(() => store.unreadCount() > 0),
    busy: computed(() => store.loading() || store.saving()),
  })),
  withMethods((store, notificationService = inject(NotificationService), auth = inject(AuthService)) => {
    let loadRequest: Promise<NotificationsResponse> | null = null;

    const applyResponse = (response: NotificationsResponse, lastUpdated = Date.now()): void => {
      patchState(store, {
        notifications: response.notifications,
        unreadCount: response.unreadCount,
        loading: false,
        error: '',
        lastUpdated,
      });
    };

    return {
      async load(force = false): Promise<NotificationsResponse | null> {
        if (!auth.isAuthenticated()) return null;

        const now = Date.now();
        if (!force && store.notifications().length && now - store.lastUpdated() < NOTIFICATIONS_CACHE_MS) {
          return { notifications: store.notifications(), unreadCount: store.unreadCount() };
        }

        if (!force) {
          const cached = readNotificationsCache();
          if (cached && now - cached.cachedAt < NOTIFICATIONS_CACHE_MS) {
            applyResponse(cached, cached.cachedAt);
            return { notifications: cached.notifications, unreadCount: cached.unreadCount };
          }
        }

        if (loadRequest && !force) return loadRequest;

        patchState(store, { loading: true, error: '' });
        loadRequest = (async () => {
          try {
            const response = await firstValueFrom(notificationService.getNotifications(force));
            applyResponse(response);
            writeNotificationsCache(response);
            return response;
          } catch (error) {
            patchState(store, { loading: false, error: 'Could not load notifications.' });
            throw error;
          } finally {
            loadRequest = null;
          }
        })();

        return loadRequest;
      },

      async refresh(): Promise<NotificationsResponse | null> {
        return this.load(true);
      },

      async markAsRead(notificationId: string): Promise<void> {
        const notification = store.notifications().find((item) => item.id === notificationId);
        if (!notification || notification.read) return;

        patchState(store, { saving: true, error: '' });
        try {
          await firstValueFrom(notificationService.markAsRead(notificationId));
          const notifications = store.notifications().map((item) =>
            item.id === notificationId ? { ...item, read: true } : item,
          );
          const unreadCount = Math.max(0, store.unreadCount() - 1);
          patchState(store, { notifications, unreadCount, saving: false, lastUpdated: Date.now() });
          writeNotificationsCache({ notifications, unreadCount });
        } catch (error) {
          patchState(store, { saving: false, error: 'Could not update notification.' });
          throw error;
        }
      },

      async markAllAsRead(): Promise<void> {
        if (!store.unreadCount()) return;

        patchState(store, { saving: true, error: '' });
        try {
          await firstValueFrom(notificationService.markAllAsRead());
          const notifications = store.notifications().map((item) => ({ ...item, read: true }));
          patchState(store, { notifications, unreadCount: 0, saving: false, lastUpdated: Date.now() });
          writeNotificationsCache({ notifications, unreadCount: 0 });
        } catch (error) {
          patchState(store, { saving: false, error: 'Could not update notifications.' });
          throw error;
        }
      },

      reset(): void {
        clearNotificationsCache();
        patchState(store, notificationsInitialState);
      },
    };
  }),
);

