import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
    transform(value: Array<any>): Array<any> {
        if (!value) return;      
//        return Object.keys(value).map(key => ({key, value: groupedObj[key]}));
        return Object.keys(value).map(key => ({key, value: value[key]}));
    }
}