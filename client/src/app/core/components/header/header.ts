// use of this file is:
// Core component file. It renders app-wide UI used across routes.
import { Component, OnInit, signal, inject } from '@angular/core';

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
import { NotificationService, AppNotification as ApiNotification } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string | null;
}

@Component({
  selector: 'sqx-header',
  standalone: true,
  imports: [RouterLink, TooltipModule, DrawerModule, BadgeModule, IconFieldModule, InputIconModule, InputTextModule, PopoverModule, SafeUrlPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent implements OnInit {
  readonly pageTitle = signal('');
  readonly pageSubtitle = signal('');
  readonly breadcrumbs = signal<BreadcrumbItem[]>([]);
  private currentRoutePath = '';

  // Notification Logic
  readonly showDrawer = signal(false);
  readonly notifications = signal<AppNotification[]>([]);
  readonly unreadCount = signal(0);

  private router = inject(Router);
  private headerService = inject(HeaderService);
  private notificationService = inject(NotificationService);
  readonly auth = inject(AuthService);

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
        if (nextRoutePath !== this.currentRoutePath) {
          this.currentRoutePath = nextRoutePath;
          this.headerService.reset();
          this.updateFromRouter(url);
        }
      });

    // Initial load
    this.currentRoutePath = this.routePath(this.router.url);
    this.updateFromRouter(this.router.url);
    this.loadNotifications();
  }

  private routePath(url: string): string {
    return url.split('?')[0].split('#')[0];
  }

  private formatTimeAgo(createdAt: string): string {
    const date = new Date(createdAt);
    const now = new Date();
    const sec = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (sec < 60) return 'Just now';
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min} minute${min !== 1 ? 's' : ''} ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr} hour${hr !== 1 ? 's' : ''} ago`;
    const day = Math.floor(hr / 24);
    if (day < 7) return `${day} day${day !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  }

  loadNotifications(): void {
    if (!this.auth.isAuthenticated()) return;
    this.notificationService.getNotifications().subscribe({
      next: (res) => {
        this.notifications.set(res.notifications.map((n: ApiNotification) => ({
          id: n.id,
          title: n.title,
          message: n.message || '',
          time: this.formatTimeAgo(n.createdAt),
          read: n.read,
          link: n.link ?? null,
        })));
        this.unreadCount.set(res.unreadCount);
      },
      error: () => {},
    });
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
    this.loadNotifications();
    this.showDrawer.set(true);
  }

  closeDrawer() {
    this.showDrawer.set(false);
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead().subscribe({
      next: () => {
        this.notifications.update((items) => items.map((n) => ({ ...n, read: true })));
        this.unreadCount.set(0);
      },
    });
  }

  markAsRead(notification: AppNotification) {
    if (notification.read) return;
    this.notificationService.markAsRead(notification.id).subscribe({
      next: () => {
        this.notifications.update((items) => items.map((n) =>
          n.id === notification.id ? { ...n, read: true } : n,
        ));
        this.unreadCount.update((c) => Math.max(0, c - 1));
      },
    });
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
    this.router.navigate(['/profile-settings']);
  }
}
