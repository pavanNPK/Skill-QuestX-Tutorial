import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';

import { OnlineAssessment } from './online-assessment';

describe('OnlineAssessment', () => {
  let component: OnlineAssessment;
  let fixture: ComponentFixture<OnlineAssessment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineAssessment],
      providers: [MessageService, provideHttpClient(), provideHttpClientTesting()],
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
