import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Materials } from './materials';

describe('Materials', () => {
  let component: Materials;
  let fixture: ComponentFixture<Materials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Materials]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Materials);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
