import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsBilletComponent } from './ops-billet.component';

describe('OpsBilletComponent', () => {
  let component: OpsBilletComponent;
  let fixture: ComponentFixture<OpsBilletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsBilletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsBilletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
