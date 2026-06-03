/** Mongoose model file: defines the MongoDB schema, TypeScript document shape, and exported model for this collection. */
import mongoose = require('mongoose');
import type { Document, Model, Types } from 'mongoose';

export interface ExamSubmissionAnswer {
  // Question id from the exam snapshot.
  questionId: string;
  // Answer can be string for blank/single and string[] for multi-select.
  value: string | string[];
}

export interface ExamSubmissionDocument extends Document {
  examId: Types.ObjectId;
  userId: Types.ObjectId;
  answers: ExamSubmissionAnswer[];
  submittedAt: Date;
  autoSubmitted: boolean;
}

// use of this is:
// Embedded answer schema stores submitted answers inside one submission document.
const answerSchema = new mongoose.Schema<ExamSubmissionAnswer>(
  {
    questionId: { type: String, required: true },
    value: { type: mongoose.Schema.Types.Mixed, default: '' },
  },
  { _id: false },
);

// use of this is:
// Stores one student's submitted answers for an exam attempt.
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

// use of this export is:
// Reuse existing model during hot reload/tests, otherwise create the ExamSubmission model.
export const ExamSubmissionModel: Model<ExamSubmissionDocument> =
  mongoose.models.ExamSubmission as Model<ExamSubmissionDocument> ||
  mongoose.model<ExamSubmissionDocument>('ExamSubmission', examSubmissionSchema);
