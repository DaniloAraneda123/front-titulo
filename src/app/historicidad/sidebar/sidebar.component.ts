import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']

})
export class SidebarComponent {

	@Input() itemsVariables: any;
	@Input() itemsFiltros: any;

	public formGrafico: FormGroup = new FormGroup({});
	errorTiempo1: boolean = false;
	errorTiempo2: boolean = false;

	constructor() { }

	ngOnInit(): void {

		const validadorTime = (): ValidatorFn => {
			return (control: AbstractControl): ValidationErrors => {
				const value = control.value;
				return (value === '--:--') ? { errorRequerido: true } : null;
			}
		}

		//Controles unicos
		this.formGrafico.addControl('tiempoInicio', new FormControl('--:--', validadorTime()));
		this.formGrafico.addControl('tiempoTermino', new FormControl('--:--', validadorTime()));
		this.formGrafico.addControl('fechaInicio', new FormControl());
		this.formGrafico.addControl('fechaTermino', new FormControl(Validators.required));

		//Formualrios Dinamicos
		this.itemsVariables.forEach(element => {
			this.formGrafico.addControl(element.formControlName, new FormControl('', Validators.required));
		});
	}

	public cambioFormulario(): void {
	}

	public errorTime(timer: string) {
		const valor = this.formGrafico.get(timer).errors?.errorRequerido
		return (valor === undefined) ? false : true
	}


	public generarGrafico() {
		if (!this.formGrafico.invalid) {
			console.log(this.formGrafico.value)
		}
		else {
			this.errorTiempo1 = this.errorTime('tiempoInicio')
			this.errorTiempo2 = this.errorTime('tiempoTermino')
		}
	}

	// range = new FormGroup({
	// 	start: new FormControl(),
	// 	end: new FormControl()
	// });



}
