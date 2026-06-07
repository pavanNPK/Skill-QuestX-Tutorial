// use of this file is:
// Core component file. It renders profile settings with signal-backed state and persists safe profile edits through the auth API.
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { getFriendlyErrorMessage } from '../../../shared/utils/error-messages.util';
import { SnackbarService } from '../../../shared/services/snackbar.service';

type EditableSection = 'personal' | 'account' | null;

interface PersonalDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  nationality: string;
}

interface AccountDetails {
  displayName: string;
  accountCreated: string;
  lastLogin: string;
  verification: string;
  language: string;
  timezone: string;
}

interface PreferencesDetails {
  emailNotifications: string;
  smsAlerts: string;
  contentPreferences: string;
  dashboardView: string;
  theme: string;
  contentLanguage: string;
}

interface MembershipDetails {
  plan: string;
  membershipStatus: string;
  accessTerm: string;
  renewalPolicy: string;
  supportLevel: string;
}

@Component({
  selector: 'sqx-profile-settings',
  standalone: true,
  imports: [ButtonModule, ConfirmDialogModule, InputTextModule, SafeUrlPipe],
  providers: [ConfirmationService],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent {
  private router = inject(Router);
  readonly auth = inject(AuthService);
  private snackbar = inject(SnackbarService);
  private confirmationService = inject(ConfirmationService);

  readonly submitting = signal(false);
  readonly editingSection = signal<EditableSection>(null);
  readonly coverImageUrl = '/assets/images/banner.jpg';
  readonly fallbackAvatarUrl = '/assets/images/avatar-1.jpg';
  readonly coverPreviewUrl = signal(this.auth.currentUser()?.coverImageUrl ?? this.coverImageUrl);
  readonly avatarPreviewUrl = signal(this.auth.currentUser()?.profileImageUrl ?? this.fallbackAvatarUrl);

  readonly personal = signal<PersonalDetails>({
    firstName: this.auth.currentUser()?.firstName ?? '',
    lastName: this.auth.currentUser()?.lastName ?? '',
    phoneNumber: this.auth.currentUser()?.phoneNumber ?? '2135551234',
    address: this.auth.currentUser()?.address ?? 'California - United States',
    dateOfBirth: this.auth.currentUser()?.dateOfBirth ?? '1987-01-01',
    nationality: this.auth.currentUser()?.nationality ?? 'American',
  });

  readonly account = signal<AccountDetails>({
    displayName: this.auth.currentUser()?.displayName ?? this.fullNameFromUser(),
    accountCreated: 'March 20, 2020',
    lastLogin: 'August 22, 2024',
    verification: 'Verified',
    language: 'English',
    timezone: 'GMT-5 (Eastern Time)',
  });

  readonly preferences = signal<PreferencesDetails>({
    emailNotifications: 'Subscribed',
    smsAlerts: 'Enabled',
    contentPreferences: 'Technology, Design, Innovation',
    dashboardView: 'Compact Mode',
    theme: 'Light',
    contentLanguage: 'English',
  });

  readonly membership = signal<MembershipDetails>({
    plan: 'Free',
    membershipStatus: 'Free',
    accessTerm: 'Lifetime',
    renewalPolicy: 'No renewal required',
    supportLevel: 'Community support',
  });

  readonly enrolledCourses = signal([
    { name: 'Anatomy', progress: 82, status: 'In review' },
    { name: 'Medical Coding Foundations', progress: 64, status: 'Active' },
    { name: 'Full Stack Development', progress: 38, status: 'Active' },
  ]);

  // use of this is:
  // Builds the full name shown in the profile hero from the editable signal state.
  fullName(): string {
    const personal = this.personal();
    return `${personal.firstName} ${personal.lastName}`.trim() || this.account().displayName || 'User';
  }

  // use of this is:
  // Opens a single card for inline editing so fields stay editable in their original location.
  startEdit(section: EditableSection): void {
    this.editingSection.set(section);
  }

  // use of this is:
  // Closes inline editing without sending data to the backend.
  cancelEdit(): void {
    this.editingSection.set(null);
  }

  // use of this is:
  // Reads text/number/date input values so the view can update signals directly.
  textValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  // use of this is:
  // Updates one personal-detail field while preserving the rest of the signal object.
  setPersonalField<K extends keyof PersonalDetails>(field: K, value: PersonalDetails[K]): void {
    this.personal.update((details) => ({ ...details, [field]: value }));
  }

  // use of this is:
  // Updates editable account fields while keeping readonly account metadata intact.
  setAccountField<K extends keyof AccountDetails>(field: K, value: AccountDetails[K]): void {
    this.account.update((details) => ({ ...details, [field]: value }));
  }

  // use of this is:
  // Formats date-input values for the read-only profile rows.
  formatDate(value: string): string {
    if (!value) return '—';
    const parsed = new Date(`${value}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
  }

  // use of this is:
  // Saves each editable card through the auth profile endpoint.
  saveSection(section: EditableSection): void {
    if (section === 'personal') {
      this.savePersonalDetails();
      return;
    }
    if (section === 'account') {
      this.saveAccountDetails();
    }
  }

  // use of this is:
  // Uploads a selected profile or cover image as a data URL and stores it through the profile API.
  onImageSelected(event: Event, target: 'avatar' | 'cover'): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.snackbar.error('Please choose an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = String(reader.result ?? '');
      if (target === 'avatar') this.avatarPreviewUrl.set(imageUrl);
      if (target === 'cover') this.coverPreviewUrl.set(imageUrl);
      this.persistImage(target, imageUrl);
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  // use of this is:
  // Shows a placeholder action for opening a course from the enrolled courses list.
  viewCourse(courseName: string): void {
    this.snackbar.success(`Opening ${courseName}.`);
  }

  // use of this is:
  // Asks for confirmation before removing course access from the enrolled list.
  unenrollCourse(courseName: string): void {
    this.confirmationService.confirm({
      header: 'Unenroll from course?',
      message: `If you unenroll from ${courseName}, you will no longer have access to this course content, progress, or materials.`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes, unenroll',
      rejectLabel: 'Keep access',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-outlined',
      accept: () => {
        this.enrolledCourses.update((courses) => courses.filter((course) => course.name !== courseName));
        this.snackbar.success(`${courseName} removed from enrolled courses.`);
      },
    });
  }

  // use of this is:
  // Opens the dedicated plan comparison screen instead of editing plan fields inline.
  openMembershipPlans(): void {
    this.router.navigate(['/membership-plans']);
  }

  // use of this is:
  // Builds initials for accounts that do not have a saved profile image.
  userInitials(): string {
    const personal = this.personal();
    const initials = `${personal.firstName.trim().charAt(0)}${personal.lastName.trim().charAt(0)}`;
    return initials.toUpperCase() || (this.account().displayName.slice(0, 2) || 'U').toUpperCase();
  }

  private fullNameFromUser(): string {
    const u = this.auth.currentUser();
    return u?.name || `${u?.firstName ?? ''} ${u?.lastName ?? ''}`.trim() || 'User';
  }

  // use of this is:
  // Persists personal profile fields and keeps local signals aligned with the API response.
  private savePersonalDetails(): void {
    const details = this.personal();
    if (!details.firstName.trim() || !details.lastName.trim()) {
      this.snackbar.error('First name and last name are required.');
      return;
    }
    this.submitting.set(true);
    this.auth.updateProfile(details).subscribe({
      next: (user) => {
        this.submitting.set(false);
        this.editingSection.set(null);
        this.personal.set({
          firstName: user.firstName ?? details.firstName,
          lastName: user.lastName ?? details.lastName,
          phoneNumber: user.phoneNumber ?? details.phoneNumber,
          address: user.address ?? details.address,
          dateOfBirth: user.dateOfBirth ?? details.dateOfBirth,
          nationality: user.nationality ?? details.nationality,
        });
        this.snackbar.success('Personal details saved.');
      },
      error: (err) => {
        this.submitting.set(false);
        this.snackbar.error(getFriendlyErrorMessage(err));
      },
    });
  }

  // use of this is:
  // Persists display name only; readonly account metadata is intentionally not editable.
  private saveAccountDetails(): void {
    const account = this.account();
    if (!account.displayName.trim()) {
      this.snackbar.error('Display name is required.');
      return;
    }
    this.submitting.set(true);
    this.auth.updateProfile({ displayName: account.displayName }).subscribe({
      next: (user) => {
        this.submitting.set(false);
        this.editingSection.set(null);
        this.account.update((details) => ({
          ...details,
          displayName: user.displayName ?? account.displayName,
        }));
        this.snackbar.success('Account details saved.');
      },
      error: (err) => {
        this.submitting.set(false);
        this.snackbar.error(getFriendlyErrorMessage(err));
      },
    });
  }

  // use of this is:
  // Persists selected image data through the same safe profile endpoint used by text fields.
  private persistImage(target: 'avatar' | 'cover', imageUrl: string): void {
    const payload = target === 'avatar' ? { profileImageUrl: imageUrl } : { coverImageUrl: imageUrl };
    this.auth.updateProfile(payload).subscribe({
      next: (user) => {
        if (target === 'avatar') this.avatarPreviewUrl.set(user.profileImageUrl ?? imageUrl);
        if (target === 'cover') this.coverPreviewUrl.set(user.coverImageUrl ?? imageUrl);
        this.snackbar.success(target === 'avatar' ? 'Profile photo saved.' : 'Cover photo saved.');
      },
      error: (err) => {
        this.snackbar.error(getFriendlyErrorMessage(err, { default: 'Could not save image. Please try again.' }));
      },
    });
  }
}
