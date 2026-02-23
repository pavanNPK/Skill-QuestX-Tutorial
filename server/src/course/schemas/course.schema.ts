import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ default: '', trim: true })
  description: string;

  /** Display name of author / primary instructor. */
  @Prop({ default: '', trim: true })
  author: string;

  /** User ID (ObjectId) who created/entered this course in the system. */
  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  createdBy: Types.ObjectId | null;

  /** Price before discount. */
  @Prop({ default: 0 })
  price: number;

  /** Discount percentage (0–100). */
  @Prop({ default: 0 })
  discount: number;

  /** Average rating (e.g. 4.2). Dummy until real ratings exist. */
  @Prop({ default: 0 })
  ratingAverage: number;

  /** Number of people who gave a rating. For future: "X people rated". */
  @Prop({ default: 0 })
  ratingCount: number;

  @Prop({ default: '', trim: true })
  thumbnail: string;

  @Prop({ default: '#5B4BC4', trim: true })
  accentColor: string;

  /** Instructor user IDs (ObjectId) who teach this course. */
  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  instructorIds: Types.ObjectId[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
