import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sqx-loader-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader-overlay.component.html',
  styleUrl: './loader-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderOverlayComponent {
  /** When true, overlay is visible. */
  visible = input<boolean>(false);
  /** 'white' | 'black' – blur backdrop color. */
  theme = input<'white' | 'black'>('black');
}
