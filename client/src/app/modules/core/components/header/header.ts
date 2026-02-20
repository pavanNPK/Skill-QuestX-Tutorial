import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { TooltipModule } from 'primeng/tooltip';
import { DrawerModule } from 'primeng/drawer';
import { BadgeModule } from 'primeng/badge';
import { HeaderService, BreadcrumbItem } from '../../services/header.service';

interface AppNotification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
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
  notifications: AppNotification[] = [
    {
      id: 1,
      title: 'New Assignment Posted',
      message: 'Python Task 5 has been uploaded. Due date: March 20, 2024',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'Class Scheduled',
      message: 'Live session on Advanced Python scheduled for tomorrow at 10 AM',
      time: '5 hours ago',
      read: false
    },
    {
      id: 3,
      title: 'Grade Updated',
      message: 'Your Task 4 has been graded. Score: 95/100',
      time: '1 day ago',
      read: true
    }
  ];

  constructor(private router: Router, private headerService: HeaderService) { }

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

    if (url.includes('/dashboard')) {
      title = 'Dashboard';
      breadcrumbs = [];
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
    this.showDrawer.set(true);
  }

  closeDrawer() {
    this.showDrawer.set(false);
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
  }

  markAsRead(notification: AppNotification) {
    notification.read = true;
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }
}
