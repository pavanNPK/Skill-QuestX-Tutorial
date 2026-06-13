import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TextToSpeechService } from '../../../../../core/services/text-to-speech.service';
import { MaterialFile, MaterialSlide } from '../../../domain/material-draft.model';
import { MaterialSlidePreviewComponent } from './material-slide-preview.component';

@Component({
  selector: 'sqx-material-preview-dialog',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule, MaterialSlidePreviewComponent],
  template: `
    <p-dialog
      [visible]="visible"
      (visibleChange)="visibleChange.emit($event)"
      [modal]="true"
      [showHeader]="false"
      [style]="{ width: '100vw', height: '100vh', maxWidth: '100vw' }"
      styleClass="ppt-preview-dialog"
    >
      <section class="ppt-preview-shell">
        <header class="ppt-preview-head">
          <div class="ppt-title-meta">
            <strong>{{ activeSlide?.title || 'Slide preview' }}</strong>
            <span>{{ activeIndex + 1 }} / {{ deckSlides.length }} slides</span>
          </div>
          <div class="preview-tools">
            <button type="button" class="read-btn" (click)="readDeck()" aria-label="Read all slides aloud">
              <i class="pi pi-volume-up"></i>
              Read
            </button>
            <button type="button" class="tool-btn" (click)="changeZoom(-0.1)" aria-label="Zoom out">
              <i class="pi pi-minus"></i>
            </button>
            <button type="button" class="zoom-chip" (click)="zoom = 0.78">{{ zoomPercent }}%</button>
            <button type="button" class="tool-btn" (click)="changeZoom(0.1)" aria-label="Zoom in">
              <i class="pi pi-plus"></i>
            </button>
            <button type="button" class="close-btn" (click)="close()" aria-label="Close preview">
              <i class="pi pi-times"></i>
            </button>
          </div>
        </header>

        <div class="ppt-stage-row">
          <button type="button" class="nav-btn" [disabled]="activeIndex === 0" (click)="move(-1)" aria-label="Previous slide">
            <i class="pi pi-chevron-left"></i>
          </button>

          <div class="ppt-slide-viewport">
            @if (activeSlide) {
              <div class="preview-scale" [style.width.px]="1240 * zoom">
                <sqx-material-slide-preview [slide]="activeSlide"></sqx-material-slide-preview>
              </div>
            }
          </div>

          <button type="button" class="nav-btn" [disabled]="activeIndex >= deckSlides.length - 1" (click)="move(1)" aria-label="Next slide">
            <i class="pi pi-chevron-right"></i>
          </button>
        </div>

        <footer class="thumb-strip">
          @for (thumb of deckSlides; track thumb.id; let i = $index) {
            <button type="button" class="thumb" [class.active]="i === activeIndex" (click)="activeIndex = i">
              <span>{{ thumb.order }}</span>
              <strong>{{ thumb.title }}</strong>
            </button>
          }
        </footer>
      </section>
    </p-dialog>
  `,
  styles: [`
    :host ::ng-deep .ppt-preview-dialog .p-dialog-content {
      padding: 0;
      border-radius: 0;
      overflow: hidden;
      height: 100vh;
    }

    :host ::ng-deep .ppt-preview-dialog {
      margin: 0;
      max-height: 100vh;
    }

    .ppt-preview-shell {
      height: 100vh;
      display: grid;
      grid-template-rows: auto minmax(0, 1fr) auto;
      color: #172039;
      background: #ffffff;
    }

    .ppt-preview-head {
      height: 56px;
      min-height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: .85rem;
      padding: .45rem 1rem;
      color: #fff;
      background: rgba(8,13,24,.96);
      border-bottom: 1px solid rgba(255,255,255,.1);
      backdrop-filter: blur(14px);
    }

    .ppt-title-meta {
      min-width: 0;
      display: grid;
      gap: .18rem;
    }

    .ppt-preview-head strong {
      font-size: .95rem;
      line-height: 1.1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ppt-preview-head span {
      color: #b8c2d6;
      font-size: .78rem;
      line-height: 1.1;
    }

    .preview-tools {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      gap: .38rem;
      flex-wrap: nowrap;
    }

    .close-btn,
    .nav-btn,
    .read-btn,
    .tool-btn,
    .zoom-chip {
      border: 1px solid rgba(255,255,255,.18);
      color: #fff;
      background: rgba(255,255,255,.08);
      border-radius: 999px;
      cursor: pointer;
      display: inline-grid;
      place-items: center;
      line-height: 1;
    }

    .close-btn i,
    .nav-btn i,
    .tool-btn i {
      display: block;
      line-height: 1;
    }

    .close-btn {
      width: 34px;
      height: 34px;
    }

    .tool-btn {
      width: 30px;
      height: 30px;
      padding: 0;
    }

    .read-btn {
      height: 30px;
      display: inline-flex;
      grid-auto-flow: column;
      gap: .4rem;
      padding: 0 .72rem;
      font-weight: 800;
    }

    .zoom-chip {
      height: 30px;
      padding: 0 .68rem;
      font-weight: 800;
    }

    .nav-btn {
      position: absolute;
      z-index: 4;
      top: 50%;
      transform: translateY(-50%);
      width: 52px;
      height: 52px;
      font-size: 1.25rem;
      background: rgba(17, 24, 39, .58);
      backdrop-filter: blur(10px);
    }

    .nav-btn:first-child {
      left: 1.1rem;
    }

    .nav-btn:last-child {
      right: 1.1rem;
    }

    .nav-btn:disabled {
      opacity: .32;
      cursor: not-allowed;
    }

    .ppt-stage-row {
      position: relative;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      align-items: stretch;
      padding: 1.1rem 4.2rem 1.2rem;
    }

    .ppt-slide-viewport {
      min-height: 0;
      max-height: 100%;
      overflow: auto;
      display: grid;
      justify-items: center;
      align-items: center;
      padding: 1rem .5rem 1.25rem;
      scrollbar-color: #9a9caf rgba(255,255,255,.3);
    }

    .preview-scale {
      min-width: min(760px, 100%);
      max-width: none;
    }

    .thumb-strip {
      display: flex;
      gap: .75rem;
      overflow-x: auto;
      padding: 1rem 1.1rem 1.15rem;
      background: rgba(8,13,24,.96);
      border-top: 1px solid rgba(255,255,255,.08);
      scroll-padding: 1.1rem;
    }

    .thumb {
      flex: 0 0 172px;
      min-height: 52px;
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: .55rem;
      align-items: center;
      text-align: left;
      border: 2px solid transparent;
      border-radius: 8px;
      background: linear-gradient(180deg, #fff, #f6f7fb);
      color: #172039;
      padding: .58rem;
      cursor: pointer;
    }

    .thumb.active {
      border-color: #8d6bff;
      box-shadow: 0 0 0 2px rgba(141,107,255,.18);
    }

    .thumb span {
      display: grid;
      place-items: center;
      width: 26px;
      height: 26px;
      border-radius: 6px;
      background: #1d335a;
      color: #fff;
      font-size: .78rem;
      font-weight: 900;
    }

    .thumb strong {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: .82rem;
    }

    @media (max-width: 760px) {
      .ppt-preview-head {
        height: auto;
        min-height: 64px;
        align-items: flex-start;
        flex-direction: column;
      }

      .ppt-stage-row {
        padding: .8rem;
      }

      .nav-btn {
        display: none;
      }

      .thumb {
        flex-basis: 140px;
      }
    }
  `],
})
export class MaterialPreviewDialogComponent implements OnChanges, OnDestroy {
  private readonly tts = inject(TextToSpeechService);

