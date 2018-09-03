import { Component, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { HelperFunction, Notification } from '../../../../@core/utility-functions/utility-function';
import { AsyncApiCall } from '../../../../@core/services/async-api-call';
import { StatusCodes } from '../../../../@core/dataset/dataset';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.css"]
})
export class FileUploadComponent {

  @ViewChild('inputFile') myInputVariable: ElementRef;

  @Output() fileUploaded = new EventEmitter();
  @Input() path: string;
  @Input() link?: SafeUrl;
  @Input() title: string;


  public postCallable: boolean = true;

  constructor() { }

  fileChange(event) {

    console.log("change event called");
    
    if (this.postCallable) {
      this.postCallable = false;
      let fileList: FileList = event.target.files;      
      if (fileList.length > 0) {
        let file: File = fileList[0];
        HelperFunction.getBase64(file, (result) => {
          console.log(result);
          
          let start = result.indexOf(",");
          let base64Data = result.slice(start + 1);
          AsyncApiCall.uploadDoc({ body: { base64String: base64Data, location: this.path } }).subscribe(resp => {
            this.postCallable = true;
            if (resp.statusCode === StatusCodes.codes.OK) {
              console.log("gopal resp", resp.data.path);
              this.link = resp.data.path;
              this.fileUploaded.emit({ path: resp.data.path });
            } else {
              Notification.error("File could not be uploaded.")
            }
          })
        })
      }

      this.myInputVariable.nativeElement.value = '';

    } else {
      console.log("file upload : ", "Waiting for API response.");
    }


  }

  ngOnInit() { }
}
