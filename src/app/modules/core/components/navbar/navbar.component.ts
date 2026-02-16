import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'sqx-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
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

  logout() {
    // Clear auth data from localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');

    // Navigate to login page
    this.router.navigate(['/login']);
  }
}
