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
	  const priceType = conv.parameters['price-type'];
      axios.get('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='+name+'&apikey='+apiKey)
      .then( (res) => {
      	  console.log(res.status);
	      if (res.status == 200) {
		    let resp = res.data;
		    console.log(resp["bestMatches"]);
		    let bestMatch = resp.bestMatches[0];
		    let symbol = bestMatch["1. symbol"];
		    let curr = bestMatch["8. currency"];
		    console.log('Hello, welcome ' + name + priceType+symbol+curr);
		     
		 //     if(priceType === 'closing price'){

			// }
			// else if(priceType === 'opening price'){

			// }
			// else if(priceType === 'high price'){

			// }
			// else if(priceType === 'low price'){

			// }
		
	       resolve('Hello, welcome ' + name + priceType+symbol+curr);
      }
	  }).then(result => {
	    conv.ask(result);
	  }).catch(error => {
	    conv.close(error);
	  });
});
});

server.post('/webhook', assistant);

server.listen(server.get('port'), function () {
	console.log('Express server started on port', server.get('port'));
});