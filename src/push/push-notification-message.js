const axios = require('axios');


const { pushMessageBuilder }  = require('./push-message-builder.js');
lambdaHandler = async (event, context, callback) => {  
  try { 
	  
    const smatPagToken = getSmartPagToken(event.Records);
	const deviceTokens  = await getDevices(smatPagToken);	
	
	const mensagem  = pushMessageBuilder.
	getMessage(event.Records).
	messageContent().
	build(deviceTokens);

	const result = await sendPushNotication(mensagem); 

	callback(null, "Sucesso" + result);  	 
  }catch(err) {	  
	 callback( err ); 
  }  
}

function getSmartPagToken(mensagem) {
	if(mensagem.length == 1){  	//Restrict to one message per time and only one		
		const record  = mensagem[0];
		const body = mensagem[0].body;
		console.log(body);
		const token = JSON.parse(body);		
		console.log("Token:"+token.smartpagTokens);
		return token.smartpagTokens;	 		
	}else{ 
		throw new Error("Esse servico le somente uma mensagem por vez da fila");
	}                
 }    


const getDevices = async (smartpagToken) => {
	const params = {
        'TableName': tableName,
          'Key': {
             "SmartPagToken":   { "S" : smartpagToken }
         }
	}	
     const data = await dynamoDb.getItem(params).promise()
    .then((data) =>  { console.log("Success", data.Item ); return data.Item.registration_ids.S;  })
	.catch((err) => { console.log("Error", err );
      	throw new Error("Nenhum dispositivo registrado para enviar a mensagem");
       })   //exception
	console.log("res:"  + JSON.stringify(data));
    return data;
  };
  
	

async function sendPushNotication(mensagem) {
	
	const options = {
		method: 'POST',
		headers: {
			'Authorization': 'Key='  + process.env.FIREBASE_SERVER_KEY,
			'Content-Type': 'application/json'
		}
	};    
   console.log("options:" +  JSON.stringify(options));
   console.log("Mensagem:" + JSON.stringify(mensagem));
   

    let resultado  = await axios.post('https://fcm.googleapis.com/fcm/send',  mensagem  , options )
	 .then(res => { 
	   var result = JSON.stringify(res.data.results);	   
	   var response ={ "code" : "success" , "data" :  res.data , "results" :  result };        	   
	   if(res.data.success == 0 ||  res.data.failure >= 1 ) {
		   console.log( "falha na entrega da mensagem" + result);	           
		   throw new Error(error);
	   }	   	   
	   console.log( result);	   
	   return response;
	 })
	 .catch(error => {	   	   
	   throw new Error(error);
	   //sending to sqs queue...	   
	  }) 
	  return resultado;    	        
   
}

module.exports = { lambdaHandler, getSmartPagToken, sendPushNotication, getDevices }; 	 
	


 