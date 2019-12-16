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
      required: false
    },
    year: {
      type: String,
      required: false
    },
    genre: {
      type: String
    },
    avg_rating:{
      type: Number,
      required: false
    },
    is_visible:{
      type: String,
      required: false,
      default: 'true'
    }

});
// SongSchema.index({
//   song_title: 'text',
//   artist: 'text',
//   album: 'text',
//   genre: 'text',
//   year: 'number'
// })
SongSchema.index({'$**': 'text'})

module.exports = mongoose.model('Songs', SongSchema);
