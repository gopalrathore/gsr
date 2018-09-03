import { Pipe, PipeTransform } from '@angular/core';
import { TransportationMode } from '../dataset/dataset';
import { transportationMode } from '../dataset/transportation-mode/transportation-mode';

@Pipe({
  name: 'transportationMode'
})
export class TransportationModePipe implements PipeTransform {

  private transportationMode: TransportationMode = new TransportationMode();

  private data: transportationMode = this.transportationMode.getTransportationMode();

  transform(type: string): string {
    let typeInNumber: number = Number(type);
    if (this.data[typeInNumber]) return this.data[typeInNumber];
    else return ""
  }

}
