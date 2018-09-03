import { Notification } from '../../../../@core/utility-functions/functions/notification';
import { AsyncApiCall } from '../../../../@core/services/async-api-call';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CompanyServiceService } from '../../../../@core/services/company-service.service';
import { TransfereService } from '../../../../@core/services/transfer.service';
import { StatusCodes } from '../../../../@core/dataset/dataset';

declare var $: any;

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  private uploadData: any = this.transfereService.getData();

  private session_id: string;

  constructor(public companyServiceService: CompanyServiceService, private transfereService: TransfereService, private router: Router) {
    this.session_id = localStorage.getItem('session_id');
    if (!this.uploadData) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
    $('[rel="tooltip"]').tooltip();
  }

  public fileChange(event) {
    let session_id: string = localStorage.getItem('session_id');

    if ((session_id === null || session_id !== this.session_id)) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];

      let allowedFileSize = 5; // in MBs
      let allowedFileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (file.size <= (allowedFileSize * 5000000) && file.type == allowedFileType) {
        let formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('company_gst_id', this.uploadData.company_gst_id);
        formData.append('branch_id', this.uploadData.branch_id);
        formData.append('session_id', session_id);
        AsyncApiCall.uploadFile('uploadExcel', formData).subscribe((resp) => {
          if(resp.statusCode===StatusCodes.codes.ACCEPTED){
            console.log("data here", resp.data[0]);
            
            this.transfereService.setData(resp.data[0]);
            this.router.navigate(['import','upload-statistics']);
          }else {
            Notification.error(resp.message);
          }
        });
      } else {
        Notification.error('Please upload valid file with size less than 5MB!');
      }
    }
    event.target.value = "";
  }

}
