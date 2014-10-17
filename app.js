var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/', require('./routes/index'));

app.use(function(req, res, next) {
	res.end(404, 'Troubles!');
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
	console.log('server is on port ' + server.address().port);
});