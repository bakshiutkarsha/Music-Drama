const mongoose = require('mongoose');
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
  playlist_name:{
    type: String,
    required: false
  },
  review:{
    type: String,
    required: false
  }

});

module.exports = mongoose.model('Songs', SongSchema);
