const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: '426647789459-9diespc6g00npta1djuh4uebqej49khm.apps.googleusercontent.com',
            clientSecret: '4Ymd_mCCGm80BRM06rm74U-N',
            callbackURL: 'http:localhost:3000/api/redirect'
        },
        (token, refreshToken, profile, done) => {
           console.log(profile.emails[0].value);
          email=profile.emails[0].value
        //  window.localStorage.setItem('username',email)
            return done(null, {
                profile: profile,
                token: token
            });
        }

        ));
};



exports.google_authenticate = function (req, res, next) {
    let email12;
    email12= email;
    console.log(email12);
       // req.session.token = req.user.token;
        let payload = { username: email12, admin: 0 };  // make up a payload for JWT
        let jwttoken = jwt.sign(payload, secret);
        console.log(jwttoken);
        // window.localStorage.setItem('token',jwttoken)
        res.cookie('token', jwttoken);
        res.redirect("http://localhost:4200/enterGoogle")

    };
