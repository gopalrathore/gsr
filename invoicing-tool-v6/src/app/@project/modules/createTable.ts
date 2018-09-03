import { StatusCodes } from '../../@core/dataset/dataset';
import { AsyncApiCall } from '../../@core/services/async-api-call';
import { Router } from '@angular/router';
import { CompanyServiceService } from '../../@core/services/company-service.service';
import { TransfereService } from '../../@core/services/transfer.service';

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
    dataNotFound: string
}

// Interface for API Response Keys to control data
declare interface ResponseKeys {
    primaryKey:string;
    nameKeyIndex:number
}

// Interface for API Parameters Response Keys to control data
declare interface AllAPIparams {
    getTableData: string;
    deleteTableData: string;
    responseKeys:ResponseKeys
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
    editRoute?: string;
    viewRoute?: string;
}

// Interface for Table Control Buttons HTML Shorthand
declare interface DataTableButtons {
    addBtn?:string;
    editBtn:string;
    deleteBtn:string;
    pdfBtn:string;
    viewBtn: string;
    downloadPdf:string;
}

// Interface for Table Lables HTML Shorthand
declare interface DataTableLables {
    disabled:string;
    registered:string;
    unregistered:string;
    balanced:string;
    unbalanced:string;
}

export class createTable {

    private viewInvoice:object = {
        'Tax Invoice': '/view-tax-invoice',
        'Retail Invoice': '/view-retail-invoice',
        'Bill of Supply': '/view-bill-of-supply',
        'Receipt Voucher': '/view-receipt-voucher',
        'Refund Voucher': '/view-refund-voucher',
        'Payment Voucher':'/view payment-voucher',
        'Credit Note': '/view-credit-note',
        'Debit Note': '/view-debit-note',
        'Revise Invoice': '/view-revise-invoice',
        'Delivery Challan': '/view-delivery-challan',
        'Trade Delivery Challan': '/view-trade-delivery-challan',
        'Export Invoice':'/view-export-invoice',
        'Sales Order':'/view-sales-order'
    }

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
        responseKeys :{
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
        editRoute: "/",
        viewRoute: '/'
    }

    public dataTableButtons: DataTableButtons = {
        editBtn: '<button class="btn btn-simple btn-warning btn-icon edit"><i class="ti-pencil-alt"></i></button>',
        deleteBtn: '<button class="btn btn-simple btn-danger btn-icon remove"><i class="ti-close"></i></button>',
        pdfBtn: '<button class="btn btn-simple btn-danger btn-icon pdf"><i class="ti-eye"></i></button>',
        viewBtn: '<button class="btn btn-simple btn-info btn-icon view"><i class="ti-eye"></i></button>',
        downloadPdf: '<button class="btn btn-simple btn-info btn-icon download-pdf"><i class="ti-save"></i></button>'
    }

    public dataTableLables: DataTableLables = {
        disabled: '<span class="voucher-status btn-danger">Disabled</span>',
        registered: '<span class="voucher-status btn-success">Registered</span>',
        unregistered: '<span class="voucher-status btn-danger">Unregistered</span>',
        balanced: '<span class="voucher-status balanced-voucher">balanced</span>',
        unbalanced: '<span class="voucher-status immbalanced-voucher">Not Balanced</span>'
    }
    
    constructor(protected companyServiceService:CompanyServiceService,
                protected transfereService:TransfereService,
                protected router:Router){};

    
    defineHeaders(headerList:string[]){
        this.dataTable = {headerRow: headerList, footerRow: headerList, dataRows: []};
    }

    getTableData(){
        // This function should always be called in ngAfterViewInit.
        let payloadData = {
            LIMIT: this.dataAttributes.limit,
            FIELDS: this.dataAttributes.fields,
            ORDER: this.dataAttributes.order
        }
        
        //AsyncApiCall.view(this.allAPIparams.getTableData, {}).subscribe(resp=>{
            AsyncApiCall.view(this.allAPIparams.getTableData,payloadData).subscribe(resp=>{                    
            if(resp.statusCode===StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION){
                this.refreshBtn = false;
                if(resp.data.length>0){
                    this.showImg = false;
                    let datatable = $('#datatables').DataTable();
                    let newdata:string[][] = [];
                    let temp:string[] = [];
                    this.dataID = [];

                    for(let i = 0; i < resp.data.length; i++){
                        temp = this.rowSanatize(JSON.parse(this.tableDataManupulator(i+1, JSON.stringify(resp.data[i]))));
                        newdata.push(temp);
                        this.dataID.push(parseInt(resp.data[i][this.allAPIparams.responseKeys.primaryKey]));
                    }
                    datatable.clear().draw();
                    datatable.rows.add(newdata);
                    datatable.columns.adjust().draw();
                }else { this.showImg=true; }
                
            }else {
                $('#datatables').DataTable().destroy();
                $('#datatables').DataTable({
                    "pagingType": "full_numbers",
                    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                    responsive: true,
                    language: {
                        emptyTable: this.dataTableMessages.dataNotFound?this.dataTableMessages.dataNotFound:'No Data Found.',
                        search: "_INPUT_",
                        searchPlaceholder: this.dataTableMessages.searchPlaceholder,
                    }
                });
                this.refreshBtn = true;
            }
            
        });
    }

