var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient // Driver for connecting to MongoDB


var routes = require('./routes');
var users = require('./routes/users');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var uri = process.env.MONGOLAB_URI || 'mongodb://heroku_v0znwk08:ob26stp5kamtac2qkm78uhqhm7@ds037145.mongolab.com:37145/heroku_v0znwk08'
//MongoClient.connect('mongodb://localhost:27017/checking', {server: {poolSize: 1}}, function(err, db) {

MongoClient.connect( uri, function(err, db) {
  "use strict";
  if (err) throw err;


 // app.use('/', routes);
  app.use('/users'
      , users);

  routes(app, db);

// catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

// error handlers

// development error handler
// will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

// production error handler
// no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });



  var port = process.env.PORT || 8000;
  app.listen(port);
  console.log('Express server listening on port ' + port);

});
 module.exports = app;