import { Variable } from 'src/app/models/variables.interface';
import { HistoricidadService } from './../../../services/historicidad.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged, filter, map, take } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducers';

import * as ActionsHistoricidad from 'src/app/store/actions/historicidad.actions'
import * as ActionsGraficaUnica from 'src/app/store/actions/graficaUnica.actions'
import * as ActionsGraficaMultiple from 'src/app/store/actions/graficaMultiple.actions'


import { Router } from '@angular/router';
import { ajustarFechas } from 'src/app/utils/ajustar-fecha';
import { environment } from 'src/environments/environment';

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
		tipo_operacion: new FormControl(undefined, [Validators.required]),
		agrupacion: new FormControl(undefined, [Validators.required]),
		fecha_inicio: new FormControl(undefined, [Validators.required]),
		fecha_final: new FormControl(undefined, [Validators.required])
	})

	dataVariables: Variable[]
	loadingVariables: boolean = false

	variables: { value: string, label: string }[] = []
	alturas: { value: string, label: string }[] = []

	estaciones: string[] = []

	@Output() checked: EventEmitter<boolean> = new EventEmitter(false)
	loading: boolean;
	stationsEmpty: boolean;

	maxDate = environment.maxDate

	constructor(
		private _store: Store<AppState>,
		private _router: Router,
		private _snackBar: MatSnackBar,
		private _variablesService: HistoricidadService
	) { }


	ngOnInit(): void {
		this._store.pipe(
			select(el => el.historicidad.estaciones),
			distinctUntilChanged((prev, curr) => {
				return JSON.stringify(prev) == JSON.stringify(curr)
			})
		).subscribe((estaciones: string[]) => {
			this.estaciones = estaciones
			if (estaciones.length > 0) {
				this.stationsEmpty = false
				this.loadingVariables = true
				this._variablesService.consultarVariables({ estaciones }).pipe(take(1)).subscribe((response: Variable[]) => {
					this.dataVariables = response
					this._store.dispatch(ActionsHistoricidad.setVariables({ payload: response }))

					this.variables = response.map(el => ({ value: el.variable, label: el.variable }))
					this.formOptions.controls["variable"].setValue(null)

					this.loadingVariables = false
					this.formOptions.enable()
				});
			} else {
				this.stationsEmpty = true
				this.formOptions.controls["variable"].setValue(null)
				this.formOptions.controls["altura"].setValue(null)
				this.formOptions.controls["agrupacion"].setValue(null)
				this.formOptions.disable()
			}
		})

		this.formOptions.controls["variable"].valueChanges.pipe(filter(el => el != undefined && el != '')).subscribe((el) => {
			let index = this.dataVariables.findIndex(e => e.variable == el)
			this.alturas = this.dataVariables[index].alturas.map(el => ({ label: el, value: el }))
			this.formOptions.controls["altura"].setValue(undefined)
		})

		this.formOptions.valueChanges.pipe(filter(el => this.formOptions.valid)).subscribe(el => {
			let form = { ...this.formOptions.value }
			const { start, end } = ajustarFechas(form.fecha_inicio, form.fecha_final, form.agrupacion)
			form.fecha_inicio = start
			form.fecha_final = end
			this._store.dispatch(ActionsHistoricidad.setForm({ form: this.formOptions.value }))
		})
	}

	comparative(value: MatCheckboxChange) { this.checked.emit(value.checked) }

	async loadingData() {
		const { parametros, estaciones } = await this._store.select(el => el.historicidad).pipe(take(1)).toPromise()
		
		if (this.estaciones.length == 1) {
			this._store.dispatch(ActionsGraficaUnica.setParametros({ estacion: estaciones[0], parametros }))
			this._router.navigate(["historicidad", "grafica_unica"])
		}
		else if (this.estaciones.length > 1) {
			this._store.dispatch(ActionsGraficaMultiple.setParametros({ estaciones, parametros }))
			this._router.navigate(["historicidad", "grafica_multiple"])
		}
	}
}