import {Component, OnChanges, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import {PageEvent, MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {PromoService} from '../../dashboard/promos/single-promo/service/promos.service';
@Component({
    selector: 'app-promo-products',
    templateUrl: './promo-products.component.html',
    styleUrls: ['./promo-products.component.scss'],
    providers: [PromoService]
})
export class PromoProductsComponent implements OnChanges {

    @Input() products: any[];
    @Input() storeProducts: any[];
    @Output() removeItem = new EventEmitter<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    pageEvent: PageEvent;
    pages: any[] = [];
    page: number = 0;
    getproducts: any[] = [];

    constructor(private matPaginatorIntl: MatPaginatorIntl) {
        this.matPaginatorIntl.nextPageLabel = '';
        this.matPaginatorIntl.previousPageLabel = '';
    }

    ngOnChanges() {
        if (!this.products) return;
        this.getproducts = this.products;
    }

    ngOnInit() {}

    getServerData(event?: PageEvent) {
        this.pageEvent = event;
        return event.pageIndex;
    }

    removePromoItem(i: number, page?: any) {

        let index;
        if (page) {
            index = (3 * page) + i;
        } else {
            index = i;
        }

        this.removeItem.emit(index);
        this.getPages();
        let pagesCount = this.products.length / 3;
        if (pagesCount <= page) {
            this.onPage(page);
        }
    }

    getPages(): number[] {
        const pages: number[] = [];
        let pagesCount = this.products.length / 3;

        for (let i = 0; i < pagesCount; i++) {
            pages.push(i + 1);
        }
        return pages;
    }

    onPage(page: any) {
        if (!this.paginator) return;
        this.paginator.pageIndex = page - 1;
        this.page = page - 1;
    }
}
