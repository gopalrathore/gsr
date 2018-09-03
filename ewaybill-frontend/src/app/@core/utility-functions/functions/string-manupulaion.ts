export class StringManipulation {

  constructor() {

  }

  public static makeFullName(salutation: string, firstname: string, midname: string, lastname: string, separator?: string): string {
    let fullname: string
    salutation = typeof (salutation) !== 'string' ? '' : salutation.trim();
    firstname = typeof (firstname) !== 'string' ? '' : firstname.trim();
    midname = typeof (midname) !== 'string' ? '' : midname.trim();
    lastname = typeof (lastname) !== 'string' ? '' : lastname.trim();
    if (separator === undefined) separator = ' ';

    fullname = (salutation === '' ? '' : salutation + separator) +
      (firstname === '' ? '' : firstname + separator) +
      (midname === '' ? '' : midname + separator) +
      (lastname === '' ? '' : lastname + separator);

    fullname = fullname.trim();
    return fullname;
  }

  public static decodeHtml(html: string): string {
    var textareElement = document.createElement("textarea");
    textareElement.innerHTML = html;
    return textareElement.value;
  }

  public static escapeHtml(unsafe: string): string {
    return unsafe.replace(/\\n/g, "&#13;&#10;");
  }
}