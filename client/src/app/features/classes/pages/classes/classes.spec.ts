// use of this file is:
// Feature page/container file. It connects route UI, feature state, services, and user actions.
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Classes } from './classes';

describe('Classes', () => {
  let component: Classes;
  let fixture: ComponentFixture<Classes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Classes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Classes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
