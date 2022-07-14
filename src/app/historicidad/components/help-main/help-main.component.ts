import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-help-main',
  templateUrl: './help-main.component.html',
  styleUrls: ['./help-main.component.scss']
})
export class HelpMainComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<HelpMainComponent>
  ) { }

  ngOnInit(): void {
  }

}
