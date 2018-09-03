export class UtilityFunction{
    constructor(private invoiceData: any){};
    static splitStringWithLimit(itemName:string, limit:number = 20){
      if(!itemName || itemName.length===0) return ''
        
        let index1=0,index2 = limit
        let len = itemName.length
        let final=[];
        while(index1<len){
            index2 = Math.min(index2, len);
            final.push(itemName.slice(index1,index2))
            index1 = index2;
            index2 = index2 + limit;
        }
        return (final.join('\n'));
    }
}