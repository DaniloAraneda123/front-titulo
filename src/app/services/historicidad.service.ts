import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';



@Injectable()
export class HistoricidadService {

  constructor(private httpclient: HttpClient){}


  getHistoricidad(): Observable<any>{
    //let params1 = new HttpParams().set('user',"2")
    
    return this.httpclient.get('http://127.0.0.1:5000/prueba');
  }

}
