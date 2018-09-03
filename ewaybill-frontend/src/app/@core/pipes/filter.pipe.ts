import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(data: any, key: any, search: any): any {
    if (search === undefined) return data;

    return data.filter(item => {
      return item[key].toLowerCase().includes(search.toLowerCase());
    });
  }
}
