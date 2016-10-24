var express = require('express');
var router = express.Router();
var https = require('https');

var Cat = require('../models/cat');

router.get('/', function(req, res){
	res.locals.title = 'Bodega Cats | Submit';
	res.render('submit');
});



router.post('/', function(req, res){

    var address = req.body.address.replace(/ /g,"%20");
    console.log(address);
    var zip = req.body.zip;
    var city = req.body.city.replace(/ /g,"%20");

    var publicKey = ".json?access_token=pk.eyJ1IjoiYW5uYWJpYWxhcyIsImEiOiJjaWh3bzVybjUwMm92dGZraHFwcnY4bG16In0.j2Sl8c2UoLY_yHBjO1vAfQ";

    var myPath = '/geocoding/v5/mapbox.places/' + address + '%20' + zip+ '%20' + city + '%20' + 'NY' + publicKey;

      // Server side GET request via https://nodejs.org/api/https.html#https_https_request_options_callback:

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
          var JSONify = JSON.parse(str);
          var coordinates = JSONify.features[0].geometry.coordinates

          var cat = new Cat({
              properties: {
                bodega: req.body.bodega,
                address: req.body.address,
                zip: req.body.zip,
                city: req.body.city
              },
              geometry: {
                coordinates: coordinates
              }
          });


          cat.save(function (err, data) { 
              if (err){
                console.log(err);
              return res.redirect(303, 'error');
            }
            res.redirect(303, 'confirm');
            console.log(data); 
          });
      });

    }

    https.request(options, callback).end();

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