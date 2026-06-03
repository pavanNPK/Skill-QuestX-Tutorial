import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../../core/components/navbar/navbar.component';
import { HeaderComponent } from '../../../../core/components/header/header';

@Component({
  selector: 'sqx-home',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  sidebarCollapsed = signal(this.getStoredSidebarState());

  setSidebarCollapsed(value: boolean) {
    this.sidebarCollapsed.set(value);
    setTimeout(() => window.dispatchEvent(new Event('resize')), 230);
  }

  private getStoredSidebarState(): boolean {
    if (typeof localStorage === 'undefined') return false;
    return localStorage.getItem('sqx-sidebar-collapsed') === 'true';
  }
}
