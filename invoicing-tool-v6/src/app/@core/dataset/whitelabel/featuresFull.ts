export class WhiteLabelFeatures {
  public accessControl: any = {
    company: {
      logo: "/assets/img/Logo-invoice-tool.png",
      name: "GST EDGE",
      link: "https://www.gstedge.com/"
    },
    bank: {
      access: true
    },
    dashboard: {
      access: true
    },
    inventory: {
      access: true
    },
    employee: {
      access: true
    },
    profile: {
      access: true
    },
    expense: {
      access: true
    },
    supportTicket: {
      access: true
    },
    tutorial: {
      access: true
    },
    guidelines: {
      access: true
    },
    tnc: {
      access: true
    },
    hotKeys: {
      access: true
    },
    audit: {
      access: true
    },
    templateSetting: {
      access: true
    },
    reports: {
      access: true
    },
    journals: {
      access: true
    },
    createCompany: {
      access: true
    },
    voucher: {
      access: true,
      sub_section: {
        receipt: {
          access: true
        },
        payment: {
          access: true
        }
      }
    },
    businessParties: {
      access: true,
      sub_section: {
        client: {
          access: true
        },
        vendor: {
          access: true
        },
        contactBook: {
          access: true
        }
      }
    },
    invoice: {
      access: true,
      sub_section: {
        salesInvoice: {
          access: true,
          sub_section: {
            TI: {
              access: true
            },
            RI: {
              access: true
            },
            EI: {
              access: true
            },
            BOS: {
              access: true
            },
            PV: {
              access: true
            },
            RFV: {
              access: false
            },
            RV: {
              access: true
            },
            CN: {
              access: true
            },
            DN: {
              access: true
            },
            REI: {
              access: false
            },
            DC: {
              access: true
            },
            TDC: {
              access: true
            },
            SO: {
              access: true
            }
          }
        },
        purchaseInvoice: {
          access: true,
          sub_section: {
            purchaseInvoice: {
              access: true
            }
          }
        }
      }
    }
  };

  public salesInvoice: any;

  constructor() {
    this.salesInvoice = this.accessControl.invoice.sub_section.salesInvoice;
  }
}
