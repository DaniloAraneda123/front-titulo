import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarFechaComponent } from './sidebar-fecha.component';

describe('SidebarFechaComponent', () => {
  let component: SidebarFechaComponent;
  let fixture: ComponentFixture<SidebarFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarFechaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
