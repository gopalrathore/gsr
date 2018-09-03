export class Utility {
  public static mergeData(sessionData: any[]): any[] {
    let tableData = [];

    sessionData.map((item, index) => {
      for (let i = 0; i < item.excelProcessedData.segregatedData.valid.length; i++) {
        item.excelProcessedData.segregatedData.valid[i]['mongo_id'] = item._id;
        item.excelProcessedData.segregatedData.valid[i]['index'] = i;
        item.excelProcessedData.segregatedData.valid[i]['row_id'] = `${index}.${i}`;
        tableData.push(item.excelProcessedData.segregatedData.valid[i]);
      }
    });    

    return tableData
  }

  public static filterTableData(json){

    let filteredData = json.filter((item) => {

      let copy_to: boolean = true;
      
      if (item.transMode === null || item.transMode === undefined || item.transMode === '0') {
        copy_to = false;
      }          

      else if (item.transMode === '1') {
        let transporterIdLength: number = item.transporterId === null ? 0 : (item.transporterId.toString()).length;
        let transDocDateLength: number = item.transDocDate === null ? 0 : (item.transDocDate.toString()).length;
        let vehicleNoLength: number = item.vehicleNo === null ? 0 : (item.vehicleNo.toString()).length;
        if ((transporterIdLength === 0 && transDocDateLength === 0 && vehicleNoLength === 0) || (vehicleNoLength === 0 && transDocDateLength === 0) || (vehicleNoLength === 0 && transporterIdLength === 0)) {
          copy_to = false;
        }
      } else {
        let transDocDateLength: number = item.transDocDate === null ? 0 : (item.transDocDate.toString()).length;
        let transDocNoLength: number = item.transDocNo === null ? 0 : (item.transDocNo.toString()).length;
        if (transDocNoLength === 0 && transDocDateLength === 0) {
          copy_to = false;
        }
      }
      return copy_to;
    });
    return filteredData;
  }

  getMapedData(){
    
  }
}