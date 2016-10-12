var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var catSchema = new Schema({
  bodega_name: {type: String, required: true},
  slug: {type: String, required: true},
  cat_name: String,
  // tags: not in v.0.1,
  // location: ?,
  dateCreated: {type: Date, default: Date.now},
  imageURL: String
});

var Cat = mongoose.model('Cat', catSchema);

// when we require this file, we get Cat
module.exports = Cat;