'use strict';

const { PushMessageBuilder }  = require('../../push/push-message-builder.js');
const chai = require('chai');
const expect = chai.expect;

var constantes  = require('./event-util');

describe('Tests to build a firebase message - getToken', function () {    
    	
	it('Check build firebase getToken from local server', async () => {                                      
		let pushMessageBuilder  = new PushMessageBuilder();	
		const pushBuilder  = await pushMessageBuilder.getToken("joao");
		console.log("Info:"  +pushBuilder.token);
        expect(pushBuilder.token).to.equal("uuid");       
     });
	 	 
	 it('Check build firebase message', async () => {                                      		
	    let pushMessageBuilder  = new PushMessageBuilder();
		const pushBuilder  = pushMessageBuilder.setMessage('Nova Tarefa', constantes.MESSAGE);
        expect(pushBuilder.message).to.deep.equal(constantes.BODY);
       
     });
	 	      
    it('Final message build firebase - build ', async () => {                              
        let pushMessageBuilder  = new PushMessageBuilder();		
		let pushBuilder = await(pushMessageBuilder.getToken("joao"));
		console.log("push" + pushBuilder);
		let result = pushBuilder.setMessage('Nova Tarefa', constantes.MESSAGE).build();		
        expect(result).to.deep.equal(constantes.REQ_BODY);
    });

});
