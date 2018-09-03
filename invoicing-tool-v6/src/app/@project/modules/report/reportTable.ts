import { StatusCodes } from '../../../@core/dataset/dataset';
import { AsyncApiCall } from '../../../@core/services/async-api-call';
import { HelperFunction, Notification } from '../../../@core/utility-functions/utility-function';
import { ReportInterface } from './interface/report.interface';
declare var $: any;

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

// Interface for DataTable Messages and Placeholders 
declare interface DataTableMessages {
    searchPlaceholder: string;
    dataSafe: string;
}

export class reportTable {

    public report:ReportInterface = {
        report_name: '',
        'DATE_FILTER': {
            start_date: new Date(),
            end_date: new Date()
        }
    };

    public downloadReportBtn:boolean = false;

    public viewCallable:boolean = true;
    public fileDownloadCallable:boolean = true;


    protected dataTable: DataTable = {
    headerRow: [''],
    footerRow: [''],
    dataRows: []
    };
    
      public dataTableMessages: DataTableMessages = {
        searchPlaceholder: "Search Entity",
        dataSafe: "Your data is safe"
      };

      constructor(){
          
      }

      private getTableContent(tdata:object[]):object{
          let header = [];
          let data = [];
          if(tdata.length>0){
            for (var property in tdata[0]) {
                header.push([property]);
            }
            
            for(let i=0;i<tdata.length;i++){
                let newArray = [];
                for (var property in tdata[i]) {                    
                    newArray.push(tdata[i][property]==null?'':tdata[i][property].toString());
                }
                if(newArray.length!=header.length){
                    return null;
                }else{
                    data.push(newArray);
                }    
            }
            
            return {header: header, data: data};
          }
      }

      public downloadReport():void{
        this.fileDownloadCallable = false;
        let reportCopy:ReportInterface = JSON.parse(JSON.stringify(this.report));
        reportCopy.DATE_FILTER.start_date = HelperFunction.getDate(this.report.DATE_FILTER.start_date);
        reportCopy.DATE_FILTER.end_date = HelperFunction.getDate(this.report.DATE_FILTER.end_date);

        AsyncApiCall.post('generateReportAsExcel', reportCopy).subscribe(resp=>{
          this.fileDownloadCallable = true;
          console.log("download excel", resp);
          if(resp.statusCode === StatusCodes.codes.CREATED){
            console.log("link", AsyncApiCall.downloadFileLink + resp.data.filepath);
            
            window.location.href = AsyncApiCall.downloadFileLink + resp.data.filepath;
          }else {
            Notification.error("Error downloding this file.");
          }
          
        });
      }

      public generateReport():void{
        let reportCopy:ReportInterface = JSON.parse(JSON.stringify(this.report));
        reportCopy.DATE_FILTER.start_date = HelperFunction.getDate(this.report.DATE_FILTER.start_date);
        reportCopy.DATE_FILTER.end_date = HelperFunction.getDate(this.report.DATE_FILTER.end_date);
        console.log("report", reportCopy);
        this.drawTable(reportCopy);
      }
    
      private defineHeaders(headerList:string[]):void{
        this.dataTable = {headerRow: headerList, footerRow: headerList, dataRows: []};
        this.makeTable();
      }
    
      private makeTable():void{  
        let tableHeaders:string = '';
        $.each(this.dataTable.headerRow, function(i, val){            
            tableHeaders += "<th>" + val + "</th>";
        });       
         
        $("#tableDiv").empty();
        $("#tableDiv").append('<table id="displayTable" class="table table-striped table-bordered dataTable hover no-footer nowrap reportsTable" width="100%" style="width:100%"><thead><tr>' + tableHeaders + '</tr></thead></table>');

        let that:this= this;
        $('#displayTable').DataTable({
            "pagingType": "full_numbers",
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            responsive: false,
            "ordering": false,
            "scrollX": true,
            "columnDefs": [
                {"className": "dt-center", "targets": "_all"}
              ],
            language: {
            search: "_INPUT_",
                searchPlaceholder: "Search",
            }
        });
      }

    private getTableData(tdata:any):void{
        let tableData:any = this.getTableContent(tdata);
        if(tableData!=null){
            this.defineHeaders(tableData.header);
            let datatable = $('#displayTable').DataTable();
            this.dataTable.dataRows = tableData.data;
            datatable.clear().draw();
            datatable.rows.add(tableData.data);
            datatable.columns.adjust().draw();
        }
    }
    
    private drawTable(data:any={}):void{
      this.viewCallable = false; 
        AsyncApiCall.view('generateReportAsData', data).subscribe((resp)=>{
          this.viewCallable = true;
            if(resp.statusCode == StatusCodes.codes.NON_AUTHORITATIVE_INFORMATION){
              if(resp.data.length>0){
                this.downloadReportBtn = true;
                this.getTableData(resp.data);
              }else {
                this.downloadReportBtn = false;
                Notification.error('No data found.');
              }
                
            }else {
              this.downloadReportBtn = false;
                Notification.error(resp.message);
            }
        });
    }


}