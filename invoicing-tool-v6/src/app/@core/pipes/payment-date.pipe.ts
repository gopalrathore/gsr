import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentDate'
})
export class PaymentDatePipe implements PipeTransform {

  transform(date: any, days?: any): any {
    if(date === "") return date;
    if(!isNaN(days) && date!=undefined && days!=null && days< 10000000){
            
      var newDate = new Date(date);
      
      newDate.setDate(newDate.getDate()+Number(days));
      
      return newDate;
    }else {
      
      return date;
    }
    
  }

}
