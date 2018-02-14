import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {StoresService} from './service/stores.service';

@Injectable()
export class StoresResolve implements Resolve<any> {

    constructor(private storesService: StoresService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.storesService.getStores();
    }
}