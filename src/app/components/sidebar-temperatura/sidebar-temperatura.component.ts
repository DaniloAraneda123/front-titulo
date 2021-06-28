import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgModelGroup } from '@angular/forms';


@Component({
  selector: 'app-sidebar-temperatura',
  templateUrl: './sidebar-temperatura.component.html',
  styleUrls: ['./sidebar-temperatura.component.scss'],
  viewProviders:[{provide: ControlContainer, useExisting:NgModelGroup}]
})


export class SidebarTemperaturaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
