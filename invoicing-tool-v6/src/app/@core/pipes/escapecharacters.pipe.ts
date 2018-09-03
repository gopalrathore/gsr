import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'escapecharacters'
})
export class EscapecharactersPipe implements PipeTransform {

  transform(value: string): string {
    if(value === undefined)
      return "";
    else
      return value.replace(/\\n/g, '<br>');
  }

}
