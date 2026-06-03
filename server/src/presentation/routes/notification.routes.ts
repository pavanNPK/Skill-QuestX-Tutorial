/** Route file: declares URL, HTTP method, preHandler auth hooks, DTO schema validation, and controller handler. */
import type { FastifyPluginAsync } from 'fastify';

import { notificationController } from '../../controller/controllers/notification.controller';
import { idParamsSchema } from '../dto/shared.schemas';

export const notificationRoutes: FastifyPluginAsync = async (app) => {
  // use of this route is:
  // Give the browser the public VAPID key needed to create a push subscription.
  // No auth is required because this key is public by design.
  app.get('/vapid-public-key', notificationController.getVapidPublicKey);

  // use of this route is:
  // Save a browser push subscription for the authenticated user.
  // schema strictly validates endpoint and keys before controller persists anything.
  app.post('/subscription', {
    preHandler: [app.authenticate],
    schema: {
      body: {
        type: 'object',
        required: ['endpoint', 'keys'],
        additionalProperties: false,
        properties: {
          endpoint: { type: 'string', minLength: 1, maxLength: 4096 },
          keys: {
            type: 'object',
            required: ['p256dh', 'auth'],
            additionalProperties: false,
            properties: {
              p256dh: { type: 'string', minLength: 1, maxLength: 1024 },
              auth: { type: 'string', minLength: 1, maxLength: 1024 },
            },
          },
        },
      },
    },
    handler: notificationController.saveSubscription,
  });

  // use of this route is:
  // Return the current user's notifications and unread badge count.
  app.get('/', {
    preHandler: [app.authenticate],
    handler: notificationController.list,
  });

  // use of this route is:
  // Mark all notifications for the current user as read.
  app.patch('/read-all', {
    preHandler: [app.authenticate],
    handler: notificationController.markAllAsRead,
  });

  // use of this route is:
  // Mark a single notification read; params schema validates the URL id.
  app.patch('/:id/read', {
    preHandler: [app.authenticate],
    schema: { params: idParamsSchema },
    handler: notificationController.markAsRead,
  });
};
