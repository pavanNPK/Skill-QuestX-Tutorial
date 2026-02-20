import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: Transporter | null = null;

  constructor(private configService: ConfigService) {
    const host = this.configService.get<string>('MAIL_HOST');
    const port = this.configService.get<number>('MAIL_PORT');
    const user = this.configService.get<string>('MAIL_USER');
    const pass = this.configService.get<string>('MAIL_PASSWORD');
    const secure = this.configService.get<string>('MAIL_SECURE') === 'true';
    if (host && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port: port || 465,
        secure: secure ?? true,
        auth: { user, pass },
      });
    }
  }

  private get from(): string {
    return this.configService.get<string>('MAIL_FROM') || 'SkillQuestX <noreply@skillquestx.com>';
  }

  private get clientUrl(): string {
    return this.configService.get<string>('CLIENT_URL') || 'http://localhost:4200';
  }

  private getBaseTemplate(content: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillQuestX</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,sans-serif;background-color:#f5f5f5;">
  <table width="100%" cellspacing="0" cellpadding="0" style="background-color:#f5f5f5;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="520" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:4px;overflow:hidden;">
          <tr>
            <td style="background-color:#6730de;padding:24px 32px;">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">SkillQuestX</span>
                  </td>
                  <td align="right">
                    <span style="color:rgba(255,255,255,0.8);font-size:11px;text-transform:uppercase;letter-spacing:1px;">REDEFINE • UPSKILL • SUCCEED</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="background-color:#fafafa;padding:20px 32px;border-top:1px solid #eee;">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="color:#888;font-size:12px;">© ${new Date().getFullYear()} SkillQuestX</td>
                  <td align="right" style="color:#888;font-size:12px;">
                    <a href="https://skillquestx.com" style="color:#6730de;text-decoration:none;">skillquestx.com</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }

  private getButton(text: string, link: string): string {
    return `<a href="${link}" style="display:inline-block;background-color:#6730de;color:#ffffff;padding:12px 28px;border-radius:4px;text-decoration:none;font-weight:600;font-size:14px;">${text}</a>`;
  }

  async sendOtp(to: string, otp: string): Promise<void> {
    if (!this.transporter) {
      console.warn('Mail not configured; skipping OTP email to', to);
      return;
    }

    const content = `
      <h1 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;font-weight:600;">Verification Code</h1>
      <p style="margin:0 0 24px;color:#555;font-size:14px;line-height:1.5;">Enter this code to verify your identity. It expires in 3 minutes.</p>
      <div style="background-color:#f8f5ff;border-radius:4px;padding:20px;text-align:center;margin-bottom:24px;">
        <span style="font-size:32px;font-weight:700;color:#6730de;letter-spacing:6px;">${otp}</span>
      </div>
      <p style="margin:0;color:#999;font-size:12px;">If you didn't request this code, please ignore this email.</p>`;

    await this.transporter.sendMail({
      from: this.from,
      to,
      subject: 'Verification Code - SkillQuestX',
      text: `Your OTP is: ${otp}. It is valid for 3 minutes.`,
      html: this.getBaseTemplate(content),
    });
  }

  async sendPasswordReset(to: string, resetLink: string): Promise<void> {
    if (!this.transporter) {
      console.warn('Mail not configured; skipping password reset email to', to);
      return;
    }

    const content = `
      <h1 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;font-weight:600;">Reset Your Password</h1>
      <p style="margin:0 0 24px;color:#555;font-size:14px;line-height:1.5;">Click the button below to reset your password. This link expires in 1 hour.</p>
      <div style="margin-bottom:24px;">
        ${this.getButton('Reset Password', resetLink)}
      </div>
      <p style="margin:0;color:#999;font-size:12px;">If you didn't request this, you can safely ignore this email.</p>`;

    await this.transporter.sendMail({
      from: this.from,
      to,
      subject: 'Reset Your Password - SkillQuestX',
      text: `Reset your password: ${resetLink}`,
      html: this.getBaseTemplate(content),
    });
  }

  async sendSetPasswordEmail(to: string, setPasswordLink: string, role: string): Promise<void> {
    if (!this.transporter) {
      console.warn('Mail not configured; skipping set-password email to', to);
      return;
    }

    const roleLabel = role === 'admin' ? 'Administrator' : 'Instructor';

    const content = `
      <h1 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;font-weight:600;">Welcome to SkillQuestX</h1>
      <p style="margin:0 0 8px;color:#555;font-size:14px;line-height:1.5;">You've been invited to join as <strong style="color:#6730de;">${roleLabel}</strong>.</p>
      <p style="margin:0 0 24px;color:#555;font-size:14px;line-height:1.5;">Set your password to activate your account.</p>
      <div style="margin-bottom:24px;">
        ${this.getButton('Set Password', setPasswordLink)}
      </div>
      <p style="margin:0;color:#999;font-size:12px;">This link expires in 24 hours.</p>`;

    await this.transporter.sendMail({
      from: this.from,
      to,
      subject: `Welcome to SkillQuestX - ${roleLabel}`,
      text: `You have been added as ${roleLabel}. Set your password: ${setPasswordLink}`,
      html: this.getBaseTemplate(content),
    });
  }

  async sendRegistrationSuccess(to: string, name: string): Promise<void> {
    if (!this.transporter) {
      console.warn('Mail not configured; skipping registration success email to', to);
      return;
    }

    const content = `
      <h1 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;font-weight:600;">Welcome to SkillQuestX!</h1>
      <p style="margin:0 0 16px;color:#555;font-size:14px;line-height:1.5;">Hi <strong>${name}</strong>,</p>
      <p style="margin:0 0 24px;color:#555;font-size:14px;line-height:1.5;">Your account has been created successfully. You're now part of the SkillQuestX community!</p>
      <div style="background-color:#f8f5ff;border-radius:4px;padding:20px;margin-bottom:24px;">
        <p style="margin:0 0 12px;color:#1a1a1a;font-size:14px;font-weight:600;">What's next?</p>
        <ul style="margin:0;padding-left:20px;color:#555;font-size:14px;line-height:1.8;">
          <li>Explore available courses</li>
          <li>Complete your profile</li>
          <li>Start learning!</li>
        </ul>
      </div>
      <div style="margin-bottom:24px;">
        ${this.getButton('Go to Dashboard', this.clientUrl + '/dashboard')}
      </div>
      <p style="margin:0;color:#999;font-size:12px;">Happy learning!</p>`;

    await this.transporter.sendMail({
      from: this.from,
      to,
      subject: 'Welcome to SkillQuestX - Registration Successful',
      text: `Hi ${name}, Your account has been created successfully. Welcome to SkillQuestX!`,
      html: this.getBaseTemplate(content),
    });
  }

  async sendPasswordSetSuccess(to: string, name: string, role: string): Promise<void> {
    if (!this.transporter) {
      console.warn('Mail not configured; skipping password set success email to', to);
      return;
    }

    const roleLabel = role === 'admin' ? 'Administrator' : role === 'instructor' ? 'Instructor' : 'User';

    const content = `
      <h1 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;font-weight:600;">Password Set Successfully</h1>
      <p style="margin:0 0 16px;color:#555;font-size:14px;line-height:1.5;">Hi <strong>${name}</strong>,</p>
      <p style="margin:0 0 24px;color:#555;font-size:14px;line-height:1.5;">Your password has been set successfully. Your account is now active and ready to use.</p>
      <div style="background-color:#f0fdf4;border-left:4px solid #22c55e;border-radius:0 4px 4px 0;padding:16px 20px;margin-bottom:24px;">
        <p style="margin:0;color:#166534;font-size:14px;"><strong>Account Status:</strong> Active</p>
        <p style="margin:8px 0 0;color:#166534;font-size:14px;"><strong>Role:</strong> ${roleLabel}</p>
      </div>
      <div style="margin-bottom:24px;">
        ${this.getButton('Login Now', this.clientUrl + '/login')}
      </div>
      <p style="margin:0;color:#999;font-size:12px;">If you didn't make this change, please contact support immediately.</p>`;

    await this.transporter.sendMail({
      from: this.from,
      to,
      subject: 'Password Set Successfully - SkillQuestX',
      text: `Hi ${name}, Your password has been set successfully. You can now login to your account.`,
      html: this.getBaseTemplate(content),
    });
  }
}
