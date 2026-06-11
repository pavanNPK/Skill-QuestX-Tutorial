/** Mongoose model file: stores the standalone material creation/import workflow draft. */
import mongoose = require('mongoose');
import type { Document, Model, Types } from 'mongoose';

export type MaterialSourceType = 'FILE_UPLOAD' | 'MANUAL';
export type MaterialDraftStatus = 'DRAFT' | 'PUBLISHED' | 'SUBMITTED';
export type MaterialFileType = 'PPTX' | 'XLSX' | 'MANUAL';
export type MaterialItemStatus = 'DRAFT' | 'PUBLISHED';
export type MaterialContentBlockType =
  | 'HEADING'
  | 'PARAGRAPH'
  | 'TEXT'
  | 'BULLETS'
  | 'NUMBERED_LIST'
  | 'TABLE'
  | 'MEDIA'
  | 'NOTES'
  | 'LINK'
  | 'NESTED'
  | 'CODE'
  | 'QUOTE';

export interface MaterialContentBlock {
  id: string;
  type: MaterialContentBlockType;
  order: number;
  value: unknown;
}

export interface MaterialLinkValue {
  label: string;
  url: string;
}

export interface MaterialSlide {
  id: string;
  title: string;
  order: number;
  status: MaterialItemStatus;
  blocks: MaterialContentBlock[];
  notes?: string;
  links?: MaterialLinkValue[];
  imageUrls?: string[];
}

export interface MaterialFile {
  id: string;
  fileName: string;
  fileType: MaterialFileType;
  sourceKey?: string;
  order: number;
  status: MaterialItemStatus;
  slides: MaterialSlide[];
}

export interface MaterialDraftDocument extends Document {
  title: string;
  sourceType: MaterialSourceType;
  status: MaterialDraftStatus;
  files: MaterialFile[];
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  submittedBy: Types.ObjectId | null;
  submittedAt: Date | null;
}

const contentBlockSchema = new mongoose.Schema<MaterialContentBlock>(
  {
    id: { type: String, required: true },
    type: {
      type: String,
      enum: ['HEADING', 'PARAGRAPH', 'TEXT', 'BULLETS', 'NUMBERED_LIST', 'TABLE', 'MEDIA', 'NOTES', 'LINK', 'NESTED', 'CODE', 'QUOTE'],
      required: true,
    },
    order: { type: Number, required: true, min: 1 },
    value: { type: mongoose.Schema.Types.Mixed, default: '' },
  },
  { _id: false },
);

const linkSchema = new mongoose.Schema<MaterialLinkValue>(
  {
    label: { type: String, default: '' },
    url: { type: String, default: '' },
  },
  { _id: false },
);

const slideSchema = new mongoose.Schema<MaterialSlide>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    order: { type: Number, required: true, min: 1 },
    status: { type: String, enum: ['DRAFT', 'PUBLISHED'], default: 'DRAFT' },
    blocks: { type: [contentBlockSchema], default: [] },
    notes: { type: String, default: '' },
    links: { type: [linkSchema], default: [] },
    imageUrls: { type: [String], default: [] },
  },
  { _id: false },
);

const fileSchema = new mongoose.Schema<MaterialFile>(
  {
    id: { type: String, required: true },
    fileName: { type: String, required: true },
    fileType: { type: String, enum: ['PPTX', 'XLSX', 'MANUAL'], required: true },
    sourceKey: { type: String, default: '' },
    order: { type: Number, required: true, min: 1 },
    status: { type: String, enum: ['DRAFT', 'PUBLISHED'], default: 'DRAFT' },
    slides: { type: [slideSchema], default: [] },
  },
  { _id: false },
);

const materialDraftSchema = new mongoose.Schema<MaterialDraftDocument>(
  {
    title: { type: String, required: true },
    sourceType: { type: String, enum: ['FILE_UPLOAD', 'MANUAL'], default: 'FILE_UPLOAD' },
    status: { type: String, enum: ['DRAFT', 'PUBLISHED', 'SUBMITTED'], default: 'DRAFT', index: true },
    files: { type: [fileSchema], default: [] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    submittedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export const MaterialDraftModel: Model<MaterialDraftDocument> =
  mongoose.models.MaterialDraft as Model<MaterialDraftDocument> ||
  mongoose.model<MaterialDraftDocument>('MaterialDraft', materialDraftSchema);
