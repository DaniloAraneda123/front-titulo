import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradosDiaComponent } from './grados-dia.component';

describe('GradosDiaComponent', () => {
  let component: GradosDiaComponent;
  let fixture: ComponentFixture<GradosDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradosDiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradosDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
