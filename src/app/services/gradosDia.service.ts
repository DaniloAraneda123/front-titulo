import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RequestSerie, ResponseSeries } from '../models/api.interface';

@Injectable({
	providedIn: 'root'
})

export class GradosDiaService {

	constructor(private http: HttpClient) { }

	private url: string = environment.urlAPI

	consultarSerieCustom(body: RequestSerie): Observable<any> {
		return this.http.post<ResponseSeries>(`${this.url}/serie_continua_t`,body )
	}

	consultarSerieTemporadas(body: any): Observable<any> {
		return this.http.post<ResponseSeries>(`${this.url}/serie_temporadas`,body )
	}
}
