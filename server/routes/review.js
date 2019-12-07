const express = require('express');
const router = express.Router();
const some = express();
const review =  require('../models/review');

// GET ALL REVIEW FOR A SONG
router.get('/getReviewForSong/:songId', async (req, res) => {
  try{
    const reviews = await review.find({song_id:req.params.songId});
    res.json(reviews);
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

//SAVE REVIEW
router.post('/postReviewForsong', async (req, res) => {
  const review = new review({
    submitted_by  : req.body.submitted_by,
    submitted_on :req.body.submitted_on,
    review_text  :req.body.review_text,
    rating  :req.body.rating,
    song_id: req.body.song_id
  });

  try{
    const savedReview = await review.save();
    res.json(savedReview);
  } catch(err){
    console.log(err);
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
