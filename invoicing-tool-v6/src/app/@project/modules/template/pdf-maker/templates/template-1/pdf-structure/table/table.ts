import { UtilityFunction } from "../../../../utility/utility-function";

export class Table {
    private table:any = [{
        alignment: 'center',
        fontSize: 10,
        table: {
            widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            headerRows: 2,
            keepWithHeaderRows: 1,
            body:[
                [{ text: 'S.No.', style: 'tableHeader', border: [true, true, false, false] }, { text: 'item description', style: 'tableHeader', border: [true, true, false, false] }, { text: 'HSN', style: 'tableHeader', border: [true, true, false, false] }, { text: 'Qty', style: 'tableHeader', border: [true, true, false, false] }, { text: 'Unit', style: 'tableHeader', border: [true, true, false, false] }, { text: 'Rate Per Item', style: 'tableHeader', border: [true, true, false, false] }, { text: 'Total', style: 'tableHeader', border: [true, true, false, false] }, { text: 'Discount', style: 'tableHeader', border: [true, true, false, false] }, { text: 'Taxable Value', style: 'tableHeader', border: [true, true, false, false] }, { text: 'CGST', style: 'tableHeader', colSpan: 2 }, {}, { text: 'SGST', style: 'tableHeader', colSpan: 2 }, {},{ text: 'IGST', style: 'tableHeader', colSpan: 2 }, {}],
                [{ text: '', border: [true, false, true, true] }, { text: '', border: [true, false, true, true] }, { text: '', border: [true, false, true, true] }, { text: '', border: [true, false, true, true] }, { text: '', border: [true, false, true, true] }, { text: '', border: [true, false, true, true] }, { text: '', border: [true, false, true, true] }, { text: '', border: [true, false, true, true] }, { text: '', border: [true, false, true, true] }, { text: 'Rate', style: 'tableHeader' }, { text: 'Amt.', style: 'tableHeader' }, { text: 'Rate', style: 'tableHeader' }, { text: 'Amt.', style: 'tableHeader' }, { text: 'Rate', style: 'tableHeader' }, { text: 'Amt.', style: 'tableHeader' }],
                // ['1', 'Shampoo', '34011110', '10', 'gms.', '20', '200', '-', '200', '18%', '36', '-', '-'],
                // ['1', 'Shampoo', '34011110', '10', 'gms.', '20', '200', '-', '200', '18%', '36', '-', '-'],
                // ['1', 'Shampoo', '34011110', '10', 'gms.', '20', '200', '-', '200', '18%', '36', '-', '-'],
                // ['1', 'Shampoo', '34011110', '10', 'gms.', '20', '200', '-', '200', '18%', '36', '-', '-'],
                // ['1', 'Shampoo', '34011110', '10', 'gms.', '20', '200', '-', '200', '18%', '36', '-', '-'],
                // ['1', 'Shampoo', '34011110', '10', 'gms.', '20', '200', '-', '200', '18%', '36', '-', '-'],
                // ['1', 'Shampoo', '34011110', '10', 'gms.', '20', '200', '-', '200', '18%', '36', '-', '-'],
                [{ text: 'Total', style: 'tableHeader', colSpan: 6 }, '', '', '', '', '']
            ]
        }
    }]
    constructor(private invoiceData:any){ }

    getTableContent(){
       
        let isIGST : boolean = false;
        let index1 : number;
        let index2 : number;
        if(this.invoiceData['company_state_code']!=this.invoiceData['client_state_code']){
            isIGST = true;
            index1 = 9;
            index2 = 4;
            this.getTableWidth();
        }
        else {
            isIGST = false;
            index1 = 13;
            index2 = 2;
        }
        
        this.table[0].table.body[0].splice(index1, index2);
        this.table[0].table.body[1].splice(index1, index2);
       
        let total:number = 0;
        let total_taxable_value:number = 0;
        let igstTotal:number = 0;
        let sgstTotal: number = 0;
        let cgstTotal: number = 0;
        this.invoiceData.invoice_items.map((item:any, index:number)=>{
          console.log("item.item_name", item.item_name);

            let itemDetails:any[] = [index+1, UtilityFunction.splitStringWithLimit(item.item_name), item.item_hsn_code, item.item_qty, item.item_unit_display, item.item_rate, item.item_total, item.item_discount, item.item_net_value];
            
            let tax: number = this.toNumber(item.item_gross_value)-this.toNumber(item.item_net_value);
            
            if(isIGST){                
                itemDetails.push(item.item_tax_rate, (tax).toFixed(2));
                igstTotal += tax;
            }else{
                itemDetails.push(0.5*item.item_tax_rate, (tax/2).toFixed(2), 0.5*item.item_tax_rate, (tax/2).toFixed(2));
                cgstTotal += tax/2;
            } 
            
            this.table[0].table.body.splice(2+index,0,itemDetails);
            total += this.toNumber(item.item_total);
            total_taxable_value += this.toNumber(item.item_net_value);
        });
        
        sgstTotal = cgstTotal;
        this.table[0].table.body[this.invoiceData.invoice_items.length+2].push((total).toFixed(2), '-', (total_taxable_value).toFixed(2));
        (igstTotal === 0) ? this.table[0].table.body[this.invoiceData.invoice_items.length+2].push('-', (cgstTotal).toFixed(2), '-', (sgstTotal).toFixed(2)) : this.table[0].table.body[this.invoiceData.invoice_items.length+2].push('-', (igstTotal.toFixed(2)));
    }

    protected toNumber(unknownType: any):number {
        return isNaN(unknownType) ? 0 : Number(unknownType);
    }
  

    getTableWidth(){
        this.table[0].table.widths.splice(5,2);
    }

    getTable(){
        this.getTableContent();
        return this.table;
    }
    
}