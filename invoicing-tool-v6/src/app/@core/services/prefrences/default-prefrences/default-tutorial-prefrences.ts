declare interface Guidance{
    descriptionText:boolean;
    fieldInfornation:boolean;
}

export class TutorialPrefrences{

    private guidance: Guidance = {
        descriptionText:true,
        fieldInfornation:true,
    }

    constructor(){
        this.guidanceStatus(true);
    }

    public turnOffDescriptionText(): void{
        // to be used by prefrence settings
        this.guidance.descriptionText = false;
    }

    public turnOffFieldInformation(): void{
        // to be used by prefrence settings
        this.guidance.fieldInfornation = false;
    }

    public turnOnDescriptionText(): void{
        // to be used by prefrence settings
        this.guidance.descriptionText = true;
    }

    public turnOnFieldInformation(): void{
        // to be used by prefrence settings
        this.guidance.fieldInfornation = true;
    }

    public isDescriptionAllowed(): boolean{
        //to be used by frontend in *ngIf
        return this.guidance.descriptionText;
    }

    public isInformationAllowed(): boolean{
        //to be used by frontend in *ngIf
        return this.guidance.fieldInfornation;
    }

    public guidanceStatus(defaultValue:boolean=true): void{
        //to be used reset new settings 
        this.guidance.descriptionText = defaultValue;
        this.guidance.fieldInfornation = defaultValue;

        //check if local storage has the data 
        this.guidanceCheckFromAPI()      
    }

    private guidanceCheckFromAPI(): void{
        // In-case API call fails set default values as true.
    }
}