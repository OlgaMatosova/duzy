import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {User} from '../../../models/user';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    private BASE_URL: string = '/api/auth';
    private headers: Headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) {}
    login(user: User): Promise<any> {
        let url: string = `${this.BASE_URL}/login`;
        return this.http.post(url, user, {headers: this.headers}).map((res: Response) => (
            res.json() //Convert response to JSON
        )).toPromise();
    }

    register(user: User): Promise<any> {
        let url: string = `${this.BASE_URL}/register`;
        return this.http.post(url, user, {headers: this.headers}).map((res: Response) => (
            res.json() //Convert response to JSON
        )).toPromise();
    }

    signOut(token: string): Promise<any> {
        this.headers = new Headers({'Content-Type': 'application/json', 'X-Auth-Token': token});
        let url: string = `${this.BASE_URL}/logout`;
        return this.http.post(url, {headers: this.headers}).map((res: Response) => (
            res.json() //Convert response to JSON
        )).toPromise();
    }


    getCookie(name: string) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));

        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    resendVerifyCode(email: User) {
        let url: string = `/api/validate/resend-registration`;
        return this.http.post(url, email, {headers: this.headers}).map((res: Response) => (
            res.json() //Convert response to JSON
        )).toPromise();
    }
    
    requestResetPass(email: User) {
        let url: string = `${this.BASE_URL}/reset-password`;
        return this.http.post(url, email, {headers: this.headers}).map((res: Response) => (
            res.json() //Convert response to JSON
        )).toPromise();
    }
    
    resetPass(code: string, password: string){
        let url: string = `/api/validate/email`;
        return this.http.post(url, {'code': code, 'password': password}, {headers: this.headers}).map((res: Response) => (
            res.json() //Convert response to JSON
        )).toPromise();
    }

    checkVerifyCode(data: any) {
        let url: string = `/api/validate/email`;
        return this.http.post(url, data, {headers: this.headers}).map((res: Response) => (
            res.json() //Convert response to JSON
        )).toPromise();
    }
}