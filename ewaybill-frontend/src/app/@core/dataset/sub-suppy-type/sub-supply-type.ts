export interface subSupplyType {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
}

export class SubSupplyType {

  private data: subSupplyType = {
    1: "Supply",
    2: "Import",
    3: "Export",
    4: "Job work",
    5: "For Own Use",
    6: "Job Work Returns",
    7: "Sales Return",
    8: "Others",
    9: "SKD/CKD",
    10: "Line Sales",
    11: "Recipient  Not Known",
    12: "Exhibition or Fairs"
  };

  constructor() { }

  public getSubSupplyType(): subSupplyType {
    return this.data;
  }

  public transformToValue(key: string): string {
    let keyInNumber: number = Number(key);
    if (this.data[keyInNumber]) return this.data[keyInNumber];
    else return ""
  }

}