import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointerVoyageComponent } from './pointer-voyage.component';

describe('PointerVoyageComponent', () => {
  let component: PointerVoyageComponent;
  let fixture: ComponentFixture<PointerVoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointerVoyageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointerVoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
