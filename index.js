var net = require('net');
var redis       = require('redis'),
	redisClient = redis.createClient();

var server = net.createServer(function(c) {
	console.log('server connected');
	console.log(c.remoteAddress);
	console.log(c.remotePort);
	c.on('end', function() {
		console.log('server disconnected');
	});

	redisClient.get(c.remoteAddress, function(err, reply) {
		if (err || reply === null) return console.log(err);
		console.log(reply);
		if (reply.indexOf(":") === -1)
			return console.log("Redis contains wrong data: " + reply);

		var host = reply.substr(0, reply.indexOf(":"));
		var port = reply.substr(reply.indexOf(":") + 1, reply.length);

		console.log("host: >" + host + "<, port: >" + port + "<");

		var client = net.connect(
		{
			host: "stanford.edu", 
			port: 80
		}, function() {
			console.log('client connected');
			
			c.pipe(client);
			client.pipe(c);
		});
		client.on('end', function() {
			console.log('client disconnected');
		});
	});
});

server.listen(8080, function() {
	console.log('server bound');
});
