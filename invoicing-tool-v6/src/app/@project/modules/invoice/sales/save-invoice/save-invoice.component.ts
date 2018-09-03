import { HelperFunction } from './../../../../../@core/utility-functions/functions/helper-function';
import { StatusCodes } from '../../../../../@core/dataset/status-code/codes';
import { PdfMaker } from '../../../template/pdf-maker/pdf-maker';
import { AsyncApiCall } from '../../../../../@core/services/async-api-call';
import { Router } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";
import { CompanyServiceService } from "../../../../../@core/services/company-service.service";
import * as pdfmake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfmake.vfs = pdfFonts.pdfMake.vfs;

declare var $: any;

@Component({
  selector: "app-save-invoice",
  templateUrl: "./save-invoice.component.html",
  styleUrls: ["./save-invoice.component.css"]
})
export class SaveInvoiceComponent implements OnInit {
  @Input() invoice_id: string;
  @Input() invoice_number: string;
  @Input() contact_person: any = {
            to: [],
            cc: [],
            all: []
          };
  @Input() mailData = {
            company_name: "",
            invoice_type: "other",
            change_invoice_number: ""
          };

  private pdfMaker = new PdfMaker(1);

  public mailInvoice:boolean = false;

  private mailContent: any = {};

  public mailObj:any = {
    invoice_id: this.invoice_id,
    mailTo: [],
    mailCC: [],
    mailBCC: [],
    replyTo: "",
    subject: "",
    body:
      "Hi, Thank you for your business. Your invoice can be viewed, printed and downloaded as PDF from the link below. You can also choose to pay it online."
  };

  public filteredMailMultiple: any[];

  private current_company:any;

  public link:string = "";
  private mailBtn:boolean = true;

  constructor(
    private companyServiceService: CompanyServiceService,
    private router: Router
  ) {
    this.current_company = companyServiceService.getCompany();
    this.mailObj.replyTo = this.current_company.company_email;
  }

  ngOnInit() {}

  public filterMailMultiple(event):void {
    let query = event.query;
    this.filteredMailMultiple = this.filterMail(
      query,
      this.contact_person["all"]
    );
  }

  protected filterMail(query:string, mails: any[]): any[] {
    let filtered: any[] = [];
    let addEmail = {
      name: query.toLowerCase(),
      email: query.toLowerCase()
    };

    for (let i = 0; i < mails.length; i++) {
      let mail = mails[i];

      if (
        typeof mail.email == "string" &&
        mail.email.toLowerCase().includes(query.toLowerCase())
      ) {
        filtered.push(mail);
      } else if (
        typeof mail.email == "string" &&
        mail.email.toLowerCase().indexOf(query.toLowerCase()) < 0
      ) {
        filtered.push(addEmail);
        break;
      } else {
        filtered.push(addEmail);
        break;
      }
    }

    filtered.push(addEmail);
    

    return filtered;
  }

