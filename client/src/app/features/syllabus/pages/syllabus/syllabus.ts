// use of this file is:
// Feature page/container file. It connects route UI, feature state, services, and user actions.
import { Component, OnInit, inject } from '@angular/core';

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

  courses: AvailableCourseContent[] = [];
  selectedCourseId = '';
  content: CourseContent | null = null;
  loading = true;
  error = '';

  ngOnInit() {
    this.contentService.getAvailableCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.selectedCourseId = courses[0]?.id ?? '';
        if (this.selectedCourseId) this.loadContent();
        else {
          this.loading = false;
          this.error = 'No course content is available yet.';
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'Could not load course syllabus.';
      },
    });
  }

  onCourseChange(event: Event) {
    this.selectedCourseId = (event.target as HTMLSelectElement).value;
    this.loadContent();
  }

  loadContent() {
    if (!this.selectedCourseId) return;
    this.loading = true;
    this.error = '';
    this.contentService.getContent(this.selectedCourseId).subscribe({
      next: (content) => {
        this.content = content;
        this.loading = false;
      },
      error: () => {
        this.content = null;
        this.loading = false;
        this.error = 'Content is not published or you are not enrolled in this course.';
      },
    });
  }
}
