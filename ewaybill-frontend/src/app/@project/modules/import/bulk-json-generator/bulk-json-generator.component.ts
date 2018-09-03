import { JsonMaker } from './json-maker';
import { BulkGeneratorHelper } from './bulk-generator-helper';
import { AsyncApiCall } from '../../../../@core/services/async-api-call';
import { Notification } from '../../../../@core/utility-functions/functions/notification';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Documents, StateList, SubSupplyType, SupplyType, TransportationMode, Unit, StatusCodes } from '../../../../@core/dataset/dataset';
import { validations } from '../../../../@core/utility-functions/functions/validations';
import { TransfereService } from '../../../../@core/services/transfer.service';
import { Utility } from './utility';

declare var $: any;
interface Trans {
  transMode: string;
  transporterId: string;
  transporterName: string;
  transDocNo: string;
  transDocDate: Date | string;
  transDistance: string;
  vehicleNo: string;
}

@Component({
  selector: 'app-bulk-json-generator',
  templateUrl: './bulk-json-generator.component.html',
  styleUrls: ['./bulk-json-generator.component.css']
})
export class BulkJsonGeneratorComponent implements OnInit {

  public payload: any = this.transfereService.getData();
  public trans: Trans = {
    transMode: '',
    transporterId: '',
    transporterName: '',
    transDocNo: '',
    transDocDate: '',
    transDistance: '',
    vehicleNo: ''
  }
  public jsonFileName:string;
  private jsonMaker: JsonMaker = new JsonMaker();
  public downloadJsonHref: SafeUrl = "";
  public jsonData: any[] = [];
  public jsonData2: any[] = [];
  public selectedItem: any[] = [];
  public selectedItem2: any[] = [];
  private documents: Documents = new Documents();
  private stateList: StateList = new StateList();
  private subSupplyType: SubSupplyType = new SubSupplyType();
  private supplyType: SupplyType = new SupplyType();
  private transportationMode: TransportationMode = new TransportationMode();
  private unit: Unit = new Unit();
  protected validate = new validations(this.trans);
  private userGstin: string;

  constructor(private sanitizer: DomSanitizer, private transfereService: TransfereService, private router: Router) {

    if (this.payload === undefined) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
    $('[rel="tooltip"]').tooltip();
    if (this.payload != undefined) {
      this.getTableData();
      AsyncApiCall.get('gst_id', { company_gst_id: this.payload.company_gst_id }).subscribe(resp => {
        if (resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION)
          this.userGstin = resp.data[0].gstin;
        else console.log("Did not get usergstin");
      });
    }
  }

  ngAfterViewInit() {

    $('.main-panel').animate({ scrollTop: $('.main-panel').height() });
    this.validate.validations();
  }

  public close(form: NgForm) {
    $('#transporter').modal('hide')
    form.resetForm();
    this.trans = {
      transMode: '',
      transporterId: '',
      transporterName: '',
      transDocNo: '',
      transDocDate: '',
      transDistance: '',
      vehicleNo: ''
    }
  }

