import mongoose = require('mongoose');
import type { Document, Model, Types } from 'mongoose';

export interface ExamSubmissionAnswer {
  questionId: string;
  value: string | string[];
}

export interface ExamSubmissionDocument extends Document {
  examId: Types.ObjectId;
  userId: Types.ObjectId;
  answers: ExamSubmissionAnswer[];
  submittedAt: Date;
  autoSubmitted: boolean;
}

const answerSchema = new mongoose.Schema<ExamSubmissionAnswer>(
  {
    questionId: { type: String, required: true },
    value: { type: mongoose.Schema.Types.Mixed, default: '' },
  },
  { _id: false },
);

const examSubmissionSchema = new mongoose.Schema<ExamSubmissionDocument>(
  {
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    answers: { type: [answerSchema], default: [] },
    submittedAt: { type: Date, default: Date.now },
    autoSubmitted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const ExamSubmissionModel: Model<ExamSubmissionDocument> =
  mongoose.models.ExamSubmission as Model<ExamSubmissionDocument> ||
  mongoose.model<ExamSubmissionDocument>('ExamSubmission', examSubmissionSchema);
