const mongoose = require('mongoose');

const racersScheme = mongoose.Schema({
  racerName: {
    type: String,
    required: [true, 'Must provide race name'],
  },
  position: {
    type: String,
    required: [true, 'Must provide image link'],
  },
  duration: {
    type: String,
    required: [true, 'Must provide race location address'],
  },
  carName: {
    type: String,
    required: [true, 'Must provide race duration in miles'],
  },
});

module.exports = mongoose.model('BestRacers', racersScheme);
