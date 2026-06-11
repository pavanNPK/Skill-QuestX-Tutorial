import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { finalize, switchMap } from 'rxjs';
import { HeaderService } from '../../../../core/services/header.service';
import { MaterialDraftService } from '../../../../core/services/material-draft.service';
import {
  MaterialDraft,
  MaterialFile,
  MaterialSlide,
  createMaterialId,
} from '../../domain/material-draft.model';
import { MaterialEditDialogComponent } from './components/material-edit-dialog.component';
import { MaterialPreviewDialogComponent } from './components/material-preview-dialog.component';
import { MaterialReviewStepComponent } from './components/material-review-step.component';
import { MaterialUploadStepComponent } from './components/material-upload-step.component';

@Component({
  selector: 'sqx-materials-upload-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    MaterialUploadStepComponent,
    MaterialReviewStepComponent,
    MaterialPreviewDialogComponent,
    MaterialEditDialogComponent,
  ],
  providers: [ConfirmationService],
  template: `
    <p-confirmDialog />
    <div class="upload-page">
      <header class="page-head">
        <div>
          <h1>Create Material</h1>
          <p>Upload PPTX/XLSX files or create slides/content manually.</p>
        </div>
        <button pButton type="button" icon="pi pi-times" label="Cancel" class="p-button-outlined" (click)="cancel()"></button>
      </header>

      <nav class="stepper" aria-label="Material upload progress">
        <button type="button" [class.active]="step() === 1" (click)="step.set(1)">
          <span>1</span>
          Upload
        </button>
        <div></div>
        <button type="button" [class.active]="step() === 2" [disabled]="!files().length" (click)="goReview()">
          <span>2</span>
          Review & Submit
        </button>
      </nav>

      @if (step() === 1) {
        <sqx-material-upload-step
          [files]="files()"
          (filesChange)="setFiles($event)"
          (preview)="openPreview($event)"
        />
      } @else {
        <sqx-material-review-step
          [files]="files()"
          [selectedFileId]="selectedFileId()"
          [validationMessage]="validationMessage()"
          [canSubmit]="canSubmit()"
          (selectFile)="selectedFileId.set($event)"
          (filesChange)="setFiles($event)"
          (preview)="openPreview($event)"
          (edit)="openEdit($event)"
          (delete)="confirmDelete($event)"
          (submit)="submit()"
        />
      }

      <footer class="page-actions">
        @if (step() === 1) {
          <button pButton type="button" label="Cancel" class="p-button-outlined" (click)="cancel()"></button>
          <button pButton type="button" icon="pi pi-arrow-right" iconPos="right" label="Start Review" [disabled]="!files().length" (click)="goReview()"></button>
        } @else {
          <button pButton type="button" icon="pi pi-arrow-left" label="Back" class="p-button-outlined" (click)="step.set(1)"></button>
          <button pButton type="button" icon="pi pi-send" [label]="saving() ? 'Submitting...' : 'Submit Material'" [disabled]="!canSubmit() || saving()" (click)="submit()"></button>
        }
      </footer>
    </div>

    <sqx-material-preview-dialog
      [visible]="previewVisible()"
      (visibleChange)="previewVisible.set($event)"
      [files]="files()"
      [slide]="previewSlide()"
    />

    <sqx-material-edit-dialog
      [visible]="editVisible()"
      (visibleChange)="editVisible.set($event)"
      [slide]="editSlide()"
      (saveSlide)="saveEditedSlide($event)"
    />
  `,
  styleUrl: './materials-upload-page.component.scss',
})
export class MaterialsUploadPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly headerService = inject(HeaderService);
  private readonly materialDraftService = inject(MaterialDraftService);

  readonly step = signal<1 | 2>(1);
  readonly draft = signal<MaterialDraft>({
    id: createMaterialId('draft'),
    title: 'Untitled Material',
    sourceType: 'FILE_UPLOAD',
    status: 'DRAFT',
    files: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  readonly selectedFileId = signal('');
  readonly previewVisible = signal(false);
  readonly previewSlide = signal<MaterialSlide | null>(null);
  readonly editVisible = signal(false);
  readonly editSlide = signal<MaterialSlide | null>(null);
  readonly saving = signal(false);

  readonly files = computed(() => this.draft().files);
  readonly validationMessage = computed(() => this.getValidationMessage());
  readonly canSubmit = computed(() => this.validationMessage() === 'Ready to submit.');

  ngOnInit(): void {
    this.headerService.updateTitle('Create Material');
    this.headerService.updateBreadcrumbs([
      { icon: 'pi pi-home', url: '/dashboard', label: 'Home' },
      { label: 'Materials', url: '/materials' },
      { label: 'Upload' },
    ]);
  }

  setFiles(files: MaterialFile[]): void {
    const normalized = files.map((file, index) => ({
      ...file,
      order: index + 1,
      status: file.slides.length && file.slides.every((slide) => slide.status === 'PUBLISHED') ? 'PUBLISHED' as const : 'DRAFT' as const,
      slides: file.slides.map((slide, slideIndex) => ({ ...slide, order: slideIndex + 1 })),
    }));
    this.draft.update((draft) => ({
      ...draft,
      sourceType: normalized.some((file) => file.fileType !== 'MANUAL') ? 'FILE_UPLOAD' : 'MANUAL',
      files: normalized,
      updatedAt: new Date().toISOString(),
    }));
    if (!this.selectedFileId() || !normalized.some((file) => file.id === this.selectedFileId())) {
      this.selectedFileId.set(normalized[0]?.id ?? '');
    }
  }

  goReview(): void {
    if (!this.files().length) return;
    this.selectedFileId.set(this.selectedFileId() || this.files()[0]?.id || '');
    this.step.set(2);
  }

  openPreview(slide: MaterialSlide): void {
    this.previewSlide.set(slide);
    this.previewVisible.set(true);
  }

  openEdit(slide: MaterialSlide): void {
    this.editSlide.set(slide);
    this.editVisible.set(true);
  }

  saveEditedSlide(slide: MaterialSlide): void {
    this.setFiles(this.files().map((file) => ({
      ...file,
      slides: file.slides.map((item) => item.id === slide.id ? slide : item),
    })));
    this.messageService.add({ severity: 'success', summary: 'Slide updated', detail: 'Review data was saved.' });
  }

  confirmDelete(slide: MaterialSlide): void {
    this.confirmationService.confirm({
      header: 'Delete Slide / Content',
      message: `Delete "${slide.title}"?`,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: { label: 'Cancel', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Delete', severity: 'danger' },
      accept: () => this.deleteSlide(slide.id),
    });
  }

  submit(): void {
    if (!this.canSubmit() || this.saving()) return;
    const draftToSave: MaterialDraft = {
      ...this.draft(),
      updatedAt: new Date().toISOString(),
    };
    this.saving.set(true);
    this.materialDraftService.create(draftToSave)
      .pipe(
        switchMap((createdDraft) => this.materialDraftService.submit(createdDraft.id)),
        finalize(() => this.saving.set(false)),
      )
      .subscribe({
        next: (submittedDraft) => {
          this.draft.set(submittedDraft);
          this.messageService.add({
            severity: 'success',
            summary: 'Material submitted',
            detail: 'The material was saved to the database and submitted.',
          });
          this.router.navigate(['/materials']);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Submit failed',
            detail: error?.error?.message || error?.message || 'Could not submit material.',
          });
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/materials']);
  }

  private deleteSlide(slideId: string): void {
    const next = this.files()
      .map((file) => ({
        ...file,
        slides: file.slides.filter((slide) => slide.id !== slideId).map((slide, index) => ({ ...slide, order: index + 1 })),
      }))
      .filter((file) => file.slides.length > 0);
    this.setFiles(next);
  }

  private getValidationMessage(): string {
    const files = this.files();
    if (!files.length) return 'Add at least one file or manual material before submitting.';
    const slides = files.flatMap((file) => file.slides);
    if (!slides.length) return 'Add at least one slide/content item before submitting.';
    if (slides.some((slide) => !slide.title.trim() || !slide.blocks.length)) return 'Every slide/content needs a title and at least one content block.';
    if (slides.some((slide) => slide.blocks.some((block) => !this.hasBlockValue(block.value)))) return 'Every content block needs content before submitting.';
    if (slides.some((slide) => slide.status === 'DRAFT')) return 'All slides/content must be published before submitting.';
    return 'Ready to submit.';
  }

  private hasBlockValue(value: unknown): boolean {
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    if (value && typeof value === 'object') return Object.values(value).some((item) => String(item).trim().length > 0);
    return false;
  }
}
