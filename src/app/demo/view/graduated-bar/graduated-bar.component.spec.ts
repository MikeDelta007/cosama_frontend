import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduatedBarComponent } from './graduated-bar.component';

describe('GraduatedBarComponent', () => {
  let component: GraduatedBarComponent;
  let fixture: ComponentFixture<GraduatedBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraduatedBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraduatedBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
