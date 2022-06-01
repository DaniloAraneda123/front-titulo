import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-help-single',
  templateUrl: './help-single.component.html',
  styleUrls: ['./help-single.component.scss']
})
export class HelpSingleComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<HelpSingleComponent>
  ) { }

  ngOnInit(): void { }
}
