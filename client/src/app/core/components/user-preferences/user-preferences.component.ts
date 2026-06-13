// use of this file is:
// Core component file. It renders notification channel preferences and integration states.
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

type ChannelId = 'whatsapp' | 'email' | 'sms' | 'inApp' | 'push';
type ChannelTone = 'green' | 'blue' | 'orange' | 'violet' | 'cyan';
type ScheduleFrequency = 'instant' | 'hourly' | 'daily' | 'weekly';

interface PreferenceChannel {
  id: ChannelId;
  title: string;
  description: string;
  icon: string;
  tone: ChannelTone;
  targetLabel: string;
  placeholder: string;
  integrated: boolean;
  enabled: boolean;
  verifiedValue: string;
  draftValue: string;
  otp: string;
  verifying: boolean;
  requiresOtp: boolean;
}

@Component({
  selector: 'sqx-user-preferences',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './user-preferences.component.html',
  styleUrl: './user-preferences.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPreferencesComponent {
  readonly days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  readonly frequencies: { label: string; value: ScheduleFrequency; icon: string }[] = [
    { label: 'Instant', value: 'instant', icon: 'pi pi-bolt' },
    { label: 'Hourly digest', value: 'hourly', icon: 'pi pi-clock' },
    { label: 'Daily digest', value: 'daily', icon: 'pi pi-sun' },
    { label: 'Weekly digest', value: 'weekly', icon: 'pi pi-calendar' },
  ];

  readonly channels = signal<PreferenceChannel[]>([
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      description: 'Receive class reminders, task alerts, and urgent course updates on WhatsApp.',
      icon: 'pi pi-whatsapp',
      tone: 'green',
      targetLabel: 'WhatsApp number',
      placeholder: '+91 98765 43210',
      integrated: false,
      enabled: false,
      verifiedValue: '',
      draftValue: '',
      otp: '',
      verifying: false,
      requiresOtp: true,
    },
    {
      id: 'email',
      title: 'Email',
      description: 'Get summaries, reports, receipts, and account notifications by email.',
      icon: 'pi pi-envelope',
      tone: 'blue',
      targetLabel: 'Email address',
      placeholder: 'name@example.com',
      integrated: true,
      enabled: true,
      verifiedValue: 'pavan@example.com',
      draftValue: '',
      otp: '',
      verifying: false,
      requiresOtp: true,
    },
    {
      id: 'sms',
      title: 'Normal Messages',
      description: 'Use SMS for security alerts, OTPs, and critical reminders when data is unavailable.',
      icon: 'pi pi-mobile',
      tone: 'orange',
      targetLabel: 'Mobile number',
      placeholder: '+1 555 123 4567',
      integrated: false,
      enabled: false,
      verifiedValue: '',
      draftValue: '',
      otp: '',
      verifying: false,
      requiresOtp: true,
    },
    {
      id: 'inApp',
      title: 'In-App',
      description: 'Show notifications inside Skill QuestX while instructors and learners are active.',
      icon: 'pi pi-bell',
      tone: 'violet',
      targetLabel: '',
      placeholder: '',
      integrated: true,
      enabled: true,
      verifiedValue: 'Enabled in this account',
      draftValue: '',
      otp: '',
      verifying: false,
      requiresOtp: false,
    },
    {
      id: 'push',
      title: 'Push Notifications',
      description: 'Send browser/device alerts for live sessions, material updates, and deadlines.',
      icon: 'pi pi-send',
      tone: 'cyan',
      targetLabel: '',
      placeholder: '',
      integrated: true,
      enabled: false,
      verifiedValue: 'Browser permission pending',
      draftValue: '',
      otp: '',
      verifying: false,
      requiresOtp: false,
    },
  ]);

  readonly doNotDisturb = signal(false);
  readonly scheduled = signal(false);
  readonly scheduleStart = signal('09:00');
  readonly scheduleEnd = signal('18:00');
  readonly selectedDays = signal<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  readonly scheduleFrequency = signal<ScheduleFrequency>('daily');

  startIntegration(id: ChannelId): void {
    this.updateChannel(id, (channel) => ({
      ...channel,
      verifying: channel.requiresOtp && !!channel.draftValue.trim(),
      integrated: !channel.requiresOtp ? true : channel.integrated,
      enabled: !channel.requiresOtp ? true : channel.enabled,
    }));
  }

  verifyIntegration(id: ChannelId): void {
    this.updateChannel(id, (channel) => {
      const value = channel.draftValue.trim();
      if (!value || channel.otp.trim().length < 4) return channel;
      return {
        ...channel,
        integrated: true,
        enabled: true,
        verifiedValue: value,
        draftValue: '',
        otp: '',
        verifying: false,
      };
    });
  }

  cancelIntegration(id: ChannelId): void {
    this.updateChannel(id, (channel) => ({
      ...channel,
      draftValue: '',
      otp: '',
      verifying: false,
    }));
  }

  toggleEnabled(id: ChannelId): void {
    this.updateChannel(id, (channel) => ({
      ...channel,
      enabled: channel.integrated ? !channel.enabled : channel.enabled,
    }));
  }

  deleteIntegration(id: ChannelId): void {
    this.updateChannel(id, (channel) => ({
      ...channel,
      integrated: false,
      enabled: false,
      verifiedValue: '',
      draftValue: '',
      otp: '',
      verifying: false,
    }));
  }

  updateDraft(id: ChannelId, value: string): void {
    this.updateChannel(id, (channel) => ({ ...channel, draftValue: value }));
  }

  updateOtp(id: ChannelId, value: string): void {
    this.updateChannel(id, (channel) => ({ ...channel, otp: value.replace(/\D/g, '').slice(0, 6) }));
  }

  canRequestOtp(channel: PreferenceChannel): boolean {
    return channel.draftValue.trim().length > 3;
  }

  canVerify(channel: PreferenceChannel): boolean {
    return channel.draftValue.trim().length > 3 && channel.otp.trim().length >= 4;
  }

  setScheduleTime(type: 'start' | 'end', value: string): void {
    if (type === 'start') {
      this.scheduleStart.set(value);
      return;
    }
    this.scheduleEnd.set(value);
  }

  toggleDay(day: string): void {
    this.selectedDays.update((days) => days.includes(day) ? days.filter((item) => item !== day) : [...days, day]);
  }

  selectFrequency(value: ScheduleFrequency): void {
    this.scheduleFrequency.set(value);
  }

  private updateChannel(id: ChannelId, updater: (channel: PreferenceChannel) => PreferenceChannel): void {
    this.channels.update((channels) => channels.map((channel) => channel.id === id ? updater(channel) : channel));
  }
}
