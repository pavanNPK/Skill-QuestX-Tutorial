import mongoose = require('mongoose');
import type { Document, Model, Types } from 'mongoose';

export interface BatchDocument extends Document {
  name: string;
  courseId: Types.ObjectId;
  studentIds: Types.ObjectId[];
}

const batchSchema = new mongoose.Schema<BatchDocument>(
  {
    name: { type: String, required: true, trim: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    studentIds: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  },
  { timestamps: true },
);

export const BatchModel: Model<BatchDocument> =
  mongoose.models.Batch as Model<BatchDocument> || mongoose.model<BatchDocument>('Batch', batchSchema);
