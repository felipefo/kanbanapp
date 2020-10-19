

const message  = {"description": "Olá, você tem uma nova tarefa:nova tarefa"};

const body =  {
  'title' : 'Nova Tarefa',      
  'body' :  message
}

const sourceMessage  =  {     
	 "user" : "joao" , "message" : body	
};


const  reqBody =  {
  'registration_ids' :  ["uuid"],
    'data' : body, 
    'priority' : 'high'
};


module.exports = Object.freeze({
BODY: body,
MESSAGE: message,
SOURCE_MESSAGE:sourceMessage,
REQ_BODY: reqBody,
});
