/** Mongoose model file: defines the MongoDB schema, TypeScript document shape, and exported model for this collection. */
import mongoose = require('mongoose');
import type { Document, Model, Types } from 'mongoose';

export type ContentAssetType = 'pdf' | 'ppt' | 'doc' | 'image' | 'video' | 'other';

export interface ContentAssetDocument extends Document {
  // Course that owns this uploaded content asset.
  courseId: Types.ObjectId;
  // User who uploaded the asset.
  uploadedBy: Types.ObjectId;
  // Original browser filename for display.
  originalName: string;
  // Server-generated stored filename.
  filename: string;
  // MIME type provided by upload stream.
  mimetype: string;
  // File size in bytes.
  size: number;
  // Public URL served by static upload plugin.
  url: string;
  // Asset category used by frontend icons/filtering.
  type: ContentAssetType;
}

// use of this is:
// Persist metadata for uploaded course content files; file bytes live on disk.
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

// use of this export is:
// Reuse existing model during hot reload/tests, otherwise create the ContentAsset model.
export const ContentAssetModel: Model<ContentAssetDocument> =
  mongoose.models.ContentAsset as Model<ContentAssetDocument> ||
  mongoose.model<ContentAssetDocument>('ContentAsset', contentAssetSchema);
