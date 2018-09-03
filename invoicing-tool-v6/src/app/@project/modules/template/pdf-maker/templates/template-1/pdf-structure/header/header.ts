import { HeaderSection1 } from "./header-section-1/header-section-1";
import { HeaderSection2 } from "./header-section-2/header-section-2";
import { HeaderSection3 } from "./header-section-3/header-section-3";
import { HeaderSection4 } from "./header-section-4/header-section-4";

export class Header {
    private header:any = [
        {
            style: 'pdfHeader',
            table: {
                widths: ['*', 'auto', 'auto'],
                body: []
            },
            layout: {
                vLineWidth: function (i: number, node: any) { return 1; },
                hLineWidth: function (i: number, node: any) { return 0; },
                vLineColor: function (i: number, node: any) { return '#fff'; },
                paddingLeft: function (i: number, node: any) { return 10; },
                paddingRight: function (i: number, node: any) { return 10; },
                paddingTop: function (i: number, node: any) { return 10; },
                paddingBottom: function (i: number, node: any) { return 10; },
            }
        },
        {
            alignment: 'justify',
            widths: [100,'*', '*'],
            columns: [
                {
                    image: 'logo',
                    width: 100,
                    height: 100
                },
                {
                    stack: []
                },
                {
                    color: '#5f5f5f',
                    fontSize: 10,
                    stack: []
                }
            ],
            margin: [20, 20, 20, 0]
        },
        {
            table: {
                widths: ['*'],
                body: [[" "], [" "]]
            },
            layout: {
                hLineWidth: function (i: number, node: any) {
                    return (i === 0 || i === node.table.body.length) ? 0 : 1;
                },
                vLineWidth: function (i: number, node: any) {
                    return 0;
                },
                hLineColor: function (i: number, node: any) {
                    return '#b4b4b4';
                },
            }
        },
        {
            alignment: 'justify',
            columns: [

                {
                    color: '#5f5f5f',
                    stack: []
                },
                {
                    color: '#5f5f5f',
                    stack: []
                }
            ],
            margin: [20, 20, 20, 0]
        },
        {
            margin: [0, 20],
            columns: [
                { width: '*', text: '' },
                {
                    width: 'auto',
                    table: {
                        widths: [80, 90, 80],
                        body: [
                            [{ text: 'Invoice Date', style: 'invoiceContentTitle', border: [false, false, true, false], alignment: 'center' }, { text: 'Payment Terms', style: 'invoiceContentTitle', border: [false, false, true, false], alignment: 'center' }, { text: 'Due Date', style: 'invoiceContentTitle', border: [false, false, false, false], alignment: 'center' }]
                        ]
                    }
                },
                { width: '*', text: '' },
            ]
        }
    ];

    private headerSection1 = new HeaderSection1(this.invoiceData);
    private headerSection2 = new HeaderSection2(this.invoiceData);
    private headerSection3 = new HeaderSection3(this.invoiceData);
    private headerSection4 = new HeaderSection4(this.invoiceData);

    constructor(private invoiceData: any) { }

    getHeaderSection() {
        
        
        this.header[0]['table']['body'] = this.headerSection1.pdfHeader();

        if(typeof(this.invoiceData.pdfSetting.logo)=='string' && this.invoiceData.pdfSetting.logo!='') {
            this.header[1].columns[1].stack = this.headerSection2.getCompanyDetail();
            this.header[1].columns[2].stack = this.headerSection2.getCompanyAddress();
        }else {
            this.header[1].columns.shift();
            this.header[1].columns[0].stack = this.headerSection2.getCompanyDetail();
            this.header[1].columns[1].stack = this.headerSection2.getCompanyAddress();
        }
        
        

        this.header[3].columns[0].stack = this.headerSection3.getBillingAddress();
        this.header[3].columns[1].stack = this.headerSection3.getShippingAddress();

        this.header[4].columns[1].table.body[1] = this.headerSection4.getPaymentDueDate();

        return this.header;
    }
}