import { Types } from 'mongoose';
import webpush = require('web-push');
import { env } from '../config/env';
import { PushSubscriptionModel } from '../models/push-subscription.model';

export interface PushPayload {
  title: string;
  body?: string;
  link?: string;
  type?: string;
}

export class PushService {
  private initialized = false;

  constructor() {
    if (env.vapidPublicKey && env.vapidPrivateKey) {
      webpush.setVapidDetails('mailto:support@skillquestx.example.com', env.vapidPublicKey, env.vapidPrivateKey);
      this.initialized = true;
    }
  }

  getVapidPublicKey(): string | null {
    return env.vapidPublicKey;
  }

  async saveSubscription(userId: string, subscription: { endpoint: string; keys: { p256dh: string; auth: string } }): Promise<void> {
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

  async sendToUser(userId: string, payload: PushPayload): Promise<void> {
    if (!this.initialized) return;
    const subs = await PushSubscriptionModel.find({ userId: new Types.ObjectId(userId) }).lean().exec();
    await this.send(subs as any[], payload);
  }

  async sendToUsers(userIds: string[], payload: PushPayload): Promise<void> {
    if (!this.initialized || !userIds.length) return;
    const subs = await PushSubscriptionModel.find({ userId: { $in: userIds.map((id) => new Types.ObjectId(id)) } }).lean().exec();
    await this.send(subs as any[], payload);
  }

  private async send(subs: any[], payload: PushPayload): Promise<void> {
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
        if (err?.statusCode === 410 || err?.statusCode === 404) {
          await PushSubscriptionModel.deleteOne({ _id: sub._id }).exec();
        }
      }
    }
  }
}
