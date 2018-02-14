import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss'],
    providers: []
})
export class ProductItemComponent implements OnInit {

    @Input() products: any;
    @Input() currency : string;
    public choosingImage = 0;
    public active: any;
    selectedProduct: any;
    
    constructor() {}

    ngOnInit() {
        this.products.map((item: any) => {
            if (!this.currency) return;
            let amount = /{{amount}}/gi; 
            this.currency = this.currency[0].replace(amount, '');
        });
    }

    chooseProduct(i: any, product: any) {
        this.choosingImage = i;
        this.selectedProduct = product;
    }

    replace() {}
}
