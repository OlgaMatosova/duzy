import { Pipe } from '@angular/core';

// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
    name: 'showfilter',
    pure: false
})

export class ShowPipe {
    transform(value: any, param: any) {

        let perPage = param.itemsPerPage;
        let page = param.currentPage  || 0;
        let start = perPage*(page+1) - perPage;
        let end = perPage*(page+1) - 1;
    
        return value.filter((item: any, index: number) => {

            if( index >=start && index <=end  ){

                return true;
            } else {
           
                return false;
            }
        });
    }
}