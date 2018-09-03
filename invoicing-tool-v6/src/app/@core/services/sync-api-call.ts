import { StatusCodes } from "../dataset/dataset";

interface ResponseObject {
  data: object;
  message: string;
  statusCode:number;
}

declare var $:any;

export class SyncApiCall {

  // Base url for your API
  // public static masterLink: string = "http://192.168.0.112/gstedge/invoice_backend/api.v2";
  // public static masterLink: string = "http://localhost/gstedge/invoice_backend/api.php";
  public static masterLink: string = "http://54.164.109.181/invoice_backend/api.php";

  // Pre defined headers which will be sent to all API calls
  private static preDefinedHeader:object = {
    'Action-Requested':'undefined',
    'Access-Token': 'undefined',
    'Payload-Encryption': 'None'
  }

  /**
   * 
   * @param param: to be assigned to Action-Requested header
   * @param data: to send with API call
   */
  public static get(param:string, data:object):ResponseObject{
    return SyncApiCall.apiCall('GET', param, data);
  }

  /**
   * 
   * @param param: to be assigned to Action-Requested header
   * @param data: to send with API call
   */
  public static post(param:string, data:object):ResponseObject{
    return SyncApiCall.apiCall('POST', param, data);
  }

   /**
   * 
   * @param param: to be assigned to Action-Requested header
   * @param data: to send with API call
   */
  public static put(param:string, data:object):ResponseObject{
    return SyncApiCall.apiCall('PUT', param, data);
  }

   /**
   * 
   * @param param: to be assigned to Action-Requested header
   * @param data: to send with API call
   */
  public static delete(param:string, data:object):ResponseObject{
    return SyncApiCall.apiCall('DELETE', param, data);
  }

   /**
   * 
   * @param param: to be assigned to Action-Requested header
   * @param data: to send with API call
   */
  public static patch(param:string, data:object):ResponseObject{
    return SyncApiCall.apiCall('PATCH', param, data);
  }

   /**
   * 
   * @param param: to be assigned to Action-Requested header
   * @param data: to send with API call
   */
  public static view(param:string, data:object):ResponseObject{
    return SyncApiCall.apiCall('VIEW', param, data);
  }

  /**
   * 
   * @param method: Type of method you want to access your API with
   * @param param: to be assigned to Action-Requested header
   * @param data: to send with API call
   */
  private static apiCall(method:string, param:string, data:object = {}):ResponseObject{

    let returnData:ResponseObject;

    let url:string = SyncApiCall.masterLink;
    SyncApiCall.updateHeaderToken();
    SyncApiCall.preDefinedHeader['Action-Requested'] = param;
    
    $.ajax({
      data: (method==='GET') ? data : JSON.stringify(data),
      contentType: "application/json",
      url: url,
      type: method,
      headers: SyncApiCall.preDefinedHeader,
      async: false,
      error:function(error){    
        StatusCodes.logStatusCode(error.status);        
        returnData = SyncApiCall.responseJsonParser(error.responseText, error.status);
      },
      success:function(data,unused,statusCode){ 
        console.log("success");
        
        StatusCodes.logStatusCode(statusCode.status);
        returnData = SyncApiCall.responseJsonParser(data,statusCode.status);
      }
    });

    return returnData;
  }

  /**
   * 
   * @param responseString: any response from the API call
   * @param statusCode: status code returned by API call
   */
  private static responseJsonParser(responseString:string, statusCode:number):ResponseObject{
    let response:ResponseObject = {
      data: [],
      message: 'Internal server error.',
      statusCode: statusCode
    }

    let receiveResponse:object;

    try {
      if(typeof(responseString) === "string" || responseString==undefined){
        receiveResponse = JSON.parse(responseString);
      } else receiveResponse = responseString;
    }
    catch(e){
      response.statusCode = 500;
      return response;
    }

    response.message = (receiveResponse['message'] !== undefined) ? receiveResponse['message'] : 'No message received';

    if(receiveResponse['data'] !== undefined ) response.data = receiveResponse['data'];

    return response;
  }

  /**
   * Update the header(Access-Token) before making API call
   */
  public static updateHeaderToken():boolean{
      let headerToken = localStorage.getItem('invoice-tool-v2.0.1');
      console.log("token", headerToken);
      
      if(typeof(headerToken)==='string'){
        this.preDefinedHeader['Access-Token'] = headerToken;
        return true;      
      }else return false;
  }

}