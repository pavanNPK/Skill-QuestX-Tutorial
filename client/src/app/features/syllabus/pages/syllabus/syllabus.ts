// use of this file is:
// Feature page/container file. It connects route UI, feature state, services, and user actions.
import { Component, OnInit, inject, signal } from '@angular/core';

import { AccordionModule } from 'primeng/accordion';
import { CourseContent, CourseContentService, AvailableCourseContent } from '../../../../core/services/course-content.service';

@Component({
  selector: 'sqx-syllabus',
  standalone: true,
  imports: [AccordionModule],
  templateUrl: './syllabus.html',
  styleUrl: './syllabus.scss',
})
export class Syllabus implements OnInit {
  private contentService = inject(CourseContentService);

  readonly courses = signal<AvailableCourseContent[]>([]);
  readonly selectedCourseId = signal('');
  readonly content = signal<CourseContent | null>(null);
  readonly loading = signal(true);
  readonly error = signal('');

  ngOnInit() {
    this.contentService.getAvailableCourses().subscribe({
      next: (courses) => {
        this.courses.set(courses);
        this.selectedCourseId.set(courses[0]?.id ?? '');
        if (this.selectedCourseId()) this.loadContent();
        else {
          this.loading.set(false);
          this.error.set('No course content is available yet.');
        }
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Could not load course syllabus.');
      },
    });
  }

  onCourseChange(event: Event) {
    this.selectedCourseId.set((event.target as HTMLSelectElement).value);
    this.loadContent();
  }

  loadContent() {
    if (!this.selectedCourseId()) return;
    this.loading.set(true);
    this.error.set('');
    this.contentService.getContent(this.selectedCourseId()).subscribe({
      next: (content) => {
        this.content.set(content);
        this.loading.set(false);
      },
      error: () => {
        this.content.set(null);
        this.loading.set(false);
        this.error.set('Content is not published or you are not enrolled in this course.');
      },
    });
  }
}
