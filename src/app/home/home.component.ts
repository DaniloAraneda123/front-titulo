import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  constructor(private dialog: MatDialog) {

  }
  ngAfterViewInit(): void {
    this.dialog.open(HomeAvisoComponent);
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  template: `
    <h1 mat-dialog-title>¡Aviso Importante!</h1>
    <div mat-dialog-content>
      Esta aplicación web aun se encuentra en construcción, por lo que hay secciones <br>
      que son funcionales y otras que son solo maquetas como pruebas de concepto.</div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
})
export class HomeAvisoComponent { }
