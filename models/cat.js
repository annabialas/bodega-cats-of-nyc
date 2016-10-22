var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var catSchema = new Schema({
	properties: {
	    bodega: String,
	    address: String,
	    zip: Number,
	    city: String
	},
  	geometry: {
  		type: { type: String, default: 'Point' }, 
		coordinates: { type: [Number], index: '2dsphere'}
  	}
});

var Cat = mongoose.model('Cat', catSchema);

// when we require this file, we get Cat
module.exports = Cat;



