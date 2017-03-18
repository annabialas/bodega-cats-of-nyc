var express = require('express');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
var Mongoose = require('mongoose');

// require('dotenv').config();

var app = express();

Mongoose.connect(process.env.DB_URL);

var Cat = require('./models/cat');

var PORT = process.env.PORT || 8080;
app.set('port', PORT);

// tell express to use handlebars

app.engine('handlebars', hbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var renderViews = require('./routes/views');
app.use('/', renderViews);

var cat = require('./routes/cats');
app.use('/submit', cat);

app.use(express.static('public'));

// start server

app.listen(PORT, function() {
	console.log('listening on port', PORT);
});