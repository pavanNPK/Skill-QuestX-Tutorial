// use of this file is:
// Feature page/container file. It connects route UI, feature state, services, and user actions.
import { ChangeDetectorRef, Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { filter } from 'rxjs';
import { HeaderService } from '../../../../core/services/header.service';
import { AuthService } from '../../../../core/services/auth.service';
import {
  AvailableCourseContent,
  ContentBlock,
  ContentBlockType,
  ContentLesson,
  ContentModule,
  CourseContent,
  CourseContentService,
  NestedBulletItem
} from '../../../../core/services/course-content.service';
import { BaseComponent } from '../../../../shared/components/base.component';
import { MaterialsStore } from '../../state/materials.store';

interface FlattenedBullet {
  text: string;
  level: number;
  marker?: string;
}

interface BlockTypeOption {
  label: string;
  value: ContentBlockType;
}

interface TextSegment {
  text: string;
  bold: boolean;
}

interface MaterialsRouteState {
  fromRoute?: boolean;
  mode?: string | null;
  indexId?: string | null;
  slideId?: string | null;
}

@Component({
  selector: 'sqx-materials',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule, ConfirmDialogModule, TableModule, BreadcrumbModule],
  templateUrl: './materials.html',
  styleUrl: './materials.scss',
  providers: [ConfirmationService],
})
export class Materials extends BaseComponent implements OnInit {
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
  private previousBodyOverflow = '';
  activeFileIndex = 0;
  newBlockType: ContentBlockType = 'paragraph';
  readonly editableBlockTypes: BlockTypeOption[] = [
    { label: 'Heading', value: 'heading' },
    { label: 'Paragraph', value: 'paragraph' },
    { label: 'Note', value: 'assignment_note' },
    { label: 'Bullet list', value: 'bullet_list' },
    { label: 'Nested list', value: 'nested_bullet_list' },
    { label: 'Table', value: 'table' },
  ];
  private readonly materialsStore = inject(MaterialsStore);

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
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    super();
  }

  ngOnInit() {
    this.updateGlobalHeader();
    this.loadAvailableCourses();
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        filter((event) => event.urlAfterRedirects.split('?')[0] === '/materials'),
        this.untilDestroyed(),
      )
      .subscribe((event) => {
        if (this.loading) return;
        if (this.selectedCourse || event.urlAfterRedirects.includes('?')) {
          this.updateGlobalHeader();
          this.cdr.detectChanges();
          return;
        }
        this.selectedCourse = null;
        this.selectedContent = null;
        this.selectedModule = null;
        this.currentLessonIndex = 0;
        this.loadAvailableCourses();
      });
  }

  override ngOnDestroy() {
    this.unlockBodyScroll();
    this.headerService.reset();
    super.ngOnDestroy();
  }

  private loadAvailableCourses() {
    this.loading = true;
    this.error = '';
    this.cdr.detectChanges();
    this.materialsStore.loadAvailableCourses()
      .then((courses) => {
        const normalizedCourses = Array.isArray(courses) ? courses : [];
        this.enrolledCourses = normalizedCourses;
        this.loading = false;
        this.error = normalizedCourses.length ? '' : this.emptyStateMessage();
        this.restoreFromRoute(normalizedCourses);
        this.cdr.detectChanges();
      })
      .catch(() => {
        this.loading = false;
        this.error = 'Could not load materials.';
        this.cdr.detectChanges();
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
      { label: this.courseDisplayTitle(this.selectedCourse), command: () => this.backToIndex() }
    ]);
  }

  selectCourse(course: AvailableCourseContent, routeState?: MaterialsRouteState) {
    this.selectedCourse = course;
    this.loading = true;
    this.error = '';
    if (!routeState?.fromRoute) {
      this.updateMaterialsUrl({ courseId: course.id });
    }
    this.materialsStore.selectCourse(course.id)
      .then((content) => {
        this.selectedContent = content;
        this.selectedModule = null;
        this.manageMode = false;
        this.currentLessonIndex = 0;
        this.applyRouteState(routeState);
        this.loading = false;
        this.updateGlobalHeader();
        this.cdr.detectChanges();
      })
      .catch(() => {
        this.selectedContent = null;
        this.loading = false;
        this.error = 'Content is not published or you are not enrolled in this course.';
        this.cdr.detectChanges();
      });
  }

  goBack() {
    this.selectedCourse = null;
    this.selectedContent = null;
    this.selectedModule = null;
    this.manageMode = false;
    this.currentLessonIndex = 0;
    this.materialsStore.clearSelection();
    this.updateMaterialsUrl({});
    this.updateGlobalHeader();
    this.cdr.detectChanges();
  }

  backToIndex() {
    this.selectedModule = null;
    this.manageMode = false;
    this.currentLessonIndex = 0;
    if (this.selectedCourse) {
      this.updateMaterialsUrl({ courseId: this.selectedCourse.id });
    }
    this.updateGlobalHeader();
    this.cdr.detectChanges();
  }

  openIndex(module: ContentModule) {
    this.selectedModule = module;
    this.currentLessonIndex = 0;
    this.activeFileIndex = 0;
    this.updateSlideUrl();
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
    this.updateMaterialsUrl({ courseId: this.selectedCourse?.id, mode: 'manage' });
    this.updateGlobalHeader();
    this.cdr.detectChanges();
  }

  stopManage() {
    this.manageMode = false;
    this.managerMessage = '';
    if (this.selectedCourse) {
      this.updateMaterialsUrl({ courseId: this.selectedCourse.id });
    }
    this.updateGlobalHeader();
    this.cdr.detectChanges();
  }

  private restoreFromRoute(courses: AvailableCourseContent[]) {
    if (this.selectedCourse) return;
    const params = this.route.snapshot.queryParamMap;
    const courseId = params.get('course');
    if (!courseId) return;

    const course = courses.find((item) => item.id === courseId);
    if (!course) {
      this.updateMaterialsUrl({}, true);
      return;
    }

    this.selectCourse(course, {
      fromRoute: true,
      mode: params.get('mode'),
      indexId: params.get('index'),
      slideId: params.get('slide'),
    });
  }

  private applyRouteState(routeState?: MaterialsRouteState) {
    if (!routeState?.fromRoute || !this.selectedContent) return;

    if (routeState.mode === 'manage' && this.selectedContent.canManage) {
      this.manageMode = true;
      this.selectedModule = null;
      this.managerMessage = '';
      this.selectedManageModuleId = this.indexModules[0]?.id ?? '';
      this.selectedManageLessonId = this.selectedManageModule?.lessons[0]?.id ?? '';
      return;
    }

    if (!routeState.indexId) return;

    const module = this.selectedContent.modules.find((item) => item.id === routeState.indexId);
    if (!module) return;

    this.selectedModule = module;
    this.manageMode = false;
    this.activeFileIndex = 0;
    const slideIndex = routeState.slideId
      ? module.lessons.findIndex((lesson) => lesson.id === routeState.slideId)
      : 0;
    this.currentLessonIndex = slideIndex >= 0 ? slideIndex : 0;
  }

  private updateSlideUrl() {
    if (!this.selectedCourse || !this.selectedModule) return;
    this.updateMaterialsUrl({
      courseId: this.selectedCourse.id,
      indexId: this.selectedModule.id,
      slideId: this.currentLesson?.id,
    });
  }

  private updateMaterialsUrl(state: {
    courseId?: string | null;
    indexId?: string | null;
    slideId?: string | null;
    mode?: string | null;
  }, replaceUrl = false) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        course: state.courseId || null,
        index: state.indexId || null,
        slide: state.slideId || null,
        mode: state.mode || null,
      },
      replaceUrl,
    });
  }

  selectManageModule(module: ContentModule) {
    this.selectedManageModuleId = module.id;
    this.selectedManageLessonId = module.lessons[0]?.id ?? '';
  }

  selectManageLesson(lesson: ContentLesson) {
    this.selectedManageLessonId = lesson.id;
  }

  addIndex() {
    if (!this.selectedContent) return;
    const module: ContentModule = {
      id: this.createId('index'),
      title: `New Index ${this.indexModules.length + 1}`,
      summary: '',
      lessons: [],
    };
    this.selectedContent.modules = [...this.indexModules, module];
    this.selectedManageModuleId = module.id;
    this.selectedManageLessonId = '';
    this.saveContentDraft('Index added.');
  }

  deleteIndex(module: ContentModule) {
    if (!this.selectedContent) return;
    this.selectedContent.modules = this.indexModules.filter((item) => item.id !== module.id);
    if (this.selectedManageModuleId === module.id) {
      this.selectedManageModuleId = this.indexModules[0]?.id ?? '';
      this.selectedManageLessonId = this.selectedManageModule?.lessons[0]?.id ?? '';
    }
    this.saveContentDraft('Index deleted.');
  }

  confirmDeleteIndex(event: Event, module: ContentModule) {
    event.stopPropagation();
    const name = this.moduleTitle(module);
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header: 'Delete Index',
      message: `Delete index "${name}" and all ${module.lessons.length} slide${module.lessons.length === 1 ? '' : 's'} inside it?`,
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete Index',
        severity: 'danger',
      },
      accept: () => this.deleteIndex(module),
    });
  }

  onBulkWorkbookSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    input.value = '';
    if (!file || !this.selectedCourse) return;
    if (!file.name.toLowerCase().endsWith('.xlsx')) {
      this.managerMessage = 'Upload an Excel .xlsx workbook.';
      return;
    }
    this.saving = true;
    this.managerMessage = 'Importing workbook...';
    this.contentService.importWorkbook(this.selectedCourse.id, file)
      .pipe(this.untilDestroyed())
      .subscribe({
        next: (content) => {
        this.materialsStore.setCourseContent(content);
        this.selectedContent = content;
        this.selectedModule = null;
        this.selectedManageModuleId = this.indexModules[0]?.id ?? '';
        this.selectedManageLessonId = this.selectedManageModule?.lessons[0]?.id ?? '';
        this.saving = false;
        this.managerMessage = 'Workbook imported as draft. Review it before publishing.';
        this.messageService.add({
          severity: 'success',
          summary: 'Workbook imported',
          detail: 'Imported content was saved as draft.',
        });
        this.cdr.detectChanges();
        },
        error: (error) => {
        this.saving = false;
        this.managerMessage = error?.error?.message || 'Could not import workbook.';
        this.cdr.detectChanges();
        },
      });
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

  confirmDeleteSlide(event: Event, lesson: ContentLesson) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header: 'Delete Slide',
      message: `Delete slide "${lesson.title}"?`,
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete Slide',
        severity: 'danger',
      },
      accept: () => this.deleteSlide(lesson),
    });
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
    this.saveContentDraft(this.isFileBlock(block) ? 'File removed from slide.' : 'Content block removed from slide.');
  }

  confirmDeleteBlock(event: Event, block: ContentBlock) {
    event.stopPropagation();
    const name = block.title || block.text || this.assetPreviewLabel(block);
    const isFile = this.isFileBlock(block);
    const isTable = block.type === 'table';
    const header = isFile ? 'Delete File' : isTable ? 'Delete Table' : 'Delete Block';
    const acceptLabel = isFile ? 'Delete File' : isTable ? 'Delete Table' : 'Delete Block';
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header,
      message: `Delete "${name}" from this slide?`,
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: acceptLabel,
        severity: 'danger',
      },
      accept: () => this.deleteBlock(block),
    });
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
    let failed = 0;
    const finishUpload = () => {
      completed++;
      if (completed !== files.length) return;
      if (uploaded > 0) {
        this.saveContentDraft(`${uploaded} file${uploaded === 1 ? '' : 's'} uploaded and attached to slide.`, true);
        return;
      }
      this.saving = false;
      this.managerMessage = 'No files were uploaded. Check file size and server logs.';
      this.messageService.add({
        severity: 'error',
        summary: 'Upload failed',
        detail: failed > 1 ? `${failed} files could not be uploaded.` : 'File could not be uploaded.',
      });
      this.cdr.detectChanges();
    };
    files.forEach((file) => {
      this.contentService.uploadAsset(this.selectedCourse!.id, file)
        .pipe(this.untilDestroyed())
        .subscribe({
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
          failed++;
          const message = error?.error?.message || error?.message || 'Upload failed.';
          this.managerMessage = message;
          finishUpload();
        },
        });
    });
  }

  saveContentDraft(message = 'Draft saved.', showUploadToast = false) {
    if (!this.selectedCourse || !this.selectedContent) return;
    this.saving = true;
    this.managerMessage = 'Saving draft...';
    this.contentService.saveDraft(this.selectedCourse.id, this.selectedContent)
      .pipe(this.untilDestroyed())
      .subscribe({
      next: (content) => {
        this.materialsStore.setCourseContent(content);
        this.selectedContent = content;
        this.reconcileManageSelection();
        this.saving = false;
        this.managerMessage = message;
        if (showUploadToast) {
          this.messageService.add({
            severity: 'success',
            summary: 'Upload complete',
            detail: message,
          });
        }
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
    if (!this.selectedCourse || !this.selectedContent) return;
    this.saving = true;
    this.managerMessage = 'Saving draft before publish...';
    this.contentService.saveDraft(this.selectedCourse.id, this.selectedContent)
      .pipe(this.untilDestroyed())
      .subscribe({
      next: (draftContent) => {
        this.materialsStore.setCourseContent(draftContent);
        this.selectedContent = draftContent;
        this.reconcileManageSelection();
        this.managerMessage = 'Publishing...';
        this.contentService.publish(this.selectedCourse!.id)
          .pipe(this.untilDestroyed())
          .subscribe({
          next: (content) => {
            this.materialsStore.setCourseContent(content);
            this.selectedContent = content;
            this.reconcileManageSelection();
            this.saving = false;
            this.managerMessage = 'Published successfully.';
            this.cdr.detectChanges();
          },
          error: () => {
            this.saving = false;
            this.managerMessage = 'Could not publish content.';
            this.cdr.detectChanges();
          },
        });
      },
      error: () => {
        this.saving = false;
        this.managerMessage = 'Could not save draft before publishing.';
        this.cdr.detectChanges();
      },
    });
  }

  openPreview(block: ContentBlock) {
    if (!['image', 'video'].includes(block.type)) return;
    this.previewBlock = block;
    this.previewZoom = 1;
    this.lockBodyScroll();
  }

  closePreview() {
    this.previewBlock = null;
    this.previewZoom = 1;
    this.unlockBodyScroll();
  }

  zoomPreview(delta: number) {
    this.previewZoom = Math.min(3, Math.max(0.5, this.previewZoom + delta));
  }

  private lockBodyScroll() {
    if (typeof document === 'undefined') return;
    if (!this.previousBodyOverflow) {
      this.previousBodyOverflow = document.body.style.overflow || 'auto';
    }
    document.body.style.overflow = 'hidden';
  }

  private unlockBodyScroll() {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = this.previousBodyOverflow || '';
    this.previousBodyOverflow = '';
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
    return this.itemsToText(block.items ?? []);
  }

  applyBoldToSelection() {
    const field = document.activeElement as HTMLInputElement | HTMLTextAreaElement | null;
    if (!field || !['INPUT', 'TEXTAREA'].includes(field.tagName)) return;
    const start = field.selectionStart ?? 0;
    const end = field.selectionEnd ?? start;
    const value = field.value;
    const selected = value.slice(start, end) || 'bold text';
    const nextValue = `${value.slice(0, start)}**${selected}**${value.slice(end)}`;
    field.value = nextValue;
    field.dispatchEvent(new Event('input', { bubbles: true }));
    requestAnimationFrame(() => {
      field.focus();
      field.setSelectionRange(start + 2, start + 2 + selected.length);
    });
  }

  inlineSegments(value?: string): TextSegment[] {
    const text = value ?? '';
    const segments: TextSegment[] = [];
    const pattern = /\*\*(.+?)\*\*/g;
    let cursor = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text))) {
      if (match.index > cursor) {
        segments.push({ text: text.slice(cursor, match.index), bold: false });
      }
      segments.push({ text: match[1], bold: true });
      cursor = match.index + match[0].length;
    }

    if (cursor < text.length) {
      segments.push({ text: text.slice(cursor), bold: false });
    }

    return segments.length ? segments : [{ text, bold: false }];
  }

  setBlockItemsText(block: ContentBlock, value: string) {
    block.items = block.type === 'nested_bullet_list'
      ? this.parseNestedItems(value)
      : value
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((text) => ({ text }));
  }

  private itemsToText(items: NestedBulletItem[], level = 0): string {
    return items
      .flatMap((item) => [
        `${'  '.repeat(level)}${item.text}`,
        ...(item.children?.length ? [this.itemsToText(item.children, level + 1)] : []),
      ])
      .filter(Boolean)
      .join('\n');
  }

  private parseNestedItems(value: string): NestedBulletItem[] {
    const roots: NestedBulletItem[] = [];
    const stack: Array<{ level: number; item: NestedBulletItem }> = [];

    value.split('\n').forEach((rawLine) => {
      if (!rawLine.trim()) return;
      const leading = rawLine.match(/^\s*/)?.[0] ?? '';
      const level = Math.floor(leading.replace(/\t/g, '  ').length / 2);
      const text = rawLine.trim().replace(/^[-*•]\s*/, '');
      if (!text) return;

      const item: NestedBulletItem = { text };
      while (stack.length && stack[stack.length - 1].level >= level) stack.pop();
      const parent = stack[stack.length - 1]?.item;
      if (parent) {
        parent.children = [...(parent.children ?? []), item];
      } else {
        roots.push(item);
      }
      stack.push({ level, item });
    });

    return roots;
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
    this.saveContentDraft('Table column deleted.');
  }

  confirmDeleteTableColumn(event: Event, block: ContentBlock, columnIndex: number) {
    event.stopPropagation();
    if (this.tableColumns(block).length <= 1) return;
    const columnName = this.tableColumns(block)[columnIndex] || `Column ${columnIndex + 1}`;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header: 'Delete Column',
      message: `Delete column "${columnName}" from this table?`,
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete Column',
        severity: 'danger',
      },
      accept: () => this.deleteTableColumn(block, columnIndex),
    });
  }

  addTableRow(block: ContentBlock) {
    block.rows = [...this.tableRows(block), this.tableColumns(block).map(() => '')];
  }

  deleteTableRow(block: ContentBlock, rowIndex: number) {
    if (this.tableRows(block).length <= 1) return;
    block.rows = this.tableRows(block).filter((_, index) => index !== rowIndex);
    this.saveContentDraft('Table row deleted.');
  }

  confirmDeleteTableRow(event: Event, block: ContentBlock, rowIndex: number) {
    event.stopPropagation();
    if (this.tableRows(block).length <= 1) return;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header: 'Delete Row',
      message: `Delete row ${rowIndex + 1} from this table?`,
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete Row',
        severity: 'danger',
      },
      accept: () => this.deleteTableRow(block, rowIndex),
    });
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
      this.activeFileIndex = 0;
      this.updateSlideUrl();
      this.cdr.detectChanges();
    }
  }

  nextSlide() {
    if (this.selectedModule && this.currentLessonIndex < this.selectedModule.lessons.length - 1) {
      this.currentLessonIndex++;
      this.activeFileIndex = 0;
      this.updateSlideUrl();
      this.cdr.detectChanges();
    }
  }

  activeFileBlock(lesson: ContentLesson): ContentBlock | null {
    const files = this.fileBlocks(lesson);
    if (!files.length) return null;
    return files[Math.min(this.activeFileIndex, files.length - 1)] ?? files[0];
  }

  previousFile(lesson: ContentLesson) {
    const files = this.fileBlocks(lesson);
    if (!files.length) return;
    this.activeFileIndex = Math.max(0, this.activeFileIndex - 1);
  }

  nextFile(lesson: ContentLesson) {
    const files = this.fileBlocks(lesson);
    if (!files.length) return;
    this.activeFileIndex = Math.min(files.length - 1, this.activeFileIndex + 1);
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

  flattenedBullets(items?: NestedBulletItem[], level = 0, parentOrdered = false): FlattenedBullet[] {
    if (!Array.isArray(items)) return [];
    return items.flatMap((item, index) => {
      const ordered = this.extractOrderedMarker(item.text);
      const marker = ordered?.marker ?? (parentOrdered ? `${this.toRoman(index + 1)}.` : '');
      return [
        { text: ordered?.text ?? item.text, level, marker },
        ...this.flattenedBullets(item.children, level + 1, !!ordered),
      ];
    });
  }

  private extractOrderedMarker(text: string): { marker: string; text: string } | null {
    const match = text.trim().match(/^((?:\d+|[IVXLCDM]+|[A-Z])[\.)])\s+(.+)$/i);
    if (!match) return null;
    return { marker: match[1], text: match[2] };
  }

  private toRoman(value: number): string {
    const numerals: Array<[number, string]> = [
      [10, 'X'],
      [9, 'IX'],
      [5, 'V'],
      [4, 'IV'],
      [1, 'I'],
    ];
    let remaining = value;
    let result = '';
    for (const [number, symbol] of numerals) {
      while (remaining >= number) {
        result += symbol;
        remaining -= number;
      }
    }
    return result;
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

  private reconcileManageSelection() {
    const selectedModule = this.indexModules.find((module) => module.id === this.selectedManageModuleId);
    const fallbackModule = selectedModule ?? this.indexModules[0] ?? null;
    this.selectedManageModuleId = fallbackModule?.id ?? '';
    const selectedLesson = fallbackModule?.lessons.find((lesson) => lesson.id === this.selectedManageLessonId);
    this.selectedManageLessonId = selectedLesson?.id ?? fallbackModule?.lessons[0]?.id ?? '';
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
