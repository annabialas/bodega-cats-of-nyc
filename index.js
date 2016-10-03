var express = require('express');
var hbs = require('express-handlebars');

var app = express();

var myData = {
	"cats" : [	
		{"name": "Billy"},
		{"name": "Koshka"}
	]
};

var portNum = 8080;

app.set('port', portNum);

// tell express to use handlebars

app.engine('handlebars', hbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
	res.locals.title = 'Home';
	res.render('index', myData);
});

app.use(express.static('public'));

// start server

app.listen(portNum, function() {
	console.log('listening on port', portNum);
});