import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-help-multiple',
  templateUrl: './help-multiple.component.html',
  styleUrls: ['./help-multiple.component.scss']
})
export class HelpMultipleComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<HelpMultipleComponent>
  ) { }

  ngOnInit(): void {
  }

}
