import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordedClasses } from './recorded-classes';

describe('RecordedClasses', () => {
  let component: RecordedClasses;
  let fixture: ComponentFixture<RecordedClasses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordedClasses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordedClasses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
