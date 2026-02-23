import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskSubmissionDocument = TaskSubmission & Document;

@Schema({ timestamps: true })
export class TaskSubmission {
  @Prop({ type: Types.ObjectId, ref: 'Task', required: true })
  taskId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  studentId: Types.ObjectId;

  @Prop({ default: '' })
  comment: string;

  /** Optional link or attachment URL. */
  @Prop({ default: null })
  attachmentUrl: string | null;
}

export const TaskSubmissionSchema = SchemaFactory.createForClass(TaskSubmission);
TaskSubmissionSchema.index({ taskId: 1, studentId: 1 }, { unique: true });
TaskSubmissionSchema.index({ taskId: 1 });
TaskSubmissionSchema.index({ studentId: 1 });
