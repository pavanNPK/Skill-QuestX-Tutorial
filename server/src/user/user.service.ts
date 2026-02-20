import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { REGISTRABLE_ROLES, isRegistrableRole } from './constants/roles';

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  /** Optional for Admin/Instructor invite; they set password via email link. */
  password?: string;
  role?: string;
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
    const role = dto.role ?? 'student';
    if (!isRegistrableRole(role)) {
      throw new BadRequestException('Invalid role. Allowed: ' + REGISTRABLE_ROLES.join(', '));
    }
    const hasPassword = dto.password != null && dto.password.length >= 8;
    const passwordHash = hasPassword && dto.password ? await bcrypt.hash(dto.password, 10) : null;
    const user = new this.userModel({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email.toLowerCase(),
      passwordHash,
      role,
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
    if (!user.passwordHash) return false;
    return bcrypt.compare(password, user.passwordHash);
  }

  async findBySetPasswordToken(token: string): Promise<UserDocument | null> {
    return this.userModel
      .findOne({
        setPasswordToken: token,
        setPasswordTokenExpiresAt: { $gt: new Date() },
      })
      .exec();
  }

  async setPasswordByToken(token: string, newPassword: string): Promise<UserDocument | null> {
    const user = await this.findBySetPasswordToken(token);
    if (!user) return null;
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await this.userModel
      .updateOne(
        { _id: user._id },
        {
          $set: {
            passwordHash,
            setPasswordToken: null,
            setPasswordTokenExpiresAt: null,
          },
        },
      )
      .exec();
    return this.findById(user._id.toString());
  }

  async listByRoles(roles: string[]): Promise<UserDocument[]> {
    return this.userModel.find({ role: { $in: roles } }).sort({ createdAt: -1 }).exec();
  }

  /** Create user without password and set a set-password token (for Admin/Instructor invite). */
  async createWithSetPasswordToken(
    dto: Omit<CreateUserDto, 'password'>,
    token: string,
    expiresAt: Date,
  ): Promise<UserDocument> {
    const existing = await this.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }
    const role = dto.role ?? 'student';
    if (!isRegistrableRole(role)) {
      throw new BadRequestException('Invalid role. Allowed: ' + REGISTRABLE_ROLES.join(', '));
    }
    const user = new this.userModel({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email.toLowerCase(),
      passwordHash: null,
      setPasswordToken: token,
      setPasswordTokenExpiresAt: expiresAt,
      role,
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
