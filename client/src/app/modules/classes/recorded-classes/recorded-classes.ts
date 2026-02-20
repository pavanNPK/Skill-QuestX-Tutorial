import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { HeaderService } from '../../core/services/header.service';

interface Concept {
  id: number;
  title: string;
  type: 'video' | 'reading' | 'assignment';
  duration?: string;
  completed: boolean;
  thumb?: string;
}

interface Chapter {
  id: number;
  number: number;
  title: string;
  subtitle: string;
  color: string;
  concepts: Concept[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  progress: number;
  chapters: Chapter[];
  totalChapters: number;
  totalHours: number;
}

@Component({
  selector: 'sqx-recorded-classes',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule, CardModule, ButtonModule, TooltipModule],
  templateUrl: './recorded-classes.html',
  styleUrl: './recorded-classes.scss'
})
export class RecordedClasses implements OnDestroy {
  // State
  currentView: 'courses' | 'chapters' | 'concepts' = 'courses';
  selectedCourse: Course | null = null;
  selectedChapter: Chapter | null = null;

  // Header Service replaces local breadcrumbs

  // Mock Data
  courses: Course[] = [
    {
      id: 1,
      title: 'Python for Data Science and Machine Learning Bootcamp',
      description: 'Learn how to use NumPy, Pandas, Seaborn, Matplotlib, Plotly, Scikit-Learn, Machine Learning, Tensorflow, and more!',
      image: 'assets/images/python-course.jpg', // Placeholder
      progress: 45,
      totalChapters: 12,
      totalHours: 25,
      chapters: [
        {
          id: 101,
          number: 1,
          title: 'Course Introduction',
          subtitle: 'Welcome to the course! Get set up and ready to learn.',
          color: '#C7D2FE',
          concepts: [
            { id: 1, title: 'Introduction to Python', type: 'video', duration: '10:00', completed: true },
            { id: 2, title: 'Course Overview', type: 'reading', completed: true },
            { id: 3, title: 'Environment Setup', type: 'video', duration: '15:30', completed: false },
            { id: 4, title: 'Python 2 vs Python 3', type: 'reading', completed: false },
            { id: 5, title: 'How to run Python Code', type: 'video', duration: '08:45', completed: false }
          ]
        },
        {
          id: 102,
          number: 2,
          title: 'Python Environement',
          subtitle: 'Setting up your development environment for success.',
          color: '#A5F3FC',
          concepts: [
            { id: 6, title: 'Anaconda Installation', type: 'video', duration: '12:00', completed: false },
            { id: 7, title: 'Jupyter Notebooks', type: 'video', duration: '20:00', completed: false },
            { id: 8, title: 'Virtual Environments', type: 'assignment', completed: false }
          ]
        },
        // ... more chapters
        { id: 103, number: 3, title: 'Python Object and Data Structure Basics', subtitle: 'Learn about Numbers, Strings, Lists, Dictionaries, Tuples, Files, Sets, and Booleans.', color: '#DDD6FE', concepts: [] },
        { id: 104, number: 4, title: 'Python Comparison Operators', subtitle: 'Learn how to compare elements in Python.', color: '#FDE68A', concepts: [] },
        { id: 105, number: 5, title: 'Python Statements', subtitle: 'If, Elif, and Else Statements.', color: '#BBF7D0', concepts: [] },
        { id: 106, number: 6, title: 'Methods and Functions', subtitle: 'Creating and using functions.', color: '#E5E7EB', concepts: [] },
      ]
    },
    {
      id: 2,
      title: 'Angular - The Complete Guide (2025 Edition)',
      description: 'Master Angular (formerly "Angular 2") and build awesome, reactive web apps with the successor of Angular.js',
      image: 'assets/images/angular-course.jpg',
      progress: 12,
      totalChapters: 24,
      totalHours: 35,
      chapters: [
        {
          id: 201,
          number: 1,
          title: 'Getting Started',
          subtitle: 'Introduction to Angular and the course.',
          color: '#FECACA',
          concepts: []
        }
      ]
    }
  ];


  constructor(private router: Router, private headerService: HeaderService) {
    this.updateGlobalHeader();
  }

  ngOnDestroy() {
    this.headerService.reset();
  }

  // Navigation Methods

  selectCourse(course: Course) {
    this.selectedCourse = course;
    this.currentView = 'chapters';
    this.updateGlobalHeader();
  }

  selectChapter(chapter: Chapter) {
    this.selectedChapter = chapter;
    this.currentView = 'concepts';
    this.updateGlobalHeader();
  }

  // Helpers
  getProgressColor(progress: number): string {
    if (progress >= 75) return '#10B981'; // Green
    if (progress >= 40) return '#6C5CE7'; // Purple (Primary)
    return '#F59E0B'; // Orange
  }

  // Content Interaction
  openConcept(concept: Concept) {
    console.log('Opening:', concept.title);
    concept.completed = true;
    // Trigger UI update or modal if needed
  }

  updateGlobalHeader() {
    const base: any[] = [
      { icon: 'pi pi-home', url: '/dashboard', label: 'Home' }, // Provide label for clarity/fallback
      { label: 'Classes' },
      { label: 'Recorded Classes', command: () => this.resetView() }
    ];

    if (this.currentView === 'courses') {
      this.headerService.updateBreadcrumbs([...base]);
    } else if (this.currentView === 'chapters' && this.selectedCourse) {
      this.headerService.updateBreadcrumbs([
        ...base,
        {
          label: this.selectedCourse.title || 'Course', // Fallback for undefined
          title: this.selectedCourse.title
        }
      ]);
    } else if (this.currentView === 'concepts' && this.selectedCourse && this.selectedChapter) {
      this.headerService.updateBreadcrumbs([
        ...base,
        {
          label: this.selectedCourse.title || 'Course',
          title: this.selectedCourse.title,
          command: () => this.selectCourse(this.selectedCourse!)
        },
        { label: this.selectedChapter.title || 'Chapter' }
      ]);
    }
  }

  resetView() {
    this.currentView = 'courses';
    this.selectedCourse = null;
    this.selectedChapter = null;
    this.updateGlobalHeader();
  }
}
