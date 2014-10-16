var net = require('net');

var server = net.createServer(function(c) {
	console.log('server connected');
	console.log(c.remoteAddress);
	console.log(c.remotePort);
	c.on('end', function() {
		console.log('server disconnected');
	});

	var client = net.connect(
	{
		host: "stanford.edu", 
		port: 80
	}, function() {
	  console.log('client connected');
	});
	client.on('end', function() {
		console.log('client disconnected');
	});

	c.pipe(client);
	client.pipe(c);
});

server.listen(80, function() {
	console.log('server bound');
});
