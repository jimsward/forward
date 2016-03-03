var SendEmail = require('./send')
var ContentHandler = require('./content')



module.exports = exports = function(app, db) {

  console.log('index.js')

  var contentHandler = new ContentHandler(db)
  var sendEmail = new SendEmail()
  /* GET home page. */
  app.get('/', function (req, res, next) {
    return res.redirect('app/index.html')
  });
  app.post('/sendemail', sendEmail.send);
  app.post('/contact', contentHandler.contactForm)

  //module.exports = router;
}