import { Variables } from './../models/variables.interface';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ResponseSeries } from '../models/api.interface';

@Injectable({
	providedIn: 'root'
})

export class HistoricidadService {

	constructor(private http: HttpClient) { }

	private url: string = environment.urlAPI

	public consultarDatos(body: any, tipo_consulta: string, estaciones: string[]): Observable<ResponseSeries> {
		return this.http.post<ResponseSeries>(`${this.url}/${tipo_consulta}`, { ...body, estaciones })
	}

	public consultarVariables(estaciones: string[]): Observable<Variables> {
		return this.http.post<Variables>(`${this.url}/alturas_variables`, { estaciones })
	}
}
