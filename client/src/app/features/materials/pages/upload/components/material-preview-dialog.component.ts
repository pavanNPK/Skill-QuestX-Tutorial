import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MaterialContentBlock, MaterialFile, MaterialSlide } from '../../../domain/material-draft.model';

@Component({
  selector: 'sqx-material-preview-dialog',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule],
  template: `
    <p-dialog
      [visible]="visible"
      (visibleChange)="visibleChange.emit($event)"
      [modal]="true"
      [showHeader]="false"
      [style]="{ width: 'min(1180px, 98vw)' }"
      [breakpoints]="{ '760px': '98vw' }"
      styleClass="ppt-preview-dialog"
    >
      <section class="ppt-preview-shell">
        <header class="ppt-preview-head">
          <div class="ppt-title-meta">
            <strong>{{ activeSlide?.title || 'Slide preview' }}</strong>
            <span>{{ activeIndex + 1 }} / {{ deckSlides.length }} slides</span>
          </div>
          <div class="preview-tools">
            <button type="button" class="tool-btn" (click)="changeZoom(-0.1)" aria-label="Zoom out">
              <i class="pi pi-minus"></i>
            </button>
            <button type="button" class="zoom-chip" (click)="zoom = 0.78">{{ zoomPercent }}%</button>
            <button type="button" class="tool-btn" (click)="changeZoom(0.1)" aria-label="Zoom in">
              <i class="pi pi-plus"></i>
            </button>
            <button type="button" class="close-btn" (click)="visibleChange.emit(false)" aria-label="Close preview">
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
              <article class="ppt-slide" [style.width.px]="1040 * zoom">
                <div class="ppt-accent"></div>
                <div class="ppt-number">{{ activeSlide.order | number: '2.0-0' }}</div>
                <div class="ppt-content">
                  <h2>{{ activeSlide.title }}</h2>
                  @for (block of sortedBlocks(activeSlide); track block.id) {
                    @switch (block.type) {
                      @case ('HEADING') {
                        <h3>{{ textValue(block) }}</h3>
                      }
                      @case ('BULLETS') {
                        <ul>
                          @for (item of listValue(block); track $index) {
                            <li [style.marginLeft.rem]="bulletIndent(item)">{{ cleanBullet(item) }}</li>
                          }
                        </ul>
                      }
                      @case ('NUMBERED_LIST') {
                        <ol>
                          @for (item of listValue(block); track $index) {
                            <li>{{ cleanBullet(item) }}</li>
                          }
                        </ol>
                      }
                      @case ('TABLE') {
                        <div class="ppt-table-wrap">
                          <table>
                            @for (row of tableValue(block); track $index; let rowIndex = $index) {
                              <tr>
                                @for (cell of row; track $index) {
                                  <td [class.header-cell]="rowIndex === 0">{{ cell }}</td>
                                }
                              </tr>
                            }
                          </table>
                        </div>
                      }
                      @case ('MEDIA') {
                        @if (mediaUrl(block)) {
                          <img class="ppt-media" [src]="mediaUrl(block)" [alt]="mediaName(block)" />
                        }
                      }
                      @case ('QUOTE') {
                        <blockquote>{{ textValue(block) }}</blockquote>
                      }
                      @case ('CODE') {
                        <pre><code>{{ textValue(block) }}</code></pre>
                      }
                      @default {
                        <p>{{ textValue(block) }}</p>
                      }
                    }
                  }
                </div>
              </article>
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
    :host ::ng-deep .ppt-preview-dialog .p-dialog-content { padding: 0; border-radius: 12px; overflow: hidden; }
    .ppt-preview-shell { background: radial-gradient(circle at 50% -20%, #243455 0, #111827 45%, #070b14 100%); color: #fff; height: min(840px, 92vh); display: grid; grid-template-rows: auto minmax(0, 1fr) auto; }
    .ppt-preview-head { height: 56px; min-height: 56px; display: flex; align-items: center; justify-content: space-between; gap: .85rem; padding: .45rem 1rem; background: rgba(8,13,24,.96); border-bottom: 1px solid rgba(255,255,255,.1); backdrop-filter: blur(14px); }
    .ppt-title-meta { min-width: 0; display: grid; gap: .18rem; }
    .ppt-preview-head strong { font-size: .95rem; line-height: 1.1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .ppt-preview-head span { color: #b8c2d6; font-size: .78rem; line-height: 1.1; }
    .preview-tools { flex: 0 0 auto; display: flex; align-items: center; gap: .38rem; flex-wrap: nowrap; }
    .close-btn, .nav-btn, .tool-btn, .zoom-chip { border: 1px solid rgba(255,255,255,.18); color: #fff; background: rgba(255,255,255,.08); border-radius: 999px; cursor: pointer; display: inline-grid; place-items: center; line-height: 1; }
    .close-btn i, .nav-btn i, .tool-btn i { display: block; line-height: 1; }
    .close-btn { width: 34px; height: 34px; }
    .tool-btn { width: 30px; height: 30px; padding: 0; }
    .zoom-chip { height: 30px; padding: 0 .68rem; font-weight: 800; }
    .nav-btn { position: absolute; z-index: 4; top: 50%; transform: translateY(-50%); width: 52px; height: 52px; font-size: 1.25rem; backdrop-filter: blur(10px); }
    .nav-btn:first-child { left: 1.1rem; }
    .nav-btn:last-child { right: 1.1rem; }
    .nav-btn:disabled { opacity: .32; cursor: not-allowed; }
    .ppt-stage-row { position: relative; min-height: 0; display: grid; grid-template-columns: minmax(0, 1fr); align-items: stretch; padding: 1.05rem 4.2rem; }
    .ppt-slide-viewport { min-height: 0; max-height: 100%; overflow: auto; display: grid; justify-items: center; align-items: start; padding: .35rem .5rem .8rem; scrollbar-color: #765cff rgba(255,255,255,.08); }
    .ppt-slide { position: relative; aspect-ratio: 16 / 9; min-width: min(760px, 100%); max-width: none; overflow: hidden; background: #ffffff; color: #172039; box-shadow: 0 28px 90px rgba(0,0,0,.46); display: grid; border-radius: 8px; }
    .ppt-slide::before { content: ""; position: absolute; inset: 0 0 auto 6.2%; height: 13%; background: linear-gradient(180deg, #f4f6fb, #fff); pointer-events: none; }
    .ppt-slide::after { content: ""; position: absolute; right: 4%; bottom: 5%; width: 22%; aspect-ratio: 1; border-radius: 999px; background: radial-gradient(circle, rgba(91,75,196,.08), rgba(91,75,196,0) 68%); pointer-events: none; }
    .ppt-accent { position: absolute; inset: 0 auto 0 0; width: 6.2%; background: linear-gradient(180deg, #614dff, #2f1fb1); }
    .ppt-number { position: absolute; top: 5.5%; left: 1.25%; display: grid; place-items: center; width: 3.8%; min-width: 34px; aspect-ratio: 1; border-radius: 8px; color: #fff; background: rgba(255,255,255,.16); border: 1px solid rgba(255,255,255,.2); font-size: 1rem; font-weight: 900; z-index: 2; }
    .ppt-content { min-height: 0; overflow: auto; padding: 6.2% 7.2% 6.2% 13.4%; display: grid; align-content: start; gap: .58rem; scrollbar-color: #765cff transparent; }
    .ppt-content h2 { margin: 0 0 .2rem; color: #4b3bc7; font-size: clamp(1.55rem, 2.75vw, 2.25rem); line-height: 1.08; }
    .ppt-content h3 { margin: .1rem 0; font-size: clamp(1rem, 1.55vw, 1.35rem); }
    .ppt-content p, .ppt-content li { font-size: clamp(.82rem, 1.12vw, 1rem); line-height: 1.32; }
    .ppt-content p { margin: 0; }
    .ppt-content ul, .ppt-content ol { margin: .2rem 0; padding-left: 1.5rem; display: grid; gap: .35rem; }
    .ppt-content li::marker { color: #4b3bc7; }
    .ppt-table-wrap { overflow: auto; max-width: 100%; }
    .ppt-table-wrap table { width: 100%; border-collapse: collapse; font-size: clamp(.66rem, .95vw, .86rem); background: rgba(255,255,255,.9); color: #172039; }
    .ppt-table-wrap td { border: 1px solid #d8d5e8; padding: .36rem .5rem; }
    .ppt-table-wrap .header-cell { background: #4b3bc7; color: #fff; font-weight: 800; }
    .ppt-media { max-width: 42%; max-height: 42%; object-fit: contain; justify-self: end; border: 4px solid rgba(0,0,0,.12); background: #fff; }
    blockquote { border-left: 5px solid #4b3bc7; margin: 0; padding: .75rem 1rem; background: rgba(79,57,212,.08); }
    pre { overflow: auto; padding: .75rem; background: rgba(0,0,0,.78); border-radius: 6px; }
    .thumb-strip { display: flex; gap: .75rem; overflow-x: auto; padding: 1rem 1.1rem 1.15rem; background: rgba(8,13,24,.96); border-top: 1px solid rgba(255,255,255,.08); scroll-padding: 1.1rem; }
    .thumb { flex: 0 0 172px; min-height: 52px; display: grid; grid-template-columns: auto minmax(0, 1fr); gap: .55rem; align-items: center; text-align: left; border: 2px solid transparent; border-radius: 8px; background: linear-gradient(180deg, #fff, #f6f7fb); color: #172039; padding: .58rem; cursor: pointer; }
    .thumb.active { border-color: #8d6bff; box-shadow: 0 0 0 2px rgba(141,107,255,.18); }
    .thumb span { display: grid; place-items: center; width: 26px; height: 26px; border-radius: 6px; background: #1d335a; color: #fff; font-size: .78rem; font-weight: 900; }
    .thumb strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: .82rem; }
    @media (max-width: 760px) {
      .ppt-preview-head { height: auto; min-height: 64px; align-items: flex-start; flex-direction: column; }
      .ppt-stage-row { padding: .8rem; }
      .nav-btn { display: none; }
      .ppt-content { padding-left: 15%; }
      .thumb { flex-basis: 140px; }
    }
  `],
})
export class MaterialPreviewDialogComponent implements OnChanges {
  @Input() visible = false;
  @Input() files: MaterialFile[] = [];
  @Input() slide: MaterialSlide | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();

