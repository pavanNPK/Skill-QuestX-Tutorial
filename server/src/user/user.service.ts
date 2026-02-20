import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneCountry?: string;
  phoneNumber?: string;
  underGraduate?: string;
  profileImageUrl?: string;
  resumeUrl?: string;
  skills?: string[];
}

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async create(dto: CreateUserDto): Promise<UserDocument> {
    const existing = await this.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = new this.userModel({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email.toLowerCase(),
      passwordHash,
      phoneCountry: dto.phoneCountry ?? null,
      phoneNumber: dto.phoneNumber ?? null,
      underGraduate: dto.underGraduate ?? null,
      profileImageUrl: dto.profileImageUrl ?? null,
      resumeUrl: dto.resumeUrl ?? null,
      skills: dto.skills ?? [],
      emailVerified: false,
    });
    return user.save();
  }

  async validatePassword(user: UserDocument, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }

  async setOtp(userId: string, otp: string, expiresAt: Date): Promise<void> {
    await this.userModel
      .updateOne(
        { _id: userId },
        { $set: { otpCode: otp, otpExpiresAt: expiresAt } },
      )
      .exec();
  }

  async clearOtp(userId: string): Promise<void> {
    await this.userModel
      .updateOne(
        { _id: userId },
        { $set: { otpCode: null, otpExpiresAt: null, emailVerified: true } },
      )
      .exec();
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await this.userModel
      .updateOne(
        { _id: userId },
        { $set: { passwordHash, otpCode: null, otpExpiresAt: null } },
      )
      .exec();
  }
}
