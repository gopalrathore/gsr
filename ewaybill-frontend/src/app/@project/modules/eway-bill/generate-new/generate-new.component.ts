import { AsyncApiCall } from '../../../../@core/services/async-api-call';
import { Notification } from '../../../../@core/utility-functions/functions/notification';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StateList, Unit, ErrorList } from '../../../../@core/dataset/dataset';
import { validations } from '../../../../@core/utility-functions/functions/validations';
import { CompanyServiceService } from '../../../../@core/services/company-service.service';
import { BillGenerationService } from '../../../../@core/services/bill-generation.service';

declare var $:any;
declare var google:any;

@Component({
  selector: 'app-generate-new',
  templateUrl: './generate-new.component.html',
  styleUrls: ['./generate-new.component.css']
})

export class GenerateNewComponent implements OnInit {

  private dataToSend:any = {};

  public bill:any = {
    userGstin: '',
    supplyType: "O",
    subSupplyType: "",
    docType: "",
    fromGstin: "",
    toGstin: "",
    fromPlace: "",
    toPlace: "",
    docDate: new Date(),
    transMode: 1,
    fromStateCode: "",
    toStateCode: "",
    totalValue: 0,
    cgstValue: 0,
    sgstValue: 0,
    igstValue: 0,
    cessValue: 0,
    transDocDate: new Date(),
    VehicleType: "R",
    fromPincode: "",
    toPincode: "",
    itemList: [{
      productName: "",
      productDesc: "",
      hsnCode: "",
      quantity: 0,
      qtyUnit: null,
      taxableAmount: 0,
      sgstRate: 0,
      cgstRate: 0,
      igstRate: 0,
      cessRate: 0
    }]
  };

  public fromPincodeValid = false;
  public toPincodeValid = false;

  public SaveBtnText = "Submit"

  public userData:any = {
    accountType: 'B'
  };

  public totalValue:Number = 0;
  private accountType = 'B';

  private igstDisable = true;

  public state = new StateList();
  private unit = new Unit();
  private errorList = new ErrorList();
  public transFromStateCode:any = [];
  public transToStateCode:any = [];
  public transDocDateMinDate:any = new Date();
  protected validate = new validations(this.bill);

  constructor(
    private companyServiceService:CompanyServiceService,
    private router:Router,
    private billGenerationService:BillGenerationService
  ) {

  }

  ngOnInit() {
    if(true || this.billGenerationService.getUserData()){
      this.userData = this.billGenerationService.getUserData();

      // this.bill.transporterId = this.userData.userGstin;

      if(this.bill.supplyType=='O'){
        // this.bill.fromGstin=this.userData.userGstin;
        // this.transFromStateCode = this.state.getStateName(this.userData.userGstin.slice(0,2));
        this.transToStateCode = [];
        this.bill.toGstin="";
      }else if(this.bill.supplyType=='I'){
        // this.bill.toGstin = this.userData.userGstin;
        // this.transToStateCode = this.state.getStateName(this.userData.userGstin.slice(0,2));
        this.transFromStateCode = [];
        this.bill.fromGstin=""
      }
    }
    // else {
    //   this.router.navigate(['/ewaybill']);
    // }
  }

  ngAfterViewInit(){
    $('[rel="tooltip"]').tooltip();
    this.validate.validations();
    $('.main-panel').animate({scrollTop:0});
  }

  /**
   * [removeMoreItem remove item from product list]
   * @param index [index of product to remove]
   */
  removeMoreItem(index):void{
    let t=JSON.parse(JSON.stringify(this.bill.itemList))
    t.splice(index, 1);
    this.bill.itemList = JSON.parse(JSON.stringify(t));
    this.calculator();
  }

  /**
   * [toNumber convert string number to number type]
   * @param  stringToConvert [number of type string]
   * @return                 [number of type number]
   */
  toNumber(stringToConvert:any):number{
    return isNaN(stringToConvert) ? 0 : Number(stringToConvert);
  }

