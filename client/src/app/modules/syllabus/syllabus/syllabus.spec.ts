import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Syllabus } from './syllabus';

describe('Syllabus', () => {
  let component: Syllabus;
  let fixture: ComponentFixture<Syllabus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Syllabus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Syllabus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
