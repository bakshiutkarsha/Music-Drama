const passport = require('passport');
const Redirect = require('./redirect');
const express = require('express');
const router = express.Router();

//Passport for google verification and redirection
Redirect(passport);
router.use(passport.initialize());

router.get('/auth/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ]
}), function(){
  console.log('dgdgdgdgd')
});

// router.get('/auth/google/callback', passport.authenticate('google',  {
//   scope: [
//     'https://www.googleapis.com/auth/userinfo.profile',
//     'https://www.googleapis.com/auth/userinfo.email'
//   ]
// }), Redirect.google_authenticate);

router.get('/auth/google/callback', function(req, res, next){
  passport.authenticate('google', function(err, user, info){
    if (err) { return next(err); }
    if (!user) { return res.redirect('/') }
  });
})



module.exports = router;
