import {Component, OnInit, OnDestroy, ElementRef, ChangeDetectorRef, ViewChild, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VideoService} from '../videos/videos.service';
import {StoresService} from '../../stores/service/stores.service';
import {ProductsService} from '../../products/service/products.service';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {PromoService} from '../single-promo/service/promos.service';
import {MatDialog} from '@angular/material';
import {DialogOverview} from '../../../common/dialogOverview/dialogOverview.component';
import {ISubscription} from "rxjs/Subscription";
import {PromoProductsComponent} from "../../../common/promo-products/promo-products.component";
import {
    Ng4FilesStatus,
    Ng4FilesService,
    Ng4FilesConfig,
    Ng4FilesSelected
} from '../../ng4-files';

@Component({
    selector: 'app-edit-promo',
    templateUrl: './edit-promo.component.html',
    styleUrls: ['../single-promo/single-promo.component.scss', './edit-promo.component.scss'],
    providers: [VideoService, PromoService, ProductsService, StoresService]
})
export class EditPromoComponent implements OnInit, OnDestroy {

    id: number;
    promo: any;
    public activeTab = 0;
    public shopsList: any[] = [];
    public products: any[] = [];
    private subscription: ISubscription;
    getLink: boolean;
    editStatus = {};
    published: boolean = false;
    mobileAddItem = false;
    percent: any;
    showAll = false;
    file: any;
    convertVideoMessage = false;
    previewsList :any[] = [];
    statusReady: any;
    editPreview: boolean = false;
    color = 'primary';
    mode = 'determinate';
    value = 50;
    tempTitle: string;
    showUploadError: boolean = false;
    showLabels: any;
    wrongFile: any[] = [];
    unsubStatus: any;
    shopError: string;
    currency: string;
    private titleTemp: string;
    showSuccess: boolean = false;
    @Output() onChanged = new EventEmitter<boolean>();
    @ViewChild(PromoProductsComponent) productsChild: PromoProductsComponent;

    private testConfig: Ng4FilesConfig = {
        acceptExtensions: ['png', 'mp4', 'MP4', 'flv', 'mpeg-4', 'avi', 'wmv', 'mov', 'jpg', 'jpeg'],
        maxFilesCount: 1
    };
    constructor(
        private storesService: StoresService,
        public element: ElementRef,
        private videoService: VideoService,
        private activateRoute: ActivatedRoute,
        private productsService: ProductsService,
        private promoService: PromoService,
        public dialog: MatDialog,
        private router: Router,
        private cd: ChangeDetectorRef,
        private ng4FilesService: Ng4FilesService
    ) {

        let scope = this;

        this.storesService.getList().subscribe((shoplist) => {
            this.shopsList = shoplist;
            shoplist.map((shop: any, index: number) => {
                if (scope.promo.source && (scope.promo.source.id == shop._id)) {
                    scope.activeTab = index;
                }
            });
        },
            error => {
                console.log(error);
            });
    }


    ngOnInit() {
        this.storesService.getStores().distinctUntilChanged().subscribe((data) => {
            this.storesService.setShops(data['data']['view']);
        });

        let scope = this;
        this.promo = this.activateRoute.snapshot.data['promo']['data']['view'];
        if (this.promo.products['length'] < 1) {
            this.editStatus['isSaved'] = false;
        } else {
            this.editStatus['isSaved'] = true;
        }

        if (this.promo.url) {
            this.promo.url = `${this.promo.url}/480.png?` + Math.random();
        } else {
            this.promo.url = "/admin/images/promo-placeholder.png";
            this.percent = 100;
        }

        if (this.promo.status == 'active' && this.promo.convertationStatus.status == 'success') {
            this.published = true;
            this.editStatus['isSaved'] = true;
            this.percent = 100;
            this.statusReady = true;
        }
        if (this.promo.convertationStatus.status == "in progress") {
            this.convertVideoMessage = true;
            this.percent = 100;
            this.statusReady = false;
            this.promo.url = "/admin/images/promo-placeholder.png";
        }
        if (this.promo.status == 'ready') {
            this.percent = 100;
            this.statusReady = true;
        }
        if (this.promo.status == 'error') {
            this.percent = 100;
            this.statusReady = true;
        }
        if (this.promo.status == 'draft') {
            this.statusReady = false;
        }

        if (this.promo.type == 'video' || !this.promo.type) {
            if (this.promo.convertationStatus.status == 'error') {
                this.showUploadError = true;
            }
            if (this.promo.convertationStatus.status == 'success') {
                scope.previewsList = [];
                for (let i = 0; i < this.promo.convertationStatus['thumbnails']['length']; i++) {
                    scope.previewsList.push(this.promo.convertationStatus['thumbnails'][i] + '?' + Math.random());
                }
                scope.convertVideoMessage = false;
                this.showUploadError = false;
            } else {
                this.statusReady = false;
                this.getStatus(60000);
            }
        }

        this.id = this.promo._id;
        this.ng4FilesService.addConfig(this.testConfig);
        this.videoService.getPercents().subscribe((data) => {
            this.previewsList = [];
            scope.percent = 0;
            if( data > 0){
                scope.percent = data - 1;
            } else {
                scope.percent = data;
            }
            scope.promo.url = "/admin/images/promo-placeholder.png";
            if (scope.percent == 99) {

                scope.subscription = this.videoService.getSendResult().subscribe((data) => {
                    if (data.statusText == "Unknown Error") {
                        this.promoDeletedMessage();
                        return;
                    }
                    scope.convertVideoMessage = true;
                    scope.percent = 100;
                    this.statusReady = false;
                    if (scope.file.type == 'image/jpg' || scope.file.type == 'image/png' || scope.file.type == 'image/jpeg') {
                        scope.promo.url = `${data}/480.png?` + Math.random();
                        scope.statusReady = true;
                    } else {
                        scope.getStatus(6000);
                    }
                }, error => {
                    console.log(error);
                });
            }
        });
    }

