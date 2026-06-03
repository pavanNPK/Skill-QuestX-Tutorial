// use of this file is:
// Shared component file. It provides reusable UI or base behavior across features.
import { ChangeDetectionStrategy, Component, input } from '@angular/core';


@Component({
  selector: 'sqx-loader-overlay',
  standalone: true,
  imports: [],
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
