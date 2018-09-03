
import { Observable } from 'rxjs';
import { StatusCodes } from "../dataset/dataset";

interface ResponseObject {
  data: object;
  message: string;
  statusCode:number;
}

declare var $:any;

export class AsyncApiCall {

    // Base url for your API
    // public static masterLink: string = "http://192.168.0.112/gstedge/invoice_backend/api.v2";
    // public static masterLink: string = "http://localhost/gstedge/invoice_backend/api.php";
    public static masterLink: string = "http://54.164.109.181/invoice_backend/api.php";
    private static uploadDocLink:string = "https://hyb9fz2b05.execute-api.us-east-1.amazonaws.com/default/invoice-upload"

    public static downloadFileLink:string = "http://54.164.109.181/invoice_backend/";
    // public static downloadFileLink: string = "http://localhost/gstedge/invoice_backend/";
    // public static downloadFileLink: string = "http://192.168.0.109/gstedge/invoice_backend/";

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
    public static get(param:string, data:object):Observable<any>{
      return AsyncApiCall.apiCall('GET', param, data);
    }
  
    /**
     * 
     * @param param: to be assigned to Action-Requested header
     * @param data: to send with API call
     */
    public static post(param:string, data:object):Observable<any>{
      return AsyncApiCall.apiCall('POST', param, data);
    }
  
     /**
     * 
     * @param param: to be assigned to Action-Requested header
     * @param data: to send with API call
     */
    public static put(param:string, data:object):Observable<any>{
      return AsyncApiCall.apiCall('PUT', param, data);
    }
  
     /**
     * 
     * @param param: to be assigned to Action-Requested header
     * @param data: to send with API call
     */
    public static delete(param:string, data:object):Observable<any>{
      return AsyncApiCall.apiCall('DELETE', param, data);
    }
  
     /**
     * 
     * @param param: to be assigned to Action-Requested header
     * @param data: to send with API call
     */
    public static patch(param:string, data:object):Observable<any>{
      return AsyncApiCall.apiCall('PATCH', param, data);
    }
  
     /**
     * 
     * @param param: to be assigned to Action-Requested header
     * @param data: to send with API call
     */
    public static view(param:string, data:object):Observable<any>{
      return AsyncApiCall.apiCall('VIEW', param, data);
    }
  
    /**
     * 
     * @param method: Type of method you want to access your API with
     * @param param: to be assigned to Action-Requested header
     * @param data: to send with API call
     */
    private static apiCall(method:string, param:string, data:object = {}):Observable<any>{

      AsyncApiCall.updateHeaderToken();
  
      let header:object = {
        ...AsyncApiCall.preDefinedHeader,
        'Action-Requested': param
      }
  
      let returnData:ResponseObject;
  
      let url:string = AsyncApiCall.masterLink;
      

      console.log("creating observable");
      

      return new Observable((observer) => {
        console.log("making ajax call");
        
        $.ajax({
          data: (method==='GET') ? data : JSON.stringify(data),
          contentType: "application/json",
          url: url,
          type: method,
          headers: header,
          async: true,
          error:function(error){    
            StatusCodes.logStatusCode(error.status);        
            returnData = AsyncApiCall.responseJsonParser(error.responseText, error.status);            
            observer.next(returnData)
            observer.complete()
          },
          success:function(data,unused,statusCode){
            console.log("success");            
            StatusCodes.logStatusCode(statusCode.status);
            returnData = AsyncApiCall.responseJsonParser(data,statusCode.status);
            observer.next(returnData)
            observer.complete()
          }
        });
    })
    }

    /**
     * 
     * @param link: url you want to access your API with
     * @param data: to send with API call
     */
    public static customGet(link:string, data?:object):Observable<any>{
  
    
  
      let returnData:ResponseObject;
  
      let url:string = link;

      console.log("creating observable");
      

      return new Observable((observer) => {
        console.log("making ajax call");
        
        $.ajax({
          url: url,
          type: 'GET',
          error:function(error){   
            console.log("error aa gaya");
             
            StatusCodes.logStatusCode(error.status);        
            returnData = AsyncApiCall.responseJsonParser(error.responseText, error.status);            
            observer.next(returnData)
            observer.complete()
          },
          success:function(data,unused,statusCode){
            console.log("success");            
            StatusCodes.logStatusCode(statusCode.status);
            returnData = {
              data: data,
              message: "Bank detail found.",
              statusCode: statusCode.status
            }
            observer.next(returnData)
            observer.complete()
          }
        });
    })
    }

    /**
     * 
     * @param data: to send with API call
     */
    public static uploadDoc(data:object):Observable<any>{
      let returnData:any;
  
      let url:string = this.uploadDocLink;

      console.log("creating observable");
      

      return new Observable((observer) => {
        console.log("making ajax call");
        
        $.ajax({
          data: JSON.stringify(data),
          contentType: "application/json",
          url: url,
          type: "POST",
          async: true,
          error:function(error){    
            StatusCodes.logStatusCode(error.status);        
            returnData = AsyncApiCall.responseJsonParser(error.responseText, error.status);            
            observer.next(returnData)
            observer.complete()
          },
          success:function(data,unused,statusCode){           
            StatusCodes.logStatusCode(statusCode.status);
            returnData  = {
              data: data.resp,
              statusCode: statusCode.status
            }
            observer.next(returnData)
            observer.complete()
          }
        });
    })
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
        if(typeof(responseString) == "string" || responseString==undefined){
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
      if(typeof(headerToken)==='string'){
        this.preDefinedHeader['Access-Token'] = headerToken;
        return true;     
      }else return false;
    }

}