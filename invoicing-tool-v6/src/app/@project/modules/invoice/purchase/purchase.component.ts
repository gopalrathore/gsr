import { createTable } from '../../createTable';
import { Router } from '@angular/router';
import { TransfereService } from '../../../../@core/services/transfer.service';
import { Component, OnInit } from '@angular/core';
import { CompanyServiceService } from '../../../../@core/services/company-service.service';
import { AsyncApiCall } from '../../../../@core/services/async-api-call';
import { StatusCodes } from '../../../../@core/dataset/dataset';
import { PdfMaker } from '../../template/pdf-maker/pdf-maker';
import * as pdfmake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { HelperFunction } from '../../../../@core/utility-functions/utility-function';
pdfmake.vfs = pdfFonts.pdfMake.vfs;

declare var $:any;
declare var swal:any;

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent extends createTable implements OnInit {

  private invoices:any;
  private currentCompany:any;
  private dataId:string[] = [];

  private pdfMaker = new PdfMaker(1);

  constructor(
    protected companyServiceService:CompanyServiceService,
    protected transfereService:TransfereService,
    protected router:Router
  ) {
    super(companyServiceService, transfereService, router);
      this.dataTableSettings();
  }

  ngOnInit(){
 
  }

  ngAfterViewInit(){  
    this.drawTable();
  }

  protected dataTableSettings():void{
      this.defineHeaders([ 'S.No', 'Vendor Name', 'Invoice Number', 'Invoice Amount', 'Action' ]);
      this.dataTableMessages = {
        searchPlaceholder: "Search Invoice",
        dataSafe: "Your Invoice is safe!",
        dataNotFound: "No Invoice Added."
      };
      this.allAPIparams = {
        getTableData: "purchaseInvoice",
        deleteTableData: "purchaseInvoice",
        responseKeys :{
          primaryKey: "purchase_id",
          nameKeyIndex: 1
        }
      };

      this.dataAttributes = {
        fields: ['purchase_id','vendor_company', 'purchase_number', 'purchase_total', 'status'],
        offset: 0,
        order: [{ORDER_BY:"status", ORDER_TYPE:"ASC"},{ORDER_BY:"inserted_ts", ORDER_TYPE:"DESC"}],
        limit: 1000
      };

      this.allRoutes ={
        editRoute: ""
      };
    }
    
    tableDataManupulator(index:number, jsonData:string):string{
      let dbtn  = this.dataTableButtons;
      let dlbs  = this.dataTableLables;
      let data = JSON.parse(jsonData);

      
      let t =  [  index, 
                  data['vendor_company'],
                  data['purchase_number'],  
                  data['purchase_total'],
                  // data['status']=='1'? dbtn.pdfBtn+dbtn.deleteBtn:dlbs.disabled];
                  data['status']=='1'? dbtn.downloadPdf + dbtn.pdfBtn + dbtn.deleteBtn:dlbs.disabled];
      return JSON.stringify(t);
  }

  generatePdf(id){
    console.log("download pdf", id);

    AsyncApiCall.get('purchaseInvoice', {purchase_id: id}).subscribe(resp => {
      if(resp.statusCode == StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
        let invoiceData = resp.data[0];

        invoiceData = HelperFunction.mapPurchaseToSales({...invoiceData});
        console.log("here invoice data", invoiceData);
        
        // invoiceData.custom_fields = JSON.parse(resp.data[0].custom_fields);
        invoiceData.custom_fields = "[{\\\"label\\\":\\\"\\\",\\\"value\\\":\\\"\\\"},{\\\"label\\\":\\\"\\\",\\\"value\\\":\\\"\\\"},{\\\"label\\\":\\\"\\\",\\\"value\\\":\\\"\\\"},{\\\"label\\\":\\\"\\\",\\\"value\\\":\\\"\\\"}]";
        let documentData = this.pdfMaker.getPdfData(undefined, invoiceData);
        pdfmake.createPdf(documentData).open();
      }
    });
    

  }


}
