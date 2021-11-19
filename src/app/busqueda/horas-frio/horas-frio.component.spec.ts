import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasFrioComponent } from './horas-frio.component';

describe('HorasFrioComponent', () => {
  let component: HorasFrioComponent;
  let fixture: ComponentFixture<HorasFrioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorasFrioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasFrioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
