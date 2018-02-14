import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
@Component({
    selector: 'dialog-overview',
    templateUrl: 'dialog-overview.component.html',
    styleUrls: ['dialog-overview.component.scss']
})
export class DialogOverview {
    public promoListText: string = '';
    public headerText: string = '';
    hideCancel: boolean = false;
    constructor( @Inject(MAT_DIALOG_DATA) public data: any) {
        if (this.data) {
            this.promoListText = this.data.body;
            this.headerText = this.data.header;

            if (this.data.buttons) {
                this.hideCancel = true;
            }
        }
    }
}