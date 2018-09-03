
export interface DocumentType {
  INV: string,
  BIL: string,
  BOE: string,
  CHL: string,
  CNT: string,
  OTH: string
}

export class Documents {

  private data: DocumentType = {
    INV: "Tax Invoice",
    BIL: "Bill of Supply",
    BOE: "Bill of Entry",
    CHL: "Delivery Challan",
    CNT: "Credit Note",
    OTH: "Others"
  };

  public getDocumentType(): DocumentType {
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