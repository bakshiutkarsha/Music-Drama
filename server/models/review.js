const mongoose = require('mongoose');
const ReviewSchema = mongoose.Schema({
  {
    avg_rating: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  submitted_by:{
    type: String,
    required: true
  },
  submitted_on:{
    type: String,
    required: true
  },
  review_text:{
    type: String,
    required: false
  },
  song_id:{
    type: String,
    required: false
  }
}

});

module.exports = mongoose.model('Reviews', ReviewSchema);
