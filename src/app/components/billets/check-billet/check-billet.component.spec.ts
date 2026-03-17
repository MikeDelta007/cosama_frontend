import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBilletComponent } from './check-billet.component';

describe('CheckBilletComponent', () => {
  let component: CheckBilletComponent;
  let fixture: ComponentFixture<CheckBilletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckBilletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckBilletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
