import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import "rxjs/Rx";

import {AuthService} from '../../../auth/services/auth.service';

@Injectable()
export class ProfileService {
    private BASE_URL: string = '/api/profile';
    private headers: HttpHeaders;
    public profile = new Subject<any>();
    token: string;

    constructor(private http: HttpClient, private auth: AuthService) {

        let remember = localStorage.getItem('remember');
        if (remember) {
            this.token = localStorage.getItem('token');
        } else {
            this.token = this.auth.getCookie('token');
        }
        this.headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': this.token});
    }

    /*get profile*/
    getProfile(): Observable<any> {
        let remember = localStorage.getItem('remember');

        if (remember) {
            this.token = localStorage.getItem('token');
        } else {
            this.token = this.auth.getCookie('token');
        }

        this.headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': this.token});

        let url: string = `${this.BASE_URL}/`;
        return this.http.get(url, {headers: this.headers});
    }


    updateProfile(data: any): Observable<any> {
        let url: string = `${this.BASE_URL}/`;
        return this.http.patch(url, data, {headers: this.headers}).map((response: Response) => {
                return response.json();
            })
            .catch((err: Response) => {
                let details = err.json();
                return Observable.throw(details);
            });
    }


    setProfile(value: any) {
        this.profile.next(value);
    }

}