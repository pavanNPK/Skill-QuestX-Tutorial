import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataFound } from './no-data-found';

describe('NoDataFound', () => {
  let component: NoDataFound;
  let fixture: ComponentFixture<NoDataFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoDataFound]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoDataFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
