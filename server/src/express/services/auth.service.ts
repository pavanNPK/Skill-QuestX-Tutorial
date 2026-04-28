import { randomBytes } from 'crypto';
import jwt = require('jsonwebtoken');
import { env } from '../config/env';
import { ROLES } from '../constants/roles';
import type { UserDocument } from '../models/user.model';
import { badRequest, forbidden, unauthorized } from '../utils/http-error';
import type { BatchService } from './batch.service';
import type { CourseService } from './course.service';
import type { MailService } from './mail.service';
import type { NotificationService } from './notification.service';
import type { CreateUserDto, UserService } from './user.service';

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
    canManageUsers?: boolean;
  };
}

interface PendingOtp {
  otp: string;
  expiresAt: Date;
}

export class AuthService {
  private readonly pendingOtps = new Map<string, PendingOtp>();

  constructor(
    private readonly userService: UserService,
    private readonly courseService: CourseService,
    private readonly batchService: BatchService,
    private readonly mailService: MailService,
    private readonly notificationService: NotificationService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;
    return (await this.userService.validatePassword(user, password)) ? user : null;
  }

  async login(dto: { email: string; password: string }): Promise<AuthResult> {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) throw unauthorized('Invalid email or password');
    if (user.isActive === false) {
      throw unauthorized('Your account has been deactivated. Please contact your administrator to reactivate your account.');
    }
    return this.issueToken(user);
  }

  async register(dto: CreateUserDto): Promise<AuthResult> {
    const user = await this.userService.create({ ...dto, role: 'student' });
    await this.mailService.sendRegistrationSuccess(user.email, `${user.firstName} ${user.lastName}`.trim());
    return this.issueToken(user);
  }

  async createUser(dto: CreateUserDto & { courseIds?: string[] }, currentUser: { role: string; canManageUsers?: boolean }): Promise<AuthResult | { message: string; user: AuthResult['user'] }> {
    const canCreate = currentUser.role === ROLES.SUPER_ADMIN || (currentUser.role === ROLES.ADMIN && currentUser.canManageUsers === true);
    if (!canCreate) throw forbidden('Only Super Admin or an Admin with head permission can add users.');
    if (currentUser.role === ROLES.ADMIN && dto.role === 'admin') throw forbidden('Admins can only add Instructors, not other Admins.');

    const hasPassword = dto.password != null && dto.password.length >= 8;
    if (hasPassword) {
      const user = await this.userService.create(dto);
      await this.assignInstructorCourses(user, dto.courseIds);
      return this.issueToken(user);
    }

    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const user = await this.userService.createWithSetPasswordToken(dto, token, expiresAt);
    const setPasswordLink = `${env.clientUrl.replace(/\/$/, '')}/set-password?token=${token}`;
    await this.mailService.sendSetPasswordEmail(user.email, setPasswordLink, user.role ?? dto.role ?? 'user');
    await this.assignInstructorCourses(user, dto.courseIds);

    return {
      message: 'Invitation sent. They will receive an email to set their password and can then log in.',
      user: this.toAuthUser(user, user.role ?? dto.role ?? 'student'),
    };
  }

  async setPassword(token: string, newPassword: string): Promise<{ message: string; user: AuthResult['user'] }> {
    const userByToken = await this.userService.findBySetPasswordToken(token);
    if (!userByToken) throw badRequest('Invalid or expired set-password link. Request a new one from your admin.');
    if (userByToken.isActive === false) {
      throw badRequest('Your account has been deactivated. Please contact your administrator to reactivate your account.');
    }
    const user = await this.userService.setPasswordByToken(token, newPassword);
    if (!user) throw badRequest('Invalid or expired set-password link. Request a new one from your admin.');
    const name = `${user.firstName} ${user.lastName}`.trim();
    await this.mailService.sendPasswordSetSuccess(user.email, name, user.role ?? 'student');
    return { message: 'Password set. You can now log in.', user: this.toAuthUser(user, user.role ?? 'student') };
  }

  async listUsers(currentUser: { id: string; role: string }) {
    if (![ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(currentUser.role as any)) {
      throw forbidden('You do not have permission to view users.');
    }

    if (currentUser.role === ROLES.ADMIN) {
      const [instructorsSafe, studentsSafe] = await Promise.all([
        this.userService.listByRolesSafe([ROLES.INSTRUCTOR]),
        this.userService.listByRolesSafe([ROLES.STUDENT]),
      ]);
      const instructors = await Promise.all(instructorsSafe.map(async (u) => ({
        ...u,
        courseCount: await this.courseService.countByInstructorId(u.id),
        batchCount: await this.batchService.countBatchesByInstructorId(u.id),
      })));
      return { view: 'admin', instructors, students: studentsSafe };
    }

    const [admins, instructorsSafe, students, allBatches, allCourses] = await Promise.all([
      this.userService.listByRolesSafe([ROLES.ADMIN]),
      this.userService.listByRolesSafe([ROLES.INSTRUCTOR]),
      this.userService.listByRolesSafe([ROLES.STUDENT]),
      this.batchService.findAll(),
      this.courseService.findAll(),
    ]);
    const instructors = await Promise.all(instructorsSafe.map(async (u) => ({
      ...u,
      courseCount: await this.courseService.countByInstructorId(u.id),
      batchCount: await this.batchService.countBatchesByInstructorId(u.id),
    })));

    const courseMap = new Map(allCourses.map((c: any) => [c._id.toString(), c]));
    const batchesByCourse: any[] = [];
    const processedBatches = new Set<string>();
    for (const b of allBatches as any[]) {
      const batchId = b._id.toString();
      if (processedBatches.has(batchId)) continue;
      processedBatches.add(batchId);
      const courseId = (b.courseId?._id ?? b.courseId)?.toString?.() ?? b.courseId?.toString?.();
      const course = courseId ? courseMap.get(courseId) : null;
      const courseName = course?.name ?? 'Unknown';
      const studentList = await this.userService.listByIdsSafe(b.studentIds ?? []);
      let group = batchesByCourse.find((g) => g.courseId === courseId);
      if (!group) {
        group = { courseId: courseId ?? batchId, courseName, batches: [] };
        batchesByCourse.push(group);
      }
      group.batches.push({ batchId, batchName: b.name ?? 'Batch', courseName, students: studentList });
    }
    return { view: 'sa', admins, instructors, students, batchesByCourse };
  }

  async listCourses(): Promise<Array<{ id: string; name: string }>> {
    const courses = await this.courseService.findAll();
    return courses.map((c) => ({ id: c._id.toString(), name: c.name }));
  }

  async createCourse(name: string, currentUser: { role: string; canManageUsers?: boolean }): Promise<{ id: string; name: string }> {
    const canCreate = currentUser.role === ROLES.SUPER_ADMIN || (currentUser.role === ROLES.ADMIN && currentUser.canManageUsers === true);
    if (!canCreate) throw forbidden('Only Super Admin or an Admin with head permission can create courses.');
    const course = await this.courseService.create(name);
    return { id: course._id.toString(), name: course.name };
  }

  async setUserStatus(userId: string, active: boolean, currentUser: { id: string; role: string; canManageUsers?: boolean }) {
    const canSet = currentUser.role === ROLES.SUPER_ADMIN || (currentUser.role === ROLES.ADMIN && currentUser.canManageUsers === true);
    if (!canSet) throw forbidden('Only Super Admin or an Admin with head permission can activate or deactivate users.');
    const target = await this.userService.findById(userId);
    if (!target) throw badRequest('User not found.');
    const targetRole = target.role ?? 'student';
    if (currentUser.role === ROLES.ADMIN && [ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(targetRole as any)) {
      throw forbidden('Admins can only activate or deactivate Instructors and Students.');
    }
    const updated = await this.userService.setActive(userId, active);
    if (!updated) throw badRequest('User not found.');
    const name = `${updated.firstName} ${updated.lastName}`.trim();
    try {
      if (active) await this.mailService.sendAccountActivated(updated.email, name);
      else await this.mailService.sendAccountDeactivated(updated.email, name);
    } catch (e) {
      console.warn('Failed to send activation/deactivation email', e);
    }
    return { user: { ...this.toSafeUser(updated), role: targetRole } };
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{ message: string }> {
    const user = await this.userService.findById(userId);
    if (!user) throw unauthorized('User not found.');
    if (!(await this.userService.validatePassword(user, currentPassword))) throw unauthorized('Current password is incorrect.');
    await this.userService.updatePassword(userId, newPassword);
    return { message: 'Password updated successfully. Please sign in again with your new password.' };
  }

  async updateProfile(userId: string, dto: { firstName?: string; lastName?: string }): Promise<AuthResult['user']> {
    const user = await this.userService.updateProfile(userId, dto);
    if (!user) throw unauthorized('User not found.');
    return this.toAuthUser(user, user.role ?? 'student');
  }

  async setHeadPermission(userId: string, head: boolean, currentUser: { role: string }) {
    if (currentUser.role !== ROLES.SUPER_ADMIN) throw forbidden('Only Super Admin can grant or revoke head permission.');
    const updated = await this.userService.setCanManageUsers(userId, head);
    if (!updated) throw badRequest('User not found or is not an Admin.');
    return { user: { ...this.toSafeUser(updated), canManageUsers: updated.canManageUsers === true } };
  }

  async sendOtp(email: string): Promise<{ message: string }> {
    this.purgeExpiredPendingOtps();
    const normalized = email.toLowerCase().trim();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000);
    const user = await this.userService.findByEmail(normalized);
    if (user) await this.userService.setOtp(user._id.toString(), otp, expiresAt);
    else this.pendingOtps.set(normalized, { otp, expiresAt });
    await this.mailService.sendOtp(normalized, otp);
    return { message: 'If this email is registered, you will receive an OTP.' };
  }

  async verifyOtp(email: string, otp: string): Promise<{ valid: boolean }> {
    const normalized = email.toLowerCase().trim();
    const user = await this.userService.findByEmail(normalized);
    if (user?.otpCode && user.otpExpiresAt) {
      if (user.otpExpiresAt < new Date() || user.otpCode !== otp) return { valid: false };
      await this.userService.clearOtp(user._id.toString());
      return { valid: true };
    }
    const pending = this.pendingOtps.get(normalized);
    if (!pending || pending.expiresAt < new Date() || pending.otp !== otp) return { valid: false };
    this.pendingOtps.delete(normalized);
    return { valid: true };
  }

  async sendOtpForForgotPassword(email: string): Promise<{ message: string; sent: boolean }> {
    const normalized = email.toLowerCase().trim();
    const user = await this.userService.findByEmail(normalized);
    if (!user) return { message: 'No account found with this email address.', sent: false };
    if (user.isActive === false) {
      return { message: 'Your account has been deactivated. Please contact your administrator to reactivate your account before resetting your password.', sent: false };
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.userService.setOtp(user._id.toString(), otp, new Date(Date.now() + 3 * 60 * 1000));
    await this.mailService.sendOtp(normalized, otp);
    return { message: 'OTP has been sent to your email. Check your inbox.', sent: true };
  }

  async resetPassword(email: string, otp: string, newPassword: string): Promise<{ message: string }> {
    const user = await this.userService.findByEmail(email.toLowerCase().trim());
    if (!user || !user.otpCode || !user.otpExpiresAt) throw unauthorized('Invalid or expired OTP');
    if (user.isActive === false) throw unauthorized('Your account has been deactivated. Please contact your administrator to reactivate your account.');
    if (user.otpExpiresAt < new Date() || user.otpCode !== otp) throw unauthorized('Invalid or expired OTP');
    await this.userService.updatePassword(user._id.toString(), newPassword);
    await this.userService.clearOtp(user._id.toString());
    return { message: 'Password has been reset. You can now log in.' };
  }

  private issueToken(user: UserDocument): AuthResult {
    const access_token = jwt.sign({ sub: user._id.toString(), email: user.email }, env.jwtSecret, { expiresIn: env.jwtExpiresIn as any });
    return { access_token, user: this.toAuthUser(user, user.role ?? 'student') };
  }

  private toAuthUser(user: UserDocument, role: string): AuthResult['user'] {
    const payload: AuthResult['user'] = {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      name: `${user.firstName} ${user.lastName}`.trim(),
      role,
      profileImageUrl: user.profileImageUrl ?? null,
    };
    if (role === ROLES.ADMIN && user.canManageUsers === true) payload.canManageUsers = true;
    return payload;
  }

  private toSafeUser(user: UserDocument) {
    return {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      name: `${user.firstName} ${user.lastName}`.trim(),
      role: user.role ?? 'student',
      isActive: user.isActive !== false,
    };
  }

  private async assignInstructorCourses(user: UserDocument, courseIds?: string[]): Promise<void> {
    if (user.role !== ROLES.INSTRUCTOR || !courseIds?.length) return;
    await this.courseService.addInstructorToCourses(user._id.toString(), courseIds);
    const courses = await this.courseService.findNamesByIds(courseIds);
    const courseNames = courses.map((c) => c.name);
    try {
      await this.mailService.sendInstructorAssignedToCourse(user.email, `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(), courseNames);
    } catch (e) {
      console.warn('Failed to send instructor-assigned email', e);
    }
    await this.notificationService.create({
      userId: user._id.toString(),
      title: courseNames.length ? `You've been assigned to: ${courseNames.join(', ')}` : "You've been assigned to course(s)",
      message: 'An administrator assigned you to these courses. You can now manage tasks and batches.',
      type: 'instructor_assigned_to_course',
      link: '/courses',
      metadata: { courseIds, courseNames },
    });
  }

  private purgeExpiredPendingOtps(): void {
    const now = new Date();
    for (const [email, entry] of this.pendingOtps.entries()) {
      if (entry.expiresAt < now) this.pendingOtps.delete(email);
    }
  }
}
