const express = require('express');
const router = express.Router();
const song = require('../models/song');
const middleware = require('../middleware');

// GET ALL SONGS
router.get('/getAllSongs', async (req, res) => {
  try {
    const songs = await song.find().sort({avg_rating: -1});
    res.json(songs);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

//SEARCH SONGS
router.post('/search', async (req, res) =>{
  try {
    const songList = await song.find({
      $text: {
        $search: req.body.keyword
      }
    });
    res.json(songList);
  } catch (err) {
    console.log(err);
    res.json({
      message: err
    });
  }
});


//SAVE NEW SONG
router.post('/createNewSong', middleware.checkToken, async (req, res) => {
  const newSong = new song({
    submitted_by: req.body.submitted_by,
    submitted_on: req.body.submitted_on,
    song_title: req.body.song_title,
    artist: req.body.artist,
    album: req.body.album,
    year: req.body.year,
    genre: req.body.genre,
    avg_rating: req.body.avg_rating
  });

  try {
    const savedSong = await newSong.save();
    res.status(200).send(savedSong);
  } catch (err) {
    res.json({
      message: err
    });
  }
});



//DELETE AN SONG
router.delete('/deleteSong/:songId', middleware.checkToken, async (req, res) => {
  try {
    const song = await song.remove({
      _id: req.params.songId
    });
    res.json(song);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

//UPDATE A SONG
router.patch('/updateSong/:songId', middleware.checkToken, async (req, res) => {
  try {
    const updatedSong = await song.updateMany({_id: req.params.songId}, {$set: req.body });
    res.json(updatedSong);
  } catch (err) {
    res.json({
      message: err
    });
  }
});


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
module.exports = router;
