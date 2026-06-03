/** Service file: contains business rules and database coordination; controllers call these methods after route validation. */
import { Types } from 'mongoose';
import { NotificationModel, type NotificationDocument, type NotificationType } from '../../data/models/notification.model';
import type { PushService } from './push.service';

export interface CreateNotificationDto {
  userId: string;
  title: string;
  message?: string;
  type: NotificationType;
  link?: string | null;
  metadata?: Record<string, unknown> | null;
}

export class NotificationService {
  // use of this is:
  // PushService is used as a side channel after Mongo notification records are saved.
  constructor(private readonly pushService: PushService) {}

  // use of this is:
  // Creates one notification for one user and tries to send a browser push.
  async create(dto: CreateNotificationDto): Promise<NotificationDocument> {
    // Persist first so the notification still appears in-app even if push delivery fails.
    const doc = await NotificationModel.create({
      userId: new Types.ObjectId(dto.userId),
      title: dto.title,
      message: dto.message ?? '',
      type: dto.type,
      link: dto.link ?? null,
      metadata: dto.metadata ?? null,
    });
    // Push is fire-and-forget because API success should not depend on browser push delivery.
    this.pushService.sendToUser(dto.userId, {
      title: dto.title,
      body: dto.message ?? undefined,
      link: dto.link ?? undefined,
      type: dto.type,
    }).catch(() => {});
    return doc;
  }

  // use of this is:
  // Creates the same notification for many users, usually after task assignment.
  async createForUsers(userIds: string[], title: string, type: NotificationType, options: { message?: string; link?: string; metadata?: Record<string, unknown> } = {}): Promise<void> {
    if (!userIds.length) return;
    // insertMany is faster than one create per user for batch notifications.
    await NotificationModel.insertMany(userIds.map((userId) => ({
      userId: new Types.ObjectId(userId),
      title,
      message: options.message ?? '',
      type,
      link: options.link ?? null,
      metadata: options.metadata ?? null,
    })));
    this.pushService.sendToUsers(userIds, { title, body: options.message, link: options.link, type }).catch(() => {});
  }

  // use of this is:
  // Returns latest notifications for the user's notification drawer.
  async findByUserId(userId: string, limit = 50): Promise<NotificationDocument[]> {
    const list = await NotificationModel.find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()
      .exec();
    return list as unknown as NotificationDocument[];
  }

  // use of this is:
  // Counts unread notifications for the UI badge.
  async countUnreadByUserId(userId: string): Promise<number> {
    return NotificationModel.countDocuments({ userId: new Types.ObjectId(userId), read: false }).exec();
  }

  // use of this is:
  // Marks one notification read only when it belongs to the current user.
  async markAsRead(notificationId: string, userId: string): Promise<boolean> {
    const result = await NotificationModel.updateOne(
      { _id: new Types.ObjectId(notificationId), userId: new Types.ObjectId(userId) },
      { $set: { read: true } },
    ).exec();
    return result.modifiedCount > 0;
  }

  // use of this is:
  // Marks every unread notification for one user as read.
  async markAllAsRead(userId: string): Promise<number> {
    const result = await NotificationModel.updateMany(
      { userId: new Types.ObjectId(userId), read: false },
      { $set: { read: true } },
    ).exec();
    return result.modifiedCount;
  }
}
