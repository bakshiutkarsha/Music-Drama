const mongoose = require('mongoose');
const ReviewSchema = mongoose.Schema({
  song_id: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    required: true
  },
  submitted_by: {
    type: String,
    required: true
  },
  review_text: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Reviews', ReviewSchema);
