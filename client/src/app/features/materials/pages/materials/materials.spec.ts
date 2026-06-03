// use of this file is:
// Feature page/container file. It connects route UI, feature state, services, and user actions.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';

import { Materials } from './materials';

describe('Materials', () => {
  let component: Materials;
  let fixture: ComponentFixture<Materials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Materials],
      providers: [
        MessageService,
        ConfirmationService,
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
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
