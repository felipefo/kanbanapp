//Classe responsavel por construir o JSON que sera enviado para o firebase.
'use strict';
const axios = require('axios');



function PushMessageBuilder() {
    
    //"registration_ids" : ["djv7T-7i2HY:APA91bGrul6-NtmvnBwy1Z6vm6dzitDrscO6g2tpTQGpPX3Ne6fR8nnMe6XxGQMbJ6Fh74WxORojvz9H1bD_fQALM2Rb_DEoCgx25bvETrRblYPZgxqa8wFGB5gQ_yIiswOftEfB4mse"]}
    //  'body' :  {"info": "info here},  "user": "user_name"
        
   	 
	  this.getToken = async function (user_name) {            
		this.token = await getFirebaseDevicesByUser(user_name)
        return this;        
     }
	 	 
	 
    this.setMessage  = function (title, body) {
        this.message =  {
          "title" : title,      
          "body" :  body 
        };
        console.log("MessageContent:"  + JSON.stringify(this.message)); 
        return this;        
     }  
	 
    this.build = function()
    {
       //fix that for wait an array.                     
       let  reqBody =  {
           'registration_ids' :  [this.token],
             'data' : this.message, 
             'priority' : 'high'
       };
       console.log(JSON.stringify(reqBody));  
       return reqBody;
    }    
	
	


}


const getFirebaseDevicesByUser = async (user_name) => {

let resultado  = await axios.get('http://localhost:3000/tokens?user='+user_name, )
	 .then(res => { 
	   var result = res.data[0].token;	   
       console.log("teste:"  + result);	   
	   return result;
	 })
	 .catch(error => {	   	   
	   throw new Error(error);
	   
	  }) 
	  console.log("Resultado:" +resultado);	 
	  return resultado;    	 
}


module.exports = { PushMessageBuilder };
  
  

