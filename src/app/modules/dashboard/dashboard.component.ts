import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@Component({
  selector: 'sqx-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  currentDate = new Date();
  selectedDay: number | null = null;
  currentMonth: string = '';
  currentYear: number = 0;
  calendarDays: (number | null)[] = [];

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
}
