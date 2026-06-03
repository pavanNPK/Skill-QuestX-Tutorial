/** Mongoose model file: defines the MongoDB schema, TypeScript document shape, and exported model for this collection. */
import mongoose = require('mongoose');
import type { Document, Model, Types } from 'mongoose';

export interface TaskSubmissionDocument extends Document {
  // Task being submitted.
  taskId: Types.ObjectId;
  studentId: Types.ObjectId;
  comment: string;
  attachmentUrl: string | null;
}

// use of this is:
// Stores one student's submission for one task.
const taskSubmissionSchema = new mongoose.Schema<TaskSubmissionDocument>(
  {
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, default: '' },
    attachmentUrl: { type: String, default: null },
  },
  { timestamps: true },
);

// use of these indexes is:
// Enforce one submission per student/task and speed task/student lookups.
taskSubmissionSchema.index({ taskId: 1, studentId: 1 }, { unique: true });
taskSubmissionSchema.index({ taskId: 1 });
taskSubmissionSchema.index({ studentId: 1 });

// use of this export is:
// Reuse existing model during hot reload/tests, otherwise create the TaskSubmission model.
export const TaskSubmissionModel: Model<TaskSubmissionDocument> =
  mongoose.models.TaskSubmission as Model<TaskSubmissionDocument> ||
  mongoose.model<TaskSubmissionDocument>('TaskSubmission', taskSubmissionSchema);
