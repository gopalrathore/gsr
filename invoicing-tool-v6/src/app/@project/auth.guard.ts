
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyServiceService } from '../@core/services/company-service.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private auth:any;
  private accessLevel="admin_access";
  private controller = {};
  private navigation = {};
  constructor(private router:Router,private companyServiceService:CompanyServiceService){

    this.navigation['/inner-dashboard'] = '/inner-dashboard';
    this.navigation['/business-parties/vendors'] = '/business-parties/vendors';
    this.navigation['/business-parties/vendors/edit-vendor'] = '/business-parties/vendors';
    this.navigation['/business-parties/vendors/add-vendor'] = '/business-parties/vendors';

    this.navigation['/business-parties/clients'] ='/business-parties/clients';
    this.navigation['/business-parties/clients/edit-client'] = '/business-parties/clients';
    this.navigation['/business-parties/clients/add-client'] = '/business-parties/clients';

    this.navigation['/inventory'] ='/inventory';
    this.navigation['/inventory/add'] ='/inventory';
    this.navigation['/inventory/edit'] ='/inventory';

    this.navigation['/vouchers/reciept'] ='/vouchers/reciept';
    this.navigation['/vouchers/reciept/add'] ='/vouchers/reciept';
    this.navigation['/vouchers/reciept/edit'] ='/vouchers/reciept';

    this.navigation['/vouchers/payment'] ='/vouchers/payment';
    this.navigation['/vouchers/payment/add'] ='/vouchers/payment';
    this.navigation['/vouchers/payment/edit'] ='/vouchers/payment';

    this.navigation['/invoice/sales'] ='/invoice/sales';
    this.navigation['/invoice/sales/tax-invoice'] ='/invoice/sales';
    this.navigation['/invoice/sales/retail-invoice'] ='/invoice/sales';
    this.navigation['/invoice/sales/credit-note'] ='/invoice/sales';
    this.navigation['/invoice/sales/debit-note'] ='/invoice/sales';
    this.navigation['/invoice/sales/export-invoice'] ='/invoice/sales';
    this.navigation['/invoice/sales/bill-of-supply'] ='/invoice/sales';
    this.navigation['/invoice/sales/receipt-voucher'] ='/invoice/sales';
    this.navigation['/invoice/sales/refund-voucher'] ='/invoice/sales';
    this.navigation['/invoice/sales/payment-voucher'] ='/invoice/sales';
    this.navigation['/invoice/sales/revise-invoice'] ='/invoice/sales';
    this.navigation['/invoice/sales/delivery-challan'] ='/invoice/sales';

    this.navigation['/invoice/purchase'] ='/invoice/purchase';
    this.navigation['/invoice/purchase/purchase-invoice'] ='/invoice/purchase';

    this.navigation['/bank'] ='/bank';
    this.navigation['/bank/add-bank'] ='/bank';

    this.navigation['/expenses'] ='/expenses';
    this.navigation['/expenses/add-expenses'] ='/expenses';

    this.navigation['/employee'] ='/employee';
    this.navigation['/employee/add-employee'] ='/employee';

    // this.navigation['/inventory'] =read;
    // this.navigation['/inventory/edit'] = edit;
    // this.navigation['/inventory/add'] = write;
  }

  setAccessStatus(){
    this.controller['/inner-dashboard']=1;
    this.auth = this.companyServiceService.auth;
    
    
    for(let i=0;i<this.auth.length;i++){
      let feature = this.auth[i].feature;
      let read = this.auth[i][this.accessLevel].slice(0,1);
      let edit = this.auth[i][this.accessLevel].slice(1,2);
      let write = this.auth[i][this.accessLevel].slice(2,3);

      if(feature=="Vendors"){
        this.controller['/business-parties/vendors'] = read;
        this.controller['/business-parties/vendors/edit-vendor'] = edit;
        this.controller['/business-parties/vendors/add-vendor'] = write;
      }
      else if(feature=="Clients"){
        this.controller['/business-parties/clients'] = read;
        this.controller['/business-parties/clients/edit-client'] = edit;
        this.controller['/business-parties/clients/add-client'] = write;
      }
      else if (feature=="Inventory"){
        this.controller['/inventory'] =read;
        this.controller['/inventory/edit'] = edit;
        this.controller['/inventory/add'] = write;
      }
      else if (feature=="Bank"){
        this.controller['/bank'] = read;
        this.controller['/bank/add-bank'] = edit;
        this.controller['/bank/edit-bank'] = write;
      }
      else if(feature=="Settings"){
        this.controller['/settings'] = edit;
        // this.controller['/bank/add-bank'] = edit;
        // this.controller['/bank/edit-bank'] = write;        
      }
     
    
      // else if (feature=="Reports"){
      //   this.controller['/bank'] = read;
      //   this.controller['/bank/add-bank'] = write;
      //   this.controller['/bank/edit-bank'] = edit;
      // }
      else if (feature=="salesInvoice"){
        this.controller['/invoice/sales'] =read;
        this.controller['/invoice/sales/tax-invoice'] = write;
        this.controller['/invoice/sales/retail-invoice'] = write;
        this.controller['/invoice/sales/bill-of-supply'] = write;
        this.controller['/invoice/sales/receipt-voucher'] = write;
        this.controller['/invoice/sales/refund-voucher'] = write;
        this.controller['/invoice/sales/payment-voucher'] = write;
        this.controller['/invoice/sales/credit-note'] = write;
        this.controller['/invoice/sales/debit-note'] = write;
        this.controller['/invoice/sales/delivery-challan'] = write;
        this.controller['/invoice/sales/trade-delivery-challan'] = write;
      }
      else if (feature=="purchaseInvoice"){
        this.controller['/invoice/purchase'] = read;
        this.controller['/invoice/purchase/purchase-invoice'] = write;
      }
      
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.setAccessStatus();
      return true;
      // if(this.controller[state.url]==1){
      //   return true;
      // }
      // else{
      //   if(this.navigation[state.url]==undefined){
          
      //     this.router.navigateByUrl('/inner-dashboard');
      //     return false;
      //   }
      //   this.controller[this.navigation[state.url]]=1;
      //   this.router.navigateByUrl(this.navigation[state.url]);
      //   return false;
      // }

  }
}
