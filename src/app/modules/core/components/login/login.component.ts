import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'sqx-login',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, IconFieldModule, InputIconModule, PasswordModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy {
  private rotationTimer?: ReturnType<typeof setInterval>;

  carouselItems = [
    {
      title: 'REDEFINE',
      subtitle: 'Boost your learning and career path'
    },
    {
      title: 'UPSKILL',
      subtitle: 'Gain modern, in-demand technical expertise'
    },
    {
      title: 'SUCCEED',
      subtitle: 'Land your dream role or promotion'
    }
  ];

  activeIndex = 0;

  constructor() {
    this.rotationTimer = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.carouselItems.length;
    }, 3000);
  }

  setActive(index: number) {
    this.activeIndex = index;
  }

  ngOnDestroy(): void {
    if (this.rotationTimer) {
      clearInterval(this.rotationTimer);
    }
  }
}
