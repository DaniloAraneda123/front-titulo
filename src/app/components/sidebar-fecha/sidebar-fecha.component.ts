import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgModelGroup } from '@angular/forms';

@Component({
  selector: 'app-sidebar-fecha',
  templateUrl: './sidebar-fecha.component.html',
  styleUrls: ['./sidebar-fecha.component.scss'],
  viewProviders:[{provide: ControlContainer, useExisting:NgModelGroup}]
})
export class SidebarFechaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
