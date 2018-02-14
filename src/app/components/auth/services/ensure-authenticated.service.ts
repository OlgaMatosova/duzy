import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRoute, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class EnsureAuthenticated implements CanActivate {
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
            return true;
        } else {
            this.router.navigateByUrl('/admin/login');
            return false;
        }
    }
}