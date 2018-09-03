import { Pipe, PipeTransform } from '@angular/core';
import { StateList } from '../dataset/dataset';

@Pipe({
  name: 'state'
})
export class StatePipe implements PipeTransform {

  private StateList: StateList = new StateList();

  private list: any = this.StateList.state;

  transform(code: string): string {
    let codeInNumber: number = Number(code);
    if (this.list[codeInNumber]) return this.list[codeInNumber];
    else return ""
  }

}
