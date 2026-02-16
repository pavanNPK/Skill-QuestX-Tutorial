import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineAssessment } from './online-assessment';

describe('OnlineAssessment', () => {
  let component: OnlineAssessment;
  let fixture: ComponentFixture<OnlineAssessment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineAssessment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineAssessment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
