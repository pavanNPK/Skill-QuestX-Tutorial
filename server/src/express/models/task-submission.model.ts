import mongoose = require('mongoose');
import type { Document, Model, Types } from 'mongoose';

export interface TaskSubmissionDocument extends Document {
  taskId: Types.ObjectId;
  studentId: Types.ObjectId;
  comment: string;
  attachmentUrl: string | null;
}

const taskSubmissionSchema = new mongoose.Schema<TaskSubmissionDocument>(
  {
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, default: '' },
    attachmentUrl: { type: String, default: null },
  },
  { timestamps: true },
);

taskSubmissionSchema.index({ taskId: 1, studentId: 1 }, { unique: true });
taskSubmissionSchema.index({ taskId: 1 });
taskSubmissionSchema.index({ studentId: 1 });

export const TaskSubmissionModel: Model<TaskSubmissionDocument> =
  mongoose.models.TaskSubmission as Model<TaskSubmissionDocument> ||
  mongoose.model<TaskSubmissionDocument>('TaskSubmission', taskSubmissionSchema);
