import { Router } from '@angular/router';
import { CompanyServiceService } from '../../@core/services/company-service.service';
import { TransfereService } from '../../@core/services/transfer.service';
import { AsyncApiCall } from '../../@core/services/async-api-call';
import { StatusCodes } from '../../@core/dataset/dataset';
import { Notification } from '../../@core/utility-functions/utility-function';

declare var swal: any;
declare var $: any;

// Interface for DataTable's Data -Provided by Template-
declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

// Interface for DataTable Messages and Placeholders 
declare interface DataTableMessages {
  searchPlaceholder: string;
  dataSafe: string;
  dataNotFound: string;
}

// Interface for API Response Keys to control data
declare interface ResponseKeys {
  primaryKey: string;
  nameKeyIndex: number
}

// Interface for API Parameters Response Keys to control data
declare interface AllAPIparams {
  getTableData: string;
  deleteTableData: string;
  responseKeys: ResponseKeys
}

declare interface OrderingAttributes {
  ORDER_BY: string;
  ORDER_TYPE: string
}

declare interface DataAttributes {
  fields: string[];
  offset: number;
  order: OrderingAttributes[];
  limit: number;
}

// Interface for Table Based Routings
declare interface AllRoutes {
  editRoute: string;
}

// Interface for Table Control Buttons HTML Shorthand
export interface DataTableButtons {
  addBtn?: string;
  editBtn: string;
  deleteBtn: string;
  pdfBtn: string;
}

// Interface for Table Lables HTML Shorthand
export interface DataTableLables {
  disabled: string;
  registered: string;
  unregistered: string;
  balanced: string;
  unbalanced: string;
}

export class createTable {

  showImg = false;
  refreshBtn = false;


  public dataTable: DataTable;
  protected dataID: number[];

  //default Interface values
  public dataTableMessages: DataTableMessages = {
    searchPlaceholder: "Search Entity",
    dataSafe: "Your data is safe",
    dataNotFound: "No Data Added."
  };

  public allAPIparams: AllAPIparams = {
    getTableData: "list_",
    deleteTableData: "delete_",
    responseKeys: {
      primaryKey: "id",
      nameKeyIndex: 0
    }
  }

  public dataAttributes: DataAttributes = {
    fields: [],
    offset: 0,
    order: [],
    limit: 1000
  }

  public allRoutes: AllRoutes = {
    editRoute: "/"
  }

  public dataTableButtons: DataTableButtons = {
    editBtn: '<button class="btn btn-simple btn-warning btn-icon edit"><i class="ti-pencil-alt"></i></button>',
    deleteBtn: '<button class="btn btn-simple btn-danger btn-icon remove"><i class="ti-close"></i></button>',
    pdfBtn: '<button class="btn btn-simple btn-danger btn-icon pdf"><i class="ti-eye"></i></button>'
  }

  public dataTableLables: DataTableLables = {
    disabled: '<span class="voucher-status btn-danger">Disabled</span>',
    registered: '<span class="voucher-status btn-success">Registered</span>',
    unregistered: '<span class="voucher-status btn-danger">Unregistered</span>',
    balanced: '<span class="voucher-status balanced-voucher">balanced</span>',
    unbalanced: '<span class="voucher-status immbalanced-voucher">Not Balanced</span>'
  }

  constructor(protected companyServiceService: CompanyServiceService,
    protected transfereService: TransfereService,
    protected router: Router) { };


  defineHeaders(headerList: string[]) {
    this.dataTable = { headerRow: headerList, footerRow: headerList, dataRows: [] };
  }

  getTableData(payload = {}) {

    let payloadData = {
      ...payload,
      LIMIT: this.dataAttributes.limit,
      FIELDS: this.dataAttributes.fields,
      ORDER: this.dataAttributes.order
    }

    AsyncApiCall.view(this.allAPIparams.getTableData, payloadData).subscribe(resp => {

      if (resp.statusCode === StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION) {
        this.refreshBtn = false;
        this.logging(this.allAPIparams.getTableData, resp);
        if (resp.data.length > 0) {
          this.showImg = false;
          let datatable = $('#datatables').DataTable();
          let newdata: string[][] = [];
          let temp: string[] = [];
          this.dataID = [];

          for (let i = 0; i < resp.data.length; i++) {
            temp = this.rowSanatize(JSON.parse(this.tableDataManupulator(i + 1, JSON.stringify(resp.data[i]))));
            newdata.push(temp);
            this.dataID.push(parseInt(resp.data[i][this.allAPIparams.responseKeys.primaryKey]));
          }

          this.logging('tableData', newdata);
          datatable.clear().draw();
          datatable.rows.add(newdata);
          datatable.columns.adjust().draw();
        } else { this.showImg = true; }

      } else {
        $('#datatables').DataTable().destroy();
        $('#datatables').DataTable({
          "pagingType": "full_numbers",
          "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
          responsive: true,
          language: {
            emptyTable: this.dataTableMessages.dataNotFound ? this.dataTableMessages.dataNotFound : 'No Data Found.',
            search: "_INPUT_",
            searchPlaceholder: this.dataTableMessages.searchPlaceholder,
          }
        });
        this.refreshBtn = true;
      }

    });
  }

