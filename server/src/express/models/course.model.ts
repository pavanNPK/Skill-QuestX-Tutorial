import mongoose = require('mongoose');
import type { Document, Model, Types } from 'mongoose';

export interface CourseDocument extends Document {
  name: string;
  description: string;
  author: string;
  createdBy: Types.ObjectId | null;
  price: number;
  discount: number;
  ratingAverage: number;
  ratingCount: number;
  thumbnail: string;
  accentColor: string;
  instructorIds: Types.ObjectId[];
}

const courseSchema = new mongoose.Schema<CourseDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    author: { type: String, default: '', trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    ratingAverage: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    thumbnail: { type: String, default: '', trim: true },
    accentColor: { type: String, default: '#5B4BC4', trim: true },
    instructorIds: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  },
  { timestamps: true },
);

export const CourseModel: Model<CourseDocument> =
  mongoose.models.Course as Model<CourseDocument> || mongoose.model<CourseDocument>('Course', courseSchema);