  /**
   * [calculator to calculate total igst,sgst,cgst and taxable amount]
   */
  calculator():void{

    this.bill.cgstValue = 0;
    this.bill.sgstValue = 0;
    this.bill.igstValue = 0;
    this.bill.cessValue = 0;
    this.bill.totalValue = 0;
    this.totalValue = 0;

    this.bill.itemList.map((item)=>{
      this.bill.totalValue += this.toNumber(item.taxableAmount);
      this.bill.cgstValue += this.toNumber(item.taxableAmount)*(this.toNumber(item.cgstRate)/100);
      this.bill.igstValue += this.toNumber(item.taxableAmount)*(this.toNumber(item.igstRate)/100);
      this.bill.sgstValue += this.toNumber(item.taxableAmount)*(this.toNumber(item.sgstRate)/100);
      this.bill.cessValue += this.toNumber(item.taxableAmount)*(this.toNumber(item.cessRate)/100);
    });

    this.bill.totalValue = this.bill.totalValue.toFixed(2);
    this.bill.cgstValue = this.bill.cgstValue.toFixed(2);
    this.bill.igstValue = this.bill.igstValue.toFixed(2);
    this.bill.sgstValue = this.bill.sgstValue.toFixed(2);
    this.bill.cessValue = this.bill.cessValue.toFixed(2);

    this.totalValue = this.toNumber(this.bill.totalValue)+this.toNumber(this.bill.cgstValue)+this.toNumber(this.bill.igstValue)+this.toNumber(this.bill.sgstValue)+this.toNumber(this.bill.cessValue);
  }

  /**
   * [addMoreItem to add more product to product list]
   */
  addMoreItem():void{
    this.bill.itemList.push(JSON.parse(JSON.stringify({
      productName: "",
        productDesc: "",
        hsnCode: "",
        quantity: 0,
        qtyUnit: "",
        taxableAmount: 0,
        sgstRate: 0,
        cgstRate: 0,
        igstRate: 0,
        cessRate: 0
    })));
  }

  /**
   * [checkIGST check if igst is to be applied or not]
   */
  checkIGST():void{
    if(this.bill.fromStateCode!='' && this.bill.toStateCode!=''){
      if(this.bill.fromStateCode==this.bill.toStateCode){
        this.bill.igstValue = 0;
        this.igstDisable = true;
      }else {
        this.igstDisable = false;
      }

      this.bill.itemList.map((item,i)=>{
        this.bill.itemList[i]['igstRate'] = 0;
        this.bill.itemList[i]['sgstRate'] = 0;
        this.bill.itemList[i]['cgstRate'] = 0;
      });

    }

    this.bill.igstValue = parseFloat(this.bill.igstValue);

    this.bill.igstValue = this.bill.igstValue.toFixed(2);

    this.calculator();
  }


  /**
   * [convertDate to convert new Date() formate to dd/mm/yyyy]
   * @param inputFormat [js date object which needs to be changed]
   */
  convertDate(inputFormat):string {

    if(isNaN(Date.parse(inputFormat))){
      return inputFormat;
    }
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
  }

  /**
   * [setMindocDate set minimum valid date for transport doc date]
   */
  setMindocDate():void{
    this.bill.transDocDate = new Date(this.bill.docDate);
    this.transDocDateMinDate = this.bill.docDate;
    this.bill.transDocDate = new Date(this.bill.docDate);
  }

  /**
   * [selectState get the state name from the gstin provided]
   * @param key [key value of the state which is changed]
   */
  selectState(key):void{
    if(this.bill[key].length>2){
      if(key=='toGstin'){
        this.transToStateCode = this.state.getStateName(this.bill.toGstin.slice(0,2));
      }else if(key=='fromGstin'){
        this.transFromStateCode = this.state.getStateName(this.bill.fromGstin.slice(0,2));
      }
    }
  }

