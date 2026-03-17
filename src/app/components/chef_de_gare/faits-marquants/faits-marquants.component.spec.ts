import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaitsMarquantsComponent } from './faits-marquants.component';

describe('FaitsMarquantsComponent', () => {
  let component: FaitsMarquantsComponent;
  let fixture: ComponentFixture<FaitsMarquantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaitsMarquantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaitsMarquantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
