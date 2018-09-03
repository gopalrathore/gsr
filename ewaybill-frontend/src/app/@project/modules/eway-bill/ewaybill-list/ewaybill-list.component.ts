import { AsyncApiCall } from '../../../../@core/services/async-api-call';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TransportationMode } from '../../../../@core/dataset/dataset';
import { CompanyServiceService } from '../../../../@core/services/company-service.service';
import { BillGenerationService } from '../../../../@core/services/bill-generation.service';

declare var $: any;
declare var swal: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

export interface updateObj {
  Username: string;
  data: updateData;
}

declare interface updateData {
  EwbNo: string;
  FromPlace: string;
  FromState: string;
  TransDocDate: string;
  TransDocNo: string;
  TransMode: string;
  ReasonCode: string;
  ReasonRem: string;
  VehicleNo: string;
}


@Component({
  selector: 'app-ewaybill-list',
  templateUrl: './ewaybill-list.component.html',
  styleUrls: ['./ewaybill-list.component.css']
})

export class EwaybillListComponent implements OnInit {

  private activeBilList: any[] = [];
  private cancelBilList: any[] = [];

  public userData: any = {
    userGstin: '',
    display_name: ""
  };

  private cancelReason = {
    1: 'Duplicate',
    2: 'Order Cancelled',
    3: 'Data Entry mistake',
    4: 'Other'
  }

  public updateData: updateObj = {
    Username: "",
    data: {
      EwbNo: '',
      FromPlace: '',
      FromState: '',
      TransDocDate: '',
      TransDocNo: '',
      TransMode: '',
      VehicleNo: '',
      ReasonCode: "",
      ReasonRem: ""
    }
  };

  private mode = new TransportationMode().getTransportationMode();

  public EWBnumber = "";

  public activeBillTableHeader: DataTable;
  public cancelBillTableHeader: DataTable;
  private newBillTableHeader: DataTable;
  private tableData = [];
  public currentCompany:any = {
    company_name: ''
  };

  constructor(
    private companyServiceService: CompanyServiceService,
    public billGenerationService: BillGenerationService,
    private router: Router
  ) { }

  ngAfterViewChecked(){
    $('[rel="tooltip"]').tooltip();
  }

  ngOnInit() {

    this.currentCompany = this.companyServiceService.getCompany();
    
    this.activeBillTableHeader = {
      headerRow: ['Sr No.', 'EWB For', 'EWB No.', 'Mode Details', 'Taxable Value', 'Valid Upto', 'Action', 'Download/View'],
      footerRow: ['Sr No.', 'EWB For', 'EWB No.', 'Mode Details', 'Taxable Value', 'Valid Upto', 'Action', 'Download/View'],
      dataRows: [],
    };

    this.cancelBillTableHeader = {
      headerRow: ['Sr No.', 'EWB For', 'Taxable Value', 'Vehicle No./Mode', 'EWB No.', 'Reason', 'Cancelled On', 'Download/View'],
      footerRow: ['Sr No.', 'EWB For', 'Taxable Value', 'Vehicle No./Mode', 'EWB No.', 'Reason', 'Cancelled On', 'Download/View'],
      dataRows: [],
    };

    if (true || this.billGenerationService.getUserData()) {
      this.userData = this.billGenerationService.getUserData();
      this.updateData = {
        Username: this.userData.username,
        data: {
          EwbNo: '',
          FromPlace: '',
          FromState: '',
          TransDocDate: '',
          TransDocNo: '',
          TransMode: '',
          VehicleNo: '',
          ReasonCode: "",
          ReasonRem: ""
        }
      };
      this.getList();
    }
    //  else {
    //   this.router.navigate(['/ewaybill']);
    // }
  }

  gopalCancel(){
    $('#updatePartB').modal('show');
  }

