import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sqx-privacy-policy',
  standalone: true,
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyPolicyComponent {}
