var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
  console.log('Received request from ' + request.url);
  response.writeHead(404);
  response.end();
});

server.listen(1337, function() {
    console.log('Server is listening on port 1337.');
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false // because security matters
});

function isAllowedOrigin(origin) {
  console.log('Connection requested from origin ' + origin);

  valid_origins = [
    'http://localhost:5000',
    '127.0.0.1',
    'null'
  ];

  if (valid_origins.indexOf(origin) != -1) {
    console.log('Connection accepted from origin ' + origin);
    return true;
  }

  console.log('Origin ' + origin + ' is not allowed.')
  return false;
}


wsServer.on('connect', function(webSocketConnection) {
// webSocketConnection.sendUTF("Hello, I am Nimble.");
});

wsServer.on('request', function(request) {

  var connection = isAllowedOrigin(request.origin) ?
    request.accept('echo-protocol', request.origin)
    : request.reject();

  connection.on('message', function(msg) {
    const message = msg.utf8Data;
    if(message === "test"){
      connection.sendUTF('Hello, I am Nimble.');
    } else {  
      connection.sendUTF('Received Message: ' + message);
    }
    console.log('Received Message: ' + message );
    
    
  });
  connection.on('close', function(reasonCode, description) {
      console.log(connection.remoteAddress + ' has been disconnected.');
  });
});