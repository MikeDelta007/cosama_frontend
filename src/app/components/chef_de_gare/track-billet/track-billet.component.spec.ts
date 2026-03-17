import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackBilletComponent } from './track-billet.component';

describe('TrackBilletComponent', () => {
  let component: TrackBilletComponent;
  let fixture: ComponentFixture<TrackBilletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackBilletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackBilletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
