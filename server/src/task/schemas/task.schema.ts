import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  /** Batches this task is for. If empty, all batches in the course are implied. */
  @Prop({ type: [Types.ObjectId], ref: 'Batch', default: [] })
  batchIds: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Date, default: null })
  dueDate: Date | null;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.index({ courseId: 1, createdAt: -1 });
TaskSchema.index({ createdBy: 1 });
