const mongoose = require('mongoose');

const raceSchemas = new mongoose.Schema({
  // Add validation to each of the schema value incase a user submit empty field, you can more explanations here: https://mongoosejs.com/docs/validation.html
  trackName: {
    type: String,
    required: [true, 'Must provide race name'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Must provide image link'],
  },
  location: {
    type: String,
    required: [true, 'Must provide race location address'],
  },
  miles: {
    type: String,
    required: [true, 'Must provide race duration in miles'],
  },
});

module.exports = mongoose.model('Race', raceSchemas);
