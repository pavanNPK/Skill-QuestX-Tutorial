// use of this file is:
// Core component file. It renders app-wide UI used across routes.
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
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
  @Output() collapsedChange = new EventEmitter<boolean>();
  classesDropdownOpen = signal(false);
  examsDropdownOpen = signal(false);
  collapsed = signal(this.getStoredCollapsedState());

  toggleSidebar() {
    const next = !this.collapsed();
    this.collapsed.set(next);
    this.storeCollapsedState(next);
    this.collapsedChange.emit(next);
    this.syncDropdownsWithCurrentRoute();
  }

  ngOnInit() {
    this.collapsedChange.emit(this.collapsed());
    this.syncDropdownsWithCurrentRoute();
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.syncDropdownsWithCurrentRoute());
  }

  toggleClassesDropdown() {
    this.classesDropdownOpen.update((val) => !val);
  }

  toggleExamsDropdown() {
    this.examsDropdownOpen.update((val) => !val);
  }

  closeDropdowns() {
    this.classesDropdownOpen.set(false);
    this.examsDropdownOpen.set(false);
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

  private getStoredCollapsedState(): boolean {
    if (typeof localStorage === 'undefined') return false;
    return localStorage.getItem('sqx-sidebar-collapsed') === 'true';
  }

  private storeCollapsedState(value: boolean) {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('sqx-sidebar-collapsed', String(value));
  }

  private syncDropdownsWithCurrentRoute() {
    if (this.collapsed()) {
      this.closeDropdowns();
      return;
    }

    this.classesDropdownOpen.set(this.isActive('/classes'));
    this.examsDropdownOpen.set(this.isActive('/exams'));
  }
}
