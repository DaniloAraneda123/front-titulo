export class Mes {

  constructor(
    public estacion: string,
    public variable: string,
    public altura: string,
    public mes: any
  ){}

  convertirMes(mes:string){
    if(mes=='Enero'){ return 1;}
    if(mes=='Febrero'){ return 2;}
    if(mes=='Marzo'){ return 3;}
    if(mes=='Abril'){ return 4;}
    if(mes=='Mayo'){ return 5;}
    if(mes=='Junio'){ return 6;}
    if(mes=='Julio'){ return 7;}
    if(mes=='Agosto'){ return 8;}
    if(mes=='Septiembre'){ return 9;}
    if(mes=='Octubre'){ return 10;}
    if(mes=='Noviembre'){ return 11;}
    if(mes=='Diciembre'){ return 12;}
    else{return 0;}
  }

}
