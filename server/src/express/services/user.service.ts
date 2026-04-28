import { Types } from 'mongoose';
import bcrypt = require('bcryptjs');
import { REGISTRABLE_ROLES, isRegistrableRole } from '../constants/roles';
import { UserModel, type UserDocument } from '../models/user.model';
import { badRequest, conflict } from '../utils/http-error';

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role?: string;
  phoneCountry?: string;
  phoneNumber?: string;
  underGraduate?: string;
  profileImageUrl?: string;
  resumeUrl?: string;
  skills?: string[];
}

export class UserService {
  private readonly safeUserFields = 'firstName lastName email role isActive canManageUsers';

  async findByEmail(email: string): Promise<UserDocument | null> {
    return UserModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return UserModel.findById(id).exec();
  }

  async create(dto: CreateUserDto): Promise<UserDocument> {
    const existing = await this.findByEmail(dto.email);
    if (existing) throw conflict('User with this email already exists');

    const role = dto.role ?? 'student';
    if (!isRegistrableRole(role)) {
      throw badRequest('Invalid role. Allowed: ' + REGISTRABLE_ROLES.join(', '));
    }

    const hasPassword = dto.password != null && dto.password.length >= 8;
    const passwordHash = hasPassword && dto.password ? await bcrypt.hash(dto.password, 10) : null;
    return new UserModel({
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
    }).save();
  }

  async validatePassword(user: UserDocument, password: string): Promise<boolean> {
    if (!user.passwordHash) return false;
    return bcrypt.compare(password, user.passwordHash);
  }

  async findBySetPasswordToken(token: string): Promise<UserDocument | null> {
    return UserModel.findOne({
      setPasswordToken: token,
      setPasswordTokenExpiresAt: { $gt: new Date() },
    }).exec();
  }

  async setPasswordByToken(token: string, newPassword: string): Promise<UserDocument | null> {
    const user = await this.findBySetPasswordToken(token);
    if (!user) return null;
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await UserModel.updateOne(
      { _id: user._id },
      {
        $set: {
          passwordHash,
          setPasswordToken: null,
          setPasswordTokenExpiresAt: null,
          emailVerified: true,
        },
      },
    ).exec();
    return this.findById(user._id.toString());
  }

  async listByIdsSafe(ids: (string | Types.ObjectId)[]) {
    if (!ids?.length) return [];
    const objectIds = ids.filter(Boolean).map((id) => (typeof id === 'string' ? new Types.ObjectId(id) : id));
    const users = await UserModel.find({ _id: { $in: objectIds } }).select(this.safeUserFields).lean().exec();
    return users.map((u: any) => ({
      id: u._id.toString(),
      email: u.email ?? '',
      firstName: u.firstName ?? '',
      lastName: u.lastName ?? '',
      name: `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim(),
      role: u.role ?? 'student',
      isActive: u.isActive !== false,
      canManageUsers: u.role === 'admin' ? u.canManageUsers === true : undefined,
    }));
  }

  async listByRolesSafe(roles: string[]) {
    const users = await UserModel.find({ role: { $in: roles } })
      .select(this.safeUserFields)
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    return users.map((u: any) => ({
      id: u._id.toString(),
      email: u.email ?? '',
      firstName: u.firstName ?? '',
      lastName: u.lastName ?? '',
      name: `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim(),
      role: u.role ?? 'student',
      isActive: u.isActive !== false,
      canManageUsers: u.role === 'admin' ? u.canManageUsers === true : undefined,
    }));
  }

  async setActive(userId: string, active: boolean): Promise<UserDocument | null> {
    return UserModel.findByIdAndUpdate(userId, { $set: { isActive: active } }, { new: true }).exec();
  }

  async createWithSetPasswordToken(dto: Omit<CreateUserDto, 'password'>, token: string, expiresAt: Date): Promise<UserDocument> {
    const existing = await this.findByEmail(dto.email);
    if (existing) throw conflict('User with this email already exists');

    const role = dto.role ?? 'student';
    if (!isRegistrableRole(role)) {
      throw badRequest('Invalid role. Allowed: ' + REGISTRABLE_ROLES.join(', '));
    }

    return new UserModel({
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
    }).save();
  }

  async setOtp(userId: string, otp: string, expiresAt: Date): Promise<void> {
    await UserModel.updateOne({ _id: userId }, { $set: { otpCode: otp, otpExpiresAt: expiresAt } }).exec();
  }

  async clearOtp(userId: string): Promise<void> {
    await UserModel.updateOne(
      { _id: userId },
      { $set: { otpCode: null, otpExpiresAt: null, emailVerified: true } },
    ).exec();
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await UserModel.updateOne(
      { _id: userId },
      { $set: { passwordHash, otpCode: null, otpExpiresAt: null } },
    ).exec();
  }

  async setCanManageUsers(userId: string, canManageUsers: boolean): Promise<UserDocument | null> {
    const user = await UserModel.findById(userId).exec();
    if (!user || user.role !== 'admin') return null;
    return UserModel.findByIdAndUpdate(userId, { $set: { canManageUsers } }, { new: true }).exec();
  }

  async updateProfile(userId: string, dto: { firstName?: string; lastName?: string }): Promise<UserDocument | null> {
    const updates: Record<string, string> = {};
    if (dto.firstName != null && dto.firstName.trim()) updates.firstName = dto.firstName.trim();
    if (dto.lastName != null && dto.lastName.trim()) updates.lastName = dto.lastName.trim();
    if (Object.keys(updates).length === 0) return this.findById(userId);
    return UserModel.findByIdAndUpdate(userId, { $set: updates }, { new: true }).exec();
  }
}
