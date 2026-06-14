// use of this file is:
// Session cache helpers for notification state so refreshes avoid unnecessary API calls.
import type { NotificationsResponse } from '../../../core/services/notification.service';

export interface NotificationsCacheEntry extends NotificationsResponse {
  cachedAt: number;
}

const CACHE_KEY = 'sqx_notifications_cache';
export const NOTIFICATIONS_CACHE_MS = 15000;

export function readNotificationsCache(): NotificationsCacheEntry | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as NotificationsCacheEntry;
    if (!Array.isArray(parsed.notifications) || typeof parsed.unreadCount !== 'number') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeNotificationsCache(response: NotificationsResponse): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ...response, cachedAt: Date.now() }));
  } catch {
    // Storage can fail in private browsing; signal cache still works.
  }
}

export function clearNotificationsCache(): void {
  try {
    sessionStorage.removeItem(CACHE_KEY);
  } catch {
    // Ignore storage failures.
  }
}

