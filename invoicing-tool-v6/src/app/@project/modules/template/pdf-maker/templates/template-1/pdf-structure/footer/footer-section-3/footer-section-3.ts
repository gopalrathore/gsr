export class FooterSection3 {
  constructor(private invoiceData: any) { }

  getTnC() {
    console.log("tnc", this.invoiceData['tnc']);
    
    let tnc = [{ text: 'Terms & Conditions', style: 'invoiceContentTitle' }];
    let mytnc = this.invoiceData['tnc'] ? this.invoiceData['tnc'].split('\\n') : '';
    tnc.push(mytnc);
    if (this.invoiceData['tnc'] !== '')
      return tnc;
    else
      return [];
  }

  getDeclaration() {
    let declaration = [{ text: 'Declaration', style: 'invoiceContentTitle' }];
    let mydec = this.invoiceData['declaration'] ? this.invoiceData['declaration'].split('\\n') : '';
    declaration.push(mydec);
    if (this.invoiceData['declaration'] !== '')
      return declaration;
    else
      return [];
  }
}