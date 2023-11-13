const mongoose = require('mongoose');

// Define the schema
const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  }
});

// Create the model
const Stock = mongoose.model('Stock', stockSchema);

// Export the model
module.exports = Stock;
