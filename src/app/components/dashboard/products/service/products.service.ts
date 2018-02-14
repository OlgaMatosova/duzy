import {Injectable, ChangeDetectorRef} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import "rxjs/Rx";
import {AuthService} from '../../../auth/services/auth.service';
export interface IProducts {

}
@Injectable()
export class ProductsService {
    public productList = new Subject<any>();
    token: string;
    private BASE_URL: string = '/api/shops';
    private headers: Headers;
    constructor(private http: Http, private auth: AuthService) {
      
        let remember = localStorage.getItem('remember');
        if(remember) {
            this.token = localStorage.getItem('token');
        } else {
            this.token = this.auth.getCookie('token');
        }
        this.headers = new Headers({'Content-Type': 'application/json', 'X-Auth-Token': this.token});
    }

    setShopId(id: any): Observable<IProducts[]> {
        let url: string = `${this.BASE_URL}/${id}/items`;
        let remember = localStorage.getItem('remember');
        if(remember) {
            this.token = localStorage.getItem('token');
        } else {
            this.token = this.auth.getCookie('token');
        }
        return this.http
            .get(url, {headers: this.headers})
            .map((response: Response) => {
                let res = <IProducts[]> response.json();
                return res;
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        let details = error.json();
                return Observable.throw(details);
    }
}