import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricidadComponent } from './historicidad.component';

describe('HistoricidadComponent', () => {
  let component: HistoricidadComponent;
  let fixture: ComponentFixture<HistoricidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
