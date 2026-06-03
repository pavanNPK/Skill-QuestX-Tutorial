/** Mongoose model file: defines the MongoDB schema, TypeScript document shape, and exported model for this collection. */
import mongoose = require('mongoose');
import type { Document, Model, Types } from 'mongoose';

export type ExamQuestionType = 'blank' | 'single_select' | 'multi_select';

export interface ExamOption {
  value: string;
  label: string;
}

export interface ExamQuestion {
  // Stable question id used by answers/submissions.
  id: string;
  type: ExamQuestionType;
  prompt: string;
  options?: ExamOption[];
  answer?: string | string[];
}

export interface ExamSection {
  id: string;
  title: string;
  summary?: string;
  questions: ExamQuestion[];
}

export interface ExamDocument extends Document {
  title: string;
  description: string;
  durationMinutes: number;
  courseId: Types.ObjectId | null;
  status: 'draft' | 'published';
  sections: ExamSection[];
}

// use of this is:
// Embedded option schema stores select choices inside a question.
const optionSchema = new mongoose.Schema<ExamOption>(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
  },
  { _id: false },
);

// use of this is:
// Embedded question schema stores prompt/options/answer inside a section.
const questionSchema = new mongoose.Schema<ExamQuestion>(
  {
    id: { type: String, required: true },
    type: { type: String, enum: ['blank', 'single_select', 'multi_select'], default: 'blank' },
    prompt: { type: String, required: true },
    options: { type: [optionSchema], default: [] },
    answer: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { _id: false },
);

// use of this is:
// Embedded section schema groups questions for one exam.
const sectionSchema = new mongoose.Schema<ExamSection>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, default: '' },
    questions: { type: [questionSchema], default: [] },
  },
  { _id: false },
);

// use of this is:
// Main exam schema stores exam metadata, publish status, and question sections.
const examSchema = new mongoose.Schema<ExamDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    durationMinutes: { type: Number, default: 30 },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', default: null, index: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true },
    sections: { type: [sectionSchema], default: [] },
  },
  { timestamps: true },
);

// use of this export is:
// Reuse existing model during hot reload/tests, otherwise create the Exam model.
export const ExamModel: Model<ExamDocument> =
  mongoose.models.Exam as Model<ExamDocument> || mongoose.model<ExamDocument>('Exam', examSchema);
