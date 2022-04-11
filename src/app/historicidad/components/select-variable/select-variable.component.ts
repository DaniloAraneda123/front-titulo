import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Variable } from 'src/app/models/variables.interface';

@Component({
	selector: 'app-select-variable',
	templateUrl: './select-variable.component.html',
	styleUrls: ['./select-variable.component.scss']
})
export class SelectVariableComponent {
	constructor(
		public dialogRef: MatDialogRef<SelectVariableComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { variable: string; altura: string; }[],
	) { }

	selectVariable(select: MatSelect) { this.dialogRef.close(this.data[select.value]) }
}
