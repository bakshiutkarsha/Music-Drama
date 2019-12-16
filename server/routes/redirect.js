const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
require('dotenv/config');
const authKey = process.env.SECRET_KEY;

let email;
module.exports = (passport)=>{
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: '426647789459-9diespc6g00npta1djuh4uebqej49khm.apps.googleusercontent.com',
            clientSecret: '4Ymd_mCCGm80BRM06rm74U-N',
            callbackURL: 'http://localhost:3000/route/auth/google/callback'
        },
        (token, refreshToken, profile, done) => {
           console.log(profile.username[0].value);
           email=profile.username[0].value;
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
  console.log('heere')
  let payload = { username: email, "admin": false };
  console.log('heere')
  let jwttoken = jwt.sign(payload, authKey);
  console.log('heere')
  console.log(jwttoken);
  res.cookie('token', jwttoken);
  console.log('heere')
  res.redirect('http://localhost:4200/')
}

module.exports.getEmail = getEmail;
module.exports.google_authenticate = google_authenticate;
