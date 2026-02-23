import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { TooltipModule } from 'primeng/tooltip';
import { DrawerModule } from 'primeng/drawer';
import { BadgeModule } from 'primeng/badge';
import { HeaderService, BreadcrumbItem } from '../../services/header.service';
import { NotificationService, AppNotification as ApiNotification } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

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
  imports: [CommonModule, RouterLink, TooltipModule, DrawerModule, BadgeModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent implements OnInit {
  pageTitle = '';
  breadcrumbs: BreadcrumbItem[] = [];

  // Notification Logic
  showDrawer = signal(false);
  notifications: AppNotification[] = [];
  unreadCount = signal(0);

  private router = inject(Router);
  private headerService = inject(HeaderService);
  private notificationService = inject(NotificationService);
  private auth = inject(AuthService);

  constructor() {}

  ngOnInit() {
    // Check for overridden breadcrumbs first
    this.headerService.breadcrumbs$.subscribe(crumbs => {
      if (crumbs.length > 0) {
        this.breadcrumbs = crumbs;
      } else {
        // Fallback to Router Logic using current URL (safeguard)
        this.updateFromRouter(this.router.url);
      }
    });

    this.headerService.title$.subscribe(title => {
      if (title) this.pageTitle = title;
    });

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.router.url)
      )
      .subscribe((url) => {
        // On navigation, reset overrides and update from router
        this.headerService.reset();
        this.updateFromRouter(url);
      });

    // Initial load
    this.updateFromRouter(this.router.url);
    this.loadNotifications();
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
        this.notifications = res.notifications.map((n: ApiNotification) => ({
          id: n.id,
          title: n.title,
          message: n.message || '',
          time: this.formatTimeAgo(n.createdAt),
          read: n.read,
          link: n.link ?? null,
        }));
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
    this.pageTitle = info.title;
    this.breadcrumbs = info.breadcrumbs;
  }

  getPageInfo(url: string): { title: string, breadcrumbs: BreadcrumbItem[] } {
    let title = 'Dashboard';
    let breadcrumbs: BreadcrumbItem[] = [];

    // Default Home
    const home: BreadcrumbItem = { label: 'Home', icon: 'pi pi-home', url: '/dashboard' };

    // When adding new app routes: add a case here with title and breadcrumbs so the header shows the component name and breadcrumbs.
    if (url.includes('/dashboard')) {
      title = 'Dashboard';
      breadcrumbs = [];
    } else if (url.includes('/profile-settings')) {
      title = 'Profile Settings';
      breadcrumbs = [{ label: 'Profile Settings', url: '/profile-settings' }];
    } else if (url.includes('/change-password')) {
      title = 'Change Password';
      breadcrumbs = [{ label: 'Change Password', url: '/change-password' }];
    } else if (url.includes('/courses')) {
      title = 'My Course Syllabus';
      breadcrumbs = [{ label: 'My Course Syllabus', url: '/courses' }];
    } else if (url.includes('/materials')) {
      title = 'Materials';
      breadcrumbs = [{ label: 'Materials', url: '/materials' }];
    } else if (url.includes('/classes/recorded')) {
      title = 'Recorded Classes';
      breadcrumbs = [{ label: 'Classes' }, { label: 'Recorded Classes', url: '/classes/recorded' }];
    } else if (url.includes('/classes/live')) {
      title = 'Live Stream';
      breadcrumbs = [{ label: 'Classes' }, { label: 'Live Stream', url: '/classes/live' }];
    } else if (url.includes('/tasks')) {
      title = 'Tasks';
      breadcrumbs = [{ label: 'Tasks', url: '/tasks' }];
    } else if (url.includes('/batches/')) {
      // Batch detail page
      title = 'Batch Details';
      breadcrumbs = [{ label: 'Batches', url: '/batches' }, { label: 'Batch Details' }];
    } else if (url.includes('/batches')) {
      title = 'Batches';
      breadcrumbs = [{ label: 'Batches', url: '/batches' }];
    } else if (url.includes('/exams/assessment')) {
      title = 'Online Assessment';
      breadcrumbs = [{ label: 'Exams' }, { label: 'Online Assessment' }];
    } else if (url.includes('/exams/docs')) {
      title = 'Exam Documents';
      breadcrumbs = [{ label: 'Exams' }, { label: 'Exam Documents' }];
    } else if (url.includes('/projects')) {
      title = 'Projects';
      breadcrumbs = [{ label: 'Projects', url: '/projects' }];
    } else if (url.includes('/add-users')) {
      title = 'Users';
      breadcrumbs = [{ label: 'Users', url: '/add-users' }];
    }

    // Don't add home if it's dashboard (optional preference, but keeping consistent)
    // The logic above already sets breadcrumbs to empty for dashboard.
    // If breadcrumbs are not empty, prepend home.
    if (breadcrumbs.length > 0) {
      return { title, breadcrumbs: [home, ...breadcrumbs] };
    }

    return { title, breadcrumbs: [] };
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
        this.notifications = this.notifications.map((n) => ({ ...n, read: true }));
        this.unreadCount.set(0);
      },
    });
  }

  markAsRead(notification: AppNotification) {
    if (notification.read) return;
    this.notificationService.markAsRead(notification.id).subscribe({
      next: () => {
        this.notifications = this.notifications.map((n) =>
          n.id === notification.id ? { ...n, read: true } : n,
        );
        this.unreadCount.update((c) => Math.max(0, c - 1));
      },
    });
  }
}
