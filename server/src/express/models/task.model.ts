import mongoose = require('mongoose');
import type { Document, Model, Types } from 'mongoose';

export interface TaskDocument extends Document {
  title: string;
  description: string;
  courseId: Types.ObjectId;
  batchIds: Types.ObjectId[];
  createdBy: Types.ObjectId;
  dueDate: Date | null;
}

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

taskSchema.index({ courseId: 1, createdAt: -1 });
taskSchema.index({ createdBy: 1 });

export const TaskModel: Model<TaskDocument> =
  mongoose.models.Task as Model<TaskDocument> || mongoose.model<TaskDocument>('Task', taskSchema);
