import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PushSubscriptionDocument = PushSubscription & Document;

@Schema({ timestamps: true })
export class PushSubscription {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, unique: true })
  endpoint: string;

  @Prop({ required: true })
  p256dh: string;

  @Prop({ required: true })
  auth: string;
}

export const PushSubscriptionSchema = SchemaFactory.createForClass(PushSubscription);
PushSubscriptionSchema.index({ userId: 1 });
PushSubscriptionSchema.index({ endpoint: 1 }, { unique: true });
