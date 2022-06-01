import { Variable, Variables } from './../models/variables.interface';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RequestSerie, ResponseSeries } from '../models/api.interface';

@Injectable({ providedIn: 'root' })

export class HistoricidadService {

	constructor(private http: HttpClient) { }

	private rootUrl: string = environment.urlAPI

	public consultarSerie(body: RequestSerie): Observable<ResponseSeries> {
		return this.http.post<ResponseSeries>(`${this.rootUrl}/serie_continua_t`, body)
	}

	public consultarVariables(body: { estaciones: string[] }): Observable<Variable[]> {
		return this.http.post<Variable[]>(`${this.rootUrl}/variables`, body)
	}
}
