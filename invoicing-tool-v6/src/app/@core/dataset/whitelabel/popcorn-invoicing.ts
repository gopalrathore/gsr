export class WhiteLabelFeatures {
  public accessControl: any = {
    company: {
      logo: "/assets/img/Logo-popcorn.png",
      name: "popcorn",
      link: ""
    },
    bank: {
      access: false
    },
    dashboard: {
      access: true
    },
    inventory: {
      access: true
    },
    employee: {
      access: false
    },
    profile: {
      access: true
    },
    expense: {
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
    supportTicket: {
      access: false
    },
    tutorial: {
      access: false
    },
    guidelines: {
      access: false
    },
    tnc: {
      access: false
    },
    hotKeys: {
      access: true
    },
    createCompany: {
      access: true
    },
    voucher: {
      access: false,
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
              access: false
            },
            BOS: {
              access: false
            },
            PV: {
              access: false
            },
            RFV: {
              access: false
            },
            RV: {
              access: false
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
              access: false
            },
            TDC: {
              access: false
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
