/** Mongoose model file: defines the MongoDB schema, TypeScript document shape, and exported model for this collection. */
import mongoose = require('mongoose');
import type { Document, Model } from 'mongoose';

export interface UserDocument extends Document {
  // User profile fields shown in UI.
  firstName: string;
  lastName: string;
  displayName: string | null;
  email: string;
  passwordHash: string | null;
  setPasswordToken: string | null;
  setPasswordTokenExpiresAt: Date | null;
  phoneCountry: string | null;
  phoneNumber: string | null;
  dateOfBirth: string | null;
  nationality: string | null;
  address: string | null;
  underGraduate: string | null;
  profileImageUrl: string | null;
  coverImageUrl: string | null;
  resumeUrl: string | null;
  skills: string[];
  emailVerified: boolean;
  otpCode: string | null;
  otpExpiresAt: Date | null;
  role: string;
  isActive: boolean;
  canManageUsers: boolean;
}

// use of this is:
// Stores users, authentication secrets, OTP/invite state, role, and account status.
const userSchema = new mongoose.Schema<UserDocument>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    displayName: { type: String, default: null, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: false, default: null },
    setPasswordToken: { type: String, default: null },
    setPasswordTokenExpiresAt: { type: Date, default: null },
    phoneCountry: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    dateOfBirth: { type: String, default: null },
    nationality: { type: String, default: null },
    address: { type: String, default: null },
    underGraduate: { type: String, default: null },
    profileImageUrl: { type: String, default: null },
    coverImageUrl: { type: String, default: null },
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

// use of this export is:
// Reuse existing model during hot reload/tests, otherwise create the User model.
export const UserModel: Model<UserDocument> =
  mongoose.models.User as Model<UserDocument> || mongoose.model<UserDocument>('User', userSchema);
