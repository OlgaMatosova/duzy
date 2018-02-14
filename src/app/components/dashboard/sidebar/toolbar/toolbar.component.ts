import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
    @Input() managerName: any;
    @Output() changeToogle = new EventEmitter<any>();

    constructor(private auth: AuthService, private router: Router, ) {}

    ngOnInit() {}

    onLogout() {
        let token;
        let remember = localStorage.getItem('remember');

        if (remember) {
            localStorage.removeItem('token');
            localStorage.removeItem('remember');
            this.router.navigateByUrl('/admin/login');
        } else {
            this.deleteCookie('token');
            this.router.navigateByUrl('/admin/login');
        }
    }

    toggleSidebar(value: any) {
        this.changeToogle.emit(false);
    }

    deleteCookie(name: string) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;`;
    }
}
