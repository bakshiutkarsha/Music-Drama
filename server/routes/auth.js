const express = require('express');
const router = express.Router();
const user = require('../models/auth');

const Promise = require("bluebird");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const redirect = require('./redirect');
require('dotenv/config');


//Creating User with Hashed Password
router.post('/new', async (req, res) => {
  const userDetails = await user.findOne({
    username: req.body.username
  });
  console.log(userDetails);
  if (userDetails === null) {
    try {
      const hash = await argon2.hash(req.body.password, {
        type: argon2.argon2d,
        hashLength: 50
      });
      const newUser = new user({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        hash: hash
      })
      const savedUser = await newUser.save();
      res.json({
        user: newUser,
        message: 'succesfully saved the user info'
      })
    } catch (err) {
      res.json({
        message: err
      });
    }
  } else {
    res.status(400).send(`Username ${req.body.username} already exists`);
  }
})

//Validate user and generate token
router.post('/validate', async (req, res) => {
  const authKey = process.env.SECRET_KEY;
  const userDetails = await user.findOne({
    username: req.body.username
  });

  if (userDetails && userDetails.is_active == "true") {
    try {
      if (await argon2.verify(userDetails.hash, req.body.password)) {
        let payload = {
          username: req.body.username,
          "admin": false
        };
        let token = jwt.sign(payload, authKey);
        res.json({
          "token": token,
          "userId": userDetails._id,
          "email": req.body.username,
          'is_admin': userDetails.is_admin
        });
      } else {
        res.sendStatus(400).json({
          message: "Password don't Match"
        });
      }
    } catch (err) {
      res.json({
        message: err
      });
    }
  } else {
    res.json({
      message: "Your account has been deactivated. Please contact the site administrator"
    });
  }

})

//Get all Users
router.get('/getAllUsers', async (req, res) => {
  try {
    const item = await user.find({}, {
      password: 0,
      hash: 0
    });
    res.json(item);
  } catch (err) {
    res.json({
      message: err
    });
  }
})

//Deactivate Users
router.patch('/updateUserDeatils/:userId', async (req, res) => {
  try {
    const item = await user.findOneAndUpdate({
      _id: req.params.userId
    }, {
      $set: req.body
    });
    res.json(item);
  } catch (err) {
    res.json({
      message: err
    });
  }
})


router.get('/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ]
}))

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/user'
}), function() {
  console.log('here');
});

module.exports = router;
