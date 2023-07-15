// Mongoose is mongodb library used in conncting to mongoDB
const mongoose = require('mongoose');

const connecToDB = (url) => {
  mongoose.connect(url);
};

module.exports = connecToDB;
