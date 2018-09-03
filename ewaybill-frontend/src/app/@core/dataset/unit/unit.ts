export class Unit {

  public data: any = {
    BGS: "BAGS",
    BND: "BUNDLES",
    BOX: "BOXES",
    CMS: "CENTIMETERS",
    DZN: "DOZENS",
    GMS: "GRAMS",
    HKM: "HUNDREDKILOMETERS",
    HNO: "HUNDREDNUMBERS/UNITS",
    KGS: "KILOGRAMS",
    KMS: "KILOMETERS",
    LTS: "LITRES",
    MLS: "MILLILITRES",
    MTR: "METERS",
    MTS: "METRICTONNES",
    NOS: "NUMBERS/UNITS",
    PAR: "PAIRS",
    QTS: "QUINTALS",
    SNO: "THOUSANDNUMBERS/UNITS",
    TKM: "THOUSANDKILOMETERS",
    TLT: "THOUSANDLITRES",
    TNO: "TENNUMBERS/UNITS",
    TON: "TONNES"
  };

  unitList = [
    {
      key: "BGS",
      value: "BAGS"
    }, {
      key: "BND",
      value: "BUNDLES"
    }, {
      key: "BOX",
      value: "BOXES"
    }, {
      key: "CMS",
      value: "CENTIMETERS"
    }, {
      key: "DZN",
      value: "DOZENS"
    }, {
      key: "GMS",
      value: "GRAMS"
    }, {
      key: "HKM",
      value: "HUNDREDKILOMETERS"
    }, {
      key: "HNO",
      value: "HUNDREDNUMBERS/UNITS"
    }, {
      key: "KGS",
      value: "KILOGRAMS"
    }, {
      key: "KMS",
      value: "KILOMETERS"
    }, {
      key: "LTS",
      value: "LITRES"
    }, {
      key: "MLS",
      value: "MILLILITRES"
    }, {
      key: "MTR",
      value: "METERS"
    }, {
      key: "MTS",
      value: "METRICTONNES"
    }, {
      key: "NOS",
      value: "NUMBERS/UNITS"
    }, {
      key: "PAR",
      value: "PAIRS"
    }, {
      key: "QTS",
      value: "QUINTALS"
    }, {
      key: "SNO",
      value: "THOUSANDNUMBERS/UNITS"
    }, {
      key: "TKM",
      value: "THOUSANDKILOMETERS"
    }, {
      key: "TLT",
      value: "THOUSANDLITRES"
    }, {
      key: "TNO",
      value: "TENNUMBERS/UNITS"
    }, {
      key: "TON",
      value: "TONNES"
    },
  ];

  constructor() { }

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