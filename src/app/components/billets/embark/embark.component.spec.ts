import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbarkComponent } from './embark.component';

describe('EmbarkComponent', () => {
  let component: EmbarkComponent;
  let fixture: ComponentFixture<EmbarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbarkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmbarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
