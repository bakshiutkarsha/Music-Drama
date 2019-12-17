const express = require('express');
const router = express.Router();
const review =  require('../models/review');
const song = require('../models/song');
const middleware = require('../middleware');


// GET ALL REVIEW FOR A SONG
router.get('/getReviewForSong/:songId', async (req, res) => {
  try{
    const reviews = await review.find({song_id:req.params.songId}).sort({submitted_on: -1});
    res.json(reviews);
  } catch(err){
    res.json({message :err});
  }
});


//SAVE REVIEW
router.post('/postReviewForsong', middleware.checkToken, async (req, res) => {
  const reviewForExistingUser  = await review.findOne({song_id: req.body.song_id});
  const newReview = new review({
    submitted_by  : req.body.submitted_by,
    review_text  :req.body.review_text,
    rating  :req.body.rating,
    song_id: req.body.song_id,
    submitted_on: new Date(Date.now()).toISOString()
  });


  if(reviewForExistingUser === null){
    const updateNewRating = await song.updateOne({_id: req.body.song_id}, {$set: {avg_rating: req.body.rating}})
  } else {
    review.aggregate([
        {$group : {
                _id: req.body.song_id,
                avg_rating : { "$avg": "$rating" }
            }
        }
    ], async function(err, results) {
        console.log(results);
        const  updateRating = await song.updateOne({_id: results[0]._id}, {$set: {avg_rating: results[0].avg_rating.toFixed(1)}});
    });
  }

  try{
    const savedReview = await newReview.save();
    res.json(savedReview);
  } catch(err){
    console.log(err);
    res.json({message :err});
  }

});


//GET RECENT REVIEW
router.get('/getCountAndMostRecentReview/:songId', async (req, res) => {
  console.log(req.body);
  try{
    const latestReview = await review.find({song_id:req.params.songId}).sort({submitted_on: -1});
    res.json({'recent_review': latestReview[0], 'count': latestReview.length});
  } catch(err){
    res.json({message :err});
  }
});

module.exports = router;
