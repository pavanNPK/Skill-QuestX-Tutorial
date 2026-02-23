import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, trim: true })
  name: string;

  /** Instructor user IDs (ObjectId) who teach this course. */
  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  instructorIds: Types.ObjectId[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
