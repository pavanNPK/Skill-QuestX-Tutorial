import { Body, Controller, Post, Get, Request } from '@nestjs/common';
import { AuthService, AuthResult } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto): Promise<AuthResult> {
    return this.authService.login(dto);
  }

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<AuthResult> {
    return this.authService.register(dto);
  }

  @Public()
  @Post('send-otp')
  async sendOtp(@Body() body: { email: string }): Promise<{ message: string }> {
    return this.authService.sendOtp(body.email);
  }

  @Public()
  @Post('verify-otp')
  async verifyOtp(@Body() dto: VerifyOtpDto): Promise<{ valid: boolean }> {
    return this.authService.verifyOtp(dto.email, dto.otp);
  }

  @Public()
  @Post('forgot-password/send-otp')
  async forgotPasswordSendOtp(@Body() body: { email: string }): Promise<{ message: string }> {
    return this.authService.sendOtpForForgotPassword(body.email);
  }

  @Public()
  @Post('forgot-password/reset')
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<{ message: string }> {
    return this.authService.resetPassword(dto.email, dto.otp, dto.newPassword);
  }

  @Get('me')
  async me(@Request() req: { user: { id: string; email: string; firstName: string; lastName: string } }) {
    const u = req.user;
    return {
      user: {
        id: u.id,
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        name: `${u.firstName} ${u.lastName}`.trim(),
      },
    };
  }
}
