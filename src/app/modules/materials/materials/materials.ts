import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { HeaderService } from '../../core/services/header.service';

interface MaterialContent {
  type: 'video' | 'text' | 'link' | 'doc';
  title: string;
  url?: string;
  content?: string;
}

interface Concept {
  id: number;
  title: string;
  description: string;
  materials: MaterialContent[];
}

interface EnrolledCourse {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  image: string;
  concepts: Concept[];
}

@Component({
  selector: 'sqx-materials',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule, TableModule, BreadcrumbModule],
  templateUrl: './materials.html',
  styleUrl: './materials.scss',
})
export class Materials implements OnInit, OnDestroy {
  selectedCourse: EnrolledCourse | null = null;
  displayModal: boolean = false;
  selectedConcept: Concept | null = null;

  // Mock Data: Enrolled Courses
  enrolledCourses: EnrolledCourse[] = [
    {
      id: 1,
      title: 'Python for Data Science and Machine Learning Bootcamp',
      instructor: 'Jose Portilla',
      progress: 45,
      image: 'assets/images/python-course.png',
      concepts: [
        {
          id: 101,
          title: 'Introduction to Python',
          description: 'Basics of Python syntax, variables, and data types.',
          materials: [
            { type: 'video', title: 'Setup and Installation', url: 'https://example.com/video1' },
            { type: 'doc', title: 'Python Cheat Sheet', url: 'https://example.com/doc1' }
          ]
        },
        {
          id: 102,
          title: 'Python Data Structures',
          description: 'Lists, Dictionaries, Sets, and Tuples deep dive.',
          materials: [
            { type: 'video', title: 'Advanced Lists', url: 'https://example.com/video2' },
            { type: 'text', title: 'Dictionary Methods', content: 'Here is a summary of dictionary methods...' }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Angular - The Complete Guide (2025 Edition)',
      instructor: 'Maximilian Schwarzmüller',
      progress: 12,
      image: 'assets/images/angular-course.png',
      concepts: [
        {
          id: 201,
          title: 'Components & Databinding',
          description: 'Understanding Angular component architecture.',
          materials: [
            { type: 'video', title: 'Component Lifecycle', url: 'https://example.com/video3' }
          ]
        }
      ]
    }
  ];

  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    this.updateGlobalHeader();
  }

  ngOnDestroy() {
    this.headerService.reset();
  }

  updateGlobalHeader() {
    const base: any[] = [
      { icon: 'pi pi-home', url: '/dashboard', label: 'Home' },
      { label: 'Materials', command: () => this.goBack() }
    ];

    if (!this.selectedCourse) {
      this.headerService.updateTitle('Materials');
      this.headerService.updateBreadcrumbs([{ label: 'Materials' }]); // Just base materials? Or simply empty if root?
      // Actually, header.ts logic handles "Materials" root breadcrumb.
      // If we want to override:
      this.headerService.updateBreadcrumbs([
        { icon: 'pi pi-home', url: '/dashboard', label: 'Home' },
        { label: 'Materials' }
      ]);
    } else {
      this.headerService.updateTitle(this.selectedCourse.title);
      this.headerService.updateBreadcrumbs([
        { icon: 'pi pi-home', url: '/dashboard', label: 'Home' },
        { label: 'Materials', command: () => this.goBack() },
        { label: this.selectedCourse.title }
      ]);
    }
  }

  selectCourse(course: EnrolledCourse) {
    this.selectedCourse = course;
    this.updateGlobalHeader();
  }

  goBack() {
    this.selectedCourse = null;
    this.updateGlobalHeader();
  }

  viewConcept(concept: Concept) {
    this.selectedConcept = concept;
    this.displayModal = true;
  }

  getIconForType(type: string): string {
    switch (type) {
      case 'video': return 'pi pi-video';
      case 'doc': return 'pi pi-file';
      case 'link': return 'pi pi-link';
      case 'text': return 'pi pi-align-left';
      default: return 'pi pi-file';
    }
  }
}
