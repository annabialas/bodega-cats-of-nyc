var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var catSchema = new Schema({
  // name: {type: String, required: true},
  // slug: {type: String, required: true},
  // animal: String,
  // breed: String,
  // tags: [String],
  // location: Number,
  // dateCreated: {type: Date, default: Date.now},
  // imageURL: String
});

var Cat = mongoose.model('Cat', catSchema);

// when we require this file, we get Cat
module.exports = Cat;