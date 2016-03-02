/**
 * Created by Jim on 3/1/2016.
 */
MessagesDAO = require('../messages').MessagesDAO

function ContentHandler(app, db) {
    this.contactForm = function( req, res, next ){
        var message = req.body
        console.log('message  : ' + message)
        messages.insertMessage( message, function( err, result ){
            if (err) return next(err)
            res.end()
        } )
    }

}
module.exports = ContentHandler;