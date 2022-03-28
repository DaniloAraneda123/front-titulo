import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotStackedColumnsComponent } from './plot-stacked-columns.component';

describe('PlotStackedColumnsComponent', () => {
  let component: PlotStackedColumnsComponent;
  let fixture: ComponentFixture<PlotStackedColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotStackedColumnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotStackedColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
