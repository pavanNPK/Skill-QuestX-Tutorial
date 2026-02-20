import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { MailService } from '../mail/mail.service';

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

  async register(dto: RegisterDto): Promise<AuthResult> {
    const user = await this.userService.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: dto.password,
      phoneCountry: dto.phoneCountry,
      phoneNumber: dto.phoneNumber,
      underGraduate: dto.underGraduate,
      profileImageUrl: dto.profileImageUrl,
      resumeUrl: dto.resumeUrl,
      skills: dto.skills,
    });
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

  /** Forgot password: only send OTP if user exists. Always return same message (no email enumeration). */
  async sendOtpForForgotPassword(email: string): Promise<{ message: string }> {
    const normalized = email.toLowerCase().trim();
    const user = await this.userService.findByEmail(normalized);
    const genericMessage = 'If an account exists with this email, you will receive an OTP.';
    if (!user) {
      return { message: genericMessage };
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000);
    await this.userService.setOtp(user._id.toString(), otp, expiresAt);
    await this.mailService.sendOtp(normalized, otp);
    return { message: genericMessage };
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
      },
    };
  }
}
