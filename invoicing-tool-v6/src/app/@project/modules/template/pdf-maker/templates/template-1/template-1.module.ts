import { PdfStructure } from "./pdf-structure/pdf-structure";

export class Template1{

    constructor(private invoiceData){ }

    private pdfStructure = new PdfStructure(this.invoiceData);
    
    getPdfData(pdfSetting) {
        return this.pdfStructure.getDocumentData(pdfSetting);
    }
}