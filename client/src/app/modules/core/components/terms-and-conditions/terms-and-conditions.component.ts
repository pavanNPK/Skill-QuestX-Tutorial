import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sqx-terms-and-conditions',
  standalone: true,
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsAndConditionsComponent {}
