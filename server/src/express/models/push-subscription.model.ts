import mongoose = require('mongoose');
import type { Document, Model, Types } from 'mongoose';

export interface PushSubscriptionDocument extends Document {
  userId: Types.ObjectId;
  endpoint: string;
  p256dh: string;
  auth: string;
}

const pushSubscriptionSchema = new mongoose.Schema<PushSubscriptionDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    endpoint: { type: String, required: true, unique: true },
    p256dh: { type: String, required: true },
    auth: { type: String, required: true },
  },
  { timestamps: true },
);

pushSubscriptionSchema.index({ userId: 1 });

export const PushSubscriptionModel: Model<PushSubscriptionDocument> =
  mongoose.models.PushSubscription as Model<PushSubscriptionDocument> ||
  mongoose.model<PushSubscriptionDocument>('PushSubscription', pushSubscriptionSchema);
