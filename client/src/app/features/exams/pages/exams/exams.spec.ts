// use of this file is:
// Feature page/container file. It connects route UI, feature state, services, and user actions.
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exams } from './exams';

describe('Exams', () => {
  let component: Exams;
  let fixture: ComponentFixture<Exams>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exams]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Exams);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
