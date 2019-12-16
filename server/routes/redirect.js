const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');

let email;
function getPassport(passport){
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: '426647789459-9diespc6g00npta1djuh4uebqej49khm.apps.googleusercontent.com',
            clientSecret: '4Ymd_mCCGm80BRM06rm74U-N',
            callbackURL: 'http://localhost:3000/auth/api/redirect'
        },
        (token, refreshToken, profile, done) => {
           console.log(profile.emails[0].value);
           email=profile.emails[0].value;
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

module.exports = {
  getPassport: getPassport,
  getEmail: getEmail
}
