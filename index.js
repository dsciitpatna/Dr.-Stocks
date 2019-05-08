const express = require('express');
const bodyParser = require('body-parser');
const {dialogflow} = require('actions-on-google');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const server = express();
const assistant = dialogflow();
		
server.set('port', process.env.PORT || 5000);
server.use(bodyParser.json({type: 'application/json'}));

assistant.intent('Opening Price', conv => {
	let name = conv.parameters.any;
	console.log('Hello, welcome ' + name);
	conv.ask('Hello, welcome ' + name);
});

server.post('/webhook', assistant);

server.listen(server.get('port'), function () {
	console.log('Express server started on port', server.get('port'));
});