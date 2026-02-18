import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintBilletComponent } from './print-billet.component';

describe('PrintBilletComponent', () => {
  let component: PrintBilletComponent;
  let fixture: ComponentFixture<PrintBilletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintBilletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintBilletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
