(function () {
    $('.currency').on('keyup',(evt)=>{
        
    });
    
    $('.currency').on('focusout',(evt)=>{
        
    });
    
    $('.numericInput').on('focusout',(evt)=>{
        
        
    });
    
    $('.numericInput').on('keypress paste',(evt)=>{  
              
   
    });
    
    $('.conversion-factor').on('keypress paste keyup',(evt)=>{
        let str = evt.target.value;
        console.log("str",str);
        
        if(isNaN(str))
            evt.preventDefault();
    });
    
    $('.alphaNumeric').on('keypress keyup',(e)=>{
        
    });
    
    $('.alphaNumeric').on('focusout',(e)=>{
       
    
    });
    
    
      $('.days').on('keypress paste keyup',(evt)=>{
        
    });

}());

