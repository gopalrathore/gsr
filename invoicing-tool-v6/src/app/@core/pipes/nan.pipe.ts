import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nan'
})
export class NanPipe implements PipeTransform {

  transform(value: any): any {
    if(isNaN(value))
      return 0.00;
    else if(typeof(value) === "string")
      return Number(value);
    else if(typeof(value) === "number")
      return value;
    else
      return 0.00;
    
  }
}