  protected decodeHtml(html:string):string {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  protected escapeHtml(unsafe:string):string {
    return unsafe.replace(/\\n/g, "&#13;&#10;");
  }

  public trueMail():void {
    console.log("invoice type", this.mailData.invoice_type);
    
    this.mailContent = {
      TI: {
        subject:
          "Tax Invoice " +
          this.invoice_number +
          " from " +
          this.current_company.company_name,
        body:
          "Dear " +
          this.mailData.company_name +
          "\n\nThank you for your business.\nPlease find attached the PDF copy of your invoice."
      },
      PI: {
        subject:
          "Purchase Invoice " +
          this.invoice_number +
          " from " +
          this.current_company.company_name,
        body:
          "Dear " +
          this.mailData.company_name +
          "\n\nThank you for your business.\nPlease find attached the PDF copy of your invoice."
      },
      RI: {
        subject:
          "Retail Invoice " +
          this.invoice_number +
          " from " +
          this.current_company.company_name,
        body:
          "Dear " +
          (this.mailData.company_name == undefined
            ? ""
            : this.mailData.company_name) +
          "\n\nThank you for your business.\nPlease find attached the PDF copy of your invoice."
      },
      EI: {
        subject:
          "Export Invoice " +
          this.invoice_number +
          " from " +
          this.current_company.company_name,
        body:
          "Thank you for your business. Please find attached the PDF copy of your invoice. You can also view, print and download the invoice from the preview. (link)"
      },
      RV: {
        subject:
          "Receipt Voucher " +
          this.invoice_number +
          " from " +
          this.current_company.company_name,
        body:
          "Your Voucher is Raised under RCM, Thank you for your business. Please find attached the PDF copy of your voucher."
      },
      PV: {
        subject:
          "Payment Voucher " +
          this.invoice_number +
          " from " +
          this.current_company.company_name,
        body:
          "Thank you for your business. Your advanced payment has been recorded. Please find attached the PDF copy of your invoice. "
      },
      CN: {
        subject:
          "Credit Note for invoice " +
          this.invoice_number +
          " from " +
          this.current_company.company_name,
        body:
          "Dear " +
          this.mailData.company_name +
          ",\n\nThank you for your business.\nThe amount for invoice " +
          this.mailData.change_invoice_number +
          " has been altered.\nPlease find attached the PDF copy of your invoice."
      },
      DN: {
        subject:
          "Debit Note for " +
          this.invoice_number +
          " from " +
          this.current_company.company_name,
        body:
          "Dear " +
          this.mailData.company_name +
          ",\n\nThank you for your business.\nThe amount for invoice " +
          this.mailData.change_invoice_number +
          " has been altered.\nPlease find attached the PDF copy of your invoice."
      },
      DC: {
        subject:
          "Delivery Challan " +
          this.invoice_number +
          " from " +
          this.current_company.company_name,
        body:
          "Thank you for your business. Your Delivery Challan has been Issued. Please find attached the PDF copy of your Challan. "
      },
      II: {
        subject:
          "ISD Invoice " +
          this.invoice_number +
          " from " +
          this.current_company.company_name,
        body:
          "Thank you for your business. Please find attached the PDF copy of your invoice. You can also view, print and download the invoice from the preview. (link)"
      },
      BOS: {
        subject:
          "Bill of Supply " +
          this.invoice_number +
          " from " +
          this.current_company.company_name,
        body:
          "Thank you for your business. The Bill of Supply is exempt from GST. Please find attached the PDF copy of your invoice. "
      },
      RFV: {
        subject:
          "Refund voucher " +
          this.invoice_number +
          " from " +
          this.current_company.company_name,
        body:
          "Your invoice " +
          this.invoice_number +
          " has been cancelled. Please find attached the PDF copy of your cancellation notice. "
      },
      REI: {
        subject:
          "Revise Invoice " +
          this.invoice_number +
          " from " +
          this.current_company.company_name,
        body:
          "Thank you for your business. Please find attached the PDF copy of your invoice. You can also view, print and download the invoice from the preview. (link)"
      },
      TDC: {
        subject:
          "Attached Delivery Chalan " +
          this.invoice_number +
          " from " +
          this.current_company.company_name,
        body:
          "Thank you for your business. Your delivery Challan is generated, Please find attached the PDF copy of your challan ."
      },
      other: {
        subject: "",
        body: ""
      }
    };

    this.mailObj.invoice_id = this.invoice_id;
    this.mailObj.mailCC = this.contact_person["cc"];
    this.mailObj.mailTo = this.contact_person["to"];
    this.mailObj.body = this.decodeHtml(
      this.escapeHtml(this.mailContent[this.mailData["invoice_type"]]["body"])
    );
    this.mailObj.subject = this.mailContent[this.mailData["invoice_type"]][
      "subject"
    ];
  }

  protected sendMail():void {
    this.mailBtn = false;
    AsyncApiCall.customGet(this.link + this.invoice_id + "&rishav=good_boy")
      .subscribe(resp => {
        let sendMailObj = JSON.parse(JSON.stringify(this.mailObj));

        sendMailObj.path = resp.data[0].pdf_url;
        sendMailObj.path_name = "invoice_" + this.invoice_number;
        // AsyncApiCall.post()
        // this.companyServiceService
        //   .sendToAPI(sendMailObj, "mailInvoice")
        //   .subscribe(resp => {
        //     if (resp.status == 1) {
        //       this.mailBtn = true;
        //       this.mailInvoice = false;
        //       Notification.success("Mail Sent");
        //     } else {
        //       this.mailBtn = true;
        //       Notification.error("Something went wrong!");
        //     }
        //   });
      });
  }

  public close():void {
    this.mailData.invoice_type === 'PI' ? this.router.navigate(["invoice","purchase"]) : this.router.navigate(["invoice"]);
  }

  public preview():void {

    let invoiceType:string = "";
    let dataToSend:any;
    if(this.mailData.invoice_type === 'PI'){
      invoiceType = 'purchaseInvoice';
      dataToSend = {purchase_id: this.invoice_id}
    }else {
      invoiceType = 'salesInvoice';
      dataToSend = {invoice_id: this.invoice_id};
    }

    console.log("calling", invoiceType, dataToSend);
    

    AsyncApiCall.get(invoiceType, dataToSend).subscribe(resp => {
      if(resp.statusCode == StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
        let invoiceData = resp.data[0];
        
        if(invoiceType === 'purchaseInvoice'){
          invoiceData = HelperFunction.mapPurchaseToSales({...invoiceData});
        }

        console.log("here invoiceData", invoiceData);
        
        // invoiceData.custom_fields = JSON.parse(resp.data[0].custom_fields);
        // invoiceData.custom_fields = "[{\\\"label\\\":\\\"\\\",\\\"value\\\":\\\"\\\"},{\\\"label\\\":\\\"\\\",\\\"value\\\":\\\"\\\"},{\\\"label\\\":\\\"\\\",\\\"value\\\":\\\"\\\"},{\\\"label\\\":\\\"\\\",\\\"value\\\":\\\"\\\"}]";
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
