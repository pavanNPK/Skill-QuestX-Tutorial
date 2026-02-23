import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PopoverModule } from 'primeng/popover';
import { AuthService } from '../../services/auth.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'sqx-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, PopoverModule, SafeUrlPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  private router = inject(Router);
  readonly auth = inject(AuthService);
  classesDropdownOpen = signal(false);
  examsDropdownOpen = signal(false);

  toggleClassesDropdown() {
    this.classesDropdownOpen.update((val) => !val);
  }

  toggleExamsDropdown() {
    this.examsDropdownOpen.update((val) => !val);
  }

  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }

  /** Avatar rule: show profile image when profileImageUrl is set; otherwise show user initials (e.g. "JD"). */
  userInitials(): string {
    const u = this.auth.currentUser();
    if (!u?.firstName && !u?.lastName) return (u?.name?.slice(0, 2) ?? 'U').toUpperCase();
    const f = (u.firstName ?? '').trim().charAt(0);
    const l = (u.lastName ?? '').trim().charAt(0);
    return (f + l).toUpperCase() || (u.name?.slice(0, 2) ?? 'U').toUpperCase();
  }

  showProfileMenu() {
    // Popover will handle showing
  }

  goToProfile() {
    this.router.navigate(['/profile-settings']);
  }

  changePassword() {
    this.router.navigate(['/change-password']);
  }

  userPreferences() {
    this.router.navigate(['/profile-settings']);
  }

  logout() {
    this.auth.logout();
  }
}
