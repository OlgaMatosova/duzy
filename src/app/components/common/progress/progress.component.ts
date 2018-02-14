import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

    @Input() percent: any;
    public RADIUS = 79;
    public CIRCUMFERENCE = 2 * Math.PI * this.RADIUS;
    public strokeDasharray = this.CIRCUMFERENCE;
    public strokeDashoffset = this.CIRCUMFERENCE * (1 - 0);
    public dashoffset = 0;

    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        let progress = this.percent / 100;
        let dashoffset = this.CIRCUMFERENCE * (1 - progress);
        this.strokeDashoffset = dashoffset;
        this.strokeDasharray = this.CIRCUMFERENCE;
    }
}
