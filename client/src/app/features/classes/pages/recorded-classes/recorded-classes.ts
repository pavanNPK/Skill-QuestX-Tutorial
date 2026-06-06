// use of this file is:
// Feature page/container file. It connects route UI, feature state, services, and user actions.
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { HeaderService } from '../../../../core/services/header.service';
import {
  AvailableCourseContent,
  ContentBlock,
  ContentLesson,
  ContentModule,
  CourseContent,
  CourseContentService
} from '../../../../core/services/course-content.service';

@Component({
  selector: 'sqx-recorded-classes',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule, CardModule, ButtonModule, TooltipModule],
  templateUrl: './recorded-classes.html',
  styleUrl: './recorded-classes.scss'
})
export class RecordedClasses implements OnInit, OnDestroy {
  // State
  readonly currentView = signal<'courses' | 'chapters' | 'concepts'>('courses');
  readonly selectedCourse = signal<AvailableCourseContent | null>(null);
  readonly selectedContent = signal<CourseContent | null>(null);
  readonly selectedChapter = signal<ContentModule | null>(null);
  readonly courses = signal<AvailableCourseContent[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');

  constructor(private headerService: HeaderService, private contentService: CourseContentService) {
    this.updateGlobalHeader();
  }

  ngOnInit() {
    this.contentService.getAvailableCourses().subscribe({
      next: (courses) => {
        this.courses.set(courses);
        this.loading.set(false);
        if (!courses.length) this.error.set('No recorded class content is available yet.');
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Could not load recorded classes.');
      },
    });
  }

  ngOnDestroy() {
    this.headerService.reset();
  }

  // Navigation Methods

  selectCourse(course: AvailableCourseContent) {
    this.selectedCourse.set(course);
    this.loading.set(true);
    this.contentService.getContent(course.id).subscribe({
      next: (content) => {
        this.selectedContent.set(content);
        this.currentView.set('chapters');
        this.loading.set(false);
        this.updateGlobalHeader();
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Content is not published or you are not enrolled in this course.');
      },
    });
  }

  selectChapter(chapter: ContentModule) {
    this.selectedChapter.set(chapter);
    this.currentView.set('concepts');
    this.updateGlobalHeader();
  }

  // Helpers
  getProgressColor(progress: number): string {
    if (progress >= 75) return '#10B981'; // Green
    if (progress >= 40) return '#5B4BC4'; // Primary
    return '#F59E0B'; // Orange
  }

  // Content Interaction
  openConcept(lesson: ContentLesson) {
    const video = lesson.blocks.find((block) => block.type === 'video' && block.url);
    const document = lesson.blocks.find((block) => ['document', 'link', 'image'].includes(block.type) && block.url);
    const target = video ?? document;
    if (target?.url) window.open(this.contentService.absoluteAssetUrl(target.url), '_blank', 'noopener');
  }

  updateGlobalHeader() {
    const base: any[] = [
      { icon: 'pi pi-home', url: '/dashboard', label: 'Home' }, // Provide label for clarity/fallback
      { label: 'Classes' },
      { label: 'Recorded Classes', command: () => this.resetView() }
    ];

    if (this.currentView() === 'courses') {
      this.headerService.updateBreadcrumbs([...base]);
    } else if (this.currentView() === 'chapters' && this.selectedCourse()) {
      this.headerService.updateBreadcrumbs([
        ...base,
        {
          label: this.selectedCourse()!.title || 'Course', // Fallback for undefined
          title: this.selectedCourse()!.title
        }
      ]);
    } else if (this.currentView() === 'concepts' && this.selectedCourse() && this.selectedChapter()) {
      this.headerService.updateBreadcrumbs([
        ...base,
        {
          label: this.selectedCourse()!.title || 'Course',
          title: this.selectedCourse()!.title,
          command: () => this.selectCourse(this.selectedCourse()!)
        },
        { label: this.selectedChapter()!.title || 'Chapter' }
      ]);
    }
  }

  resetView() {
    this.currentView.set('courses');
    this.selectedCourse.set(null);
    this.selectedContent.set(null);
    this.selectedChapter.set(null);
    this.updateGlobalHeader();
  }

  lessonType(lesson: ContentLesson): string {
    if (lesson.blocks.some((block) => block.type === 'video')) return 'video';
    if (lesson.blocks.some((block) => block.type === 'assignment_note')) return 'assignment';
    return 'reading';
  }

  lessonDuration(lesson: ContentLesson): string {
    return lesson.durationMinutes ? `${lesson.durationMinutes} min` : 'Reading';
  }

  moduleColor(index: number): string {
    return ['#C7D2FE', '#A5F3FC', '#DDD6FE', '#FDE68A', '#BBF7D0', '#E5E7EB'][index % 6];
  }
}
