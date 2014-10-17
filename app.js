var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser');

var app = express();

/* view render */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'assets')));

/* routes */
app.use('/', require('./routes/index'));

/* catch error */
app.use(function(req, res, next) {
	res.end('Troubles!');
});

/* web server */
app.set('webport', process.env.WEBPORT || 3000);
var server = app.listen(app.get('webport'), function() {
	console.log('server is on port ' + server.address().port);
});

/* tcp proxy itself */
var proxy = require('./proxy.js');