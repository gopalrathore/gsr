import { report } from '../data';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-report-listing',
  templateUrl: './report-listing.component.html',
  styleUrls: ['./report-listing.component.css']
})
export class ReportListingComponent implements OnInit {
  public report:any = report;
  
  spanStatus=[
    '',
    '<span class="intentory-status btn-success abcd"> Available</span>',
    '<span class="intentory-status btn-danger abcd"> Coming Soon</span>',
    '<span class="intentory-status btn-primary abcd"> Locked </span>'
  ]
  constructor() {}

  ngOnInit() {
  }

}
