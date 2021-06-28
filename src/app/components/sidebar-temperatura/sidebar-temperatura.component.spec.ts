import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTemperaturaComponent } from './sidebar-temperatura.component';

describe('SidebarTemperaturaComponent', () => {
  let component: SidebarTemperaturaComponent;
  let fixture: ComponentFixture<SidebarTemperaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarTemperaturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarTemperaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
