import { FileUploader } from "./custom-modules/file-uploader/file-uploader";
import { HEADERS } from "./config/config";
let fileUploader = new FileUploader();

export function upload(event: any, context: any, callback: any) {

  if (event.httpMethod === "OPTIONS") {
    callback(null, {
      statusCode: 204,
      headers: HEADERS,
      body: ""
    });
  } else {
    let request: string = event.body;
    let requestBody: any;

    try {
      requestBody = JSON.parse(request);
      requestBody = requestBody.body;
    } catch (err) {
      requestBody = {};
    }

    fileUploader.uploadFile(requestBody).then(response => {
      callback(null, {
        statusCode: 200,
        headers: HEADERS,
        body: JSON.stringify({ resp: response })
      });
    }, err => {
      callback(null, {
        statusCode: 400,
        headers: HEADERS,
        body: JSON.stringify({ error: err })
      });
    });
  }
}
