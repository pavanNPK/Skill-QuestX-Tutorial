/** Service file: contains business rules and database coordination; controllers call these methods after route validation. */
import { randomBytes } from 'crypto';
import jwt = require('jsonwebtoken');
import { env } from '../../core/config/env';
import { ROLES } from '../../core/constants/roles';
import type { UserDocument } from '../../data/models/user.model';
import { badRequest, forbidden, unauthorized } from '../../core/utils/http-error';
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
    displayName?: string | null;
    name: string;
    role: string;
    phoneNumber?: string | null;
    dateOfBirth?: string | null;
    nationality?: string | null;
    address?: string | null;
    profileImageUrl?: string | null;
    coverImageUrl?: string | null;
    canManageUsers?: boolean;
  };
}

interface PendingOtp {
  otp: string;
  expiresAt: Date;
}

export class AuthService {
  // use of this is:
  // Temporary OTP storage for emails that do not yet have a user record.
  // Existing users store OTPs in MongoDB; non-existing registration emails use this in-memory map.
  private readonly pendingOtps = new Map<string, PendingOtp>();

  constructor(
    private readonly userService: UserService,
    private readonly courseService: CourseService,
    private readonly batchService: BatchService,
    private readonly mailService: MailService,
    private readonly notificationService: NotificationService,
  ) {}

  // use of this is:
  // Validate login credentials without creating a token yet.
  // It returns the user document only when both email and password are correct.
  async validateUser(email: string, password: string): Promise<UserDocument | null> {
    // Find user by email first; if email is wrong, there is no password to compare.
    const user = await this.userService.findByEmail(email);
    // Return null instead of throwing so login() can use one generic error message.
    if (!user) return null;
    // Compare plain password with stored hash through UserService; never compare hashes here manually.
    return (await this.userService.validatePassword(user, password)) ? user : null;
  }

  // use of this is:
  // Main login flow called by AuthController after DTO validation.
  // It checks credentials, rejects inactive accounts, then returns JWT + safe user data.
  async login(dto: { email: string; password: string }): Promise<AuthResult> {
    // Validate the email/password pair and get the full user document if valid.
    const user = await this.validateUser(dto.email, dto.password);
    // Use one generic error so attackers cannot know whether email or password was wrong.
    if (!user) throw unauthorized('Invalid email or password');
    // Inactive users are blocked even if their password is correct.
    if (user.isActive === false) {
      throw unauthorized('Your account has been deactivated. Please contact your administrator to reactivate your account.');
    }
    // Create JWT and convert Mongo user document into the API-safe AuthResult shape.
    return this.issueToken(user);
  }

  // use of this is:
  // Public student registration. Admin/instructor creation uses createUser(), not this method.
  async register(dto: CreateUserDto): Promise<AuthResult> {
    // Force public registration role to student so users cannot self-register as admin/instructor.
    const user = await this.userService.create({ ...dto, role: 'student' });
    // Send a welcome email after the user is successfully stored.
    await this.mailService.sendRegistrationSuccess(user.email, `${user.firstName} ${user.lastName}`.trim());
    // Auto-login the newly registered student by issuing a JWT.
    return this.issueToken(user);
  }

