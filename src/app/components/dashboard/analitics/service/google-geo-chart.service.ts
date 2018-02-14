import {GoogleChartsBaseService} from './google-charts-base.service';
import {Injectable} from '@angular/core';
import {GeoChartConfig} from '../../../../models/geo-chart.config';

declare var google: any;

@Injectable()
export class GoogleGeoChartService extends GoogleChartsBaseService {

    constructor() {
        super();
    }

    public BuildGeoChart(elementId: string, data: any[], config: GeoChartConfig): void {
        var chartFunc = () => {return new google.visualization.GeoChart(document.getElementById(elementId));};
        var options = {
            backgroundColor: config.backgroundColor,
            colorAxis: config.colorAxis,
            datalessRegionColor: config.datalessRegionColor,
            defaultColor: config.defaultColor,
            legend: 'none'
        };

        this.buildChart(data, chartFunc, options);
    }
}