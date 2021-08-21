import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Custom } from '../models/custom';
import { Mes} from '../models/mes';
import { Periodo} from '../models/periodo';
//import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';


declare var activated: boolean;
declare var customService: Custom

@Injectable({
  providedIn: 'root'
})
export class HistoricidadInputsService {

  //inputSidebarSource$: Observable<any>;

  private _inputsSidebarSourceCustom = new BehaviorSubject<Custom>(new Custom('Andacollo [Collowara]', 'temperatura_de_suelo', '-0.1m', '5', '11', '2019-10-01', '2019-11-01' ));
  inputSidebarSourceCustom$ = this._inputsSidebarSourceCustom.asObservable();

  private _inputsSidebarSourceMes = new BehaviorSubject<Mes>(new Mes('Andacollo [Collowara]', 'temperatura_de_suelo', '-0.1m', '5' ));
  inputSidebarSourceMes$ = this._inputsSidebarSourceMes.asObservable();

  private _inputsSidebarSourcePeriodo = new BehaviorSubject<Periodo>(new Periodo('Andacollo [Collowara]', 'temperatura_de_suelo', '-0.1m'));
  inputSidebarSourcePeriodo$ = this._inputsSidebarSourcePeriodo.asObservable();

  private _inputsSidebarSourceTab = new BehaviorSubject<string>("inicio ");
  inputSidebarSourceTab$ = this._inputsSidebarSourceTab.asObservable();

  private _inputsSidebarSourceCriterio = new BehaviorSubject<string>(" inicio ");
  inputSidebarSourceCriterio$ = this._inputsSidebarSourceCriterio.asObservable();

  constructor(){

    //this.inputSidebarSource$ = this._inputsSidebarSource.asObservable();
  }

  sendCustom(customService: Custom){

    console.log("Valor Enviado:", customService);
    this._inputsSidebarSourceCustom.next(customService);

  }

  sendMes(mesService: Mes){

    console.log("Valor Enviado:", mesService);
    this._inputsSidebarSourceMes.next(mesService);

  }
  sendPeriodo(periodoService: Periodo){

    console.log("Valor Enviado:", periodoService);
    this._inputsSidebarSourcePeriodo.next(periodoService);

  }

  sendCriterio(criterioService: string){

    console.log("ValorTABBBBBBBBBBBBBBBBBBBBBBBBBBB:", criterioService);

    this._inputsSidebarSourceCriterio.next(criterioService);

  }

  sendTab(tabService: string){

    console.log("Valor Enviado:", tabService);
    this._inputsSidebarSourceTab.next(tabService);

  }

  receiveCriterio():Observable<string>{

    console.log("Valor Recibiendo");
    return this.inputSidebarSourceCriterio$;
    //return this._inputsSidebarSource.asObservable();

  }

  receiveTab():Observable<string>{

    console.log("Valor Recibiendo");
    return this.inputSidebarSourceTab$;
    //return this._inputsSidebarSource.asObservable();

  }

  tabSeleccionado = '';
  criterioSeleccionado = '';

  receiveCustom():Observable<Custom>{

    console.log("Valor Recibiendo");
    return this.inputSidebarSourceCustom$;
    //return this._inputsSidebarSource.asObservable();

  }

  receiveMes():Observable<Mes>{

    console.log("Valor Recibiendo");
    return this.inputSidebarSourceMes$;
    //return this._inputsSidebarSource.asObservable();

  }

  receivePeriodo():Observable<Periodo>{

    console.log("Valor Recibiendo");
    return this.inputSidebarSourcePeriodo$;
    //return this._inputsSidebarSource.asObservable();

  }

  /*
  activated(){
    return this.activate;
  }

  setCustom(variable, altura, fecha_inicio, fecha_final, hora_inicio, hora_final){
    this.variable = variable;
    this.altura = altura;
    this.fecha_inicio = fecha_inicio;
    this.fecha_final = fecha_final;
    this.hora_inicio = hora_inicio;
    this.hora_final = hora_final;
    this.activate = true;
  }

  getCustom(){
    return ([this.variable, this.altura, this.fecha_inicio, this.fecha_final, this.hora_inicio, this.hora_final]);
  }
  */
}
