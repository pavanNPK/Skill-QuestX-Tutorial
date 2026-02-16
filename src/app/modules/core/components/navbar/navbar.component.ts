import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'sqx-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, PopoverModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  classesDropdownOpen = signal(false);
  examsDropdownOpen = signal(false);

  constructor(private router: Router) { }

  toggleClassesDropdown() {
    this.classesDropdownOpen.update((val) => !val);
  }

  toggleExamsDropdown() {
    this.examsDropdownOpen.update((val) => !val);
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
    // Clear auth data from localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');

    // Navigate to login page
    this.router.navigate(['/login']);
  }
}
