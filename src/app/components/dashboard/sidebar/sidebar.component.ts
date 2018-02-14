import {Component, OnInit, Input} from '@angular/core';
import {ProfileService} from '../profile/service/profile.service';
import {StoresService} from '../stores/service/stores.service';
@Component({
    selector: 'aside',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    openSidebar = false;

    @Input() managerName: any;
    @Input() storesLength: number;
    profileName: string;
    checked: boolean;
    storCounter = 0;
    constructor(
        private profileService: ProfileService,
        private storesService: StoresService) {}

    ngOnInit() {

        this.profileService.profile.subscribe((data) => {
            this.createName(data);
        });
        this.storesService.storesListLength.subscribe((data) => {
            this.storCounter = data;
        })
    }

    ngOnChanges() {
        this.createName(this.managerName);
        this.storCounter = this.storesLength;
    }

    createName(data = {email: '', firstName: '', lastName: ''}) {
        if (!data.email) return;
        if (!data.firstName && !data.lastName) {
            let index = data.email.lastIndexOf('@');
            this.profileName = data.email.substring(0, index);
        } else {
            if(data.firstName == null) {
                data.firstName = '';
            }
            if(data.lastName == null) {
                data.lastName = '';
            }
            this.profileName = `${data.firstName} ${data.lastName}`;
        }
    }

    changeToogle(value: boolean) {
        this.checked = value;
    }
}
