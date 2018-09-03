import { isUndefined } from "util";
import { WhiteLabelFeatures } from "../../../../dataset/dataset";

declare interface AvaliableInvoiceType{
    TI: boolean; //Tax Invoice
    RI: boolean; //Retail Invoice
    EI: boolean; //Export Invoice
    RV: boolean; //Receipt voucher RCM  
    PV: boolean; //Payment Voucher
    CN: boolean; //Credit note
    DN: boolean; //Debit Note
    DC: boolean; //Delivery Challan
    //II: boolean; //ISD Invoice
    BOS: boolean; //Bill of Supply
    RFV: boolean; //Refund voucher
    REI: boolean; //Revise Invoice
    TDC: boolean; //Trade Delivery Chalan
    PI: boolean // Purchase Invouce
    SO: boolean // Sales Order
}

export class InvoicePrefrence{

    avaliableInvoiceType: AvaliableInvoiceType = {
        TI: true, RI: true, EI: true,
        RV: true, PV: true, CN: true,
        DN: true, DC: true,
        BOS: true, RFV: true, REI: true, TDC: true, PI: true, SO:true
    }
    
    constructor(){
        this.whiteLablesettings()
    }

    public isDescriptionAllowed(invoiceType: string): boolean{
        //to be used by frontend in *ngIf
        
        if(invoiceType === undefined || invoiceType === null || this.avaliableInvoiceType[invoiceType] === undefined)
            return false;
        else 
            return this.avaliableInvoiceType[invoiceType];
    }

    public turnOnInvoice(invoiceType: string): void{
        // to be used by prefrence settings
        if(this.avaliableInvoiceType[invoiceType])
            this.avaliableInvoiceType[invoiceType] = true;
    }

    public turnOffInvoice(invoiceType: string): void{
        // to be used by prefrence settings
        if(this.avaliableInvoiceType[invoiceType])
            this.avaliableInvoiceType[invoiceType] = true;
    }

    public invoiceAvailableStatus(defaultValue:boolean=true): void{

        //to be used reset new settings 
        this.avaliableInvoiceType = {
            TI: defaultValue, RI: defaultValue, EI: defaultValue,
            RV: defaultValue, PV: defaultValue, CN: defaultValue,
            DN: defaultValue, DC: defaultValue,
            BOS: defaultValue, RFV: defaultValue, REI: defaultValue, TDC: defaultValue, PI: defaultValue, SO: defaultValue
        }

        //check if local storage has the data 
        this.invoiceAvailableCheckFromAPI()      
    }

    private invoiceAvailableCheckFromAPI(): void{
        // In-case API call fails set default values as true.
    }

    private whiteLablesettings(){
        let whiteLabelFeatures:WhiteLabelFeatures = new WhiteLabelFeatures();
        for(let inv in this.avaliableInvoiceType){
            try{
                this.avaliableInvoiceType[inv] = whiteLabelFeatures.salesInvoice.sub_section[inv].access;
            }
            catch(Error){
                console.log("error" ,inv );
            }            
        }
    }
}