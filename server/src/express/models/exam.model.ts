import mongoose = require('mongoose');
import type { Document, Model, Types } from 'mongoose';

export type ExamQuestionType = 'blank' | 'single_select' | 'multi_select';

export interface ExamOption {
  value: string;
  label: string;
}

export interface ExamQuestion {
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

const optionSchema = new mongoose.Schema<ExamOption>(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
  },
  { _id: false },
);

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

const sectionSchema = new mongoose.Schema<ExamSection>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, default: '' },
    questions: { type: [questionSchema], default: [] },
  },
  { _id: false },
);

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

export const ExamModel: Model<ExamDocument> =
  mongoose.models.Exam as Model<ExamDocument> || mongoose.model<ExamDocument>('Exam', examSchema);
