import { Templates } from './templates/templates';
declare interface PdfSetting {
  color: string[],
  headerImg: string,
  sign: string,
  logo: string
}

export class PdfMaker {
  constructor(private selectedTemplate){ }

  private templates = new Templates(this.selectedTemplate)

  getPdfData(pdfSetting:PdfSetting = {
    color: [],
    headerImg: null,
    sign: null,
    logo: null
  }, invoiceData?){
    return this.templates.getPdfData(pdfSetting, invoiceData);
  }
    
}