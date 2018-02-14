import { Component, Input, OnInit } from '@angular/core';
import { GoogleGeoChartService } from '../service/google-geo-chart.service';
import { GeoChartConfig } from '../../../../models/geo-chart.config';

declare var google: any;


@Component({
  selector: 'geo-chart',
  templateUrl: './geo-chart.component.html',
    styleUrls: ['./geo-chart.component.scss']
})
export class GeoChartComponent implements OnInit {

    @Input() data: any[];
    @Input() config: GeoChartConfig;
    @Input() elementId: string;
    range = 'No data';

    constructor(private _geoChartService: GoogleGeoChartService) {}

    ngOnInit(): void {
        this._geoChartService.BuildGeoChart(this.elementId, this.data, this.config); 
    }
}