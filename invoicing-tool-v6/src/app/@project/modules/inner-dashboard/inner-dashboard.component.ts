import { FirebaseServiceService } from '../../../@core/services/firebase/firebase-service.service';
import { Router } from '@angular/router';
import { CompanyServiceService } from '../../../@core/services/company-service.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

declare var $:any;

@Component({
  selector: 'app-inner-dashboard',
  templateUrl: './inner-dashboard.component.html',
  styleUrls: ['./inner-dashboard.component.css']
})
export class InnerDashboardComponent{

  public counters:any={
    salesInvoice:'0',
    purchaseInvoice:'0',
    clients:'0',
    vendors:'0'
  }
  public inventoryStatus = [];

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [], label: 'Sales'},
    {data: [], label: 'Purchases'}
  ];

  public chartClicked(e:any):void {
   //console.log(e);
 }

 public chartHovered(e:any):void {
   //console.log(e);
 }

  constructor(
    private companyServiceService:CompanyServiceService,
    private router:Router,
    private firebaseServiceService:FirebaseServiceService,
  ) { 
    // let user:object = firebaseServiceService.firebaseAuthObject.currentUser;
    // fAuth.user.subscribe(user=>{
    //   console.log("gopal sucees", user);
      
    // })
  }

  ngAfterViewInit(){
    this.getStocks();
    this.companyStats();
    this.getInventoryStatus();
  }

  companyStats(){
    this.counters.salesInvoice='0';
    this.counters.purchaseInvoice='0';
    this.counters.clients='0';
    this.counters.vendors='0';

    // this.companyServiceService.sendToAPI({},"number_of_purchase_invoices").subscribe(resp=>{
    //   if(resp.status==1)
    //   this.counters.purchaseInvoice=(resp.data[0].count_of_purchase_invoices);
    // });

    // this.companyServiceService.sendToAPI({},"number_of_sales_invoices").subscribe(resp=>{
    //   if(resp.status==1)
    //   this.counters.salesInvoice=(resp.data[0].count_of_sales_invoices);
    // });

    // this.companyServiceService.sendToAPI({},"number_of_clients").subscribe(resp=>{
    //   if(resp.status==1)
    //   this.counters.clients=(resp.data[0].count_of_clients);
    // });

    // this.companyServiceService.sendToAPI({},"number_of_vendors").subscribe(resp=>{
    //   if(resp.status==1)
    //   this.counters.vendors=(resp.data[0].count_of_vendors);
    // });
  }

  getInventoryStatus(){
    this.inventoryStatus = [];
    // this.companyServiceService.sendToAPI({count:5},"inventory_status").subscribe(resp=>{
    //   if(resp.status==1){ 
               
    //     this.inventoryStatus=(resp.data);
    //   }
       
    // });
  }

  getStocks(){
    // this.companyServiceService.sendToAPI({},"stocks").subscribe(resp=>{
    //   let data = [];
    //   let data2 = [];


    //   this.barChartData = [
    //     {data: [], label: 'Sales'},
    //     {data: [], label: 'Purchases'}
    //   ];
      
    //   resp.data = resp.data.filter((item)=>{
    //     if(item.item_type=="G")
    //       return item;
    //   });
    //   for (let i = 0; i < resp.data.length && i<5; i++) {
    //       data.push(resp.data[i]['item_sales']);
    //       data2.push(resp.data[i]['item_purchases']);
    //       if(this.barChartLabels[i]==undefined)
    //         this.barChartLabels.push(resp.data[i]['item_name']);
    //       else
    //         this.barChartLabels[i]=resp.data[i]['item_name'];
    //   }

    //   let clone = JSON.parse(JSON.stringify(this.barChartData));

    //   clone[0].data = data;
    //   clone[1].data = data2;
    //   this.barChartData = clone;
    // });
  }
}
