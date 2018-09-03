import { FooterSection1 } from "./footer-section-1/footer-section-1";
import { FooterSection2 } from "./footer-section-2/footer-section-2";
import { FooterSection3 } from "./footer-section-3/footer-section-3";

export class Footer {
    constructor(private invoiceData:any) { }

    private footer:any[] = [
        {
            alignment: 'justify',
            columns: [
                {
                    table: {
                        body: []
                    },
                    layout: 'noBorders'
                },
                {
                    table: {
                        body: []
                    },
                    layout: 'noBorders'
                }
            ],
            margin: [20, 20, 20, 0]
        },
        {
            alignment: 'justify',
            columns: [
                {
                    table: {
                        body: []
                    },
                    layout: 'noBorders'
                }
            ],
            margin: [20, 20, 20, 0]
        },
        {
            margin: [0,20,20,0],
			alignment: 'justify',
			columns: [
				{
				// 	text: 'gopal Lorem ipsum dolor sit amet, '
				},
				{
                    stack: [
                        {
                            
                        },
                        {
                            alignment: 'center',
                            text: 'Authorized Signatory'
                        }
                    ]
				}
			]
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
                    stack: []
                },
                {
                    stack: []
                },
            ],
            margin: [20, 0, 20, 0]
        }
    ];

    private footerSection1 = new FooterSection1(this.invoiceData);
    private footerSection2 = new FooterSection2(this.invoiceData);
    private footerSection3 = new FooterSection3(this.invoiceData);

    getFooterSection(){
        this.footer[0].columns[0].table.body = this.footerSection1.getTransportationDetails();
        this.footer[0].columns[1].table.body = this.footerSection1.getExtraCharges();
        this.footer[1].columns[0].table.body = this.footerSection2.getInvoiceTotal();
        this.footer[4].columns[0].stack = this.footerSection3.getTnC();
        this.footer[4].columns[1].stack = this.footerSection3.getDeclaration();

        if( typeof(this.invoiceData.pdfSetting.sign)=='string' && this.invoiceData.pdfSetting.sign!='' )
            this.footer[2].columns[1].stack[0] = {
                alignment: 'center',
                image: this.invoiceData.pdfSetting.sign,
                width: 100,
            }
            

        return this.footer;
    }
    
}