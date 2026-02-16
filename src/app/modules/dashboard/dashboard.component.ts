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
}

@Component({
  selector: 'sqx-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  currentDate = new Date();
  selectedDay = 11;
  currentMonth = 'January';

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
      icon: 'pi-briefcase'
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
    // Initialize any data if needed
  }

  get progressPercentage(): number {
    return (this.completedTasks / (this.completedTasks + this.unfinishedTasks)) * 100;
  }
}
