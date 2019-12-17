const express = require('express');
const router = express.Router();
const Playlist =  require('../models/playlist');
const Song =  require('../models/song');
const middleware = require('../middleware');


//CREATE NEW PLAYLIST
router.post('/createNewPlaylist', middleware.checkToken, async (req, res) => {
  const newPlaylist = new Playlist({
    title: req.body.title,
    song_ids:req.body.song_ids,
    description: req.body.description,
    submitted_by: req.body.submitted_by,
    submitted_on: req.body.submitted_on,
    is_private: req.body.is_private
  });

  try{
    const savedPlaylist = await newPlaylist.save();
    res.json(savedPlaylist);
  } catch(err){
    console.log(err);
    res.json({message :err});
  }

});

//UPDATE PLAYLIST
router.post('/updatePlaylistSong', middleware.checkToken, async (req, res) => {
  try{
    const playlist = await Playlist.findByIdAndUpdate(req.body.playlistId, {$addToSet: { "song_ids": req.body.song_ids } }, {safe: true});
    res.json(playlist);
  } catch(err){
    console.log(err);
    res.json({message :err});
  }

});

//GETTING SONGS FOR PLAYLIST
router.get('/getSongsForPlaylist/:playlistId', middleware.checkToken, async (req, res) => {
  try{
    let songArray = []
    const playlist = await Playlist.findOne({_id: req.params.playlistId});
    for(let i = 0; i < playlist.song_ids.length; i++){
      const song = await Song.findOne({_id: playlist.song_ids[i]});
      songArray.push(song);
    }
    res.json({"songs": songArray});
  } catch(err){
    res.json({message :err});
  }

});

//DELETING A PLAYLIST
router.delete('/deleteFromPlaylist/:playlistId/:songId', middleware.checkToken, async (req, res) => {
  try{
    const playlist = await Playlist.update( {_id: req.params.playlistId}, { $pullAll: {song_ids: [req.params.songId] } } )
    res.json(playlist);
  } catch(err){
    res.json({message :err});
  }

});


//GETTING ALL PLAYLIST
router.get('/getAllPlaylists', middleware.checkToken, async (req, res) => {
  try{
    const playlist = await Playlist.find();
    res.json(playlist);
  } catch(err){
    res.json({message :err});
  }

});


//GETTING FILTERED PLAYLIST
router.get('/getFilteredPlaylist/:userId', middleware.checkToken, async (req, res) => {
  let playlistFilterArr= [];
  let userSpecificList = [];
  const userId = req.params.userId;

  try{
    const playlist = await Playlist.find();
    await playlist.forEach(eachPlaylist => {
      if(eachPlaylist.submitted_by == userId){
        userSpecificList.push(eachPlaylist);
      } else if(eachPlaylist.is_private == "false") {
        playlistFilterArr.push(eachPlaylist);
      }
    })
    res.json({'userList':userSpecificList, 'otherList': playlistFilterArr});
  } catch(err){
    res.json({message :err});
  }
});


//UPDATE A SONG IN PLAYLIST
router.patch('/updatePlaylist/:playlistId', middleware.checkToken, async (req, res) => {
  try{
    const item = await Playlist.findOneAndUpdate({_id: req.params.playlistId}, {$set: req.body });
    res.json(item);
  } catch(err){
    res.json({message :err});
  }
});

//DELETE A PLAYLIST
router.delete('/deletePlaylist/:playlistId', middleware.checkToken, async (req, res) => {
  try{
    const selectedPlaylist = await Playlist.remove({_id: req.params.playlistId});
    res.json(selectedPlaylist);
  } catch(err){
    res.json({message :err});
  }
});

module.exports = router;
