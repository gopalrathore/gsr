export interface supplyType {
  I: string;
  O: string;
}

export class SupplyType {

  private data: supplyType = {
    I: "Inward",
    O: "Outward"
  };

  constructor() { }

  public getSupplyType(): supplyType {
    return this.data;
  }

  public transformToValue(key: string): string {
    try {
      key = key.toUpperCase();
      return this.data[key].toString();
    }
    catch (Error) {
      return "";
    }
  }

}