import { Pipe, PipeTransform } from '@angular/core';
import { SupplyType } from '../dataset/dataset';
import { supplyType } from '../dataset/supply-type/supply-type';

@Pipe({
  name: 'supplyType'
})
export class SupplyTypePipe implements PipeTransform {

  private supplyType: SupplyType = new SupplyType();

  private data: supplyType = this.supplyType.getSupplyType();

  transform(type: string): string {
    try {
      type = type.toUpperCase();
      return this.data[type].toString();
    }
    catch (Error) {
      return "";
    }
  }

}
