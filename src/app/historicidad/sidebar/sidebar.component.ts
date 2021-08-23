import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';


import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import * as actionsHistoricidad from '../../store/actions/historicidad.actions'
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']

})
export class SidebarComponent {

	@Input() itemsVariables: any;
	@Input() filtros: any;
	public itemsFiltros: any[];

	public formGrafico: FormGroup = new FormGroup({});
	errorTiempo1: boolean = false;
	errorTiempo2: boolean = false;

	constructor(private store: Store<AppState>, private router: Router) { }

	ngOnInit(): void {
		this.itemsFiltros = this.filtros['promedio_custom']

		this.itemsVariables.forEach(element => {
			this.formGrafico.addControl(element.formControlName, new FormControl('', Validators.required));
		});

		this.llenarFiltros()
	}


	llenarFiltros() {

		this.itemsFiltros.forEach(element => {
			if (element.tipo === "rango fecha") {
				this.formGrafico.addControl(element.formControlInicio, new FormControl(Validators.required));
				this.formGrafico.addControl(element.formControlTermino, new FormControl(Validators.required));
			} else if (element.tipo === "rango tiempo") {
				this.formGrafico.addControl(element.formControlInicio, new FormControl(null, validadorTime()));
				this.formGrafico.addControl(element.formControlTermino, new FormControl(null, validadorTime()));
			} else {
				this.formGrafico.addControl(element.formControlName, new FormControl('', Validators.required));
			}
		});
	}

	public cambiarFiltros(itemSelected: string, comboSeleccionado: string): void {
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

	comparativa() {
		this.store.dispatch(actionsHistoricidad.comparativaOnOff())
	}

	public errorTime(timer: string) {
		const valor = this.formGrafico.get(timer).errors?.errorRequerido
		return (valor === undefined) ? true : false
	}

	public generarGrafico() {

		if (!this.formGrafico.invalid) {

			const formulario = this.formGrafico.value
			let params = {
				...formulario,
				hora_inicio: formulario.hora_inicio.split(":")[0],
				hora_final: formulario.hora_final.split(":")[0],
				fecha_inicio: new Date(formulario.fecha_inicio).toJSON(),
				fecha_final: new Date(formulario.fecha_final).toJSON()
			}

			let est = []
			this.store.select('historicidad').pipe(take(1)).subscribe(({ estaciones }) => {
				est = estaciones
			})

			this.store.dispatch(actionsHistoricidad.loadingGrafico({
				tipo: this.formGrafico.value.criterio,
				parametros: params,
				estaciones: est
			}))
			this.router.navigate(['historicidad', 'grafico'])
		}
		else {
			this.errorTiempo1 = this.errorTime('tiempoInicio')
			this.errorTiempo2 = this.errorTime('tiempoTermino')
		}
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