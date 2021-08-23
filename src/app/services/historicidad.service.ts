import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StringDecoder } from 'string_decoder';

@Injectable({
	providedIn: 'root'
})
export class HistoricidadService {

	constructor(private http: HttpClient) { }

	private url: string = environment.urlAPI

	consultarDatos(parametros, tipo_consulta: string, estaciones: string[]): Observable<any> {
		return this.http.get(`${this.url}/${tipo_consulta}`, { params: { ...parametros, estacion: estaciones[0] } })
			.pipe(
				tap((data) => {
					console.log(data)
				})
			)
	}
}
