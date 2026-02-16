import { Component, inject, signal } from '@angular/core';
import { Location, NgFor, NgIf } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { DrawerModule } from 'primeng/drawer';

interface Breadcrumb {
  label: string;
  url?: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

@Component({
  selector: 'sqx-header',
  standalone: true,
  imports: [NgIf, NgFor, DrawerModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  private location = inject(Location);
  private router = inject(Router);

  pageTitle = 'Dashboard';
  breadcrumbs: Breadcrumb[] = [];
  showDrawer = signal(false);

  notifications: Notification[] = [
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

  constructor() {
    // Listen to route changes to update page title and breadcrumbs
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const url = this.router.url;
          return this.getPageInfo(url);
        })
      )
      .subscribe(({ title, breadcrumbs }) => {
        this.pageTitle = title;
        this.breadcrumbs = breadcrumbs;
      });

    // Set initial title and breadcrumbs
    const initial = this.getPageInfo(this.router.url);
    this.pageTitle = initial.title;
    this.breadcrumbs = initial.breadcrumbs;
  }

  private getPageInfo(url: string): { title: string; breadcrumbs: Breadcrumb[] } {
    // Dashboard
    if (url.includes('/dashboard')) {
      return { title: 'Dashboard', breadcrumbs: [{ label: 'Dashboard' }] };
    }

    // Syllabus
    if (url.includes('/syllabus')) {
      return { title: 'Syllabus', breadcrumbs: [{ label: 'Syllabus' }] };
    }

    // Materials
    if (url.includes('/materials')) {
      return { title: 'Materials', breadcrumbs: [{ label: 'Materials' }] };
    }

    // Classes - Recorded
    if (url.includes('/classes/recorded')) {
      return {
        title: 'Recorded Classes',
        breadcrumbs: [
          { label: 'Classes', url: '/classes' },
          { label: 'Recorded Classes' }
        ]
      };
    }

    // Classes - Live
    if (url.includes('/classes/live')) {
      return {
        title: 'Live Stream',
        breadcrumbs: [
          { label: 'Classes', url: '/classes' },
          { label: 'Live Stream' }
        ]
      };
    }

    // Tasks
    if (url.includes('/tasks')) {
      return { title: 'Tasks', breadcrumbs: [{ label: 'Tasks' }] };
    }

    // Exams - Assessment
    if (url.includes('/exams/assessment')) {
      return {
        title: 'Online Assessment',
        breadcrumbs: [
          { label: 'Exams', url: '/exams' },
          { label: 'Online Assessment' }
        ]
      };
    }

    // Exams - Documents
    if (url.includes('/exams/docs')) {
      return {
        title: 'Exam Documents',
        breadcrumbs: [
          { label: 'Exams', url: '/exams' },
          { label: 'Exam Documents' }
        ]
      };
    }

    // Projects
    if (url.includes('/projects')) {
      return { title: 'Projects', breadcrumbs: [{ label: 'Projects' }] };
    }

    return { title: 'Dashboard', breadcrumbs: [{ label: 'Dashboard' }] };
  }

  openNotifications() {
    this.showDrawer.set(true);
  }

  closeDrawer() {
    this.showDrawer.set(false);
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
  }

  markAsRead(notification: Notification) {
    notification.read = true;
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }
}
