import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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
