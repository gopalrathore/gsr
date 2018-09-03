import { Notification } from '../../../../@core/utility-functions/functions/notification';
import { StatusCodes } from '../../../../@core/dataset/dataset';
import { AsyncApiCall } from '../../../../@core/services/async-api-call';

import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { validations } from '../../../../@core/utility-functions/functions/validations';

declare var $:any;
interface Gstin {
  gstin:string;
  display_name:string;
}

@Component({
  selector: 'app-add-gstin',
  templateUrl: './add-gstin.component.html',
  styleUrls: ['./add-gstin.component.css']
})

export class AddGstinComponent implements OnInit {

  @Output() newGSTINAdded = new EventEmitter();
  public gstin:Gstin = {
    gstin:'',
    display_name:''
  };

  protected validate:validations = new validations(this.gstin);

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.validate.validations();
  }

  public close(form: NgForm){
    $('#newGSTIN').modal('hide')
    form.resetForm();
    this.gstin = {
      display_name:'',
      gstin:''
    }
  }

  public gstinSubmit(form: NgForm){
    if(form.valid){      
      AsyncApiCall.put('gst_id', this.gstin).subscribe((resp)=>{
        if(resp.statusCode===StatusCodes.codes.CREATED){  
          Notification.success(resp.message);
          this.newGSTINAdded.emit();
          this.close(form);
        }else {
          Notification.error(resp.message);
        }
      });      
    }else {
      Notification.error('Please fill all the required Fields!');
    }  
  }

}
