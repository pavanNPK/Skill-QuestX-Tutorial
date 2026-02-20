import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveStream } from './live-stream';

describe('LiveStream', () => {
  let component: LiveStream;
  let fixture: ComponentFixture<LiveStream>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveStream]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveStream);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
