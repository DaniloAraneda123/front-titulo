import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Mes } from 'src/app/models/mes';
import { Periodo } from 'src/app/models/periodo';
import { PeriodoHistogram } from 'src/app/models/periodo-histogram';
import { AnioHistogram } from 'src/app/models/anio-histogram';
import { MesHistogram } from 'src/app/models/mes-histogram';
import { CustomHistogram } from 'src/app/models/custom-histogram';
import { CustomRegistro } from 'src/app/models/custom-registro';
import { Custom } from 'src/app/models/custom';
import { cuentas, promedio_custom } from '../models/cuentas.interface';



@Injectable({
	providedIn: 'root'
})

export class HistoricidadService {


	constructor(private httpclient: HttpClient) { }


	// ENDPOINT 1
	get_promedio_custom(_params: Custom): Observable<promedio_custom> {
		let params1 = new HttpParams();
		for (let [key, value] of Object.entries(_params)) {
			params1 = params1.set(key, value);
		}
		console.log("Parametros", params1);
		return this.httpclient.get<promedio_custom>("http://127.0.0.1:5000/promedio_custom", { params: params1 });
	}


	// ENDPOINT 2
	get_promedios_mes_anios(_params: Mes): Observable<promedio_custom> {

		let params1 = new HttpParams();


		for (let [key, value] of Object.entries(_params)) {
			params1 = params1.set(key, value);
		}
		console.log(params1);

		return this.httpclient.get<promedio_custom>("http://127.0.0.1:5000/promedios_mes_anios", { params: params1 });

	}


	// ENDPOINT 3
	get_promedios_temporadas(_params: Custom): Observable<promedio_custom> {

		let params1 = new HttpParams();

		for (let [key, value] of Object.entries(_params)) {
			params1 = params1.set(key, value);
		}
		return this.httpclient.get<promedio_custom>("http://127.0.0.1:5000/promedio_custom", { params: params1 });
	}


	// ENDPOINT 4
	get_promedio_anios(_params: Periodo): Observable<promedio_custom> {

		let params1 = new HttpParams();
		for (let [key, value] of Object.entries(_params)) {
			params1 = params1.set(key, value);
		}
		return this.httpclient.get<promedio_custom>("http://127.0.0.1:5000/promedio_anios", { params: params1 });
	}


	// ENDPOINT 5
	get_heladas_anios(_params: PeriodoHistogram): Observable<cuentas> {
		let params1 = new HttpParams();
		for (let [key, value] of Object.entries(_params)) {
			if (key != 'criterio_busqueda') {
				params1 = params1.set(key, value);
			}
		}
		return this.httpclient.get<cuentas>("http://127.0.0.1:5000/heladas_anios", { params: params1 });
	}

	// ENDPOINT 6

	get_heladas_mes_anios(_params: MesHistogram): Observable<cuentas> {
		let params1 = new HttpParams();
		for (let [key, value] of Object.entries(_params)) {
			if (key != 'criterio_busqueda') {
				params1 = params1.set(key, value);
			}
		}
		return this.httpclient.get<cuentas>("http://127.0.0.1:5000/heladas_mes_anios", { params: params1 });
	}


	// ENDPOINT 7
	get_heladas_meses_anio(_params: AnioHistogram): Observable<cuentas> {
		let params1 = new HttpParams();
		for (let [key, value] of Object.entries(_params)) {
			if (key != 'criterio_busqueda') {
				params1 = params1.set(key, value);
			}
		}
		return this.httpclient.get<cuentas>("http://127.0.0.1:5000/heladas_meses_anio", { params: params1 });
	}


	// ENDPOINT 8
	get_heladas_custom(_params: CustomHistogram): Observable<cuentas> {
		let params1 = new HttpParams();
		for (let [key, value] of Object.entries(_params)) {
			if (key != 'criterio_busqueda') {
				params1 = params1.set(key, value);
			}

		}
		return this.httpclient.get<cuentas>("http://127.0.0.1:5000/heladas_custom", { params: params1 });
	}


	// ENDPOINT 9
	get_maximas_anios(_params: PeriodoHistogram): Observable<cuentas> {

		let params1 = new HttpParams();


		for (let [key, value] of Object.entries(_params)) {
			if (key != 'criterio_busqueda') {
				params1 = params1.set(key, value);
			}
		}
		return this.httpclient.get<cuentas>("http://127.0.0.1:5000/maximas_anios", { params: params1 });
	}


	// ENDPOINT 10
	get_maximas_mes_anios(_params: MesHistogram): Observable<cuentas> {
		let params1 = new HttpParams();
		for (let [key, value] of Object.entries(_params)) {
			if (key != 'criterio_busqueda') {
				params1 = params1.set(key, value);
			}
		}
		return this.httpclient.get<cuentas>("http://127.0.0.1:5000/maximas_mes_anios", { params: params1 });
	}


	// ENDPOINT 11
	get_maximas_meses_anio(_params: AnioHistogram): Observable<cuentas> {
		let params1 = new HttpParams();
		for (let [key, value] of Object.entries(_params)) {
			if (key != 'criterio_busqueda') {
				params1 = params1.set(key, value);
			}
		}
		return this.httpclient.get<cuentas>("http://127.0.0.1:5000/maximas_meses_anio", { params: params1 });
	}


	// ENDPOINT 12
	get_maximas_custom(_params: CustomHistogram): Observable<cuentas> {
		let params1 = new HttpParams();
		for (let [key, value] of Object.entries(_params)) {
			if (key != 'criterio_busqueda') {
				params1 = params1.set(key, value);
			}
		}
		return this.httpclient.get<cuentas>("http://127.0.0.1:5000/maximas_custom", { params: params1 });
	}


	// ENDPOINT 13
	get_busqueda_heladas(_params: CustomRegistro): Observable<cuentas> {
		let params1 = new HttpParams();
		for (let [key, value] of Object.entries(_params)) {
			params1 = params1.set(key, value);
		}
		return this.httpclient.get<cuentas>("http://127.0.0.1:5000/busqueda_heladas", { params: params1 });
	}


	// ENDPOINT 14
	get_busqueda_maximas(_params: CustomRegistro): Observable<cuentas> {
		let params1 = new HttpParams();
		for (let [key, value] of Object.entries(_params)) {
			params1 = params1.set(key, value);
		}
		return this.httpclient.get<cuentas>("http://127.0.0.1:5000/busqueda_maximas", { params: params1 });
	}
}
