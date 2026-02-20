import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PopoverModule } from 'primeng/popover';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sqx-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, PopoverModule],
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

  showProfileMenu() {
    // Popover will handle showing
  }

  goToProfile() {
    console.log('Navigate to profile settings');
    // TODO: Navigate to profile page
  }

  changePassword() {
    console.log('Navigate to change password');
    // TODO: Navigate to change password page
  }

  userPreferences() {
    console.log('Navigate to user preferences');
    // TODO: Navigate to preferences page
  }

  logout() {
    this.auth.logout();
  }
}
