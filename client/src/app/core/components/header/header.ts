// use of this file is:
// Core component file. It renders app-wide UI used across routes.
import { ChangeDetectionStrategy, Component, OnInit, signal, inject } from '@angular/core';

import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { TooltipModule } from 'primeng/tooltip';
import { DrawerModule } from 'primeng/drawer';
import { BadgeModule } from 'primeng/badge';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PopoverModule } from 'primeng/popover';
import { HeaderService, BreadcrumbItem } from '../../services/header.service';
import { AuthService } from '../../services/auth.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { NotificationsStore, type NotificationItem } from '../../../features/notifications/state';

@Component({
  selector: 'sqx-header',
  standalone: true,
  imports: [RouterLink, TooltipModule, DrawerModule, BadgeModule, IconFieldModule, InputIconModule, InputTextModule, PopoverModule, SafeUrlPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  readonly pageTitle = signal('');
  readonly pageSubtitle = signal('');
  readonly breadcrumbs = signal<BreadcrumbItem[]>([]);
  readonly activeRoutePath = signal('');
  private currentRoutePath = '';

  // Notification Logic
  readonly showDrawer = signal(false);

  private router = inject(Router);
  private headerService = inject(HeaderService);
  private notificationsStore = inject(NotificationsStore);
  readonly auth = inject(AuthService);
  readonly notifications = this.notificationsStore.visibleNotifications;
  readonly unreadCount = this.notificationsStore.unreadCount;

  constructor() {}

  ngOnInit() {
    // Check for overridden breadcrumbs first
    this.headerService.breadcrumbs$.subscribe(crumbs => {
      if (crumbs.length > 0) {
        this.breadcrumbs.set(this.visibleBreadcrumbs(crumbs));
      } else {
        // Fallback to Router Logic using current URL (safeguard)
        this.updateFromRouter(this.router.url);
      }
    });

    this.headerService.title$.subscribe(title => {
      if (title) this.pageTitle.set(title);
    });

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.router.url)
      )
      .subscribe((url) => {
        const nextRoutePath = this.routePath(url);
        this.activeRoutePath.set(nextRoutePath);
        if (nextRoutePath !== this.currentRoutePath) {
          this.currentRoutePath = nextRoutePath;
          this.headerService.reset();
          this.updateFromRouter(url);
        }
      });

    // Initial load
    this.currentRoutePath = this.routePath(this.router.url);
    this.activeRoutePath.set(this.currentRoutePath);
    this.updateFromRouter(this.router.url);
    void this.notificationsStore.load();
  }

  private routePath(url: string): string {
    return url.split('?')[0].split('#')[0];
  }

  updateFromRouter(url: string) {
    const info = this.getPageInfo(url);
    // Only set if not already set by service (though we reset service on nav, so this is safe)
    // Assuming headerService has these methods or they are placeholders for future implementation
    // For now, we'll just assign directly as the service reset should handle it.
    this.pageTitle.set(info.title);
    this.pageSubtitle.set(info.subtitle);
    this.breadcrumbs.set(this.visibleBreadcrumbs(info.breadcrumbs));
  }

  private visibleBreadcrumbs(items: BreadcrumbItem[]): BreadcrumbItem[] {
    const withoutHome = items.filter((item) => (item.label ?? '').toLowerCase() !== 'home');
    return withoutHome.length >= 2 ? items : [];
  }

  getPageInfo(url: string): { title: string, subtitle: string, breadcrumbs: BreadcrumbItem[] } {
    let title = 'Dashboard';
    let subtitle = 'Track your learning progress and upcoming work';
    let breadcrumbs: BreadcrumbItem[] = [];

    // Default Home
    const home: BreadcrumbItem = { label: 'Home', icon: 'pi pi-home', url: '/dashboard' };

    // When adding new app routes: add a case here with title and breadcrumbs so the header shows the component name and breadcrumbs.
    if (url.includes('/dashboard')) {
      title = 'Dashboard';
      subtitle = 'Track your learning progress and upcoming work';
      breadcrumbs = [];
    } else if (url.includes('/profile-settings')) {
      title = 'Profile Settings';
      subtitle = 'Manage your account details and preferences';
      breadcrumbs = [{ label: 'Profile Settings', url: '/profile-settings' }];
    } else if (url.includes('/user-preferences')) {
      title = 'User Preferences';
      subtitle = 'Manage notification channels and delivery controls';
      breadcrumbs = [{ label: 'User Preferences', url: '/user-preferences' }];
    } else if (url.includes('/membership-plans')) {
      title = 'Membership Plans';
      subtitle = 'Choose your learning access and support level';
      breadcrumbs = [{ label: 'Membership Plans', url: '/membership-plans' }];
    } else if (url.includes('/change-password')) {
      title = 'Change Password';
      subtitle = 'Update your account password securely';
      breadcrumbs = [{ label: 'Change Password', url: '/change-password' }];
    } else if (url.includes('/courses')) {
      title = 'Courses';
      subtitle = 'Manage your syllabus and enrolled course content';
      breadcrumbs = [{ label: 'My Course Syllabus', url: '/courses' }];
    } else if (url.includes('/materials')) {
      title = 'Materials';
      subtitle = 'Access course materials and learning content';
      breadcrumbs = [{ label: 'Materials', url: '/materials' }];
    } else if (url.includes('/classes/recorded')) {
      title = 'Recorded Classes';
      subtitle = 'Watch recorded sessions and course chapters';
      breadcrumbs = [{ label: 'Classes' }, { label: 'Recorded Classes', url: '/classes/recorded' }];
    } else if (url.includes('/classes/live')) {
      title = 'Live Classes';
      subtitle = 'Join live sessions and class activities';
      breadcrumbs = [{ label: 'Classes' }, { label: 'Live Classes', url: '/classes/live' }];
    } else if (url.includes('/tasks')) {
      title = 'Tasks';
      subtitle = 'Track assignments and learning tasks';
      breadcrumbs = [{ label: 'Tasks', url: '/tasks' }];
    } else if (url.includes('/batches/')) {
      // Batch detail page
      title = 'Batch Details';
      subtitle = 'Review students, schedules, and batch information';
      breadcrumbs = [{ label: 'Batches', url: '/batches' }, { label: 'Batch Details' }];
    } else if (url.includes('/batches')) {
      title = 'Batches';
      subtitle = 'Manage batches and enrolled students';
      breadcrumbs = [{ label: 'Batches', url: '/batches' }];
    } else if (url.includes('/exams/assessment')) {
      title = 'Online Assessment';
      subtitle = 'Create, manage, and take online assessments';
      breadcrumbs = [{ label: 'Exams' }, { label: 'Online Assessment' }];
    } else if (url.includes('/exams/docs')) {
      title = 'Exam Documents';
      subtitle = 'Access documents and resources for exams';
      breadcrumbs = [{ label: 'Exams' }, { label: 'Exam Documents' }];
    } else if (url.includes('/projects')) {
      title = 'Projects';
      subtitle = 'Track project work, submissions, and progress';
      breadcrumbs = [{ label: 'Projects', url: '/projects' }];
    } else if (url.includes('/add-users')) {
      title = 'Users';
      subtitle = 'Manage users, roles, and access';
      breadcrumbs = [{ label: 'Users', url: '/add-users' }];
    }

    // Don't add home if it's dashboard (optional preference, but keeping consistent)
    // The logic above already sets breadcrumbs to empty for dashboard.
    // If breadcrumbs are not empty, prepend home.
    if (breadcrumbs.length > 0) {
      return { title, subtitle, breadcrumbs: [home, ...breadcrumbs] };
    }

    return { title, subtitle, breadcrumbs: [] };
  }

  // Notification Methods
  openNotifications() {
    void this.notificationsStore.load();
    this.showDrawer.set(true);
  }

  closeDrawer() {
    this.showDrawer.set(false);
  }

  markAllAsRead() {
    void this.notificationsStore.markAllAsRead();
  }

  markAsRead(notification: NotificationItem) {
    void this.notificationsStore.markAsRead(notification.id);
  }

  userInitials(): string {
    const u = this.auth.currentUser();
    if (!u?.firstName && !u?.lastName) return (u?.name?.slice(0, 2) ?? 'U').toUpperCase();
    const f = (u.firstName ?? '').trim().charAt(0);
    const l = (u.lastName ?? '').trim().charAt(0);
    return (f + l).toUpperCase() || (u.name?.slice(0, 2) ?? 'U').toUpperCase();
  }

  goToProfile() {
    this.router.navigate(['/profile-settings']);
  }

  changePassword() {
    this.router.navigate(['/change-password']);
  }

  userPreferences() {
    this.router.navigate(['/user-preferences']);
  }

  isRouteActive(path: string): boolean {
    return this.activeRoutePath() === path;
  }
}
