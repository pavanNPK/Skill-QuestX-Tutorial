import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ type: String, required: false, default: null })
  passwordHash: string | null;

  /** Set-password token for Admin/Instructor invited without password. Cleared after they set password. */
  @Prop({ type: String, default: null })
  setPasswordToken: string | null;

  @Prop({ type: Date, default: null })
  setPasswordTokenExpiresAt: Date | null;

  @Prop({ type: String, default: null })
  phoneCountry: string | null;

  @Prop({ type: String, default: null })
  phoneNumber: string | null;

  @Prop({ type: String, default: null })
  underGraduate: string | null;

  @Prop({ type: String, default: null })
  profileImageUrl: string | null;

  @Prop({ type: String, default: null })
  resumeUrl: string | null;

  @Prop({ type: [String], default: [] })
  skills: string[];

  @Prop({ type: Boolean, default: false })
  emailVerified: boolean;

  @Prop({ type: String, default: null })
  otpCode: string | null;

  @Prop({ type: Date, default: null })
  otpExpiresAt: Date | null;

  /** super_admin | admin | instructor | student. Super Admin (SA) created by script only. */
  @Prop({ type: String, default: 'student' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
