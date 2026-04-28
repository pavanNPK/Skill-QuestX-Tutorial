import mongoose = require('mongoose');
import type { Document, Model, Types } from 'mongoose';

export type ContentAssetType = 'pdf' | 'ppt' | 'doc' | 'image' | 'video' | 'other';

export interface ContentAssetDocument extends Document {
  courseId: Types.ObjectId;
  uploadedBy: Types.ObjectId;
  originalName: string;
  filename: string;
  mimetype: string;
  size: number;
  url: string;
  type: ContentAssetType;
}

const contentAssetSchema = new mongoose.Schema<ContentAssetDocument>(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    originalName: { type: String, required: true },
    filename: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    url: { type: String, required: true },
    type: { type: String, required: true, default: 'other' },
  },
  { timestamps: true },
);

export const ContentAssetModel: Model<ContentAssetDocument> =
  mongoose.models.ContentAsset as Model<ContentAssetDocument> ||
  mongoose.model<ContentAssetDocument>('ContentAsset', contentAssetSchema);
