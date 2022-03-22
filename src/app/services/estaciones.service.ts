import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})

export class EstacionesService {

	constructor(private http: HttpClient) { }

	private _rootURL: string = environment.urlAPI

	public requestStationsNearest(body: { lat: number, lng: number }): Observable<any> {
		return this.http.post<any[]>(`${this._rootURL}/busqueda_estaciones_cercanas`, body)
	}

	public requestStationsCoastline(body: { lat: number, lng: number }): Observable<any> {
		return this.http.post<any[]>(`${this._rootURL}/busqueda_estaciones_similitud_costa`, body)
	}
	public requestStationsHeight(body: { lat: number, lng: number }): Observable<any> {
		return this.http.post<any[]>(`${this._rootURL}/busqueda_estaciones_similitud_alturas`, body)
	}
}
