import { TestBed } from '@angular/core/testing';

import { SqxInputComponent } from './sqx-input.component';

describe('SqxInputComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SqxInputComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SqxInputComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
