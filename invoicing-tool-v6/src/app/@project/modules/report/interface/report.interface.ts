interface ReportDateFilter {
  "start_date": string|Date,
  "end_date": string|Date
}

export interface ReportInterface {
  "report_name": string,
  "DATE_FILTER": ReportDateFilter,
  client_id?: string,
  vendor_id?: string
}