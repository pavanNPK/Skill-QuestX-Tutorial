// use of this file is:
// Core component file. It renders app-wide UI used across routes.
import { TestBed } from '@angular/core/testing';

import { TermsAndConditionsComponent } from './terms-and-conditions.component';

describe('TermsAndConditionsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsAndConditionsComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TermsAndConditionsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
