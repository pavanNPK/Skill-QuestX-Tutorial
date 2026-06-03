import { TestBed } from '@angular/core/testing';

import { ForgotComponent } from './forgot.component';

describe('ForgotComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ForgotComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
