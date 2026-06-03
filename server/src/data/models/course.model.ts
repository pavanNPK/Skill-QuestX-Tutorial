/** Mongoose model file: defines the MongoDB schema, TypeScript document shape, and exported model for this collection. */
import mongoose = require('mongoose');
import type { Document, Model, Types } from 'mongoose';

export interface CourseDocument extends Document {
  // Course title/name displayed in catalogue and admin screens.
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

// use of this is:
// Stores public course card data and instructor assignments.
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

// use of this index is:
// Speed up instructor material/course lookups.
courseSchema.index({ instructorIds: 1 });

// use of this export is:
// Reuse existing model during hot reload/tests, otherwise create the Course model.
export const CourseModel: Model<CourseDocument> =
  mongoose.models.Course as Model<CourseDocument> || mongoose.model<CourseDocument>('Course', courseSchema);
