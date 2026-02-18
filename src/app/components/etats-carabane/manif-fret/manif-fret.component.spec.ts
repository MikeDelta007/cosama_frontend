import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifFretComponent } from './manif-fret.component';

describe('ManifFretComponent', () => {
  let component: ManifFretComponent;
  let fixture: ComponentFixture<ManifFretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManifFretComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManifFretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
