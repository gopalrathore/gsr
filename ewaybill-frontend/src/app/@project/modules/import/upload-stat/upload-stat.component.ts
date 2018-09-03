import { SafeUrl } from '@angular/platform-browser';
import { Notification } from '../../../../@core/utility-functions/functions/notification';
import { AsyncApiCall } from '../../../../@core/services/async-api-call';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Documents, StateList, SubSupplyType, SupplyType, TransportationMode, Unit, StatusCodes } from '../../../../@core/dataset/dataset';
import { TransfereService } from '../../../../@core/services/transfer.service';
import { CompanyServiceService } from '../../../../@core/services/company-service.service';

declare var $: any;
interface Stats {
  total: number,
  valid: number,
  invalid: number
}

@Component({
  selector: 'app-upload-stat',
  templateUrl: './upload-stat.component.html',
  styleUrls: ['./upload-stat.component.css']
})
export class UploadStatComponent implements OnInit {

  private uploadData: any = this.transfereService.getData();

  public downloadErrorFile:boolean = false;
  public errorFileLink:SafeUrl = '';

  public stats: Stats = {
    total: 0,
    invalid: 0,
    valid: 0
  };

  private session_id: string;

  public jsonData: any[];

  private documents: Documents = new Documents();

  private stateList: StateList = new StateList();

  private subSupplyType: SubSupplyType = new SubSupplyType();

  private supplyType: SupplyType = new SupplyType();

  private transportationMode: TransportationMode = new TransportationMode();

  private unit: Unit = new Unit();

  constructor(private transfereService: TransfereService, private router: Router, private companyServiceService: CompanyServiceService) {
    this.session_id = localStorage.getItem('session_id');
    console.log("transfer service", this.uploadData);    
  }

  ngOnInit() { }
  
  ngAfterViewInit(){
    $('[rel="tooltip"]').tooltip();
    if (this.uploadData) {
      this.getTableData();
      this.downloadErrorExcel();
    }
  }

  public fileChange(event) {
    this.downloadErrorFile = false;
    let session_id = localStorage.getItem('session_id');

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
        formData.append('session_id', this.session_id);
        AsyncApiCall.uploadFile('uploadExcel', formData).subscribe((resp) => {
          if (resp.statusCode === StatusCodes.codes.ACCEPTED) {
            Notification.success('File uploaded successfully');
            this.uploadData = resp.data[0];
            this.getTableData();
            this.downloadErrorExcel();
          } else {
            Notification.error(resp.message);
          }
        });
      } else {
        Notification.error('Please upload valid file with size less than 5MB!');

      }
    }
    event.target.value = "";
  }

  private getTableData() {
    AsyncApiCall.view('getProcessedData', { file_id: this.uploadData.file_id }).subscribe((resp) => {
      if(resp.statusCode===StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION){
        this.stats = resp.data[0].excelProcessedData.statistics;
        this.jsonData = resp.data[0].excelProcessedData.segregatedData.valid;
        this.jsonData.map((item, i) => {
          this.jsonData[i]['supplyType'] = this.supplyType.transformToValue(item['supplyType']);
          this.jsonData[i]['subSupplyType'] = this.subSupplyType.transformToValue(item['subSupplyType']);
          this.jsonData[i]['docType'] = this.documents.transformToValue(item['docType']);
          this.jsonData[i]['toStateCode'] = this.stateList.transformToValue(item['toStateCode']);
          this.jsonData[i]['actToStateCode'] = this.stateList.transformToValue(item['actToStateCode']);
          this.jsonData[i]['qtyUnit'] = this.unit.transformToValue(item['qtyUnit']);
          this.jsonData[i]['fromStateCode'] = this.stateList.transformToValue(item['fromStateCode']);
          this.jsonData[i]['actualFromStateCode'] = this.stateList.transformToValue(item['actualFromStateCode']);
          this.jsonData[i]['transMode'] = this.transportationMode.transformToValue(item['transMode']);
        });

      }else {
        Notification.error("Something went wrong.");
      }
      
    });
  }

  public downloadErrorExcel() {
    this.downloadErrorFile = false;
    AsyncApiCall.post('errorExcel', { file_id: this.uploadData.file_id }).subscribe((resp) => {
      if (resp.statusCode === StatusCodes.codes.OK) {
        this.downloadErrorFile = true;
        this.errorFileLink = AsyncApiCall.errorFileLink + resp.data.url;
      }else {
        this.downloadErrorFile = false;
      }

    });
  }

  public importAgain() {
    if (this.session_id != localStorage.getItem('session_id')) {
      this.router.navigate(['dashboard']);
      return false;
    }
    this.transfereService.setData(this.uploadData);
    this.router.navigate(['import']);
  }

  public alleway() {
    this.transfereService.setData({
      session_id: this.session_id,
      company_gst_id: this.uploadData.company_gst_id
    });
    this.router.navigate(['import', 'all-e-way-bills']);
  }

}
