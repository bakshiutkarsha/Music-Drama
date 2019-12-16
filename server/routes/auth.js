const express = require('express');
const router = express.Router();
const user = require('../models/auth');

const Promise = require("bluebird");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Redirect = require('./redirect');
var nodemailer = require("nodemailer");
require('dotenv/config');
const authKey = process.env.SECRET_KEY;

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "musicateuphonic@gmail.com",
        pass: "musicateuphonic123"
    }
});

var rand,mailOptions,host,link,usr;
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
        hash: hash
      })
      const savedUser = await newUser.save();
       rand=Math.floor((Math.random() * 100) + 54);
       host=req.get('host');
       link="http://localhost:3000/auth/verify?user="+savedUser._id+"&id="+rand;
       mailOptions={
           from: 'Do Not Reply <musicateuphonic_do_not_reply@gmail.com>',
           to : req.body.username,
           subject : "Please confirm your Email account",
           html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
       }
       console.log(mailOptions);
       smtpTransport.sendMail(mailOptions, function(error, response){
       if(error){
           console.log(error);
           res.status(400).send(error);
       }else{
           console.log("Message sent");
           res.json({user: usr._id});
           }
       });
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
          "username": req.body.username,
          'is_admin': userDetails.is_admin
        });
      } else {
        res.status(400).send({
          message: "Password don't Match"
        });
      }
    } catch (err) {
      res.json({
        message: err
      });
    }
  } else {
    res.status(400).send({
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

//Verify Users
router.get('/verify', async (req,res) =>{
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        console.log(req.query.id);
        console.log(req.query.user);
        if(req.query.id==rand)
        {
            console.log("email is verified");
            const create =  await user.findOneAndUpdate({_id : req.query.user },{$set: {is_verified: true}});
            res.set('location', 'http://localhost:4200/login');
            res.status(301).send()
            // res.send("Email verified, you can login now..")
        }
        else
        {
            console.log("email is not verified");
            res.status(400).send('email is not verified');
        }
    }
    else
    {
        res.status(400).send('Request is from unknown source');
    }
});

//Passport for google verification and redirection
Redirect(passport);
router.use(passport.initialize());

router.get('/auth/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ]
}));

router.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/auth'
}),Redirect.google_authenticate);



module.exports = router;
