import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBilletComponent } from './edit-billet.component';

describe('EditBilletComponent', () => {
  let component: EditBilletComponent;
  let fixture: ComponentFixture<EditBilletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBilletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBilletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
