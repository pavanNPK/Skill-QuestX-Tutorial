import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'sqx-login',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, IconFieldModule, InputIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy {
  private rotationTimer?: ReturnType<typeof setInterval>;

  carouselItems = [
    {
      author: 'Sam Halftime',
      role: 'System Designer at coinquake',
      quote:
        'Skill Questx elevated my career and personal growth. Tailored content and feedback were key. Highly recommend for serious progress.',
      avatar: '/assets/images/avatar-1.jpg'
    },
    {
      author: 'Jane Doe',
      role: 'Frontend Architect',
      quote:
        'The depth of content here is unmatched. I was able to transition to a senior role within months.',
      avatar: '/assets/images/avatar-2.jpg'
    },
    {
      author: 'John Smith',
      role: 'Backend Engineer',
      quote:
        'Practical assignments and real-world scenarios made all the difference in my interviewing process.',
      avatar: '/assets/images/avatar-3.jpg'
    }
  ];

  activeIndex = 0;

  constructor() {
    this.rotationTimer = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.carouselItems.length;
    }, 5000);
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
