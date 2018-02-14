import { Component, Input, OnInit } from '@angular/core';
import { GooglePieChartService } from '../service/google-pie-chart.service';
import { PieChartConfig } from '../../../../models/pie-chart.config';

declare var google: any;


@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

    @Input() data: any[];
    @Input() config: PieChartConfig;
    @Input() elementId: string;

    constructor(private _pieChartService: GooglePieChartService) {}

    ngOnInit(): void {
        this._pieChartService.BuildPieChart(this.elementId, this.data, this.config); 
    }
}