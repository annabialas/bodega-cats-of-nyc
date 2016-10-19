var express = require('express');
var router = express.Router();

var Cat = require('../models/cat');

router.get('/', function(req, res){
	res.locals.title = 'Bodega Cats';
	res.render('index');
});

router.get('/about', function(req, res){
	res.locals.title = 'Bodega Cats | About';
	// res.render('about');

  	Cat.find({}, function(err, data) {

	  	var geojson = {
	    	"type": "FeatureCollection",
	     		"features": data.map(function(item) {
		        	return {
		          		"type" : "Feature",
		          		"geometry" : {"coordinates" : item.geometry.coordinates, "type": "Point"}
		        	}
	     		})
	  	}
	  	
  		res.json(geojson);
  	});
});

// router.get('/about', function(req, res){
// 	res.locals.title = 'Bodega Cats | About';
// 	res.render('about');
// });

// router.get('/submit', function(req, res){
// 	res.locals.title = 'Bodega Cats | Submit A Cat';
// 	res.render('submit');
// });

module.exports = router;


// FROM CLASS:

// var express = require('express');
// var router = express.Router();

// var Pet = require('../models/pet');

// router.get('/', function(req, res){
// 	res.json({
// 		status: 'ok'
// 	});
// });

// router.post('/pet', function(req, res, next){
// 	var tags = undefined;

// 	if (req.body.tags) {
// 		tags = req.body.tags.split(',');
// 	}

// 	var pet = new Pet({
// 		name: req.body.name,
// 		slug: req.body.name,
// 		price: req.body.price,
//   		breed: req.body.breed,
//   		tags: tags
// 	});

// 	pet.save(function(err, data){
// 		if (err){
// 			res.status(500);
// 			console.log(err);
// 			return res.json({
// 				status: 'error', 
// 				message: 'could not create pet',
// 				error: err
// 			});
// 		}

// 		return res.json({
// 			status: 'ok',
// 			message: 'created new pet',
// 			pet: data
// 		});
// 	});
// });

// router.get('/pet', function(req, res, next){
// 	Pet.find({}, function(err, data){
// 		if (err){
// 			res.status(500);
// 			return res.json({
// 				status: 'error', 
// 				message: 'could not get pets'
// 			});
// 		}

// 		// if (data.length === 0) {
// 		// 	return res.json({
// 		// 		status: 'no pets', 
// 		// 	});
// 		// }

// 		return res.json(data);
// 	});
// });

// module.exports = router;