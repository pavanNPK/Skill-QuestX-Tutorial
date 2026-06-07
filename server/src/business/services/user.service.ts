/** Service file: contains business rules and database coordination; controllers call these methods after route validation. */
import { Types } from 'mongoose';
import bcrypt = require('bcryptjs');
import { REGISTRABLE_ROLES, isRegistrableRole } from '../../core/constants/roles';
import { UserModel, type UserDocument } from '../../data/models/user.model';
import { badRequest, conflict } from '../../core/utils/http-error';

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
  // use of this is:
  // Safe field projection prevents passwordHash, OTP, and invite tokens from being returned in list APIs.
  private readonly safeUserFields = 'firstName lastName email role isActive canManageUsers';

  // use of this is:
  // Finds one user by normalized email for login, registration checks, and OTP flows.
  async findByEmail(email: string): Promise<UserDocument | null> {
    return UserModel.findOne({ email: email.toLowerCase() }).exec();
  }

  // use of this is:
  // Finds one user by Mongo id for authenticated user loading and relation lookups.
  async findById(id: string): Promise<UserDocument | null> {
    return UserModel.findById(id).exec();
  }

  // use of this is:
  // Creates a user with optional password, used mainly for student registration.
  async create(dto: CreateUserDto): Promise<UserDocument> {
    // Duplicate email is rejected before creating the Mongo document.
    const existing = await this.findByEmail(dto.email);
    if (existing) throw conflict('User with this email already exists');

    // Default role is student; invalid role strings are rejected before save.
    const role = dto.role ?? 'student';
    if (!isRegistrableRole(role)) {
      throw badRequest('Invalid role. Allowed: ' + REGISTRABLE_ROLES.join(', '));
    }

    // Passwords are never stored directly; bcrypt hash is stored when a valid password is present.
    const hasPassword = dto.password != null && dto.password.length >= 8;
    const passwordHash = hasPassword && dto.password ? await bcrypt.hash(dto.password, 10) : null;
    // Normalize optional fields so Mongo has predictable null/array defaults.
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

  // use of this is:
  // Checks a login/current-password attempt against the stored bcrypt hash.
  async validatePassword(user: UserDocument, password: string): Promise<boolean> {
    // Users invited by token may not have passwordHash yet.
    if (!user.passwordHash) return false;
    return bcrypt.compare(password, user.passwordHash);
  }

  // use of this is:
  // Finds an invited user by set-password token only if token has not expired.
  async findBySetPasswordToken(token: string): Promise<UserDocument | null> {
    return UserModel.findOne({
      setPasswordToken: token,
      setPasswordTokenExpiresAt: { $gt: new Date() },
    }).exec();
  }

  // use of this is:
  // Consumes a set-password token and stores the new password hash.
  async setPasswordByToken(token: string, newPassword: string): Promise<UserDocument | null> {
    // Token lookup includes expiry protection.
    const user = await this.findBySetPasswordToken(token);
    if (!user) return null;
    // New password is hashed before saving; raw password is never persisted.
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

  // use of this is:
  // Returns safe user summaries by id list for admin displays and notifications.
  async listByIdsSafe(ids: (string | Types.ObjectId)[]) {
    if (!ids?.length) return [];
    // Convert strings to ObjectIds and ignore falsy values.
    const objectIds = ids.filter(Boolean).map((id) => (typeof id === 'string' ? new Types.ObjectId(id) : id));
    // Projection uses safeUserFields so private fields are never returned.
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

  // use of this is:
  // Returns safe users matching role filters, usually for admin user lists.
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

  // use of this is:
  // Activates or deactivates an account.
  async setActive(userId: string, active: boolean): Promise<UserDocument | null> {
    return UserModel.findByIdAndUpdate(userId, { $set: { isActive: active } }, { new: true }).exec();
  }

  // use of this is:
  // Creates invited users who must set password through an email token.
  async createWithSetPasswordToken(dto: Omit<CreateUserDto, 'password'>, token: string, expiresAt: Date): Promise<UserDocument> {
    // Same duplicate and role protections as create().
    const existing = await this.findByEmail(dto.email);
    if (existing) throw conflict('User with this email already exists');

    const role = dto.role ?? 'student';
    if (!isRegistrableRole(role)) {
      throw badRequest('Invalid role. Allowed: ' + REGISTRABLE_ROLES.join(', '));
    }

    // passwordHash remains null until the invitee completes set-password.
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

  // use of this is:
  // Stores OTP code and expiry for email verification/reset flows.
  async setOtp(userId: string, otp: string, expiresAt: Date): Promise<void> {
    await UserModel.updateOne({ _id: userId }, { $set: { otpCode: otp, otpExpiresAt: expiresAt } }).exec();
  }

  // use of this is:
  // Clears OTP after successful verification and marks email verified.
  async clearOtp(userId: string): Promise<void> {
    await UserModel.updateOne(
      { _id: userId },
      { $set: { otpCode: null, otpExpiresAt: null, emailVerified: true } },
    ).exec();
  }

  // use of this is:
  // Updates password after reset/change flows and clears any OTP fields.
  async updatePassword(userId: string, newPassword: string): Promise<void> {
    // Hash first, then save only the hash.
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await UserModel.updateOne(
      { _id: userId },
      { $set: { passwordHash, otpCode: null, otpExpiresAt: null } },
    ).exec();
  }

  // use of this is:
  // Grants/revokes admin user-management permission, only for admin-role users.
  async setCanManageUsers(userId: string, canManageUsers: boolean): Promise<UserDocument | null> {
    // Permission does not apply to non-admin users.
    const user = await UserModel.findById(userId).exec();
    if (!user || user.role !== 'admin') return null;
    return UserModel.findByIdAndUpdate(userId, { $set: { canManageUsers } }, { new: true }).exec();
  }

  // use of this is:
  // Updates editable profile fields while ignoring empty text values.
  async updateProfile(userId: string, dto: {
    firstName?: string;
    lastName?: string;
    displayName?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    nationality?: string;
    address?: string;
    profileImageUrl?: string;
    coverImageUrl?: string;
  }): Promise<UserDocument | null> {
    // Build update object manually to avoid mass assignment.
    const updates: Record<string, string | null> = {};
    if (dto.firstName != null && dto.firstName.trim()) updates.firstName = dto.firstName.trim();
    if (dto.lastName != null && dto.lastName.trim()) updates.lastName = dto.lastName.trim();
    if (dto.displayName != null) updates.displayName = dto.displayName.trim() || null;
    if (dto.phoneNumber != null) updates.phoneNumber = dto.phoneNumber.trim() || null;
    if (dto.dateOfBirth != null) updates.dateOfBirth = dto.dateOfBirth.trim() || null;
    if (dto.nationality != null) updates.nationality = dto.nationality.trim() || null;
    if (dto.address != null) updates.address = dto.address.trim() || null;
    if (dto.profileImageUrl != null) updates.profileImageUrl = dto.profileImageUrl.trim() || null;
    if (dto.coverImageUrl != null) updates.coverImageUrl = dto.coverImageUrl.trim() || null;
    if (Object.keys(updates).length === 0) return this.findById(userId);
    return UserModel.findByIdAndUpdate(userId, { $set: updates }, { new: true }).exec();
  }
}
