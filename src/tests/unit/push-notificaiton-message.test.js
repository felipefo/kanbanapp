'use strict';

var notification  = require('../../push/push-notification-message');
var constantes  = require('./event-util');
const chai = require('chai');
const expect = chai.expect;

describe('Tests to send a firebase message - getSmartPagToken', function () {       
   

   /*
   it('Check build firebase getSmartPagToken', async () => {                              
        console.log("teste");
        const pushBuilder  = notification.getSmartPagToken(constantes.EVENT.Records);
        expect(pushBuilder).to.deep.equal(constantes.MESSAGE_BODY.smartpagTokens);       
     });
     it('Check build firebase getSmartPagToken with more than 1 record from sqs', async () => {                                                                     
        expect(function(){notification.getSmartPagToken(constantes.EVENT_.Records)}).to.throw(
            'Esse servico le somente uma mensagem por vez da fila');   
     });
	 */
     //TODO: firebase message teste 
     //TODO: dynamodb testes

});
