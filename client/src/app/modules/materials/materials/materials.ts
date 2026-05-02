import { ChangeDetectorRef, Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  ContentBlockType,
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

interface BlockTypeOption {
  label: string;
  value: ContentBlockType;
}

@Component({
  selector: 'sqx-materials',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule, TableModule, BreadcrumbModule],
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
  manageMode = false;
  saving = false;
  managerMessage = '';
  selectedManageModuleId = '';
  selectedManageLessonId = '';
  previewBlock: ContentBlock | null = null;
  previewZoom = 1;
  newBlockType: ContentBlockType = 'paragraph';
  readonly editableBlockTypes: BlockTypeOption[] = [
    { label: 'Heading', value: 'heading' },
    { label: 'Paragraph', value: 'paragraph' },
    { label: 'Note', value: 'assignment_note' },
    { label: 'Bullet list', value: 'bullet_list' },
    { label: 'Nested list', value: 'nested_bullet_list' },
    { label: 'Table', value: 'table' },
  ];
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

  get totalCourseSlides(): number {
    return this.indexModules.reduce((total, module) => total + module.lessons.length, 0);
  }

  get selectedManageModule(): ContentModule | null {
    return this.indexModules.find((module) => module.id === this.selectedManageModuleId) ?? this.indexModules[0] ?? null;
  }

  get selectedManageLesson(): ContentLesson | null {
    const module = this.selectedManageModule;
    if (!module?.lessons?.length) return null;
    return module.lessons.find((lesson) => lesson.id === this.selectedManageLessonId) ?? module.lessons[0] ?? null;
  }

  breadcrumbLabel(title: string): string {
    return title.replace(/^\d+\.\s*/, '');
  }

  courseDisplayTitle(course: AvailableCourseContent | CourseContent | null): string {
    if (!course?.title) return '';
    if (/^basic anatomy\s*&\s*physiology$/i.test(course.title.trim())) {
      return 'Anatomy';
    }
    return this.breadcrumbLabel(course.title);
  }

  moduleTitle(module: ContentModule, index?: number): string {
    const fallbackPrefix = typeof index === 'number' ? `${index + 1}. ` : '';
    return this.breadcrumbLabel(module.title).replace(fallbackPrefix, '');
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
      this.headerService.updateTitle('Materials');
      this.headerService.updateBreadcrumbs([
        { icon: 'pi pi-home', url: '/dashboard', label: 'Home' },
        { label: 'Materials', command: () => this.goBack() },
        { label: this.courseDisplayTitle(this.selectedCourse), command: () => this.backToIndex() },
        { label: this.breadcrumbLabel(this.selectedModule.title) }
      ]);
      return;
    }

    if (this.manageMode) {
      this.headerService.updateTitle('Materials');
      this.headerService.updateBreadcrumbs([
        { icon: 'pi pi-home', url: '/dashboard', label: 'Home' },
        { label: 'Materials', command: () => this.goBack() },
        { label: this.courseDisplayTitle(this.selectedCourse), command: () => this.stopManage() },
        { label: 'Manage Slides' }
      ]);
      return;
    }

    this.headerService.updateTitle('Materials');
    this.headerService.updateBreadcrumbs([
      { icon: 'pi pi-home', url: '/dashboard', label: 'Home' },
      { label: 'Materials', command: () => this.goBack() },
      { label: this.courseDisplayTitle(this.selectedCourse) }
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
        this.manageMode = false;
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
    this.manageMode = false;
    this.currentLessonIndex = 0;
    this.updateGlobalHeader();
    this.cdr.detectChanges();
  }

  backToIndex() {
    this.selectedModule = null;
    this.manageMode = false;
    this.currentLessonIndex = 0;
    this.updateGlobalHeader();
    this.cdr.detectChanges();
  }

  openIndex(module: ContentModule) {
    console.info('[Materials Page] Open index module', module);
    this.selectedModule = module;
    this.currentLessonIndex = 0;
    this.updateGlobalHeader();
    this.cdr.detectChanges();
  }

  startManage() {
    if (!this.selectedContent?.canManage) return;
    this.manageMode = true;
    this.selectedModule = null;
    this.managerMessage = '';
    this.selectedManageModuleId = this.indexModules[0]?.id ?? '';
    this.selectedManageLessonId = this.selectedManageModule?.lessons[0]?.id ?? '';
    this.updateGlobalHeader();
    this.cdr.detectChanges();
  }

  stopManage() {
    this.manageMode = false;
    this.managerMessage = '';
    this.updateGlobalHeader();
    this.cdr.detectChanges();
  }

  selectManageModule(module: ContentModule) {
    this.selectedManageModuleId = module.id;
    this.selectedManageLessonId = module.lessons[0]?.id ?? '';
  }

  selectManageLesson(lesson: ContentLesson) {
    this.selectedManageLessonId = lesson.id;
  }

  addSlide() {
    const module = this.selectedManageModule;
    if (!module) return;
    const lesson: ContentLesson = {
      id: this.createId('slide'),
      title: `Slide ${module.lessons.length + 1}`,
      summary: '',
      durationMinutes: 0,
      blocks: [],
    };
    module.lessons = [...module.lessons, lesson];
    this.selectedManageLessonId = lesson.id;
    this.saveContentDraft('Slide added.');
  }

  deleteSlide(lesson: ContentLesson) {
    const module = this.selectedManageModule;
    if (!module) return;
    module.lessons = module.lessons.filter((item) => item.id !== lesson.id);
    this.selectedManageLessonId = module.lessons[0]?.id ?? '';
    this.saveContentDraft('Slide deleted.');
  }

  addTextBlock() {
    this.addContentBlock('paragraph');
  }

  addTableBlock() {
    this.addContentBlock('table');
  }

  addSelectedBlock() {
    this.addContentBlock(this.newBlockType);
  }

  addContentBlock(type: ContentBlockType) {
    const lesson = this.selectedManageLesson;
    if (!lesson) return;
    const baseBlock: ContentBlock = {
      id: this.createId('block'),
      type,
      title: type === 'table' ? 'New table' : 'New content',
      text: type === 'heading' ? 'New heading' : 'Add slide text here.',
    };
    if (type === 'bullet_list' || type === 'nested_bullet_list') {
      baseBlock.items = [{ text: 'First point' }, { text: 'Second point' }];
      baseBlock.text = '';
    }
    if (type === 'table') {
      baseBlock.columns = ['Column 1', 'Column 2'];
      baseBlock.rows = [['Value 1', 'Value 2']];
      baseBlock.text = '';
    }
    lesson.blocks = [
      ...lesson.blocks,
      baseBlock,
    ];
    this.saveContentDraft('Content block added.');
  }

  deleteBlock(block: ContentBlock) {
    const lesson = this.selectedManageLesson;
    if (!lesson) return;
    lesson.blocks = lesson.blocks.filter((item) => item.id !== block.id);
    this.saveContentDraft('File removed from slide.');
  }

  onSlideFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    if (!files.length || !this.selectedCourse || !this.selectedManageLesson) return;
    this.saving = true;
    this.managerMessage = `Uploading ${files.length} file${files.length === 1 ? '' : 's'}...`;
    let completed = 0;
    let uploaded = 0;
    const finishUpload = () => {
      completed++;
      if (completed !== files.length) return;
      if (uploaded > 0) {
        this.saveContentDraft(`${uploaded} file${uploaded === 1 ? '' : 's'} uploaded and attached to slide.`);
        return;
      }
      this.saving = false;
      this.managerMessage = 'No files were uploaded. Check file size and server logs.';
      this.cdr.detectChanges();
    };
    files.forEach((file) => {
      this.contentService.uploadAsset(this.selectedCourse!.id, file).subscribe({
        next: (asset) => {
          uploaded++;
          this.selectedManageLesson!.blocks = [
            ...this.selectedManageLesson!.blocks,
            {
              id: this.createId('asset'),
              type: asset.type === 'image' || asset.type === 'video' ? asset.type : 'document',
              title: asset.originalName,
              text: asset.originalName,
              url: asset.url,
              assetId: asset.id,
            },
          ];
          finishUpload();
        },
        error: (error) => {
          const message = error?.error?.message || error?.message || 'Upload failed.';
          this.managerMessage = message;
          finishUpload();
        },
      });
    });
  }

  saveContentDraft(message = 'Draft saved.') {
    if (!this.selectedCourse || !this.selectedContent) return;
    this.saving = true;
    this.managerMessage = 'Saving draft...';
    this.contentService.saveDraft(this.selectedCourse.id, this.selectedContent).subscribe({
      next: (content) => {
        this.selectedContent = content;
        this.saving = false;
        this.managerMessage = message;
        this.cdr.detectChanges();
      },
      error: () => {
        this.saving = false;
        this.managerMessage = 'Could not save draft.';
        this.cdr.detectChanges();
      },
    });
  }

  publishContent() {
    if (!this.selectedCourse) return;
    this.saving = true;
    this.managerMessage = 'Publishing...';
    this.contentService.publish(this.selectedCourse.id).subscribe({
      next: (content) => {
        this.selectedContent = content;
        this.saving = false;
        this.managerMessage = 'Published successfully.';
      },
      error: () => {
        this.saving = false;
        this.managerMessage = 'Could not publish content.';
      },
    });
  }

  openPreview(block: ContentBlock) {
    if (!['image', 'video'].includes(block.type)) return;
    this.previewBlock = block;
    this.previewZoom = 1;
  }

  closePreview() {
    this.previewBlock = null;
    this.previewZoom = 1;
  }

  zoomPreview(delta: number) {
    this.previewZoom = Math.min(3, Math.max(0.5, this.previewZoom + delta));
  }

  blockAssetUrl(block: ContentBlock): string {
    return this.contentService.absoluteAssetUrl(block.url);
  }

  assetPreviewLabel(block: ContentBlock): string {
    if (block.type === 'image') return 'Image';
    if (block.type === 'video') return 'Video';
    if (block.type === 'paragraph' || block.type === 'assignment_note') return 'Text';
    if (block.type === 'heading') return 'Heading';
    if (block.type === 'bullet_list' || block.type === 'nested_bullet_list') return 'List';
    if (block.type === 'table') return 'Table';
    return 'File';
  }

  contentBlocks(lesson: ContentLesson): ContentBlock[] {
    return lesson.blocks.filter((block) => !this.isFileBlock(block));
  }

  fileBlocks(lesson: ContentLesson): ContentBlock[] {
    return lesson.blocks.filter((block) => this.isFileBlock(block));
  }

  isFileBlock(block: ContentBlock): boolean {
    return ['image', 'video', 'document', 'link'].includes(block.type) && !!block.url;
  }

  updateBlockType(block: ContentBlock, type: ContentBlockType) {
    block.type = type;
    if (type === 'bullet_list' || type === 'nested_bullet_list') {
      block.items = block.items?.length ? block.items : [{ text: block.text || 'First point' }];
      block.text = '';
    }
    if (type === 'table') {
      block.columns = block.columns?.length ? block.columns : ['Column 1', 'Column 2'];
      block.rows = block.rows?.length ? block.rows : [['Value 1', 'Value 2']];
      block.text = '';
    }
  }

  blockItemsText(block: ContentBlock): string {
    return (block.items ?? []).map((item) => item.text).join('\n');
  }

  setBlockItemsText(block: ContentBlock, value: string) {
    block.items = value
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((text) => ({ text }));
  }

  tableColumnsText(block: ContentBlock): string {
    return (block.columns ?? []).join('\t');
  }

  setTableColumnsText(block: ContentBlock, value: string) {
    block.columns = value.split(/\t|,/).map((column) => column.trim()).filter(Boolean);
  }

  tableRowsText(block: ContentBlock): string {
    return (block.rows ?? []).map((row) => row.join('\t')).join('\n');
  }

  setTableRowsText(block: ContentBlock, value: string) {
    block.rows = value
      .split('\n')
      .map((row) => row.split(/\t|,/).map((cell) => cell.trim()))
      .filter((row) => row.some(Boolean));
  }

  tableColumns(block: ContentBlock): string[] {
    if (!block.columns?.length) block.columns = ['Column 1'];
    return block.columns;
  }

  tableRows(block: ContentBlock): string[][] {
    if (!block.rows?.length) block.rows = [this.tableColumns(block).map(() => '')];
    const columnCount = this.tableColumns(block).length;
    block.rows = block.rows.map((row) => {
      const next = [...row];
      while (next.length < columnCount) next.push('');
      return next.slice(0, columnCount);
    });
    return block.rows;
  }

  addTableColumn(block: ContentBlock) {
    block.columns = [...this.tableColumns(block), `Column ${this.tableColumns(block).length + 1}`];
    block.rows = this.tableRows(block).map((row) => [...row, '']);
  }

  deleteTableColumn(block: ContentBlock, columnIndex: number) {
    if (this.tableColumns(block).length <= 1) return;
    block.columns = this.tableColumns(block).filter((_, index) => index !== columnIndex);
    block.rows = this.tableRows(block).map((row) => row.filter((_, index) => index !== columnIndex));
  }

  addTableRow(block: ContentBlock) {
    block.rows = [...this.tableRows(block), this.tableColumns(block).map(() => '')];
  }

  deleteTableRow(block: ContentBlock, rowIndex: number) {
    if (this.tableRows(block).length <= 1) return;
    block.rows = this.tableRows(block).filter((_, index) => index !== rowIndex);
  }

  @HostListener('window:keydown', ['$event'])
  handleSlideKeys(event: KeyboardEvent) {
    if (!this.selectedModule || this.previewBlock) return;
    if (event.key === 'ArrowLeft') this.previousSlide();
    if (event.key === 'ArrowRight') this.nextSlide();
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

  private createId(prefix: string): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return `${prefix}-${crypto.randomUUID()}`;
    }
    return `${prefix}-${Date.now()}-${Math.round(Math.random() * 1e6)}`;
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
