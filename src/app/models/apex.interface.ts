import {
	ApexAxisChartSeries, ApexChart, ApexFill, ApexTooltip, ApexXAxis, ApexLegend, ApexDataLabels,
	ApexTitleSubtitle, ApexYAxis, ApexPlotOptions, ApexGrid, ApexStroke, ApexMarkers
} from "ng-apexcharts";

export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	dataLabels: ApexDataLabels;
	yaxis: ApexYAxis | ApexYAxis[];
	fill: ApexFill;
	stroke: ApexStroke;
	markers: ApexMarkers;
	colors: string[];
	legend: ApexLegend;
	title: ApexTitleSubtitle;
	plotOptions: ApexPlotOptions;
	toolbar: any;
	tooltip: ApexTooltip;
	grid: any;
};