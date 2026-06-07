// use of this file is:
// Core account page. It lets users compare Free, Pro, and Plus plans without editing billing fields.
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SnackbarService } from '../../../shared/services/snackbar.service';

type MembershipPlan = {
  name: string;
  price: string;
  tone: string;
  description: string;
  badge: string;
  features: string[];
};

@Component({
  selector: 'sqx-membership-plans',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './membership-plans.component.html',
  styleUrl: './membership-plans.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembershipPlansComponent {
  private router = inject(Router);
  private snackbar = inject(SnackbarService);

  readonly selectedPlan = signal('Free');
  readonly plans: MembershipPlan[] = [
    {
      name: 'Free',
      price: 'Free',
      tone: 'neutral',
      badge: 'Starter',
      description: 'For trial learning and basic access.',
      features: ['Limited course previews', 'Basic tasks', 'Community support', 'Standard dashboard'],
    },
    {
      name: 'Pro',
      price: 'Lifetime',
      tone: 'primary',
      badge: 'Recommended',
      description: 'For complete learning access and LMS tools.',
      features: ['All purchased courses', 'Materials and exams', 'Progress tracking', 'Priority support'],
    },
    {
      name: 'Plus',
      price: 'Lifetime+',
      tone: 'premium',
      badge: 'Mentor',
      description: 'For learners who need guided premium support.',
      features: ['Everything in Pro', 'Priority mentoring', 'Review support', 'Early feature access'],
    },
  ];

  // use of this is:
  // Marks a plan as selected and returns the user to profile settings after showing feedback.
  choosePlan(planName: string): void {
    this.selectedPlan.set(planName);
    this.snackbar.success(`${planName} plan selected.`);
    this.router.navigate(['/profile-settings']);
  }
}
