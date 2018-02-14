import {Component, OnInit, Input} from '@angular/core';
import {Location, LocationStrategy} from '@angular/common';
@Component({
    selector: 'app-promo-code',
    templateUrl: './promo-code.component.html',
    styleUrls: ['./promo-code.component.scss']
})
export class PromoCodeComponent implements OnInit {
    @Input() id: any;
    public frame: string;
    public directLink: string;
    location: LocationStrategy;
    private BASE_URL: string;
    public jscode: string;

    constructor(location: LocationStrategy) {
        this.BASE_URL = location['_platformLocation'].location.origin;
        this.jscode = `<script defer="defer" src="${this.BASE_URL}/player/static/js/duzy-player.min.js"></script>`
    }

    ngOnInit() {
        this.frame = `<div data-duzy-player-id="${this.id}"></div>`;
        this.directLink = `${this.BASE_URL}/player/promo/${this.id}`;
    }
}
