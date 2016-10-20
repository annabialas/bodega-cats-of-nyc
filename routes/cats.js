var express = require('express');
var router = express.Router();

var Cat = require('../models/cat');

router.get('/', function(req, res){
	res.locals.title = 'Bodega Cats | Submit';
	res.render('submit');
});

// router.post('/', function(req, res){
// 	var cat = new Cat({
// 		name: req.body.name
// 	});

// 	cat.save(function(err, data){
// 		if (err){
// 			return res.send('error!');
// 			// return res.redirect(303, '/pets');
// 		}
// 		res.send('saved ' + data.name);
// 		// res.redirect(303, '/pets');
// 	});
// });

router.post('/', function(req, res){

	var cat = new Cat({
    	geometry: { 
    		coordinates:req.body.coordinates.split(',').map(Number) 
    	}
  	});

  	cat.save(function (err, data) { 
  		if (err){
  			console.log(err);
			return res.send('error!');
		}
		// res.send('saved ' + data.geometry.coordinates);
		res.redirect(303, '/about');
		console.log(data); 
  	});

  	// res.redirect('/');
});


// router.get('/', function(req, res){

// 	var query = {};
// 	if (req.query.animal) {
// 		query = {animal: req.query.animal};
// 	};

// 	Pet.find(query, function(err, data){
// 		var pageData = {
// 			pets: data
// 		};

// 		res.render('pets', pageData);
// 	});
// });

module.exports = router;