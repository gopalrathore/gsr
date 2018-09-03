

import { Header } from "./header/header";
import { Table } from "./table/table";
import { Footer } from "./footer/footer";

export class PdfStructure {

    private prepareData(){
        for(var property in this.invoiceData)
            if(this.invoiceData[property]===null) this.invoiceData[property] ='';
    }

    private dd:any = {
        pageMargins: [0, 0, 0, 0],
        content: [], 
        images: {
            headerImg: '',
            sign: '',
            logo: ''
        },
        styles: {
            pdfHeader: {
                fillColor: '#2b3c68',
                color: '#fff',
                border: [false, false, false, false],
            },
            invoiceContentTitle: {
                bold: true,
                fontSize: 12,
                color: '#000'
            },
            subHeading: {
                bold: true,
                color: '#2b2a2b'
            },
            companyName: {
                bold: true,
                fontSize: 13,
                color: '#000'
            },
            gstin: {
                color: '#b4b4b4',
                fontSize: 12,
                margin: [0, 10, 0, 0]
            },
            tableHeader: {
                bold: true,
                alignment: 'center',
                color: '#000'
            }
        },
        defaultStyle: {
            alignment: 'justify',
            color: '#444',
            columnGap: 50,
            fontStyle: 'Shrikhand'
        }

    }

    private header = new Header(this.invoiceData);
    private table = new Table(this.invoiceData);
    private footer = new Footer(this.invoiceData);

    constructor(private invoiceData) {
        this.prepareData();
    }

    getDocumentData(pdfSetting){
        this.dd.content = [
            ...this.header.getHeaderSection(),
            ...this.table.getTable(),
            ...this.footer.getFooterSection()
        ];
        this.dd.images.headerImg = pdfSetting.headerImg;
        this.dd.images.sign = pdfSetting.sign;
        this.dd.images.logo = pdfSetting.logo;

        if(typeof(pdfSetting.headerImg)=='string' && pdfSetting.headerImg!=''){
            this.dd.images.headerImg = pdfSetting.headerImg;
            this.dd.content[1] = {
                image: 'headerImg',
                height: 100
            }        
        }

        if(pdfSetting.color.length>0)
            this.dd.styles.pdfHeader.fillColor = pdfSetting.color[8];

        // console.log("invoice Data", JSON.stringify(this.dd, undefined, 2));
        

        return this.dd;
    }
}