import { Body, Controller, Post, Get, Patch, Param, Request, UseGuards } from '@nestjs/common';
import { AuthService, AuthResult } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
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

  /** SA or Admin with head: add Admin or Instructor. No password = set-password email. */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'admin')
  @Post('create-user')
  async createUser(
    @Body() dto: CreateUserDto,
    @Request() req: { user: { id: string; email: string; firstName: string; lastName: string; role: string; canManageUsers?: boolean } },
  ): Promise<AuthResult | { message: string; user: AuthResult['user'] }> {
    return this.authService.createUser(dto, req.user);
  }

  /** Authenticated user: change own password. */
  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(
    @Body() dto: ChangePasswordDto,
    @Request() req: { user: { id: string } },
  ): Promise<{ message: string }> {
    return this.authService.changePassword(req.user.id, dto.currentPassword, dto.newPassword);
  }

  /** Authenticated user: update own profile (first name, last name only; role and email/username are read-only). */
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(
    @Body() dto: UpdateProfileDto,
    @Request() req: { user: { id: string } },
  ) {
    const user = await this.authService.updateProfile(req.user.id, {
      firstName: dto.firstName,
      lastName: dto.lastName,
    });
    return { user };
  }

  @Get('me')
  async me(@Request() req: { user: { id: string; email: string; firstName: string; lastName: string; role: string; profileImageUrl?: string | null; canManageUsers?: boolean } }) {
    const u = req.user;
    const user: Record<string, unknown> = {
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      name: `${u.firstName} ${u.lastName}`.trim(),
      role: u.role ?? 'student',
      profileImageUrl: u.profileImageUrl ?? null,
    };
    if (u.role === 'admin' && u.canManageUsers === true) (user as any).canManageUsers = true;
    return { user };
  }

  /** SA and Admin: list courses (for assigning instructors on Add User). */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'admin')
  @Get('courses')
  async listCourses() {
    return this.authService.listCourses();
  }

  /** SA or Admin with head: create a course (name only) so it can be assigned to instructors. */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'admin')
  @Post('courses')
  async createCourse(
    @Body() body: { name: string },
    @Request() req: { user: { role: string; canManageUsers?: boolean } },
  ) {
    return this.authService.createCourse(body.name?.trim() || 'New Course', req.user);
  }

  /** SA: all users + batchesByCourse. Admin: instructors + students (view-only; no C,U,D until SA grants head option). */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'admin')
  @Get('users')
  async listUsers(
    @Request() req: { user: { id: string; email: string; firstName: string; lastName: string; role: string } },
  ) {
    return this.authService.listUsers(req.user);
  }

  /** SA or Admin with head permission: toggle user active status and send email. */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'admin')
  @Patch('users/:id/status')
  async setUserStatus(
    @Param('id') id: string,
    @Body() body: { active: boolean },
    @Request() req: { user: { id: string; role: string; canManageUsers?: boolean } },
  ) {
    return this.authService.setUserStatus(id, body.active === true, req.user);
  }

  /** SA only: grant or revoke head permission for an Admin. That Admin can then add users and set user status. */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin')
  @Patch('users/:id/head')
  async setHeadPermission(
    @Param('id') id: string,
    @Body() body: { head: boolean },
    @Request() req: { user: { role: string } },
  ) {
    return this.authService.setHeadPermission(id, body.head === true, req.user);
  }
}
