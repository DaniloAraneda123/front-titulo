import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexFill,
    ApexMarkers,
    ApexStroke,
    ApexTitleSubtitle,
    ApexTooltip,
    ApexXAxis,
    ApexYAxis,
} from 'ng-apexcharts';
import { SerieData } from 'src/app/models/serie.interface';
import { InfoTsComponent } from '../info-ts/info-ts.component';

export type ChartOptions = {
    series: (SerieData & { tipo: string })[];
    chart: any;
    dataLabels: ApexDataLabels;
    markers: ApexMarkers;
    title: ApexTitleSubtitle;
    fill: ApexFill;
    yaxis: ApexYAxis[];
    xaxis: ApexXAxis;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    grid: any; //ApexGrid;
    colors: any;
    toolbar: any;
};

@Component({
    selector: 'app-multigrafico',
    templateUrl: './multigrafico.component.html',
    styleUrls: ['./multigrafico.component.scss'],
})
export class MultigraficoComponent {
    multiCharts: (Partial<ChartOptions> & {
        unidad_medida: string;
        altura: string;
        variable: string;
    })[] = [];

    commonOptions: Partial<ChartOptions> = {
        dataLabels: { enabled: false },
        // stroke: { curve: "straight" },
        toolbar: { tools: { selection: false } },
        markers: { size: 2, hover: { size: 1 } },
        tooltip: {
            theme: 'dark',
            // marker:{show:true},
            custom: ({ series, seriesIndex, dataPointIndex, w }) => {
                // console.log(w.config.series[seriesIndex]);
                const interval = w.config.series[seriesIndex].data[dataPointIndex];
                const group = w.config.series[seriesIndex].group;
                let endDate = '',
                    startDate = '';

                if (group == 'mensual') {
                    endDate = interval.x.toLocaleDateString();
                    startDate = new Date(interval.x.getFullYear(), interval.x.getMonth(), 1).toLocaleDateString();
                }

                if (group == 'semanal') {
                    endDate = interval.x.toLocaleDateString();
                    startDate = new Date(
                        interval.x.getTime() - 1000 * 60 * 60 * 24 * 6
                    ).toLocaleDateString();
                }

                if (group == 'diaria') {
                    endDate = interval.x.toLocaleString();
                    startDate = new Date(interval.x.getFullYear(), interval.x.getMonth(), 1, 0, 0, 0).toLocaleString();
                }

                const instante = interval.y;
                const contado = interval.c;
                return `
					<div class="px-2 py-2">
						<h3 class="mb-1 text-center">Informacion del Intervalo</h3>
						<hr class="m-1">
						<div class="d-flex justify-content-between">
							<div>
								<b>Inicio</b>
								<h3 class="mb-0">${startDate}</h3>
							</div>
							<div>
								<b class="d-flex flex-row-reverse">Final</b>
								<h3 class="mb-0">${endDate}</h3>
							</div>
						</div>
						<hr class="m-1">
						<table class="table table-bordered table-dark mb-0" >
							<thead>
								<tr>
								<th scope="col">Instante</th>
								<th scope="col">Contador</th>
								</tr>
							</thead>
							<tbody class="text-center">
								<tr>
								<td>${instante}</td>
								<td>${contado}</td>
								</tr>
							</tbody>
						</table>
					</div>
				`;
            },
            // followCursor: false, theme: "dark", x: { show: false }, marker: { show: false }, y: { title: { formatter: function () { return ""; } } }
        },
        chart: {
            // events: {
            //     click: (e, chart, options) => {
            //         console.log(e, chart, options);
            //         // this._dialog.open();
            //     },
            // },
        },
        grid: { clipMarkers: true },
        xaxis: { type: 'datetime' },
    };

    coloresMain: string[] = ['#00E396', '#008FFB', '#546E7A', '#FF4560'];
    coloresSec: string[] = ['#00E396', '#008FFB', '#546E7A', '#FF4560'];

    dataSource: (SerieData & { unidad_medida: string; altura: string })[];