  /**
   * [checkPincode to get place and state from pincode and set the approximate distance from to and from place]
   * @param key [key of the state which is changed]
   */
  checkPincode(key):void{
    let verifyPincodeLink = 'https://yourresume.in/ewaybillapi/getpincode/';
    if(key=='toPincode'){
      this.toPincodeValid = false;
      if(this.bill[key].length==6){
        if(this.bill[key]=='999999'){
          this.bill.toStateCode = '97';
          this.toPincodeValid = true;
        }else {
        //   this.companyServiceService.getRequest(verifyPincodeLink+this.bill[key]).subscribe((resp)=>{
        //   if(Array.isArray(resp.data)){
        //     this.bill.toPlace = resp.data[0].city;
        //     this.bill.toStateCode = resp.data[0].statecode;
        //     this.toPincodeValid = true;
        //   }else {
        //     this.toPincodeValid = false;
        //   }
        // });

        }

      }

    }else if(key=='fromPincode'){
      this.fromPincodeValid = false;
      if(this.bill[key].length==6){
        if(this.bill[key]=='999999'){
          this.fromPincodeValid = true;
          this.bill.fromStateCode = '97';
        }else {
        //   this.companyServiceService.getRequest(verifyPincodeLink+this.bill[key]).subscribe((resp)=>{
        //   if(Array.isArray(resp.data)){
        //     this.bill.fromPlace = resp.data[0].city;
        //     this.bill.fromStateCode = resp.data[0].statecode;
        //     this.fromPincodeValid = true;
        //   }else {
        //     this.fromPincodeValid = false;
        //   }

        // });

        }
      }
    }

    if(this.bill['fromPincode']!="999999" && this.bill['toPincode']!="999999" && this.bill['toPincode']!=this.bill['fromPincode']){
      if(this.bill['fromPincode'].length==6 && this.bill['toPincode'].length==6){

        var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
      {
        origins: [this.bill['fromPincode']],
        destinations: [this.bill['toPincode']],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, (response, status)=>{
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status=='OK') {
          if(Math.round(response.rows[0].elements[0].distance.value/1000)<3000){
            this.bill.transDistance = Math.round(response.rows[0].elements[0].distance.value/1000);
          }
        }
      });
      }

    }
  }

  /**
   * [supplyTypeSelected change from and to gstin according to the supply type selected]
   */
  supplyTypeSelected():void{
    this.bill.subSupplyType='';
    if(this.bill.supplyType=='O'){
      this.bill.fromGstin=this.userData.userGstin;
      this.transFromStateCode = this.state.getStateName(this.userData.userGstin.slice(0,2));
      this.transToStateCode = [];
      this.bill.toGstin="";
    }else if(this.bill.supplyType=='I'){
      this.bill.toGstin = this.userData.userGstin;
      this.transToStateCode = this.state.getStateName(this.userData.userGstin.slice(0,2));
      this.transFromStateCode = [];
      this.bill.fromGstin=""
    }
  }


  /**
   * [ewaybill validating the logic and converting to the required key types]
   * @param  form [form object]
   * @return      [false if validation fails]
   */
  ewaybill(form:NgForm):boolean{
    if(form.valid){

      this.SaveBtnText = "Generating EWB";

      // for timeout
      setTimeout(() => {
        this.SaveBtnText = "Submit";
      }, 30000);

      this.dataToSend = JSON.parse(JSON.stringify(this.bill));

      this.dataToSend['userGstin'] = this.userData.userGstin;

      this.dataToSend.docDate = this.convertDate(this.dataToSend.docDate);
      this.dataToSend.transDocDate = this.convertDate(this.dataToSend.transDocDate);
      this.dataToSend.subSupplyType = Number(this.dataToSend.subSupplyType);
      this.dataToSend.fromPincode = Number(this.dataToSend.fromPincode);
      this.dataToSend.fromStateCode = Number(this.dataToSend.fromStateCode);
      this.dataToSend.toPincode = Number(this.dataToSend.toPincode);
      this.dataToSend.toStateCode = Number(this.dataToSend.toStateCode);
      this.dataToSend.totalValue = Number(this.dataToSend.totalValue);
      this.dataToSend.cgstValue = Number(this.dataToSend.cgstValue);
      this.dataToSend.sgstValue = Number(this.dataToSend.sgstValue);
      this.dataToSend.igstValue = Number(this.dataToSend.igstValue);
      this.dataToSend.cessValue = Number(this.dataToSend.cessValue);
      this.dataToSend.transMode = Number(this.dataToSend.transMode);
      this.dataToSend.transDistance = Number(this.dataToSend.transDistance);
      this.dataToSend.itemList.map((item,i)=>{
        this.dataToSend.itemList[i].hsnCode = Number(this.dataToSend.itemList[i].hsnCode);
        this.dataToSend.itemList[i].quantity = Number(this.dataToSend.itemList[i].quantity);
        this.dataToSend.itemList[i].taxableAmount = Number(this.dataToSend.itemList[i].taxableAmount);
        this.dataToSend.itemList[i].sgstRate = Number(this.dataToSend.itemList[i].sgstRate);
        this.dataToSend.itemList[i].igstRate = Number(this.dataToSend.itemList[i].igstRate);
        this.dataToSend.itemList[i].cessRate = Number(this.dataToSend.itemList[i].cessRate);
        this.dataToSend.itemList[i].cgstRate = Number(this.dataToSend.itemList[i].cgstRate);
      });

      if(this.dataToSend.transMode==1){
        let a = this.dataToSend.transporterId == null ? 0 : (this.dataToSend.transporterId.toString()).length;
        let b = this.dataToSend.transDocDate == null ? 0 : (this.dataToSend.transDocDate.toString()).length;
        let c = this.dataToSend.vehicleNo == null ? 0 : (this.dataToSend.vehicleNo.toString()).length;

      if((a == 0 && b == 0 && c == 0) || (c == 0 && b == 0) || (c == 0 && a == 0)){
        Notification.error('Either provide Transporter ID or Vehicle number!');
        this.SaveBtnText = "Submit";
        return false;
      }
    }else {
        let b =  this.dataToSend.transDocDate == null ? 0 : (this.dataToSend.transDocDate.toString()).length;
        let c =  this.dataToSend.transDocNo == null ? 0 : (this.dataToSend.transDocNo.toString()).length;

      if(c==0 && b==0){
        Notification.error('Please add transportation document number and transportaion  document date!');
        this.SaveBtnText = "Submit"
        return false;
      }

    }

      this.sendToEWBapi();
    }else {
      this.SaveBtnText = "Submit";
      Notification.error('Fill all red marked field!');
    }
  }

  /**
   * [sendToEWBapi submit form data to gov api]
   */
  sendToEWBapi():void{
    let ewayBill = {
      Username: this.userData.username,
      data: this.dataToSend
  }
  AsyncApiCall.post('WebBillGeneration', this.ewaybill).subscribe((resp)=>{
    this.SaveBtnText = "Submit"

    let response = JSON.parse(resp.data);
    if(response.ewayBillNo){
      Notification.success("E-Way Bill generated successfully!");
      this.router.navigate(['ewaybill','e-way-bill-list']);
    }else {
      response = response.errorCodes.split(",");
      response.map((item,i)=>{
        if(item==""){
          response.splice(i, 1);
        }
      });

      if(response.includes('101') || response.includes('102') || response.includes('107') || response.includes('108') || response.includes('238')){
        Notification.error("Session expired, Login again!");
        this.billGenerationService.resetUserData();
        this.router.navigate(['ewaybill']);
        return false;
      }
      response.map((item)=>{
        try {
          Notification.error(this.errorList.codes[item].msg);
        } catch (error) {
          Notification.error("Please check your form and try again!");
        }
      });

    }

    }, err => {
      this.SaveBtnText = "Submit";
      Notification.error("Please try again, Something went wrong!");
    });
  }
}
