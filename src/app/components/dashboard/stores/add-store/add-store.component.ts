import {Component, OnInit, Output, EventEmitter, ViewChild, Input} from '@angular/core';
import {Store} from '../../../../models/store';
import {AuthService} from '../../../auth/services/auth.service';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
    selector: 'app-add-store',
    templateUrl: './add-store.component.html',
    styleUrls: ['./add-store.component.scss'],
    animations: [
        trigger('popOverState', [
            state('show', style({
                opacity: 1
            })),
            state('hide', style({
                opacity: 0
            })),
            transition('show => hide', animate('200ms ease-out')),
            transition('hide => show', animate('200ms ease-in'))
        ])
    ]
})
export class AddStoreComponent implements OnInit {

    store: Store = new Store();
    tip: string;
    source: any;
    selected: string = 'nameTip';
    show: any;
    @ViewChild('tabGroup') tabGroup: any;
    @ViewChild('addStoreF') addStoreF: any;
    @Output() createNewStore = new EventEmitter<any>();
    @Input() showServerError: boolean;
    @Input() showSuccess : any;
    @Input() clearForm: any;
    closeTips = false;
    private tipsText = {
        nameTip: 'Add any name to identify your store in the system',
        apiTip: 'You can generate private app credentials in the Partner dashboard or in the Shopify admin. You can also use this Storefront access token to manipulate your store using the API console without creating an app.',
    }

    constructor(private auth: AuthService) {
        this.tip = this.tipsText.nameTip;
    }

    ngOnInit() {}

    ngAfterViewInit() {
        this.source = this.tabGroup['_tabs']['_results'][this.tabGroup.selectedIndex].textLabel;
    }

    showTip(tipName:string) {
        this.tip = this.tipsText[tipName];
        this.selected = tipName;
        this.closeTips = true;
    }

    isActive(item: any) {
        return this.selected === item;
    }

    addStore() {
        this.createNewStore.emit({
            ...this.store,
            source: this.source.toLowerCase()
        });
    }

    ngOnChanges() {
        if (!this.showServerError) {
            this.showServerError = false;
            this.addStoreF.resetForm();
        }
    }

    tabChanged(tabChangeEvent: MatTabChangeEvent): void {
        this.source = tabChangeEvent.tab.textLabel;
    }

    checkValidity(storeName?:any, storeApiKey?:any, form?:any) {
        if (storeName) {

            let error = (
                storeName.invalid && (storeName.pending || storeName.touched || form.submitted)
                || storeApiKey.invalid && (storeApiKey.pending || storeApiKey.touched || form.submitted)
            ) ? 'show' : 'hide';
            if (error == 'hide') {
                if (this.showServerError) {
                    return 'show';
                }
            }
            return error;
        }
    }
}
