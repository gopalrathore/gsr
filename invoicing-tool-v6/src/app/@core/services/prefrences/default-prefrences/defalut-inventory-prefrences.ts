declare interface InventoryAvailable{
    goods:boolean;
    services:boolean;
}

export class InventoryPrefrences{

    private inventoryAvailable: InventoryAvailable = {
        goods:true,
        services:true,
    }

    constructor(){
        this.inventoryAvailableStatus(true);
    }

    public turnOffGoods(): void{
        // to be used by prefrence settings
        this.inventoryAvailable.goods = false;
    }

    public turnOffServices(): void{
        // to be used by prefrence settings
        this.inventoryAvailable.services = false;
    }

    public turnOnGoods(): void{
        // to be used by prefrence settings
        this.inventoryAvailable.goods = true;
    }

    public turnOnServices(): void{
        // to be used by prefrence settings
        this.inventoryAvailable.services = true;
    }

    public isDescriptionAllowed(): boolean{
        //to be used by frontend in *ngIf
        return this.inventoryAvailable.goods;
    }

    public isInformationAllowed(): boolean{
        //to be used by frontend in *ngIf
        return this.inventoryAvailable.services;
    }

    public inventoryAvailableStatus(defaultValue:boolean=true): void{

        //to be used reset new settings 
        this.inventoryAvailable.goods = defaultValue;
        this.inventoryAvailable.services = defaultValue;

        //check if local storage has the data 
        this.inventoryAvailableCheckFromAPI()      
    }

    private inventoryAvailableCheckFromAPI(): void{
        // In-case API call fails set default values as true.
    }
} 