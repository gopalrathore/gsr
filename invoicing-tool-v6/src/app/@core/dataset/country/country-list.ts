// has to be implemented by interface

interface Country {
  country_id: string,
  country_code: string,
  country_name: string,
  country_dial_code: string,
  country_currency_name: string,
  country_currency_symbol: string,
  country_currency_code: string
}

export class CountryList {

  public data: Country[] = [
    {
      country_id: "1",
      country_code: "AF",
      country_name: "Afghanistan",
      country_dial_code: "93",
      country_currency_name: "Afghan afghani",
      country_currency_symbol: "\u060b",
      country_currency_code: "AFN"
    },
    {
      country_id: "2",
      country_code: "AL",
      country_name: "Albania",
      country_dial_code: "355",
      country_currency_name: "Albanian lek",
      country_currency_symbol: "L",
      country_currency_code: "ALL"
    },
    {
      country_id: "3",
      country_code: "DZ",
      country_name: "Algeria",
      country_dial_code: "213",
      country_currency_name: "Algerian dinar",
      country_currency_symbol: "\u062f.\u062c",
      country_currency_code: "DZD"
    },
    {
      country_id: "4",
      country_code: "AS",
      country_name: "American Samoa",
      country_dial_code: "1684",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "5",
      country_code: "AD",
      country_name: "Andorra",
      country_dial_code: "376",
      country_currency_name: "Euro",
      country_currency_symbol: "\u20ac",
      country_currency_code: "EUR"
    },
    {
      country_id: "6",
      country_code: "AO",
      country_name: "Angola",
      country_dial_code: "244",
      country_currency_name: "Angolan kwanza",
      country_currency_symbol: "Kz",
      country_currency_code: "AOA"
    },
    {
      country_id: "7",
      country_code: "AI",
      country_name: "Anguilla",
      country_dial_code: "1264",
      country_currency_name: "East Caribbean dolla",
      country_currency_symbol: "$",
      country_currency_code: "XCD"
    },
    {
      country_id: "8",
      country_code: "AQ",
      country_name: "Antarctica",
      country_dial_code: "0",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "9",
      country_code: "AG",
      country_name: "Antigua And Barbuda",
      country_dial_code: "1268",
      country_currency_name: "East Caribbean dolla",
      country_currency_symbol: "$",
      country_currency_code: "XCD"
    },
    {
      country_id: "10",
      country_code: "AR",
      country_name: "Argentina",
      country_dial_code: "54",
      country_currency_name: "Argentine peso",
      country_currency_symbol: "$",
      country_currency_code: "ARS"
    },
    {
      country_id: "11",
      country_code: "AM",
      country_name: "Armenia",
      country_dial_code: "374",
      country_currency_name: "Armenian dram",
      country_currency_symbol: null,
      country_currency_code: "AMD"
    },
    {
      country_id: "12",
      country_code: "AW",
      country_name: "Aruba",
      country_dial_code: "297",
      country_currency_name: "Aruban florin",
      country_currency_symbol: "\u0192",
      country_currency_code: "AWG"
    },
    {
      country_id: "13",
      country_code: "AU",
      country_name: "Australia",
      country_dial_code: "61",
      country_currency_name: "Australian dollar",
      country_currency_symbol: "$",
      country_currency_code: "AUD"
    },
    {
      country_id: "14",
      country_code: "AT",
      country_name: "Austria",
      country_dial_code: "43",
      country_currency_name: "Euro",
      country_currency_symbol: "\u20ac",
      country_currency_code: "EUR"
    },
    {
      country_id: "15",
      country_code: "AZ",
      country_name: "Azerbaijan",
      country_dial_code: "994",
      country_currency_name: "Azerbaijani manat",
      country_currency_symbol: null,
      country_currency_code: "AZN"
    },
    {
      country_id: "16",
      country_code: "BS",
      country_name: "Bahamas The",
      country_dial_code: "1242",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "17",
      country_code: "BH",
      country_name: "Bahrain",
      country_dial_code: "973",
      country_currency_name: "Bahraini dinar",
      country_currency_symbol: ".\u062f.\u0628",
      country_currency_code: "BHD"
    },
    {
      country_id: "18",
      country_code: "BD",
      country_name: "Bangladesh",
      country_dial_code: "880",
      country_currency_name: "Bangladeshi taka",
      country_currency_symbol: "\u09f3",
      country_currency_code: "BDT"
    },
    {
      country_id: "19",
      country_code: "BB",
      country_name: "Barbados",
      country_dial_code: "1246",
      country_currency_name: "Barbadian dollar",
      country_currency_symbol: "$",
      country_currency_code: "BBD"
    },
    {
      country_id: "20",
      country_code: "BY",
      country_name: "Belarus",
      country_dial_code: "375",
      country_currency_name: "Belarusian ruble",
      country_currency_symbol: "Br",
      country_currency_code: "BYR"
    },
    {
      country_id: "21",
      country_code: "BE",
      country_name: "Belgium",
      country_dial_code: "32",
      country_currency_name: "Euro",
      country_currency_symbol: "\u20ac",
      country_currency_code: "EUR"
    },
    {
      country_id: "22",
      country_code: "BZ",
      country_name: "Belize",
      country_dial_code: "501",
      country_currency_name: "Belize dollar",
      country_currency_symbol: "$",
      country_currency_code: "BZD"
    },
    {
      country_id: "23",
      country_code: "BJ",
      country_name: "Benin",
      country_dial_code: "229",
      country_currency_name: "West African CFA fra",
      country_currency_symbol: "Fr",
      country_currency_code: "XOF"
    },
    {
      country_id: "24",
      country_code: "BM",
      country_name: "Bermuda",
      country_dial_code: "1441",
      country_currency_name: "Bermudian dollar",
      country_currency_symbol: "$",
      country_currency_code: "BMD"
    },
    {
      country_id: "25",
      country_code: "BT",
      country_name: "Bhutan",
      country_dial_code: "975",
      country_currency_name: "Bhutanese ngultrum",
      country_currency_symbol: "Nu.",
      country_currency_code: "BTN"
    },
    {
      country_id: "26",
      country_code: "BO",
      country_name: "Bolivia",
      country_dial_code: "591",
      country_currency_name: "Bolivian boliviano",
      country_currency_symbol: "Bs.",
      country_currency_code: "BOB"
    },
    {
      country_id: "27",
      country_code: "BA",
      country_name: "Bosnia and Herzegovina",
      country_dial_code: "387",
      country_currency_name: "Bosnia and Herzegovi",
      country_currency_symbol: "KM or \u041a\u041c",
      country_currency_code: "BAM"
    },
    {
      country_id: "28",
      country_code: "BW",
      country_name: "Botswana",
      country_dial_code: "267",
      country_currency_name: "Botswana pula",
      country_currency_symbol: "P",
      country_currency_code: "BWP"
    },
    {
      country_id: "29",
      country_code: "BV",
      country_name: "Bouvet Island",
      country_dial_code: "0",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "30",
      country_code: "BR",
      country_name: "Brazil",
      country_dial_code: "55",
      country_currency_name: "Brazilian real",
      country_currency_symbol: "R$",
      country_currency_code: "BRL"
    },
    {
      country_id: "31",
      country_code: "IO",
      country_name: "British Indian Ocean Territory",
      country_dial_code: "246",
      country_currency_name: "United States dollar",
      country_currency_symbol: "$",
      country_currency_code: "USD"
    },
    {
      country_id: "32",
      country_code: "BN",
      country_name: "Brunei",
      country_dial_code: "673",
      country_currency_name: "Brunei dollar",
      country_currency_symbol: "$",
      country_currency_code: "BND"
    },
    {
      country_id: "33",
      country_code: "BG",
      country_name: "Bulgaria",
      country_dial_code: "359",
      country_currency_name: "Bulgarian lev",
      country_currency_symbol: "\u043b\u0432",
      country_currency_code: "BGN"
    },
    {
      country_id: "34",
      country_code: "BF",
      country_name: "Burkina Faso",
      country_dial_code: "226",
      country_currency_name: "West African CFA fra",
      country_currency_symbol: "Fr",
      country_currency_code: "XOF"
    },
    {
      country_id: "35",
      country_code: "BI",
      country_name: "Burundi",
      country_dial_code: "257",
      country_currency_name: "Burundian franc",
      country_currency_symbol: "Fr",
      country_currency_code: "BIF"
    },
    {
      country_id: "36",
      country_code: "KH",
      country_name: "Cambodia",
      country_dial_code: "855",
      country_currency_name: "Cambodian riel",
      country_currency_symbol: "\u17db",
      country_currency_code: "KHR"
    },
    {
      country_id: "37",
      country_code: "CM",
      country_name: "Cameroon",
      country_dial_code: "237",
      country_currency_name: "Central African CFA ",
      country_currency_symbol: "Fr",
      country_currency_code: "XAF"
    },
    {
      country_id: "38",
      country_code: "CA",
      country_name: "Canada",
      country_dial_code: "1",
      country_currency_name: "Canadian dollar",
      country_currency_symbol: "$",
      country_currency_code: "CAD"
    },
    {
      country_id: "39",
      country_code: "CV",
      country_name: "Cape Verde",
      country_dial_code: "238",
      country_currency_name: "Cape Verdean escudo",
      country_currency_symbol: "Esc or $",
      country_currency_code: "CVE"
    },
    {
      country_id: "40",
      country_code: "KY",
      country_name: "Cayman Islands",
      country_dial_code: "1345",
      country_currency_name: "Cayman Islands dolla",
      country_currency_symbol: "$",
      country_currency_code: "KYD"
    },
    {
      country_id: "41",
      country_code: "CF",
      country_name: "Central African Republic",
      country_dial_code: "236",
      country_currency_name: "Central African CFA ",
      country_currency_symbol: "Fr",
      country_currency_code: "XAF"
    },
    {
      country_id: "42",
      country_code: "TD",
      country_name: "Chad",
      country_dial_code: "235",
      country_currency_name: "Central African CFA ",
      country_currency_symbol: "Fr",
      country_currency_code: "XAF"
    },
    {
      country_id: "43",
      country_code: "CL",
      country_name: "Chile",
      country_dial_code: "56",
      country_currency_name: "Chilean peso",
      country_currency_symbol: "$",
      country_currency_code: "CLP"
    },
    {
      country_id: "44",
      country_code: "CN",
      country_name: "China",
      country_dial_code: "86",
      country_currency_name: "Chinese yuan",
      country_currency_symbol: "\u00a5 or \u5143",
      country_currency_code: "CNY"
    },
    {
      country_id: "45",
      country_code: "CX",
      country_name: "Christmas Island",
      country_dial_code: "61",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "46",
      country_code: "CC",
      country_name: "Cocos (Keeling) Islands",
      country_dial_code: "672",
      country_currency_name: "Australian dollar",
      country_currency_symbol: "$",
      country_currency_code: "AUD"
    },
    {
      country_id: "47",
      country_code: "CO",
      country_name: "Colombia",
      country_dial_code: "57",
      country_currency_name: "Colombian peso",
      country_currency_symbol: "$",
      country_currency_code: "COP"
    },
    {
      country_id: "48",
      country_code: "KM",
      country_name: "Comoros",
      country_dial_code: "269",
      country_currency_name: "Comorian franc",
      country_currency_symbol: "Fr",
      country_currency_code: "KMF"
    },
    {
      country_id: "49",
      country_code: "CG",
      country_name: "Congo",
      country_dial_code: "242",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "50",
      country_code: "CD",
      country_name: "Congo The Democratic Republic Of The",
      country_dial_code: "242",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "51",
      country_code: "CK",
      country_name: "Cook Islands",
      country_dial_code: "682",
      country_currency_name: "New Zealand dollar",
      country_currency_symbol: "$",
      country_currency_code: "NZD"
    },
    {
      country_id: "52",
      country_code: "CR",
      country_name: "Costa Rica",
      country_dial_code: "506",
      country_currency_name: "Costa Rican col\u00f3n",
      country_currency_symbol: "\u20a1",
      country_currency_code: "CRC"
    },
    {
      country_id: "53",
      country_code: "CI",
      country_name: "Cote D'Ivoire (Ivory Coast)",
      country_dial_code: "225",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "54",
      country_code: "HR",
      country_name: "Croatia (Hrvatska)",
      country_dial_code: "385",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "55",
      country_code: "CU",
      country_name: "Cuba",
      country_dial_code: "53",
      country_currency_name: "Cuban convertible pe",
      country_currency_symbol: "$",
      country_currency_code: "CUC"
    },
    {
      country_id: "56",
      country_code: "CY",
      country_name: "Cyprus",
      country_dial_code: "357",
      country_currency_name: "Euro",
      country_currency_symbol: "\u20ac",
      country_currency_code: "EUR"
    },
    {
      country_id: "57",
      country_code: "CZ",
      country_name: "Czech Republic",
      country_dial_code: "420",
      country_currency_name: "Czech koruna",
      country_currency_symbol: "K\u010d",
      country_currency_code: "CZK"
    },
    {
      country_id: "58",
      country_code: "DK",
      country_name: "Denmark",
      country_dial_code: "45",
      country_currency_name: "Danish krone",
      country_currency_symbol: "kr",
      country_currency_code: "DKK"
    },
    {
      country_id: "59",
      country_code: "DJ",
      country_name: "Djibouti",
      country_dial_code: "253",
      country_currency_name: "Djiboutian franc",
      country_currency_symbol: "Fr",
      country_currency_code: "DJF"
    },
    {
      country_id: "60",
      country_code: "DM",
      country_name: "Dominica",
      country_dial_code: "1767",
      country_currency_name: "East Caribbean dolla",
      country_currency_symbol: "$",
      country_currency_code: "XCD"
    },
    {
      country_id: "61",
      country_code: "DO",
      country_name: "Dominican Republic",
      country_dial_code: "1809",
      country_currency_name: "Dominican peso",
      country_currency_symbol: "$",
      country_currency_code: "DOP"
    },
    {
      country_id: "62",
      country_code: "TP",
      country_name: "East Timor",
      country_dial_code: "670",
      country_currency_name: "United States dollar",
      country_currency_symbol: "$",
      country_currency_code: "USD"
    },
    {
      country_id: "63",
      country_code: "EC",
      country_name: "Ecuador",
      country_dial_code: "593",
      country_currency_name: "United States dollar",
      country_currency_symbol: "$",
      country_currency_code: "USD"
    },
    {
      country_id: "64",
      country_code: "EG",
      country_name: "Egypt",
      country_dial_code: "20",
      country_currency_name: "Egyptian pound",
      country_currency_symbol: "\u00a3 or \u062c.\u0645",
      country_currency_code: "EGP"
    },
    {
      country_id: "65",
      country_code: "SV",
      country_name: "El Salvador",
      country_dial_code: "503",
      country_currency_name: "United States dollar",
      country_currency_symbol: "$",
      country_currency_code: "USD"
    },
    {
      country_id: "66",
      country_code: "GQ",
      country_name: "Equatorial Guinea",
      country_dial_code: "240",
      country_currency_name: "Central African CFA ",
      country_currency_symbol: "Fr",
      country_currency_code: "XAF"
    },
    {
      country_id: "67",
      country_code: "ER",
      country_name: "Eritrea",
      country_dial_code: "291",
      country_currency_name: "Eritrean nakfa",
      country_currency_symbol: "Nfk",
      country_currency_code: "ERN"
    },
    {
      country_id: "68",
      country_code: "EE",
      country_name: "Estonia",
      country_dial_code: "372",
      country_currency_name: "Euro",
      country_currency_symbol: "\u20ac",
      country_currency_code: "EUR"
    },
    {
      country_id: "69",
      country_code: "ET",
      country_name: "Ethiopia",
      country_dial_code: "251",
      country_currency_name: "Ethiopian birr",
      country_currency_symbol: "Br",
      country_currency_code: "ETB"
    },
    {
      country_id: "70",
      country_code: "XA",
      country_name: "External Territories of Australia",
      country_dial_code: "61",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "71",
      country_code: "FK",
      country_name: "Falkland Islands",
      country_dial_code: "500",
      country_currency_name: "Falkland Islands pou",
      country_currency_symbol: "\u00a3",
      country_currency_code: "FKP"
    },
    {
      country_id: "72",
      country_code: "FO",
      country_name: "Faroe Islands",
      country_dial_code: "298",
      country_currency_name: "Danish krone",
      country_currency_symbol: "kr",
      country_currency_code: "DKK"
    },
    {
      country_id: "73",
      country_code: "FJ",
      country_name: "Fiji Islands",
      country_dial_code: "679",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "74",
      country_code: "FI",
      country_name: "Finland",
      country_dial_code: "358",
      country_currency_name: "Euro",
      country_currency_symbol: "\u20ac",
      country_currency_code: "EUR"
    },
    {
      country_id: "75",
      country_code: "FR",
      country_name: "France",
      country_dial_code: "33",
      country_currency_name: "Euro",
      country_currency_symbol: "\u20ac",
      country_currency_code: "EUR"
    },
    {
      country_id: "76",
      country_code: "GF",
      country_name: "French Guiana",
      country_dial_code: "594",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "77",
      country_code: "PF",
      country_name: "French Polynesia",
      country_dial_code: "689",
      country_currency_name: "CFP franc",
      country_currency_symbol: "Fr",
      country_currency_code: "XPF"
    },
    {
      country_id: "78",
      country_code: "TF",
      country_name: "French Southern Territories",
      country_dial_code: "0",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "79",
      country_code: "GA",
      country_name: "Gabon",
      country_dial_code: "241",
      country_currency_name: "Central African CFA ",
      country_currency_symbol: "Fr",
      country_currency_code: "XAF"
    },
    {
      country_id: "80",
      country_code: "GM",
      country_name: "Gambia The",
      country_dial_code: "220",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "81",
      country_code: "GE",
      country_name: "Georgia",
      country_dial_code: "995",
      country_currency_name: "Georgian lari",
      country_currency_symbol: "\u10da",
      country_currency_code: "GEL"
    },
    {
      country_id: "82",
      country_code: "DE",
      country_name: "Germany",
      country_dial_code: "49",
      country_currency_name: "Euro",
      country_currency_symbol: "\u20ac",
      country_currency_code: "EUR"
    },
    {
      country_id: "83",
      country_code: "GH",
      country_name: "Ghana",
      country_dial_code: "233",
      country_currency_name: "Ghana cedi",
      country_currency_symbol: "\u20b5",
      country_currency_code: "GHS"
    },
    {
      country_id: "84",
      country_code: "GI",
      country_name: "Gibraltar",
      country_dial_code: "350",
      country_currency_name: "Gibraltar pound",
      country_currency_symbol: "\u00a3",
      country_currency_code: "GIP"
    },
    {
      country_id: "85",
      country_code: "GR",
      country_name: "Greece",
      country_dial_code: "30",
      country_currency_name: "Euro",
      country_currency_symbol: "\u20ac",
      country_currency_code: "EUR"
    },
    {
      country_id: "86",
      country_code: "GL",
      country_name: "Greenland",
      country_dial_code: "299",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "87",
      country_code: "GD",
      country_name: "Grenada",
      country_dial_code: "1473",
      country_currency_name: "East Caribbean dolla",
      country_currency_symbol: "$",
      country_currency_code: "XCD"
    },
    {
      country_id: "88",
      country_code: "GP",
      country_name: "Guadeloupe",
      country_dial_code: "590",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "89",
      country_code: "GU",
      country_name: "Guam",
      country_dial_code: "1671",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "90",
      country_code: "GT",
      country_name: "Guatemala",
      country_dial_code: "502",
      country_currency_name: "Guatemalan quetzal",
      country_currency_symbol: "Q",
      country_currency_code: "GTQ"
    },
    {
      country_id: "91",
      country_code: "XU",
      country_name: "Guernsey and Alderney",
      country_dial_code: "44",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "92",
      country_code: "GN",
      country_name: "Guinea",
      country_dial_code: "224",
      country_currency_name: "Guinean franc",
      country_currency_symbol: "Fr",
      country_currency_code: "GNF"
    },
    {
      country_id: "93",
      country_code: "GW",
      country_name: "Guinea-Bissau",
      country_dial_code: "245",
      country_currency_name: "West African CFA fra",
      country_currency_symbol: "Fr",
      country_currency_code: "XOF"
    },
    {
      country_id: "94",
      country_code: "GY",
      country_name: "Guyana",
      country_dial_code: "592",
      country_currency_name: "Guyanese dollar",
      country_currency_symbol: "$",
      country_currency_code: "GYD"
    },
    {
      country_id: "95",
      country_code: "HT",
      country_name: "Haiti",
      country_dial_code: "509",
      country_currency_name: "Haitian gourde",
      country_currency_symbol: "G",
      country_currency_code: "HTG"
    },
    {
      country_id: "96",
      country_code: "HM",
      country_name: "Heard and McDonald Islands",
      country_dial_code: "0",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "97",
      country_code: "HN",
      country_name: "Honduras",
      country_dial_code: "504",
      country_currency_name: "Honduran lempira",
      country_currency_symbol: "L",
      country_currency_code: "HNL"
    },
    {
      country_id: "98",
      country_code: "HK",
      country_name: "Hong Kong S.A.R.",
      country_dial_code: "852",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "99",
      country_code: "HU",
      country_name: "Hungary",
      country_dial_code: "36",
      country_currency_name: "Hungarian forint",
      country_currency_symbol: "Ft",
      country_currency_code: "HUF"
    },
    {
      country_id: "100",
      country_code: "IS",
      country_name: "Iceland",
      country_dial_code: "354",
      country_currency_name: "Icelandic kr\u00f3na",
      country_currency_symbol: "kr",
      country_currency_code: "ISK"
    },
    {
      country_id: "101",
      country_code: "IN",
      country_name: "India",
      country_dial_code: "91",
      country_currency_name: "Indian rupee",
      country_currency_symbol: "\u20b9",
      country_currency_code: "INR"
    },
    {
      country_id: "102",
      country_code: "ID",
      country_name: "Indonesia",
      country_dial_code: "62",
      country_currency_name: "Indonesian rupiah",
      country_currency_symbol: "Rp",
      country_currency_code: "IDR"
    },
    {
      country_id: "103",
      country_code: "IR",
      country_name: "Iran",
      country_dial_code: "98",
      country_currency_name: "Iranian rial",
      country_currency_symbol: "\ufdfc",
      country_currency_code: "IRR"
    },
    {
      country_id: "104",
      country_code: "IQ",
      country_name: "Iraq",
      country_dial_code: "964",
      country_currency_name: "Iraqi dinar",
      country_currency_symbol: "\u0639.\u062f",
      country_currency_code: "IQD"
    },
    {
      country_id: "105",
      country_code: "IE",
      country_name: "Ireland",
      country_dial_code: "353",
      country_currency_name: "Euro",
      country_currency_symbol: "\u20ac",
      country_currency_code: "EUR"
    },
    {
      country_id: "106",
      country_code: "IL",
      country_name: "Israel",
      country_dial_code: "972",
      country_currency_name: "Israeli new shekel",
      country_currency_symbol: "\u20aa",
      country_currency_code: "ILS"
    },
    {
      country_id: "107",
      country_code: "IT",
      country_name: "Italy",
      country_dial_code: "39",
      country_currency_name: "Euro",
      country_currency_symbol: "\u20ac",
      country_currency_code: "EUR"
    },
    {
      country_id: "108",
      country_code: "JM",
      country_name: "Jamaica",
      country_dial_code: "1876",
      country_currency_name: "Jamaican dollar",
      country_currency_symbol: "$",
      country_currency_code: "JMD"
    },
    {
      country_id: "109",
      country_code: "JP",
      country_name: "Japan",
      country_dial_code: "81",
      country_currency_name: "Japanese yen",
      country_currency_symbol: "\u00a5",
      country_currency_code: "JPY"
    },
    {
      country_id: "110",
      country_code: "XJ",
      country_name: "Jersey",
      country_dial_code: "44",
      country_currency_name: "British pound",
      country_currency_symbol: "\u00a3",
      country_currency_code: "GBP"
    },
    {
      country_id: "111",
      country_code: "JO",
      country_name: "Jordan",
      country_dial_code: "962",
      country_currency_name: "Jordanian dinar",
      country_currency_symbol: "\u062f.\u0627",
      country_currency_code: "JOD"
    },
    {
      country_id: "112",
      country_code: "KZ",
      country_name: "Kazakhstan",
      country_dial_code: "7",
      country_currency_name: "Kazakhstani tenge",
      country_currency_symbol: null,
      country_currency_code: "KZT"
    },
    {
      country_id: "113",
      country_code: "KE",
      country_name: "Kenya",
      country_dial_code: "254",
      country_currency_name: "Kenyan shilling",
      country_currency_symbol: "Sh",
      country_currency_code: "KES"
    },
    {
      country_id: "114",
      country_code: "KI",
      country_name: "Kiribati",
      country_dial_code: "686",
      country_currency_name: "Australian dollar",
      country_currency_symbol: "$",
      country_currency_code: "AUD"
    },
    {
      country_id: "115",
      country_code: "KP",
      country_name: "Korea North",
      country_dial_code: "850",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "116",
      country_code: "KR",
      country_name: "Korea South",
      country_dial_code: "82",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "117",
      country_code: "KW",
      country_name: "Kuwait",
      country_dial_code: "965",
      country_currency_name: "Kuwaiti dinar",
      country_currency_symbol: "\u062f.\u0643",
      country_currency_code: "KWD"
    },
    {
      country_id: "118",
      country_code: "KG",
      country_name: "Kyrgyzstan",
      country_dial_code: "996",
      country_currency_name: "Kyrgyzstani som",
      country_currency_symbol: "\u043b\u0432",
      country_currency_code: "KGS"
    },
    {
      country_id: "119",
      country_code: "LA",
      country_name: "Laos",
      country_dial_code: "856",
      country_currency_name: "Lao kip",
      country_currency_symbol: "\u20ad",
      country_currency_code: "LAK"
    },
    {
      country_id: "120",
      country_code: "LV",
      country_name: "Latvia",
      country_dial_code: "371",
      country_currency_name: "Euro",
      country_currency_symbol: "\u20ac",
      country_currency_code: "EUR"
    },
    {
      country_id: "121",
      country_code: "LB",
      country_name: "Lebanon",
      country_dial_code: "961",
      country_currency_name: "Lebanese pound",
      country_currency_symbol: "\u0644.\u0644",
      country_currency_code: "LBP"
    },
    {
      country_id: "122",
      country_code: "LS",
      country_name: "Lesotho",
      country_dial_code: "266",
      country_currency_name: "Lesotho loti",
      country_currency_symbol: "L",
      country_currency_code: "LSL"
    },
    {
      country_id: "123",
      country_code: "LR",
      country_name: "Liberia",
      country_dial_code: "231",
      country_currency_name: "Liberian dollar",
      country_currency_symbol: "$",
      country_currency_code: "LRD"
    },
    {
      country_id: "124",
      country_code: "LY",
      country_name: "Libya",
      country_dial_code: "218",
      country_currency_name: "Libyan dinar",
      country_currency_symbol: "\u0644.\u062f",
      country_currency_code: "LYD"
    },
    {
      country_id: "125",
      country_code: "LI",
      country_name: "Liechtenstein",
      country_dial_code: "423",
      country_currency_name: "Swiss franc",
      country_currency_symbol: "Fr",
      country_currency_code: "CHF"
    },
    {
      country_id: "126",
      country_code: "LT",
      country_name: "Lithuania",
      country_dial_code: "370",
      country_currency_name: "Euro",
      country_currency_symbol: "\u20ac",
      country_currency_code: "EUR"
    },
    {
      country_id: "127",
      country_code: "LU",
      country_name: "Luxembourg",
      country_dial_code: "352",
      country_currency_name: "Euro",
      country_currency_symbol: "\u20ac",
      country_currency_code: "EUR"
    },
    {
      country_id: "128",
      country_code: "MO",
      country_name: "Macau S.A.R.",
      country_dial_code: "853",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "129",
      country_code: "MK",
      country_name: "Macedonia",
      country_dial_code: "389",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "130",
      country_code: "MG",
      country_name: "Madagascar",
      country_dial_code: "261",
      country_currency_name: "Malagasy ariary",
      country_currency_symbol: "Ar",
      country_currency_code: "MGA"
    },
    {
      country_id: "131",
      country_code: "MW",
      country_name: "Malawi",
      country_dial_code: "265",
      country_currency_name: "Malawian kwacha",
      country_currency_symbol: "MK",
      country_currency_code: "MWK"
    },
    {
      country_id: "132",
      country_code: "MY",
      country_name: "Malaysia",
      country_dial_code: "60",
      country_currency_name: "Malaysian ringgit",
      country_currency_symbol: "RM",
      country_currency_code: "MYR"
    },
    {
      country_id: "133",
      country_code: "MV",
      country_name: "Maldives",
      country_dial_code: "960",
      country_currency_name: "Maldivian rufiyaa",
      country_currency_symbol: ".\u0783",
      country_currency_code: "MVR"
    },
    {
      country_id: "134",
      country_code: "ML",
      country_name: "Mali",
      country_dial_code: "223",
      country_currency_name: "West African CFA fra",
      country_currency_symbol: "Fr",
      country_currency_code: "XOF"
    },
    {
      country_id: "135",
      country_code: "MT",
      country_name: "Malta",
      country_dial_code: "356",
      country_currency_name: "Euro",
      country_currency_symbol: "\u20ac",
      country_currency_code: "EUR"
    },
    {
      country_id: "136",
      country_code: "XM",
      country_name: "Man (Isle of)",
      country_dial_code: "44",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "137",
      country_code: "MH",
      country_name: "Marshall Islands",
      country_dial_code: "692",
      country_currency_name: "United States dollar",
      country_currency_symbol: "$",
      country_currency_code: "USD"
    },
    {
      country_id: "138",
      country_code: "MQ",
      country_name: "Martinique",
      country_dial_code: "596",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "139",
      country_code: "MR",
      country_name: "Mauritania",
      country_dial_code: "222",
      country_currency_name: "Mauritanian ouguiya",
      country_currency_symbol: "UM",
      country_currency_code: "MRO"
    },
    {
      country_id: "140",
      country_code: "MU",
      country_name: "Mauritius",
      country_dial_code: "230",
      country_currency_name: "Mauritian rupee",
      country_currency_symbol: "\u20a8",
      country_currency_code: "MUR"
    },
    {
      country_id: "141",
      country_code: "YT",
      country_name: "Mayotte",
      country_dial_code: "269",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "142",
      country_code: "MX",
      country_name: "Mexico",
      country_dial_code: "52",
      country_currency_name: "Mexican peso",
      country_currency_symbol: "$",
      country_currency_code: "MXN"
    },
    {
      country_id: "143",
      country_code: "FM",
      country_name: "Micronesia",
      country_dial_code: "691",
      country_currency_name: "Micronesian dollar",
      country_currency_symbol: "$",
      country_currency_code: null
    },
    {
      country_id: "144",
      country_code: "MD",
      country_name: "Moldova",
      country_dial_code: "373",
      country_currency_name: "Moldovan leu",
      country_currency_symbol: "L",
      country_currency_code: "MDL"
    },
    {
      country_id: "145",
      country_code: "MC",
      country_name: "Monaco",
      country_dial_code: "377",
      country_currency_name: "Euro",
      country_currency_symbol: "\u20ac",
      country_currency_code: "EUR"
    },
    {
      country_id: "146",
      country_code: "MN",
      country_name: "Mongolia",
      country_dial_code: "976",
      country_currency_name: "Mongolian t\u00f6gr\u00f6g",
      country_currency_symbol: "\u20ae",
      country_currency_code: "MNT"
    },
    {
      country_id: "147",
      country_code: "MS",
      country_name: "Montserrat",
      country_dial_code: "1664",
      country_currency_name: "East Caribbean dolla",
      country_currency_symbol: "$",
      country_currency_code: "XCD"
    },
    {
      country_id: "148",
      country_code: "MA",
      country_name: "Morocco",
      country_dial_code: "212",
      country_currency_name: "Moroccan dirham",
      country_currency_symbol: "\u062f.\u0645.",
      country_currency_code: "MAD"
    },
    {
      country_id: "149",
      country_code: "MZ",
      country_name: "Mozambique",
      country_dial_code: "258",
      country_currency_name: "Mozambican metical",
      country_currency_symbol: "MT",
      country_currency_code: "MZN"
    },
    {
      country_id: "150",
      country_code: "MM",
      country_name: "Myanmar",
      country_dial_code: "95",
      country_currency_name: "Burmese kyat",
      country_currency_symbol: "Ks",
      country_currency_code: "MMK"
    },
    {
      country_id: "151",
      country_code: "NA",
      country_name: "Namibia",
      country_dial_code: "264",
      country_currency_name: "Namibian dollar",
      country_currency_symbol: "$",
      country_currency_code: "NAD"
    },
    {
      country_id: "152",
      country_code: "NR",
      country_name: "Nauru",
      country_dial_code: "674",
      country_currency_name: "Australian dollar",
      country_currency_symbol: "$",
      country_currency_code: "AUD"
    },
    {
      country_id: "153",
      country_code: "NP",
      country_name: "Nepal",
      country_dial_code: "977",
      country_currency_name: "Nepalese rupee",
      country_currency_symbol: "\u20a8",
      country_currency_code: "NPR"
    },
    {
      country_id: "154",
      country_code: "AN",
      country_name: "Netherlands Antilles",
      country_dial_code: "599",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "155",
      country_code: "NL",
      country_name: "Netherlands The",
      country_dial_code: "31",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "156",
      country_code: "NC",
      country_name: "New Caledonia",
      country_dial_code: "687",
      country_currency_name: "CFP franc",
      country_currency_symbol: "Fr",
      country_currency_code: "XPF"
    },
    {
      country_id: "157",
      country_code: "NZ",
      country_name: "New Zealand",
      country_dial_code: "64",
      country_currency_name: "New Zealand dollar",
      country_currency_symbol: "$",
      country_currency_code: "NZD"
    },
    {
      country_id: "158",
      country_code: "NI",
      country_name: "Nicaragua",
      country_dial_code: "505",
      country_currency_name: "Nicaraguan c\u00f3rdoba",
      country_currency_symbol: "C$",
      country_currency_code: "NIO"
    },
    {
      country_id: "159",
      country_code: "NE",
      country_name: "Niger",
      country_dial_code: "227",
      country_currency_name: "West African CFA fra",
      country_currency_symbol: "Fr",
      country_currency_code: "XOF"
    },
    {
      country_id: "160",
      country_code: "NG",
      country_name: "Nigeria",
      country_dial_code: "234",
      country_currency_name: "Nigerian naira",
      country_currency_symbol: "\u20a6",
      country_currency_code: "NGN"
    },
    {
      country_id: "161",
      country_code: "NU",
      country_name: "Niue",
      country_dial_code: "683",
      country_currency_name: "New Zealand dollar",
      country_currency_symbol: "$",
      country_currency_code: "NZD"
    },
    {
      country_id: "162",
      country_code: "NF",
      country_name: "Norfolk Island",
      country_dial_code: "672",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "163",
      country_code: "MP",
      country_name: "Northern Mariana Islands",
      country_dial_code: "1670",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "164",
      country_code: "NO",
      country_name: "Norway",
      country_dial_code: "47",
      country_currency_name: "Norwegian krone",
      country_currency_symbol: "kr",
      country_currency_code: "NOK"
    },
    {
      country_id: "165",
      country_code: "OM",
      country_name: "Oman",
      country_dial_code: "968",
      country_currency_name: "Omani rial",
      country_currency_symbol: "\u0631.\u0639.",
      country_currency_code: "OMR"
    },
    {
      country_id: "166",
      country_code: "PK",
      country_name: "Pakistan",
      country_dial_code: "92",
      country_currency_name: "Pakistani rupee",
      country_currency_symbol: "\u20a8",
      country_currency_code: "PKR"
    },
    {
      country_id: "167",
      country_code: "PW",
      country_name: "Palau",
      country_dial_code: "680",
      country_currency_name: "Palauan dollar",
      country_currency_symbol: "$",
      country_currency_code: null
    },
    {
      country_id: "168",
      country_code: "PS",
      country_name: "Palestinian Territory Occupied",
      country_dial_code: "970",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "169",
      country_code: "PA",
      country_name: "Panama",
      country_dial_code: "507",
      country_currency_name: "Panamanian balboa",
      country_currency_symbol: "B/.",
      country_currency_code: "PAB"
    },
    {
      country_id: "170",
      country_code: "PG",
      country_name: "Papua new Guinea",
      country_dial_code: "675",
      country_currency_name: "Papua New Guinean ki",
      country_currency_symbol: "K",
      country_currency_code: "PGK"
    },
    {
      country_id: "171",
      country_code: "PY",
      country_name: "Paraguay",
      country_dial_code: "595",
      country_currency_name: "Paraguayan guaran\u00ed",
      country_currency_symbol: "\u20b2",
      country_currency_code: "PYG"
    },
    {
      country_id: "172",
      country_code: "PE",
      country_name: "Peru",
      country_dial_code: "51",
      country_currency_name: "Peruvian nuevo sol",
      country_currency_symbol: "S/.",
      country_currency_code: "PEN"
    },
    {
      country_id: "173",
      country_code: "PH",
      country_name: "Philippines",
      country_dial_code: "63",
      country_currency_name: "Philippine peso",
      country_currency_symbol: "\u20b1",
      country_currency_code: "PHP"
    },
    {
      country_id: "174",
      country_code: "PN",
      country_name: "Pitcairn Island",
      country_dial_code: "0",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "175",
      country_code: "PL",
      country_name: "Poland",
      country_dial_code: "48",
      country_currency_name: "Polish z\u0142oty",
      country_currency_symbol: "z\u0142",
      country_currency_code: "PLN"
    },
    {
      country_id: "176",
      country_code: "PT",
      country_name: "Portugal",
      country_dial_code: "351",
      country_currency_name: "Euro",
      country_currency_symbol: "\u20ac",
      country_currency_code: "EUR"
    },
    {
      country_id: "177",
      country_code: "PR",
      country_name: "Puerto Rico",
      country_dial_code: "1787",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "178",
      country_code: "QA",
      country_name: "Qatar",
      country_dial_code: "974",
      country_currency_name: "Qatari riyal",
      country_currency_symbol: "\u0631.\u0642",
      country_currency_code: "QAR"
    },
    {
      country_id: "179",
      country_code: "RE",
      country_name: "Reunion",
      country_dial_code: "262",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "180",
      country_code: "RO",
      country_name: "Romania",
      country_dial_code: "40",
      country_currency_name: "Romanian leu",
      country_currency_symbol: "lei",
      country_currency_code: "RON"
    },
    {
      country_id: "181",
      country_code: "RU",
      country_name: "Russia",
      country_dial_code: "70",
      country_currency_name: "Russian ruble",
      country_currency_symbol: null,
      country_currency_code: "RUB"
    },
    {
      country_id: "182",
      country_code: "RW",
      country_name: "Rwanda",
      country_dial_code: "250",
      country_currency_name: "Rwandan franc",
      country_currency_symbol: "Fr",
      country_currency_code: "RWF"
    },
    {
      country_id: "183",
      country_code: "SH",
      country_name: "Saint Helena",
      country_dial_code: "290",
      country_currency_name: "Saint Helena pound",
      country_currency_symbol: "\u00a3",
      country_currency_code: "SHP"
    },
    {
      country_id: "184",
      country_code: "KN",
      country_name: "Saint Kitts And Nevis",
      country_dial_code: "1869",
      country_currency_name: "East Caribbean dolla",
      country_currency_symbol: "$",
      country_currency_code: "XCD"
    },
    {
      country_id: "185",
      country_code: "LC",
      country_name: "Saint Lucia",
      country_dial_code: "1758",
      country_currency_name: "East Caribbean dolla",
      country_currency_symbol: "$",
      country_currency_code: "XCD"
    },
    {
      country_id: "186",
      country_code: "PM",
      country_name: "Saint Pierre and Miquelon",
      country_dial_code: "508",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "187",
      country_code: "VC",
      country_name: "Saint Vincent And The Grenadines",
      country_dial_code: "1784",
      country_currency_name: "East Caribbean dolla",
      country_currency_symbol: "$",
      country_currency_code: "XCD"
    },
    {
      country_id: "188",
      country_code: "WS",
      country_name: "Samoa",
      country_dial_code: "684",
      country_currency_name: "Samoan t\u0101l\u0101",
      country_currency_symbol: "T",
      country_currency_code: "WST"
    },
    {
      country_id: "189",
      country_code: "SM",
      country_name: "San Marino",
      country_dial_code: "378",
      country_currency_name: "Euro",
      country_currency_symbol: "\u20ac",
      country_currency_code: "EUR"
    },
    {
      country_id: "190",
      country_code: "ST",
      country_name: "Sao Tome and Principe",
      country_dial_code: "239",
      country_currency_name: "S\u00e3o Tom\u00e9 and Pr\u00edn",
      country_currency_symbol: "Db",
      country_currency_code: "STD"
    },
    {
      country_id: "191",
      country_code: "SA",
      country_name: "Saudi Arabia",
      country_dial_code: "966",
      country_currency_name: "Saudi riyal",
      country_currency_symbol: "\u0631.\u0633",
      country_currency_code: "SAR"
    },
    {
      country_id: "192",
      country_code: "SN",
      country_name: "Senegal",
      country_dial_code: "221",
      country_currency_name: "West African CFA fra",
      country_currency_symbol: "Fr",
      country_currency_code: "XOF"
    },
    {
      country_id: "193",
      country_code: "RS",
      country_name: "Serbia",
      country_dial_code: "381",
      country_currency_name: "Serbian dinar",
      country_currency_symbol: "\u0434\u0438\u043d. or din.",
      country_currency_code: "RSD"
    },
    {
      country_id: "194",
      country_code: "SC",
      country_name: "Seychelles",
      country_dial_code: "248",
      country_currency_name: "Seychellois rupee",
      country_currency_symbol: "\u20a8",
      country_currency_code: "SCR"
    },
    {
      country_id: "195",
      country_code: "SL",
      country_name: "Sierra Leone",
      country_dial_code: "232",
      country_currency_name: "Sierra Leonean leone",
      country_currency_symbol: "Le",
      country_currency_code: "SLL"
    },
    {
      country_id: "196",
      country_code: "SG",
      country_name: "Singapore",
      country_dial_code: "65",
      country_currency_name: "Brunei dollar",
      country_currency_symbol: "$",
      country_currency_code: "BND"
    },
    {
      country_id: "197",
      country_code: "SK",
      country_name: "Slovakia",
      country_dial_code: "421",
      country_currency_name: "Euro",
      country_currency_symbol: "\u20ac",
      country_currency_code: "EUR"
    },
    {
      country_id: "198",
      country_code: "SI",
      country_name: "Slovenia",
      country_dial_code: "386",
      country_currency_name: "Euro",
      country_currency_symbol: "\u20ac",
      country_currency_code: "EUR"
    },
    {
      country_id: "199",
      country_code: "XG",
      country_name: "Smaller Territories of the UK",
      country_dial_code: "44",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "200",
      country_code: "SB",
      country_name: "Solomon Islands",
      country_dial_code: "677",
      country_currency_name: "Solomon Islands doll",
      country_currency_symbol: "$",
      country_currency_code: "SBD"
    },
    {
      country_id: "201",
      country_code: "SO",
      country_name: "Somalia",
      country_dial_code: "252",
      country_currency_name: "Somali shilling",
      country_currency_symbol: "Sh",
      country_currency_code: "SOS"
    },
    {
      country_id: "202",
      country_code: "ZA",
      country_name: "South Africa",
      country_dial_code: "27",
      country_currency_name: "South African rand",
      country_currency_symbol: "R",
      country_currency_code: "ZAR"
    },
    {
      country_id: "203",
      country_code: "GS",
      country_name: "South Georgia",
      country_dial_code: "0",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "204",
      country_code: "SS",
      country_name: "South Sudan",
      country_dial_code: "211",
      country_currency_name: "South Sudanese pound",
      country_currency_symbol: "\u00a3",
      country_currency_code: "SSP"
    },
    {
      country_id: "205",
      country_code: "ES",
      country_name: "Spain",
      country_dial_code: "34",
      country_currency_name: "Euro",
      country_currency_symbol: "\u20ac",
      country_currency_code: "EUR"
    },
    {
      country_id: "206",
      country_code: "LK",
      country_name: "Sri Lanka",
      country_dial_code: "94",
      country_currency_name: "Sri Lankan rupee",
      country_currency_symbol: "Rs or \u0dbb\u0dd4",
      country_currency_code: "LKR"
    },
    {
      country_id: "207",
      country_code: "SD",
      country_name: "Sudan",
      country_dial_code: "249",
      country_currency_name: "Sudanese pound",
      country_currency_symbol: "\u062c.\u0633.",
      country_currency_code: "SDG"
    },
    {
      country_id: "208",
      country_code: "SR",
      country_name: "Suriname",
      country_dial_code: "597",
      country_currency_name: "Surinamese dollar",
      country_currency_symbol: "$",
      country_currency_code: "SRD"
    },
    {
      country_id: "209",
      country_code: "SJ",
      country_name: "Svalbard And Jan Mayen Islands",
      country_dial_code: "47",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "210",
      country_code: "SZ",
      country_name: "Swaziland",
      country_dial_code: "268",
      country_currency_name: "Swazi lilangeni",
      country_currency_symbol: "L",
      country_currency_code: "SZL"
    },
    {
      country_id: "211",
      country_code: "SE",
      country_name: "Sweden",
      country_dial_code: "46",
      country_currency_name: "Swedish krona",
      country_currency_symbol: "kr",
      country_currency_code: "SEK"
    },
    {
      country_id: "212",
      country_code: "CH",
      country_name: "Switzerland",
      country_dial_code: "41",
      country_currency_name: "Swiss franc",
      country_currency_symbol: "Fr",
      country_currency_code: "CHF"
    },
    {
      country_id: "213",
      country_code: "SY",
      country_name: "Syria",
      country_dial_code: "963",
      country_currency_name: "Syrian pound",
      country_currency_symbol: "\u00a3 or \u0644.\u0633",
      country_currency_code: "SYP"
    },
    {
      country_id: "214",
      country_code: "TW",
      country_name: "Taiwan",
      country_dial_code: "886",
      country_currency_name: "New Taiwan dollar",
      country_currency_symbol: "$",
      country_currency_code: "TWD"
    },
    {
      country_id: "215",
      country_code: "TJ",
      country_name: "Tajikistan",
      country_dial_code: "992",
      country_currency_name: "Tajikistani somoni",
      country_currency_symbol: "\u0405\u041c",
      country_currency_code: "TJS"
    },
    {
      country_id: "216",
      country_code: "TZ",
      country_name: "Tanzania",
      country_dial_code: "255",
      country_currency_name: "Tanzanian shilling",
      country_currency_symbol: "Sh",
      country_currency_code: "TZS"
    },
    {
      country_id: "217",
      country_code: "TH",
      country_name: "Thailand",
      country_dial_code: "66",
      country_currency_name: "Thai baht",
      country_currency_symbol: "\u0e3f",
      country_currency_code: "THB"
    },
    {
      country_id: "218",
      country_code: "TG",
      country_name: "Togo",
      country_dial_code: "228",
      country_currency_name: "West African CFA fra",
      country_currency_symbol: "Fr",
      country_currency_code: "XOF"
    },
    {
      country_id: "219",
      country_code: "TK",
      country_name: "Tokelau",
      country_dial_code: "690",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "220",
      country_code: "TO",
      country_name: "Tonga",
      country_dial_code: "676",
      country_currency_name: "Tongan pa\u02bbanga",
      country_currency_symbol: "T$",
      country_currency_code: "TOP"
    },
    {
      country_id: "221",
      country_code: "TT",
      country_name: "Trinidad And Tobago",
      country_dial_code: "1868",
      country_currency_name: "Trinidad and Tobago ",
      country_currency_symbol: "$",
      country_currency_code: "TTD"
    },
    {
      country_id: "222",
      country_code: "TN",
      country_name: "Tunisia",
      country_dial_code: "216",
      country_currency_name: "Tunisian dinar",
      country_currency_symbol: "\u062f.\u062a",
      country_currency_code: "TND"
    },
    {
      country_id: "223",
      country_code: "TR",
      country_name: "Turkey",
      country_dial_code: "90",
      country_currency_name: "Turkish lira",
      country_currency_symbol: null,
      country_currency_code: "TRY"
    },
    {
      country_id: "224",
      country_code: "TM",
      country_name: "Turkmenistan",
      country_dial_code: "7370",
      country_currency_name: "Turkmenistan manat",
      country_currency_symbol: "m",
      country_currency_code: "TMT"
    },
    {
      country_id: "225",
      country_code: "TC",
      country_name: "Turks And Caicos Islands",
      country_dial_code: "1649",
      country_currency_name: "United States dollar",
      country_currency_symbol: "$",
      country_currency_code: "USD"
    },
    {
      country_id: "226",
      country_code: "TV",
      country_name: "Tuvalu",
      country_dial_code: "688",
      country_currency_name: "Australian dollar",
      country_currency_symbol: "$",
      country_currency_code: "AUD"
    },
    {
      country_id: "227",
      country_code: "UG",
      country_name: "Uganda",
      country_dial_code: "256",
      country_currency_name: "Ugandan shilling",
      country_currency_symbol: "Sh",
      country_currency_code: "UGX"
    },
    {
      country_id: "228",
      country_code: "UA",
      country_name: "Ukraine",
      country_dial_code: "380",
      country_currency_name: "Ukrainian hryvnia",
      country_currency_symbol: "\u20b4",
      country_currency_code: "UAH"
    },
    {
      country_id: "229",
      country_code: "AE",
      country_name: "United Arab Emirates",
      country_dial_code: "971",
      country_currency_name: "United Arab Emirates",
      country_currency_symbol: "\u062f.\u0625",
      country_currency_code: "AED"
    },
    {
      country_id: "230",
      country_code: "GB",
      country_name: "United Kingdom",
      country_dial_code: "44",
      country_currency_name: "British pound",
      country_currency_symbol: "\u00a3",
      country_currency_code: "GBP"
    },
    {
      country_id: "231",
      country_code: "US",
      country_name: "United States",
      country_dial_code: "1",
      country_currency_name: "United States dollar",
      country_currency_symbol: "$",
      country_currency_code: "USD"
    },
    {
      country_id: "232",
      country_code: "UM",
      country_name: "United States Minor Outlying Islands",
      country_dial_code: "1",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "233",
      country_code: "UY",
      country_name: "Uruguay",
      country_dial_code: "598",
      country_currency_name: "Uruguayan peso",
      country_currency_symbol: "$",
      country_currency_code: "UYU"
    },
    {
      country_id: "234",
      country_code: "UZ",
      country_name: "Uzbekistan",
      country_dial_code: "998",
      country_currency_name: "Uzbekistani som",
      country_currency_symbol: null,
      country_currency_code: "UZS"
    },
    {
      country_id: "235",
      country_code: "VU",
      country_name: "Vanuatu",
      country_dial_code: "678",
      country_currency_name: "Vanuatu vatu",
      country_currency_symbol: "Vt",
      country_currency_code: "VUV"
    },
    {
      country_id: "236",
      country_code: "VA",
      country_name: "Vatican City State (Holy See)",
      country_dial_code: "39",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "237",
      country_code: "VE",
      country_name: "Venezuela",
      country_dial_code: "58",
      country_currency_name: "Venezuelan bol\u00edvar",
      country_currency_symbol: "Bs F",
      country_currency_code: "VEF"
    },
    {
      country_id: "238",
      country_code: "VN",
      country_name: "Vietnam",
      country_dial_code: "84",
      country_currency_name: "Vietnamese \u0111\u1ed3ng",
      country_currency_symbol: "\u20ab",
      country_currency_code: "VND"
    },
    {
      country_id: "239",
      country_code: "VG",
      country_name: "Virgin Islands (British)",
      country_dial_code: "1284",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "240",
      country_code: "VI",
      country_name: "Virgin Islands (US)",
      country_dial_code: "1340",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "241",
      country_code: "WF",
      country_name: "Wallis And Futuna Islands",
      country_dial_code: "681",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "242",
      country_code: "EH",
      country_name: "Western Sahara",
      country_dial_code: "212",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "243",
      country_code: "YE",
      country_name: "Yemen",
      country_dial_code: "967",
      country_currency_name: "Yemeni rial",
      country_currency_symbol: "\ufdfc",
      country_currency_code: "YER"
    },
    {
      country_id: "244",
      country_code: "YU",
      country_name: "Yugoslavia",
      country_dial_code: "38",
      country_currency_name: null,
      country_currency_symbol: null,
      country_currency_code: null
    },
    {
      country_id: "245",
      country_code: "ZM",
      country_name: "Zambia",
      country_dial_code: "260",
      country_currency_name: "Zambian kwacha",
      country_currency_symbol: "ZK",
      country_currency_code: "ZMW"
    },
    {
      country_id: "246",
      country_code: "ZW",
      country_name: "Zimbabwe",
      country_dial_code: "263",
      country_currency_name: "Botswana pula",
      country_currency_symbol: "P",
      country_currency_code: "BWP"
    }
  ];

  public currencies:string[] = [];

  constructor() {
    this.currencies = this.getCurrency();
   }

  getCurrency(): string[] {

    var flags:boolean[] = [], output:string[] = [], length:number = this.data.length;
    for (let i:number = 0; i < length; i++) {
      if (flags[this.data[i].country_currency_name]) continue;
      flags[this.data[i].country_currency_name] = true;
      output.push(this.data[i].country_currency_name);
    }

    return output;

  }
}
