import {Component, OnChanges, Input} from '@angular/core';
import 'rxjs/Rx';
import {PromoService} from '../promos/single-promo/service/promos.service';
import {MalihuScrollbarService} from 'ngx-malihu-scrollbar';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    providers: [MalihuScrollbarService]
})
export class ProductsComponent implements OnChanges {
    @Input('products') products : any;
    @Input() id: any;
    @Input() shop: any;
    @Input() currency: any;
    public scrollbarOptions = {axis: 'y', theme: 'dark-thick', scrollButtons: {}};
    public productList = {};

    constructor(
        private promoService: PromoService,
        private mScrollbarService: MalihuScrollbarService) {
        if (!this.products) return;
        this.mScrollbarService.initScrollbar('.scrollable', this.scrollbarOptions);
    }

    ngOnInit() {
        if (!this.products) return;
      
        this.mScrollbarService.initScrollbar('.scrollable', this.scrollbarOptions);
    }

    ngOnChanges() {
        if (!this.products) return;
        this.productList = this.products;
        

        this.mScrollbarService.initScrollbar('.scrollable', this.scrollbarOptions);
    }

    addToPromo(item: any) {
        item['isActive'] = true;
        let productToPromo = item;
        this.promoService.addData(productToPromo);
        this.promoService.changeSaveStatus();
    }
}

