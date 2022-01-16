export interface SerieCustom {
    altura:          string;
    data_estaciones: DataEstacion[];
    tipo_variable:   string;
    unidad_medida:   string;
    variable:        string;
}

export interface DataEstacion {
    contador:  number[];
    fechas:    string[];
    maximos:   number[];
    minimos:   number[];
    nombre:    string;
    promedios: number[];
}
