
import { Component, OnInit } from '@angular/core';

declare var $:any;

declare interface Filter {
  start_date: Date,
  end_date: Date
}

@Component({
  selector: 'app-audit-logs',
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.css']
})
export class AuditLogsComponent implements OnInit {

  public filter:Filter = {
    start_date: null,
    end_date: null
  }

  public timelineList = [
    {
      title: "name",
      value: "gopal"
    },
    {
      title: "name",
      value: "abhijit"
    }
  ]

  constructor() { }

  ngOnInit() { }

}
