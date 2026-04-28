import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { Subject, filter, takeUntil } from 'rxjs';
import { HeaderService } from '../../core/services/header.service';
import { AuthService } from '../../core/services/auth.service';
import {
  AvailableCourseContent,
  ContentBlock,
  ContentLesson,
  ContentModule,
  CourseContent,
  CourseContentService,
  NestedBulletItem
} from '../../core/services/course-content.service';

interface FlattenedBullet {
  text: string;
  level: number;
}

@Component({
  selector: 'sqx-materials',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule, TableModule, BreadcrumbModule],
  templateUrl: './materials.html',
  styleUrl: './materials.scss',
})
export class Materials implements OnInit, OnDestroy {
  selectedCourse: AvailableCourseContent | null = null;
  selectedContent: CourseContent | null = null;
  selectedModule: ContentModule | null = null;
  currentLessonIndex = 0;
  displayModal: boolean = false;
  selectedLesson: ContentLesson | null = null;
  enrolledCourses: AvailableCourseContent[] = [];
  loading = true;
  error = '';
  private readonly destroy$ = new Subject<void>();

  get visibleCourses(): AvailableCourseContent[] {
    return Array.isArray(this.enrolledCourses) ? this.enrolledCourses : [];
  }

  get indexModules(): ContentModule[] {
    return this.selectedContent?.modules ?? [];
  }

  get currentLesson(): ContentLesson | null {
    if (!this.selectedModule?.lessons?.length) return null;
    return this.selectedModule.lessons[this.currentLessonIndex] ?? null;
  }

  get currentSlideNumber(): number {
    return this.currentLessonIndex + 1;
  }

  get totalSlides(): number {
    return this.selectedModule?.lessons?.length ?? 0;
  }

  private breadcrumbLabel(title: string): string {
    return title.replace(/^\d+\.\s*/, '');
  }

  constructor(
    private headerService: HeaderService,
    private contentService: CourseContentService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.updateGlobalHeader();
    this.loadAvailableCourses();
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        filter((event) => event.urlAfterRedirects === '/materials'),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        if (this.loading) return;
        console.info('[Materials Page] /materials route activated, refreshing available courses');
        this.selectedCourse = null;
        this.selectedContent = null;
        this.selectedModule = null;
        this.currentLessonIndex = 0;
        this.loadAvailableCourses();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.headerService.reset();
  }

  private loadAvailableCourses() {
    console.info('[Materials Page] Loading available courses for route', {
      url: this.router.url,
      currentUser: this.authService.currentUser(),
    });
    this.loading = true;
    this.error = '';
    this.cdr.detectChanges();
    this.contentService.getAvailableCourses().subscribe({
      next: (courses) => {
        const normalizedCourses = Array.isArray(courses) ? courses : [];
        console.info('[Materials Page] Available courses loaded', {
          currentUser: this.authService.currentUser(),
          count: normalizedCourses.length,
          courses: normalizedCourses,
        });
        this.enrolledCourses = normalizedCourses;
        this.loading = false;
        this.error = normalizedCourses.length ? '' : this.emptyStateMessage();
        this.cdr.detectChanges();
        if (normalizedCourses.length === 1 && !this.selectedCourse) {
          this.selectCourse(normalizedCourses[0]);
        }
      },
      error: (error) => {
        console.error('[Materials Page] Failed to load available courses', {
          currentUser: this.authService.currentUser(),
          error,
        });
        this.loading = false;
        this.error = 'Could not load materials.';
        this.cdr.detectChanges();
      },
    });
  }

  updateGlobalHeader() {
    if (!this.selectedCourse) {
      this.headerService.updateTitle('Materials');
      this.headerService.updateBreadcrumbs([
        { icon: 'pi pi-home', url: '/dashboard', label: 'Home' },
        { label: 'Materials' }
      ]);
      return;
    }

    if (this.selectedModule) {
      this.headerService.updateTitle('');
      this.headerService.updateBreadcrumbs([
        { icon: 'pi pi-home', url: '/dashboard', label: 'Home' },
        { label: 'Materials', command: () => this.backToIndex() },
        { label: this.breadcrumbLabel(this.selectedModule.title) }
      ]);
      return;
    }

    this.headerService.updateTitle('');
    this.headerService.updateBreadcrumbs([
      { icon: 'pi pi-home', url: '/dashboard', label: 'Home' },
      { label: 'Materials', command: () => this.goBack() },
      { label: this.selectedCourse.title }
    ]);
  }

