export interface transportationMode {
  1: string;
  2: string;
  3: string;
  4: string;
}
export class TransportationMode {

  private data: transportationMode = {
    1: "Road",
    2: "Rail",
    3: "Air",
    4: "Ship"
  };

  constructor() { }

  public getTransportationMode(): transportationMode {
    return this.data;
  }

  public transformToValue(key: string): string {
    let keyInNumber: number = Number(key);
    if (this.data[keyInNumber]) return this.data[keyInNumber];
    else return "";
  }

}