    // Balances header & data count miss-match 
    private rowSanatize(data){
        let numberOfColumns:number = this.dataTable.headerRow.length;
        if(data.length === numberOfColumns) return data;

        let satatizedData:string[] = [];
        let dirtyData:any[] = JSON.parse(JSON.stringify(data));
        for(let i = 0; i < numberOfColumns; i++){            
            if(dirtyData[i])
                satatizedData.push(dirtyData[i].toString());
            else
                satatizedData.push("UNKNOWN");
        }
        return satatizedData;
    }

    tableDataManupulator(index,jsonData){
        // This function should always be overrided.
        return jsonData;
    }

    makeTable(){
        // This function should always be called in ngAfterViewInit.
        let that:this= this;
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

        table.on( 'click', '.pdf', function () {
            console.log("clicked pdf");
            
            let $tr;
            let data:any[];
            let id:number;
            let invoice_type:string;
            try{
                $tr = $(this).closest('tr');
                data = table.row($tr).data();
                invoice_type = data[4];
                id = that.dataID[parseInt(data[0])-1];
            }
            catch (Error){
                $tr = $(this).closest('tr').prev();
                data = table.row($tr).data();
                invoice_type = data[4];
                id = that.dataID[parseInt(data[0])-1];
            }
            finally{
                that.transfereService.setData(id);
                if(that.allRoutes.editRoute===''){
                    console.log("navigating to", 'invoice/sales'+that.viewInvoice[invoice_type]);
                    
                    that.router.navigateByUrl('invoice/sales'+that.viewInvoice[invoice_type]);
                }else{
                    that.editRow(id);
                }
            }
            
        });

         // Edit record
         table.on( 'click', '.edit', function () {
            let $tr;
            let data:any[];
            let id:number;
            try{
                $tr = $(this).closest('tr');
                data = table.row($tr).data();
                id = that.dataID[parseInt(data[0])-1];
            }
            catch (Error){
                $tr = $(this).closest('tr').prev();
                data = table.row($tr).data();
                id = that.dataID[parseInt(data[0])-1];
            } 
            finally{

              console.log("id", id);
              
                
                that.transfereService.setData(id);
                if(that.allRoutes.editRoute===''){
                    that.editRow(id);
                }else{
                    that.router.navigateByUrl(that.allRoutes.editRoute);
                }
            }
        });

        table.on( 'click', '.view', function () {
          
          let $tr;
          let data:any[];
          let id:number;
          try{
              $tr = $(this).closest('tr');
              data = table.row($tr).data();
              id = that.dataID[parseInt(data[0])-1];
          }
          catch (Error){
              $tr = $(this).closest('tr').prev();
              data = table.row($tr).data();
              id = that.dataID[parseInt(data[0])-1];
          } 
          finally{              
              that.transfereService.setData(id);
              if(that.allRoutes.viewRoute===''){
                  that.viewRow(id);
              }else{
                  that.router.navigateByUrl(that.allRoutes.viewRoute);
              }
          }
      });

      table.on( 'click', '.download-pdf', function () {
          
        let $tr;
        let data:any[];
        let id:number;
        try{
            $tr = $(this).closest('tr');
            data = table.row($tr).data();
            id = that.dataID[parseInt(data[0])-1];
        }
        catch (Error){
            $tr = $(this).closest('tr').prev();
            data = table.row($tr).data();
            id = that.dataID[parseInt(data[0])-1];
        } 
        finally{       
            that.generatePdf(id);
        }
    });

        // Delete a record
        table.on( 'click', '.remove', function (e) {
            let $tr;
            let data:any[];
            let id:number;
            try{
                $tr = $(this).closest('tr');
                data = table.row($tr).data();
                id = that.dataID[parseInt(data[0])-1];
            }
            catch (Error){
                $tr = $(this).closest('tr').prev();
                data = table.row($tr).data();
                id = that.dataID[parseInt(data[0])-1];
            } 
            finally{
                that.deleteRow(id, data[that.allAPIparams.responseKeys.nameKeyIndex], table, $tr);
                e.preventDefault();
            }
        });
    }

    generatePdf(id){

    }

    editRow(id){

    }

    viewRow(id){

    }

    deleteRow(id, name, table, tr){
      let that = this;
      swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover '+name+' !',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it',
          confirmButtonClass: "btn btn-success",
          cancelButtonClass: "btn btn-danger",
          buttonsStyling: false
      }).then(function() {
        console.log("delete gopal", {[that.allAPIparams.responseKeys.primaryKey]:id}, that.allAPIparams.deleteTableData);
        AsyncApiCall.delete(that.allAPIparams.deleteTableData, {[that.allAPIparams.responseKeys.primaryKey]:id}).subscribe(resp=>{
          if(resp.statusCode === StatusCodes.codes.ACCEPTED) {
            swal({
                title: 'Deleted!',
                text: name+ ' has been deleted.',
                type: 'success',
                confirmButtonClass: "btn btn-success",
                buttonsStyling: false
            })
            that.getTableData();
          }
        });
          
      }, function(dismiss) {
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

    // Combination Fuction -To achive shorthand 
    drawTable(){
        // This function should always be called in ngAfterViewInit.
        this.getTableData();
        this.makeTable();
    }
}
