import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDocs } from './exam-docs';

describe('ExamDocs', () => {
  let component: ExamDocs;
  let fixture: ComponentFixture<ExamDocs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamDocs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamDocs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
