var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var catSchema = new Schema({
	// name: String
	// properties: {
	//     bodegaName:       { type: String, required: true },
	//     felineName: { type: String, required: false },
	//     borough:        { type: String, required: true }
	// },
  // 	geometry: {
  // 		type: { type: String, default: 'Point' }, 
		// coordinates: { type: [Number], index: '2dsphere'}
  // 	}
  	// bodegaName: String,
  	// felineName: String,
  	address: String,
  	zip: Number,
  	city: String,
  	state: { type: String, default: 'NY' }
});

var Cat = mongoose.model('Cat', catSchema);

// when we require this file, we get Cat
module.exports = Cat;



