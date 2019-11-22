const express = require('express');
const router = express.Router();
const some = express();
const lib =  require('../models/lib');

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
router.post('/items', async (req, res) => {
  const item = new lib({
    name  : req.body.name,
    item_type :req.body.item_type,
    loan_period  :req.body.loan_period,
    quantity  :req.body.quantity
  });

  try{
    const savedItem = await item.save();
    res.json(savedItem);
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
