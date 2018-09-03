import { indices } from './indices';

export class JsonMaker extends indices {

  private version:string = "1.0.0618"; 

  public ewayNestedMap(data: any) {
    let tempItemList: any = {};
    let tempEwayBillData: any = {};
    let key: string = this.primarykey;
    let finalData = [];
    

    for (let index = 0; index < data.length; index++) {
      let row = JSON.parse(JSON.stringify(data[index]));
      if (tempItemList[data[index][key]] == undefined)
        tempItemList[data[index][key]] = [];
      tempItemList[data[index][key]].push(this.getItemProperties(row));

      row = JSON.parse(JSON.stringify(data[index]));
      if (tempEwayBillData[data[index][key]] === undefined)
        tempEwayBillData[data[index][key]] = this.getNonItemProperties(row);
    }

    for (let PkeyValue in tempItemList) {
      let EwaybillJson: any = {};
      EwaybillJson["itemlist"] = tempItemList[PkeyValue];
      tempEwayBillData[PkeyValue];

      EwaybillJson = {
        ...tempEwayBillData[PkeyValue],
        ...EwaybillJson
      };

      finalData.push(EwaybillJson);      
    }

    return finalData;
  }

  private getItemProperties(row: any) {
    for (let key in row) {
      if (this.defaultEwaybillItems.indexOf(key) < 0) delete row[key];
    }
    return row;
  }

  private getNonItemProperties(row: any) {
    for (let key in row) {
      if (this.defaultEwaybillItems.indexOf(key) >= 0) delete row[key];
    }
    return row;
  }

  generateDownloadableJson(data:any[]){
    return {
      version: this.version,
      billLists: data
    };
  }


}