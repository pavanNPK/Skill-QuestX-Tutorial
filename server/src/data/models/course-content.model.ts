/** Mongoose model file: defines the MongoDB schema, TypeScript document shape, and exported model for this collection. */
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
  // Visible bullet text.
  text: string;
  // Child bullets for nested list content.
  children?: NestedBulletItem[];
}

export interface ContentBlock {
  // Stable block id used by editor/import merge logic.
  id: string;
  // Block renderer type.
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
  // Course has one content document, enforced by unique index.
  courseId: Types.ObjectId;
  // Editable manager copy.
  draft: ContentSnapshot;
  // Student-visible copy when published.
  published: ContentSnapshot | null;
  // Current publishing state.
  status: 'draft' | 'published' | 'unpublished';
  createdBy: Types.ObjectId | null;
  updatedBy: Types.ObjectId | null;
  publishedBy: Types.ObjectId | null;
  publishedAt: Date | null;
}

// use of this is:
// Embedded block schema avoids separate Mongo collections for editor content.
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

// use of this is:
// Embedded lesson schema groups blocks under a lesson/slide.
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

// use of this is:
// Embedded module schema groups lessons under a top-level module/index.
const moduleSchema = new mongoose.Schema<ContentModule>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, default: '' },
    lessons: { type: [lessonSchema], default: [] },
  },
  { _id: false },
);

// use of this is:
// Snapshot stores a full draft or published course-content tree.
const snapshotSchema = new mongoose.Schema<ContentSnapshot>(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    modules: { type: [moduleSchema], default: [] },
  },
  { _id: false },
);

// use of this is:
// Main course-content schema stores draft and published snapshots for one course.
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

// use of this export is:
// Reuse existing model during hot reload/tests, otherwise create the CourseContent model.
export const CourseContentModel: Model<CourseContentDocument> =
  mongoose.models.CourseContent as Model<CourseContentDocument> ||
  mongoose.model<CourseContentDocument>('CourseContent', courseContentSchema);
