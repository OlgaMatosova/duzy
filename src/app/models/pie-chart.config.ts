export class PieChartConfig {
 
    pieHole: number;
    pieSliceText: string;
    backgroundColor: string;
    colors: any[];
    legend: object ;
    pieSliceBorderColor: string;
    constructor( pieHole: number, pieSliceText: string, colors: any[]) {
   
        this.pieHole = pieHole;
        this.pieSliceText = pieSliceText;
        this.backgroundColor = 'transparent',
        this.colors = colors;
        this.legend = {
            textStyle : {
                fontSize: 22
            }
        };
        this.pieSliceBorderColor = 'none';
    }
}