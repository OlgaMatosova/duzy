import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRoute} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class LoginRedirect implements CanActivate {

    constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) {}
    canActivate(): boolean {
        let token;

        let remember = localStorage.getItem('remember');

        if (remember) {
            token = localStorage.getItem('token');
        } else {
            token = this.auth.getCookie('token');
        }

        if (token) {
            this.router.navigateByUrl('/admin/dashboard/promos');
            return false;
        }
        else {
            return true;
        }
    }
}