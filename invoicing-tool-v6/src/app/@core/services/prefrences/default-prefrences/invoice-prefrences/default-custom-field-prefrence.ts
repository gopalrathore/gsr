export class CustomFieldPrefrence{

    public customFields:object[] = [
        {   label: '',  value: '' },
        {   label: '',  value: '' },
        {   label: '',  value: '' },
        {   label: '',  value: '' }];

    public editablecustomFields:object[];
    private defaultCustomFields:object;
    
    constructor (){
        this.defaultCustomFields = this.customFields;
        this.editablecustomFields = this.customFields;
    }

    getCustomFields():object[]{
      console.log("super",this.customFields);
      
        return JSON.parse(JSON.stringify(this.customFields));
    }

    setCustomFields(data:string){
      console.log("super super", data);
      
        if(data===null){
            data = "[]";
        }
        let t;
        do{
            t = data;
            data = data.replace("\\", "");
        }while(t.length!=data.length);
        
        try{
            data = JSON.parse(data);
        }
        catch(Error){
            data = "[]"
        }
        finally{
            this.customFields = this.validateCustomFieldsStructure(data);
            this.editablecustomFields = this.validateCustomFieldsStructure(data);
        }
    }

    validateCustomFieldsStructure(testData):object[]{
 
        let structureValidity:boolean = true;

        for(let i = 0; i < testData.length; i++){
            if(testData[i].label === undefined || testData[i].label === null || typeof(testData[i].label) != 'string'){
                structureValidity = false;
                break;
            }
            else if(testData[i].value === undefined || testData[i].value === null || typeof(testData[i].value) != 'string'){
                structureValidity = false;
                break;
            }
        }

        let returnData:object[] = structureValidity === true ? testData : this.defaultCustomFields
      
        return JSON.parse(JSON.stringify(returnData));

    }

    sync():void{
        this.editablecustomFields = JSON.parse(JSON.stringify(this.customFields));
    }

}