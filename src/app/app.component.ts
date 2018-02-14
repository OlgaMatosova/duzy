import {Component, OnInit, HostBinding} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @HostBinding('class.isAuth') isAuth: boolean;

    constructor(private router: Router) {    }
    ngOnInit() {
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                if (event.url.indexOf('dashboard') < 0 || event.urlAfterRedirects.indexOf('dashboard') < 0) {
                    this.isAuth = true;
                } else {
                      this.isAuth = false;
                }
            }
        });
    }
}
