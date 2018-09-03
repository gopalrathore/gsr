
import { Component, Input } from '@angular/core';
import { CompanyServiceService } from '../../../@core/services/company-service.service';


declare var $: any;

@Component({
    // moduleId: module.id,
    selector: 'lazy-loader',
    templateUrl: 'lazy-loader.component.html',
    styleUrls: ['./lazy-loader.component.css']
})

export class LazyLoaderComponent{

    @Input() type: number;
    
    constructor(public companyServiceService:CompanyServiceService){

    }
    
}
