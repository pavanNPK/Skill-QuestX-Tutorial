/** Mongoose model file: defines the MongoDB schema, TypeScript document shape, and exported model for this collection. */
import mongoose = require('mongoose');
import type { Document, Model, Types } from 'mongoose';

export interface BatchDocument extends Document {
  // Batch display name shown in admin/instructor screens.
  name: string;
  // Course this batch belongs to.
  courseId: Types.ObjectId;
  // Students enrolled in this batch.
  studentIds: Types.ObjectId[];
}

// use of this is:
// Store student groups for a course so tasks/content access can target enrolled students.
const batchSchema = new mongoose.Schema<BatchDocument>(
  {
    name: { type: String, required: true, trim: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    studentIds: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  },
  { timestamps: true },
);

// use of these indexes is:
// Speed up course material access checks and student enrolled-course lookups.
batchSchema.index({ courseId: 1 });
batchSchema.index({ studentIds: 1 });
batchSchema.index({ courseId: 1, studentIds: 1 });

// use of this export is:
// Reuse existing model during hot reload/tests, otherwise create the Batch model.
export const BatchModel: Model<BatchDocument> =
  mongoose.models.Batch as Model<BatchDocument> || mongoose.model<BatchDocument>('Batch', batchSchema);
