var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

var mongo = `mongodb+srv://admin:${MONGODB_KEY}@cluster0.prttz.gcp.mongodb.net/word-finder?retryWrites=true&w=majority`;
mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', () => { console.log('database connection error') })
db.once('open', function() {
  console.log('database connected succesfully')
});

var usersRouter = require('./src/routes/userRoutes.js');
var dictionaryRouter = require('./src/routes/dictionaryRoutes.js');

var app = express();

//CORS
var allowedOrigins = ['http://localhost:4200','http://localhost:3000'];
app.use(cors({
  credentials: true,
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/dictionary', dictionaryRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
