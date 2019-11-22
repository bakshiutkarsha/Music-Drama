const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const libRoute = require('./routes/lib');
const cors = require('cors');
require('dotenv/config');

//MONGODB CONNECTION
mongoose.connect('mongodb+srv://utkarsha:FqqUUosi9fQ1GW5O@librarydatabase-3ekhb.mongodb.net/test?retryWrites=true&w=majority', {useUnifiedTopology: true,
useNewUrlParser: true})
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/library', libRoute);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.log(req.body);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
