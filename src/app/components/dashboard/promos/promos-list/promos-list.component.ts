import {Component, OnInit} from '@angular/core';
import {VideoService} from '../videos/videos.service';
import {DialogOverview} from '../../../common/dialogOverview/dialogOverview.component';
import {Router, ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {StoresService} from '../../stores/service/stores.service';

@Component({
    selector: 'app-promos-list',
    templateUrl: './promos-list.component.html',
    styleUrls: ['./promos-list.component.scss'],
    providers: [VideoService],
    
})
export class PromosListComponent implements OnInit {
    promoList: any[] = [];
    sum = 12;
    throttle = 100;
    scrollDistance = 1;
    direction = '';
    promos: any[] = [];
    storCounter = 1;
    promosStep = 1;
    ngOnInit() {}
    constructor(
        private videoService: VideoService,
        private storesService: StoresService,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) {
        this.videoService.getAllPromos().subscribe(data => {
            this.promos = data.data.view.reverse();
            this.appendItems(0, this.sum);
            this.promosStep = this.promoList.length;
        });
        this.storesService.getStores().subscribe((data) => {
            this.storCounter = data['data']['view']['length'];
        });
    }

    ngAfterContentInit() {
        this.storesService.storesList.subscribe(data => {
            this.storCounter = data['length'];
        });
    }

    addItems(startIndex: number, endIndex: number, _method: any) {
        for (let i = startIndex; i < this.sum; ++i) {
            if (!this.promos[i]) return;
            if (!this.promos[i].url) {
                this.promos[i].url = '/admin/images/promo-placeholder-small.png'
            } else {
                this.promos[i].url += '/480.png?' + Math.random();
            }
            this.promoList.push(this.promos[i]);
        }
    }

    deleteItem(id: any, i: number) {
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
                scope.videoService.deletePromo(id).subscribe(data => {
                    scope.promoList.splice(i, 1);
                });
            }
        });
    }

    goEdit(item: any) {
        this.router.navigate(
            ['/edit', item._id]
        );
    }

    appendItems(startIndex: number, endIndex: number) {
        this.addItems(startIndex, endIndex, 'push');
    }

    onScrollDown(ev: any) {
        if (this.sum < this.promos.length - 1) {
            // add another 12 items
            const start = this.sum;
            this.sum += 12;
            this.appendItems(start, this.sum);
            this.direction = 'down'
        }
    }
}
