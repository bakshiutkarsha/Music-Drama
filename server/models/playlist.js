const mongoose = require('mongoose');

const PlaylistSchema = mongoose.Schema(
  {
  title: {
    type: String,
    required: true
  },
  song_ids:{
    type: Array,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  submitted_by: {
    type: String,
    required: true
  },
  is_private: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
