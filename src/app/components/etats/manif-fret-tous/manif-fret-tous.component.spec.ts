import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifFretTousComponent } from './manif-fret-tous.component';

describe('ManifFretTousComponent', () => {
  let component: ManifFretTousComponent;
  let fixture: ComponentFixture<ManifFretTousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManifFretTousComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManifFretTousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
