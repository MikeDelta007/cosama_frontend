import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudFretComponent } from './crud-fret.component';

describe('CrudFretComponent', () => {
  let component: CrudFretComponent;
  let fixture: ComponentFixture<CrudFretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudFretComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudFretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
