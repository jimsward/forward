var express = require('express');
var router = express.Router();
var SendEmail = require('./send')
var ContentHandler = require('./content')
var sendEmail = new SendEmail()


module.exports = exports = function(app, db) {
  var contentHandler = new ContentHandler(db)
  /* GET home page. */
  router.get('/', function (req, res, next) {
    return res.redirect('app/index.html')
  });
  router.post('/sendemail', sendEmail.send);
  router.post('/contact', contentHandler.contactForm)

  module.exports = router;
}