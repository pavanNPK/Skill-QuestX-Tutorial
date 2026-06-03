// use of this file is:
// Feature page/container file. It connects route UI, feature state, services, and user actions.
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
