const mongoose = require('mongoose');
const LibrarySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  item_type: {
    type: String,
    required: true
  },
  loan_period: {
    type: Number,
    default: 10,
    required: false
  },
  quantity: {
    type: Number,
    default: 100,
    required: false
  }
});

module.exports = mongoose.model('Library', LibrarySchema);
