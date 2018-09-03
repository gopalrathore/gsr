import { UtilityFunction } from "../../../../../utility/utility-function";

export class HeaderSection2 {
    constructor(private invoiceData: any) { }

    getCompanyDetail() {
      console.log("company Name", this.invoiceData['company_name']);
      
        let company = [{ text: UtilityFunction.splitStringWithLimit(this.invoiceData['company_name']), style: 'companyName' }];
        let companyGSTIN = { text: `GSTIN ${this.invoiceData['company_gst_id']}`, style: 'gstin' };
        return this.invoiceData['company_gst_id'] == null || this.invoiceData['company_gst_id'] == "" ? company : company.concat([companyGSTIN]);
    }

    getCompanyAddress() {
        let companyAddress = [];
            if(this.invoiceData['company_address'] !== '')
            companyAddress.push(this.invoiceData['company_address']);
            if(this.invoiceData['company_address_2'] !== '')
            companyAddress.push(this.invoiceData['company_address_2']);
            if(this.invoiceData['company_address_3'] !== '')
            companyAddress.push(this.invoiceData['company_address_3']);
            if(this.invoiceData['company_state_name'] !== '')
            companyAddress.push(this.invoiceData['company_state_name']);
            if(this.invoiceData['company_address_4'] !== '')
            companyAddress.push(this.invoiceData['company_address_4']);
        return companyAddress;
    }
}