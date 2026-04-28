import mongoose = require('mongoose');
import type { Document, Model, Types } from 'mongoose';

export type ContentBlockType =
  | 'heading'
  | 'paragraph'
  | 'bullet_list'
  | 'nested_bullet_list'
  | 'image'
  | 'document'
  | 'video'
  | 'link'
  | 'assignment_note'
  | 'table';

export interface NestedBulletItem {
  text: string;
  children?: NestedBulletItem[];
}

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  title?: string;
  text?: string;
  url?: string;
  assetId?: string;
  items?: NestedBulletItem[];
  columns?: string[];
  rows?: string[][];
}

export interface ContentLesson {
  id: string;
  title: string;
  summary?: string;
  durationMinutes?: number;
  blocks: ContentBlock[];
}

export interface ContentModule {
  id: string;
  title: string;
  summary?: string;
  lessons: ContentLesson[];
}

export interface ContentSnapshot {
  title: string;
  description?: string;
  modules: ContentModule[];
}

export interface CourseContentDocument extends Document {
  courseId: Types.ObjectId;
  draft: ContentSnapshot;
  published: ContentSnapshot | null;
  status: 'draft' | 'published' | 'unpublished';
  createdBy: Types.ObjectId | null;
  updatedBy: Types.ObjectId | null;
  publishedBy: Types.ObjectId | null;
  publishedAt: Date | null;
}

const blockSchema = new mongoose.Schema<ContentBlock>(
  {
    id: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, default: '' },
    text: { type: String, default: '' },
    url: { type: String, default: '' },
    assetId: { type: String, default: '' },
    items: { type: Array, default: [] },
    columns: { type: [String], default: [] },
    rows: { type: [[String]], default: [] },
  },
  { _id: false },
);

const lessonSchema = new mongoose.Schema<ContentLesson>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, default: '' },
    durationMinutes: { type: Number, default: 0 },
    blocks: { type: [blockSchema], default: [] },
  },
  { _id: false },
);

const moduleSchema = new mongoose.Schema<ContentModule>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, default: '' },
    lessons: { type: [lessonSchema], default: [] },
  },
  { _id: false },
);

const snapshotSchema = new mongoose.Schema<ContentSnapshot>(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    modules: { type: [moduleSchema], default: [] },
  },
  { _id: false },
);

const courseContentSchema = new mongoose.Schema<CourseContentDocument>(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, unique: true, index: true },
    draft: { type: snapshotSchema, required: true },
    published: { type: snapshotSchema, default: null },
    status: { type: String, enum: ['draft', 'published', 'unpublished'], default: 'draft' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export const CourseContentModel: Model<CourseContentDocument> =
  mongoose.models.CourseContent as Model<CourseContentDocument> ||
  mongoose.model<CourseContentDocument>('CourseContent', courseContentSchema);
