import { Variable } from 'src/app/models/variables.interface';
import { HistoricidadService } from './../../../services/historicidad.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducers';
import * as ActionsHistoricidad from 'src/app/store/actions/historicidad.actions'

export interface OptionsSideBar {
	nameOption: string
	type: string
	description: string
	messageOption: string
	formControlName: string
	values: { value: string, label: string }[]
}

@Component({
	selector: 'app-side-bar-options',
	templateUrl: './side-bar-options.component.html',
	styleUrls: ['./side-bar-options.component.scss']
})
export class SideBarOptionsComponent implements OnInit {

	formOptions: FormGroup = new FormGroup({
		variable: new FormControl('', [Validators.required]),
		altura: new FormControl('', [Validators.required]),
		agrupacion: new FormControl(undefined, [Validators.required]),
		fecha_inicio: new FormControl(undefined, [Validators.required]),
		fecha_termino: new FormControl(undefined, [Validators.required])
	})

	dataVariables: Variable[]
	loadingVariables: boolean

	variables: { value: string, label: string }[] = []
	alturas: { value: string, label: string }[] = []

	@Output() checked: EventEmitter<boolean> = new EventEmitter(false)
	loading: boolean;
	stationsEmpty: boolean;

	constructor(
		private _store: Store<AppState>,
		private _snackBar: MatSnackBar,
		private _variablesService: HistoricidadService
	) { }


	ngOnInit(): void {
		this._store.select("historicidad").pipe(map(el => el.estaciones)).subscribe((estaciones: string[]) => {
			if (estaciones.length > 0) {
				this.stationsEmpty = false
				this.loadingVariables = true
				this._variablesService.consultarVariables({ estaciones }).pipe(take(1)).subscribe((response: Variable[]) => {
					this.dataVariables = response

					this.variables = response.map(el => ({ value: el.variable, label: el.variable }))
					this.formOptions.controls["variable"].setValue(this.variables[0].value)

					this.loadingVariables = false
					this.formOptions.enable()
				});
			} else {
				this.stationsEmpty = true
				this.formOptions.disable()
			}
		})

		this.formOptions.controls["variable"].valueChanges.pipe(filter(el => el != undefined && el != '')).subscribe((el) => {
			let index = this.dataVariables.findIndex(e => e.variable == el)
			this.alturas = this.dataVariables[index].alturas.map(el => ({ label: el, value: el }))
			this.formOptions.controls["altura"].setValue(this.alturas[0].value)
		})

		this.formOptions.valueChanges.pipe(filter(el => this.formOptions.valid)).subscribe(el => {
			this._store.dispatch(ActionsHistoricidad.setForm({ form: this.formOptions.value }))
		})
	}

	comparative(value: MatCheckboxChange) { this.checked.emit(value.checked) }

	loadingData() {
		this._store.dispatch(ActionsHistoricidad.loadingGrafico())
	}
}


function validadorTime(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors => {
		const value = control.value;
		if (value != null) {
			return null
		}
		return { error: true }
	}
}