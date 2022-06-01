import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-ts',
  templateUrl: './info-ts.component.html',
  styleUrls: ['./info-ts.component.scss'],
})
export class InfoTsComponent implements OnInit {
  variable: string;
  altura: string;
  constructor(
    public dialogRef: MatDialogRef<InfoTsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      subintervalos:any[],
      variable:string,
      altura:string
    }
  ) {}

  ngOnInit(): void {
    this.variable = this.data.variable
    this.altura = this.data.altura
  }
}