  activeIndex = 0;
  zoom = 0.78;

  ngOnChanges(changes: SimpleChanges): void {
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

  move(delta: number): void {
    this.activeIndex = Math.min(Math.max(this.activeIndex + delta, 0), this.deckSlides.length - 1);
  }

  get zoomPercent(): number {
    return Math.round(this.zoom * 100);
  }

  changeZoom(delta: number): void {
    this.zoom = Math.min(1.6, Math.max(0.7, Number((this.zoom + delta).toFixed(2))));
  }

  sortedBlocks(slide: MaterialSlide): MaterialContentBlock[] {
    return slide.blocks.slice().sort((a, b) => a.order - b.order);
  }

  textValue(block: MaterialContentBlock): string {
    return typeof block.value === 'string' ? block.value : '';
  }

  listValue(block: MaterialContentBlock): string[] {
    return Array.isArray(block.value) && block.value.every((item) => typeof item === 'string') ? block.value : [];
  }

  tableValue(block: MaterialContentBlock): string[][] {
    return Array.isArray(block.value) && block.value.every((row) => Array.isArray(row)) ? block.value as string[][] : [];
  }

  bulletIndent(item: string): number {
    return Math.min(item.match(/^(\s*)/)?.[1].length ?? 0, 6) * 0.35;
  }

  cleanBullet(item: string): string {
    return item.trim();
  }

  mediaName(block: MaterialContentBlock): string {
    return typeof block.value === 'object' && !Array.isArray(block.value) && block.value && 'name' in block.value ? String(block.value.name) : 'Slide image';
  }

  mediaUrl(block: MaterialContentBlock): string {
    return typeof block.value === 'object' && !Array.isArray(block.value) && block.value && 'url' in block.value ? String(block.value.url) : '';
  }

}
