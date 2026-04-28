import mongoose = require('mongoose');
import type { Document, Model } from 'mongoose';

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string | null;
  setPasswordToken: string | null;
  setPasswordTokenExpiresAt: Date | null;
  phoneCountry: string | null;
  phoneNumber: string | null;
  underGraduate: string | null;
  profileImageUrl: string | null;
  resumeUrl: string | null;
  skills: string[];
  emailVerified: boolean;
  otpCode: string | null;
  otpExpiresAt: Date | null;
  role: string;
  isActive: boolean;
  canManageUsers: boolean;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: false, default: null },
    setPasswordToken: { type: String, default: null },
    setPasswordTokenExpiresAt: { type: Date, default: null },
    phoneCountry: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    underGraduate: { type: String, default: null },
    profileImageUrl: { type: String, default: null },
    resumeUrl: { type: String, default: null },
    skills: { type: [String], default: [] },
    emailVerified: { type: Boolean, default: false },
    otpCode: { type: String, default: null },
    otpExpiresAt: { type: Date, default: null },
    role: { type: String, default: 'student' },
    isActive: { type: Boolean, default: true },
    canManageUsers: { type: Boolean, default: false },
  },
  { timestamps: true, collection: 'users' },
);

export const UserModel: Model<UserDocument> =
  mongoose.models.User as Model<UserDocument> || mongoose.model<UserDocument>('User', userSchema);
