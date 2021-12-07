import {
	ApexAxisChartSeries, ApexChart, ApexFill, ApexTooltip, ApexXAxis, ApexLegend, ApexDataLabels,
	ApexTitleSubtitle, ApexYAxis, ApexPlotOptions, ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	markers: any; //ApexMarkers;a
	stroke: any; //ApexStroke;
	yaxis: ApexYAxis | ApexYAxis[];
	dataLabels: ApexDataLabels;
	title: ApexTitleSubtitle;
	legend: ApexLegend;
	fill: ApexFill;
	tooltip: ApexTooltip;
	plotOptions: ApexPlotOptions;
	colors: any;
	grid: ApexGrid;
};