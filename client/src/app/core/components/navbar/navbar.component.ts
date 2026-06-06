// use of this file is:
// Core component file. It renders app-wide UI used across routes.
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sqx-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
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
