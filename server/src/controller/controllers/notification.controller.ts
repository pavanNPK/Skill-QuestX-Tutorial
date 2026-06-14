/** Controller file: translates Fastify requests into service method calls and returns API DTOs. */
import type { FastifyRequest } from 'fastify';

import { services } from '../../business/services';
import type { AuthenticatedRequest } from '../../core/types/fastify-auth';
import { appCache } from '../../core/cache/app-cache';

interface NotificationListResponse {
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    type: string;
    link: string | null;
    metadata: Record<string, unknown> | null;
    read: boolean;
    createdAt: Date | undefined;
  }>;
  unreadCount: number;
}

export class NotificationController {
  // use of this is:
  // Returns the public VAPID key needed by the browser Push API.
  async getVapidPublicKey() {
    // Public key is safe to expose; private key stays in environment variables.
    return { publicKey: services.pushService.getVapidPublicKey() };
  }

  // use of this is:
  // Stores a browser push subscription for the logged-in user.
  async saveSubscription(request: FastifyRequest) {
    // The body schema checks the structure, and this guard keeps the method defensive.
    const body = request.body as { endpoint?: string; keys?: { p256dh?: string; auth?: string } };
    // If required push fields are missing, do not save a broken subscription.
    if (!body?.endpoint || !body?.keys?.p256dh || !body?.keys?.auth) return { saved: false };
    // request.user.id links the subscription to one user for targeted notifications.
    await services.pushService.saveSubscription((request as AuthenticatedRequest).user.id, {
      endpoint: body.endpoint,
      keys: { p256dh: body.keys.p256dh, auth: body.keys.auth },
    });
    return { saved: true };
  }

  // use of this is:
  // Lists notifications and unread count for the current user's notification menu.
  async list(request: FastifyRequest) {
    // Auth middleware attaches the user id after validating the JWT.
    const userId = (request as AuthenticatedRequest).user.id;
    const cacheKey = `notifications:list:${userId}`;
    const cached = await appCache.get<NotificationListResponse>(cacheKey);
    if (cached) return cached;
    // Fetch list and count in parallel because the UI needs both notification rows and badge count.
    const [list, unreadCount] = await Promise.all([
      services.notificationService.findByUserId(userId, 20),
      services.notificationService.countUnreadByUserId(userId),
    ]);
    // Map Mongo documents to stable JSON so clients do not depend on Mongoose internals.
    const response: NotificationListResponse = {
      notifications: list.map((n: any) => ({
        id: n._id.toString(),
        title: n.title,
        message: n.message ?? '',
        type: n.type,
        link: n.link ?? null,
        metadata: n.metadata ?? null,
        read: n.read === true,
        createdAt: n.createdAt,
      })),
      unreadCount,
    };
    return appCache.set(cacheKey, response, 10000);
  }

  // use of this is:
  // Marks every notification for the logged-in user as read.
  async markAllAsRead(request: FastifyRequest) {
    // Service scopes the update by user id, so another user's notifications cannot be changed.
    const userId = (request as AuthenticatedRequest).user.id;
    const result = { marked: await services.notificationService.markAllAsRead(userId) };
    await appCache.delete(`notifications:list:${userId}`);
    return result;
  }

  // use of this is:
  // Marks one notification as read after checking ownership through user id.
  async markAsRead(request: FastifyRequest) {
    // params.id comes from /:id/read and is validated by idParamsSchema.
    const params = request.params as { id: string };
    const userId = (request as AuthenticatedRequest).user.id;
    const result = { updated: await services.notificationService.markAsRead(params.id, userId) };
    await appCache.delete(`notifications:list:${userId}`);
    return result;
  }
}

export const notificationController = new NotificationController();
