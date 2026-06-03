/** Mongoose model file: defines the MongoDB schema, TypeScript document shape, and exported model for this collection. */
import mongoose = require('mongoose');
import type { Document, Model, Types } from 'mongoose';

export interface TaskDocument extends Document {
  // Task title displayed to students/instructors.
  title: string;
  description: string;
  courseId: Types.ObjectId;
  batchIds: Types.ObjectId[];
  createdBy: Types.ObjectId;
  dueDate: Date | null;
}

// use of this is:
// Stores instructor-created tasks and their target course/batches.
const taskSchema = new mongoose.Schema<TaskDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    batchIds: { type: [mongoose.Schema.Types.ObjectId], ref: 'Batch', default: [] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dueDate: { type: Date, default: null },
  },
  { timestamps: true },
);

// use of these indexes is:
// Speed up course task lists and creator/instructor task lookups.
taskSchema.index({ courseId: 1, createdAt: -1 });
taskSchema.index({ createdBy: 1 });

// use of this export is:
// Reuse existing model during hot reload/tests, otherwise create the Task model.
export const TaskModel: Model<TaskDocument> =
  mongoose.models.Task as Model<TaskDocument> || mongoose.model<TaskDocument>('Task', taskSchema);
