import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { PeriodoHistogram } from 'src/app/models/periodo-histogram';
import { AnioHistogram } from 'src/app/models/anio-histogram';
import { MesHistogram } from 'src/app/models/mes-histogram';
import { CustomHistogram } from 'src/app/models/custom-histogram';

@Injectable({
  providedIn: 'root'
})

export class HistoricidadHistogramService {

  //inputSidebarSource$: Observable<any>;

  private _inputsSidebarHistogramCustom = new BehaviorSubject<CustomHistogram>(new CustomHistogram('Andacollo [Collowara]', 'temperatura_de_suelo', '-0.1m', 'valor_min', 'heladas', '15', '5', '11', '2019-10-01', '2019-11-01'));
  inputSidebarHistogramCustom$ = this._inputsSidebarHistogramCustom.asObservable();

  private _inputsSidebarHistogramMes = new BehaviorSubject<MesHistogram>(new MesHistogram('Andacollo [Collowara]', 'temperatura_de_suelo', '-0.1m', 'valor_min', 'heladas', '10', '5'));
  inputSidebarHistogramMes$ = this._inputsSidebarHistogramMes.asObservable();

  private _inputsSidebarHistogramPeriodo = new BehaviorSubject<PeriodoHistogram>(new PeriodoHistogram('Andacollo [Collowara]', 'temperatura_de_suelo', '-0.1m', 'valor_min', 'heladas', '5'));
  inputSidebarHistogramPeriodo$ = this._inputsSidebarHistogramPeriodo.asObservable();

  private _inputsSidebarHistogramAnio = new BehaviorSubject<AnioHistogram>(new AnioHistogram('Andacollo [Collowara]', 'temperatura_de_suelo', '-0.1m', 'valor_min', 'heladas', '10', '2015'));
  inputSidebarHistogramAnio$ = this._inputsSidebarHistogramAnio.asObservable();

  private _inputsSidebarSourceTab = new BehaviorSubject<string>('');
  inputSidebarSourceTab$ = this._inputsSidebarSourceTab.asObservable();

  private _inputsSidebarSourceCriterio = new BehaviorSubject<string>('');
  inputSidebarSourceCriterio$ = this._inputsSidebarSourceCriterio.asObservable();

  private _inputsSidebarSourceTipoCriterio = new BehaviorSubject<string>('');
  inputSidebarSourceTipoCriterio$ = this._inputsSidebarSourceTipoCriterio.asObservable();

  constructor() {
  }


  sendCustomHistogram(customService: CustomHistogram) {

    console.log("Valor Enviado:", customService);
    this._inputsSidebarHistogramCustom.next(customService);

  }

  sendMesHistogram(mesService: MesHistogram) {

    console.log("Valor Enviado:", mesService);
    this._inputsSidebarHistogramMes.next(mesService);

  }
  sendAnioHistogram(anioService: AnioHistogram) {

    console.log("Valor Enviado:", anioService);
    this._inputsSidebarHistogramAnio.next(anioService);

  }
  sendPeriodoHistogram(periodoService: PeriodoHistogram) {

    console.log("Valor Enviado:", periodoService);
    this._inputsSidebarHistogramPeriodo.next(periodoService);

  }

  sendCriterio(criterioService: string) {

    console.log("Valor Enviado:", criterioService);
    this._inputsSidebarSourceCriterio.next(criterioService);

  }

  sendTab(tabService: string) {

    console.log("Valor Enviado:", tabService);
    this._inputsSidebarSourceTab.next(tabService);

  }
  sendTipoCriterio(tipoCriterioService: string) {

    console.log("Valor Enviado:", tipoCriterioService);
    this._inputsSidebarSourceTipoCriterio.next(tipoCriterioService);

  }

  receiveTipoCriterio(): Observable<string> {

    console.log("Valor Recibiendo");
    return this.inputSidebarSourceTipoCriterio$;
    //return this._inputsSidebarSource.asObservable();

  }


  receiveCriterio(): Observable<string> {

    console.log("Valor Recibiendo");
    return this.inputSidebarSourceCriterio$;
    //return this._inputsSidebarSource.asObservable();

  }

  receiveTab(): Observable<string> {

    console.log("Valor Recibiendo");
    return this.inputSidebarSourceTab$;
    //return this._inputsSidebarSource.asObservable();

  }

  receiveCustomHistogram(): Observable<CustomHistogram> {

    console.log("Valor Recibiendo");
    return this.inputSidebarHistogramCustom$;
    //return this._inputsSidebarSource.asObservable();

  }

  receiveMesHistogram(): Observable<MesHistogram> {

    console.log("Valor Recibiendo");
    return this.inputSidebarHistogramMes$;
    //return this._inputsSidebarSource.asObservable();

  }

  receiveAnioHistogram(): Observable<AnioHistogram> {

    console.log("Valor Recibiendo");
    return this.inputSidebarHistogramAnio$;
    //return this._inputsSidebarSource.asObservable();

  }

  receivePeriodoHistogram(): Observable<PeriodoHistogram> {

    console.log("Valor Recibiendo");
    return this.inputSidebarHistogramPeriodo$;
    //return this._inputsSidebarSource.asObservable();

  }


}
