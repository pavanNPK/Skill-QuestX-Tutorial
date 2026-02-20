import { Injectable, UnauthorizedException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { UserDocument } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { MailService } from '../mail/mail.service';
import { CREATABLE_BY_SA_ROLES } from '../user/constants/roles';

export interface JwtPayload {
  sub: string;
  email: string;
}

export interface AuthResult {
  access_token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    name: string;
    role: string;
  };
}

interface PendingOtp {
  otp: string;
  expiresAt: Date;
}

@Injectable()
export class AuthService {
  private readonly pendingOtps = new Map<string, PendingOtp>();

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;
    const valid = await this.userService.validatePassword(user, password);
    return valid ? user : null;
  }

  async login(dto: LoginDto): Promise<AuthResult> {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.issueToken(user);
  }

  /** Create Admin or Instructor. SA can add Admin or Instructor; Admin can only add Instructor. No password = send set-password email. */
  async createUser(
    dto: CreateUserDto,
    currentUser: { role: string },
  ): Promise<AuthResult | { message: string; user: AuthResult['user'] }> {
    const allowed = ['super_admin', 'admin'];
    if (!allowed.includes(currentUser.role)) {
      throw new ForbiddenException('Only Super Admin or Admin can add users.');
    }
    if (currentUser.role === 'admin' && dto.role === 'admin') {
      throw new ForbiddenException('Admins can only add Instructors, not other Admins.');
    }
    const hasPassword = dto.password != null && dto.password.length >= 8;
    if (hasPassword) {
      const user = await this.userService.create({
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        password: dto.password,
        role: dto.role,
        phoneCountry: dto.phoneCountry,
        phoneNumber: dto.phoneNumber,
      });
      return this.issueToken(user);
    }
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const user = await this.userService.createWithSetPasswordToken(
      {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        role: dto.role,
        phoneCountry: dto.phoneCountry,
        phoneNumber: dto.phoneNumber,
      },
      token,
      expiresAt,
    );
    const clientUrl = (this.configService.get<string>('CLIENT_URL') || 'http://localhost:4200').replace(/\/$/, '');
    const setPasswordLink = `${clientUrl}/set-password?token=${token}`;
    await this.mailService.sendSetPasswordEmail(user.email, setPasswordLink, user.role ?? dto.role);
    return {
      message: 'Invitation sent. They will receive an email to set their password and can then log in.',
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        name: `${user.firstName} ${user.lastName}`.trim(),
        role: user.role ?? dto.role,
      },
    };
  }

  /** Set password using token from invite email. Public. */
  async setPassword(token: string, newPassword: string): Promise<{ message: string; user: AuthResult['user'] }> {
    const user = await this.userService.setPasswordByToken(token, newPassword);
    if (!user) {
      throw new BadRequestException('Invalid or expired set-password link. Request a new one from your admin.');
    }
    const name = `${user.firstName} ${user.lastName}`.trim();
    await this.mailService.sendPasswordSetSuccess(user.email, name, user.role ?? 'student');
    return {
      message: 'Password set. You can now log in.',
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        name,
        role: user.role ?? 'student',
      },
    };
  }

  /** List Admins and Instructors. SA and Admin only. */
  async listUsers(currentUser: { role: string }): Promise<{ users: Array<AuthResult['user']> }> {
    if (!['super_admin', 'admin'].includes(currentUser.role)) {
      throw new ForbiddenException('Only Super Admin or Admin can list users.');
    }
    const users = await this.userService.listByRoles([...CREATABLE_BY_SA_ROLES]);
    return {
      users: users.map((u) => ({
        id: u._id.toString(),
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        name: `${u.firstName} ${u.lastName}`.trim(),
        role: u.role ?? 'student',
      })),
    };
  }

  /** Public registration: students only. Admin/Instructor are added by SA/A via createUser. */
  async register(dto: RegisterDto): Promise<AuthResult> {
    const user = await this.userService.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: dto.password,
      role: 'student',
      phoneCountry: dto.phoneCountry,
      phoneNumber: dto.phoneNumber,
      underGraduate: dto.underGraduate,
      profileImageUrl: dto.profileImageUrl,
      resumeUrl: dto.resumeUrl,
      skills: dto.skills,
    });
    const name = `${user.firstName} ${user.lastName}`.trim();
    await this.mailService.sendRegistrationSuccess(user.email, name);
    return this.issueToken(user);
  }

  async sendOtp(email: string): Promise<{ message: string }> {
    const normalized = email.toLowerCase().trim();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes
    const user = await this.userService.findByEmail(normalized);
    if (user) {
      await this.userService.setOtp(user._id.toString(), otp, expiresAt);
    } else {
      this.pendingOtps.set(normalized, { otp, expiresAt });
    }
    await this.mailService.sendOtp(normalized, otp);
    return { message: 'If this email is registered, you will receive an OTP.' };
  }

  async verifyOtp(email: string, otp: string): Promise<{ valid: boolean }> {
    const normalized = email.toLowerCase().trim();
    const user = await this.userService.findByEmail(normalized);
    if (user?.otpCode && user.otpExpiresAt) {
      if (user.otpExpiresAt < new Date() || user.otpCode !== otp) {
        return { valid: false };
      }
      await this.userService.clearOtp(user._id.toString());
      return { valid: true };
    }
    const pending = this.pendingOtps.get(normalized);
    if (!pending || pending.expiresAt < new Date() || pending.otp !== otp) {
      return { valid: false };
    }
    this.pendingOtps.delete(normalized);
    return { valid: true };
  }

  /** Forgot password: send OTP only if user exists. Return specific message for client. */
  async sendOtpForForgotPassword(email: string): Promise<{ message: string; sent: boolean }> {
    const normalized = email.toLowerCase().trim();
    const user = await this.userService.findByEmail(normalized);
    if (!user) {
      return { message: 'No account found with this email address.', sent: false };
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000);
    await this.userService.setOtp(user._id.toString(), otp, expiresAt);
    await this.mailService.sendOtp(normalized, otp);
    return { message: 'OTP has been sent to your email. Check your inbox.', sent: true };
  }

  /** Reset password after OTP verified. */
  async resetPassword(email: string, otp: string, newPassword: string): Promise<{ message: string }> {
    const normalized = email.toLowerCase().trim();
    const user = await this.userService.findByEmail(normalized);
    if (!user || !user.otpCode || !user.otpExpiresAt) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }
    if (user.otpExpiresAt < new Date() || user.otpCode !== otp) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }
    await this.userService.updatePassword(user._id.toString(), newPassword);
    await this.userService.clearOtp(user._id.toString());
    return { message: 'Password has been reset. You can now log in.' };
  }

  private issueToken(user: UserDocument): AuthResult {
    const payload: JwtPayload = { sub: user._id.toString(), email: user.email };
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        name: `${user.firstName} ${user.lastName}`.trim(),
        role: user.role ?? 'student',
      },
    };
  }
}
