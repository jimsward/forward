/* The DAO must be constructed with a connected database object */
function MessagesDAO(db) {
    //"use strict";
    var messages = db.collection("messages");
    console.dir(messages)
    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof MessagesDAO)) {
        console.log('Warning: MessagesDAO constructor called without "new" operator');
        return new MessagesDAO(db);
    }



    this.insertMessage = function( message, callback ){

		message.date = new Date()
		messages.insert( message, function( err, result ){
			if (err) return callback(err, null)
			callback( err, result )
			} )
		}
}

module.exports.MessagesDAO = MessagesDAO;
