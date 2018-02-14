import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {ProfileService} from './service/profile.service';

@Injectable()
export class ProfileResolve implements Resolve<any> {

    constructor(private profileService: ProfileService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.profileService.getProfile();
    }
}