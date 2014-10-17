var express = require('express');
var router = express.Router();
var storage = require('./../inmemorystorage.js');

router.get('/', function(req, res) {
	var remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	var host = "", 
		port = "";

	var storedData = storage.get(remoteAddress);

	if (storedData) {
		if (storedData.indexOf(":") !== -1) {
			host = storedData.substr(0, storedData.indexOf(":"));
			port = storedData.substr(storedData.indexOf(":") + 1, storedData.length);
		}
	}

	res.render('index', 
		{ 
			clientip:   remoteAddress,
			remotehost: host,
			remoteport: port
		});
});
router.post('/', function(req, res) {
	console.log(req.body);
	storage.set(req.body.clientip, req.body.remotehost + ":" + req.body.remoteport);
	console.log(req.connection.remoteAddress);
	res.redirect('/');
});

module.exports = router;