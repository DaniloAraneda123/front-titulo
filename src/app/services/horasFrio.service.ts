import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SerieCustom } from '../models/api.interface';

@Injectable({
	providedIn: 'root'
})

export class HorasFrioService {

	constructor(private http: HttpClient) { }

	private url: string = environment.urlAPI

	consultarSerieCustom(body: any): Observable<any> {
		return this.http.post<SerieCustom>(`${this.url}/serie_custom`,body )
	}


	consultarEstaciones(punto:{lat:number,lon:number}): Observable<any> {
        throwError('NOT IMPLEMENT')
		return this.http.post(`${this.url}/alturas_variables`, { punto })
	}
}
