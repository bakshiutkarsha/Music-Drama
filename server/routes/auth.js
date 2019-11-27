const express = require('express');
const router = express.Router();
const user = require('../models/auth');

const Promise = require("bluebird");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

//Creating User with Hashed Password
router.post('/new', async (req, res) => {
  const userDetails = await user.findOne({
    username: req.body.username
  });
  if (userDetails === 'undefined') {
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
router.get('/validate', async (req, res) => {
  const authKey = process.env.SECRET_KEY;
  const userDetails = await user.findOne({
    username: req.body.username
  });
  try {
    if (await argon2.verify(userDetails.hash, req.body.password)) {
      let payload = {
        username: req.body.username,
        "admin": false
      };
      let token = jwt.sign(payload, authKey);
      res.json(token);
    } else {
      console.log("password Not Match");
    }
  } catch (err) {
    console.log('i am here and err', err);
    res.json({
      message: err
    });
  }
})

module.exports = router;
