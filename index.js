const express = require('express');
const bodyParser = require('body-parser');
const {dialogflow} = require('actions-on-google');
const {WebhookClient} = require('dialogflow-fulfillment');
const request = require('request');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const server = express();
const assistant = dialogflow();
const apiKey = 'AVTC17ZCU5OHSEIB'; 
const baseURL = 'https://www.alphavantage.co/query?function=';

server.set('port', process.env.PORT || 5000);
server.use(bodyParser.json({type: 'application/json'}));

assistant.intent('Opening Price', conv => {
	let name = conv.parameters.any;
	let curr = "USD";
	let symbol = "";
	const priceType = conv.parameters['price-type'];
	request('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='+name+'&apikey='+apiKey, function (err, res, body) {
	    if (!err && res.statusCode == 200) {
	       let bestMatch = body['bestMatches'][0];
	       symbol = bestMatch["1. symbol"];
	       curr = bestMatch["8. currency"];
	     }
	})
	if(priceType === 'closing price'){

	}
	else if(priceType === 'opening price'){

	}
	else if(priceType === 'high price'){

	}
	else if(priceType === 'low price'){

	}
	conv.ask('Hello, welcome ' + name + priceType+symbol+curr);
});

server.post('/webhook', assistant);

server.listen(server.get('port'), function () {
	console.log('Express server started on port', server.get('port'));
});