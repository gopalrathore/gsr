export class HelperFunction {

  constructor() { }

  public static getDate(date?: any): string {
    let d: Date = date == undefined ? new Date() : new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  public static toNumber(unknownType: any): number {
    return isNaN(unknownType) ? 0 : Number(unknownType);
  }

  public static getInvoiceType(type: string): string {
    switch (type) {
      case 'RI':
        return "Retail Invoice";
      case 'TI':
        return "Tax Invoice";
      case 'EI':
        return "Export Invoice";
      case 'BOS':
        return "Bill of Supply";
      case 'RV':
        return "Receipt Voucher";
      case 'RFV':
        return "Refund Voucher";
      case 'PV':
        return "Payment Voucher";
      case 'REI':
        return "Revise Invoice";
      case 'TDC':
        return "Trade Delivery Challan";
      case 'CN':
        return "Credit Note";
      case 'DN':
        return "Debit Note";
      case 'DC':
        return "Delivery Challan";
      case 'ISD':
        return "ISD Invoice";
      case 'SO':
        return "Sales Order";
      default:
        return '';
    }
  }

  public static numberInString(num: string) {
    let numArray: string[] = num.split('.');
    return this.numberToEnglish(parseInt(numArray[0])) + " Rupees and " + this.numberToEnglish(parseInt(numArray[1])) + " Paise Only";
  }


  public static hasData(test: string | number): boolean {
    return test === undefined || test === null || test.toString().trim().length === 0
  }

  public static hasnoData(test: string | number): boolean {
    return test === undefined || test === null || test.toString().trim().length === 0
  }

  private static numberToEnglish(currency: number, and: string = "and"): string {

    let start: number, end: number, chunksLen: number, chunk: number, ints: number[], word: string, words: string[];
    let units: string[] = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    let tens: string[] = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    let scales: string[] = ['', 'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion', 'Quintillion', 'Sextillion', 'Septillion', 'Octillion', 'Nonillion', 'Decillion', 'Undecillion', 'Duodecillion', 'Tredecillion', 'Quatttuor-Decillion', 'Quindecillion', 'Sexdecillion', 'Septen-Decillion', 'Octodecillion', 'Novemdecillion', 'Vigintillion', 'Centillion'];
    let chunks = [];
    let string = currency.toString();

    if (parseInt(string) === 0) return 'Zero';

    /* Split user arguemnt into 3 digit chunks from right to left */
    start = string.length;

    while (start > 0) {
      end = start;
      chunks.push(string.slice((start = Math.max(0, start - 3)), end));
    }

    // ["789", "456", "123"]

    /* Check if function has enough scale words to be able to stringify the user argument */
    chunksLen = chunks.length;

    if (chunksLen > scales.length) return '';

    /* Stringify each integer in each chunk */
    words = [];
    for (let i: number = 0; i < chunksLen; i++) {
      chunk = parseInt(chunks[i]);
      if (chunk) {
        /* Split chunk into array of individual integers */
        ints = chunks[i].split('').reverse().map(parseFloat);

        /* If tens integer is 1, i.e. 10, then add 10 to units integer */
        if (ints[1] === 1) {
          ints[0] += 10;
        }

        /* Add scale word if chunk is not zero and array item exists */
        if ((word = scales[i])) {
          words.push(word);
        }

        /* Add unit word if array item exists */
        if ((word = units[ints[0]])) {
          words.push(word);
        }

        /* Add tens word if array item exists */
        if ((word = tens[ints[1]])) {
          words.push(word);
        }

        /* Add 'and' string after units or tens integer if: */
        if (ints[0] || ints[1]) {

          /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
          if (ints[2] || !i && chunksLen) {
            words.push(and);
          }

        }

        /* Add hundreds word if array item exists */
        if ((word = units[ints[2]])) {
          words.push(word + ' Hundred');
        }

      }

    }

    if (words.slice(-1)[0] === 'and') words.pop();
    return words.reverse().join(' ');

  }

  public static totalInWords(total: string = '0.00') {
    if (isNaN(Number(total))) return '';
    if (Number(total) === 0) return 'Zero Rupees and Zero Paise'

    let totalArr = total.split('.');

    for (let i = 0; i < totalArr.length; i++) {
      totalArr[i] = this.numberToWord(Number(totalArr[i]));
    }


    totalArr[0] = totalArr[0] + ' Rupees';
    // totalArr[1] = totalArr[1]+' Paise';
    totalArr.length > 1 ? totalArr[1] = totalArr[1] + ' Paise' : '';

    return totalArr.join(' and ') + ' Only';
  }

  private static numberToWord(arg_number: number) {
    let final_string: string = '';

    if (Number(arg_number) === 0) return 'Zero';

    let number = parseFloat(arg_number.toString());
    let whole = parseInt(Math.floor(number).toString());
    let fraction = parseInt(((number - whole) * 100).toString());
    let words = {
      0: '', 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six',
      7: 'Seven', 8: 'Eight', 10: 'Ten', 11: 'Eleven', 12: 'Twelve', 13: 'Thirteen',
      14: 'Fourteen', 15: 'Fifteen', 16: 'Sixteen', 17: 'Seventeen', 18: 'Eighteen', 19: 'Nineteen',
      20: 'Twenty', 30: 'Thirty', 40: 'Forty', 50: 'Fifty', 60: 'Sixty', 70: 'Seventy', 80: 'Eighty', 90: 'Ninety'
    }
    if (whole <= 20)
      final_string = words[whole];
    else if (whole <= 99) {
      final_string += words[parseInt((whole / 10).toString()) * 10];
      if (whole > 20 && whole - parseInt((whole / 10).toString()) * 10 > 0)
        final_string += ' ';
      final_string += words[whole - parseInt((whole / 10).toString()) * 10];
    }
    else if (whole <= 999)
      final_string = this.numberToWord(parseInt((whole / 100).toString())) + " Hundred " + this.numberToWord(whole - parseInt((whole / 100).toString()) * 100);
    else if (whole <= 99999)
      final_string = this.numberToWord(parseInt((whole / 1000).toString())) + " Thousand " + this.numberToWord(whole - parseInt((whole / 1000).toString()) * 1000);
    else if (whole <= 9999999)
      final_string = this.numberToWord(parseInt((whole / 100000).toString())) + " Lakh " + this.numberToWord(whole - parseInt((whole / 100000).toString()) * 100000);
    else if (whole <= 999999999)
      final_string = this.numberToWord(parseInt((whole / 10000000).toString())) + " Crore " + this.numberToWord(whole - parseInt((whole / 10000000).toString()) * 10000000);
    else
      final_string = "More than 999999999";

    return final_string;
  }

  public static getBase64(file, callback) {

    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    }
    reader.readAsDataURL(file);
  }

  private static convertImgToBase64URL(url:string):Promise<any> {

    let base64Promise = new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', 'https://cors-anywhere.herokuapp.com/' + url);
      xhr.responseType = 'blob';
      xhr.send();
    });

    return base64Promise;
  }

  public static async base64(url:string):Promise<any> {
    return await this.convertImgToBase64URL(url);
  }

  public static mapPurchaseToSales(invoiceData:any):any {
    invoiceData.client_company = invoiceData.vendor_company;
    invoiceData.invoice_date = invoiceData.purchase_date;
    invoiceData.client_shipping_country = invoiceData.vendor_shipping_country;
    invoiceData.invoice_items = [...invoiceData.purchase_items];
    invoiceData.client_state_code = invoiceData.vendor_state_code;
    invoiceData.client_shipping_address = invoiceData.vendor_shipping_address;
    invoiceData.client_shipping_address_2 = invoiceData.vendor_shipping_address_2;
    invoiceData.client_shipping_address_3 = invoiceData.vendor_shipping_address_3;
    invoiceData.client_shipping_address_4 = invoiceData.vendor_shipping_address_4;
    invoiceData.client_shipping_state_code = invoiceData.vendor_shipping_state_code;
    invoiceData.client_shipping_state_name = invoiceData.vendor_shipping_state_name;
    invoiceData.invoice_number = invoiceData.purchase_number;

    return invoiceData;
  }
}