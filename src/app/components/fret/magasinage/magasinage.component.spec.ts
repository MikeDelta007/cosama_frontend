import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagasinageComponent } from './magasinage.component';

describe('MagasinageComponent', () => {
  let component: MagasinageComponent;
  let fixture: ComponentFixture<MagasinageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagasinageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagasinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
