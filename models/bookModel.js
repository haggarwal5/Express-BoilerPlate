var mongoose = require('mongoose');
    Schema = mongoose.Schema;

var bookModel = new Schema({
    title: {type: String},
    author: {type: String},
    genre: {type: String},
    read: {type: Boolean, default: false},
});

var Book =  mongoose.model('Book', bookModel);

var bookDoc = new Book({
    title: 'Beginners book',
    author: 'Nicholas',
    genre: 'Javascript',
    read: true,
});
bookDoc.save(function(err){
    if (err) {
        console.log(err);
    }
    console.log("data saved sucessfully!");
});


module.exports = Book;