  // use of this is:
  // Super Admin/Admin user creation flow for adding admins or instructors.
  // It supports two modes: direct password creation or invitation email with set-password token.
  async createUser(dto: CreateUserDto & { courseIds?: string[] }, currentUser: { role: string; canManageUsers?: boolean }): Promise<AuthResult | { message: string; user: AuthResult['user'] }> {
    // Only Super Admins, or Admins with head permission, can create users.
    const canCreate = currentUser.role === ROLES.SUPER_ADMIN || (currentUser.role === ROLES.ADMIN && currentUser.canManageUsers === true);
    if (!canCreate) throw forbidden('Only Super Admin or an Admin with head permission can add users.');
    // Admins cannot create other admins; this prevents privilege escalation.
    if (currentUser.role === ROLES.ADMIN && dto.role === 'admin') throw forbidden('Admins can only add Instructors, not other Admins.');

    // If a valid password is provided, create the account immediately.
    const hasPassword = dto.password != null && dto.password.length >= 8;
    if (hasPassword) {
      const user = await this.userService.create(dto);
      // If the new user is an instructor, attach selected courses to them.
      await this.assignInstructorCourses(user, dto.courseIds);
      // Return a login-style token because the user has a password now.
      return this.issueToken(user);
    }

    // No password means invite flow: generate a secure one-time set-password token.
    const token = randomBytes(32).toString('hex');
    // Token expires after 24 hours to reduce account takeover risk.
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    // Store user with token; they cannot login until they set password.
    const user = await this.userService.createWithSetPasswordToken(dto, token, expiresAt);
    // Build Angular URL used in the invitation email.
    const setPasswordLink = `${env.clientUrl.replace(/\/$/, '')}/set-password?token=${token}`;
    await this.mailService.sendSetPasswordEmail(user.email, setPasswordLink, user.role ?? dto.role ?? 'user');
    await this.assignInstructorCourses(user, dto.courseIds);

    // Return non-token response because invitee has not authenticated yet.
    return {
      message: 'Invitation sent. They will receive an email to set their password and can then log in.',
      user: this.toAuthUser(user, user.role ?? dto.role ?? 'student'),
    };
  }

  // use of this is:
  // Completes the email invite flow by turning a valid set-password token into a real password.
  async setPassword(token: string, newPassword: string): Promise<{ message: string; user: AuthResult['user'] }> {
    // Find token first so we can return a clear invalid/expired-link message.
    const userByToken = await this.userService.findBySetPasswordToken(token);
    if (!userByToken) throw badRequest('Invalid or expired set-password link. Request a new one from your admin.');
    // Do not allow deactivated invited accounts to become active by setting a password.
    if (userByToken.isActive === false) {
      throw badRequest('Your account has been deactivated. Please contact your administrator to reactivate your account.');
    }
    // Hash and save the new password, then clear token fields in UserService.
    const user = await this.userService.setPasswordByToken(token, newPassword);
    if (!user) throw badRequest('Invalid or expired set-password link. Request a new one from your admin.');
    const name = `${user.firstName} ${user.lastName}`.trim();
    // Notify the user that password setup finished successfully.
    await this.mailService.sendPasswordSetSuccess(user.email, name, user.role ?? 'student');
    // Return safe user data for UI confirmation; no token is issued here, user must login.
    return { message: 'Password set. You can now log in.', user: this.toAuthUser(user, user.role ?? 'student') };
  }

