export class TooltipVendor {
  public data: any;

  constructor(visibility: boolean = true) {
    this.buildDataset(visibility);
  }

  buildDataset(visibility: boolean) {
    this.data = {
      gstin: {
        visibility: visibility,
        text: "this is GSTIN"
      },
      company_name: {
        visibility: visibility,
        text: "Name of your Company"
      }
    };
  }

  toggleVisibility(visibility: boolean) {
    this.buildDataset(visibility);
  }
}
