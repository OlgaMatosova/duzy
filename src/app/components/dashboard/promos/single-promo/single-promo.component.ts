import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {ProductsService} from '../../products/service/products.service';
import {StoresService} from '../../stores/service/stores.service';
import {PromoService} from './service/promos.service';
import {MatDialog} from '@angular/material';
import {DialogOverview} from '../../../common/dialogOverview/dialogOverview.component';
import {VideoService} from '../videos/videos.service';
import {ISubscription} from "rxjs/Subscription";

@Component({
    selector: 'app-single-promo',
    templateUrl: './single-promo.component.html',
    styleUrls: ['./single-promo.component.scss'],
    providers: [ProductsService, PromoService, VideoService, StoresService]
})
export class SinglePromoComponent implements OnInit {
    public activeTab = 0;
    public shopsList: any[] = [];
    public scrollbarOptions = {axis: 'yx', theme: 'minimal-dark'};
    public promoItems: any[] = [];

    @Input() file: any;
    @Output() onChanged = new EventEmitter<boolean>();
    @Output() onDelete = new EventEmitter<any>();

    public percent: any = 0;
    public published = false;
    public promo = {
        _id: 0,
        title: '',
        
        preview: "/admin/images/promo-placeholder.png",
        sourceId: '',
        status: ''
    };
    
    editStatus = {};
    showProducts: any[];
    statusReady = false;
    mobileAddItem = false;
    public getLink = false;
    currency: any;
    public convertVideoMessage = false;
    pages: any[] = [];
    page = 0;
    private previewsList: any[] = [];
    private editPreview: boolean = false;
    private showUploadError: boolean = false;
    private showLabels: boolean;
    private subscription: ISubscription;
    shopError: string;
    private titleTemp: string;
    constructor(
        private storesService: StoresService,
        private productsService: ProductsService,
        private promoService: PromoService,
        public dialog: MatDialog,
        private videoService: VideoService,
    ) {

        let scope = this;
        this.storesService.getStores().subscribe((data) => {
            this.storesService.setShops(data['data']['view']);
        });

        this.storesService.getList().subscribe((shoplist) => {
            this.shopsList = shoplist;

        });
    }

    ngOnInit() {
        let scope = this;
        this.videoService.createVideo(this.file)
            .subscribe((response) => {
                let res = response;
                scope.promo._id = res['data']['view']['_id'];
                this.videoService.sendVideo(scope.file, scope.promo._id);
            },
            (error) => {
                console.log(error);
            });

        this.promo.title = this.file.name.split(".").slice(0, -1).join(".");
        this.promo['products'] = this.promoService.getData();
        this.editStatus = this.promoService.getSaveStatus();
        this.promo._id = this.file['_id'];
        this.subscription = this.videoService.getPercents().subscribe((data) => {
            if( data > 0){
                scope.percent = data - 1;
            } else {
                scope.percent = data;
            }
            if (scope.percent == 99) {
                this.videoService.getSendResult().subscribe((data) => {
                    scope.convertVideoMessage = true;
                    scope.percent = 100;
                    if (data == true) {
                        if (scope.file.type == 'image/jpeg' || scope.file.type == 'image/png') {
                            scope.convertVideoMessage = false;
                            scope.promo.preview = `${data}/480.png`;
                            scope.statusReady = true;
                            scope.promo.status = data['data']['view']['status'];
                        } else {
                            let timeoutId = setInterval(function () {
                                scope.videoService.checkVideoStatus(scope.promo._id).subscribe((data) => {
                                    let status = data['data']['view']['status'];
                                    if (status == 'success') {
                                        scope.promo.preview = data['data']['view']['thumbnails'][0];
                                        scope.previewsList = data['data']['view']['thumbnails'];
                                        clearInterval(timeoutId);
                                        scope.convertVideoMessage = false;
                                        scope.statusReady = true;
                                        scope.promo.status = 'ready';
                                    } else if (status == 'error') {
                                        scope.showUploadError = true;
                                        scope.promo.preview = "/admin/images/promo-placeholder.png",
                                            clearInterval(timeoutId);
                                    }
                                });
                            }, 10000);
                        }
                    } else {
                        console.log('error');
                    }
                });
            }
        });
    }

    getProducts(shop: any, index: number) {
        if (shop['products']) return;
        this.productsService.setShopId(shop._id).subscribe((data) => {
            this.currency = data['data']['extra']['moneyFormat'];
            shop['products'] = data['data']['view'];
        });
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(DialogOverview, {
            width: '550px',
            data: {
                header: 'DELETE ALL ITEMS FROM PROMO',
                body: 'ALL ADDED ITEMS WILL BE REMOVED FROM THIS PROMO. ARE YOU SURE?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                for (let i = this.promo['products'].length - 1; i >= 0; this.removeItem(i--));
            }
        });
    }

    editMeta() {
        let input = document.getElementById(String(this.promo['_id']));
        this.titleTemp = this.promo.title;
        input.removeAttribute('readonly');
        this.editPreview = true;
        input.focus();
    }

    closeEditMode() {
        if (this.titleTemp !== this.promo.title) {
            this.editStatus['isSaved'] = false;
        }
        this.editPreview = false;
        let input = document.getElementById(String(this.promo['_id']));
        input.setAttribute('readonly', 'readonly');
    }

    hideDragDrop(value: boolean) {
        if (!value) {
            this.mobileAddItem = false
        }
        this.onChanged.emit(value);
    }

    tabChanged(tabChangeEvent: MatTabChangeEvent): void {
        this.shopError = '';
        this.activeTab = tabChangeEvent.index;
        this.getProducts(this.shopsList[this.activeTab], this.activeTab);
        this.showLabels = false;
    }

    removeItem(i:number) {
        let id = this.promo['products'][i].id;
        let products = this.shopsList[this.activeTab]['products'];

        Object.keys(products).map(function (objectKey, index) {
            products[objectKey].every((data: any) => {
                if (data.id == id) {
                    delete data.isActive;
                    return false;
                } else {
                    return true;
                }
            });
        });
        this.promo['products'].splice(i, 1);
        this.editStatus['isSaved'] = false;
    }

    links() {
        this.getLink = !this.getLink;
    }

    save() {
        if (this.promo['products'].length > 0) {
            this.promo['sourceId'] = this.shopsList[this.activeTab]._id;
        }
        this.editPreview = false;
        let content = document.getElementById(String(this.promo._id));
        content.setAttribute('contentEditable', 'false');

        this.videoService.updateVideo(this.promo, this.promo._id).subscribe(
            data => {
                this.editStatus['isSaved'] = true;
            },
            error => {
                console.log(error);
            });
    }

    publish() {
        this.videoService.publishPromo(this.promo._id).subscribe(data => {
            this.published = true;
            this.getLink = !this.getLink;
            this.promo.status = 'active';
        });
    }

    deletePromo() {
        this.onDelete.emit(this.promo._id);
        this.editStatus['isSaved'] = false;
    }

    changePreview(value: string) {
        this.promo.preview = value;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

