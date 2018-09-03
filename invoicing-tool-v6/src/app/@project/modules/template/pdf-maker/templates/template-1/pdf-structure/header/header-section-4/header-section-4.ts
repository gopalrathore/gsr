export class HeaderSection4 {
    constructor(private invoiceData: any) { }

    getPaymentDueDate() {
        let paymentDateArray =
            [{ text: this.invoiceData['invoice_date'] , border: [false, false, true, false], alignment: 'center' }, { text: this.invoiceData['payment_due_days'], border: [false, false, true, false], alignment: 'center' }, { text: this.getDueDate(this.invoiceData['invoice_date'], this.invoiceData['payment_due_days']), border: [false, false, false, false], alignment: 'center' }]
        return paymentDateArray;
    }

    private getDueDate(date: string, dueDays: string):string {
        let days = Number(dueDays);
        if (!isNaN(days) && date !== undefined && days != null && days < 10000000) {
            var newDate = new Date(date);
            newDate.setDate(newDate.getDate() + Number(days));
            return newDate.toLocaleDateString().replace(/[/]/g, '-');
        } else {
            return date;
        }
    }
}