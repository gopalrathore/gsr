import { HelperFunction } from '../../../../../../../../../@core/utility-functions/utility-function';
export class FooterSection1 {
    constructor(private invoiceData:any){ }

    getTransportationDetails(){      
        let transportDetails : any[] = [
          [{ text: 'Transportation Details', colSpan: 2, style: 'invoiceContentTitle' }, '']];

          if(this.invoiceData['transport_mode']!=='')
            transportDetails.push([{ text: 'Mode of transport', style: 'subHeading' }, `: ${this.invoiceData['transport_mode']}`]);
          if(this.invoiceData['transport_mode']!=='' && this.invoiceData['transporter_name']!=='')
            transportDetails.push([{ text: 'Name of transporter', style: 'subHeading' }, `: ${this.invoiceData['transporter_name']}`]);
          if(this.invoiceData['transport_mode']!=='' && this.invoiceData['transport_source']!=='')
            transportDetails.push([{ text: 'Source', style: 'subHeading' }, `: ${this.invoiceData['transport_source']}`]);
          if(this.invoiceData['transport_mode']!=='' && this.invoiceData['transport_destination']!=='')
            transportDetails.push([{ text: 'Destination', style: 'subHeading' }, `: ${this.invoiceData['transport_destination']}`]);
          if(this.invoiceData['transport_mode']!=='' && this.invoiceData['vehicle_number']!=='')
            transportDetails.push([{ text: 'Vehicle No.', style: 'subHeading' }, `: ${this.invoiceData['vehicle_number']}`]);
          if(this.invoiceData['transport_mode']!=='' && this.invoiceData['lr_number']!=='')
            transportDetails.push([{ text: 'LR No.', style: 'subHeading' }, `: ${this.invoiceData['lr_number']}`]);
          
          return transportDetails.length >1 ? transportDetails : [[]];
          
      }

      getExtraCharges(){
        let extraCharge : any[] = [
          [{ text: 'Extra Charges', colSpan: 2, style: 'invoiceContentTitle' }, '']
        ];
        if(this.invoiceData['freight'] !== null && HelperFunction.toNumber(this.invoiceData['freight']) !== 0)
        extraCharge.push([{ text: 'Freight', style: 'subHeading' }, `: ${this.invoiceData['freight']}`]);
        if(this.invoiceData['insurance'] !== null && HelperFunction.toNumber(this.invoiceData['insurance']) !== 0)
        extraCharge.push([{ text: 'Insurance:', style: 'subHeading' }, `: ${this.invoiceData['insurance']}`]);
        if(this.invoiceData['pack_n_frwd'] !== null && HelperFunction.toNumber(this.invoiceData['pack_n_frwd']) !== 0)
        extraCharge.push([{ text: 'Packaging and Forwarding:', style: 'subHeading' }, `: ${this.invoiceData['pack_n_frwd']}`]);
        if(this.invoiceData['ope'] !== null && HelperFunction.toNumber(this.invoiceData['ope']) !== 0)
        extraCharge.push([{ text: 'OPE', style: 'subHeading' }, `: ${this.invoiceData['ope']}`]);
        if(this.invoiceData['extra_value'] !== '' && HelperFunction.toNumber(this.invoiceData['extra_value']) !== 0)
        extraCharge.push([{ text: this.invoiceData['extra_label'], style: 'subHeading' }, `: ${this.invoiceData['extra_value']}`]);
        return extraCharge.length >1 ? extraCharge : [[]];
      }
}