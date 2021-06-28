import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarEstacionComponent } from './sidebar-estacion.component';

describe('SidebarEstacionComponent', () => {
  let component: SidebarEstacionComponent;
  let fixture: ComponentFixture<SidebarEstacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarEstacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarEstacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
