import { Pipe, PipeTransform } from '@angular/core';
import { Unit } from '../dataset/dataset';

@Pipe({
  name: 'unit'
})
export class UnitPipe implements PipeTransform {

  private unit: Unit = new Unit();

  private data = this.unit.data;

  transform(type: any): any {
    try {
      type = type.toUpperCase();
      return this.data[type].toString();
    }
    catch (Error) {
      return "";
    }
  }

}
