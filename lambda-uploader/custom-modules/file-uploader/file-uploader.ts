
import { FileNameMaker, UploadFileValidation } from "../custom-module-driver";
import AWS from "aws-sdk";
import fileType from "file-type";
import { S3_CONFIG, BUCKET_PATH } from "../../config/config";
import { SanitizePath } from "../upload-file-validation/validations/validations";

export class FileUploader {

  private s3 = new AWS.S3(S3_CONFIG);

  private fileNameMaker: FileNameMaker = new FileNameMaker();
  private uploadFileValidation: UploadFileValidation = new UploadFileValidation();
  private sanitixePath: SanitizePath = new SanitizePath();

  public uploadFile(request: any): Promise<any> {

    let base64String: string = request.base64String;
    let buffer: Buffer = new Buffer(base64String, "base64");
    let fileMime = fileType(buffer);
    let location: string = this.sanitixePath.sanitize(request.location);
    let validateResult = this.uploadFileValidation.validateFile(fileMime.ext, buffer.toString('ascii').length);

    let uploadPromise: Promise<any> = new Promise((resolve: any, reject: any) => {

      let file: any = this.getFile(fileMime, buffer, location);
      let params: any = file.params;

      if (typeof (request.base64String) !== 'string' && typeof (request.location) !== 'string') {
        reject("Please send valid payload.");
      } else if (fileMime === null) {
        reject("Please upload valid file.");
      } else if (typeof (validateResult) === 'string') {
        reject("validateResult");
      }

      this.s3.upload(params, (err: any, data: any) => {
        if (err) {
          reject("Something went wrong, could not upload your file.")
        } else {
          resolve({ message: "File uploaded successfully.", path: data['Location'] });
        }
      });
    });

    return uploadPromise;
  }

  private getFile(fileMime: any, buffer: any, location: string): any {

    let fileName = this.fileNameMaker.getFileName(fileMime.ext, buffer.toString('ascii').length);
    let params: any;
    let uploadFile: any;
    location = location.length > 0 ? `/${location}` : '';

    params = {
      Bucket: BUCKET_PATH + location,
      Key: fileName,
      Body: buffer,
      ContentEncoding: 'base64',
      ContentType: fileMime.mime,
      ACL: 'public-read'
    };

    uploadFile = {
      size: buffer.toString('ascii').length,
      type: fileMime.mime,
      name: fileName,
      full_path: 'public-uploads/' + location
    }

    return {
      params: params,
      uploadFile: uploadFile
    }
  }

}