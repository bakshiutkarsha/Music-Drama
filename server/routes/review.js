const express = require('express');
const router = express.Router();
const some = express();
const review =  require('../models/review');

// GET ALL ITEMS
router.get('/reviews', async (req, res) => {
  try{
    const items = await review.find();
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

//SAVE REVIEW
router.post('/reviews', async (req, res) => {
  const item = new review({
    submitted_by  : req.body.submitted_by,
    submitted_on :req.body.submitted_on,
    review_text  :req.body.review_text,
    rating  :req.body.rating,
    avg_rating: req.body.avg_rating,
    song_id: req.body.song_id
  });

  try{
    const savedItem = await item.save();
    res.json(savedItem);
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
