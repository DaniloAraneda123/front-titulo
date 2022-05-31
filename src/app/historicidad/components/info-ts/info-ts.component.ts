import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-ts',
  templateUrl: './info-ts.component.html',
  styleUrls: ['./info-ts.component.scss'],
})
export class InfoTsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InfoTsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[]
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }
}
