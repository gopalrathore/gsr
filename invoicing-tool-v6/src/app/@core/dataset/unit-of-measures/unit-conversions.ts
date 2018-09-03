export class UnitConversion {

  public conversionTable = {
    "KGS-KILOGRAMS": {
      match: ["GMS-GRAMMES"],
      factor: [1000],
      aka: "kilogram"
    },
    "GMS-GRAMMES": {
      match: ["KGS-KILOGRAMS"],
      factor: [0.0001],
      aka: "gram"
    },
    "DOZ-DOZENS": {
      match: ["NOS-NUMBERS"],
      factor: [12],
      aka: "dozen"
    },
    "CCM-CUBIC CENTIMETERS": {
      match: ["MLT-MILILITRE"],
      factor: [1],
      aka: "cubic centimeter"
    },
    "CBM-CUBIC METERS": {
      match: ["MTR-METERS"],
      factor: [0.01],
      aka: "cubic meter"
    },
    "GGK-GREAT GROSS": {
      match: ["UNT-UNITS", "PCS-PIECES", "PRS-PAIRS", "DOZ-DOZENS"],
      factor: [1728, 1728, 864, 144],
      aka: "great gross"
    },
    "GRS-GROSS": {
      match: ["PCS-PIECES", "DOZ-DOZENS"],
      factor: [114, 12],
      aka: "gross"
    },
    "PRS-PAIRS": {
      match: ["PCS-PIECES"],
      factor: [2],
      aka: "pair"
    },
    "KLR-KILOLITRE": {
      match: ["MLT-MILILITRE"],
      factor: [1000000],
      aka: "kilolitre"
    },
    "KME-KILOMETRE": {
      match: ["MTR-METERS"],
      factor: [1000],
      aka: "kilometre"
    },
    "MTS-METRIC TON": {
      match: ["KGS-KILOGRAMS"],
      factor: [1000],
      aka: "metric ton"
    },
    "QTL-QUINTAL": {
      match: ["KGS-KILOGRAMS", "GMS-GRAMMES", "TON-TONNES"],
      factor: [100, 100000, 0.1],
      aka: "quintal"
    },
    "SQF-SQUARE FEET": {
      match: ["SQM-SQUARE METERS", "SQY-SQUARE YARDS"],
      factor: [0.092903, 0.111111],
      aka: "square feet"
    },
    "SQY-SQUARE YARDS": {
      match: ["SQM-SQUARE METERS"],
      factor: [0.836127],
      aka: "square yard"
    },
    "TON-TONNES": {
      match: ["KGS-KILOGRAMS"],
      factor: [1000],
      aka: "tonnes"
    },
    "UGS-US GALLONS": {
      match: ["MLT-MILILITRE", "CBM-CUBIC METERS"],
      factor: [3785.41, 0.00378541],
      aka: "tubes"
    },
    "YDS-YARDS": {
      match: ["MTR-METERS", "KME-KILOMETRE", "CMS-CENTIMETERS", "MLT-MILILITRE"],
      factor: [0.9144, 0.0009144, 91.44, 914.4],
      aka: "yards"
    },
    "CMS-CENTIMETERS": {
      match: ["MTR-METERS", "YDS-YARDS"],
      factor: [0.01, 0.0109361],
      aka: "centimeter"
    },
    "BAG-BAGS": {
      aka: "bag"
    },
    "BAL-BALE": {
      aka: "bale"
    },
    "BDL-BUNDLES": {
      aka: "bundle"
    },
    "BKL-BUCKLES": {
      aka: "buckle"
    },
    "BOU-BILLION OF UNITS": {
      aka: "billion"
    },
    "BOX-BOX": {
      aka: "box"
    },
    "BTL-BOTTLES": {
      aka: "bottle"
    },
    "BUN-BUNCHES": {
      aka: "bunch"
    },
    "CAN-CANS": {
      aka: "can"
    },
    "CTN-CARTONS": {
      aka: "carton"
    },
    "DRM-DRUMS": {
      aka: "drum"
    },
    "GYD-GROSS YARDS": {
      aka: "gross yard"
    },
    "MLT-MILILITRE": {
      aka: "mililitre"
    },
    "MTR-METERS": {
      aka: "meter"
    },
    "NOS-NUMBERS": {
      aka: "number"
    },
    "PAC-PACKS": {
      aka: "pack"
    },
    "PCS-PIECES": {
      aka: "piece"
    },
    "ROL-ROLLS": {
      aka: "roll"
    },
    "SET-SETS": {
      aka: "set"
    },
    "SQM-SQUARE METERS": {
      aka: "square meter"
    },
    "TBS-TABLETS": {
      aka: "tablets"
    },
    "TGM-TEN GROSS": {
      aka: "ten gros"
    },
    "THD-THOUSANDS": {
      aka: "thousands"
    },
    "TUB-TUBES": {
      aka: "tubes"
    },
    "UNT-UNITS": {
      aka: "units"
    }
  };


}