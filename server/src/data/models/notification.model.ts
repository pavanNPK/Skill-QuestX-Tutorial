/** Mongoose model file: defines the MongoDB schema, TypeScript document shape, and exported model for this collection. */
import mongoose = require('mongoose');
import type { Document, Model, Types } from 'mongoose';

export type NotificationType =
  | 'instructor_assigned_to_course'
  | 'task_added'
  | 'task_submitted';

export interface NotificationDocument extends Document {
  // Recipient user id.
  userId: Types.ObjectId;
  title: string;
  message: string;
  type: NotificationType;
  link: string | null;
  metadata: Record<string, unknown> | null;
  read: boolean;
  createdAt?: Date;
}

// use of this is:
// Stores in-app notifications that can also trigger browser push.
const notificationSchema = new mongoose.Schema<NotificationDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    message: { type: String, default: '' },
    type: { type: String, required: true },
    link: { type: String, default: null },
    metadata: { type: Object, default: null },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// use of these indexes is:
// Speed up notification list queries and unread-count queries per user.
notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ userId: 1, read: 1 });

// use of this export is:
// Reuse existing model during hot reload/tests, otherwise create the Notification model.
export const NotificationModel: Model<NotificationDocument> =
  mongoose.models.Notification as Model<NotificationDocument> ||
  mongoose.model<NotificationDocument>('Notification', notificationSchema);
