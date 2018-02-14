import {Injectable} from '@angular/core';
import {Resolve,Router ,  ActivatedRouteSnapshot} from '@angular/router';
import {VideoService} from '../videos/videos.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
@Injectable()
export class PromoResolve implements Resolve<any> {

    constructor(private videoService: VideoService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, ) {
       
        return this.videoService.getSingleVideo(route.params['id']).catch(error => {
                this.router.navigate(['admin/dashboard/page-404']);
                return Observable.of(null);
            });
    }
}