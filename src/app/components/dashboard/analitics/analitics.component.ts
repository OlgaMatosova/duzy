import {Component, OnInit} from '@angular/core';
import {PieChartConfig} from '../../../models/pie-chart.config';
import {GeoChartConfig} from '../../../models/geo-chart.config';
@Component({
    selector: 'app-analitics',
    templateUrl: './analitics.component.html',
    styleUrls: ['./analitics.component.scss']
})
export class AnaliticsComponent implements OnInit {

    data1: any[];
    config1: PieChartConfig;
    elementId1: string;
    data2: any[];
    config2: GeoChartConfig;
    elementId2: string;

    constructor() {}

    ngOnInit() {
        //Piechart1 Data & Config
        this.data1 = [
            ['Device', 'Percents'],
            ['Desktop ' + 52.4, 52.4],
            ['Tablet', 16.4],
            ['Mobile', 31.2]];

        this.config1 = new PieChartConfig(0.7, 'none', ['#00fff9', '#447e97', '#49bdca']);
        this.elementId1 = 'PieChart1';

        //Piechart2 Data & Config
        this.data2 = [
            ['Country', 'Views'],
            ['United States', 800],
            ['Canada', 1854],
            ['RU', 1114],
            ['Ukraine', 876],
            ['Burkina Faso', 12],
            ['France', 300],
            ['India', 3],
            ['Brazil', 40000],
        ]

        this.config2 = new GeoChartConfig(
            'transparent',
            {
                minValue: 0,
                values: [0, 10, 100, 1000, 5000],
                colors: ['#264452', '#447e97', '#49bdca', '#00cfca', '#00fff9']
            },
            '#264452',
            '#ff0000');
        this.elementId2 = 'GeoChart2';
    }


}
