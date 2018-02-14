export class GeoChartConfig {
    backgroundColor: string;
    colorAxis: object;
    datalessRegionColor: string;
    defaultColor: string;

    constructor(backgroundColor: string, colorAxis: object, datalessRegionColor: string, defaultColor: string) {
        this.backgroundColor = backgroundColor;
        this.datalessRegionColor = datalessRegionColor;
        this.defaultColor = defaultColor;
        this.colorAxis = colorAxis;

    }
}