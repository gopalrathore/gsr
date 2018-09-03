export class HelperFunction {

  constructor() { }

  public static getDate(date?: any): string {
    var d: Date = date === undefined ? new Date() : new Date(date),
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


  public static hasData(test: string | number): boolean {
    return test === undefined || test === null || test.toString().trim().length === 0
  }

  public static hasnoData(test: string | number): boolean {
    return test === undefined || test === null || test.toString().trim().length === 0
  }

}