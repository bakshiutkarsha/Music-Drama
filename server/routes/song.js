const express = require('express');
const router = express.Router();
const song = require('../models/song');

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

//GET SPECIFIC ITEM
router.get('/items/:itemId', async (req, res) => {
  try {
    const item = await lib.findById(req.params.itemId);
    res.json(item);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

//SAVE NEW SONG
router.post('/createNewSong', async (req, res) => {
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
    res.sendStatus(200).json(savedSong);
  } catch (err) {
    res.json({
      message: err
    });
  }
});



//DELETE AN ITEM
router.delete('/items/:itemId', async (req, res) => {
  try {
    const item = await lib.remove({
      _id: req.params.itemId
    });
    res.json(item);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

//UPDATE AN ITEM
router.patch('/items/:itemId', async (req, res) => {
  console.log(req.body);
  try {
    const item = await lib.updateMany({
      _id: req.params.itemId
    }, {
      $set: req.body
    });
    res.json(item);
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
