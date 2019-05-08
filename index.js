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
	const priceType = conv.parameters['price-type'];
	request('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='+name+'&apikey='+apikey, function (err, res, body) {
	    if (!err && res.statusCode == 200) {
	        console.log(body) // Print the google web page.
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
	conv.ask('Hello, welcome ' + name + priceType);
});

server.post('/webhook', assistant);

server.listen(server.get('port'), function () {
	console.log('Express server started on port', server.get('port'));
});