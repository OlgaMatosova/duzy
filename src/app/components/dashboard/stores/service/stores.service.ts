import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import "rxjs/Rx";
import {AuthService} from '../../../auth/services/auth.service';
import {Store} from '../../../../models/store';
export interface IStores {
    _id: string;
    name: string;
    source: string;
    accessToken: string;
}

@Injectable()
export class StoresService {
    public storesList = new Subject<any>();
    public storesListLength = new Subject<any>();
    private BASE_URL: string = '/api/shops';
    private headers: Headers;
    token: string;
    constructor(private http: Http, private auth: AuthService) {

        let remember = localStorage.getItem('remember');

        if (remember) {
            this.token = localStorage.getItem('token');
        } else {
            this.token = this.auth.getCookie('token');
        }

        this.headers = new Headers({'Content-Type': 'application/json', 'X-Auth-Token': this.token});
    }

    getStores(): Observable<IStores[]> {
        let remember = localStorage.getItem('remember');

        if (remember) {
            this.token = localStorage.getItem('token');
        } else {
            this.token = this.auth.getCookie('token');
        }

        this.headers = new Headers({'Content-Type': 'application/json', 'X-Auth-Token': this.token});
        return this.http
            .get(`${this.BASE_URL}`, {headers: this.headers})
            .map((response: Response) => {
                return <IStores[]> response.json();
            })
             .catch((err: Response) => {
                let details = err.json();
                return Observable.throw(details);
            });
    }

    setShops(value: any) {
        this.storesList.next(value);
    }

    getList(): Observable<any> {
        return this.storesList.asObservable();
    }

    private handleError(error: Response) {
       
        return Observable.throw(error.statusText);
    }

    createStore(data: any): Observable<any> {
        return this.http
            .post(`${this.BASE_URL}`, data, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch((err: Response) => {
                let details = err.json();
                return Observable.throw(details);
            });
    }

    editStore(data:any, id: string): Observable<any> {
        return this.http
            .patch(`${this.BASE_URL}/${id}`, data, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch((err: Response) => {
                let details = err.json();
                return Observable.throw(details);
            });
    }

    deleteStore(id: string): Observable<any> {
        return this.http
            .delete(`${this.BASE_URL}/${id}`, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }
}