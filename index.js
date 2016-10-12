var express = require('express');
var hbs = require('express-handlebars');
var Mongoose = require('mongoose');

var app = express();

require('dotenv').config();

Mongoose.connect(process.env.DB_URL);

var Cat = require('./models/cat');

// var input = new Cat({ });

// input.save(function(err){
// 	if (err) console.log('error saving');
// 	else console.log('saved successfully');
// });

// var myData = {
// 	"cats" : [	
// 		{ },
// 		{ }
// 	]
// };

var portNum = 8080;
app.set('port', portNum);

// tell express to use handlebars

app.engine('handlebars', hbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

// app.get('/', function(req, res){
// 	res.locals.title = 'Bodega Cats';
// 	res.render('index');
// });

// app.get('/about', function(req, res){
// 	res.locals.title = 'Bodega Cats | About';
// 	res.render('about');
// });

// app.get('/submit', function(req, res){
// 	res.locals.title = 'Bodega Cats | Submit A Cat';
// 	res.render('submit');
// });

var apiRoutes = require('./routes/api');
app.use('/', apiRoutes);

app.use(express.static('public'));

// start server

app.listen(portNum, function() {
	console.log('listening on port', portNum);
});