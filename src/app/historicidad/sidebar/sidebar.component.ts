import { Component, Input, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import * as actionsHistoricidad from '../../store/actions/historicidad.actions'
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']

})
export class SidebarComponent implements OnDestroy {

	@Input() itemsVariables: any = null;
	@Input() filtros: any;
	public itemsFiltros!: any[];

	public formGrafico: FormGroup = new FormGroup({});
	errorTiempo1: boolean = false;
	errorTiempo2: boolean = false;

	variablesDisponibles: any
	checkComparativa: boolean;
	error: any;

	suscripcion$: Subscription

	constructor(private store: Store<AppState>, private router: Router) {
		this.store.select(state => state.historicidad.comparativa).pipe(take(1)).subscribe((check) => { this.checkComparativa = check })

		this.suscripcion$ = this.store.select('historicidad').subscribe((state) => {
			state.estaciones.length == 0 ? this.formGrafico.disable() : this.formGrafico.enable()

			let opciones = []
			for (let variable of Object.keys(state.variablesDisponibles)) {
				opciones.push({ valor: variable, etiqueta: variable })
			}

			this.error = state.error

			if (this.itemsVariables) {
				this.itemsVariables[0].opciones = opciones
				// this.formGrafico.get('variable').reset()
				// this.formGrafico.get('altura').reset()
			}

			this.variablesDisponibles = state.variablesDisponibles
		})
	}


	ngOnInit(): void {
		this.itemsFiltros = this.filtros['promedio_custom']
		this.itemsVariables.forEach((element: any) => {
			this.formGrafico.addControl(element.formControlName, new FormControl({ value: '', disabled: true }, Validators.required));
		});
		this.llenarFiltros()
	}

	llenarFiltros() {
		this.itemsFiltros.forEach(element => {
			if (element.tipo === "rango fecha") {
				this.formGrafico.addControl(element.formControlInicio, new FormControl({ disabled: true }, Validators.required));
				this.formGrafico.addControl(element.formControlTermino, new FormControl({ disabled: true }, Validators.required));
			} else if (element.tipo === "rango tiempo") {
				this.formGrafico.addControl(element.formControlInicio, new FormControl({ disabled: true }, validadorTime()));
				this.formGrafico.addControl(element.formControlTermino, new FormControl({ disabled: true }, validadorTime()));
			} else {
				this.formGrafico.addControl(element.formControlName, new FormControl({ value: '', disabled: false }, Validators.required));
			}
		});

	}


	public cambiarFiltros(itemSelected: string, comboSeleccionado: string): void {
		if (comboSeleccionado === "variable") {
			this.itemsVariables[1].opciones = []
			for (let altura of this.variablesDisponibles[itemSelected]) {
				this.itemsVariables[1].opciones.push({ valor: altura, etiqueta: altura })
			}
			this.formGrafico.get('altura').setValue(null)
		}

		if (comboSeleccionado === "criterio") {

			//Limpiamos los anteriores
			this.itemsFiltros.forEach((elemento) => {
				if (elemento.tipo === "rango fecha") {
					this.formGrafico.removeControl(elemento.formControlInicio);
					this.formGrafico.removeControl(elemento.formControlTermino);
				} else if (elemento.tipo === "rango tiempo") {
					this.formGrafico.removeControl(elemento.formControlInicio);
					this.formGrafico.removeControl(elemento.formControlTermino);
				} else {
					this.formGrafico.removeControl(elemento.formControlName);
				}
			});

			//Establecemoss los nuevo filtros y los llenamos
			this.itemsFiltros = this.filtros[itemSelected]
			this.llenarFiltros()
		}
	}

	comparativa(evento: any) {
		this.checkComparativa = evento.checked
		this.store.dispatch(actionsHistoricidad.comparativaOnOff())
	}

	public errorTime(timer: string) {
		const valor = this.formGrafico.get(timer)?.errors?.errorRequerido
		return (valor === undefined) ? true : false
	}

	public generarGrafico() {

		if (!this.formGrafico.invalid) {

			const params = this.getTransformParams()

			let est: string[] = []
			this.store.select('historicidad').pipe(take(1)).subscribe(({ estaciones }) => {
				est = estaciones
			})

			this.store.dispatch(actionsHistoricidad.loadingGrafico({
				tipo: params.criterio,
				parametros: params,
				estaciones: est
			}))

			if (this.checkComparativa === true) {
				this.router.navigate(['historicidad', 'grafica_multiple'])
			} else {
				this.router.navigate(['historicidad', 'grafica_unica'])
			}
		}
		else {
			this.errorTiempo1 = this.errorTime('tiempoInicio')
			this.errorTiempo2 = this.errorTime('tiempoTermino')
		}
	}


	getTransformParams(): any {
		let formulario = this.formGrafico.value
		this.itemsFiltros.forEach((elemento) => {
			if (elemento.tipo === "rango fecha") {
				formulario[elemento.formControlInicio] = new Date(formulario[elemento.formControlInicio]).toJSON()
				formulario[elemento.formControlTermino] = new Date(formulario[elemento.formControlTermino]).toJSON()
			} else if (elemento.tipo === "rango tiempo") {
				formulario[elemento.formControlInicio] = formulario[elemento.formControlInicio].split(":")[0]
				formulario[elemento.formControlTermino] = formulario[elemento.formControlTermino].split(":")[0]
			}
		});
		return formulario
	}

	ngOnDestroy(): void {
		this.suscripcion$.unsubscribe()
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