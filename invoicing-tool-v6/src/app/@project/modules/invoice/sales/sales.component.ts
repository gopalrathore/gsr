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
pdfmake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent extends createTable implements OnInit {

  private invoices:any[];
  private currentCompany:object;
  private dataId:any[] = [];
  private invoiceType:any[] = [];

  private pdfMaker = new PdfMaker(1);

  constructor(
    public companyServiceService:CompanyServiceService,
    protected transfereService:TransfereService,
    protected router:Router
  ) {
    super(companyServiceService, transfereService, router);
    this.dataTableSettings();
  }

//   public dataTable: DataTable;

  ngOnInit(){
    
  }

  ngAfterViewInit(){
    this.drawTable(); 
  }

  dataTableSettings():void{
    this.defineHeaders([ 'S.No', 'Client Name', 'Invoice Number', 'Invoice Amount', 'Invoice Type', 'Action' ]);
    this.dataTableMessages = {
      searchPlaceholder: "Search Invoice",
      dataSafe: "Your Invoice is safe!",
      dataNotFound: "No Invoice Added."
    };
    this.allAPIparams = {
      getTableData: "salesInvoice",
      deleteTableData: "salesInvoice",
      responseKeys :{
        primaryKey: "invoice_id",
        nameKeyIndex: 1
      }
    };

    this.dataAttributes = {
      fields: ['invoice_id','client_company', 'invoice_number', 'invoice_total', 'invoice_type', 'status'],
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
                data['client_company'],
                data['invoice_number'],  
                data['invoice_total'],
                this.getInvoiceType(data['invoice_type']),
                data['status']=='1'? dbtn.downloadPdf + dbtn.pdfBtn+dbtn.deleteBtn:dlbs.disabled];
        return JSON.stringify(t);
    }

  
  getInvoiceType(type:string):string{
    switch (type) {
        case 'RI':
          return "Retail Invoice";
        case 'TI':
          return "Tax Invoice";
        case 'EI':
          return "Export Invoice";
        case 'BOS':
          return "Bill of Supply";
        case 'RV':
            return "Receipt Voucher";
        case 'RFV':
            return "Refund Voucher";
        case 'PV':
            return "Payment Voucher";
        case 'REI':
            return "Revise Invoice";
        case 'TDC':
            return "Trade Delivery Challan";
        case 'CN':
            return "Credit Note";
        case 'DN':
            return "Debit Note";
        case 'DC':
            return "Delivery Challan";
        case 'ISD':
            return "ISD Invoice";
        case 'SO':
            return "Sales Order";

      }

  }

  generatePdf(id){
    console.log("download pdf", id);

    AsyncApiCall.get('salesInvoice', {invoice_id: id}).subscribe(resp => {
      if(resp.statusCode == StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
        let invoiceData = resp.data[0];

        console.log("here invoice data", invoiceData);
        

        // console.log("gopal", JSON.stringify(invoiceData, undefined, 2));
        // invoiceData.custom_fields = JSON.parse(resp.data[0].custom_fields);
        invoiceData.custom_fields = "[{\\\"label\\\":\\\"\\\",\\\"value\\\":\\\"\\\"},{\\\"label\\\":\\\"\\\",\\\"value\\\":\\\"\\\"},{\\\"label\\\":\\\"\\\",\\\"value\\\":\\\"\\\"},{\\\"label\\\":\\\"\\\",\\\"value\\\":\\\"\\\"}]";
        let documentData = this.pdfMaker.getPdfData(undefined, invoiceData);
        
        

        pdfmake.createPdf(documentData).open();
        
        // const pdfDocGenerator = pdfmake.createPdf(documentData);
        // pdfDocGenerator.getDataUrl((dataUrl) => {
        //   console.log("dataurl",dataUrl);
        // });
      }
    });
    

  }

}
