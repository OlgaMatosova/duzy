import { GoogleChartsBaseService } from './google-charts-base.service';
import { Injectable } from '@angular/core';
import { PieChartConfig } from '../../../../models/pie-chart.config';

declare var google: any;

@Injectable()
export class GooglePieChartService extends GoogleChartsBaseService {

  constructor() { super(); }

  public BuildPieChart(elementId: string, data: any[], config: PieChartConfig) : void {  
    var chartFunc = () => { return new google.visualization.PieChart(document.getElementById(elementId)); };
    var options = {
          
            pieSliceText: config.pieSliceText,
            pieHole: config.pieHole,
            colors: config.colors,
            legend: config.legend,
            backgroundColor: config.backgroundColor,
            pieSliceBorderColor: config.pieSliceBorderColor
      };

    this.buildChart(data, chartFunc, options);
  }
}