  /**
   * [getList Get list of all the e-way bills]
   */
  getList():void {
    let payloadData = {
      Username: this.userData.username
    }
    AsyncApiCall.post('WebGetAllBill', payloadData).subscribe((resp) => {
      let billList = resp;
      this.activeBilList = [];
      this.cancelBilList = [];
      var activeBillTable = $('#active-bill-table').DataTable();
      var cancelBillTable = $('#cancel-bill-table').DataTable();
      var activeBillNewdata = [];
      var cencelBillNewdata = [];
      var activeTempRow = [];
      var cancelTempRow = [];

      billList.map((item, i) => {
        billList[i]['req'] = JSON.parse(billList[i]['req']);
        billList[i]['respo'] = JSON.parse(billList[i]['respo']);
        if (item.cancel_status === '1') {
          billList[i]['cancel_req'] = JSON.parse(billList[i]['cancel_req']);
          this.cancelBilList.push(billList[i]);
        } else if (item.cancel_status === '0') {
          this.activeBilList.push(billList[i]);
        }
      });

      this.tableData = [];

      for (let i = 0; i < this.activeBilList.length; i++) {
        activeTempRow = [i + 1, this.activeBilList[i]['req']['fromTrdName'] ? this.activeBilList[i]['req']['fromTrdName'] : this.activeBilList[i]['req']['fromGstin'], this.activeBilList[i]['respo']['ewayBillNo'], this.activeBilList[i]['req']['vehicleNo'] ? this.activeBilList[i]['req']['vehicleNo'] : this.mode[this.activeBilList[i]['req']['transMode']], this.activeBilList[i]['req']['totalValue'], this.activeBilList[i]['respo']['validUpto'].slice(0, 10), '<button rel="tooltip" title="Update Part B" class="btn btn-fill btn-warning action-btn updateBill">Update</button> <button rel="tooltip" title="Cancel E-Way Bill" class="btn btn-fill btn-danger action-btn cancelBill">Cancel</button>', '<button rel="tooltip" title="Download" class="btn btn-simple btn-success btn-icon"><i class="ti-import"></i></button> <button rel="tooltip" title="Preview" class="btn btn-simple btn-info btn-icon"><i class="ti-eye"></i></button>'];
        activeBillNewdata.push(activeTempRow);
        this.tableData.push(this.activeBilList[i]);
      }

      for (let i = 0; i < this.cancelBilList.length; i++) {
        cancelTempRow = [i + 1, this.cancelBilList[i]['req']['fromTrdName'] ? this.cancelBilList[i]['req']['fromTrdName'] : this.cancelBilList[i]['req']['fromGstin'], this.cancelBilList[i]['req']['totalValue'], this.cancelBilList[i]['req']['vehicleNo'] ? this.cancelBilList[i]['req']['vehicleNo'] : this.mode[this.cancelBilList[i]['req']['transMode']], this.cancelBilList[i]['respo']['ewayBillNo'], this.cancelReason[this.cancelBilList[i]['cancel_req']['cancelRsnCode']], this.cancelBilList[i]['respo']['0'].slice(0,10), '<button rel="tooltip" title="Download" class="btn btn-simple btn-success btn-icon"><i class="ti-import"></i></button> <button rel="tooltip" title="Preview" class="btn btn-simple btn-info btn-icon"><i class="ti-eye"></i></button>'];
        cencelBillNewdata.push(cancelTempRow);
      }

      cancelBillTable.clear().draw();
      cancelBillTable.rows.add(cencelBillNewdata);
      cancelBillTable.columns.adjust().draw();

      activeBillTable.clear().draw();
      activeBillTable.rows.add(activeBillNewdata);
      activeBillTable.columns.adjust().draw();
    });
  }

  ngAfterViewInit() {
    let that = this;
    $('#active-bill-table').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search",
      }
    });

    $('#cancel-bill-table').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search",
      }
    });
    
    var activeTable = $('#active-bill-table').DataTable();

    activeTable.on('click', '.updateBill', function () {
      var $tr = $(this).closest('tr');
      var data = activeTable.row($tr).data();
      var billData: any = that.tableData[parseInt(data[0]) - 1];
      that.updatePart(billData);
    });

    activeTable.on('click', '.cancelBill', function () {
      var $tr = $(this).closest('tr');
      var data = activeTable.row($tr).data();
      var cancelData: any = that.tableData[parseInt(data[0]) - 1];
      that.cancelBill(cancelData.respo.ewayBillNo);
    });
  }

  /**
   * [cancelBill: for canceling EW bill]
   * @param ewayBillNo [e-way bill number to be cancelled]
   */
  cancelBill(ewayBillNo):void {
    this.EWBnumber = ewayBillNo;
    $('#billCancel').modal('show');
  }

  /**
   * [billCanceled is called when user cancel a bill]
   * @param response [response when bill is cancelled by user]
   */
  billCanceled(response):void {
    this.getList();
  }

  /**
   * [updatePart Update e-way bill for partB]
   * @param EWBdata [e-way bill data to be updated]
   */
  updatePart(EWBdata):void {
    this.updateData = {
      Username: this.userData.username,
      data: {
        EwbNo: EWBdata.respo.ewayBillNo,
        FromPlace: EWBdata.req.fromPlace,
        FromState: EWBdata.req.fromStateCode,
        TransDocDate: EWBdata.req.transDocDate,
        TransDocNo: EWBdata.req.transDocNo,
        TransMode: EWBdata.req.transMode,
        VehicleNo: EWBdata.req.vehicleNo,
        ReasonCode: "",
        ReasonRem: ""
      }
    };
    $('#updatePartB').modal('show');

  }

  /**
   * [partBUpdated called when partb is updated]
   * @param response [response, when partb is updated]
   */
  partBUpdated(response):void {
    this.getList();
  }

}
