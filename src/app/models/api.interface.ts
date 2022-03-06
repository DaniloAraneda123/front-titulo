export interface StepSerie {
    fecha: string
    promedio: number
    maximo: number
    minimo: number
    contador: number
}

export interface DataEstacion {
    nombre_estacion: string
    data: StepSerie []
}

export interface ResponseSeries {
    variable: string
    altura: string
    unidad_medida: string
    tipo_variable: string
    estaciones: DataEstacion[]
}

export interface RequestSerie{
	variable:string,
	altura:string,
	estaciones:string[],
	fecha_inicio:string,
	fecha_termino:string,
	agrupacion:string
}