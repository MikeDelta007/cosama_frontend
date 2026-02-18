import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituComponent } from './situ.component';

describe('SituComponent', () => {
  let component: SituComponent;
  let fixture: ComponentFixture<SituComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SituComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SituComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
