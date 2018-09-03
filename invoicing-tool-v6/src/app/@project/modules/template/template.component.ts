import { DomSanitizer } from '@angular/platform-browser';
import { PdfMaker } from './pdf-maker/pdf-maker';
import { Notification } from '../../../@core/utility-functions/utility-function';
import { CompanyServiceService } from "../../../@core/services/company-service.service";
import { SelectItem } from "primeng/components/common/selectitem";
import { Component, OnInit } from "@angular/core";
import { ColorCode } from "../../../@core/dataset/dataset";

import * as pdfmake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfmake.vfs = pdfFonts.pdfMake.vfs; 

declare var $: any;

@Component({
  selector: "app-template",
  templateUrl: "./template.component.html",
  styleUrls: ["./template.component.css"]
})
export class TemplateComponent implements OnInit {

  availableColor = [];
  selectedCar2: string = 'BMW';

  public fontPDF:number = 10;
  private pdfMaker = new PdfMaker(1);
  private headerImg:any = '';
  private sign:any = '';
  private logo: any = '';
  public materialColors: string[] = ["red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown"];
  public hex:string[] = [];

  private materialColorsWithCode = new ColorCode();

  public colorSelected:string = "";

  types: SelectItem[] = [
    {
      label: "Bold",
      value: "B"
    },
    {
      label: "Underline",
      value: "U"
    },
    {
      label: "Italic",
      value: "I"
    }
  ];

  previewImgLink = "";
  previewSignLink = "";
  

  constructor(private sanitizer:DomSanitizer, private companysServiceService: CompanyServiceService) {}

  ngOnInit() {
    this.changeColor();
    this.PDFpreview();
    for (let index = 1; index <= this.materialColors.length; index++) {  
      let key:string =  this.materialColors[index-1].replace('-','_');
      this.availableColor.push({value: this.materialColorsWithCode.data[key+'_'+('900')]['color_hex_hashed'], label:this.materialColors[index-1]});
    }

    console.log("available color",this.availableColor);
    
    
  }

  ngAfterViewInit() {
    $('[rel="tooltip"]').tooltip();
  }

  changeColor() {
    this.hex = [];
    if (this.colorSelected) {
      let selectedColor = this.colorSelected.replace(/-/g, "_");
      for (let i = 1; i < 10; i++) {
        this.hex.push(
          this.materialColorsWithCode.data[selectedColor + "_" + i * 100]
            .color_hex_hashed
        );
      }
      this.PDFpreview();
    }
  }

  fileChange(event, param) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      if (param == "upload_header") {
        this.uploadBanner(file, param);
      } else if (param == "upload_signature") {
        this.uploadSign(file, param);
      }
    }
    event.target.value = "";
  }

  uploadBanner(file, param) {
    var reader = new FileReader();
    let that = this;
    reader.onloadend = function() {
      that.headerImg = reader.result;
      that.PDFpreview();
    }
    reader.readAsDataURL(file);
    
    let formData: FormData = new FormData();
    formData.append("file", file, file.name);
    // formData.append(
    //   "company_id",
    //   this.companyServiceService.company_id.toString()
    // );

    // this.companyServiceService.uploadFile(formData, param).subscribe(
    //   resp => {
    //     if (resp.status == 1) {
    //       this.previewImgLink =
    //         this.companyServiceService.masterLink + resp.data[0].header;
    //     } else {
    //       Notification.error(resp.message);
         
    //     }
    //   },
    //   () => {
    //     Notification.error("Something went wrong, Try again!");
    //   }
    // );
  }

  uploadSign(file, param) {
    let formData: FormData = new FormData();

    var reader = new FileReader();
    let that = this;
    reader.onloadend = function() {
      that.sign = reader.result;
      that.PDFpreview();
    }
    reader.readAsDataURL(file);

    
    formData.append("file", file, file.name);
    // formData.append(
    //   "company_id",
    //   this.companyServiceService.company_id.toString()
    // );
    formData.append("under_text", "Authorized Signatory");
  }

  PDFpreview(){
    let docDefinition = this.pdfMaker.getPdfData({
      color: this.hex,
      headerImg: this.headerImg,
      sign: this.sign,
      logo: this.logo
    });
    
    // pdfmake.createPdf(docDefinition).open();
    
    const pdfDocGenerator = pdfmake.createPdf(docDefinition);
    pdfDocGenerator.getDataUrl((dataUrl) => {      
      $('#iframeContainer iframe').remove();
      const targetElement = document.querySelector('#iframeContainer');
	    const iframe = document.createElement('iframe');
	    iframe.src = dataUrl;
      targetElement.appendChild(iframe);
    });
  }
}
