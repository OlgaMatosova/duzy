import {Component, OnInit, HostBinding} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {ProfileService} from './profile/service/profile.service';
import {Profile} from '../../models/profile';
import {StoresService} from './stores/service/stores.service';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    isLoggedIn: boolean = false;
    profile: Profile = new Profile();
    storesLength: number;
    @HostBinding('class.isDashboard') isAuth: boolean = true;
    constructor(
        private router: Router,
        private profileService: ProfileService,
        private storesService: StoresService,
        public dialog: MatDialog
    ) {

        this.profileService.getProfile().subscribe((resp) => {
            this.profile = resp['data']['view'];
        });

        this.storesService.getStores().subscribe((data) => {
            this.storesLength = data['data']['view']['length'];
            this.storesService.storesList.next(data['data']['view']);
            this.storesService.setShops(data['data']['view']);
        });

        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                if (event.url == '/admin/dashboard' || event.urlAfterRedirects == '/admin/dashboard') {
                    this.router.navigateByUrl('/admin/dashboard/promos');
                }
            }
        });

    }

    ngOnInit(): void {}
}