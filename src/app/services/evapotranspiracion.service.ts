import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ResponseSeries } from '../models/api.interface';
import { ResponseSeriesComparacion } from '../models/api.interface';

@Injectable({
    providedIn: 'root'
})

export class EvapotranspiracionService {

    constructor(private http: HttpClient) { }

    private url: string = environment.urlAPI

    consultarSerieCustom(body: any): Observable<any> {
        return this.http.post<ResponseSeries>(`${this.url}/serie_custom`, body)
    }

    consultarSerieTemporadas(body: any): Observable<any> {
        return this.http.post<ResponseSeries>(`${this.url}/serie_temporadas`, body)
    }

    consultarSerieComparacion(body: any): Observable<any> {
        return this.http.post<ResponseSeriesComparacion>(`${this.url}/serie_comparacion`, body)
    }
}
