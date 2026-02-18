import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifPassagersComponent } from './manif-passagers.component';

describe('ManifPassagersComponent', () => {
  let component: ManifPassagersComponent;
  let fixture: ComponentFixture<ManifPassagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManifPassagersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManifPassagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
