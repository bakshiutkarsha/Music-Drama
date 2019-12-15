const mongoose = require('mongoose');

const PlaylistSchema = mongoose.Schema(
  {
  title: {
    type: String,
    required: true
  },
  song_ids:{
    type: Array,
    required: true
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
    type: String,
    required: true,
    default: 'true'
  }
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
