import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderOverlayComponent } from './shared/components/loader-overlay/loader-overlay.component';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'sqx-root',
  imports: [RouterOutlet, LoaderOverlayComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly loader = inject(LoaderService);
}