  // Balances header & data count miss-match 
  private rowSanatize(data) {
    let numberOfColumns: number = this.dataTable.headerRow.length;
    if (data.length === numberOfColumns) return data;

    let satatizedData: string[] = [];
    let dirtyData: any[] = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < numberOfColumns; i++) {
      if (dirtyData[i])
        satatizedData.push(dirtyData[i].toString());
      else
        satatizedData.push("UNKNOWN");
    }
    this.logging('satatizedData', satatizedData);
    return satatizedData;
  }

  tableDataManupulator(index, jsonData) {
    // This function should always be overrided.
    return jsonData;
  }

  makeTable() {
    // This function should always be called in ngAfterViewInit.
    let that: this = this;
    $('#datatables').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
      responsive: true,
      language: {
        emptyTable: "Please wait while we're getting your data...",
        search: "_INPUT_",
        searchPlaceholder: that.dataTableMessages.searchPlaceholder,
      }
    });

    let table = $('#datatables').DataTable();

    table.on('click', '.pdf', function () {
      let extraParam = '';
      let $tr;
      let data;
      let url;
      let id;
      try {
        $tr = $(this).closest('tr');
        data = table.row($tr).data();
        id = that.dataID[parseInt(data[0]) - 1];
      }
      catch (Error) {
        $tr = $(this).closest('tr').prev();
        data = table.row($tr).data();
        id = that.dataID[parseInt(data[0]) - 1];
      }
      finally {
        window.open(url + id + extraParam, '_blank');
      }

    });

    table.on('click', '.excel', function () {
      let extraParam = '';
      let $tr;
      let data;
      let url;
      let id;
      try {
        $tr = $(this).closest('tr');
        data = table.row($tr).data();
        id = that.dataID[parseInt(data[0]) - 1];
      }
      catch (Error) {
        $tr = $(this).closest('tr').prev();
        data = table.row($tr).data();
        id = that.dataID[parseInt(data[0]) - 1];
      }
      finally {
        url = that.companyServiceService.setXLLink();
        window.open(url + id + '.xlsx');
      }

    });

    // Edit record
    table.on('click', '.edit', function () {
      let $tr;
      let data: any[];
      let id: number;
      try {
        $tr = $(this).closest('tr');
        data = table.row($tr).data();
        id = that.dataID[parseInt(data[0]) - 1];
      }
      catch (Error) {
        $tr = $(this).closest('tr').prev();
        data = table.row($tr).data();
        id = that.dataID[parseInt(data[0]) - 1];
      }
      finally {

        that.logging('transferToEdit', { [that.allAPIparams.responseKeys.primaryKey]: id });
        that.transfereService.setData(id);
        if (that.allRoutes.editRoute === '') {
          that.editRow(id);
        } else {
          that.router.navigateByUrl(that.allRoutes.editRoute);
        }
      }
    });

    table.on('click', '.import-history', function () {
      let $tr;
      let data: any[];
      let id: number;
      try {
        $tr = $(this).closest('tr');
        data = table.row($tr).data();
        id = that.dataID[parseInt(data[0]) - 1];
      }
      catch (Error) {
        $tr = $(this).closest('tr').prev();
        data = table.row($tr).data();
        id = that.dataID[parseInt(data[0]) - 1];
      }
      finally {
        console.log("work need to be done here.", id);
        AsyncApiCall.put('session', {}).subscribe((resp) => {
          if (resp.statusCode === StatusCodes.codes.CREATED) {
            localStorage.setItem('session_id', resp.data[0].session_id);
            that.transfereService.setData({file_id: id});
            that.router.navigate(['/import','upload-statistics']);
          } else {
            Notification.error('Something Went Wrong!');
          }
        });
      }
    });

    // Delete a record
    table.on('click', '.remove', function (e) {
      let $tr;
      let data: any[];
      let id: number;
      try {
        $tr = $(this).closest('tr');
        data = table.row($tr).data();
        id = that.dataID[parseInt(data[0]) - 1];
      }
      catch (Error) {
        $tr = $(this).closest('tr').prev();
        data = table.row($tr).data();
        id = that.dataID[parseInt(data[0]) - 1];
      }
      finally {
        that.logging('tryDelete', { [that.allAPIparams.responseKeys.primaryKey]: id });
        that.deleteRow(id, data[that.allAPIparams.responseKeys.nameKeyIndex], table, $tr);
        e.preventDefault();
      }
    });
  }

  editRow(id) {

  }

  deleteRow(id, name, table, tr) {
    let that = this;
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover ' + name + ' !',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: false
    }).then(function () {
      that.logging(that.allAPIparams.deleteTableData, { [that.allAPIparams.responseKeys.primaryKey]: id });
      AsyncApiCall.delete(that.allAPIparams.deleteTableData, { [that.allAPIparams.responseKeys.primaryKey]: id }).subscribe(resp => {
        if (resp.statusCode === StatusCodes.codes.ACCEPTED) {
          swal({
            title: 'Deleted!',
            text: name + ' has been deleted.',
            type: 'success',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false
          })
          that.getTableData();
        }
        table.row(tr).remove().draw();
      });

    }, function (dismiss) {
      that.logging('skipDelete', { [that.allAPIparams.responseKeys.primaryKey]: id });
      if (dismiss === 'cancel') {
        swal({
          title: 'Cancelled',
          text: that.dataTableMessages.dataSafe,
          type: 'error',
          confirmButtonClass: "btn btn-info",
          buttonsStyling: false
        })

      }
    });
  }

  private logging(name: string, data: any) {
    let developerOptions: boolean = false;
    if (developerOptions) {
    }
  }

  // Combination Fuction -To achive shorthand 
  drawTable(payload = {}) {
    // This function should always be called in ngAfterViewInit.
    this.getTableData(payload);
    this.makeTable();
  }
}
