import {Injectable, ChangeDetectorRef} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import "rxjs/Rx";
import {AuthService} from '../../../auth/services/auth.service';
@Injectable()
export class VideoService {
    private BASE_URL: string = '/api/videos';
    private headers: HttpHeaders;
    private headers2: HttpHeaders;
    private percent = new Subject<any>();
    public data = new Subject<any>();
    token: string;
    constructor(private http: HttpClient, private auth: AuthService) {
        let remember = localStorage.getItem('remember');

        if (remember) {
            this.token = localStorage.getItem('token');
        } else {
            this.token = this.auth.getCookie('token');
        }
        this.headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': this.token});
        this.headers2 = new HttpHeaders({'X-Auth-Token': this.token});
    }

    /* create and get new promo Id */
    createVideo(file: any): Observable<any> {
        let url: string = `${this.BASE_URL}/`;
        return this.http.post(url, '', {headers: this.headers});
    }

    /* Send media file to server */
    sendVideo(file:any, id: number): void {
        let url: string = `${this.BASE_URL}/${id}/upload`;
        let fileData = new FormData();
        fileData.append('file', file);
        const req = new HttpRequest('POST', url, fileData, {headers: this.headers2, reportProgress: true});

        this.http.request(req).subscribe(
            event => {
                if (event.type === HttpEventType.UploadProgress) {
                    const percentDone = Math.round(100 * event.loaded / event.total);
                    this.percent.next(percentDone);
                } else if (event instanceof HttpResponse) {
                    this.data.next(event.body['data']['view']);
                }
            },
            error => {
                this.data.next(error);
            }
        );
    }

    /* percents of upload*/
    getPercents(): Observable<any> {
        return this.percent.asObservable();
    }

    getSendResult(): Observable<any> {
        return this.data.asObservable();
    }

    /*get all promos*/
    getAllPromos(): Observable<any> {
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

    checkVideoStatus(id: number) {
        let remember = localStorage.getItem('remember');

        if (remember) {
            this.token = localStorage.getItem('token');
        } else {
            this.token = this.auth.getCookie('token');
        }
        let url: string = `${this.BASE_URL}/${id}/status`;
        return this.http.get(url, {headers: this.headers});
    }

    updateVideo(data: any, id: number): Observable<any> {
        let remember = localStorage.getItem('remember');

        if (remember) {
            this.token = localStorage.getItem('token');
        } else {
            this.token = this.auth.getCookie('token');
        }
        this.headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': this.token});
        let url: string = `${this.BASE_URL}/${id}/`;
        return this.http.patch(url, data, {headers: this.headers2})
    }

    updatePromoItems(id: string): Observable<any> {
        let url: string = `${this.BASE_URL}/${id}/items/reload`;
        return this.http.post(url, {headers: this.headers})
    }

    deletePromo(id:string) {
        let url: string = `${this.BASE_URL}/${id}/`;
        return this.http.delete(url, {headers: this.headers})
    }

    getSingleVideo(id: string) {
        let remember = localStorage.getItem('remember');

        if (remember) {
            this.token = localStorage.getItem('token');
        } else {
            this.token = this.auth.getCookie('token');
        }
        this.headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Auth-Token': this.token});
        let url: string = `${this.BASE_URL}/${id}/`;
        return this.http.get(url, {headers: this.headers})
    }

    publishPromo(id: number) {
        let url: string = `${this.BASE_URL}/${id}/publish`;
        return this.http.post(url, '', {headers: this.headers})
    }

}