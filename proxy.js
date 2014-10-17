var net = require('net');
var storage = require('./inmemorystorage.js');

var server = net.createServer(function(c) {
	console.log('client connected');
	console.log(c.remoteAddress);
	console.log(c.remotePort);
	c.on('end', function() {
		console.log('client disconnected');
	});

	var storedData = storage.get(c.remoteAddress)

	if (!storedData) return console.log(err);
	console.log(storedData);
	if (storedData.indexOf(":") === -1)
		return console.log("Redis contains wrong data: " + storedData);

	var host = storedData.substr(0, storedData.indexOf(":"));
	var port = storedData.substr(storedData.indexOf(":") + 1, storedData.length);

	console.log("host: >" + host + "<, port: >" + port + "<");

	var client = net.connect(
	{
		host: host,
		port: port
	}, function() {
		console.log('connected to remote');
		
		c.pipe(client);
		client.pipe(c);
	});
	client.on('end', function() {
		console.log('disconnected from remote');
	});
});

server.listen(process.env.PROXYPORT || 8080, function() {
	console.log('server bound on port ' + server.address().port);
});