import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BatchDocument = Batch & Document;

@Schema({ timestamps: true })
export class Batch {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  /** Student user IDs (ObjectId) enrolled in this batch. */
  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  studentIds: Types.ObjectId[];
}

export const BatchSchema = SchemaFactory.createForClass(Batch);
