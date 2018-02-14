import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedComponentModule} from '../../shared/sharedComponent.module';
import { AnaliticsComponent } from './analitics.component';
import { GooglePieChartService } from './service/google-pie-chart.service';
import { GoogleGeoChartService } from './service/google-geo-chart.service';
import { GoogleChartsBaseService } from './service/google-charts-base.service';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { GeoChartComponent } from './geo-chart/geo-chart.component';
import { GeoRangeComponent } from './geo-range/geo-range.component';
import { TopCountriesComponent } from './top-countries/top-countries.component';

@NgModule({
    declarations: [
        AnaliticsComponent,
        PieChartComponent,
        GeoChartComponent,
        GeoRangeComponent,
        TopCountriesComponent
    ],
    imports: [
        CommonModule,
        SharedComponentModule,
    ],
    providers: [GoogleGeoChartService, GooglePieChartService, GoogleChartsBaseService]
})
export class AnaliticsModule {}