const mongoose = require('mongoose');
const review = require('./review');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

mongoose.set('debug', true);
const SongSchema = mongoose.Schema({
    song_title: {
      type: String,
      required: true
    },
    artist: {
      type: String,
      required: true
    },
    album: {
      type: String,
      default: 10,
      required: false
    },
    year: {
      type: Number,
      default: 100,
      required: false
    },
    genre: {
      type: String,
      default: 100
    },
    submitted_by:{
      type: String,
      required: true
    },
    submitted_on:{
      type: String,
      required: true
    },
    avg_rating:{
      type: Number,
      required: false
    }

});
SongSchema.index({
  song_title: 'text',
  artist: 'text',
  album: 'text',
  genre: 'text',
  year: 'number'
})
module.exports = mongoose.model('Songs', SongSchema);
