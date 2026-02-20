import { Body, Controller, Post, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService, AuthResult } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { Public } from './decorators/public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

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

  @Public()
  @Post('set-password')
  async setPassword(@Body() dto: SetPasswordDto): Promise<{ message: string; user: AuthResult['user'] }> {
    return this.authService.setPassword(dto.token, dto.newPassword);
  }

  /** SA and Admin only: add Admin or Instructor. Students use public /register. No password = send set-password email. */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'admin')
  @Post('create-user')
  async createUser(
    @Body() dto: CreateUserDto,
    @Request() req: { user: { id: string; email: string; firstName: string; lastName: string; role: string } },
  ): Promise<AuthResult | { message: string; user: AuthResult['user'] }> {
    return this.authService.createUser(dto, req.user);
  }

  @Get('me')
  async me(@Request() req: { user: { id: string; email: string; firstName: string; lastName: string; role: string } }) {
    const u = req.user;
    return {
      user: {
        id: u.id,
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        name: `${u.firstName} ${u.lastName}`.trim(),
        role: u.role ?? 'student',
      },
    };
  }

  /** SA and Admin only: list Admins and Instructors. */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'admin')
  @Get('users')
  async listUsers(
    @Request() req: { user: { id: string; email: string; firstName: string; lastName: string; role: string } },
  ) {
    return this.authService.listUsers(req.user);
  }
}
