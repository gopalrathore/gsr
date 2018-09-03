import { Pipe, PipeTransform } from '@angular/core';
import { SubSupplyType } from '../dataset/dataset';
import { subSupplyType } from '../dataset/sub-suppy-type/sub-supply-type';

@Pipe({
  name: 'subSupplyType'
})
export class SubSupplyTypePipe implements PipeTransform {

  private subSupplyType: SubSupplyType = new SubSupplyType();

  private data: subSupplyType = this.subSupplyType.getSubSupplyType();

  transform(type: string): string {
    let typeInNumber: number = Number(type);
    if (this.data[typeInNumber]) return this.data[typeInNumber];
    else return "";
  }

}
