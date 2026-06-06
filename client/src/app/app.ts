// use of this file is:
// Angular source file. It connects one part of the frontend application.
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { LoaderOverlayComponent } from './shared/components/loader-overlay/loader-overlay.component';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'sqx-root',
  imports: [RouterOutlet, ToastModule, LoaderOverlayComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly loader = inject(LoaderService);
}
