
export class BulkGeneratorHelper{

  public static groupbyMongo(data:any):any{    
    let returnObj ={};

    for (const row of data) {
      if(row['mongo_id'] === undefined) continue;
      if(returnObj[row['mongo_id']] === undefined) returnObj[row['mongo_id']] = [];
      returnObj[row['mongo_id']].push(row['index']);
    }
    console.log("groupbyMongo : returnObj", returnObj);
    
    return returnObj;
  }

  public static fitToUpdateStructure(data:any):any{
    let sample = {
      "mongo_id":"",
      "validRowIndex":[]
    };

    let returnData:any[] = []

    for (let key in data) {
      let tempSample = JSON.parse(JSON.stringify(sample))
      tempSample['mongo_id'] = key;
      tempSample['validRowIndex'] = data[key];

      returnData.push(tempSample);
    }

    console.log('fitToUpdateStructure', returnData);
    
    return returnData;
  }
}