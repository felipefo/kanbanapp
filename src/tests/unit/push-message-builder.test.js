'use strict';

const { pushMessageBuilder }  = require('../../push/push-message-builder.js');
const chai = require('chai');
const expect = chai.expect;

var constantes  = require('./event-util');

describe('Tests to build a firebase message - getToken', function () {    
    
	it('Check build firebase getToken', async () => {                                      
		const pushBuilder  = await pushMessageBuilder.getToken("joao");
		console.log("Info:"  +pushBuilder.token);
        expect(pushBuilder.token).to.equal("uuid");       
     });
	 	 
	 it('Check build firebase message', async () => {                                      		
		const pushBuilder  = pushMessageBuilder.message('Nova Tarefa', constantes.MESSAGE);
        expect(pushBuilder.message).to.deep.equal(constantes.BODY);
       
     });
	 
	 
     

    it('Final message build firebase - build ', async () => {                              
        
		//const pushBuilder  = pushMessageBuilder.
	   // getMessage(constantes.EVENT.Records).
	    //messageContent();      
        //let reqResult = pushBuilder.build(constantes.MESSAGE_BODY.smartpagTokens);
        //expect(reqResult).to.deep.equal(constantes.REQ_BODY);
    });

});
