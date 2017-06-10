"use strict";

const WebSocketServer = require('websocket').server;
const http = require('http');

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

server.listen(port, () => {
	console.log(`Server is listening on ${port} 1337.`);
});

wsServer.on('request', (request) => {
	const connection = isAllowedOrigin(request.origin) ? request.accept('echo-protocol', request.origin) : request.reject();
	//message event
	connection.on('message', (msg) => {
		const message = msg.utf8Data;
		if(message === "test"){
			connection.sendUTF('Hello, I am Nimble.');
		} else {  
			connection.sendUTF('Received Message: ' + message);
		}
		console.log('Received Message: ' + message );
	});
	//close event
	connection.on('close', (reasonCode, description) => {
			console.log(connection.remoteAddress + ' has been disconnected.');
	}); 
});

function isAllowedOrigin(origin) {
	//valid
	const validOrigins = [
		'http://localhost:5000',
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