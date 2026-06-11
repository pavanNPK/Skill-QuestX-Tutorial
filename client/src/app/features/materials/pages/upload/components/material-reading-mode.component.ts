import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MaterialContentBlock, MaterialFile, MaterialSlide } from '../../../domain/material-draft.model';

@Component({
  selector: 'sqx-material-reading-mode',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="reading-stack">
      @for (slide of visibleSlides; track slide.id) {
        <article class="reading-slide">
          <div class="reading-kicker">{{ slide.order | number: '2.0-0' }}</div>
          <h3>{{ slide.title }}</h3>
          @for (block of sortedBlocks(slide); track block.id) {
            <ng-container [ngSwitch]="block.type">
              <h4 *ngSwitchCase="'HEADING'">{{ textValue(block) }}</h4>
              <p *ngSwitchCase="'PARAGRAPH'">{{ textValue(block) }}</p>
              <p *ngSwitchCase="'TEXT'">{{ textValue(block) }}</p>
              <blockquote *ngSwitchCase="'QUOTE'">{{ textValue(block) }}</blockquote>
              <pre *ngSwitchCase="'CODE'"><code>{{ textValue(block) }}</code></pre>
              <ul *ngSwitchCase="'BULLETS'">
                @for (item of listValue(block); track item) {
                  <li>{{ item }}</li>
                }
              </ul>
              <ol *ngSwitchCase="'NUMBERED_LIST'">
                @for (item of listValue(block); track item) {
                  <li>{{ item }}</li>
                }
              </ol>
              <table *ngSwitchCase="'TABLE'">
                @for (row of tableValue(block); track $index) {
                  <tr>
                    @for (cell of row; track $index) {
                      <td>{{ cell }}</td>
                    }
                  </tr>
                }
              </table>
              <a *ngSwitchCase="'LINK'" [href]="linkUrl(block)" target="_blank" rel="noopener">
                {{ linkLabel(block) }}
              </a>
              <div *ngSwitchCase="'MEDIA'" class="media-line">
                <i class="pi pi-image"></i>
                {{ mediaLabel(block) }}
              </div>
              <p *ngSwitchDefault>{{ textValue(block) }}</p>
            </ng-container>
          }
          @if (slide.notes) {
            <aside class="reading-notes">
              <strong>Notes</strong>
              <p>{{ slide.notes }}</p>
            </aside>
          }
        </article>
      }
    </div>
  `,
  styles: [`
    .reading-stack { display: grid; gap: 1rem; }
    .reading-slide { border: 1px solid #e6e4f7; border-radius: 8px; padding: 1rem; background: #fff; }
    .reading-kicker { color: #4d3ac8; font-weight: 800; margin-bottom: .4rem; }
    h3 { margin: 0 0 .75rem; color: #151936; }
    h4 { margin: .75rem 0 .3rem; color: #3526b4; }
    p { margin: .35rem 0; color: #343957; line-height: 1.55; }
    blockquote { margin: .75rem 0; padding: .75rem 1rem; border-left: 4px solid #4d3ac8; background: #f7f6ff; }
    pre { overflow: auto; padding: .8rem; background: #151936; color: #fff; border-radius: 6px; }
    table { border-collapse: collapse; width: 100%; margin: .75rem 0; }
    td { border: 1px solid #e1def3; padding: .5rem; }
    .media-line, a { display: inline-flex; gap: .45rem; align-items: center; margin: .4rem 0; color: #4d3ac8; }
    .reading-notes { margin-top: 1rem; padding: .75rem; border-radius: 6px; background: #fff8ea; color: #4c3d1b; }
  `],
})
export class MaterialReadingModeComponent {
  @Input() files: MaterialFile[] = [];
  @Input() selectedSlide: MaterialSlide | null = null;
  @Input() readAll = false;

  get visibleSlides(): MaterialSlide[] {
    if (!this.readAll && this.selectedSlide) return [this.selectedSlide];
    return this.files
      .slice()
      .sort((a, b) => a.order - b.order)
      .flatMap((file) => file.slides.slice().sort((a, b) => a.order - b.order));
  }

  sortedBlocks(slide: MaterialSlide): MaterialContentBlock[] {
    return slide.blocks.slice().sort((a, b) => a.order - b.order);
  }

  textValue(block: MaterialContentBlock): string {
    return typeof block.value === 'string' ? block.value : JSON.stringify(block.value);
  }

  listValue(block: MaterialContentBlock): string[] {
    return Array.isArray(block.value) && block.value.every((item) => typeof item === 'string')
      ? block.value
      : [];
  }

  tableValue(block: MaterialContentBlock): string[][] {
    return Array.isArray(block.value) && block.value.every((row) => Array.isArray(row))
      ? block.value as string[][]
      : [];
  }

  linkLabel(block: MaterialContentBlock): string {
    return typeof block.value === 'object' && !Array.isArray(block.value) && 'label' in block.value ? block.value.label : 'Open link';
  }

  linkUrl(block: MaterialContentBlock): string {
    return typeof block.value === 'object' && !Array.isArray(block.value) && 'url' in block.value ? block.value.url : '#';
  }

  mediaLabel(block: MaterialContentBlock): string {
    return typeof block.value === 'object' && !Array.isArray(block.value) && 'name' in block.value ? block.value.name : 'Uploaded image';
  }
}
