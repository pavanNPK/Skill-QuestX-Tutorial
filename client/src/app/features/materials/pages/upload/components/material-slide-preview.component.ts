import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MaterialContentBlock, MaterialSlide } from '../../../domain/material-draft.model';

@Component({
  selector: 'sqx-material-slide-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (slide) {
      <article class="slide-preview" [class.compact]="compact">
        <div class="paper-shadow left"></div>
        <div class="paper-shadow right"></div>
        <div class="slide-spine"></div>
        <section class="slide-pane title-pane">
          <div class="pane-mark">
            <span>{{ slide.order | number: '2.0-0' }}</span>
          </div>
          <div class="title-copy">
            <span class="kicker">Slide {{ slide.order | number: '2.0-0' }}</span>
            <h2>{{ slide.title }}</h2>
          </div>
          <div class="footer-note">
            <strong>Skill QuestX - Tutorials</strong>
            <span>Contact us: info@skillquestx.com</span>
          </div>
        </section>

        <section class="slide-pane content-pane">
          <div class="content-scroll">
            @for (block of sortedBlocks; track block.id) {
              @switch (block.type) {
                @case ('HEADING') {
                  <h3>{{ textValue(block) }}</h3>
                }
                @case ('BULLETS') {
                  <ul class="preview-list">
                    @for (item of listValue(block); track $index) {
                      <li [style.marginLeft.rem]="bulletIndent(item)">{{ cleanBullet(item) }}</li>
                    }
                  </ul>
                }
                @case ('NUMBERED_LIST') {
                  <ol class="preview-list numbered">
                    @for (item of listValue(block); track $index) {
                      <li>{{ cleanBullet(item) }}</li>
                    }
                  </ol>
                }
                @case ('TABLE') {
                  <div class="table-card">
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
                    <img class="preview-media" [src]="mediaUrl(block)" [alt]="mediaName(block)" />
                  }
                }
                @case ('QUOTE') {
                  <blockquote>{{ textValue(block) }}</blockquote>
                }
                @case ('CODE') {
                  <pre><code>{{ textValue(block) }}</code></pre>
                }
                @default {
                  @if (textValue(block)) {
                    <p>{{ textValue(block) }}</p>
                  }
                }
              }
            } @empty {
              <div class="empty-preview">No text, list, or table content on this slide.</div>
            }
          </div>
        </section>
      </article>
    }
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .slide-preview {
      --accent: #b32465;
      --accent-2: #306aa8;
      --ink: #1d2433;
      --muted: #697185;
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      min-width: min(760px, 100%);
      overflow: hidden;
      display: grid;
      grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
      background:
        radial-gradient(circle at 18% 28%, rgba(251, 208, 218, 0.65), transparent 25%),
        radial-gradient(circle at 53% 38%, rgba(177, 225, 242, 0.55), transparent 31%),
        radial-gradient(circle at 76% 75%, rgba(219, 211, 240, 0.6), transparent 35%),
        linear-gradient(90deg, #fbfbfc, #f7f8fb 49%, #ffffff 51%, #fbfbfe);
      color: var(--ink);
      box-shadow: 0 16px 42px rgba(15, 23, 42, 0.14);
      border-radius: 3px;
      isolation: isolate;
    }

    .slide-preview::before,
    .slide-preview::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 1;
    }

    .slide-preview::before {
      background:
        linear-gradient(90deg, rgba(255,255,255,0.55), transparent 10%, transparent 88%, rgba(255,255,255,0.45)),
        radial-gradient(ellipse at 50% 110%, rgba(46, 61, 90, 0.07), transparent 42%);
    }

    .slide-preview::after {
      background:
        linear-gradient(90deg, transparent 47.9%, rgba(45, 52, 70, 0.18) 49.4%, rgba(255,255,255,0.75) 50%, rgba(45, 52, 70, 0.12) 50.8%, transparent 52.5%),
        repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 5px);
      mix-blend-mode: multiply;
      opacity: 0.75;
    }

    .paper-shadow {
      position: absolute;
      bottom: 2.5%;
      width: 43%;
      height: 10%;
      background: rgba(15, 23, 42, 0.09);
      filter: blur(14px);
      z-index: -1;
    }

    .paper-shadow.left {
      left: 5%;
      transform: skewX(-10deg);
    }

    .paper-shadow.right {
      right: 5%;
      transform: skewX(10deg);
    }

    .slide-spine {
      position: absolute;
      inset: 0 auto 0 50%;
      width: 1px;
      background: linear-gradient(180deg, transparent, rgba(31, 41, 55, 0.16), transparent);
      z-index: 4;
    }

    .slide-pane {
      position: relative;
      z-index: 2;
      min-width: 0;
      min-height: 0;
    }

    .title-pane {
      padding: 10% 8% 8% 10%;
      display: grid;
      grid-template-rows: minmax(0, 1fr);
      align-content: stretch;
      align-items: center;
      gap: 1.2rem;
    }

    .pane-mark {
      position: absolute;
      top: 7%;
      left: 8%;
      display: grid;
      place-items: center;
      width: 42px;
      height: 42px;
      border-radius: 999px;
      border: 1px solid rgba(179, 36, 101, 0.24);
      background: rgba(255,255,255,0.64);
      box-shadow: 0 8px 18px rgba(15, 23, 42, 0.05);
    }

    .pane-mark span {
      color: var(--accent);
      font-weight: 900;
      font-size: 0.86rem;
    }

    .title-copy {
      max-width: 92%;
      max-height: 70%;
      overflow: auto;
      padding-right: 0.25rem;
      scrollbar-width: thin;
      scrollbar-color: rgba(179, 36, 101, 0.36) transparent;
    }

    .kicker {
      display: inline-block;
      color: var(--accent);
      font-size: clamp(0.6rem, 0.85vw, 0.8rem);
      line-height: 1;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 800;
      margin-bottom: 0.7rem;
    }

    h2 {
      margin: 0;
      color: #252231;
      font-size: clamp(1.15rem, 2.35vw, 2.15rem);
      line-height: 1.06;
      font-weight: 800;
      letter-spacing: 0;
      overflow-wrap: anywhere;
    }

    .footer-note {
      position: absolute;
      left: 10%;
      bottom: 8%;
      width: 64%;
      color: var(--muted);
      font-size: clamp(0.54rem, 0.7vw, 0.68rem);
      line-height: 1.35;
      display: grid;
      gap: 0.15rem;
    }

    .footer-note strong {
      color: #2b3141;
      font-size: 0.95em;
      font-style: normal;
      font-weight: 800;
    }

    .footer-note span {
      color: var(--muted);
      font-style: normal;
    }

    .content-pane {
      padding: 8% 7.2% 7% 7.2%;
      display: grid;
      align-items: center;
      justify-items: center;
    }

    .content-scroll {
      width: min(88%, 560px);
      min-height: 0;
      max-height: 100%;
      overflow: auto;
      display: grid;
      align-content: start;
      gap: clamp(0.42rem, 0.75vw, 0.72rem);
      padding-right: 0.25rem;
      scrollbar-width: thin;
      scrollbar-color: rgba(179, 36, 101, 0.45) transparent;
    }

    h3 {
      margin: 0.15rem 0 0.2rem;
      color: var(--accent);
      font-size: clamp(0.95rem, 1.55vw, 1.35rem);
      line-height: 1.12;
      font-weight: 850;
    }

    p,
    li,
    td,
    blockquote {
      font-size: clamp(0.66rem, 0.95vw, 0.94rem);
      line-height: 1.45;
    }

    p {
      margin: 0;
      color: #2b3141;
      white-space: pre-wrap;
    }

    .preview-list {
      margin: 0.1rem 0;
      padding-left: 1.05rem;
      display: grid;
      gap: 0.34rem;
      color: #2b3141;
    }

    .preview-list li::marker {
      color: var(--accent);
    }

    .table-card {
      overflow: auto;
      border-radius: 2px;
      background: rgba(255,255,255,0.58);
      box-shadow: 0 8px 18px rgba(48, 106, 168, 0.06);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      color: #232b3d;
      background: rgba(255,255,255,0.4);
    }

    td {
      border-bottom: 1px solid rgba(48, 106, 168, 0.12);
      padding: 0.46rem 0.52rem;
      vertical-align: top;
    }

    .header-cell {
      background: #eef2f7;
      color: #172039;
      font-weight: 800;
    }

    .preview-media {
      max-width: 78%;
      max-height: 210px;
      object-fit: contain;
      justify-self: end;
      box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
    }

    blockquote {
      margin: 0;
      padding: 0.7rem 0.9rem;
      border-left: 3px solid var(--accent);
      background: rgba(255,255,255,0.48);
      color: #2b3141;
    }

    pre {
      margin: 0;
      overflow: auto;
      padding: 0.75rem;
      background: rgba(28, 33, 48, 0.88);
      color: #edf2ff;
      border-radius: 2px;
    }

    .empty-preview {
      min-height: 42%;
      display: grid;
      place-items: center;
      color: var(--muted);
      border: 1px dashed rgba(48, 106, 168, 0.18);
      background: rgba(255,255,255,0.34);
      font-size: clamp(0.72rem, 1vw, 0.95rem);
    }

    .compact {
      min-width: 0;
      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.1);
    }

    .compact .title-pane {
      padding: 12% 9% 9%;
    }

    .compact h2 {
      font-size: clamp(1.05rem, 2.3vw, 1.65rem);
    }

    .compact .footer-note,
    .compact .pane-mark {
      display: none;
    }

    .compact .content-pane {
      padding: 10% 8%;
    }

    @media (max-width: 760px) {
      .slide-preview {
        min-width: min(560px, 100%);
      }

      .pane-mark {
        width: 34px;
        height: 34px;
      }

      .footer-note {
        display: none;
      }
    }
  `],
})
export class MaterialSlidePreviewComponent {
  @Input() slide: MaterialSlide | null = null;
  @Input() compact = false;

  get sortedBlocks(): MaterialContentBlock[] {
    return (this.slide?.blocks ?? []).slice().sort((a, b) => a.order - b.order);
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
