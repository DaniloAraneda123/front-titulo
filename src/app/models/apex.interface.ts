import {
	ApexAxisChartSeries, ApexChart, ApexFill, ApexTooltip, ApexXAxis, ApexLegend, ApexDataLabels,
	ApexTitleSubtitle, ApexYAxis, ApexPlotOptions, ApexGrid, ApexStroke, ApexMarkers
} from "ng-apexcharts";

export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	markers: ApexMarkers;
	stroke: ApexStroke;
	yaxis: ApexYAxis[];
	dataLabels: ApexDataLabels;
	title: ApexTitleSubtitle;
	legend: ApexLegend;
	fill: ApexFill;
	tooltip: ApexTooltip;
	plotOptions: ApexPlotOptions;
	colors: any;
	grid: ApexGrid;
};