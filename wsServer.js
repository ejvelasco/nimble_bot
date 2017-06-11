"use strict";

const WebSocketServer = require('websocket').server;
const http = require('http');
const ConversationV1 = require('watson-developer-cloud/conversation/v1');
//services
const port = 1337;
const server = http.createServer((request, response) => {
	console.log(`Received request from ${request.url}`);
	response.writeHead(404);
	response.end();
});
const wsServer = new WebSocketServer({
	httpServer: server,
	autoAcceptConnections: false 
});
const conversation = new ConversationV1({
  username: 'c8f0a4cc-7fe1-4613-8f78-aa939026289c',
  password: 'FHS80t03J0mg',
  version_date: ConversationV1.VERSION_DATE_2017_04_21
});
//start
server.listen(port, () => {
	console.log(`Server is listening on ${port}`);
});
//configure websocket server
wsServer.on('request', (request) => {
	const connection = isAllowedOrigin(request.origin) ? request.accept('echo-protocol', request.origin) : request.reject();
	//message event
	let context;
	connection.on('message', (msg) => {
		const message = msg.utf8Data;
		sendMessage(message, context)
		.then(response => {
			connection.sendUTF(response.output.text[0]);
		    context = response.context;
		})
		.catch(err => {
			console.error(JSON.stringify(err, null, 2));
		});
	});
	//close event
	connection.on('close', (reasonCode, description) => {
		console.log(connection.remoteAddress + ' has been disconnected.');
	}); 
});
//check if request is allowed
function isAllowedOrigin(origin) {
	//valid
	const validOrigins = [
		'http://localhost:8080',
		'http://192.237.207.37:8080',
		'127.0.0.1',
		'null'
	];
	//connection requested
	console.log(`Connection requested from origin ${origin}`);
	//allowed
	if (validOrigins.indexOf(origin) != -1) {
		console.log(`Connection accepted from origin ${origin}`);
		return true;
	}
	//not allowed
	console.log(`Origin ${origin} is not allowed.`);
	return false;
}
//configure message send
const sendMessage = function(text, context) {
  //message
  const payload = {
    workspace_id: '43c5dae8-47f9-4197-b21b-75c7bbe0b3eb',
    input: {
      text: text
    },
    context: context
  };
  //return a promise
  return new Promise((resolve, reject) =>
    conversation.message(payload, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  );
};