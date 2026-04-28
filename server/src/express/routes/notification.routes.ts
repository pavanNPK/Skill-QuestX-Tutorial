import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../middleware/async-handler';
import { services } from '../services';
import type { AuthRequest } from '../types/request';

export function notificationRoutes(): Router {
  const router = Router();

  router.get('/vapid-public-key', (_req, res) => {
    res.json({ publicKey: services.pushService.getVapidPublicKey() });
  });

  router.post('/subscription', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    const body = req.body as { endpoint?: string; keys?: { p256dh?: string; auth?: string } };
    if (!body?.endpoint || !body?.keys?.p256dh || !body?.keys?.auth) {
      res.json({ saved: false });
      return;
    }
    await services.pushService.saveSubscription(req.user!.id, {
      endpoint: body.endpoint,
      keys: { p256dh: body.keys.p256dh, auth: body.keys.auth },
    });
    res.json({ saved: true });
  }));

  router.get('/', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    const list = await services.notificationService.findByUserId(req.user!.id);
    const unreadCount = await services.notificationService.countUnreadByUserId(req.user!.id);
    res.json({
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
    });
  }));

  router.patch('/read-all', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    res.json({ marked: await services.notificationService.markAllAsRead(req.user!.id) });
  }));

  router.patch('/:id/read', authenticate, asyncHandler(async (req: AuthRequest, res) => {
    res.json({ updated: await services.notificationService.markAsRead(String(req.params.id), req.user!.id) });
  }));

  return router;
}