  @Input() visible = false;
  @Input() files: MaterialFile[] = [];
  @Input() slide: MaterialSlide | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();

  activeIndex = 0;
  zoom = 0.78;

  ngOnChanges(changes: SimpleChanges): void {
    if ('visible' in changes && !this.visible) this.tts.stop();
    if ('slide' in changes && this.slide) {
      const index = this.deckSlides.findIndex((item) => item.id === this.slide?.id);
      this.activeIndex = index >= 0 ? index : 0;
    }
  }

  get deckSlides(): MaterialSlide[] {
    const file = this.files.find((item) => item.slides.some((slide) => slide.id === this.slide?.id));
    return (file?.slides ?? (this.slide ? [this.slide] : [])).slice().sort((a, b) => a.order - b.order);
  }

  get activeSlide(): MaterialSlide | null {
    return this.deckSlides[this.activeIndex] ?? this.slide;
  }

  get zoomPercent(): number {
    return Math.round(this.zoom * 100);
  }

  move(delta: number): void {
    this.activeIndex = Math.min(Math.max(this.activeIndex + delta, 0), this.deckSlides.length - 1);
  }

  changeZoom(delta: number): void {
    this.zoom = Math.min(1.6, Math.max(0.62, Number((this.zoom + delta).toFixed(2))));
  }

  readDeck(): void {
    this.tts.speak(this.deckSlides.map((slide) => this.slideText(slide)).filter(Boolean).join('\n\n'));
  }

  close(): void {
    this.tts.stop();
    this.visibleChange.emit(false);
  }

  ngOnDestroy(): void {
    this.tts.stop();
  }

  private slideText(slide: MaterialSlide): string {
    const parts = [`Slide ${slide.order}. ${slide.title}`];
    slide.blocks.forEach((block) => {
      const value = block.value;
      if (typeof value === 'string') parts.push(value);
      else if (Array.isArray(value)) parts.push(value.flat().join('. '));
      else if (value && typeof value === 'object') parts.push(Object.values(value).join('. '));
    });
    if (slide.notes) parts.push(slide.notes);
    return parts.join('. ').replace(/\s+/g, ' ').trim();
  }
}
