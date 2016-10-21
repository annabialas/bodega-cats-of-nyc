var express = require('express');
var router = express.Router();

var https = require('https');

var Cat = require('../models/cat');

router.get('/', function(req, res){
	res.locals.title = 'Bodega Cats';
	res.render('index');
});

router.get('/api', function(req, res){
	res.locals.title = 'Bodega Cats | API';
	// res.render('about');

  	Cat.find({}, function(err, data) {
  		// console.log(data);

  		var publicKey = ".json?access_token=pk.eyJ1IjoiYW5uYWJpYWxhcyIsImEiOiJjaWh3bzVybjUwMm92dGZraHFwcnY4bG16In0.j2Sl8c2UoLY_yHBjO1vAfQ";

  		var myPath = '/geocoding/v5/mapbox.places/' + data[0]['address'] + '%20' + data[0]['zip'] + '%20' + data[0]['city'] + '%20' + 'NY' + publicKey;

  		console.log(myPath);

  		// Server side GET request via https://nodejs.org/api/https.html#https_https_request_options_callback:s

  		var options = {
  			host: 'api.mapbox.com',
  			path: myPath,
  			method: 'GET'
  		};

		callback = function(response) {
			var str = '';

			//another chunk of data has been recieved, so append it to `str`
			response.on('data', function (chunk) {
				str += chunk;
			});

			//the whole response has been received, so we just print it out here
			response.on('end', function () {
				console.log(str);
				// formatGeoJson(str);
				var JSONify = JSON.parse(str);
				res.json(JSONify);
			});


		}

		https.request(options, callback).end();

		// var formatGeoJson = function(str) {

		// }

	  	// var geojson = {
	   //  	"type": "FeatureCollection",
	   //   		"features": data.map(function(item) {
		  //       	return {
		  //         		"type" : "Feature",
		  //         		"geometry" : {"type": "Point", "coordinates" : item.geometry.coordinates}
		  //       	}
	   //   		})
	  	// }
  	});
});

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