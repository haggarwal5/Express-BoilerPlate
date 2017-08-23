'use strict';
let router = require("express").Router();
var Book = require('./models/bookModel');

router.get('/', (req, res) => {
    Book.find(function(err, books) {
        if(err) { console.log(err); }
        console.log(books);
        res.json(books);
    });
});

router.post('/', (req, res) => {
    res.send(req.id);       // require('express-request-id')
});

router.delete('/:id', (req, res) => {
    res.end(`<h1> Delete--/Customer ${req.params.id}</h1>`);
});

router.get('/:id', (req, res) => {
    res.sendFile(__dirname + "/Views/layout.html");    
});

module.exports = router;