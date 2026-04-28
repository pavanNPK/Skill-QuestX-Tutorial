import nodemailer = require('nodemailer');
import type { Transporter } from 'nodemailer';
import { env } from '../config/env';

export class MailService {
  private transporter: Transporter | null = null;

  constructor() {
    if (env.mailHost && env.mailUser && env.mailPassword) {
      this.transporter = nodemailer.createTransport({
        host: env.mailHost,
        port: env.mailPort || 465,
        secure: env.mailSecure,
        auth: { user: env.mailUser, pass: env.mailPassword },
      });
    }
  }

  private get clientUrl(): string {
    return env.clientUrl;
  }

  private getBaseTemplate(content: string): string {
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>SkillQuestX</title></head><body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,sans-serif;background-color:#f5f5f5;"><table width="100%" cellspacing="0" cellpadding="0" style="background-color:#f5f5f5;padding:20px 0;"><tr><td align="center"><table width="520" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:4px;overflow:hidden;"><tr><td style="background-color:#6730de;padding:24px 32px;color:#ffffff;font-size:22px;font-weight:700;">SkillQuestX</td></tr><tr><td style="padding:32px;">${content}</td></tr><tr><td style="background-color:#fafafa;padding:20px 32px;border-top:1px solid #eee;color:#888;font-size:12px;">© ${new Date().getFullYear()} SkillQuestX</td></tr></table></td></tr></table></body></html>`;
  }

  private getButton(text: string, link: string): string {
    return `<a href="${link}" style="display:inline-block;background-color:#6730de;color:#ffffff;padding:12px 28px;border-radius:4px;text-decoration:none;font-weight:600;font-size:14px;">${text}</a>`;
  }

  private async send(to: string, subject: string, text: string, html: string): Promise<void> {
    if (!this.transporter) {
      console.warn('Mail not configured; skipping email to', to);
      return;
    }
    await this.transporter.sendMail({ from: env.mailFrom, to, subject, text, html });
  }

  async sendOtp(to: string, otp: string): Promise<void> {
    const content = `<h1 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;font-weight:600;">Verification Code</h1><p style="margin:0 0 24px;color:#555;font-size:14px;">Enter this code to verify your identity. It expires in 3 minutes.</p><div style="background-color:#f8f5ff;border-radius:4px;padding:20px;text-align:center;margin-bottom:24px;"><span style="font-size:32px;font-weight:700;color:#6730de;letter-spacing:6px;">${otp}</span></div>`;
    await this.send(to, 'Verification Code - SkillQuestX', `Your OTP is: ${otp}. It is valid for 3 minutes.`, this.getBaseTemplate(content));
  }

  async sendSetPasswordEmail(to: string, setPasswordLink: string, role: string): Promise<void> {
    const roleLabel = role === 'admin' ? 'Administrator' : 'Instructor';
    const content = `<h1 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;font-weight:600;">Welcome to SkillQuestX</h1><p style="margin:0 0 24px;color:#555;font-size:14px;">You've been invited to join as <strong>${roleLabel}</strong>. Set your password to activate your account.</p>${this.getButton('Set Password', setPasswordLink)}<p style="margin:24px 0 0;color:#999;font-size:12px;">This link expires in 24 hours.</p>`;
    await this.send(to, `Welcome to SkillQuestX - ${roleLabel}`, `You have been added as ${roleLabel}. Set your password: ${setPasswordLink}`, this.getBaseTemplate(content));
  }

  async sendRegistrationSuccess(to: string, name: string): Promise<void> {
    const content = `<h1 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;font-weight:600;">Welcome to SkillQuestX!</h1><p style="margin:0 0 24px;color:#555;font-size:14px;">Hi <strong>${name}</strong>, your account has been created successfully.</p>${this.getButton('Go to Dashboard', this.clientUrl + '/dashboard')}`;
    await this.send(to, 'Welcome to SkillQuestX - Registration Successful', `Hi ${name}, Your account has been created successfully.`, this.getBaseTemplate(content));
  }

  async sendPasswordSetSuccess(to: string, name: string, role: string): Promise<void> {
    const content = `<h1 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;font-weight:600;">Password Set Successfully</h1><p style="margin:0 0 24px;color:#555;font-size:14px;">Hi <strong>${name}</strong>, your ${role} account is ready.</p>${this.getButton('Login Now', this.clientUrl + '/login')}`;
    await this.send(to, 'Password Set Successfully - SkillQuestX', `Hi ${name}, Your password has been set successfully.`, this.getBaseTemplate(content));
  }

  async sendAccountDeactivated(to: string, name: string): Promise<void> {
    const content = `<h1 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;font-weight:600;">Account Deactivated</h1><p style="margin:0;color:#555;font-size:14px;">Hi <strong>${name}</strong>, your SkillQuestX account has been deactivated.</p>`;
    await this.send(to, 'Your SkillQuestX Account Has Been Deactivated', `Hi ${name}, Your SkillQuestX account has been deactivated.`, this.getBaseTemplate(content));
  }

  async sendAccountActivated(to: string, name: string): Promise<void> {
    const content = `<h1 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;font-weight:600;">Account Reactivated</h1><p style="margin:0 0 24px;color:#555;font-size:14px;">Hi <strong>${name}</strong>, your SkillQuestX account has been reactivated.</p>${this.getButton('Sign In', this.clientUrl + '/login')}`;
    await this.send(to, 'Your SkillQuestX Account Has Been Reactivated', `Hi ${name}, Your SkillQuestX account has been reactivated.`, this.getBaseTemplate(content));
  }

  async sendTaskAddedToBatch(to: string, studentName: string, taskTitle: string, courseName: string, dueDate?: string | null): Promise<void> {
    const due = dueDate ? ` Due: ${dueDate}.` : '';
    const content = `<h1 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;font-weight:600;">New task assigned</h1><p style="margin:0 0 24px;color:#555;font-size:14px;">Hi <strong>${studentName}</strong>, a new task has been added: <strong>${taskTitle}</strong> (${courseName}).${due}</p>${this.getButton('View Tasks', this.clientUrl + '/tasks')}`;
    await this.send(to, `New task: ${taskTitle} - SkillQuestX`, `Hi ${studentName}, New task "${taskTitle}" for ${courseName}.`, this.getBaseTemplate(content));
  }

  async sendTaskSubmittedToInstructor(to: string, instructorName: string, studentName: string, taskTitle: string): Promise<void> {
    const content = `<h1 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;font-weight:600;">Task submission received</h1><p style="margin:0 0 24px;color:#555;font-size:14px;">Hi <strong>${instructorName}</strong>, <strong>${studentName}</strong> submitted <strong>${taskTitle}</strong>.</p>${this.getButton('View Tasks', this.clientUrl + '/tasks')}`;
    await this.send(to, `Task submitted: ${taskTitle} by ${studentName} - SkillQuestX`, `${studentName} submitted "${taskTitle}".`, this.getBaseTemplate(content));
  }

  async sendInstructorAssignedToCourse(to: string, instructorName: string, courseNames: string[]): Promise<void> {
    const courseList = courseNames.length ? courseNames.join(', ') : 'your assigned course(s)';
    const content = `<h1 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;font-weight:600;">You've been assigned to courses</h1><p style="margin:0 0 24px;color:#555;font-size:14px;">Hi <strong>${instructorName}</strong>, you have been assigned to: <strong>${courseList}</strong>.</p>${this.getButton('View Courses', this.clientUrl + '/courses')}`;
    await this.send(to, 'Course assignment - SkillQuestX', `Hi ${instructorName}, You have been assigned to: ${courseList}.`, this.getBaseTemplate(content));
  }
}
