import { Notification } from '../../../../../@core/utility-functions/utility-function';
import { StatusCodes } from '../../../../../@core/dataset/dataset';
import { CompanyServiceService } from '../../../../../@core/services/company-service.service';
import { AsyncApiCall } from '../../../../../@core/services/async-api-call';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.css']
})
export class DeclarationComponent implements OnInit {

  public invoice_type:string = '0';

  public putCallable:boolean = true;

  public company_declaration:string ='';

  constructor(public companyServiceService:CompanyServiceService) { }

  ngOnInit() {
  }

  declarationSubmit(isValid){
    if(isValid && this.putCallable){
      this.putCallable = false;
      AsyncApiCall.put('salesInvoiceTncAndDec', {
        invoice_type: this.invoice_type,
        declaration: this.company_declaration
      }).subscribe(resp=>{
        this.putCallable = true;
        if(resp.statusCode === StatusCodes.codes.CREATED) {
          Notification.success('Declaration Changed');
        }
      });
    }else if(!this.putCallable){
      console.warn("declaratiin: waiting for api response.");
    }else {
      Notification.error("Please fill all required Fields!");
    }
  }

  getDeclaration(){
    if(this.invoice_type!='0'){
      AsyncApiCall.get('salesInvoiceTncAndDec', {invoice_type: this.invoice_type}).subscribe((resp)=>{
        if(resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION){
          this.company_declaration = resp.data[0].declaration;
        }
      });
    }    
  }

}
