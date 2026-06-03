/** Service file: contains business rules and database coordination; controllers call these methods after route validation. */
import { Types } from 'mongoose';
import webpush = require('web-push');
import { env } from '../../core/config/env';
import { PushSubscriptionModel } from '../../data/models/push-subscription.model';

export interface PushPayload {
  title: string;
  body?: string;
  link?: string;
  type?: string;
}

export class PushService {
  // initialized remains false when VAPID keys are missing, making push optional in development.
  private initialized = false;

  // use of this is:
  // Configure web-push once when the service is created.
  constructor() {
    if (env.vapidPublicKey && env.vapidPrivateKey) {
      webpush.setVapidDetails('mailto:support@skillquestx.example.com', env.vapidPublicKey, env.vapidPrivateKey);
      this.initialized = true;
    }
  }

  // use of this is:
  // Exposes only the public VAPID key to browsers that need to subscribe.
  getVapidPublicKey(): string | null {
    return env.vapidPublicKey;
  }

  // use of this is:
  // Stores or updates the browser subscription for one user.
  async saveSubscription(userId: string, subscription: { endpoint: string; keys: { p256dh: string; auth: string } }): Promise<void> {
    // endpoint is unique, so upsert lets a browser refresh its keys without duplicate rows.
    await PushSubscriptionModel.findOneAndUpdate(
      { endpoint: subscription.endpoint },
      {
        userId: new Types.ObjectId(userId),
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
      { upsert: true, new: true },
    ).exec();
  }

  // use of this is:
  // Sends a push payload to all subscriptions for one user.
  async sendToUser(userId: string, payload: PushPayload): Promise<void> {
    // If push is not configured, silently skip so notifications still work in-app.
    if (!this.initialized) return;
    const subs = await PushSubscriptionModel.find({ userId: new Types.ObjectId(userId) }).lean().exec();
    await this.send(subs as any[], payload);
  }

  // use of this is:
  // Sends a push payload to subscriptions belonging to many users.
  async sendToUsers(userIds: string[], payload: PushPayload): Promise<void> {
    if (!this.initialized || !userIds.length) return;
    const subs = await PushSubscriptionModel.find({ userId: { $in: userIds.map((id) => new Types.ObjectId(id)) } }).lean().exec();
    await this.send(subs as any[], payload);
  }

  // use of this is:
  // Internal delivery loop that sends payload and removes expired browser subscriptions.
  private async send(subs: any[], payload: PushPayload): Promise<void> {
    // Browser push payload must be a string.
    const body = JSON.stringify({
      title: payload.title,
      body: payload.body ?? '',
      link: payload.link ?? '/',
      type: payload.type ?? '',
    });
    for (const sub of subs) {
      try {
        await webpush.sendNotification({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, body);
      } catch (err: any) {
        // 404/410 means the browser subscription is gone, so delete it to avoid future failed sends.
        if (err?.statusCode === 410 || err?.statusCode === 404) {
          await PushSubscriptionModel.deleteOne({ _id: sub._id }).exec();
        }
      }
    }
  }
}
