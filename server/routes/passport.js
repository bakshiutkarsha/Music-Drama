const passport = require('passport');
const express = require('express');
const Auth = require('../models/auth');
const router = express.Router();


const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
require('dotenv/config');
const authKey = process.env.SECRET_KEY;

let email;
function Passport(passport){
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: '426647789459-lvaagtchcchujet57pnh0f7halr365mt.apps.googleusercontent.com',
            clientSecret: '6KfoQ9gLurI9yuatQOjYiwkU',
            callbackURL: 'http://localhost:3000/passport/auth/google/callback'
        },
        (token, refreshToken, profile, done) => {
            console.log('here')
           console.log(profile.email);
           email=profile.email;
            return done(null, {
                profile: profile,
                token: token
            });
        }

        ));
};

function getEmail() {
    return email;
};

function google_authenticate(req, res, next){
  let payload = { username: email, "admin": false };
  let jwttoken = jwt.sign(payload, authKey);

  const user = Auth.findOne({username: email});
  res.cookie('token', jwttoken);
  res.redirect(`http://localhost:4200/?fromGoogle`);
}

module.exports.getEmail = getEmail;
module.exports.google_authenticate = google_authenticate;


//Passport for google verification and redirection
Passport(passport);
router.use(passport.initialize());

router.get('/auth/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ]
}), function(){
});


router.get('/auth/google/callback', passport.authenticate('google'), google_authenticate)


module.exports = router;
