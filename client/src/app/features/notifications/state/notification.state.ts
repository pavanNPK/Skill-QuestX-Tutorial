// use of this file is:
// Notification feature state and view models shared by the notification Signal Store.
import type { AppNotification } from '../../../core/services/notification.service';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string | null;
}

export interface NotificationsState {
  notifications: AppNotification[];
  unreadCount: number;
  loading: boolean;
  saving: boolean;
  error: string;
  lastUpdated: number;
}

export const notificationsInitialState: NotificationsState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  saving: false,
  error: '',
  lastUpdated: 0,
};

