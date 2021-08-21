import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { CustomRegistro } from 'src/app/models/custom-registro';


declare var activated: boolean;


@Injectable({
  providedIn: 'root'
})
export class HistoricidadRegistroService {


  private _inputsSidebarRegistroCustom = new BehaviorSubject<CustomRegistro>(new CustomRegistro('Andacollo [Collowara]', 'temperatura_de_suelo', '-0.1m', 'valor_min', '10', '15', '5', '11', '2019-10-01', '2019-11-01'));
  inputSidebarRegistroCustom$ = this._inputsSidebarRegistroCustom.asObservable();

  private _inputsSidebarSourceTab = new BehaviorSubject<string>('');
  inputSidebarSourceTab$ = this._inputsSidebarSourceTab.asObservable();

  private _inputsSidebarSourceCriterio = new BehaviorSubject<string>('');
  inputSidebarSourceCriterio$ = this._inputsSidebarSourceCriterio.asObservable();


  constructor() {

    //this.inputSidebarSource$ = this._inputsSidebarSource.asObservable();
  }

  sendCustomRegistro(customService: CustomRegistro) {

    console.log("Valor Enviado:", customService);
    this._inputsSidebarRegistroCustom.next(customService);

  }

  sendCriterio(criterioService: string) {

    console.log("Valor Enviado:", criterioService);
    this._inputsSidebarSourceCriterio.next(criterioService);

  }

  sendTab(tabService: string) {

    console.log("Valor Enviado:", tabService);
    this._inputsSidebarSourceTab.next(tabService);

  }

  receiveCriterio(): Observable<string> {

    console.log("Valor Recibiendo");
    return this.inputSidebarSourceCriterio$;
    //return this._inputsSidebarSource.asObservable();

  }

  receiveTab(): Observable<string> {

    console.log("Valor Recibiendo", this.inputSidebarSourceTab$);
    return this.inputSidebarSourceTab$;
    //return this._inputsSidebarSource.asObservable();

  }




  receiveCustomRegistro(): Observable<CustomRegistro> {

    console.log("Valor Recibiendo");
    return this.inputSidebarRegistroCustom$;
    //return this._inputsSidebarSource.asObservable();

  }


}
