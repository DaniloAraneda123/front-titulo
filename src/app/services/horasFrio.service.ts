import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})

export class HorasFrioService {

	constructor(private http: HttpClient) { }

	private url: string = environment.urlAPI

	consultarDatos(body: any, tipo_consulta: string): Observable<any> {
		console.log("Consultando Datos")
		return this.http.post(`${this.url}/${tipo_consulta}`,body )
	}


	consultarEstaciones(punto:{lat:number,lon:number}): Observable<any> {
        throwError('NOT IMPLEMENT')
		return this.http.post(`${this.url}/alturas_variables`, { punto })
	}
}
