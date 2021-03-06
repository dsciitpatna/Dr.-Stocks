const express = require('express');
const bodyParser = require('body-parser');
const {dialogflow} = require('actions-on-google');
const {WebhookClient} = require('dialogflow-fulfillment');
const axios = require('axios');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const server = express();
const assistant = dialogflow();
const apiKey = 'AVTC17ZCU5OHSEIB'; 
const baseURL = 'https://www.alphavantage.co/query?function=';

server.set('port', process.env.PORT || 5000);
server.use(bodyParser.json({type: 'application/json'}));

assistant.intent('Opening Price', conv => {

	return new Promise((resolve, reject) => {
	  let name = conv.parameters.any;
	  const query = conv.parameters['price-type'];
      axios.get('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='+name+'&apikey='+apiKey)
      .then( (result) => {
	      if (result.status == 200) {
		    let resp = result.data;
		    console.log(resp["bestMatches"]);
		    let bestMatch = resp.bestMatches[0];
		    let symbol = bestMatch["1. symbol"];
		    let curr = bestMatch["8. currency"];
		    axios.get('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+symbol+'&apikey='+apiKey)
		    .then((res) => { 
		    	console.log(res)
			    console.log('Hello, welcome ' + name + query+symbol+curr+res.data["Global Quote"]["08. previous close"]);
			    if(query === 'closing price'){
			   		resolve('Closing Price of ' + name + " is " + res.data["Global Quote"]["08. previous close"] + " " + curr); 	
				}
				else if(query === 'opening price'){
					resolve('Opening Price of ' + name + " is " + res.data["Global Quote"]["02. open"] + " " + curr);
				}
				else if(query === 'high price'){
					resolve('High of ' + name + " is " + res.data["Global Quote"]["03. high"] + " " + curr);
				}
				else if(query === 'low price'){
					resolve('Low of ' + name + " is " + res.data["Global Quote"]["04. low"] + " " +curr);
				}
				else if(query === 'current price'){
					resolve('Current trading price of ' + name + " is " + res.data["Global Quote"]["04. low"] + curr + ", with a change of " + res.data["Global Quote"]["10. change percent"] + " or " + res.data["Global Quote"]["09. change"] + " " + curr);
				}
				else if(query === 'volume'){
					resolve('Volume of ' + name + " is " + res.data["Global Quote"]["06. volume"] + " " + curr);
				}
			})
			.catch((err) => {
				reject(err);
			});
	       
      	  }
	  })
	  .catch((error) => {
	  	reject(error);
	  });
	})
	.then(result => {
	    conv.ask(result);
	})
	.catch(error => {
	    conv.close(error);
	});
});

server.post('/webhook', assistant);

server.listen(server.get('port'), function () {
	console.log('Express server started on port', server.get('port'));
});