    constructor(private _dialog: MatDialog) { }

    @Input() set subSerie(subSerie: string) {
        this.subSerie = subSerie;
        this.createSeries();
    }

    @Input() set data(
        series: (SerieData & { unidad_medida: string; altura: string })[]
    ) {
        this.dataSource = series;
        this.createSeries();
    }

    createSeries() {
        let multiCharts: (Partial<ChartOptions> & {
            unidad_medida: string;
            altura: string;
            variable: string;
        })[] = [];
        let i = 0;
        for (let serie of this.dataSource) {
            const nameSerie = `${serie.name} ${serie.type}`;
            multiCharts.push({
                series: [
                    { ...serie, tipo: 'step', type: 'bar', name: `${serie.name} unico` },
                ],
                chart: {
                    id: serie.name + serie.altura,
                    group: 'social',
                    type: 'bar',
                    height: 180,
                    events: {
                        click: (e, chart, options) => {
                            const i = options.dataPointIndex;
                            this._dialog.open(InfoTsComponent,{data:options.config.series[0].data[i].s});
                        }
                    }
                },
                colors: [this.coloresMain[i]],
                yaxis: [
                    {
                        tickAmount: 1,
                        labels: { minWidth: 30 },
                        title: { text: serie.unidad_medida },
                        seriesName: `${serie.name} unico`,
                    },
                ],
                altura: serie.altura,
                unidad_medida: serie.unidad_medida,
                variable: serie.name,
            });
            i++;
        }
        this.multiCharts = multiCharts;
    }

    setSerieAcumulado(change: MatCheckboxChange, i: number) {
        if (change.checked) {
            let serie = { ...this.dataSource[i], tipo: 'acumulado', type: 'line' };
            serie.name = `${serie.name} acumulado`;
            serie.type = 'line';

            let acumulator = 0;
            const aux = [];
            for (let i = 0; i < serie.data.length; i++) {
                acumulator += Number(serie.data[i].y);
                aux.push({ x: serie.data[i].x, y: acumulator.toFixed(2) });
            }

            serie.data = aux;
            this.multiCharts[i].chart.type = 'line';
            this.multiCharts[i].series = [...this.multiCharts[i].series, serie];
            this.multiCharts[i].yaxis = [
                ...this.multiCharts[i].yaxis,
                {
                    tickAmount: 1,
                    labels: { minWidth: 30 },
                    title: { text: this.dataSource[i].unidad_medida },
                    opposite: true,
                    seriesName: serie.name,
                },
            ];
        } else {
            this.multiCharts[i].chart.type = 'bar';
            this.multiCharts[i].series = this.multiCharts[i].series.filter(
                (el) => el.tipo != 'acumulado'
            );
            this.multiCharts[i].yaxis = this.multiCharts[i].yaxis.filter(
                (el) => !el.seriesName.includes(`${this.dataSource[i].name} acumulado`)
            );
        }
    }

    setSerieNormal(change: MatCheckboxChange, i: number) {
        if (change.checked) {
            let serie = { ...this.dataSource[i], tipo: 'step', type: 'bar' };
            serie.data = serie.data.map((el) => el);
            serie.name = `${serie.name} unico`;
            this.multiCharts[i].series = [serie, ...this.multiCharts[i].series];
            this.multiCharts[i].chart.type = 'bar';
            this.multiCharts[i].yaxis = [
                {
                    tickAmount: 1,
                    labels: { minWidth: 30 },
                    title: { text: this.dataSource[i].unidad_medida },
                    seriesName: `${serie.name} unico`,
                },
                ...this.multiCharts[i].yaxis,
            ];
        } else {
            this.multiCharts[i].chart.type = 'line';
            this.multiCharts[i].series = this.multiCharts[i].series.filter(
                (el) => el.tipo != 'step'
            );
            this.multiCharts[i].yaxis = this.multiCharts[i].yaxis.filter(
                (el) => !el.seriesName.includes('unico')
            );
        }
    }
}
