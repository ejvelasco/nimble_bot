const net = require('net');

const server = net.createServer(function(socket) {
	socket.on('data', function (data) {
    	console.log(data.toString());
  	});
});

const port = 8080;
server.listen(port, '127.0.0.1', () => {
	console.log("Listening at: " + port);
});