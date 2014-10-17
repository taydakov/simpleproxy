var express = require('express');
var router = express.Router();
var redis = require('redis'),
	redisClient = redis.createClient();

router.get('/', function(req, res) {
	res.render('index', { remoteip: req.connection.remoteAddress });
});
router.post('/', function(req, res) {
	console.log(req.body);
	//redisClient.set('')
	console.log(req.connection.remoteAddress);
	res.end();
});

module.exports = router;