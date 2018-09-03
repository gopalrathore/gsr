import { Component } from '@angular/core';
import { CompanyServiceService } from '../../../../@core/services/company-service.service';


declare var $: any;

@Component({
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html'
})

export class FooterComponent{
    test : Date = new Date();
    constructor(private companyServiceService:CompanyServiceService){

    }
    isMobileMenu(){
        if($(window).width() < 991){
            return false;
        }
        return true;
    }
}
