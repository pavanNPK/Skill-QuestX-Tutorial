import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

interface Task {
  id: number;
  name: string;
  timeline: string;
}

interface Job {
  title: string;
  location: string;
  type: string;
  website: string;
  icon: string;
  locked?: boolean;
}

interface Banner {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
  buttonText: string;
}

interface OverviewCard {
  title: string;
  count: number;
  subtitle: string;
  icon: string;
  color: string;
  bg: string;
}

interface ExamResult {
  subject: string;
  score: number;
  total: number;
  grade: string;
  date: string;
  icon: string;
  color: string;
}

interface ActiveProject {
  title: string;
  dueDate: string;
  progress: number;
  status: 'In Progress' | 'Review' | 'Pending';
  statusColor: string;
}

interface Student {
  name: string;
  rank: number;
  score: number;
  image: string;
  trend: 'up' | 'down' | 'neutral';
}

@Component({
  selector: 'sqx-dashboard',
  standalone: true,
  imports: [CommonModule, CarouselModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  currentDate = new Date();
  selectedDay: number | null = null;
  currentMonth: string = '';
  currentYear: number = 0;
  calendarDays: (number | null)[] = [];

  // Mock Data for Top Students
  students: Student[] = [
    { name: 'Josh Anderson', rank: 1, score: 980, image: 'assets/images/avatar-1.jpg', trend: 'up' },
    { name: 'Sarah Williams', rank: 2, score: 950, image: 'assets/images/avatar-2.jpg', trend: 'up' },
    { name: 'Michael Brown', rank: 3, score: 920, image: 'assets/images/avatar-3.jpg', trend: 'down' },
    { name: 'Emily Davis', rank: 4, score: 890, image: 'assets/images/avatar-1.jpg', trend: 'neutral' }
  ];

  // Mock Data for Exam Results
  examResults: ExamResult[] = [
    { subject: 'Advanced UI Design', score: 85, total: 100, grade: 'A', date: 'Feb 10, 2025', icon: 'pi pi-palette', color: '#6C5CE7' },
    { subject: 'Python Basics', score: 92, total: 100, grade: 'A+', date: 'Feb 05, 2025', icon: 'pi pi-code', color: '#F59E0B' },
    { subject: 'Data Structures', score: 78, total: 100, grade: 'B+', date: 'Jan 28, 2025', icon: 'pi pi-database', color: '#10B981' }
  ];

  // Mock Data for Active Projects
  activeProjects: ActiveProject[] = [
    { title: 'E-commerce App Design', dueDate: 'Feb 25, 2025', progress: 75, status: 'In Progress', statusColor: '#3B82F6' },
    { title: 'Python Web Scraper', dueDate: 'Feb 28, 2025', progress: 40, status: 'Pending', statusColor: '#F59E0B' },
    { title: 'Portfolio Website', dueDate: 'Mar 05, 2025', progress: 90, status: 'Review', statusColor: '#8B5CF6' }
  ];

  courseOverview: OverviewCard[] = [
    { title: 'Total Courses', count: 12, subtitle: 'Total Courses Total Courses', icon: 'pi pi-briefcase', color: '#F97316', bg: '#FFF7ED' },
    { title: 'Completed Courses', count: 22, subtitle: 'Total Courses Total Courses', icon: 'pi pi-check-circle', color: '#10B981', bg: '#ECFDF5' },
    { title: 'In Progress', count: 3, subtitle: 'Total Courses Total Courses', icon: 'pi pi-spinner', color: '#3B82F6', bg: '#EFF6FF' },
    { title: 'Upcoming Classes', count: 2, subtitle: 'Total Courses Total Courses', icon: 'pi pi-video', color: '#8B5CF6', bg: '#F5F3FF' }
  ];

  dashboardBanners: Banner[] = [
    {
      title: 'Unlock Your Potential',
      subtitle: 'Premium Course',
      description: 'Master UI/UX Design with our advanced comprehensive course.',
      image: 'assets/images/banner-ui.png', // Placeholder, using CSS gradient mostly
      color: '#6C5CE7',
      buttonText: 'Explore Now'
    },
    {
      title: 'Python for Data Science',
      subtitle: 'Trending Now',
      description: 'Learn data analysis, visualization and machine learning.',
      image: 'assets/images/banner-python.png',
      color: '#F59E0B', // Orange/Amber
      buttonText: 'Start Learning'
    },
    {
      title: 'Full Stack Development',
      subtitle: 'Best Seller',
      description: 'Become a full stack developer with the MERN stack.',
      image: 'assets/images/banner-web.png',
      color: '#10B981', // Emerald
      buttonText: 'Join Class'
    }
  ];

  tasks: Task[] = [
    {
      id: 1,
      name: 'Task 1 - Programming with Python',
      timeline: '21/02/2023 12:00 PM'
    },
    {
      id: 2,
      name: 'Task 2 - Introduction with flow structures in python language',
      timeline: '31/02/2023 12:00 PM'
    },
    {
      id: 3,
      name: 'Task 3 - Basic Functions in Python language',
      timeline: '05/03/2023 12:00 PM'
    },
    {
      id: 4,
      name: 'Task 4 - Loop Concepts in Python',
      timeline: '05/03/2023 12:00 PM'
    },
    {
      id: 5,
      name: 'Task 4 - GUI Development with Tkinter',
      timeline: '10/03/2023 12:00 PM'
    },
    {
      id: 6,
      name: 'Task 5 - Object-Oriented Programming (Classes and Objects)',
      timeline: '15/03/2023 12:00 PM'
    }
  ];

  jobs: Job[] = [
    {
      title: 'GUI Freelancer at Tohands',
      location: 'Bangalore',
      type: 'Contract/ Freelance',
      website: 'www.smart.tohands.in/',
      icon: 'pi-briefcase',
      locked: true
    },
    {
      title: 'Design Engineer at OIZOM',
      location: 'Remote',
      type: 'Contract/ Freelance',
      website: 'www.oizom.in/',
      icon: 'pi-briefcase'
    },
    {
      title: 'Software Engineer at Alias & Cat',
      location: 'Remote',
      type: 'Contract/ Freelance',
      website: 'www.alias&cat.in/',
      icon: 'pi-briefcase'
    }
  ];

  courseProgress = 80;
  completedTasks = 12;
  unfinishedTasks = 3;

  ngOnInit() {
    this.selectedDay = this.currentDate.getDate();
    this.updateCalendar();
  }

  updateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    this.currentYear = year;
    this.currentMonth = this.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    this.calendarDays = [];

    // Add empty cells for days before the first day
    for (let i = 0; i < firstDay; i++) {
      this.calendarDays.push(null);
    }

    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      this.calendarDays.push(day);
    }
  }

  previousMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.updateCalendar();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.updateCalendar();
  }

  selectDay(day: number | null) {
    if (day) {
      this.selectedDay = day;
    }
  }

  isToday(day: number | null): boolean {
    if (!day) return false;
    const today = new Date();
    return day === today.getDate() &&
      this.currentDate.getMonth() === today.getMonth() &&
      this.currentDate.getFullYear() === today.getFullYear();
  }

  get progressPercentage(): number {
    return (this.completedTasks / (this.completedTasks + this.unfinishedTasks)) * 100;
  }

  // Helper to darken/lighten hex color for gradient
  adjustColor(color: string, amount: number) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }
}
