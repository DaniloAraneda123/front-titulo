import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvapotraspitacionComponent } from './evapotraspitacion.component';

describe('EvapotraspitacionComponent', () => {
  let component: EvapotraspitacionComponent;
  let fixture: ComponentFixture<EvapotraspitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvapotraspitacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvapotraspitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
