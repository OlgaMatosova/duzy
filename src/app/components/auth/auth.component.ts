import {Component, OnInit, HostBinding} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'auth-wrap',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
    constructor(private router: Router) {
          this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                if (event.url == '/admin' || event.urlAfterRedirects == '/admin') {
                    this.router.navigateByUrl('/admin/login');
                }
            }
        });
    }
    ngOnInit() {
     
    }
}


