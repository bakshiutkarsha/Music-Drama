const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const reviewRoute = require('./routes/review');
const authRoute = require('./routes/auth');
const songRoute = require('./routes/song');
const playlistRoute = require('./routes/playlist');
const cors = require('cors');
const path = require('path');
const middleware = require('./middleware');
require('dotenv/config');
const authKey = process.env.SECRET_KEY;

//CHECK FOR SECRET KEY
if (typeof authKey === 'undefined') { // If not set, exit immediately
	console.log("Please set secret as environment variable. E.g. JWT_KEY=\"Open Sesame\" node index");
	process.exit(1);
}

//MONGODB CONNECTION
mongoose.connect(process.env.DB_CONNECTION, {useUnifiedTopology: true,
useNewUrlParser: true})
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());


// app.use(express.static(path.join(__dirname, '../src')));
app.use(express.static('../src'));
app.use('/auth', authRoute);

// securedRoutes.use(/* auth-middleware from above */)
// securedRoutes.get('path1', /* ... */)
// const ProtectedRoutes = express.Router();
app.use('/api', middleware.checkToken);

// app.use('/', middleware.checkToken);
app.use('/reviews', reviewRoute);
app.use('/songs', songRoute);
app.use('/playlist', playlistRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
