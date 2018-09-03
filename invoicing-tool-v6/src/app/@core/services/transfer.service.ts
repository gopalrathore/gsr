import { CompanyServiceService } from "./company-service.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class TransfereService {
  constructor(
    private router: Router,
    private companyServiceService: CompanyServiceService
  ) {}

  private data;

  setData(data) {
    this.data = data;
  }

  getData() {
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData() {
    this.data = undefined;
  }
}
