/**
 * Created by Jim on 3/1/2016.
 */
MessagesDAO = require('../messages').MessagesDAO

function ContentHandler(db) {
    var messages = new MessagesDAO(db)

    this.contactForm = function( req, res, next ){
        console.log('req : ' + req.body.text)
        var message = req.body

        messages.insertMessage( message, function( err, result ){
            console.log('error : ' + err)
            if (err) return next(err)

            res.send('result')
        } )
    }

}
module.exports = ContentHandler;