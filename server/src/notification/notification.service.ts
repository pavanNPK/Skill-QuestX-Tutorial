import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notification, NotificationDocument, NotificationType } from './schemas/notification.schema';
import { PushService } from './push.service';

export interface CreateNotificationDto {
  userId: string;
  title: string;
  message?: string;
  type: NotificationType;
  link?: string | null;
  metadata?: Record<string, unknown> | null;
}

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
    private pushService: PushService,
  ) {}

  async create(dto: CreateNotificationDto): Promise<NotificationDocument> {
    const doc = await this.notificationModel.create({
      userId: new Types.ObjectId(dto.userId),
      title: dto.title,
      message: dto.message ?? '',
      type: dto.type,
      link: dto.link ?? null,
      metadata: dto.metadata ?? null,
    });
    this.pushService.sendToUser(dto.userId, {
      title: dto.title,
      body: dto.message ?? undefined,
      link: dto.link ?? undefined,
      type: dto.type,
    }).catch(() => {});
    return doc;
  }

  /** Create notifications for multiple users (e.g. all students in batches). */
  async createForUsers(
    userIds: string[],
    title: string,
    type: NotificationType,
    options: { message?: string; link?: string; metadata?: Record<string, unknown> } = {},
  ): Promise<void> {
    if (!userIds.length) return;
    const docs = userIds.map((userId) => ({
      userId: new Types.ObjectId(userId),
      title,
      message: options.message ?? '',
      type,
      link: options.link ?? null,
      metadata: options.metadata ?? null,
    }));
    await this.notificationModel.insertMany(docs);
    this.pushService.sendToUsers(userIds, {
      title,
      body: options.message,
      link: options.link,
      type,
    }).catch(() => {});
  }

  async findByUserId(userId: string, limit = 50): Promise<NotificationDocument[]> {
    const list = await this.notificationModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()
      .exec();
    return list as unknown as NotificationDocument[];
  }

  async countUnreadByUserId(userId: string): Promise<number> {
    return this.notificationModel
      .countDocuments({ userId: new Types.ObjectId(userId), read: false })
      .exec();
  }

  async markAsRead(notificationId: string, userId: string): Promise<boolean> {
    const result = await this.notificationModel
      .updateOne(
        { _id: new Types.ObjectId(notificationId), userId: new Types.ObjectId(userId) },
        { $set: { read: true } },
      )
      .exec();
    return result.modifiedCount > 0;
  }

  async markAllAsRead(userId: string): Promise<number> {
    const result = await this.notificationModel
      .updateMany({ userId: new Types.ObjectId(userId), read: false }, { $set: { read: true } })
      .exec();
    return result.modifiedCount;
  }
}
