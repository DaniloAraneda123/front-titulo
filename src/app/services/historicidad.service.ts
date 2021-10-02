import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})

export class HistoricidadService {

	constructor(private http: HttpClient) { }

	private url: string = environment.urlAPI

	consultarDatos(body: any, tipo_consulta: string, estaciones: string[]): Observable<any> {
		return this.http.post(`${this.url}/${tipo_consulta}`, { ...body, estaciones })
	}

	consultarVariables(estaciones: string[]): Observable<any> {
		return this.http.post(`${this.url}/alturas_variables`, { estaciones })
	}
}
