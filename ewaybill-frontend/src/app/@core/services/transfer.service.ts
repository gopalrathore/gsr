
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class TransfereService {

  private data: any;

  constructor(
    private router: Router
  ) { }

  setData(data){
    this.data = data;
  }

  getData(){
    if(this.data==undefined){
      this.router.navigate(['dashboard']);
    }
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData(){
    this.data = undefined;
  }

}
