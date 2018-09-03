import { UtilityFunction } from "../../../../../utility/utility-function";

export class HeaderSection3 {
    constructor(private invoiceData: any) { }

    getBillingAddress() {
      console.log("client company", this.invoiceData['client_company']);
      
        let billingArray: any[] = [
            { text: 'Billing Details', style: 'invoiceContentTitle' },
            { text: UtilityFunction.splitStringWithLimit(this.invoiceData['client_company']), style: 'subHeading' },
            
        ];
        let address: any[] = [
            this.invoiceData['client_address'],
            this.invoiceData['client_address_2'],
            this.invoiceData['client_address_3'],
            this.invoiceData['client_address_4'],
            this.invoiceData['client_country']
        ];
        billingArray = billingArray.concat(address)
        return billingArray;
    }

    getShippingAddress() {
      console.log("client company shipping", this.invoiceData['client_company']);
        let shippingArray: any[] = [
            { text: 'Shipping Details', style: 'invoiceContentTitle' },
            { text: UtilityFunction.splitStringWithLimit(this.invoiceData['client_company']), style: 'subHeading' },
        ];
        let address: any[] = [
            this.invoiceData['client_shipping_address'],
            this.invoiceData['client_shipping_address_2'],
            this.invoiceData['client_shipping_address_3'],
            this.invoiceData['client_shipping_state_name'],
            this.invoiceData['client_shipping_address_4'],
        ];
        shippingArray = shippingArray.concat(address);
        
        return shippingArray;
    }

}