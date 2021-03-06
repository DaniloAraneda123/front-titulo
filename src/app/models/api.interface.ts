export interface StepSerie {
    f: string
    c: number
    ma: number
    mi: number
    p: number,
    s: any
}

export interface DataEstacion {
    nombre_estacion: string
    data: StepSerie[]
}
export interface ListDataEstacion {
    nombre_estacion: string
    total_data: any
}

export interface ResponseSeries {
    variable: string
    altura: string
    unidad_medida: string
    tipo_variable: string
    tipo_agrupacion:string
    estaciones: DataEstacion[]
}

export interface ResponseSeriesComparacion {
    variable: string
    altura: string
    unidad_medida: string
    tipo_variable: string
    estaciones: ListDataEstacion[]
}

export interface RequestSerie{
	variable:string,
	altura:string,
	estaciones:string[],
	fecha_inicio:string,
	fecha_final:string,
	agrupacion:string
}