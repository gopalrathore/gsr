declare interface stateElement {
  state_code: string;
  state_name: string;
}

export class StateList {
  public state: object = {
    10: "Bihar",
    11: "Sikkim",
    12: "Arunanchal Pradesh",
    13: "Nagaland",
    14: "Manipur",
    15: "Mizoram",
    16: "Tripura",
    17: "Meghalaya",
    18: "Assam",
    19: "West Bengal",
    20: "Jharkhand",
    21: "Odisha",
    22: "Chattisgardh",
    23: "Madhya Pradesh",
    24: "Gujarat",
    25: "Daman & Diu",
    26: "Dadra & Nagar Haveli",
    27: "Maharashtra",
    29: "Karnataka",
    30: "Goa",
    31: "Lakshdweep",
    32: "Kerela",
    33: "Tamil Nadu",
    34: "Pondicherry",
    35: "Andaman & Nicobar Islands",
    36: "Telengana",
    37: "Andhra Pradesh",
    98: "Other Territory",
    4: "Chandigarh",
    7: "Delhi",
    6: "Haryana",
    2: "Himachal Pradesh",
    1: "Jammu and Kashmir",
    3: "Punjab",
    8: "Rajasthan",
    9: "Uttar Pradesh",
    5: "Uttarakhand"
  };

  public data:stateElement[] = [
    {
      state_code: "35",
      state_name: "Andaman & Nicobar Islands"
    },
    {
      state_code: "37",
      state_name: "Andhra Pradesh"
    },
    {
      state_code: "12",
      state_name: "Arunanchal Pradesh"
    },
    {
      state_code: "18",
      state_name: "Assam"
    },
    {
      state_code: "10",
      state_name: "Bihar"
    },
    {
      state_code: "04",
      state_name: "Chandigarh"
    },
    {
      state_code: "22",
      state_name: "Chattisgardh"
    },
    {
      state_code: "26",
      state_name: "Dadra & Nagar Haveli"
    },
    {
      state_code: "25",
      state_name: "Daman & Diu"
    },
    {
      state_code: "07",
      state_name: "Delhi"
    },
    {
      state_code: "30",
      state_name: "Goa"
    },
    {
      state_code: "24",
      state_name: "Gujarat"
    },
    {
      state_code: "06",
      state_name: "Haryana"
    },
    {
      state_code: "02",
      state_name: "Himachal Pradesh"
    },
    {
      state_code: "01",
      state_name: "Jammu and Kashmir"
    },
    {
      state_code: "20",
      state_name: "Jharkhand"
    },
    {
      state_code: "29",
      state_name: "Karnataka"
    },
    {
      state_code: "32",
      state_name: "Kerela"
    },
    {
      state_code: "31",
      state_name: "Lakshdweep"
    },
    {
      state_code: "23",
      state_name: "Madhya Pradesh"
    },
    {
      state_code: "27",
      state_name: "Maharashtra"
    },
    {
      state_code: "14",
      state_name: "Manipur"
    },
    {
      state_code: "17",
      state_name: "Meghalaya"
    },
    {
      state_code: "15",
      state_name: "Mizoram"
    },
    {
      state_code: "13",
      state_name: "Nagaland"
    },
    {
      state_code: "21",
      state_name: "Odisha"
    },
    {
      state_code: "98",
      state_name: "Other Territory"
    },
    {
      state_code: "34",
      state_name: "Pondicherry"
    },
    {
      state_code: "03",
      state_name: "Punjab"
    },
    {
      state_code: "08",
      state_name: "Rajasthan"
    },
    {
      state_code: "11",
      state_name: "Sikkim"
    },
    {
      state_code: "33",
      state_name: "Tamil Nadu"
    },
    {
      state_code: "36",
      state_name: "Telengana"
    },
    {
      state_code: "16",
      state_name: "Tripura"
    },
    {
      state_code: "09",
      state_name: "Uttar Pradesh"
    },
    {
      state_code: "05",
      state_name: "Uttarakhand"
    },
    {
      state_code: "19",
      state_name: "West Bengal"
    }
  ];

  constructor() { }

  public getStateName(code:string):string {
    let stateName:stateElement[] = this.data.filter(state => {
      if (state["state_code"] === code) {
        return state["state_name"];
      }
    });
    return stateName[0] ? stateName[0].state_name : '';
  }
}
