import {Injectable} from '@angular/core';
import {Promo} from '../../../../../models/promo';

@Injectable()
export class PromoService {

    private data: Promo[] = [];
    private saveStatus = {
        isSaved: true
    };

    getData() {
        return this.data;
    }

    addData(data: any) {
        this.data.unshift(new Promo(data.id, data.title, data.variants));       
    }

    removeData(i: number) {
        this.data.splice(i, 1);
    }
    
    changeSaveStatus() {
         this.saveStatus.isSaved = false;
    }

    getSaveStatus() {
        return this.saveStatus;
    }
}