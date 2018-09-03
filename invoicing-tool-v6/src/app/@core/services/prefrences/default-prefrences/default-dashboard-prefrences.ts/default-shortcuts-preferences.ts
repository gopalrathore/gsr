declare interface InvoiceShortcutsData{
    invoiceType:string;
    activationStatus:boolean
}

declare interface AvailableInvoiceShortcuts{
    shortcut1:InvoiceShortcutsData;
    shortcut2:InvoiceShortcutsData;
}

export class InvoiceShortcuts{
    invoiceShortcuts:AvailableInvoiceShortcuts = {
        shortcut1:{
            invoiceType:"TI",
            activationStatus:true
        },
        shortcut2:{
            invoiceType:"RI",
            activationStatus:true
        }
    }

    constructor(){
        
    }
}