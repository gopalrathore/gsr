
import { Observable } from 'rxjs';
import { StatusCodes } from "../dataset/dataset";

interface ResponseObject {
  data: object;
  message: string;
  statusCode: number;
}

declare var $: any;

export class AsyncApiCall {

  // Base url for your API
  // public static masterLink: string = "http://192.168.0.118/gstedge/eway-bill-backend-php-v2.0/api.php";
  // public static masterLink: string = "http://localhost/gstedge/eway-bill-backend-php-v2.0/api.php";
  public static masterLink: string = "http://34.205.74.37/eway-bill-backend-php-v2.0/api.php";

  // public static errorFileLink: string = "http://192.168.0.106/gstedge/eway-bill-backend-php-v2.0/";
  // public static errorFileLink: string = "http://localhost/gstedge/eway-bill-backend-php-v2.0/";
  public static errorFileLink: string = "http://34.205.74.37/eway-bill-backend-php-v2.0/";

  // Pre defined headers which will be sent to all API calls
  private static preDefinedHeader: object = {
    'Action-Requested': 'undefined',
    'Access-Token': 'undefined',
    'Payload-Encryption': 'None'
  }

  /**
   * 
   * @param param: to be assigned to Action-Requested header
   * @param data: to send with API call
   */
  public static get(param: string, data: object): Observable<any> {
    return AsyncApiCall.apiCall('GET', param, data);
  }

  /**
   * 
   * @param param: to be assigned to Action-Requested header
   * @param data: to send with API call
   */
  public static post(param: string, data: object): Observable<any> {
    return AsyncApiCall.apiCall('POST', param, data);
  }

  /**
  * 
  * @param param: to be assigned to Action-Requested header
  * @param data: to send with API call
  */
  public static put(param: string, data: object): Observable<any> {
    return AsyncApiCall.apiCall('PUT', param, data);
  }

  /**
  * 
  * @param param: to be assigned to Action-Requested header
  * @param data: to send with API call
  */
  public static delete(param: string, data: object): Observable<any> {
    return AsyncApiCall.apiCall('DELETE', param, data);
  }

  /**
  * 
  * @param param: to be assigned to Action-Requested header
  * @param data: to send with API call
  */
  public static patch(param: string, data: object): Observable<any> {
    return AsyncApiCall.apiCall('PATCH', param, data);
  }

  /**
  * 
  * @param param: to be assigned to Action-Requested header
  * @param data: to send with API call
  */
  public static uploadFile(param: string, data: object): Observable<any> {
    return AsyncApiCall.upload(param, data);
  }

  /**
  * 
  * @param param: to be assigned to Action-Requested header
  * @param data: to send with API call
  */
  public static view(param: string, data: object): Observable<any> {
    return AsyncApiCall.apiCall('VIEW', param, data);
  }

  /**
   * 
   * @param method: Type of method you want to access your API with
   * @param param: to be assigned to Action-Requested header
   * @param data: to send with API call
   */
  private static apiCall(method: string, param: string, data: object = {}): Observable<any> {
    console.log("method", method, "param",param, "data",data);
    

    AsyncApiCall.updateHeaderToken();

    let header: object = {
      ...AsyncApiCall.preDefinedHeader,
      'Action-Requested': param
    }

    let returnData: ResponseObject;

    let url: string = AsyncApiCall.masterLink;


    console.log("creating observable");


    return new Observable((observer) => {
      console.log("making ajax call", header);

      $.ajax({
        data: (method === 'GET') ? data : JSON.stringify(data),
        contentType: "application/json",
        url: url,
        type: method,
        headers: header,
        async: true,
        error: function (error) {
          StatusCodes.logStatusCode(error.status);
          returnData = AsyncApiCall.responseJsonParser(error.responseText, error.status);
          observer.next(returnData)
          observer.complete()
        },
        success: function (data, unused, statusCode) {
          console.log("success");
          StatusCodes.logStatusCode(statusCode.status);
          returnData = AsyncApiCall.responseJsonParser(data, statusCode.status);
          observer.next(returnData)
          observer.complete()
        }
      });
    })
  }

  /**
   * 
   * @param param: to be assigned to Action-Requested header
   * @param data: to send with API call
   */
  private static upload(param: string, data: object = {}): Observable<any> {
    

    AsyncApiCall.updateHeaderToken();

    let header: object = {
      ...AsyncApiCall.preDefinedHeader,
      'Action-Requested': param
    }

    let returnData: ResponseObject;

    let url: string = AsyncApiCall.masterLink;


    console.log("creating observable");


    return new Observable((observer) => {
      console.log("making ajax call", header);

      $.ajax({
        data: data,
        contentType: false,
        url: url,
        type: 'POST',
        cache: false,
        headers: header,
        processData: false,
        error: function (error) {
          StatusCodes.logStatusCode(error.status);
          returnData = AsyncApiCall.responseJsonParser(error.responseText, error.status);
          observer.next(returnData)
          observer.complete()
        },
        success: function (data, unused, statusCode) {
          console.log("success");
          StatusCodes.logStatusCode(statusCode.status);
          returnData = AsyncApiCall.responseJsonParser(data, statusCode.status);
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
  public static customGet(link: string, data?: object): Observable<any> {



    let returnData: ResponseObject;

    let url: string = link;

    console.log("creating observable");


    return new Observable((observer) => {
      console.log("making ajax call");

      $.ajax({
        url: url,
        type: 'GET',
        error: function (error) {
          console.log("error aa gaya");

          StatusCodes.logStatusCode(error.status);
          returnData = AsyncApiCall.responseJsonParser(error.responseText, error.status);
          observer.next(returnData)
          observer.complete()
        },
        success: function (data, unused, statusCode) {
          console.log("success");
          StatusCodes.logStatusCode(statusCode.status);
          returnData = {
            data: data,
            message: "Data detail found.",
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
   * @param link: url you want to access your API with
   * @param data: to send with API call
   */
  public static customPost(link: string, data: object): Observable<any> {



    let returnData: ResponseObject;

    let url: string = link;

    console.log("creating observable");


    return new Observable((observer) => {
      console.log("making ajax call", data);

      $.ajax({
        data: JSON.stringify(data),
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        async: true,
        error: function (error) {
          StatusCodes.logStatusCode(error.status);
          returnData = AsyncApiCall.responseJsonParser(error.responseText, error.status);
          observer.next(returnData)
          observer.complete()
        },
        success: function (data, unused, statusCode) {
          console.log("success");
          StatusCodes.logStatusCode(statusCode.status);
          returnData = AsyncApiCall.responseJsonParser(data, statusCode.status);
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
  private static responseJsonParser(responseString: string, statusCode: number): ResponseObject {
    let response: ResponseObject = {
      data: [],
      message: 'Internal server error.',
      statusCode: statusCode
    }

    let receiveResponse: object;

    try {
      if (typeof (responseString) === "string" || responseString === undefined) {
        receiveResponse = JSON.parse(responseString);
      } else receiveResponse = responseString;
    }
    catch (e) {
      response.statusCode = 500;
      return response;
    }

    response.message = (receiveResponse['message'] !== undefined) ? receiveResponse['message'] : 'No message received';

    if (receiveResponse['data'] !== undefined) response.data = receiveResponse['data'];

    return response;
  }

  /**
   * Update the header(Access-Token) before making API call
   */
  private static updateHeaderToken(): boolean {
    let headerToken = localStorage.getItem('ewaybill-tool-v2.0.1');
    if (typeof (headerToken) === 'string') {
      this.preDefinedHeader['Access-Token'] = headerToken;
      return true;
    } else return false;
  }

}