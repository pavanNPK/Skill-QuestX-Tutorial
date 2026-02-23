import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NotificationDocument = Notification & Document;

/** Type of notification for routing/display. */
export type NotificationType =
  | 'instructor_assigned_to_course'
  | 'task_added'
  | 'task_submitted';

@Schema({ timestamps: true })
export class Notification {
  /** User who receives this notification. */
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  message: string;

  @Prop({ type: String, required: true })
  type: NotificationType;

  /** Optional link (e.g. /tasks, /courses). */
  @Prop({ default: null })
  link: string | null;

  /** Optional payload for client (e.g. { taskId, courseName }). */
  @Prop({ type: Object, default: null })
  metadata: Record<string, unknown> | null;

  @Prop({ type: Boolean, default: false })
  read: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
NotificationSchema.index({ userId: 1, createdAt: -1 });
NotificationSchema.index({ userId: 1, read: 1 });
