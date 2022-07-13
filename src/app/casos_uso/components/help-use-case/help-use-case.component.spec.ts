import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpUseCaseComponent } from './help-use-case.component';

describe('HelpUseCaseComponent', () => {
  let component: HelpUseCaseComponent;
  let fixture: ComponentFixture<HelpUseCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpUseCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpUseCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