    tabChanged(tabChangeEvent: MatTabChangeEvent): void {
        this.shopError = '';
        this.activeTab = tabChangeEvent.index;
        this.getProducts(this.shopsList[this.activeTab], this.activeTab);
        this.showLabels = false;
    }

    getProducts(shop: any, index: number) {

        let scope = this;
        if (shop['products']) return;
        scope.productsService.setShopId(shop._id).subscribe((data) => {
            shop['products'] = data['data']['view'];
            scope.currency = data['data']['extra']['moneyFormat'];
            if (index == scope.activeTab) {
                for (let i = 0; i <= scope.promo.products.length - 1; i++) {
                    let id = scope.promo.products[i].id;

                    let products = shop['products'];
                    Object.keys(products).map(function (objectKey, index) {
                        products[objectKey].every((data: any) => {
                            if (data.id == id) {
                                data.isActive = true;
                                scope.promoService.addData(data);
                                return false;
                            } else {
                                return true;
                            }
                        });
                    });
                }

                scope.promo.products = scope.promoService.getData();
                scope.editStatus = scope.promoService.getSaveStatus();
                scope.showAll = true;
            }
        },
            (errors) => {
                scope.shopError = errors['errors']['main'];
            });
    }

    editMeta() {
        let input = document.getElementById(String(this.id));
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
        let input = document.getElementById(String(this.id));
        input.setAttribute('readonly', 'readonly');

    }

    getStatus(time: number) {

        let scope = this;
        let timeoutId = setInterval(function () {
            scope.subscription = scope.videoService.checkVideoStatus(scope.promo._id).subscribe((data) => {
                let status = data['data']['view']['status'];
                if (status == 'success') {
                    scope.previewsList = [];
                    scope.promo.title = scope.tempTitle;
                    scope.promo.url = data['data']['view']['thumbnails'][0] + '?' + Math.random();
                    for (let i = 0; i < data['data']['view']['thumbnails']['length']; i++) {
                        scope.previewsList.push(data['data']['view']['thumbnails'][i] + '?' + Math.random());
                    }
                    clearInterval(timeoutId);
                    scope.convertVideoMessage = false;
                    scope.statusReady = true;
                    scope.showUploadError = false;
                } else if (status == 'error') {
                    scope.showUploadError = true;
                }
            });
        }, time);
    }

    changePreview(value: string) {
        this.promo.url = value;
    }

    filesSelect(selectedFiles: Ng4FilesSelected): void {
        let dialogRef = this.dialog.open(DialogOverview, {
            width: '550px',
            data: {
                header: 'REPLACE VIDEO OR IMAGE',
                body: 'Are you sure you want to replace video/image in this promo?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.wrongFile = [];
                for (let i = 0; i < selectedFiles.files.length; i++) {
                    this.file = selectedFiles.files[i];

                    if (this.file['status'] == 4) {
                        this.wrongFile.push(this.file);
                    } else {
                        this.percent = 0;
                        this.promo.url = '';
                        this.tempTitle = this.file.name.split(".").slice(0, -1).join(".");
                        this.videoService.sendVideo(this.file, this.id);
                    }
                }
            }
        });

    }

    links() {
        this.getLink = !this.getLink;
    }

    save() {
        if (this.promo.products.length > 0) {
            this.promo['sourceId'] = this.shopsList[this.activeTab]._id;
        }
        this.editPreview = false;
        let content = document.getElementById(String(this.id));
        content.setAttribute('contentEditable', 'false');

        this.videoService.updateVideo(this.promo, this.promo._id).subscribe(
            data => {
                this.editStatus['isSaved'] = true;
                this.showSuccess = true;

                setTimeout(() => {
                    this.showSuccess = false;
                }, 2000);
            },
            error => {
                if (error.status = 404) {
                    this.promoDeletedMessage();
                }
            });
    }

    removeItem(i: number) {
        let id = this.promo.products[i].id;
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
        this.promo.products.splice(i, 1);
        this.editStatus['isSaved'] = false;
    }

    publish() {
        this.getLink = !this.getLink;
        this.videoService.publishPromo(this.promo._id).subscribe(
            data => {
                this.published = true;
                this.promo.status = 'active';
            },
            error => {
                if (error.status = 404) {
                    this.promoDeletedMessage();
                }
            });
    }

    deletePromo() {
        let scope = this;
        let dialogRef = this.dialog.open(DialogOverview, {
            width: '550px',
            data: {
                header: 'Delete promo',
                body: 'This promo with all items will be deleted and become unavailable in all online resources. Are you sure?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                scope.videoService.deletePromo(this.promo._id).subscribe(data => {
                    this.router.navigateByUrl('/admin/dashboard/promos');
                });
            }
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
                for (let i = this.promo.products.length - 1; i >= 0; this.removeItem(i--));
                this.productsChild.page = 0;
            }
        });
    }

    hideDragDrop(value: boolean) {
        this.onChanged.emit(value);
    }

    promoDeletedMessage() {
        let dialogRef = this.dialog.open(DialogOverview, {
            width: '550px',
            data: {
                header: 'Deleted promo',
                body: 'The promo was deleted',
                buttons: 'one'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.router.navigateByUrl('/admin/dashboard/promos');
            }
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}



