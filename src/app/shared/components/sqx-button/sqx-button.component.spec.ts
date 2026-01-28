import { TestBed } from '@angular/core/testing';

import { SqxButtonComponent } from './sqx-button.component';

describe('SqxButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SqxButtonComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SqxButtonComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