  // use of this is:
  // Returns role-specific user lists for Add Users / Users page.
  // Super Admin sees admins, instructors, students, and batches by course.
  // Admin sees only instructors and students.
  async listUsers(currentUser: { id: string; role: string }) {
    // Only Super Admin and Admin can view user-management data.
    if (![ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(currentUser.role as any)) {
      throw forbidden('You do not have permission to view users.');
    }

    // Admin view is smaller because admins are not allowed to manage other admins.
    if (currentUser.role === ROLES.ADMIN) {
      // Load instructors and students in parallel to reduce response time.
      const [instructorsSafe, studentsSafe] = await Promise.all([
        this.userService.listByRolesSafe([ROLES.INSTRUCTOR]),
        this.userService.listByRolesSafe([ROLES.STUDENT]),
      ]);
      // Add computed counts needed by the UI cards/table.
      const instructors = await Promise.all(instructorsSafe.map(async (u) => ({
        ...u,
        courseCount: await this.courseService.countByInstructorId(u.id),
        batchCount: await this.batchService.countBatchesByInstructorId(u.id),
      })));
      return { view: 'admin', instructors, students: studentsSafe };
    }

    // Super Admin view includes all top-level user groups and batch/course grouping.
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
    // Build a nested "course -> batches -> students" structure for the frontend.
    for (const b of allBatches as any[]) {
      const batchId = b._id.toString();
      // Avoid duplicate batch grouping if populated data creates repeated entries.
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

  // use of this is:
  // Returns small course options for dropdowns, not full course card data.
  async listCourses(): Promise<Array<{ id: string; name: string }>> {
    const courses = await this.courseService.findAll();
    // Map Mongo documents into minimal DTO: id + display name.
    return courses.map((c) => ({ id: c._id.toString(), name: c.name }));
  }

  // use of this is:
  // Allows privileged users to create courses from admin/user screens.
  async createCourse(name: string, currentUser: { role: string; canManageUsers?: boolean }): Promise<{ id: string; name: string }> {
    const canCreate = currentUser.role === ROLES.SUPER_ADMIN || (currentUser.role === ROLES.ADMIN && currentUser.canManageUsers === true);
    if (!canCreate) throw forbidden('Only Super Admin or an Admin with head permission can create courses.');
    const course = await this.courseService.create(name);
    return { id: course._id.toString(), name: course.name };
  }

  // use of this is:
  // Activates or deactivates a user account from the admin UI.
  async setUserStatus(userId: string, active: boolean, currentUser: { id: string; role: string; canManageUsers?: boolean }) {
    // Only Super Admins or head Admins can change user status.
    const canSet = currentUser.role === ROLES.SUPER_ADMIN || (currentUser.role === ROLES.ADMIN && currentUser.canManageUsers === true);
    if (!canSet) throw forbidden('Only Super Admin or an Admin with head permission can activate or deactivate users.');
    // Load target to check existence and role before changing anything.
    const target = await this.userService.findById(userId);
    if (!target) throw badRequest('User not found.');
    const targetRole = target.role ?? 'student';
    // Admins cannot affect Super Admins/Admins, preventing lateral privilege abuse.
    if (currentUser.role === ROLES.ADMIN && [ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(targetRole as any)) {
      throw forbidden('Admins can only activate or deactivate Instructors and Students.');
    }
    // Persist active flag through UserService.
    const updated = await this.userService.setActive(userId, active);
    if (!updated) throw badRequest('User not found.');
    const name = `${updated.firstName} ${updated.lastName}`.trim();
    try {
      // Email is best-effort; account status should still change if email fails.
      if (active) await this.mailService.sendAccountActivated(updated.email, name);
      else await this.mailService.sendAccountDeactivated(updated.email, name);
    } catch (e) {
      console.warn('Failed to send activation/deactivation email', e);
    }
    return { user: { ...this.toSafeUser(updated), role: targetRole } };
  }

  // use of this is:
  // Allows authenticated users to change their own password after proving current password.
  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{ message: string }> {
    // Load current user by JWT subject.
    const user = await this.userService.findById(userId);
    if (!user) throw unauthorized('User not found.');
    // Confirm old password so stolen sessions alone cannot silently change password.
    if (!(await this.userService.validatePassword(user, currentPassword))) throw unauthorized('Current password is incorrect.');
    // Hash and store new password through UserService.
    await this.userService.updatePassword(userId, newPassword);
    return { message: 'Password updated successfully. Please sign in again with your new password.' };
  }

  // use of this is:
  // Updates current user's editable profile fields and returns fresh auth user DTO.
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
  }): Promise<AuthResult['user']> {
    const user = await this.userService.updateProfile(userId, dto);
    if (!user) throw unauthorized('User not found.');
    return this.toAuthUser(user, user.role ?? 'student');
  }

  // use of this is:
  // Super Admin grants/revokes "head admin" permission, which controls admin user-management access.
  async setHeadPermission(userId: string, head: boolean, currentUser: { role: string }) {
    if (currentUser.role !== ROLES.SUPER_ADMIN) throw forbidden('Only Super Admin can grant or revoke head permission.');
    const updated = await this.userService.setCanManageUsers(userId, head);
    if (!updated) throw badRequest('User not found or is not an Admin.');
    return { user: { ...this.toSafeUser(updated), canManageUsers: updated.canManageUsers === true } };
  }

  // use of this is:
  // Sends OTP for general OTP verification flows.
  // Existing users store OTP in Mongo; unknown emails store OTP temporarily in memory.
  async sendOtp(email: string): Promise<{ message: string }> {
    // Remove expired memory OTPs before adding a new one.
    this.purgeExpiredPendingOtps();
    const normalized = email.toLowerCase().trim();
    // Six-digit numeric OTP is easy for users to type.
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // OTP expires quickly to limit replay risk.
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000);
    const user = await this.userService.findByEmail(normalized);
    if (user) await this.userService.setOtp(user._id.toString(), otp, expiresAt);
    else this.pendingOtps.set(normalized, { otp, expiresAt });
    await this.mailService.sendOtp(normalized, otp);
    // Generic response avoids revealing whether an email exists.
    return { message: 'If this email is registered, you will receive an OTP.' };
  }

  // use of this is:
  // Checks OTP validity and clears it when successful so it cannot be reused.
  async verifyOtp(email: string, otp: string): Promise<{ valid: boolean }> {
    const normalized = email.toLowerCase().trim();
    const user = await this.userService.findByEmail(normalized);
    if (user?.otpCode && user.otpExpiresAt) {
      // Expired or mismatched OTP fails without throwing because the UI expects boolean state.
      if (user.otpExpiresAt < new Date() || user.otpCode !== otp) return { valid: false };
      await this.userService.clearOtp(user._id.toString());
      return { valid: true };
    }
    // Fall back to in-memory pending OTP for emails without user records.
    const pending = this.pendingOtps.get(normalized);
    if (!pending || pending.expiresAt < new Date() || pending.otp !== otp) return { valid: false };
    this.pendingOtps.delete(normalized);
    return { valid: true };
  }

  // use of this is:
  // Sends OTP specifically for forgot-password, where the email must belong to an active account.
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

  // use of this is:
  // Resets password after a valid forgot-password OTP.
  async resetPassword(email: string, otp: string, newPassword: string): Promise<{ message: string }> {
    // Find user and OTP fields in one record.
    const user = await this.userService.findByEmail(email.toLowerCase().trim());
    if (!user || !user.otpCode || !user.otpExpiresAt) throw unauthorized('Invalid or expired OTP');
    if (user.isActive === false) throw unauthorized('Your account has been deactivated. Please contact your administrator to reactivate your account.');
    // OTP must match and be unexpired.
    if (user.otpExpiresAt < new Date() || user.otpCode !== otp) throw unauthorized('Invalid or expired OTP');
    await this.userService.updatePassword(user._id.toString(), newPassword);
    // Clear OTP after reset so it cannot be replayed.
    await this.userService.clearOtp(user._id.toString());
    return { message: 'Password has been reset. You can now log in.' };
  }

  // use of this is:
  // Creates JWT and user DTO returned by login/register/direct user creation.
  private issueToken(user: UserDocument): AuthResult {
    // JWT subject is the Mongo user id; email is included for traceability.
    const access_token = jwt.sign({ sub: user._id.toString(), email: user.email }, env.jwtSecret, { expiresIn: env.jwtExpiresIn as any });
    return { access_token, user: this.toAuthUser(user, user.role ?? 'student') };
  }

  // use of this is:
  // Converts full Mongo user document into safe auth response payload.
  private toAuthUser(user: UserDocument, role: string): AuthResult['user'] {
    const payload: AuthResult['user'] = {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName ?? null,
      name: user.displayName || `${user.firstName} ${user.lastName}`.trim(),
      role,
      phoneNumber: user.phoneNumber ?? null,
      dateOfBirth: user.dateOfBirth ?? null,
      nationality: user.nationality ?? null,
      address: user.address ?? null,
      profileImageUrl: user.profileImageUrl ?? null,
      coverImageUrl: user.coverImageUrl ?? null,
    };
    if (role === ROLES.ADMIN && user.canManageUsers === true) payload.canManageUsers = true;
    return payload;
  }

  // use of this is:
  // Converts user document into safe admin-list user object without secrets/tokens/password hashes.
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

  // use of this is:
  // When creating instructors, attach selected courses and notify them by email/in-app notification.
  private async assignInstructorCourses(user: UserDocument, courseIds?: string[]): Promise<void> {
    // Only instructors can be assigned to courses through this helper.
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

  // use of this is:
  // Keeps the in-memory OTP map from growing and removes expired entries.
  private purgeExpiredPendingOtps(): void {
    const now = new Date();
    for (const [email, entry] of this.pendingOtps.entries()) {
      if (entry.expiresAt < now) this.pendingOtps.delete(email);
    }
  }
}
