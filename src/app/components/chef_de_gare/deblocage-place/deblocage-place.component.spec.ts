import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeblocagePlaceComponent } from './deblocage-place.component';

describe('DeblocagePlaceComponent', () => {
  let component: DeblocagePlaceComponent;
  let fixture: ComponentFixture<DeblocagePlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeblocagePlaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeblocagePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
