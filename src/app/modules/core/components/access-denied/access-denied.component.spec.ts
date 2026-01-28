import { TestBed } from '@angular/core/testing';

import { AccessDeniedComponent } from './access-denied.component';

describe('AccessDeniedComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessDeniedComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AccessDeniedComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
