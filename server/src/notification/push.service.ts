import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as webpush from 'web-push';
import { PushSubscription as PushSubscriptionModel, PushSubscriptionDocument } from './schemas/push-subscription.schema';

export interface PushPayload {
  title: string;
  body?: string;
  link?: string;
  type?: string;
}

@Injectable()
export class PushService {
  private vapidPublicKey: string | null = null;
  private vapidPrivateKey: string | null = null;
  private initialized = false;

  constructor(
    private configService: ConfigService,
    @InjectModel(PushSubscriptionModel.name)
    private subscriptionModel: Model<PushSubscriptionDocument>,
  ) {
    this.vapidPublicKey = this.configService.get<string>('VAPID_PUBLIC_KEY') ?? null;
    this.vapidPrivateKey = this.configService.get<string>('VAPID_PRIVATE_KEY') ?? null;
    if (this.vapidPublicKey && this.vapidPrivateKey) {
      webpush.setVapidDetails(
        'mailto:support@skillquestx.example.com',
        this.vapidPublicKey,
        this.vapidPrivateKey,
      );
      this.initialized = true;
    }
  }

  isEnabled(): boolean {
    return this.initialized;
  }

  getVapidPublicKey(): string | null {
    return this.vapidPublicKey;
  }

  async saveSubscription(
    userId: string,
    subscription: { endpoint: string; keys: { p256dh: string; auth: string } },
  ): Promise<void> {
    await this.subscriptionModel.findOneAndUpdate(
      { endpoint: subscription.endpoint },
      {
        userId: new Types.ObjectId(userId),
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
      { upsert: true, new: true },
    );
  }

  async sendToUser(userId: string, payload: PushPayload): Promise<void> {
    if (!this.initialized) return;
    const subs = await this.subscriptionModel.find({ userId: new Types.ObjectId(userId) }).lean().exec();
    const body = JSON.stringify({
      title: payload.title,
      body: payload.body ?? '',
      link: payload.link ?? '/',
      type: payload.type ?? '',
    });
    for (const sub of subs) {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          body,
        );
      } catch (err: any) {
        if (err?.statusCode === 410 || err?.statusCode === 404) {
          await this.subscriptionModel.deleteOne({ _id: sub._id }).exec();
        }
      }
    }
  }

  async sendToUsers(userIds: string[], payload: PushPayload): Promise<void> {
    if (!this.initialized || !userIds.length) return;
    const objectIds = userIds.map((id) => new Types.ObjectId(id));
    const subs = await this.subscriptionModel.find({ userId: { $in: objectIds } }).lean().exec();
    const body = JSON.stringify({
      title: payload.title,
      body: payload.body ?? '',
      link: payload.link ?? '/',
      type: payload.type ?? '',
    });
    for (const sub of subs) {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          body,
        );
      } catch (err: any) {
        if (err?.statusCode === 410 || err?.statusCode === 404) {
          await this.subscriptionModel.deleteOne({ _id: sub._id }).exec();
        }
      }
    }
  }
}