  selectCourse(course: AvailableCourseContent) {
    console.info('[Materials Page] Selected course', course);
    this.selectedCourse = course;
    this.loading = true;
    this.error = '';
    this.contentService.getContent(course.id).subscribe({
      next: (content) => {
        console.info('[Materials Page] Course content loaded', {
          courseId: course.id,
          status: content.status,
          mode: content.mode,
          modules: content.modules.length,
          content,
        });
        this.selectedContent = content;
        this.selectedModule = null;
        this.currentLessonIndex = 0;
        this.loading = false;
        this.updateGlobalHeader();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('[Materials Page] Failed to load course content', {
          course,
          error,
        });
        this.selectedContent = null;
        this.loading = false;
        this.error = 'Content is not published or you are not enrolled in this course.';
        this.cdr.detectChanges();
      },
    });
  }

  goBack() {
    this.selectedCourse = null;
    this.selectedContent = null;
    this.selectedModule = null;
    this.currentLessonIndex = 0;
    this.updateGlobalHeader();
  }

  backToIndex() {
    this.selectedModule = null;
    this.currentLessonIndex = 0;
    this.updateGlobalHeader();
  }

  openIndex(module: ContentModule) {
    console.info('[Materials Page] Open index module', module);
    this.selectedModule = module;
    this.currentLessonIndex = 0;
    this.updateGlobalHeader();
    this.cdr.detectChanges();
  }

  previousSlide() {
    if (this.currentLessonIndex > 0) {
      this.currentLessonIndex--;
      this.cdr.detectChanges();
    }
  }

  nextSlide() {
    if (this.selectedModule && this.currentLessonIndex < this.selectedModule.lessons.length - 1) {
      this.currentLessonIndex++;
      this.cdr.detectChanges();
    }
  }

  viewLesson(lesson: ContentLesson) {
    this.selectedLesson = lesson;
    this.displayModal = true;
  }

  getIconForType(type: string): string {
    switch (type) {
      case 'video': return 'pi pi-video';
      case 'document': return 'pi pi-file';
      case 'image': return 'pi pi-image';
      case 'link': return 'pi pi-link';
      case 'paragraph': return 'pi pi-align-left';
      case 'assignment_note': return 'pi pi-pencil';
      default: return 'pi pi-file';
    }
  }

  materialBlocks(lesson: ContentLesson): ContentBlock[] {
    return lesson.blocks.filter((block) => ['document', 'image', 'video', 'link', 'paragraph', 'assignment_note', 'heading', 'bullet_list', 'nested_bullet_list', 'table'].includes(block.type));
  }

  flattenedBullets(items?: NestedBulletItem[], level = 0): FlattenedBullet[] {
    if (!Array.isArray(items)) return [];
    return items.flatMap((item) => [
      { text: item.text, level },
      ...this.flattenedBullets(item.children, level + 1),
    ]);
  }

  hasOpenableAsset(block: ContentBlock): boolean {
    return ['document', 'image', 'video', 'link'].includes(block.type) && !!block.url;
  }

  openBlock(block: ContentBlock) {
    const url = this.contentService.absoluteAssetUrl(block.url);
    if (url) window.open(url, '_blank', 'noopener');
  }

  private emptyStateMessage(): string {
    const role = this.authService.currentUser()?.role;
    if (role === 'instructor') {
      return 'No course content is available for this instructor. Assign this instructor to a course, then import or publish content.';
    }
    if (role === 'student') {
      return 'No published material is available for your enrolled courses yet.';
    }
    return 'No course content is available yet. Import content from the course editor first.';
  }
}