  private getTableData(): void {
    let payload: any = this.payload.session_id ? { session_id: this.payload.session_id } : this.payload;

    AsyncApiCall.view('getProcessedData', payload).subscribe((resp) => {
      if (resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {

        this.jsonData = Utility.mergeData(JSON.parse(JSON.stringify(resp.data)));
        let copy = Utility.mergeData(JSON.parse(JSON.stringify(resp.data)));
        this.jsonData2 = Utility.filterTableData(copy);
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

        this.jsonData2.map((item, i) => {
          this.jsonData2[i]['supplyType'] = this.supplyType.transformToValue(item['supplyType']);
          this.jsonData2[i]['subSupplyType'] = this.subSupplyType.transformToValue(item['subSupplyType']);
          this.jsonData2[i]['docType'] = this.documents.transformToValue(item['docType']);
          this.jsonData2[i]['toStateCode'] = this.stateList.transformToValue(item['toStateCode']);
          this.jsonData2[i]['actToStateCode'] = this.stateList.transformToValue(item['actToStateCode']);
          this.jsonData2[i]['qtyUnit'] = this.unit.transformToValue(item['qtyUnit']);
          this.jsonData2[i]['fromStateCode'] = this.stateList.transformToValue(item['fromStateCode']);
          this.jsonData2[i]['actualFromStateCode'] = this.stateList.transformToValue(item['actualFromStateCode']);
          this.jsonData2[i]['transMode'] = this.transportationMode.transformToValue(item['transMode']);
        });

      } else {
        Notification.error("Something went wrong.");
      }
    });
  }

  public generateJSON(): void {
    let selectedItem: any[] = JSON.parse(JSON.stringify(this.selectedItem2));
    selectedItem = selectedItem.map(item => {
      delete item.index;
      delete item.mongo_id;
      delete item.row_id;
      return item;
    });


    AsyncApiCall.customPost('https://7uk4mr4kfk.execute-api.us-east-1.amazonaws.com/none/eway-bill-backend-v2-0-test', { transform: selectedItem }).subscribe(resp => {
      if (resp.statusCode === StatusCodes.codes.OK) {
        console.log("json data", resp);
        let billLists: any[] = resp.data.map(item => {
          item.userGstin = this.userGstin;
          console.log("item", item);
          return item;
        });

        let govJson: string = JSON.stringify(this.jsonMaker.generateDownloadableJson(billLists));
        let uri: SafeUrl = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(govJson));
        this.downloadJsonHref = uri;
        this.jsonFileName = "ewaybill"+Date.now().toString();        
        setTimeout(() => {
          
          $('a.json-downloading')[0].click();
          this.downloadJsonHref = "";
        }, 5);
      } else {
        Notification.error("JSON file could not be generated.")
      }
    });

  }

  public bulkUpdate(form: NgForm) {
    let grouped: any = BulkGeneratorHelper.groupbyMongo(this.selectedItem);

    if (form.valid) {
      let data: any = {
        updateTransporterDetails: {
          updateAt: BulkGeneratorHelper.fitToUpdateStructure(grouped),
          updatedData: this.trans
        }
      }

      let transport: any = data.updateTransporterDetails.updatedData;

      if (transport.transMode === '1') {
        let transporterIdLength: number = transport.transporterId === null ? 0 : (transport.transporterId.toString()).length;
        let transDocDateLength: number = transport.transDocDate === null ? 0 : (transport.transDocDate.toString()).length;
        let vehicleNoLength: number = transport.vehicleNo === null ? 0 : (transport.vehicleNo.toString()).length;

        if ((transporterIdLength === 0 && transDocDateLength === 0 && vehicleNoLength === 0) || (vehicleNoLength === 0 && transDocDateLength === 0) || (vehicleNoLength === 0 && transporterIdLength === 0)) {
          Notification.error('Either provide ID and Date or Vehicle number!');
          return false;
        }
      } else {
        let transDocDateLength: number = transport.transDocDate === null ? 0 : (transport.transDocDate.toString()).length;
        let transDocNoLength: number = transport.transDocNo === null ? 0 : (transport.transDocNo.toString()).length;

        if (transDocNoLength === 0 && transDocDateLength === 0) {
          Notification.error('Please add transportation document number and transportaion  document date!');
          return false;
        }
      }

      AsyncApiCall.patch('updateTransporter', data).subscribe((resp) => {
        if (resp.statusCode === StatusCodes.codes.ACCEPTED) {
          $('#transporter').modal('hide');
          this.getTableData();
          form.resetForm();
          this.trans = {
            transMode: '',
            transporterId: '',
            transporterName: '',
            transDocNo: '',
            transDocDate: '',
            transDistance: '',
            vehicleNo: ''
          }
          Notification.success('Data Updated');
        } else {
          Notification.error(resp.message);
        }
      });
    } else {
      Notification.error('Please Fill All Required Fields!');
    }

  }
}
