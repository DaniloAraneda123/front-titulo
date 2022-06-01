import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpMultipleComponent } from './help-multiple.component';

describe('HelpMultipleComponent', () => {
  let component: HelpMultipleComponent;
  let fixture: ComponentFixture<HelpMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
