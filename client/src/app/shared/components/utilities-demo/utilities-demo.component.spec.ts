// use of this file is:
// Shared component file. It provides reusable UI or base behavior across features.
import { TestBed } from '@angular/core/testing';

import { UtilitiesDemoComponent } from './utilities-demo.component';

describe('UtilitiesDemoComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilitiesDemoComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(UtilitiesDemoComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
