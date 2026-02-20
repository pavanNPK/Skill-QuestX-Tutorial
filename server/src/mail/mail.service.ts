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
    return this.configService.get<string>('MAIL_FROM') || 'Skill Questx <noreply@localhost>';
  }

  async sendOtp(to: string, otp: string): Promise<void> {
    if (!this.transporter) {
      console.warn('Mail not configured; skipping OTP email to', to);
      return;
    }
    await this.transporter.sendMail({
      from: this.from,
      to,
      subject: 'Your OTP - Skill Questx',
      text: `Your OTP is: ${otp}. It is valid for 3 minutes. Do not share it.`,
      html: `<p>Your OTP is: <strong>${otp}</strong>. It is valid for 3 minutes. Do not share it.</p>`,
    });
  }

  async sendPasswordReset(to: string, resetLink: string): Promise<void> {
    if (!this.transporter) {
      console.warn('Mail not configured; skipping password reset email to', to);
      return;
    }
    await this.transporter.sendMail({
      from: this.from,
      to,
      subject: 'Reset your password - Skill Questx',
      text: `Reset your password: ${resetLink}`,
      html: `<p>Reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
    });
  }
}
