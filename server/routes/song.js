const express = require('express');
const router = express.Router();
const some = express();
const song =  require('../models/song');

// GET ALL ITEMS
router.get('/items', async (req, res) => {
  try{
    const items = await lib.find();
    res.json(items);
  } catch(err){
    res.json({message :err});
  }
});

//GET SPECIFIC ITEM
router.get('/items/:itemId', async (req, res) => {
  try{
    const item = await lib.findById(req.params.itemId);
    res.json(item);
  } catch(err){
    res.json({message :err});
  }
});

//SAVE LIBRARY ITEM
router.post('/', async (req, res) => {
  const item = new song({
    submitted_by  : req.body.submitted_by,
    submitted_on :req.body.submitted_on,
    song_title:req.body.song_title,
    artist:req.body.artist,
    album:req.body.album,
    year:req.body.year,
    genre:req.body.genre,
    playlist_name:req.body.playlist_name,
    review:req.body.review
  });

  try{
    const savedItem = await item.save();
    res.sendStatus(200).json(savedItem);
  } catch(err){
    res.json({message :err});
  }

});

//DELETE AN ITEM
router.delete('/items/:itemId', async (req, res) => {
  try{
    const item = await lib.remove({_id: req.params.itemId});
    res.json(item);
  } catch(err){
    res.json({message :err});
  }
});

//UPDATE AN ITEM
router.patch('/items/:itemId', async (req, res) => {
  console.log(req.body);
  try{
    const item = await lib.updateMany({_id: req.params.itemId}, {$set: req.body });
    res.json(item);
  } catch(err){
    res.json({message :err});
  }
});
module.exports = router;
