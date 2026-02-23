import { Injectable, UnauthorizedException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { UserDocument } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';
import { CourseService } from '../course/course.service';
import { BatchService } from '../batch/batch.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { MailService } from '../mail/mail.service';
import { CREATABLE_BY_SA_ROLES } from '../user/constants/roles';
import { ROLES } from '../user/constants/roles';

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
    profileImageUrl?: string | null;
  };
}

interface PendingOtp {
  otp: string;
  expiresAt: Date;
}

export interface SafeUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  role: string;
  isActive: boolean;
}

export interface InstructorWithStats extends SafeUser {
  courseCount: number;
  batchCount: number;
}

export interface BatchWithStudents {
  batchId: string;
  batchName: string;
  courseName: string;
  students: SafeUser[];
}

export interface CourseWithBatches {
  courseId: string;
  courseName: string;
  batches: BatchWithStudents[];
}

export interface ListUsersResponseSA {
  admins: SafeUser[];
  instructors: InstructorWithStats[];
  students: SafeUser[];
  batchesByCourse: CourseWithBatches[];
}

export interface ListUsersResponseAdmin {
  instructors: InstructorWithStats[];
  students: SafeUser[];
}

export interface ListUsersResponseInstructor {
  students: SafeUser[];
}

@Injectable()
export class AuthService {
  private readonly pendingOtps = new Map<string, PendingOtp>();

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private batchService: BatchService,
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
    if ((user as any).isActive === false) {
      throw new UnauthorizedException(
        'Your account has been deactivated. Please contact your administrator to reactivate your account.',
      );
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
      if (dto.role === 'instructor' && dto.courseIds?.length) {
        await this.courseService.addInstructorToCourses(user._id.toString(), dto.courseIds);
      }
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
    if (dto.role === 'instructor' && dto.courseIds?.length) {
      await this.courseService.addInstructorToCourses(user._id.toString(), dto.courseIds);
    }
    return {
      message: 'Invitation sent. They will receive an email to set their password and can then log in.',
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        name: `${user.firstName} ${user.lastName}`.trim(),
        role: user.role ?? dto.role,
        profileImageUrl: user.profileImageUrl ?? null,
      },
    };
  }

  /** Set password using token from invite email. Public. */
  async setPassword(token: string, newPassword: string): Promise<{ message: string; user: AuthResult['user'] }> {
    const userByToken = await this.userService.findBySetPasswordToken(token);
    if (!userByToken) {
      throw new BadRequestException('Invalid or expired set-password link. Request a new one from your admin.');
    }
    if ((userByToken as any).isActive === false) {
      throw new BadRequestException(
        'Your account has been deactivated. Please contact your administrator to reactivate your account.',
      );
    }
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
        profileImageUrl: user.profileImageUrl ?? null,
      },
    };
  }

  /** List users by role: SA sees all + batchesByCourse; Admin sees instructors + students; Instructor sees only their students. */
  async listUsers(
    currentUser: { id: string; role: string },
  ): Promise<
    | ({ view: 'sa' } & ListUsersResponseSA)
    | ({ view: 'admin' } & ListUsersResponseAdmin)
    | ({ view: 'instructor' } & ListUsersResponseInstructor)
  > {
    if (![ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INSTRUCTOR].includes(currentUser.role as any)) {
      throw new ForbiddenException('You do not have permission to view users.');
    }

    if (currentUser.role === ROLES.INSTRUCTOR) {
      const studentIds = await this.batchService.getStudentIdsForInstructor(currentUser.id);
      const students = await this.userService.listByIdsSafe(studentIds);
      return { view: 'instructor', students };
    }

    if (currentUser.role === ROLES.ADMIN) {
      const [instructorsSafe, studentsSafe] = await Promise.all([
        this.userService.listByRolesSafe([ROLES.INSTRUCTOR]),
        this.userService.listByRolesSafe([ROLES.STUDENT]),
      ]);
      const instructorStats = await Promise.all(
        instructorsSafe.map(async (u) => ({
          ...u,
          courseCount: await this.courseService.countByInstructorId(u.id),
          batchCount: await this.batchService.countBatchesByInstructorId(u.id),
        })),
      );
      return { view: 'admin', instructors: instructorStats, students: studentsSafe };
    }

    // Super Admin: admins, instructors (with stats), students, batchesByCourse
    const [adminsSafe, instructorsSafe, studentsSafe, allBatches, allCourses] = await Promise.all([
      this.userService.listByRolesSafe([ROLES.ADMIN]),
      this.userService.listByRolesSafe([ROLES.INSTRUCTOR]),
      this.userService.listByRolesSafe([ROLES.STUDENT]),
      this.batchService.findAll(),
      this.courseService.findAll(),
    ]);

    const instructorStats = await Promise.all(
      instructorsSafe.map(async (u) => ({
        ...u,
        courseCount: await this.courseService.countByInstructorId(u.id),
        batchCount: await this.batchService.countBatchesByInstructorId(u.id),
      })),
    );

    const courseMap = new Map(allCourses.map((c: any) => [c._id.toString(), c]));
    const batchesByCourse: CourseWithBatches[] = [];
    const processedBatches = new Set<string>();

    for (const b of allBatches as any[]) {
      const batchId = b._id.toString();
      if (processedBatches.has(batchId)) continue;
      processedBatches.add(batchId);
      const courseId = (b.courseId?._id ?? b.courseId)?.toString?.() ?? b.courseId?.toString?.();
      const course = courseId ? courseMap.get(courseId) : null;
      const courseName = course?.name ?? 'Unknown';
      const studentIds = b.studentIds ?? [];
      const students = await this.userService.listByIdsSafe(studentIds);
      const batchEntry: BatchWithStudents = {
        batchId,
        batchName: b.name ?? 'Batch',
        courseName,
        students,
      };
      let group = batchesByCourse.find((g) => g.courseId === courseId);
      if (!group) {
        group = { courseId: courseId ?? batchId, courseName, batches: [] };
        batchesByCourse.push(group);
      }
      group.batches.push(batchEntry);
    }

    return {
      view: 'sa',
      admins: adminsSafe,
      instructors: instructorStats,
      students: studentsSafe,
      batchesByCourse,
    };
  }

  /** List courses for SA/Admin (assign instructors). Returns only id and name. */
  async listCourses(): Promise<Array<{ id: string; name: string }>> {
    const courses = await this.courseService.findAll();
    return courses.map((c) => ({
      id: c._id.toString(),
      name: c.name,
    }));
  }

  /** SA only: create a course by name. */
  async createCourse(name: string): Promise<{ id: string; name: string }> {
    const course = await this.courseService.create(name);
    return { id: course._id.toString(), name: course.name };
  }

  /** SA: can activate/deactivate any user. Admin: only instructor and student. */
  async setUserStatus(
    userId: string,
    active: boolean,
    currentUser: { id: string; role: string },
  ): Promise<{ user: SafeUser }> {
    if (currentUser.role !== ROLES.SUPER_ADMIN && currentUser.role !== ROLES.ADMIN) {
      throw new ForbiddenException('Only Super Admin or Admin can activate or deactivate users.');
    }
    const target = await this.userService.findById(userId);
    if (!target) {
      throw new BadRequestException('User not found.');
    }
    const targetRole = (target as any).role ?? 'student';
    if (currentUser.role === ROLES.ADMIN) {
      if (targetRole === ROLES.SUPER_ADMIN || targetRole === ROLES.ADMIN) {
        throw new ForbiddenException('Admins can only activate or deactivate Instructors and Students.');
      }
    }
    const updated = await this.userService.setActive(userId, active);
    if (!updated) {
      throw new BadRequestException('User not found.');
    }
    const name = `${updated.firstName} ${updated.lastName}`.trim();
    try {
      if (active) {
        await this.mailService.sendAccountActivated(updated.email, name);
      } else {
        await this.mailService.sendAccountDeactivated(updated.email, name);
      }
    } catch (e) {
      // Do not fail status update if notification email fails
      console.warn('Failed to send activation/deactivation email', e);
    }
    return {
      user: {
        id: updated._id.toString(),
        email: updated.email,
        firstName: updated.firstName,
        lastName: updated.lastName,
        name,
        role: targetRole,
        isActive: (updated as any).isActive !== false,
      },
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

  /** Remove expired OTPs from in-memory map to avoid unbounded growth. */
  private purgeExpiredPendingOtps(): void {
    const now = new Date();
    for (const [email, entry] of this.pendingOtps.entries()) {
      if (entry.expiresAt < now) this.pendingOtps.delete(email);
    }
  }

  async sendOtp(email: string): Promise<{ message: string }> {
    this.purgeExpiredPendingOtps();
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

  /** Forgot password: send OTP only if user exists and is active. */
  async sendOtpForForgotPassword(email: string): Promise<{ message: string; sent: boolean }> {
    const normalized = email.toLowerCase().trim();
    const user = await this.userService.findByEmail(normalized);
    if (!user) {
      return { message: 'No account found with this email address.', sent: false };
    }
    if ((user as any).isActive === false) {
      return {
        message: 'Your account has been deactivated. Please contact your administrator to reactivate your account before resetting your password.',
        sent: false,
      };
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
    if ((user as any).isActive === false) {
      throw new UnauthorizedException(
        'Your account has been deactivated. Please contact your administrator to reactivate your account.',
      );
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
        profileImageUrl: user.profileImageUrl ?? null,
      },
    };
  }
}
